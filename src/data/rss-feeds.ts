import type { RSSFeed } from '@/types'

export const rssFeeds: RSSFeed[] = [
  {
    platform: 'yamitzky',
    url: 'https://yamitzky.hatenablog.com/feed',
    label: '個人ブログ',
  },
  {
    platform: 'jxpress',
    url: 'https://tech.jxpress.net/feed/author/yamitzky',
    label: 'JX Press Tech Blog',
  },
  {
    platform: 'qiita',
    url: 'https://qiita.com/yamitzky/feed',
    label: 'Qiita',
  },
  {
    platform: 'note',
    url: 'https://note.com/yamitzky/rss',
    label: 'note',
  },
  {
    platform: 'zenn',
    url: 'https://zenn.dev/yamitzky/feed',
    label: 'Zenn',
  },
]
