import { createFileRoute } from '@tanstack/react-router'
import { getArticles } from '@/server/rss'

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export const Route = createFileRoute('/api/feed')({
  server: {
    handlers: {
      GET: async () => {
        const articles = await getArticles()

        const items = articles
          .map(
            (article) => `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${escapeXml(article.link)}</link>
      <pubDate>${new Date(article.published).toUTCString()}</pubDate>
      <source>${escapeXml(article.platform)}</source>
    </item>`
          )
          .join('')

        const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Yamitzky's Blog</title>
    <link>https://yamitzky.dev/blog</link>
    <description>yamitzky の技術ブログ記事まとめ</description>
    <language>ja</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://yamitzky.dev/api/feed" rel="self" type="application/rss+xml"/>${items}
  </channel>
</rss>`

        return new Response(rss, {
          headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
          },
        })
      },
    },
  },
})
