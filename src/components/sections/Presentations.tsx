import { presentations } from '@/data/presentations'

export function Presentations() {
  return (
    <section id="presentation">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">登壇・寄稿</h2>
        <span className="floating-label">{presentations.length} items</span>
      </div>

      <div className="space-y-1">
        {presentations.map((item, index) => (
          <a
            key={item.url}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="group flex items-start gap-3 py-2 px-3 -mx-3 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
          >
            <span className="number-marker text-xs mt-0.5">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4">
              <span className="text-sm group-hover:text-[var(--accent)] transition-colors">
                {item.title}
              </span>
              <span className="text-[var(--text-muted)] text-sm sm:text-right sm:shrink-0">
                {item.event}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
