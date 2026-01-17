import { Link } from '@tanstack/react-router'
import type { Article } from '@/types'

type Props = {
  articles: Article[]
  total?: number
  columns?: 1 | 2 | 3
  showTitle?: boolean
}

const platformLabels: Record<Article['platform'], string> = {
  yamitzky: 'Blog',
  jxpress: 'JX Press Tech Blog',
  qiita: 'Qiita',
  note: 'note',
  zenn: 'Zenn',
  'findy-tools': 'findy',
  'cyberz-dev': 'CyberZ',
}

export function Blog({ articles, total, columns = 3, showTitle = true }: Props) {
  const gridClass = columns === 1
    ? 'grid gap-4'
    : columns === 2
      ? 'grid gap-4 sm:grid-cols-2'
      : 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3'

  return (
    <section id="blog">
      {showTitle && (
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-semibold tracking-tight">ブログ</h2>
            {total && <span className="floating-label">{total} posts</span>}
          </div>
          {total && (
            <Link to="/blog" className="text-sm text-[var(--accent)] link-hover font-medium">
              すべて見る
            </Link>
          )}
        </div>
      )}

      <div className={gridClass}>
        {articles.map((article) => (
          <a
            key={article.link}
            href={article.link}
            target="_blank"
            rel="noreferrer"
            className="group glass-card p-5 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="tag font-mono">
                {platformLabels[article.platform]}
              </span>
              <span className="text-xs text-[var(--text-muted)]">
                {article.published.slice(0, 10)}
              </span>
            </div>
            <h3 className="font-medium leading-snug group-hover:text-[var(--accent)] transition-colors line-clamp-2 flex-1">
              {article.title}
            </h3>
          </a>
        ))}
      </div>
    </section>
  )
}
