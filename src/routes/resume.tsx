import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useEffect, useState } from 'react'
import { featuredPresentations } from '@/data/presentations'
import { profile } from '@/data/profile'
import {
  capabilities,
  type EncryptedProjects,
  education,
  type Project,
  resumeSummary,
  workExperiences,
} from '@/data/resume'
import { skillCategories, skills } from '@/data/skills'
import { unlockResume } from '@/functions/resume'

export const Route = createFileRoute('/resume')({
  head: () => ({
    meta: [
      { title: '職務経歴書 | 小笠原みつき' },
      {
        name: 'description',
        content:
          '小笠原みつき（yamitzky）の職務経歴書。JX通信社CTOとしてのキャリアとスキルをまとめています。',
      },
    ],
  }),
  component: ResumePage,
})

function ResumePage() {
  const [projects, setProjects] = useState<EncryptedProjects | null>(null)
  const [loading, setLoading] = useState(true)
  const [tokenExpiry, setTokenExpiry] = useState<Date | null>(null)
  const [tokenInput, setTokenInput] = useState('')
  const [unlockError, setUnlockError] = useState<string | null>(null)
  const [unlocking, setUnlocking] = useState(false)

  // Get icon based on artifact URL
  const getArtifactIcon = (url: string) => {
    if (url.includes('github.com')) {
      // GitHub icon
      return (
        <svg
          className="w-3.5 h-3.5 shrink-0"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      )
    }
    if (url.includes('speakerdeck.com')) {
      // Presentation icon
      return (
        <svg
          className="w-3.5 h-3.5 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
          />
        </svg>
      )
    }
    // Article/blog icon
    return (
      <svg
        className="w-3.5 h-3.5 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    )
  }

  const tryUnlock = useCallback(async (token: string) => {
    try {
      const result = await unlockResume({ data: { token } })
      setProjects(result.data)
      setTokenExpiry(new Date(result.exp * 1000))
      return { success: true, error: null }
    } catch (e) {
      const message = e instanceof Error ? e.message : '復号に失敗しました'
      if (message.includes('Invalid or expired')) {
        return { success: false, error: 'トークンが無効または期限切れです' }
      }
      return { success: false, error: message }
    }
  }, [])

  useEffect(() => {
    const loadData = async () => {
      const hash = window.location.hash
      const token = new URLSearchParams(hash.slice(1)).get('token')

      if (token) {
        await tryUnlock(token)
      }
      setLoading(false)
    }
    loadData()
  }, [tryUnlock])

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!tokenInput.trim()) return

    setUnlocking(true)
    setUnlockError(null)

    const result = await tryUnlock(tokenInput.trim())
    if (!result.success) {
      setUnlockError(result.error)
    }
    setUnlocking(false)
  }

  const handlePrint = () => {
    window.print()
  }

  // Helper to get projects for a company
  const getProjects = (company: string): Project[] | null => {
    if (!projects) return null
    return projects[company] || null
  }

  if (loading) {
    return (
      <main className="max-w-3xl mx-auto px-6 pt-28 pb-16">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-[var(--text-muted)]">読み込み中...</div>
        </div>
      </main>
    )
  }

  return (
    <main className="resume-page max-w-3xl mx-auto px-6 pt-28 pb-16">
      {/* Token Expiry Banner */}
      {tokenExpiry && (
        <div className="print:hidden mb-6 px-4 py-3 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center gap-3">
          <svg
            className="w-5 h-5 text-amber-500 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-sm text-amber-600 dark:text-amber-400">
            このリンクの有効期限:{' '}
            <span className="font-bold">
              {tokenExpiry.toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </p>
        </div>
      )}

      {/* Print Button */}
      {projects && (
        <div className="print:hidden mb-8 flex justify-end">
          <button
            type="button"
            onClick={handlePrint}
            className="pill cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            PDFを取得
          </button>
        </div>
      )}

      {/* Header */}
      <header className="resume-header mb-12 animate-reveal">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-0 mb-2 print:mb-1 print:flex-row print:items-baseline print:justify-between">
          <h1 className="text-3xl font-bold print:text-2xl">小笠原 光貴</h1>
          <p className="text-sm text-[var(--text-muted)] print:text-xs">
            2026年1月18日
          </p>
        </div>
        <p className="text-lg text-[var(--text-secondary)] mb-4 print:text-sm print:mb-2">
          {profile.englishName}
        </p>
        {/* Web only: SNS links */}
        <div className="flex flex-wrap gap-4 text-sm print:hidden">
          <a
            href="https://github.com/yamitzky"
            target="_blank"
            rel="noreferrer"
            className="pill"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            GitHub
          </a>
          <a
            href="https://twitter.com/yamitzky"
            target="_blank"
            rel="noreferrer"
            className="pill"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            X (Twitter)
          </a>
          <a href="https://yamitzky.dev" className="pill">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            </svg>
            Web
          </a>
          <a
            href="https://yamitzky.dev/blog"
            target="_blank"
            rel="noreferrer"
            className="pill"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            Blog
          </a>
        </div>
        {/* Print only: simple contact info */}
        <p className="hidden print:block text-sm text-gray-600">
          GitHub: github.com/yamitzky | X: @yamitzky | Web:{' '}
          <a href="https://yamitzky.dev">yamitzky.dev</a> | Blog:{' '}
          <a href="https://yamitzky.dev/blog">yamitzky.dev/blog</a>
        </p>
      </header>

      <div className="divider mb-12 print:hidden" />

      {/* Summary */}
      <section className="resume-section mb-12 animate-reveal delay-1">
        <h2 className="resume-section-title text-sm font-mono font-medium text-[var(--text-muted)] uppercase tracking-wider mb-4">
          職務要約
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-line print:text-sm print:leading-relaxed">
          {resumeSummary}
        </p>
      </section>

      <div className="divider mb-12 print:hidden" />

      {/* Work Experience */}
      <section className="resume-section mb-12 animate-reveal delay-2">
        <h2 className="resume-section-title text-sm font-mono font-medium text-[var(--text-muted)] uppercase tracking-wider mb-8">
          職務経歴
        </h2>
        <div className="space-y-16 print:space-y-8">
          {workExperiences.map((exp) => {
            const companyProjects = getProjects(exp.company)
            return (
              <div key={exp.company} className="company-block">
                {/* Company Header + Roles */}
                <div className="mb-6 print:mb-4">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-0 print:flex-row print:items-baseline print:justify-between">
                    <h3 className="text-xl font-semibold print:text-base print:font-bold">
                      {exp.company}
                    </h3>
                    <span className="text-sm text-[var(--text-muted)] print:text-xs">
                      {exp.period}
                    </span>
                  </div>
                  {exp.note && (
                    <p className="text-sm text-[var(--text-muted)] mt-1 print:text-xs">
                      {exp.note}
                    </p>
                  )}
                  <ul className="mt-3 space-y-0.5 print:mt-2">
                    {exp.roles.map((role, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-[var(--text-secondary)] print:text-xs"
                      >
                        {role.title}
                        <span className="text-[var(--text-muted)] ml-2">
                          （{role.period}）
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Projects */}
                <div>
                  <h4 className="text-sm font-medium text-[var(--text-muted)] mb-4 print:text-xs print:mb-2">
                    主要プロジェクト
                  </h4>
                  {companyProjects ? (
                    <div className="space-y-5 print:space-y-3">
                      {companyProjects.map((project, pidx) => (
                        <div key={pidx} className="project-block">
                          <h5 className="font-medium text-[var(--accent)] mb-2 print:text-black print:text-sm print:font-bold">
                            {project.title}
                          </h5>
                          <ul className="space-y-1 print:space-y-0.5 mb-2 print:mb-1">
                            {project.achievements.map((achievement, aidx) => (
                              <li
                                key={aidx}
                                className="text-sm text-[var(--text-secondary)] flex items-start gap-2 print:text-xs"
                              >
                                <span className="text-[var(--text-muted)] shrink-0">
                                  -
                                </span>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                          {project.description && (
                            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-2 print:text-xs print:leading-relaxed">
                              {project.description}
                            </p>
                          )}
                          {project.technologies && (
                            <div className="flex flex-wrap gap-1.5 print:gap-1">
                              {project.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="text-xs text-[var(--text-muted)] bg-[var(--bg-secondary)] px-2 py-0.5 rounded print:bg-gray-100"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                          {project.artifacts &&
                            project.artifacts.length > 0 && (
                              <div className="mt-3 pt-3 border-t border-[var(--border)] print:mt-2 print:pt-2 print:border-gray-300">
                                <h6 className="text-xs font-medium text-[var(--text-muted)] mb-2 print:text-[10px] print:mb-1">
                                  関連成果物
                                </h6>
                                <div className="space-y-1.5 print:space-y-0.5">
                                  {project.artifacts.map((artifact, aridx) => (
                                    <div key={aridx}>
                                      <a
                                        href={artifact.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-xs text-[var(--accent)] hover:underline hover:brightness-110 transition-all flex items-center gap-1.5 print:text-black print:no-underline print:text-[10px]"
                                      >
                                        {getArtifactIcon(artifact.url)}
                                        <span>{artifact.title}</span>
                                      </a>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="print:hidden px-4 py-6 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] flex flex-col items-center justify-center text-center">
                      <svg
                        className="w-8 h-8 text-[var(--text-muted)] mb-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      <p className="text-sm text-[var(--text-muted)] mb-4">
                        プロジェクト詳細は非公開です
                      </p>
                      <form
                        onSubmit={handleUnlock}
                        className="flex flex-col sm:flex-row gap-2 w-full max-w-sm"
                      >
                        <input
                          type="password"
                          value={tokenInput}
                          onChange={(e) => setTokenInput(e.target.value)}
                          placeholder="アクセストークンを入力"
                          className="flex-1 px-3 py-2 text-sm rounded-lg bg-[var(--bg-primary)] border border-[var(--border)] focus:border-[var(--accent)] focus:outline-none transition-colors"
                        />
                        <button
                          type="submit"
                          disabled={unlocking || !tokenInput.trim()}
                          className="px-4 py-2 text-sm font-medium rounded-lg bg-[var(--accent)] text-[var(--bg-primary)] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                        >
                          {unlocking ? '確認中...' : '解除'}
                        </button>
                      </form>
                      {unlockError && (
                        <p className="text-xs text-red-500 mt-2">
                          {unlockError}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <div className="divider mb-12 print:hidden" />

      {/* Capabilities */}
      <section className="resume-section mb-12 animate-reveal delay-3">
        <h2 className="resume-section-title text-sm font-mono font-medium text-[var(--text-muted)] uppercase tracking-wider mb-6">
          できること
        </h2>
        <div className="space-y-6 print:space-y-3">
          {capabilities.map((capability, idx) => (
            <div key={idx}>
              <h3 className="font-medium text-[var(--accent)] mb-2 print:text-black print:text-sm print:font-bold">
                {capability.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed print:text-xs print:leading-relaxed">
                {capability.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="divider mb-12 print:hidden" />

      {/* Skills */}
      <section className="resume-section mb-12 animate-reveal delay-3">
        <h2 className="resume-section-title text-sm font-mono font-medium text-[var(--text-muted)] uppercase tracking-wider mb-6">
          スキル
        </h2>
        <div className="space-y-4 print:space-y-2">
          {skillCategories.map((category) => (
            <div key={category} className="print:flex print:items-baseline">
              <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-2 print:text-xs print:font-bold print:w-24 print:shrink-0 print:mb-0">
                {category}:
              </h3>
              <div className="flex flex-wrap gap-2 print:gap-0">
                {skills
                  .filter((s) => s.category === category)
                  .map((skill, idx, arr) => (
                    <span key={skill.name} className="tag print:tag-print">
                      {skill.name}
                      <span className="hidden print:inline">
                        {idx < arr.length - 1 ? ', ' : ''}
                      </span>
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider mb-12 print:hidden" />

      {/* Speaking */}
      <section className="resume-section mb-12">
        <h2 className="resume-section-title text-sm font-mono font-medium text-[var(--text-muted)] uppercase tracking-wider mb-6">
          登壇・執筆
        </h2>
        <div className="space-y-4 print:space-y-1">
          {featuredPresentations.map((presentation, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-start gap-2 print:flex-row print:items-baseline print:gap-1"
            >
              <span className="text-sm text-[var(--text-muted)] shrink-0 sm:w-24 print:text-xs print:w-12">
                {presentation.year}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap print:inline">
                  <span className="text-sm font-medium print:text-xs">
                    {presentation.event}
                  </span>
                  {presentation.badge && (
                    <span className="text-xs bg-[var(--accent)] text-[var(--bg-primary)] px-2 py-0.5 rounded print:bg-transparent print:text-gray-600 print:px-0">
                      <span className="hidden print:inline">(</span>
                      {presentation.badge}
                      <span className="hidden print:inline">)</span>
                    </span>
                  )}
                </div>
                <span className="hidden print:inline print:text-xs">
                  {' '}
                  - {presentation.title}
                </span>
                <a
                  href={presentation.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-sm text-[var(--text-secondary)] link-hover print:hidden"
                >
                  {presentation.title}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider mb-12 print:hidden" />

      {/* Education */}
      <section className="resume-section">
        <h2 className="resume-section-title text-sm font-mono font-medium text-[var(--text-muted)] uppercase tracking-wider mb-6">
          学歴
        </h2>
        <div className="space-y-4 print:space-y-1">
          {education.map((edu, idx) => (
            <div
              key={idx}
              className="print:flex print:items-baseline print:gap-2"
            >
              <span className="hidden print:inline print:text-xs print:w-44 print:shrink-0 print:whitespace-nowrap">
                {edu.period}
              </span>
              <div>
                <h3 className="font-medium print:text-xs print:inline">
                  {edu.school}
                </h3>
                {edu.degree && (
                  <span className="text-sm text-[var(--text-secondary)] print:text-xs print:inline">
                    {' '}
                    {edu.degree}
                  </span>
                )}
                <p className="text-sm text-[var(--text-muted)] print:hidden">
                  {edu.period}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
