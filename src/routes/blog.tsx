import { createFileRoute, Link } from '@tanstack/react-router'
import { Profile } from '@/components/sections/Profile'
import { Blog } from '@/components/sections/Blog'
import { getArticles } from '@/server/rss'

export const Route = createFileRoute('/blog')({
  loader: async () => {
    const articles = await getArticles()
    return { articles }
  },
  head: () => ({
    meta: [{ title: 'Articles — Yamitzky' }],
    links: [
      { rel: 'alternate', type: 'application/rss+xml', title: 'RSS Feed', href: '/api/feed' },
    ],
  }),
  component: BlogPage,
})

function BlogPage() {
  const { articles } = Route.useLoaderData()

  return (
    <main className="max-w-6xl mx-auto px-6 pt-28 pb-16">
      {/* Header */}
      <div className="mb-16">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-6">
          <span>←</span> Home
        </Link>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
          Articles
        </h1>
        <div className="flex items-center gap-4">
          <p className="floating-label">
            {articles.length} posts
          </p>
          <a
            href="/api/feed"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            RSS
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-20">
        <Blog articles={articles} columns={1} showTitle={false} />
        <div className="divider" />
        <Profile />
      </div>
    </main>
  )
}
