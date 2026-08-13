#!/usr/bin/env bash
#
# Long-running dev-server terminal for the Class Odontologia MVP.
#
# Runs `pnpm dev` once the Next.js app is initialized and defines a `dev`
# script (Wave 0 / ISSUE-001). Until then it prints guidance and exits so the
# terminal does not fail on a documentation-only checkout.
set -euo pipefail

if [ -f package.json ] && node -e "process.exit(((require('./package.json').scripts)||{}).dev?0:1)" 2>/dev/null; then
  echo "==> Starting Next.js dev server: pnpm dev"
  exec pnpm dev
fi

echo "Next.js app not initialized yet (Wave 0 / ISSUE-001)."
echo "This terminal will run 'pnpm dev' automatically once package.json defines a 'dev' script."
