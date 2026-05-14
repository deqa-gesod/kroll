#!/usr/bin/env bash
# gen-image.sh <output_path> <prompt> [-i ref1 -i ref2 ...]
# Runs codex exec with built-in image_gen and copies the result to <output_path>.
set -euo pipefail

if [ $# -lt 2 ]; then
  echo "usage: $0 <output_path> <prompt> [-i ref1 ...]" >&2
  exit 2
fi

OUT="$1"; shift
PROMPT="$1"; shift

# Remaining args are passed through (expecting -i FILE pairs).
# Use a guarded expansion below to handle the empty-array case under `set -u`.
REF_ARGS=("$@")

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
LOG_DIR="$PROJECT_ROOT/logs"
mkdir -p "$LOG_DIR"

BASE="$(basename "$OUT")"
BASE="${BASE%.*}"
JSON_LOG="$LOG_DIR/$BASE.jsonl"
ERR_LOG="$LOG_DIR/$BASE.err"

# Build full prompt that nudges the model to use the built-in image_gen tool.
FULL_PROMPT="Use the built-in image_gen tool to generate exactly one image. Do not modify the workspace. After generation, report GENERATION_OK and the absolute path of the generated file. ${PROMPT}"

# Note: codex by default expects to run inside a git repo; --skip-git-repo-check avoids that.
# --ephemeral keeps state out of the project; --sandbox read-only is harmless and avoids workspace writes.
codex exec \
  --json \
  --ephemeral \
  --sandbox read-only \
  --skip-git-repo-check \
  --enable image_generation \
  ${REF_ARGS[@]+"${REF_ARGS[@]}"} \
  -- \
  "$FULL_PROMPT" \
  >"$JSON_LOG" 2>"$ERR_LOG" || {
    echo "FAIL: codex exec failed for $OUT (see $ERR_LOG, $JSON_LOG)" >&2
    exit 1
  }

# Extract thread_id from the first thread.started event.
THREAD_ID="$(python3 - "$JSON_LOG" <<'PY'
import json, sys
path = sys.argv[1]
with open(path) as f:
    for line in f:
        line = line.strip()
        if not line:
            continue
        try:
            ev = json.loads(line)
        except Exception:
            continue
        if ev.get("type") == "thread.started" and ev.get("thread_id"):
            print(ev["thread_id"])
            break
        # Alternate shapes — be defensive.
        if isinstance(ev.get("thread"), dict) and ev["thread"].get("id"):
            print(ev["thread"]["id"])
            break
PY
)"

CODEX_HOME="${CODEX_HOME:-$HOME/.codex}"
SRC=""
if [ -n "$THREAD_ID" ]; then
  DIR="$CODEX_HOME/generated_images/$THREAD_ID"
  if [ -d "$DIR" ]; then
    # Pick the newest image in the thread dir.
    SRC="$(find "$DIR" -maxdepth 2 -type f \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.webp' \) -print0 \
      | xargs -0 ls -t 2>/dev/null | head -n 1 || true)"
  fi
fi

if [ -z "$SRC" ]; then
  echo "FAIL: could not locate generated image (thread_id='$THREAD_ID') for $OUT" >&2
  echo "       JSON log: $JSON_LOG" >&2
  echo "       Err log:  $ERR_LOG" >&2
  exit 1
fi

mkdir -p "$(dirname "$OUT")"
cp "$SRC" "$OUT"
echo "OK: $OUT  <-  $SRC"
