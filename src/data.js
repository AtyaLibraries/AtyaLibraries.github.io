// Atya Libraries — package catalog.
// `type`: 'library' | 'sdk' | 'template'. `repo` is the GitHub repo slug under AtyaLibraries.
// Versions/downloads are rendered live via shields.io badges, so nothing here goes stale.

export const ORG = 'AtyaLibraries'
export const NUGET_PROFILE = 'https://www.nuget.org/profiles/ArsenAsulyan'
export const GITHUB_ORG = 'https://github.com/AtyaLibraries'

export const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'Foundation', label: 'Foundation' },
  { key: 'Diagnostics', label: 'Diagnostics' },
  { key: 'Errors', label: 'Errors' },
  { key: 'Governance', label: 'Governance' },
  { key: 'Tooling', label: 'Tooling' },
]

export const PACKAGES = [
  // ── Foundation ────────────────────────────────────────────────
  {
    id: 'Atya.Foundation.Abstractions',
    repo: 'Abstractions',
    category: 'Foundation',
    type: 'library',
    description: 'Common abstractions shared across the Atya foundation packages.',
  },
  {
    id: 'Atya.Foundation.Guards',
    repo: 'Guards',
    category: 'Foundation',
    type: 'library',
    description: 'Lightweight, allocation-friendly guard clauses for argument validation.',
  },
  {
    id: 'Atya.Foundation.Primitives',
    repo: 'Primitives',
    category: 'Foundation',
    type: 'library',
    description: 'Primitive types and value objects for the Atya foundation layer.',
  },
  {
    id: 'Atya.Foundation.Serialization',
    repo: 'Serialization',
    category: 'Foundation',
    type: 'library',
    description: 'Serialization abstractions and helpers for the Atya foundation layer.',
  },
  {
    id: 'Atya.Foundation.Time',
    repo: 'Time',
    category: 'Foundation',
    type: 'library',
    description: 'Time and clock abstractions for testable, deterministic time handling.',
  },

  // ── Diagnostics ───────────────────────────────────────────────
  {
    id: 'Atya.Diagnostics.Logging',
    repo: 'Logging',
    category: 'Diagnostics',
    type: 'library',
    description: 'Logging abstractions and dependency-injection helpers for Atya diagnostics.',
  },
  {
    id: 'Atya.Diagnostics.Metrics',
    repo: 'Metrics',
    category: 'Diagnostics',
    type: 'library',
    description: 'Metrics abstractions and dependency-injection helpers for Atya diagnostics.',
  },
  {
    id: 'Atya.Diagnostics.Observation',
    repo: 'Observation',
    category: 'Diagnostics',
    type: 'library',
    description: 'Unified observation helpers that compose logging, metrics, and tracing.',
  },
  {
    id: 'Atya.Diagnostics.OpenTelemetry',
    repo: 'OpenTelemetry',
    category: 'Diagnostics',
    type: 'library',
    description: 'OpenTelemetry configuration and instrumentation helpers for .NET services.',
  },
  {
    id: 'Atya.Diagnostics.Tracing',
    repo: 'Tracing',
    category: 'Diagnostics',
    type: 'library',
    description: 'Tracing abstractions and dependency-injection helpers for Atya diagnostics.',
  },

  // ── Errors ────────────────────────────────────────────────────
  {
    id: 'Atya.Errors.Exceptions',
    repo: 'Exceptions',
    category: 'Errors',
    type: 'library',
    description: 'Exception types and helpers for consistent error handling.',
  },
  {
    id: 'Atya.Errors.ProblemDetails',
    repo: 'ProblemDetails',
    category: 'Errors',
    type: 'library',
    description: 'RFC 7807 Problem Details helpers for ASP.NET Core services.',
  },
  {
    id: 'Atya.Errors.Validation',
    repo: 'Validation',
    category: 'Errors',
    type: 'library',
    description: 'Validation primitives and error helpers for the Atya error layer.',
  },

  // ── Governance ────────────────────────────────────────────────
  {
    id: 'Atya.Governance.CodeQuality',
    repo: 'CodeQuality',
    category: 'Governance',
    type: 'library',
    description: 'Centralized StyleCop and .NET analyzer configuration for Atya repositories.',
  },
  {
    id: 'Atya.Governance.Testing',
    repo: 'Testing',
    category: 'Governance',
    type: 'library',
    description: 'Small, focused test-only helpers for Atya packages and applications.',
  },

  // ── Tooling ───────────────────────────────────────────────────
  {
    id: 'Atya.Build.Sdk',
    repo: 'Atya.Build.Sdk',
    category: 'Tooling',
    type: 'sdk',
    description: 'Shared MSBuild SDK that standardizes build, pack, test, and analysis across the fleet.',
  },
  {
    id: 'Atya.Templates.NuGetPackage',
    repo: 'Atya.Templates.NuGetPackage',
    category: 'Tooling',
    type: 'template',
    description: 'Production-ready .NET 10 NuGet package starter template (dotnet new atya-nuget).',
  },
]

export function installCommand(pkg) {
  if (pkg.type === 'template') return `dotnet new install ${pkg.id}`
  if (pkg.type === 'sdk') return `// global.json\n"msbuild-sdks": { "${pkg.id}": "*" }`
  return `dotnet add package ${pkg.id}`
}

export function nugetUrl(pkg) {
  return `https://www.nuget.org/packages/${pkg.id}`
}

export function githubUrl(pkg) {
  return `https://github.com/${ORG}/${pkg.repo}`
}
