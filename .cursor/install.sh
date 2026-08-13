#!/usr/bin/env bash
#
# Idempotent Cloud Agent bootstrap for the Class Odontologia MVP.
#
# The repository is documentation-only until Wave 0 / ISSUE-001 initializes the
# Next.js application (see docs/IMPLEMENTATION_ISSUES.md). Every step therefore
# guards on the presence of the relevant project files so this script is safe to
# run both before and after the app exists, and safe to run repeatedly.
set -euo pipefail

echo "==> Toolchain: node $(node -v) | pnpm $(pnpm -v 2>/dev/null || echo 'n/a') | ffmpeg $(ffmpeg -version 2>/dev/null | head -1 | awk '{print $3}')"

# Ensure pnpm is available via corepack (the base image pins a stable pnpm).
corepack enable >/dev/null 2>&1 || true

if [ ! -f package.json ]; then
  echo "==> No package.json yet — the Next.js app is not initialized (Wave 0 / ISSUE-001)."
  echo "==> Nothing to install. The environment toolchain is ready for that work."
  exit 0
fi

echo "==> package.json found — installing JavaScript dependencies with pnpm"
if [ -f pnpm-lock.yaml ]; then
  pnpm install --frozen-lockfile
else
  pnpm install
fi

# Playwright QA browsers (Chromium + WebKit per docs/QA_STRATEGY.md). Only runs
# once Playwright is a project dependency. OS-level browser libraries are baked
# into the environment image/snapshot, so --with-deps is not required here.
if pnpm exec playwright --version >/dev/null 2>&1; then
  echo "==> Playwright detected — ensuring Chromium + WebKit browsers are present"
  pnpm exec playwright install chromium webkit
fi

echo "==> Install complete."
