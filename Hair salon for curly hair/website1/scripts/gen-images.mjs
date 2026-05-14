#!/usr/bin/env node
// Direct orchestrator for Codex imagegen → website1/public/images/
// Spawns codex exec calls in parallel batches, captures thread_id from --json
// output, finds the generated PNG, converts to JPG via sips, saves to target.

import { spawn } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_IMAGES = path.join(ROOT, "public/images");
const CODEX_HOME = process.env.CODEX_HOME || path.join(os.homedir(), ".codex");
const GEN_DIR = path.join(CODEX_HOME, "generated_images");
const CONCURRENCY = Number(process.env.CONCURRENCY || 4);

const PHOTO_TEST = `Photography Test (mandatory): Type 4 hair, dark skin, properly lit (skin-aware, no muddy darks), joyful, real-life context. Editorial / documentary register, NOT beauty. No mudcloth or kente decoration. No "wavy 2b girl with a flip." Photorealistic, no text overlay, no logo, no watermark.`;

// Mirrors lib/content/images.ts. Keep in sync.
const manifest = [
  { file: "hero-primary.jpg", aspect: "portrait", prompt:
      "Editorial portrait of a Black woman in her late 20s with Type 4a/4b natural curls, mid-laugh, looking off-camera. Warm cream studio backdrop. Soft directional daylight from camera-left, properly lit dark skin. Wearing a simple ribbed cream tank. Hands relaxed. Frame: from collarbones up, head centered with breathing room above." },
  { file: "hero-alt-1.jpg", aspect: "portrait", prompt:
      "Black man, early 30s, sharp high-top fade with defined coils on top — Lakeith Stanfield silhouette. Documentary register: shot on a street outside a Grünerløkka café in Oslo, mid-conversation, gesturing with one hand. Late-afternoon golden light. Wearing a textured wool coat over an off-white turtleneck. Frame: chest up." },
  { file: "hero-alt-2.jpg", aspect: "landscape", prompt:
      "Mid-action mid-cut: a Black female stylist (Vanessa, mid-30s, sisterlocks) cutting another woman's Type 3c curls with scissors, dry-cutting, curl by curl. Both women smiling slightly mid-conversation. Salon interior visible in soft focus background — cream walls, brass details, plants. Documentary / editorial. Hands in focus." },

  { file: "founder-portrait.jpg", aspect: "portrait", prompt:
      "Editorial portrait of Vanessa Jackson, mid-30s, Black British woman with shoulder-length sisterlocks. Direct gaze, slight half-smile. Wearing a tobacco-brown linen overshirt. Warm cream studio backdrop. Soft daylight from camera-left. Frame: chest up. Confident salon owner / editorial founder portrait, not corporate headshot." },
  { file: "founder-hands.jpg", aspect: "landscape", prompt:
      "Close-up of a Black woman's hands working a section of Type 4 hair — fingers separating coils, gold rings on two fingers. Documentary, soft top-light. Skin tones rendered properly. Tight crop on hands and a portion of hair only." },

  { file: "team-nia.jpg", aspect: "portrait", prompt:
      "Editorial portrait of a mixed-heritage woman in her late 20s with Type 3b spiral curls in a low bun, gold hoop earrings. Warm cream backdrop, soft directional light, slight smile. Frame: shoulders up." },
  { file: "team-ade.jpg", aspect: "portrait", prompt:
      "Editorial portrait of a Black man in his late 30s with a sharp barbered taper and short coils on top, well-groomed beard. Warm cream backdrop. Confident, slight smile. Shoulders up." },
  { file: "team-mira.jpg", aspect: "portrait", prompt:
      "Editorial portrait of a Somali-Norwegian woman in her early 30s with sisterlocks styled half-up, hoop earrings, calm direct gaze. Warm cream backdrop. Shoulders up." },
  { file: "team-ines.jpg", aspect: "portrait", prompt:
      "Editorial portrait of a white-passing mixed-heritage woman in her early 40s with Type 3a wavy-curly hair shoulder length, freckles, warm slight smile. Warm cream backdrop. Shoulders up." },

  { file: "portfolio-2a-1.jpg", aspect: "portrait", prompt:
      "Three-quarter editorial portrait of a Norwegian woman, late 30s, Type 2A loose waves freshly cut to shoulder length, day-2 hair (slightly air-dried). Outside on a Grünerløkka street, autumn light. Wearing a navy oversized blazer." },
  { file: "portfolio-2b-1.jpg", aspect: "portrait", prompt:
      "Editorial portrait of a Type 2B/2C wavy-curly woman, mid-30s, mid-length cut with face-framing layers, mixed Asian-European heritage. Warm cream backdrop, soft daylight." },
  { file: "portfolio-3a-1.jpg", aspect: "portrait", prompt:
      "Editorial portrait of a mixed-heritage woman late 20s with shoulder-length Type 3A spiral curls, freshly cut for definition. Slight side glance. Warm cream backdrop." },
  { file: "portfolio-3b-1.jpg", aspect: "portrait", prompt:
      "Editorial portrait of a Black-Afro-Latina woman early 30s, voluminous Type 3B/3C ringlet curls mid-length, joyful expression. Warm cream backdrop." },
  { file: "portfolio-3c-1.jpg", aspect: "portrait", prompt:
      "Three-quarter portrait of a Black woman mid-20s, freshly cut Type 3C corkscrew curls, day-1 hair, voluminous. Outside, Oslo storefront soft background. Confident gaze." },
  { file: "portfolio-4a-1.jpg", aspect: "portrait", prompt:
      "Editorial portrait of a Black woman, late 20s, Type 4A coils freshly shaped — defined, voluminous, mid-length. Warm cream backdrop. Hand resting near her cheek. Soft direct daylight." },
  { file: "portfolio-4b-1.jpg", aspect: "portrait", prompt:
      "Editorial portrait of a Black woman, mid-30s, Type 4B Z-pattern coils sculpted into a tapered afro shape. Looking over her shoulder, mid-laugh. Warm cream backdrop, dappled light." },
  { file: "portfolio-4c-1.jpg", aspect: "portrait", prompt:
      "Editorial portrait of a dark-skinned Black woman, late 20s, Type 4C tightly coiled crown freshly shaped — strong silhouette. Wearing gold hoop earrings. Direct confident gaze. Warm cream backdrop, properly lit dark skin." },
  { file: "portfolio-men-fade-coils.jpg", aspect: "portrait", prompt:
      "Editorial portrait of a Black man, early 30s, sharp low-fade with defined Type 4A coils on top — clean lineup at the temple, mid-laugh. Warm cream backdrop." },
  { file: "portfolio-men-locs.jpg", aspect: "portrait", prompt:
      "Editorial portrait of a Black man late 20s, mid-length sisterlocks freshly maintained, head turned slightly. Warm cream backdrop." },
  { file: "portfolio-color-1.jpg", aspect: "portrait", prompt:
      "Editorial portrait of a mixed-heritage woman late 20s, Type 3B curls with curl-safe deep auburn balayage. Warm cream backdrop, side-lit so the color reads." },
  { file: "portfolio-color-2.jpg", aspect: "portrait", prompt:
      "Editorial portrait of a Black woman mid-20s, Type 4A coils with subtle copper highlights through the canopy. Warm cream backdrop." },

  { file: "method-1-assess.jpg", aspect: "landscape", prompt:
      "Documentary close-up: stylist's hands gently lifting a section of Type 4 coils to assess the curl pattern dry, before cutting. Salon interior soft focus. Warm light. Hands and a section of hair only — tight crop." },
  { file: "method-2-cut.jpg", aspect: "landscape", prompt:
      "Documentary mid-shot: stylist mid-cut, scissors visible, snipping a single dry curl. Client visible only in soft focus. Salon interior. Warm side light." },
  { file: "method-3-finish.jpg", aspect: "landscape", prompt:
      "Documentary close-up: client's finished Type 4 coils with a hand running through them, defined and voluminous. Salon mirror visible in background, soft." },

  { file: "visit-exterior.jpg", aspect: "landscape", prompt:
      "Quiet exterior shot of a small tasteful salon storefront on a Grünerløkka street in Oslo. Cream-colored signage, dark window frames, plants visible inside. Late afternoon warm light, no people. Wide architectural frame." },
  { file: "visit-interior.jpg", aspect: "landscape", prompt:
      "Salon interior, no people. Two styling chairs visible, mirrors, cream walls, terracotta-toned accents (a single ceramic vase, framed art), plants, brass shelving with retail products. Warm indirect daylight from a window." },

  { file: "retail-hero.jpg", aspect: "landscape", prompt:
      "Still-life of curl products on a warm cream surface with terracotta-toned ceramic dish: bottles labeled like Bread, Pattern, Bouclème, a sponge brush, a silk durag folded neatly, a microfiber curl T-shirt. Editorial product styling, soft daylight from camera-left." },
  { file: "retail-1.jpg", aspect: "square", prompt:
      "Single-product editorial: a leave-in conditioner bottle on a warm cream backdrop, soft top-light, tight composition." },
  { file: "retail-2.jpg", aspect: "square", prompt:
      "Single-product editorial: a sponge brush (twist sponge) on a warm cream backdrop, soft top-light, tight composition." },
  { file: "retail-3.jpg", aspect: "square", prompt:
      "Single-product editorial: a folded silk durag in deep teal on a warm cream backdrop, soft top-light, tight composition." },

  { file: "journal-1.jpg", aspect: "landscape", prompt:
      "Editorial photograph: a hand cradling a small ceramic dish containing scalp oil, dropper visible, on a warm cream surface with linen napkin folded nearby." },
  { file: "journal-2.jpg", aspect: "landscape", prompt:
      "Documentary photograph: a small group of mixed-heritage women in their 20s-30s, in a salon space mid-conversation, candid. Warm soft daylight. Some seated on a low bench, others standing." },
  { file: "journal-3.jpg", aspect: "landscape", prompt:
      "Editorial: a Black mother gently styling her young daughter's (mixed-heritage, age 5-6) Type 3C curls at a salon station, mirror visible, warm tones, both smiling." },
  { file: "journal-4.jpg", aspect: "landscape", prompt:
      "Editorial: an array of three head silhouettes from the back, varied curl types (3A waves, 3C ringlets, 4B coils), warm cream backdrop, like a typology illustration. Soft directional light." },
];

