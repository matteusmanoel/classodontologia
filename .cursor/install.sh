#!/usr/bin/env bash
#
# Idempotent Cloud Agent bootstrap for the Class Odontologia MVP.
#
# This is a repository-file-managed environment (.cursor/environment.json), so it
# runs on Cursor's default base image. The script is fully self-sufficient: it
# does not depend on any pre-baked snapshot state.
#
# The repository is documentation-only until Wave 0 / ISSUE-001 initializes the
# Next.js application (see docs/IMPLEMENTATION_ISSUES.md). Every app step therefore
# guards on the presence of project files, so this script is safe to run both
# before and after the app exists, and safe to run repeatedly.
set -euo pipefail

# --- Deterministic package manager --------------------------------------------
# Enable corepack so a repo-pinned "packageManager" is honored once Wave 0 adds
# one. Until then, pin a known-good pnpm so behavior does not drift with whatever
# corepack ships as its default on the base image.
corepack enable >/dev/null 2>&1 || true
if ! grep -q '"packageManager"' package.json 2>/dev/null; then
  corepack prepare pnpm@10.33.3 --activate >/dev/null 2>&1 || true
fi

# `pnpm run <script>` otherwise re-verifies (and can re-install) dependencies on
# every invocation; this script owns installation, so disable that redundant
# check to keep dev/build/test commands fast and deterministic.
pnpm config set verify-deps-before-run false --location=global >/dev/null 2>&1 || true

echo "==> Toolchain: node $(node -v) | pnpm $(pnpm -v 2>/dev/null || echo 'n/a') | ffmpeg $(ffmpeg -version 2>/dev/null | head -1 | awk '{print $3}')"

if [ ! -f package.json ]; then
  echo "==> No package.json yet — the Next.js app is not initialized (Wave 0 / ISSUE-001)."
  echo "==> Nothing to install. The environment toolchain is ready for that work."
  exit 0
fi

# --- JavaScript dependencies ---------------------------------------------------
echo "==> package.json found — installing dependencies with pnpm"
if [ -f pnpm-lock.yaml ]; then
  pnpm install --frozen-lockfile
else
  pnpm install
fi

# --- Playwright QA browsers (Chromium + WebKit per docs/QA_STRATEGY.md) --------
# Only runs once Playwright is a project dependency. Prefer --with-deps so the
# WebKit/Chromium OS libraries are installed on the default image; fall back to a
# plain browser install if privileged dependency installation is unavailable.
if pnpm exec playwright --version >/dev/null 2>&1; then
  echo "==> Playwright detected — ensuring Chromium + WebKit browsers"
  pnpm exec playwright install --with-deps chromium webkit \
    || pnpm exec playwright install chromium webkit
fi

echo "==> Install complete."
