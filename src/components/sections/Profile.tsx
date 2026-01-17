import { profile } from '@/data/profile'

export function Profile() {
  return (
    <section className="animate-reveal" id="profile">
      {/* Avatar group */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative">
          <img
            src={profile.avatars.virtual}
            width={80}
            height={80}
            alt="yamitzky"
            className="w-20 h-20 rounded-2xl"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[var(--accent)] rounded-full flex items-center justify-center">
            <span className="text-xs">✨</span>
          </div>
        </div>
        <img
          src={profile.avatars.real}
          width={80}
          height={80}
          alt="ogasahara"
          className="w-20 h-20 rounded-2xl opacity-90"
        />
      </div>

      {/* Name with accent */}
      <div className="mb-6">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-3">
          {profile.name}
        </h1>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[var(--accent)] text-glow">{profile.handle}</span>
        </div>
      </div>

      {/* Bio */}
      <p className="text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
        {profile.bio}
      </p>
    </section>
  )
}
