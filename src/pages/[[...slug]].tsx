import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import styles from '~/styles/Home.module.css'
import { parseStringPromise } from 'xml2js'
import { Article, Blog, Platform } from '~/components/Blog'
import { SNS } from '~/components/SNS'
import { Presentation } from '~/components/Presentation'
import { Skill } from '~/components/Skill'
import { OSS } from '~/components/OSS'
import { Career } from '~/components/Career'
import { Profile } from '~/components/Profile'
import { Divider } from '~/components/Divider'
import { Breadcrumb } from '~/components/Breadcrumb'

type Props = {
  articles: Article[]
  page: 'top' | 'blog'
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { slug: [] } }, { params: { slug: ['blog'] } }],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
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
      page: (params.slug?.[0] as any) || 'top',
    },
    revalidate: 600,
  }
}

const Home: NextPage<Props> = ({ articles, page }) => {
  return (
    <section>
      <Head>
        <title>Yamitzky / 小笠原みつき - Portofolio</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://yamitzky.com" />
      </Head>
      {page === 'top' && (
        <>
          <Profile />
          <SNS />
          <Presentation />
          <Blog articles={articles.slice(0, 6)} short />
          <Career />
          <Skill />
          <OSS />
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
