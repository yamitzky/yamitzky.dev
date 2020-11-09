import React, { useCallback, useState } from 'react'
import styles from '~/styles/Article.module.css'
import Link from 'next/link'

export type Platform = 'jxpress' | 'yamitzky' | 'qiita' | 'note'

export type Article = {
  title: string
  published: string
  link: string
  platform: Platform
}

type Props = {
  articles: Article[]
  short?: boolean
}

export const Blog: React.FC<Props> = ({ articles, short }) => {
  return (
    <>
      <h2 id="blog">📝 ブログ 📝</h2>
      <ul className={styles.articles}>
        {articles.map((article) => (
          <li key={article.link}>
            {article.published.slice(0, 10)}{' '}
            <a href={article.link} target="_blank">
              「{article.title}」
            </a>
            {article.platform === 'jxpress' && '(JX)'}
            {article.platform === 'qiita' && '(Qiita)'}
            {article.platform === 'note' && '(note)'}
          </li>
        ))}
      </ul>
      {short && (
        <p>
          <Link href="/blog#blog" passHref>
            <a>&gt;&gt; 全て見る</a>
          </Link>
        </p>
      )}
      <p>
        <a href="https://yamitzky.hatenablog.com">個人ブログ</a>、
        <a href="https://note.com/yamitzky">note</a>、
        <a href="https://tech.jxpress.net">JX通信社技術ブログ</a>、
        <a href="https://qiita.com/yamitzky">Qiita</a>
        のものも含んだ直近のブログ記事一覧です
      </p>
    </>
  )
}
