#!/usr/bin/env python3
"""Generate the 50-shot curly-hair portfolio in parallel via codex imagegen.

Usage:
    PARALLEL=4 ./scripts/gen-portfolio.py [start_idx] [end_idx]

Both indexes are inclusive and 1-based. Defaults to the full 1..50 range.
Skips any output that already exists, so reruns only fill gaps.
"""
import argparse
import concurrent.futures
import os
import pathlib
import subprocess
import sys
import time

PROJECT = pathlib.Path(__file__).resolve().parent.parent
SCRIPT = PROJECT / "scripts" / "gen-image.sh"
INTERIOR = PROJECT / "images" / "salon-interior.png"
VANESSA = PROJECT / "images" / "vanessa.png"
OUT_DIR = PROJECT / "images" / "portfolio"
OUT_DIR.mkdir(parents=True, exist_ok=True)

# Vanessa pose clauses. Empty string = client-only shot (no Vanessa).
V_NO = ""

BASE = (
    "Generate one photorealistic 3:4 vertical candid portrait shot inside the salon. "
    "Use the two attached images as visual references: the first attached image is the "
    "salon interior — match this exact background, lighting, brick/wood context, and "
    "styling-station chair; the second attached image is Vanessa, the stylist — when "
    "she appears in the shot, match her face, hair, deep-brown skin tone, freckles, and "
    "matte-black canvas apron over cream linen exactly. The client's hair has just been "
    "finished — the cut and curl style is the focus, freshly groomed, defined and glossy "
    "but natural (not over-product-shiny). "
    "AUTHENTIC real-human skin texture: visible pores, freckles, slight asymmetry, "
    "occasional small blemishes, faint laugh lines or under-eye softness, natural eyebrow "
    "shape. NOT a polished fashion model — looks like a real everyday client. "
    "Lighting: soft natural daylight from the salon's industrial side window, warm wood "
    "and brick context bokeh, gentle warm fill from the dressing-room bulbs. "
    "Style: documentary editorial photography, prime lens (50mm or 85mm equivalent), "
    "shallow depth of field, eye-level. "
    "Composition: head-and-shoulders or upper-torso framing, client's hair clearly visible, "
    "salon interior recognisable in soft bokeh behind. "
    "{vanessa} "
    "{subject} "
    "No text, no logos, no watermarks, no captions, no signage."
)

