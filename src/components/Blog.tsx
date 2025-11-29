import Link from 'next/link'
import React from 'react'
import { SectionTitle } from './SectionTitle'

export type Platform =
  | 'jxpress'
  | 'yamitzky'
  | 'qiita'
  | 'note'
  | 'zenn'
  | 'cyberz-dev'
  | 'findy-tools'

export type Article = {
  title: string
  published: string
  link: string
  platform: Platform
}

type Props = {
  articles: Article[]
  total?: number
}

export const Blog: React.FC<Props> = ({ articles, total }) => {
  return (
    <section className="space-y-4" id="blog">
      <SectionTitle icon="📝">ブログ</SectionTitle>
      <ul className="space-y-4 md:space-y-2">
        {articles.map((article) => (
          <li key={article.link} className="block">
            <a
              href={article.link}
              target="_blank"
              rel="noreferrer"
              className="md:flex justify-between items-center flex-wrap"
            >
              <h3 className="font-bold">{article.title}</h3>
              <p className="text-sm text-slate-500 dark:text-gray-400">
                {article.platform === 'yamitzky' && '個人ブログ'}
                {article.platform === 'jxpress' && 'JX Press Tech Blog'}
                {article.platform === 'qiita' && 'Qiita'}
                {article.platform === 'note' && 'note'}
                {article.platform === 'zenn' && 'Zenn'}
                {article.platform === 'cyberz-dev' && 'cyberz-dev'}
                {article.platform === 'findy-tools' && 'Findy Tools'}
                {' - '}
                {article.published.slice(0, 10)}
              </p>
            </a>
          </li>
        ))}
      </ul>
      {total != null && (
        <p>
          <Link href="/blog#blog" className="text-cyan-500">
            ➠ 全ての記事を見る
          </Link>
        </p>
      )}
    </section>
  )
}
