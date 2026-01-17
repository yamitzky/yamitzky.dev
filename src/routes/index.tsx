import { createFileRoute } from '@tanstack/react-router'
import { Profile } from '@/components/sections/Profile'
import { SNS } from '@/components/sections/SNS'
import { Presentations } from '@/components/sections/Presentations'
import { Blog } from '@/components/sections/Blog'
import { OSS } from '@/components/sections/OSS'
import { Career } from '@/components/sections/Career'
import { Skills } from '@/components/sections/Skills'
import { getArticles } from '@/server/rss'

export const Route = createFileRoute('/')({
  loader: async () => {
    const articles = await getArticles()
    return { articles }
  },
  component: Home,
})

function Home() {
  const { articles } = Route.useLoaderData()

  return (
    <main className="max-w-6xl mx-auto px-6 pt-28 pb-16">
      {/* Hero */}
      <div className="mb-20">
        <Profile />
        <div className="mt-8">
          <SNS />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-20">
        <Presentations />

        <div className="divider" />

        <Blog articles={articles.slice(0, 6)} total={articles.length} />

        <div className="divider" />

        <OSS />

        <div className="divider" />

        <div className="grid sm:grid-cols-2 gap-16">
          <Career />
          <Skills />
        </div>
      </div>
    </main>
  )
}
