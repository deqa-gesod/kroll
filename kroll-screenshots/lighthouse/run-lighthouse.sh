#!/usr/bin/env bash
set -e
OUT="/Users/deqagesod/Documents/kroll/kroll-screenshots/lighthouse"
CHROME_FLAGS="--headless --no-sandbox --disable-gpu"

run() {
  local url="$1"
  local name="$2"
  echo ">>> $name :: $url"
  npx --yes lighthouse "$url" \
    --form-factor=mobile \
    --screenEmulation.mobile=true \
    --screenEmulation.width=412 \
    --screenEmulation.height=823 \
    --screenEmulation.deviceScaleFactor=1.75 \
    --throttling.cpuSlowdownMultiplier=4 \
    --output=json --output=html \
    --output-path="$OUT/$name" \
    --chrome-flags="$CHROME_FLAGS" \
    --quiet \
    --only-categories=performance,accessibility,best-practices,seo || echo "FAIL: $name"
}

# Website 1 (port 3010)
run "http://localhost:3010/"          "w1-home"
run "http://localhost:3010/shop"      "w1-shop"
run "http://localhost:3010/booking"   "w1-booking"
run "http://localhost:3010/portfolio" "w1-portfolio"

# Website 2 (port 3020)
run "http://localhost:3020/"          "w2-home"
run "http://localhost:3020/shop"      "w2-shop"
run "http://localhost:3020/booking"   "w2-booking"
run "http://localhost:3020/portfolio" "w2-portfolio"

echo "DONE"
