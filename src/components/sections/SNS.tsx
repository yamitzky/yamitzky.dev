import { email, snsLinks } from '@/data/sns'

export function SNS() {
  return (
    <section className="animate-reveal delay-1" id="sns">
      <div className="flex flex-wrap gap-3">
        {snsLinks.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="pill"
          >
            {link.name}
          </a>
        ))}
        <a href={`mailto:${email}`} className="pill">
          {email}
        </a>
      </div>
    </section>
  )
}
