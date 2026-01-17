import { careerItems } from '@/data/career'

export function Career() {
  return (
    <section id="career">
      <h2 className="text-2xl font-semibold tracking-tight mb-6">略歴</h2>

      <div className="relative pl-6 border-l border-[var(--border)]">
        {careerItems.map((item, index) => (
          <div key={index} className="relative pb-8 last:pb-0">
            {/* Timeline dot */}
            <div className="absolute -left-[25px] top-1 w-2 h-2 rounded-full bg-[var(--accent)]" />

            <p className="font-mono text-xs text-[var(--text-muted)] mb-1">
              {item.startDate} — {item.endDate}
            </p>
            <h3 className="font-medium">{item.title}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}
