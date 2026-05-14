#!/usr/bin/env python3
"""Generate 20 candid iPhone/Instagram-style portfolio shots (51..70).

Different aesthetic from gen-portfolio.py: shot on a phone, casual lighting,
imperfect framing, post-on-Instagram vibe. Same salon and Vanessa as references.

Usage:
    PARALLEL=20 ./scripts/gen-portfolio-iphone.py [start_idx] [end_idx]
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

# Indices for output filenames; 51..70.
START_INDEX = 51

V_NO = ""

BASE = (
    "Generate one realistic 3:4 vertical iPhone-style photo, as if a client or "
    "stylist quickly snapped a casual phone pic during an appointment to post on "
    "Instagram. Use the two attached images as visual references: the first is the "
    "salon interior — match the room, brick wall, large industrial window, plants, "
    "Edison-bulb mirror, matte-black chair; the second is Vanessa, the stylist — "
    "when she appears in the shot, match her face, deep-brown skin, curly afro, "
    "freckles, and matte-black canvas apron over cream linen exactly. "
    "LOOK AND FEEL: "
    "Shot on a modern iPhone (NOT a studio camera, NOT a DSLR, NOT editorial "
    "photography). Lighting is real salon lighting — overhead salon downlights and "
    "the warm Edison bulbs around the mirror, mixed with cool daylight from the "
    "industrial window. Slightly imperfect: small areas a touch over-exposed near "
    "the bulbs, gentle shadows on the face, a bit of warm-and-cool mixed colour "
    "cast. Subtle digital noise / phone-grain in shadow areas. Realistic phone HDR "
    "tone-mapping. "
    "Composition is a little casual — not perfectly centred, not editorial. May be "
    "slightly tilted, framing a bit tight or a bit loose. Could include a hand "
    "holding the phone visible in the mirror, a cropped shoulder, a slight motion "
    "blur. Looks like an actual Instagram post from a real small salon — authentic, "
    "warm, not over-produced. "
    "AUTHENTIC real-human skin texture: visible pores, freckles, slight asymmetry, "
    "small natural blemishes, faint under-eye softness, natural eyebrow shape, a few "
    "stray hair flyaways. NOT a polished fashion model — looks like a real client. "
    "{vanessa} "
    "{subject} "
    "No text, no logos, no watermarks, no captions, no UI overlays, no Instagram "
    "interface, no signage."
)

# Each entry: (subject, vanessa_clause_or_empty)
PROMPTS = [
    # 51 — mirror selfie
    (
        "Client: Eritrean woman, early 20s, deep brown skin with a fresh dewy glow, "
        "light freckles. Hair: Type 3C/4A fresh wash-and-go, defined curls past "
        "shoulders. Wearing a simple oversized white tee. Composition: she is "
        "holding her own iPhone toward the salon mirror in a clear mirror-selfie "
        "pose, phone visible in her hand, soft front-flash glare on the mirror, "
        "salon Edison bulbs blooming around the mirror frame.",
        "Vanessa is partly visible behind her in the mirror, hands gently adjusting "
        "a curl section, smiling softly toward the mirror."
    ),
    # 52 — over-the-shoulder phone shot
    (
        "Client: Brazilian woman, mid 30s, tan skin, freckles across the nose. Hair: "
        "Type 3B/3C bouncy spirals in a chin-length curly bob with curtain bangs. "
        "Wearing an oversized natural linen shirt. Composition: framed from over the "
        "client's shoulder, the back of her head and her face partly visible in the "
        "mirror, phone tilted slightly, soft side window light, slight motion blur "
        "on one curl.",
        "Vanessa's arm holding the iPhone is visible in the mirror reflection, taking "
        "the photo, casual stance."
    ),
    # 53 — after-cut chair lean-back, no V
    (
        "Client: Pakistani-Norwegian mixed man, early 30s, warm beige skin, slight "
        "stubble. Hair: Type 3B disconnected undercut, defined curls on top swept to "
        "one side, sharp short sides, oat-coloured sweatshirt. Composition: leaning "
        "back relaxed in the matte-black salon chair, half-smile, one hand running "
        "through the curls on top, looking off to the side. A bit of warm phone-"
        "flash glare on the apron and the marble counter behind.",
        V_NO
    ),
    # 54 — Vanessa selfie with client
    (
        "Client: Sudanese woman, mid 30s, very deep skin, bold red lipstick, large "
        "gold hoop earrings, sleek black turtleneck. Hair: a perfectly shaped tight "
        "Type 4C TWA. Composition: classic two-person front-camera selfie, faces "
        "close together cheek-to-cheek angle, both grinning warmly, slight wide-"
        "angle phone lens distortion at the edges, salon mirror behind softly out of "
        "focus.",
        "Vanessa is in the selfie next to the client, big warm smile, head tilted "
        "slightly toward the client."
    ),
    # 55 — laughing candid, V hand only
    (
        "Client: Senegalese woman, late 20s, deep brown skin, simple oversized cream "
        "knit sweater, small gold studs. Hair: mid-length Type 4B defined coils, "
        "freshly diffused volume. Composition: head tilted back mid-laugh, eyes "
        "scrunched closed, real natural laugh — not posed. Slightly crooked phone "
        "framing, framing a bit too tight on the head.",
        "Vanessa's hand is visible in the foreground holding a section of curls out "
        "of focus, just the hand and wrist, the rest of her cropped out of frame."
    ),
    # 56 — mirror reflection low angle, no V
    (
        "Client: Mexican woman, mid 30s, golden tan skin, freckles across the nose, "
        "small gold hoops, simple white tee. Hair: Type 3B/3C defined wash-and-go "
        "past the shoulders, side parted, voluminous. Composition: phone held lower, "
        "capturing the client's reflection in the mirror plus the Edison bulbs, "
        "warm bulb bloom and small lens flare from the bulbs, real salon overhead "
        "lighting visible.",
        V_NO
    ),
    # 57 — Vanessa leaning on counter w/ coffee
    (
        "Client: Iranian-Norwegian mixed woman, early 30s, light olive skin, kohl "
        "eyeliner, ivory chunky knit sweater. Hair: Type 3B long ringlets framing "
        "the face, mid-back length. Composition: client turned slightly in the "
        "chair toward the side, mid-conversation, easy smile.",
        "Vanessa is leaning on the marble counter beside the client holding a small "
        "white ceramic cup of coffee, mid-chat, both visible in the same frame, "
        "casual and warm."
    ),
    # 58 — diffuser candid w/ motion blur
    (
        "Client: Ethiopian woman, early 20s, deep brown skin, mustard graphic tee, "
        "small gold stud nose ring. Hair: Type 4A defined twist-out with subtle "
        "copper-brown highlights, mid-length, voluminous. Composition: candid mid-"
        "style moment, the client's curls partly fluffed by the airflow with subtle "
        "motion blur, phone-grain noticeable in shadow areas.",
        "Vanessa is seen from behind, holding a hair-dryer with a diffuser "
        "attachment near the back of the client's head, focused, the diffuser "
        "slightly motion-blurred."
    ),
    # 59 — selfie front cam grin, no V
    (
        "Client: Nigerian-Norwegian mixed woman, early 20s, lighter brown skin, "
        "freckles, denim button-down. Hair: Type 4A defined twist-out, shoulder-"
        "length, slightly stretched. Composition: classic single-person front-"
        "camera selfie, big grin, phone arm partly visible at the bottom of frame, "
        "salon Edison bulbs blooming behind her, slight wide-angle distortion.",
        V_NO
    ),
    # 60 — kneeling V cut adjustment
    (
        "Client: Black-British woman now in Oslo, early 30s, deep brown skin, small "
        "gold septum ring, vintage black leather jacket. Hair: Type 4A asymmetric "
        "curly bob, clearly longer on one side. Composition: phone held a bit "
        "above, looking slightly down, capturing the asymmetric line.",
        "Vanessa is kneeling beside the salon chair, focused, holding a small comb, "
        "checking the asymmetric line near the jaw, calm focused expression."
    ),
    # 61 — laughing man, no V
    (
        "Client: Cuban man, early 40s, warm tan skin, dark stubble, navy linen shirt "
        "unbuttoned at the collar. Hair: Type 3C medium curly pompadour, textured "
        "curls swept back. Composition: caught mid-laugh, head slightly back, "
        "slightly uneven exposure on the cheek from the mirror bulbs, gentle salon "
        "ambient mixed lighting.",
        V_NO
    ),
    # 62 — Vanessa candid mid-laugh
    (
        "Client (out of focus in foreground): a person blurred in the foreground, "
        "back of head only, suggesting a client mid-styling. Vibe: behind-the-scenes "
        "candid. Composition: phone held low at hip level, slightly angled up, "
        "salon ceiling and Edison fixtures visible at the top of the frame, "
        "dramatic warm overhead glow.",
        "Vanessa is the focus of the shot, mid-laugh real natural laugh, head "
        "tilted slightly back, hand near her own apron pocket, full upper-body "
        "framing, candid moment."
    ),
    # 63 — Tunisian half-up selfie
    (
        "Client: Tunisian woman, early 30s, olive-tan skin, smile lines, terracotta "
        "linen blouse. Hair: Type 3C/4A defined curls in a half-up half-down style "
        "with the top section gathered into a soft twist. Composition: holding her "
        "own phone, half-mirror-selfie style, the back of the head with the twisted "
        "top section visible in the mirror behind her, soft confident smile, "
        "imperfect framing.",
        V_NO
    ),
    # 64 — over-the-shoulder w/ V leaning in laughing
    (
        "Client: Sri Lankan woman, mid 30s, deep golden-brown skin, small acne scar "
        "on the cheek, sage-green linen blouse. Hair: Type 3C tight defined "
        "ringlets in a shoulder-length curly bob. Composition: shot from over the "
        "client's shoulder, the client turned slightly with a warm laugh.",
        "Vanessa is leaning in beside the client, laughing too, slight motion blur "
        "on Vanessa's curls from her movement, both warmly engaged."
    ),
    # 65 — backlit window portrait, no V
    (
        "Client: Lebanese man, mid 30s, olive skin, dark stubble, charcoal henley. "
        "Hair: Type 3B defined curls with disconnected undercut, long curls on top "
        "swept to one side. Composition: gaze toward the industrial side window, "
        "strong daylight backlighting creating rim-light on his curls and slight "
        "highlight clipping at the window edge, phone HDR slightly compressed, a "
        "bit of grain.",
        V_NO
    ),
    # 66 — V mirror tucking own hair
    (
        "Client: Norwegian-Eritrean mixed woman, early 40s, warm tan skin, gentle "
        "smile lines, oat-coloured chunky knit. Hair: Type 2C/3A loose long waves "
        "with subtle gray strands. Composition: foreground focus on the client "
        "running her own hands through her hair satisfied, looking down at her hair, "
        "warm soft smile.",
        "Vanessa is partly visible in the mirror reflection in the background, "
        "tucking one of her own curls behind her ear, a small candid self-care "
        "moment."
    ),
    # 67 — backlit ringlets, no V
    (
        "Client: South-Indian woman, early 30s, deep golden skin, small simple stud "
        "near the centre of the forehead, cream silk blouse. Hair: Type 3B defined "
        "ringlets long to the waist, glossy. Composition: standing/sitting near the "
        "industrial window with strong daylight backlighting making the curls glow "
        "rim-lit, phone HDR partly clipping the bright highlights of the curls, "
        "warm glow edge.",
        V_NO
    ),
    # 68 — two-person selfie at the station
    (
        "Client: Filipino-Norwegian mixed woman, early 30s, light golden skin, a "
        "small acne scar near the temple, soft gray cashmere sweater. Hair: Type 2B "
        "soft waves shoulder-length lob with curtain bangs. Composition: front-"
        "camera selfie, faces cheek-to-cheek angle, both grinning, salon mirror and "
        "Edison bulbs softly out of focus behind, slight phone wide-angle "
        "distortion at edges.",
        "Vanessa is in the selfie cheek-to-cheek with the client, big warm smile, "
        "head tilted slightly toward her."
    ),
    # 69 — V in mirror with curl cream
    (
        "Client: Sudanese man, early 30s, deep brown skin, gold-rimmed thin glasses, "
        "plain black tee. Hair: Type 4B coily afro mohawk soft, longer in the "
        "centre, tapered low sides. Composition: shot from in front of him, mirror "
        "behind showing the back of his head plus Vanessa, mixed warm/cool real "
        "salon lighting, a bit of phone-grain.",
        "Vanessa is visible in the mirror behind the client, holding a small open "
        "jar of curl cream, focused on the styling."
    ),
    # 70 — direct iPhone portrait, no V
    (
        "Client: Algerian woman, early 40s, olive skin, smile lines, deep red "
        "lipstick, black silk blouse. Hair: Type 3C side-parted long curls with "
        "natural gray strands at the temples. Composition: looking directly at the "
        "phone with a small confident closed-mouth smile, slight overhead salon "
        "downlight creating a mild shadow under the chin, slightly tilted phone "
        "framing — feels like a real candid post.",
        V_NO
    ),
]

assert len(PROMPTS) == 20, f"expected 20 iphone prompts, got {len(PROMPTS)}"


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
    parser.add_argument("start", nargs="?", type=int, default=START_INDEX)
    parser.add_argument("end", nargs="?", type=int, default=START_INDEX + len(PROMPTS) - 1)
    args = parser.parse_args()

    if not INTERIOR.exists() or not VANESSA.exists():
        print(f"FATAL: missing seed images.", file=sys.stderr)
        return 2

    parallel = int(os.environ.get("PARALLEL", "20"))
    todo = []
    for idx in range(args.start, args.end + 1):
        i = idx - START_INDEX
        if 0 <= i < len(PROMPTS):
            todo.append((idx, PROMPTS[i][0], PROMPTS[i][1]))
    print(f"[iphone-orchestrator] running {len(todo)} jobs with parallel={parallel}", flush=True)
    fails = 0
    with concurrent.futures.ThreadPoolExecutor(max_workers=parallel) as ex:
        futs = {ex.submit(run_one, i, s, v): i for (i, s, v) in todo}
        for f in concurrent.futures.as_completed(futs):
            res = f.result()
            print(res, flush=True)
            if res.startswith("FAIL"):
                fails += 1
    print(f"[iphone-orchestrator] done. failures={fails}", flush=True)
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