# Each entry: (subject_description, vanessa_clause_or_empty)
PROMPTS = [
    # ---------- Women, Type 4 coily (10) ----------
    (
        "Client: Somali woman, late 20s, deep brown skin, light freckles across cheeks, "
        "small gold stud earrings, simple oversized cream chunky-knit sweater. Hair: "
        "Type 4B defined coily afro just past the shoulders, glossy and bouncy, side parted, "
        "freshly diffused.",
        "Vanessa is in the shot, standing close behind the client and gently lifting a curl "
        "on the left side with her fingertips, eyes focused on the hair, soft warm expression."
    ),
    (
        "Client: Sudanese woman, mid 30s, very deep skin, bold red lipstick, large gold hoop "
        "earrings, sleek black turtleneck. Hair: a perfectly shaped tight 4C TWA (teeny weeny "
        "afro), uniform short coils with a clean rounded silhouette.",
        V_NO
    ),
    (
        "Client: Eritrean woman, early 40s, warm brown skin, gentle smile lines around eyes, "
        "no makeup, small silver hoops, navy linen blazer over a white tee. Hair: mid-length "
        "Type 4A/4B coily fro with elegant natural gray streaks at the temples, voluminous "
        "and soft.",
        "Vanessa is beside the client, both looking toward the mirror, Vanessa's expression "
        "warm and appreciative, one hand resting lightly on the client's shoulder."
    ),
    (
        "Client: Nigerian woman, late 20s, dark brown skin, small freckles, mustard chunky "
        "knit cardigan over a white tee. Hair: Type 4A defined twist-out, shoulder-length, "
        "side-parted ringlets, slightly stretched and bouncy.",
        V_NO
    ),
    (
        "Client: Ghanaian woman, mid 20s, deep skin, a small natural mole near the lip, "
        "vintage oversized band tee. Hair: big-volume Type 4A bantu-knot-out — defined yet "
        "wild crimped curls with lots of texture and volume.",
        "Vanessa is mid-style, holding a small open jar of curl cream in one hand, the other "
        "hand applying product to a section near the back of the head, soft focus on the hand."
    ),
    (
        "Client: Mixed-race Black/Norwegian woman, early 30s, lighter brown skin, freckles "
        "across the bridge of the nose and cheeks, soft pink rosacea flush, soft pink linen "
        "shirt. Hair: bouncy 3C/4A spirals shoulder-length, full and well-defined.",
        V_NO
    ),
    (
        "Client: Somali woman, early 50s, deep skin with visible smile lines, reading glasses "
        "pushed up onto the hair, simple cream cashmere sweater. Hair: soft 4B curly bob just "
        "below the ears with natural salt-and-pepper graying, refined and elegant.",
        "Vanessa is kneeling slightly to be at the client's eye level, holding a small round "
        "handheld mirror up to show the back of the cut, gentle focused expression."
    ),
    (
        "Client: Afro-Caribbean (Jamaican-heritage) woman, mid 30s, warm brown skin, dimple "
        "on left cheek, white silk blouse. Hair: Type 4A wash-and-go, cascading shoulder-"
        "length curls with soft face-framing layers, glossy and full.",
        V_NO
    ),
    (
        "Client: Sudanese woman, late 20s, deep skin, small gold septum ring, slim black silk "
        "camisole. Hair: defined Type 4B fro-hawk — taller curls down the centre, hair on the "
        "sides tapered very low (not shaved), edgy and fashion-forward.",
        "Vanessa is leaning back a step appraising the finished cut, hands resting lightly on "
        "her own apron, soft satisfied smile."
    ),
    (
        "Client: Ethiopian woman, mid 40s, warm-undertone brown skin, gentle laugh lines, "
        "mustard silk blouse, gold pendant necklace. Hair: voluminous Type 4A coils with "
        "natural-looking honey-brown highlights, mid-length, freshly diffused.",
        V_NO
    ),

    # ---------- Women, Type 3 curly (12) ----------
    (
        "Client: Iranian woman, late 20s, olive skin, dark eye makeup with a subtle smoky "
        "liner, simple white tee. Hair: glossy Type 3B ringlets long down to mid-back, side "
        "parted, sleek-rooted with defined ends.",
        "Vanessa is at the edge of the frame on the right, holding a hair-dryer with diffuser "
        "attachment loosely at her hip, partly out of focus."
    ),
    (
        "Client: Lebanese woman, early 30s, light olive skin, slight acne scarring on the "
        "jawline, dark brows, vintage Levi's-style denim shirt. Hair: defined Type 3A waves "
        "in a chin-length French curly bob with curtain bangs, Parisian feel.",
        V_NO
    ),
    (
        "Client: Brazilian (mixed-race) woman, mid 30s, tan skin, freckles across the nose, "
        "oversized natural linen shirt. Hair: Type 3B/3C bouncy spirals shoulder-length in a "
        "curly shag with feathered face-framing layers, voluminous and lived-in.",
        "Vanessa is behind the client, both hands gently fluffing the roots from underneath "
        "to add volume, expression focused."
    ),
    (
        "Client: Cuban woman, early 40s, warm tan skin, deep laugh lines, small gold cross "
        "necklace, black blouse. Hair: big Type 3C voluminous curls past shoulders, full and "
        "glossy with a deep side part.",
        V_NO
    ),
    (
        "Client: Pakistani woman, mid 20s, warm beige skin, light active acne and a couple of "
        "post-acne marks on the chin, kohl eyeliner, deep teal kurta-style top. Hair: glossy "
        "Type 3A long curly layers with side-swept curtain bangs, mid-length.",
        "Vanessa is beside the client laughing softly mid-conversation, both heads slightly "
        "tilted toward each other, candid moment."
    ),
    (
        "Client: South-Indian woman, early 30s, deep golden skin, freckles, a small simple "
        "stud near the centre of the forehead, cream silk blouse. Hair: Type 3B defined "
        "ringlets long to waist, glossy and uniform.",
        V_NO
    ),
    (
        "Client: Italian-Norwegian mixed woman, late 30s, light olive skin, light freckles "
        "across cheekbones, gentle smile lines, navy-and-white striped breton shirt. Hair: "
        "Type 3A loose long beachy curls with subtle balayage, mid-back length.",
        "Vanessa is partly out of focus in the background, organising styling tools at the "
        "marble counter, the client is in sharp focus in the foreground."
    ),
    (
        "Client: Sri Lankan woman, mid 30s, deep golden-brown skin, a small acne scar on the "
        "cheek, sage-green linen blouse. Hair: Type 3C tight defined ringlets in a shoulder-"
        "length curly bob, freshly diffused.",
        V_NO
    ),
    (
        "Client: Dominican woman, early 30s, golden-brown skin, freckled cheeks, large gold "
        "hoop earrings, white ribbed tank top. Hair: Type 3B/3C defined wash-and-go past the "
        "shoulders, side parted, voluminous.",
        "Vanessa is close beside the client, one hand resting gently on the client's shoulder "
        "from behind, both facing forward toward the camera/mirror, warm easy smiles."
    ),
    (
        "Client: Moroccan woman, mid 20s, light olive skin, dark thick brows, a few light "
        "freckles, oversized white shirt. Hair: Type 3B side-parted defined curls in a chin-"
        "length curly French bob, editorial Parisian feel.",
        V_NO
    ),
    (
        "Client: Greek-Norwegian mixed woman, early 50s, fair olive skin, smile lines and "
        "subtle eye crinkles, terracotta knit sweater. Hair: Type 3A curly lob with face-"
        "framing layers, natural graying at the temples.",
        "Vanessa is leaning in close to examine the ends of a curl near the client's "
        "shoulder, focused expression, fine concentration."
    ),
    (
        "Client: Colombian woman, mid 30s, tan skin, freckles across the nose, peach silk "
        "blouse, small gold studs. Hair: Type 3C curly butterfly cut shoulder-length with "
        "prominent face-framing layers, voluminous and glossy.",
        V_NO
    ),

    # ---------- Women, Type 2 wavy (6) ----------
    (
        "Client: Norwegian-Italian woman, late 20s, fair skin, freckles across cheeks and "
        "shoulders, simple oversized white tee. Hair: Type 2C beachy waves long to mid-back "
        "with subtle natural balayage, relaxed.",
        "Vanessa is combing through a section delicately with a wide-tooth comb, focused "
        "calm expression."
    ),
    (
        "Client: Filipino-Norwegian mixed woman, early 30s, light golden skin, a small acne "
        "scar near the temple, soft gray cashmere sweater. Hair: Type 2B soft waves in a "
        "shoulder-length lob with curtain bangs, minimalist.",
        V_NO
    ),
    (
        "Client: Spanish woman, mid 40s, olive skin, gentle smile lines, gold pendant "
        "necklace, charcoal turtleneck. Hair: Type 2C deep defined waves long, with natural "
        "graying at the temples.",
        "Vanessa is slightly behind the client, holding a strand of hair away from the head "
        "to length-check it against the shoulder, careful posture."
    ),
    (
        "Client: Lebanese-Norwegian mixed woman, mid 20s, tan skin, light freckles, denim "
        "button-down shirt. Hair: Type 2B/2C wavy lob shoulder-length with a deep side part, "
        "tousled and casual.",
        V_NO
    ),
    (
        "Client: Iranian woman, early 30s, olive skin, faint under-eye softness, ivory "
        "turtleneck. Hair: Type 2C waves with curtain bangs framing the face, long layers.",
        "Vanessa is mid-conversation seen from over the client's shoulder, both visible in "
        "soft profile, candid moment."
    ),
    (
        "Client: Norwegian-Eritrean mixed woman, early 40s, warm tan skin, gentle smile "
        "lines, oat-coloured chunky knit. Hair: Type 2C/3A loose long waves with subtle gray "
        "strands throughout, natural and lived-in.",
        V_NO
    ),

    # ---------- Women, varied / accent styles (12) ----------
    (
        "Client: Ethiopian woman, late 20s, deep brown skin, oversized large gold hoop "
        "earrings, mustard t-shirt. Hair: Type 4A bantu-knot-out big-volume curls with two "
        "small accent braids at the temples, Afro-futurist feel.",
        "Vanessa is just behind the client holding up a finished curl section near the "
        "crown to show its shape, satisfied smile."
    ),
    (
        "Client: Senegalese woman, mid 30s, deep skin, a gold cuff bracelet partly visible "
        "on the wrist, white linen shirt. Hair: a fully shaped round Type 4B 'crown' afro, "
        "perfectly symmetrical and regal.",
        V_NO
    ),
    (
        "Client: Afro-Brazilian woman, mid 20s, warm brown skin, freckles across cheeks, "
        "navy blazer over a white tee. Hair: Type 4A defined coily ringlets dyed a natural-"
        "looking copper-auburn, mid-length and bouncy.",
        "Vanessa's hands are gently shaping the back curls with her fingertips from behind, "
        "her face partly visible in soft focus."
    ),
    (
        "Client: Black-British woman now in Oslo, early 30s, deep skin, small gold septum "
        "ring, vintage black leather jacket. Hair: Type 4A asymmetric curly bob — clearly "
        "longer on one side than the other, edgy.",
        V_NO
    ),
    (
        "Client: Tunisian woman, late 30s, olive-tan skin, smile lines, terracotta-coloured "
        "linen blouse. Hair: Type 3C/4A defined curls in a half-up half-down style with the "
        "top section gathered into a soft twist, bohemian.",
        "Vanessa is across the styling area, both Vanessa and client visible together in the "
        "mirror reflection, the back of the client's head in the foreground (creative "
        "composition with mirror)."
    ),
    (
        "Client: Pakistani-British woman now in Oslo, mid 30s, warm beige skin, henna-stained "
        "fingertips partially visible touching the curls, soft sky-blue linen draped on the "
        "shoulders (NOT a hijab, draped scarf, hair fully visible). Hair: Type 3B curly shag "
        "with curtain bangs shoulder-length, artsy.",
        V_NO
    ),
    (
        "Client: Eritrean woman, early 20s, deep skin, small silver nose ring, oversized "
        "graphic tee. Hair: Type 4A soft curly mohawk — defined coils in the centre, hair "
        "on the sides tapered low (not shaved), youth-alternative vibe.",
        "Vanessa has a hair-dryer with diffuser attachment, hand at the lower back of the "
        "client's head, mid-style focused expression."
    ),
    (
        "Client: Iraqi-Norwegian mixed woman, late 20s, warm olive skin, light freckles, "
        "cream sweater. Hair: Type 3B/3C defined curls with a full curly fringe (curly bangs "
        "across the forehead), French-girl curly.",
        V_NO
    ),
    (
        "Client: Norwegian-Somali mixed woman, mid 30s, light brown skin, freckles, a "
        "pronounced dimple, sage-green button-down. Hair: Type 4A/3C voluminous spiral curls "
        "with subtle honey highlights, mid-length, modern multicultural elegance.",
        "Vanessa is just behind the client's right shoulder smiling toward the client, hand "
        "softly resting on the client's shoulder, both faces in the same plane of focus."
    ),
    (
        "Client: Algerian woman, early 40s, olive skin, smile lines, deep red lipstick, "
        "black silk blouse. Hair: Type 3C side-parted long curls with natural gray strands "
        "at the temples, timeless mature elegance.",
        V_NO
    ),
    (
        "Client: Indonesian-Norwegian mixed woman, early 30s, golden skin, light acne marks "
        "on cheeks, oversized natural linen shirt. Hair: Type 2C/3A wavy-curly lob with "
        "subtle layers, Tokyo-Scandi minimalist feel.",
        "Vanessa is slightly behind the client clipping back a top section with a small "
        "metal sectioning clip, focused careful posture."
    ),
    (
        "Client: Cuban-Spanish woman, late 20s, tan skin, freckles, a small mole on the "
        "right cheek, white silk camisole. Hair: Type 3B/3C double-strand-twist-out long "
        "ringlets cascading past the shoulders, glossy.",
        V_NO
    ),

    # ---------- Men (10) ----------
    (
        "Client: Eritrean man, early 30s, deep brown skin, short groomed beard, simple white "
        "tee, simple gold chain. Hair: Type 4A defined coily textured taper fade — curls "
        "full and dense on top, sides crisply faded short, sharp clean line at the front.",
        "Vanessa is trimming with sharp scissors near the nape, focused careful expression, "
        "scissors clearly visible mid-snip."
    ),
    (
        "Client: Somali man, late 20s, deep skin, slight short beard, oversized denim jacket "
        "over a black tee. Hair: Type 4B mid-length coily fro on top with subtle taper at "
        "the sides, streetwear feel.",
        V_NO
    ),
    (
        "Client: Lebanese man, mid 30s, olive skin, dark stubble, charcoal henley. Hair: "
        "Type 3B defined curls with a disconnected undercut — long curls on top swept "
        "slightly to one side, sharp short sides, edgy fashion.",
        "Vanessa is beside the client adjusting the disconnected undercut line with a "
        "clipper guard, focused careful expression."
    ),
    (
        "Client: Brazilian man, early 40s, tan skin, dark stubble, slight crow's feet, navy "
        "linen shirt unbuttoned at the collar. Hair: Type 3C medium curly pompadour — "
        "textured curls on top swept back, slightly shorter sides, warm executive feel.",
        V_NO
    ),
    (
        "Client: Iranian man, late 20s, olive skin, full short beard, slight acne scarring "
        "on the neck, beige sweatshirt. Hair: Type 3B/3C long shoulder-length curls with a "
        "centre part, loose man-bun half-up at the back (most curls hanging free), artist "
        "creative.",
        "Vanessa is finger-coiling a curl near the client's temple gently, soft focused "
        "expression."
    ),
    (
        "Client: Black-Norwegian-mixed man, mid 30s, mixed-undertone brown skin, light "
        "freckles, single small gold stud earring, soft gray Oxford shirt. Hair: Type 4A "
        "curly mid-fade with sponge-defined uniform coils on top, corporate creative feel.",
        V_NO
    ),
    (
        "Client: Sudanese man, early 30s, deep skin, gold-rimmed thin glasses, plain black "
        "tee. Hair: Type 4B coily afro mohawk soft — longer in the centre column, hair on "
        "the sides tapered low (not shaved), intellectual edgy feel.",
        "Vanessa is holding a small handheld round mirror behind the client's head to show "
        "him the back of the cut, gentle smile."
    ),
    (
        "Client: Italian-Norwegian mixed man, late 20s, light olive skin, dark stubble, "
        "cream rib-knit henley. Hair: Type 2C/3A messy beach waves chin-length, laid-back "
        "surfer feel.",
        V_NO
    ),
    (
        "Client: Pakistani-Norwegian mixed man, late 30s, warm beige skin, light short "
        "beard, oat-coloured sweatshirt. Hair: Type 3B defined curls in a curly French crop "
        "— short clean front, slightly longer textured curls on top, minimalist.",
        "Vanessa is at the back of the chair framing the curls at the front of the client's "
        "head with both hands shaping, warm soft smile."
    ),
    (
        "Client: Moroccan man, mid 30s, warm olive skin, dark short groomed beard, slim gold "
        "ring on a finger partly visible, dark olive linen shirt. Hair: Type 3C curly "
        "textured slick-back — defined curls combed back from the forehead, mid-length.",
        V_NO
    ),
]

