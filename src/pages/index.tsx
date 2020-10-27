import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import styles from '~/styles/Home.module.css'
import { parseStringPromise } from 'xml2js'
import { useCallback, useState } from 'react'

type Platform = 'jxpress' | 'yamitzky' | 'qiita'

type Article = {
  title: string
  published: string
  link: string
  platform: Platform
}

type Props = {
  articles: Article[]
}

async function getFeed(platform: Platform, url: string): Promise<Article[]> {
  const res = await fetch(url)
  const text = await res.text()
  const feed = await parseStringPromise(text)
  return feed.feed.entry.map((e) => ({
    title: e.title[0],
    published: e.published[0],
    link: e.link[0].$.href,
    platform,
  }))
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const yamitzky = await getFeed(
    'yamitzky',
    'https://yamitzky.hatenablog.com/feed'
  )
  const jxpress = await getFeed(
    'jxpress',
    'https://tech.jxpress.net/feed/author/yamitzky'
  )
  const qiita = await getFeed('qiita', 'https://qiita.com/yamitzky/feed')

  const articles = [...yamitzky, ...jxpress, ...qiita].sort((a, b) =>
    a.published > b.published ? -1 : 1
  )

  return {
    props: {
      articles,
    },
    revalidate: 600,
  }
}

const Home: NextPage<Props> = ({ articles }) => {
  const [expand, setExpand] = useState(false)
  const handleExpand = useCallback((e) => {
    e.preventDefault()
    setExpand(true)
  }, [])
  const visibleArticles = expand ? articles : articles.slice(0, 6)
  return (
    <section>
      <Head>
        <title>Yamitzky / 小笠原みつき - Portofolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.top}>
        <img src="/yamitzky.png" width="127" height="128" />
        <img
          src="/ogasahara.jpg"
          width="127"
          height="128"
          className={styles.photo}
        />
        <h1>I'm 小笠原みつき(@yamitzky), a developer.</h1>
        <p>
          JX通信社
          取締役CDO。サーバーレスとPythonとReactとBigQueryをこよなく愛する。登壇・執筆依頼と美味しいガパオの情報は
          Twitter でお願いします。
        </p>
      </div>
      <h2>🧙‍♂️ SNS 🧙‍♂️</h2>
      <ul>
        <li>
          <a href="https://twitter.com/yamitzky">Twitter</a>
        </li>
        <li>
          <a href="https://facebook.com/yamitzky">Facebook</a>
        </li>
        <li>
          <a href="https://speakerdeck.com/yamitzky">Speaker Deck</a>
        </li>
        <li>
          <a href="https://github.com/yamitzky">GitHub</a>
        </li>
        <li>
          <a href="https://hub.docker.com/r/yamitzky">Docker Hub</a>
        </li>
        <li>mail: negiga@gmail.com</li>
      </ul>
      <h2>📝 ブログ 📝</h2>
      <ul className={styles.articles}>
        {visibleArticles.map((article) => (
          <li key={article.link}>
            {article.published.slice(0, 10)}{' '}
            <a href={article.link} target="_blank">
              「{article.title}」
            </a>
            {article.platform === 'jxpress' && '(JX)'}
            {article.platform === 'qiita' && '(Qiita)'}
          </li>
        ))}
      </ul>
      <p>
        個人ブログ、note、JX通信社技術ブログ、Qiitaのものも含んだ全てのブログ記事一覧です
      </p>
      {!expand && (
        <p>
          <a href="#" onClick={handleExpand}>
            &gt;&gt; 全て見る
          </a>
        </p>
      )}
      <h2>🔈 登壇・寄稿 🔈</h2>
      <ul className={styles.articles}>
        <li>
          PyCon JP 2020「
          <a href="https://pycon.jp/2020/timetable/?id=203955" target="_blank">
            Python 3.9 時代の型安全な Pythonの極め方
          </a>
          」
        </li>
        <li>
          技術評論社 WEB+DB PRESS Vol.105{' '}
          <a
            href="https://gihyo.jp/magazine/wdpress/archive/2018/vol105"
            target="_blank"
          >
            「サーバーレス」特集
          </a>
        </li>
        <li>
          エンジニアHub 「
          <a
            href="https://eh-career.com/engineerhub/entry/2018/07/03/110000"
            target="_blank"
          >
            サーバーレスのメリット＆本質を、AWS Lambdaを使って理解しよう
          </a>
          」
        </li>
        <li>
          Developers 2018「
          <a
            href="https://event.shoeisha.jp/devboost/20181215/session/1907/"
            target="_blank"
          >
            なぜサーバーレス『と』Dockerなのか
            〜インフラ運用を最小化するサービス開発〜
          </a>
          」
        </li>
        <li>
          Developers Summit 2018「
          <a
            href="https://event.shoeisha.jp/devsumi/20180215/session/1649/"
            target="_blank"
          >
            サーバーレスを活用して少数精鋭で開発するニュースアプリ
          </a>
          」
        </li>
        <li>
          builderscon tokyo 2017「
          <a
            href="https://speakerdeck.com/yamitzky/kokogaxin-iyosabaresu-dagasi-hacheng-riyue-eta-number-builderscon"
            target="_blank"
          >
            ここが辛いよサーバーレス。だが私は乗り越えた
          </a>
          」
        </li>
      </ul>
      <h2>🍺 略歴 🍺</h2>
      <ul>
        <li>2014.04 -&gt; 2015.12: CyberAgent</li>
        <li>2014.05 -&gt; 2015.12: CyberZ</li>
        <li>2016.01 -&gt; now: JX Press (Chief D. Officer / Engineer)</li>
      </ul>
      <h2>😻 スキル 😻</h2>
      <ul>
        <li>TypeScript, React, Next.js, Gatsby</li>
        <li>Vue, Vuex, Electron, Nuxt.js</li>
        <li>Python</li>
        <li>GraphQL</li>
        <li>Serverless</li>
        <li>BigQuery</li>
        <li>AWS, GCP, Firebase</li>
        <li>Machine Learning</li>
        <li>Scala</li>
        <li>Go</li>
        <li>Docker 🐳</li>
        <li>HTML/CSS</li>
        <li>Ruby</li>
      </ul>
      <h2>📦 作った OSS 📦</h2>
      <ul>
        <li>
          <a
            href="https://github.com/yamitzky/serverless-headless-cms"
            target="_blank"
          >
            Serverless Headless CMS (React, Firebase)
          </a>
        </li>
        <li>
          <a href="https://github.com/jxpress/kibela-to-slack" target="_blank">
            Custom Kibela -&gt; Slack Webhook (Python)
          </a>
        </li>
        <li>
          <a href="https://github.com/yamitzky/redashbot" target="_blank">
            Redash bot (TypeScript)
          </a>
        </li>
        <li>
          <a
            href="https://github.com/yamitzky/ja-wikipedia-corpus-soso"
            target="_blank"
          >
            Japanese Wikipedia Corpus for Language Modeling
          </a>
        </li>
        <li>
          <a href="https://github.com/yamitzky/bottoku" target="_blank">
            Chatbot framework "bottoku" (Python)
          </a>
        </li>
        <li>
          <a
            href="https://github.com/yamitzky/Scala-Lambda-Apex-Kuromoji"
            target="_blank"
          >
            Scala on AWS Lambda
          </a>
        </li>
        <li>
          <a
            href="https://hub.docker.com/r/yamitzky/miniconda-neologd/"
            target="_blank"
          >
            NEologd Docker image
          </a>
        </li>
        <li>
          <a
            href="https://hub.docker.com/r/yamitzky/mecab-bottle/"
            target="_blank"
          >
            NEologd Mecab API
          </a>
        </li>
        <li>
          <a href="https://github.com/yamitzky/ouchihack" target="_blank">
            お家ハック
          </a>
        </li>
        <li>
          <a href="https://github.com/yamitzky/review-reminder" target="_blank">
            Review reminder bot for Gitlab
          </a>
        </li>
        <li>
          <a href="https://github.com/yamitzky/adaboost.js" target="_blank">
            AdaBoost (Javascript)
          </a>
        </li>
        <li>
          <a href="https://github.com/yamitzky/LDA-inline-c" target="_blank">
            LDA (Scipy.weave, C++)
          </a>
        </li>
        <li>
          <a href="https://github.com/yamitzky/Regularized-SVD" target="_blank">
            Regularized SVD (Cython)
          </a>
        </li>
      </ul>
      <p>
        その他、作った OSS は全て{' '}
        <a href="https://github.com/yamitzky">GitHub</a> で公開しています。
      </p>
    </section>
  )
}

export default Home
