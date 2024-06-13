import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { parseStringPromise } from 'xml2js'
import { type Article, Blog, type Platform } from '~/components/Blog'
import { Breadcrumb } from '~/components/Breadcrumb'
import { Career } from '~/components/Career'
import { Divider } from '~/components/Divider'
import { Menu } from '~/components/Menu'
import { OSS } from '~/components/OSS'
import { Presentation } from '~/components/Presentation'
import { Profile } from '~/components/Profile'
import { SNS } from '~/components/SNS'
import { Skill } from '~/components/Skill'

type Props = {
  articles: Article[]
  page: 'top' | 'blog'
}

type AtomEntry = {
  title: string[]
  published: string[]
  link: { $: { href: string } }[]
}

type RSSEntry = {
  title: string[]
  pubDate: string[]
  link: string
}

async function getAtom(platform: Platform, url: string): Promise<Article[]> {
  const res = await fetch(url)
  const text = await res.text()
  const obj = await parseStringPromise(text)
  if (obj.rss) {
    if (!obj.rss.channel[0].item) {
      return []
    }
    return obj.rss.channel[0].item.map((e: RSSEntry) => ({
      title: e.title[0],
      published: new Date(e.pubDate[0]).toISOString(),
      link: e.link[0],
      platform,
    }))
  } else {
    return obj.feed.entry.map((e: AtomEntry) => ({
      title: e.title[0],
      published: new Date(e.published[0]).toISOString(),
      link: e.link[0].$.href,
      platform,
    }))
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { slug: [] } }, { params: { slug: ['blog'] } }],
    fallback: false,
  }
}

const oldArticles: Article[] = [
  {
    title: 'Pandas経由でHiveQLを実行してDataFrameに簡単に入れる方法',
    published: '2015-05-13T00:00:00.000Z',
    link: 'https://yamitzky.hatenablog.com/entry/2015/05/13/135830',
    platform: 'yamitzky',
  },
  {
    title: 'スパースな行列のPearson相関係数',
    published: '2015-05-28T00:00:00.000Z',
    link: 'https://yamitzky.hatenablog.com/entry/2015/05/28/132354',
    platform: 'yamitzky',
  },
  {
    title: '教師なしLDAでTwitterのスパム判別をしてみる(予備実験編)',
    published: '2014-02-17T00:00:00.000Z',
    link: 'https://yamitzky.hatenablog.com/entry/2014/02/17/000201',
    platform: 'yamitzky',
  },
  {
    title:
      'ニューラルネットによる単語のベクトル表現の学習 〜 Twitterのデータでword2vecしてみた',
    published: '2014-03-11T00:00:00.000Z',
    link: 'https://yamitzky.hatenablog.com/entry/2014/03/11/222223',
    platform: 'yamitzky',
  },
  {
    title: '.gitignore作るなら、giboを使おう',
    published: '2014-04-16T00:00:00.000Z',
    link: 'https://yamitzky.hatenablog.com/entry/2014/04/16/005111',
    platform: 'yamitzky',
  },
  {
    title: 'LDAを使って、Twitterでスパムに使われそうな単語を推定する',
    published: '2014-04-22T00:00:00.000Z',
    link: 'https://yamitzky.hatenablog.com/entry/2014/04/22/225350',
    platform: 'yamitzky',
  },
  {
    title: 'Scala祭で「統計をとって高速化するScala開発」の発表をしました',
    link: 'https://cyberz-dev.hateblo.jp/entry/2014/09/11/090637',
    published: '2014-09-11T00:00:00.000Z',
    platform: 'cyberz-dev',
  },
]

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const [yamitzky, jxpress, qiita, note, zenn] = await Promise.all([
    getAtom('yamitzky', 'https://yamitzky.hatenablog.com/feed'),
    getAtom('jxpress', 'https://tech.jxpress.net/feed/author/yamitzky'),
    getAtom('qiita', 'https://qiita.com/yamitzky/feed'),
    getAtom('note', 'https://note.com/yamitzky/rss'),
    getAtom('zenn', 'https://zenn.dev/yamitzky/feed'),
  ])

  const articles = [
    ...yamitzky,
    ...jxpress,
    ...qiita,
    ...note,
    ...zenn,
    ...oldArticles,
  ].sort((a, b) => (a.published > b.published ? -1 : 1))

  return {
    props: {
      articles,
      page: (params?.slug?.[0] as any) || 'top',
    },
    revalidate: 600,
  }
}

const Home: NextPage<Props> = ({ articles, page }) => {
  return (
    <section className="bg-gray-50 mx-auto max-w-screen-xl p-4 pt-8 pb-12 md:p-24 md:py-16 md:border-x border-gray-200 dark:bg-zinc-900 dark:border-zinc-800 space-y-16">
      <Head>
        <title>Yamitzky / 小笠原みつき - Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://yamitzky.dev" />
      </Head>
      {page === 'top' && (
        <>
          <Menu />
          <Profile />
          <SNS />
          <Presentation />
          <Blog articles={articles.slice(0, 6)} total={articles.length} />
          <OSS />
          <Career />
          <Skill />
        </>
      )}
      {page === 'blog' && (
        <>
          <Breadcrumb />
          <Presentation />
          <Blog articles={articles} />
          <Divider />
          <Profile />
        </>
      )}
    </section>
  )
}

export default Home
