import { presentations } from '@/data/presentations'

export function Presentations() {
  return (
    <section id="presentation">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">登壇・寄稿</h2>
        <span className="floating-label">{presentations.length} items</span>
      </div>

      <div className="space-y-3">
        {presentations.map((item, index) => (
          <a
            key={item.url}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="group flex items-start gap-4 p-4 -mx-4 rounded-xl hover:bg-[var(--bg-secondary)] transition-colors"
          >
            <span className="number-marker mt-1">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium leading-snug group-hover:text-[var(--accent)] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--text-muted)] mt-1">
                {item.event}
              </p>
            </div>
            <span className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity mt-1">
              ↗
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
