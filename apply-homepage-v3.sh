#!/usr/bin/env bash
set -euo pipefail

# Run this script from the repository root after unzipping this patch there.
for required in hugo.toml layouts static content; do
  if [[ ! -e "$required" ]]; then
    echo "Error: run this from the root of your Hugo repository." >&2
    exit 1
  fi
done

rm -f \
  content/projects/tesla-shakti-tee.md \
  content/projects/open-titan-otbn.md \
  content/projects/ascon-memauth.md \
  content/projects/moonstone-soc.md \
  content/notes/otbn-rnd-vs-urnd.md

echo "Homepage v3 applied. Real starter project names removed; portrait enlarged."
echo "You can now run: hugo server -D"
