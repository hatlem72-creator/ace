#!/usr/bin/env bash
# Process raw art in img-src/ -> img/, rebuild pages, commit and push.
set -euo pipefail
cd "$(dirname "$0")"
python3 make_images.py
python3 build.py
git add -A
git commit -m "${1:-Update illustrations}" || true
git push origin main
