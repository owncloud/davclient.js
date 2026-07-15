# AI Agent Guidelines for davclient.js

This file provides context for AI coding agents (Claude Code, GitHub Copilot, Cursor, etc.) working in this repository.

## Repository Overview
- **Product family:** Infrastructure / Tooling
- **Primary language(s):** JavaScript
- **Build system:** npm, Bower
- **Test framework:** Karma
- **CI system:** None detected

## Architecture & Key Paths
- `lib/` - Library source code (JavaScript)
- `tests/` - Karma test suite
- `package.json` - npm package definition
- `bower.json` - Bower package definition
- `karma.conf.js` - Karma test runner configuration
- `index.html` - Usage example
- `package-lock.json` - npm lockfile

## Development Conventions
- **Branching:** master
- **Commit messages:** DCO sign-off required (`git commit -s`)
- **Code style:** No specific linter configured
- **PR process:** Open a PR against master. All CI checks must pass.
- **Note:** This repository is in Archived/Legacy mode

## Build & Test Commands
```bash
# Install dependencies
npm install

# Test
npm test

# Lint
Not detected
```

## Important Constraints
- All code contributions must be compatible with the **BSD-3-Clause** license
- Do not introduce new **copyleft-licensed dependencies** (GPL, AGPL, LGPL, MPL) without explicit discussion in an issue first. This is especially important for repos migrating to Apache 2.0.
- Do not introduce new dependencies without discussion in an issue first
- This repository is in legacy/archived status


## OSPO Policy Constraints

### GitHub Actions
- **Only** use actions owned by `owncloud`, created by GitHub (`actions/*`), verified on the GitHub Marketplace, or verified by the ownCloud Maintainers.
- Pin all actions to their full commit SHA (not tags): `uses: actions/checkout@<SHA> # vX.Y.Z`
- Never introduce actions from unverified third parties.

### Dependency Management
- Dependabot is configured for automated dependency updates.
- Review and merge Dependabot PRs as part of regular maintenance.
- Do not introduce new dependencies without discussion in an issue first.

### Git Workflow
- **Rebase policy**: Always rebase; never create merge commits. Use `git pull --rebase` and `git rebase` before pushing.
- **Signed commits**: All commits **must** be PGP/GPG signed (`git commit -S -s`).
- **DCO sign-off**: Every commit needs a `Signed-off-by` line (`git commit -s`).
- **Conventional Commits & Squash Merge**: Use the [Conventional Commits](https://www.conventionalcommits.org/) format where the repository enforces it. Many repos use squash merge, where the PR title becomes the commit message on the default branch — apply Conventional Commits format to PR titles as well. A reusable GitHub Actions workflow enforces this.

## Context for AI Agents
- Match existing code style
- Do not refactor unrelated code in the same PR
- Write tests for new functionality
- Keep PRs focused and atomic
- Tests run in FirefoxHeadless via Karma