function aspectSize(aspect) {
  switch (aspect) {
    case "portrait": return "1024×1280";
    case "landscape": return "1280×800";
    case "square": return "1024×1024";
    default: return "1024×1024";
  }
}

async function exists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

function runCodex(prompt) {
  return new Promise((resolve, reject) => {
    const args = [
      "exec", "--json",
      "--ephemeral",
      "--skip-git-repo-check",
      "--sandbox", "read-only",
      "--enable", "image_generation",
      prompt,
    ];
    const proc = spawn("codex", args, { stdio: ["ignore", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";
    proc.stdout.on("data", d => { stdout += d.toString(); });
    proc.stderr.on("data", d => { stderr += d.toString(); });
    proc.on("error", reject);
    proc.on("exit", code => {
      if (code !== 0 && code !== null) {
        reject(new Error(`codex exit ${code}: ${stderr.slice(0, 400)}`));
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

function extractThreadId(stdout) {
  // Try multiple patterns — Codex JSON event names vary across versions
  for (const line of stdout.split("\n")) {
    if (!line.trim()) continue;
    try {
      const ev = JSON.parse(line);
      // Common shapes
      if (ev.thread_id) return ev.thread_id;
      if (ev.thread?.thread_id) return ev.thread.thread_id;
      if (ev.thread?.id) return ev.thread.id;
      if (ev.id && ev.type === "thread.started") return ev.id;
      if (ev.type === "thread.started" && ev.thread_id) return ev.thread_id;
      if (ev.session_id) return ev.session_id;
    } catch {}
  }
  // Fallback: regex
  const m = stdout.match(/"thread_id"\s*:\s*"([^"]+)"/);
  if (m) return m[1];
  return null;
}

async function findGeneratedPng(threadId) {
  const dir = path.join(GEN_DIR, threadId);
  const files = await fs.readdir(dir).catch(() => []);
  const pngs = files.filter(f => f.endsWith(".png"));
  if (pngs.length === 0) return null;
  // Take the most recent
  const stats = await Promise.all(
    pngs.map(async f => ({ f, m: (await fs.stat(path.join(dir, f))).mtimeMs }))
  );
  stats.sort((a, b) => b.m - a.m);
  return path.join(dir, stats[0].f);
}

async function findRecentPngFallback() {
  // Find any PNG generated in the last 5 minutes, most recent first
  const sessions = await fs.readdir(GEN_DIR).catch(() => []);
  const candidates = [];
  const cutoff = Date.now() - 5 * 60 * 1000;
  for (const s of sessions) {
    const d = path.join(GEN_DIR, s);
    const files = await fs.readdir(d).catch(() => []);
    for (const f of files) {
      if (!f.endsWith(".png")) continue;
      const stat = await fs.stat(path.join(d, f)).catch(() => null);
      if (stat && stat.mtimeMs > cutoff) {
        candidates.push({ p: path.join(d, f), m: stat.mtimeMs });
      }
    }
  }
  candidates.sort((a, b) => b.m - a.m);
  return candidates[0]?.p || null;
}

async function convertToJpg(srcPng, destJpg) {
  return new Promise((resolve, reject) => {
    const proc = spawn("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "85", srcPng, "--out", destJpg], { stdio: "ignore" });
    proc.on("error", reject);
    proc.on("exit", code => code === 0 ? resolve() : reject(new Error(`sips exit ${code}`)));
  });
}

async function processOne(item) {
  const target = path.join(PUBLIC_IMAGES, item.file);
  if (await exists(target)) {
    return { file: item.file, status: "skip-exists" };
  }
  const fullPrompt = [
    `Use the built-in image_gen tool directly. Do not use CLI fallback or OpenAI API scripts. Do not modify the workspace.`,
    `Generate one preview-only photorealistic editorial raster image at approximately ${aspectSize(item.aspect)} pixels.`,
    `Subject: ${item.prompt}`,
    PHOTO_TEST,
    `Save to default Codex preview artifact under CODEX_HOME/generated_images. Report GENERATION_OK and the generated path.`,
  ].join("\n\n");

  const { stdout } = await runCodex(fullPrompt);
  let threadId = extractThreadId(stdout);
  let src = null;
  if (threadId) {
    src = await findGeneratedPng(threadId);
  }
  if (!src) {
    // Fallback: look for the most recent PNG in any session dir from the last 5 min
    src = await findRecentPngFallback();
  }
  if (!src) {
    throw new Error(`no PNG produced for ${item.file} (threadId=${threadId})`);
  }
  await convertToJpg(src, target);
  const stat = await fs.stat(target);
  return { file: item.file, status: "generated", bytes: stat.size, threadId };
}

async function runQueue(items, concurrency) {
  const queue = [...items];
  const inflight = new Set();
  const results = [];

  function start() {
    while (queue.length && inflight.size < concurrency) {
      const item = queue.shift();
      const p = processOne(item)
        .then(r => { results.push(r); console.log(`✓ ${r.file} (${r.status}${r.bytes ? `, ${(r.bytes/1024).toFixed(0)}KB` : ""})`); })
        .catch(err => { results.push({ file: item.file, status: "error", error: err.message }); console.error(`✗ ${item.file}: ${err.message}`); })
        .finally(() => { inflight.delete(p); start(); });
      inflight.add(p);
    }
  }

  start();
  while (inflight.size > 0) {
    await Promise.race(inflight);
  }
  return results;
}

async function main() {
  await ensureDir(PUBLIC_IMAGES);

  // Filter: only items not already on disk
  const todo = [];
  for (const item of manifest) {
    if (await exists(path.join(PUBLIC_IMAGES, item.file))) {
      console.log(`= ${item.file} (already exists)`);
    } else {
      todo.push(item);
    }
  }
  console.log(`\n${todo.length} images to generate, concurrency ${CONCURRENCY}\n`);
  if (todo.length === 0) return;

  const results = await runQueue(todo, CONCURRENCY);

  const ok = results.filter(r => r.status === "generated").length;
  const err = results.filter(r => r.status === "error").length;
  console.log(`\n=== summary: ${ok} generated, ${err} failed ===`);
  if (err > 0) {
    console.log("Failures:");
    for (const r of results.filter(x => x.status === "error")) {
      console.log(`  ${r.file}: ${r.error}`);
    }
    process.exit(1);
  }
}

main().catch(err => { console.error(err); process.exit(1); });
