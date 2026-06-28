import { useEffect, useMemo, useState } from 'react'
import {
  PACKAGES,
  CATEGORIES,
  NUGET_PROFILE,
  GITHUB_ORG,
  installCommand,
  nugetUrl,
  githubUrl,
} from './data.js'

/* ---------- hooks & small components ---------- */

function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('atya-theme')
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('atya-theme', theme)
  }, [theme])
  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))]
}

function CopyButton({ text, label = 'Copy' }) {
  const [copied, setCopied] = useState(false)
  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }
  return (
    <button className={`copy-btn${copied ? ' copied' : ''}`} onClick={copy} aria-label={`Copy: ${text}`}>
      {copied ? '✓ Copied' : label}
    </button>
  )
}

function VersionBadge({ id }) {
  return (
    <img
      className="ver-badge"
      loading="lazy"
      alt={`${id} NuGet version`}
      src={`https://img.shields.io/nuget/v/${id}?style=flat-square&logo=nuget&logoColor=white&label=&color=512BD4`}
    />
  )
}

/* ---------- sections ---------- */

function Header({ theme, toggleTheme }) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Atya Libraries home">
        <img src="/favicon.svg" width="30" height="30" alt="" />
        <span>Atya<strong>Libraries</strong></span>
      </a>
      <nav className="nav">
        <a href="#packages">Packages</a>
        <a href="#get-started">Get started</a>
        <a href={GITHUB_ORG} target="_blank" rel="noreferrer">GitHub</a>
        <a href={NUGET_PROFILE} target="_blank" rel="noreferrer">NuGet</a>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle color theme">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </nav>
    </header>
  )
}

function Hero({ count }) {
  return (
    <section className="hero" id="top">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-inner">
        <span className="pill">
          <span className="dot" /> Atya.* prefix reserved on NuGet
        </span>
        <h1>
          Modern <span className="grad">.NET&nbsp;10</span> building blocks,
          <br /> one consistent family.
        </h1>
        <p className="lede">
          <strong>Atya Libraries</strong> is a growing collection of small, focused, fully-tested
          NuGet packages — Foundation, Diagnostics, Errors, Governance, and the tooling that keeps
          them all uniform.
        </p>
        <div className="cta-row">
          <a className="btn btn-primary" href="#packages">Browse {count} packages</a>
          <a className="btn btn-ghost" href={GITHUB_ORG} target="_blank" rel="noreferrer">
            View on GitHub →
          </a>
        </div>
      </div>
    </section>
  )
}

function Stats({ count }) {
  const items = [
    { n: count, l: 'Published packages' },
    { n: '34+', l: 'More on the way' },
    { n: '.NET 10', l: 'Single target' },
    { n: 'MIT', l: 'Open source' },
  ]
  return (
    <section className="stats">
      {items.map((s) => (
        <div className="stat" key={s.l}>
          <div className="stat-n">{s.n}</div>
          <div className="stat-l">{s.l}</div>
        </div>
      ))}
    </section>
  )
}

function PackageCard({ pkg }) {
  return (
    <article className={`card cat-${pkg.category}`}>
      <div className="card-top">
        <span className="chip">{pkg.category}</span>
        <VersionBadge id={pkg.id} />
      </div>
      <h3 className="card-title">{pkg.id}</h3>
      <p className="card-desc">{pkg.description}</p>
      <div className="install">
        <code>{installCommand(pkg)}</code>
        <CopyButton text={installCommand(pkg)} />
      </div>
      <div className="card-links">
        <a className="link nuget" href={nugetUrl(pkg)} target="_blank" rel="noreferrer">NuGet</a>
        <a className="link gh" href={githubUrl(pkg)} target="_blank" rel="noreferrer">GitHub</a>
      </div>
    </article>
  )
}

function GetStarted() {
  return (
    <section className="get-started" id="get-started">
      <h2>Get started</h2>
      <div className="gs-grid">
        <div className="gs-card">
          <h3>1 · Add a package</h3>
          <p>Install any library straight from NuGet.</p>
          <div className="install">
            <code>dotnet add package Atya.Foundation.Guards</code>
            <CopyButton text="dotnet add package Atya.Foundation.Guards" />
          </div>
        </div>
        <div className="gs-card">
          <h3>2 · Standardize builds</h3>
          <p>Adopt the shared MSBuild SDK in your <code>global.json</code>.</p>
          <div className="install">
            <code>"msbuild-sdks": &#123; "Atya.Build.Sdk": "*" &#125;</code>
            <CopyButton text={'"msbuild-sdks": { "Atya.Build.Sdk": "*" }'} />
          </div>
        </div>
        <div className="gs-card">
          <h3>3 · Scaffold a package</h3>
          <p>Spin up a new, release-ready package in seconds.</p>
          <div className="install">
            <code>dotnet new install Atya.Templates.NuGetPackage</code>
            <CopyButton text="dotnet new install Atya.Templates.NuGetPackage" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="foot-inner">
        <div className="brand">
          <img src="/favicon.svg" width="26" height="26" alt="" />
          <span>Atya<strong>Libraries</strong></span>
        </div>
        <div className="foot-links">
          <a href={GITHUB_ORG} target="_blank" rel="noreferrer">GitHub</a>
          <a href={NUGET_PROFILE} target="_blank" rel="noreferrer">NuGet</a>
          <a href="#packages">Packages</a>
        </div>
      </div>
      <p className="made">Made with 💜 .NET · © {new Date().getFullYear()} Atya Libraries</p>
    </footer>
  )
}

/* ---------- app ---------- */

export default function App() {
  const [theme, toggleTheme] = useTheme()
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return PACKAGES.filter((p) => {
      const matchesCat = cat === 'all' || p.category === cat
      const matchesQ =
        !q ||
        p.id.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      return matchesCat && matchesQ
    })
  }, [query, cat])

  return (
    <>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero count={PACKAGES.length} />
        <Stats count={PACKAGES.length} />

        <section className="catalog" id="packages">
          <div className="catalog-head">
            <h2>Packages</h2>
            <input
              className="search"
              type="search"
              placeholder="Search packages…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search packages"
            />
          </div>

          <div className="filters" role="tablist" aria-label="Filter by category">
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                className={`filter${cat === c.key ? ' active' : ''}`}
                onClick={() => setCat(c.key)}
                role="tab"
                aria-selected={cat === c.key}
              >
                {c.label}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className="grid">
              {filtered.map((p) => (
                <PackageCard key={p.id} pkg={p} />
              ))}
            </div>
          ) : (
            <p className="empty">No packages match “{query}”.</p>
          )}

          <div className="coming-soon">
            <span className="cs-spark">✦</span>
            <p>
              <strong>34+ more packages</strong> are on the way — all generated from the same
              template, so every one lands with the same structure, quality bar, and fingerprint.
            </p>
          </div>
        </section>

        <GetStarted />
      </main>
      <Footer />
    </>
  )
}
