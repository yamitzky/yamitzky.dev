import { mainOSSProjects, otherOSSItems } from '@/data/oss'

export function OSS() {
  return (
    <section id="oss">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">作ったもの</h2>
        <span className="floating-label">
          {mainOSSProjects.length + otherOSSItems.length} projects
        </span>
      </div>

      {/* Featured */}
      <div className="grid gap-6 sm:grid-cols-2 mb-10">
        {mainOSSProjects.map((project) => (
          <article
            key={project.url}
            className="group gradient-border overflow-hidden"
          >
            {project.image && (
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}
            <div className="p-5">
              <h3 className="font-semibold text-lg mb-2 group-hover:text-[var(--accent)] transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
                {project.description}
              </p>
              <div className="flex gap-4 text-sm font-medium">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--accent)] link-hover"
                  >
                    Demo
                  </a>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--accent)] link-hover"
                >
                  GitHub
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Others */}
      <div>
        <h3 className="text-lg font-medium mb-4">その他のプロジェクト</h3>
        <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
          {otherOSSItems.map((item) => (
            <li key={item.url}>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
