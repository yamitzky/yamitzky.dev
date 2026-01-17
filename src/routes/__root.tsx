/// <reference types="vite/client" />
import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from '@tanstack/react-router'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Yamitzky / 小笠原みつき' },
      {
        name: 'description',
        content:
          'サーバーレスとPythonとReactとBigQueryと猫とKPOPをこよなく愛するCTO',
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <html lang="ja">
      <head>
        <HeadContent />
      </head>
      <body>
        {/* Subtle gradient background */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 -right-40 w-96 h-96 bg-[var(--accent)] opacity-[0.03] blur-[100px] rounded-full" />
          <div className="absolute bottom-0 -left-40 w-96 h-96 bg-[var(--accent)] opacity-[0.02] blur-[100px] rounded-full" />
        </div>

        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50">
          <div className="mx-4 mt-4">
            <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between glass-card">
              <Link
                to="/"
                className="font-semibold tracking-tight hover:text-[var(--accent)] transition-colors"
              >
                yamitzky.dev
              </Link>
              <div className="flex items-center gap-1">
                <a
                  href="/#presentation"
                  className="px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors rounded-lg hover:bg-[var(--bg-elevated)]"
                >
                  Presentations
                </a>
                <a
                  href="/#oss"
                  className="px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors rounded-lg hover:bg-[var(--bg-elevated)]"
                >
                  Works
                </a>
                <Link
                  to="/blog"
                  className="px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors rounded-lg hover:bg-[var(--bg-elevated)]"
                >
                  Blog
                </Link>
              </div>
            </nav>
          </div>
        </header>

        <Outlet />

        {/* Footer */}
        <footer className="mt-32 pb-8">
          <div className="max-w-6xl mx-auto px-6">
            <div className="divider mb-8" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-sm text-[var(--text-muted)]">
                © {new Date().getFullYear()} yamitzky
              </p>
              <div className="flex gap-6 text-sm">
                <a
                  href="https://github.com/yamitzky"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--text-muted)] link-hover"
                >
                  GitHub
                </a>
                <a
                  href="https://twitter.com/yamitzky"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--text-muted)] link-hover"
                >
                  X
                </a>
              </div>
            </div>
          </div>
        </footer>

        <Scripts />
      </body>
    </html>
  )
}
