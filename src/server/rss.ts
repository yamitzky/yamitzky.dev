import { createServerFn } from '@tanstack/react-start'
import { parseStringPromise } from 'xml2js'
import { manualArticles } from '@/data/manual-articles'
import { rssFeeds } from '@/data/rss-feeds'
import type { Article, Platform } from '@/types'

type AtomEntry = {
  title: string[]
  published: string[]
  link: { $: { href: string } }[]
}

type RSSEntry = {
  title: string[]
  pubDate: string[]
  link: string[]
}

async function fetchFeed(platform: Platform, url: string): Promise<Article[]> {
  try {
    const res = await fetch(url)
    const text = await res.text()
    const obj = await parseStringPromise(text)

    if (obj.rss) {
      // RSS format
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
      // Atom format
      if (!obj.feed.entry) {
        return []
      }
      return obj.feed.entry.map((e: AtomEntry) => ({
        title: e.title[0],
        published: new Date(e.published[0]).toISOString(),
        link: e.link[0].$.href,
        platform,
      }))
    }
  } catch (error) {
    console.error(`Failed to fetch ${platform} feed:`, error)
    return []
  }
}

export const getArticles = createServerFn({
  method: 'GET',
}).handler(async () => {
  const feedPromises = rssFeeds.map((feed) =>
    fetchFeed(feed.platform, feed.url)
  )

  const feedResults = await Promise.all(feedPromises)

  const articles = [...feedResults.flat(), ...manualArticles].sort((a, b) =>
    a.published > b.published ? -1 : 1
  )

  return articles
})