assert len(PROMPTS) == 50, f"expected 50 prompts, got {len(PROMPTS)}"


def build_prompt(subject: str, vanessa_clause: str) -> str:
    return BASE.format(subject=subject, vanessa=vanessa_clause)


def run_one(idx: int, subject: str, vanessa_clause: str) -> str:
    out_path = OUT_DIR / f"{idx:02d}.png"
    if out_path.exists() and out_path.stat().st_size > 0:
        return f"SKIP {idx:02d} (exists)"
    prompt = build_prompt(subject, vanessa_clause)
    cmd = [
        str(SCRIPT),
        str(out_path),
        prompt,
        "-i", str(INTERIOR),
        "-i", str(VANESSA),
    ]
    t0 = time.time()
    r = subprocess.run(cmd, capture_output=True, text=True)
    dt = time.time() - t0
    if r.returncode != 0:
        tail = (r.stderr or r.stdout or "").strip().splitlines()[-3:]
        return f"FAIL {idx:02d} ({dt:.1f}s): {' | '.join(tail)[:300]}"
    return f"OK   {idx:02d} ({dt:.1f}s)"


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("start", nargs="?", type=int, default=1)
    parser.add_argument("end", nargs="?", type=int, default=50)
    args = parser.parse_args()

    if not INTERIOR.exists() or not VANESSA.exists():
        print(f"FATAL: missing seed images. interior={INTERIOR.exists()} vanessa={VANESSA.exists()}", file=sys.stderr)
        return 2

    parallel = int(os.environ.get("PARALLEL", "3"))
    todo = [
        (i, PROMPTS[i - 1][0], PROMPTS[i - 1][1])
        for i in range(args.start, args.end + 1)
    ]
    print(f"[orchestrator] running {len(todo)} jobs with parallel={parallel}", flush=True)
    fails = 0
    with concurrent.futures.ThreadPoolExecutor(max_workers=parallel) as ex:
        futs = {ex.submit(run_one, i, s, v): i for (i, s, v) in todo}
        for f in concurrent.futures.as_completed(futs):
            res = f.result()
            print(res, flush=True)
            if res.startswith("FAIL"):
                fails += 1
    print(f"[orchestrator] done. failures={fails}", flush=True)
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
