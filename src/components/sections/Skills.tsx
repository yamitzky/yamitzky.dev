import { skills, skillCategories } from '@/data/skills'

export function Skills() {
  return (
    <section id="skill">
      <h2 className="text-2xl font-semibold tracking-tight mb-6">好きな技術</h2>

      <div className="grid grid-cols-2 gap-6">
        {skillCategories.map((category) => (
          <div key={category}>
            <h3 className="font-semibold text-[var(--accent)] mb-3 text-sm">{category}</h3>
            <ul className="space-y-1.5 text-[var(--text-secondary)] text-sm">
              {skills
                .filter((skill) => skill.category === category)
                .map((skill) => (
                  <li key={skill.name}>{skill.name}</li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
