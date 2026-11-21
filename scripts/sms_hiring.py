"""Shared helpers for Star Man Studio friend hires. Low compute, no network."""
from __future__ import annotations

import json
import re
import unicodedata
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PREVIEW = ROOT / "preview-wy4u7thzbj5o"
DATA = PREVIEW / "data"
HIRES_DIR = PREVIEW / "team" / "img" / "hires"

NA = re.compile(r"^\s*(n/?a|none|no|idk|n\.a\.?|-+|\.+)?\s*$", re.I)

NICKNAMES = {
    "robert": "Bobby", "rob": "Bobby", "bob": "Bobby", "bobby": "Bobby",
    "william": "Billy", "will": "Billy", "bill": "Billy", "billy": "Billy",
    "james": "Jimmy", "jim": "Jimmy", "jimmy": "Jimmy",
    "john": "Johnny", "johnny": "Johnny", "jack": "Jackie",
    "michael": "Mikey", "mike": "Mikey", "mick": "Mickey",
    "richard": "Ricky", "rick": "Ricky", "dick": "Ricky",
    "david": "Davey", "dave": "Davey",
    "thomas": "Tommy", "tom": "Tommy", "tommy": "Tommy",
    "joseph": "Joey", "joe": "Joey", "joey": "Joey",
    "charles": "Charlie", "charlie": "Charlie", "chuck": "Chuck",
    "steven": "Stevie", "stephen": "Stevie", "steve": "Stevie",
    "christopher": "Topher", "chris": "Chris",
    "daniel": "Danny", "dan": "Danny",
    "edward": "Eddie", "ed": "Eddie", "ted": "Teddy",
    "andrew": "Andy", "andy": "Andy", "drew": "Drew",
    "peter": "Pete", "pete": "Pete",
    "paul": "Pauly",
    "george": "Georgie",
    "kenneth": "Kenny", "ken": "Kenny",
    "ronald": "Ronnie", "ron": "Ronnie",
    "anthony": "Tony", "tony": "Tony",
    "kevin": "Kev",
    "brian": "Bri",
    "gary": "Gaz",
    "larry": "Lars",
    "jeffrey": "Jeff", "jeff": "Jeff",
    "gaute": "Gaute",
    "elizabeth": "Betty", "liz": "Lizzie", "beth": "Betty", "eliza": "Liza",
    "margaret": "Peggy", "maggie": "Peggy", "meg": "Peggy",
    "susan": "Susie", "sue": "Susie", "suzanne": "Suzy",
    "jennifer": "Jenny", "jen": "Jenny",
    "patricia": "Patty", "pat": "Patty", "tricia": "Trish",
    "catherine": "Cathy", "katherine": "Kathy", "kate": "Katie", "katie": "Katie",
    "sarah": "Sadie", "sara": "Sadie",
    "ann": "Annie", "anne": "Annie", "anna": "Annie",
    "mary": "Marie", "maria": "Marie",
    "barbara": "Babs", "barb": "Babs",
    "linda": "Lindy",
    "karen": "Kaz",
    "nancy": "Nance",
    "betty": "Betty",
    "helen": "Nell",
    "sandra": "Sandy", "sandy": "Sandy",
    "donna": "Donnie",
    "carol": "Callie",
    "ruth": "Ruthie",
    "sharon": "Shaz",
    "michelle": "Shelly",
    "laura": "Laurie", "laurie": "Laurie",
    "emily": "Emmy", "emma": "Emmy",
    "dorothy": "Dotty", "dot": "Dotty",
    "frances": "Frankie",
    "christine": "Chrissy", "christina": "Chrissy",
    "janet": "Jan",
    "debra": "Debbie", "deborah": "Debbie", "debbie": "Debbie",
    "rachel": "Ray",
    "carolyn": "Carrie", "caroline": "Carrie",
    "diane": "Di", "diana": "Di",
    "julie": "Jules", "julia": "Jules",
    "joyce": "Joy",
    "jane": "Janey",
    "alice": "Allie",
    "jean": "Jeanie",
    "olivia": "Livvy",
    "sophia": "Sophy",
    "hannah": "Hank",
}

POSITION_MONIKERS = {
    "President": "The Corner Office",
    "Creative Director": "The Vision",
    "Treasurer": "The Books",
    "Account Supervisor": "The Account",
    "Account Executive": "The Lunch",
    "Copy Chief": "The Pencil",
    "Copywriter": "Twelve Words",
    "Art Director": "The Board",
    "Illustrator": "The Ink",
    "Jingle Writer": "The Jingle",
    "TV Producer": "The Wrap",
    "Film Director": "The Megaphone",
    "Media Buyer": "The Schedule",
    "Traffic Manager": "The Traffic",
    "Studio Photographer": "The Flash",
    "Executive Secretary": "The Diary",
    "Receptionist": "The Front Desk",
    "Typist": "The Typewriter",
    "Mailroom Boy": "Special Delivery",
    "Tea Lady": "The Kettle",
}

FIRE_REASONS = [
    "Took the last biscuit and would not admit it.",
    "Asked whether the Ace stories were the advertisements.",
    "Was seen using the clients’ ashtray.",
    "Arrived on time once, and made a remark about it.",
    "Referred to the Golden Starburst as a nice paperweight.",
    "The telex has been quieter since.",
    "Requested a raise in a month with an R in it.",
    "Lunch was at one. They were not.",
    "Left a window open during a jingle.",
    "Called the Creative Director ‘chief’, once.",
    "Misfiled a memo under ‘miscellaneous’, which is not a drawer.",
    "The plant was moved two inches, without authorisation.",
]

GENERIC_BLURBS = {
    "President": "A title for the letterhead and a key that does not fit the lift.",
    "Treasurer": "The petty cash is not a suggestion. Neither is the look.",
    "Account Supervisor": "Keeps the clients in their chairs and the invoices in a row.",
    "Account Executive": "Takes the lunches. Returns with a story, and sometimes an account.",
    "Copy Chief": "Cuts the twelfth word and bills for the thirteenth.",
    "Illustrator": "Draws what is asked, provided it is not a toaster.",
    "Jingle Writer": "Must hum on demand and leave the Ace stories unsung. A piano is not provided. A pencil is.",
    "TV Producer": "Says ‘that’s a wrap’ at four, and means lunch.",
    "Media Buyer": "Knows which hour of the afternoon a spot can still afford.",
    "Traffic Manager": "The job is to say no, pleasantly, and then the same again.",
    "Studio Photographer": "Lights, a roll of film, and a firm opinion about chins.",
    "Executive Secretary": "Keeps a book that is better than the book.",
    "Receptionist": "The first face, the last ashtray, and the telephone that never rings once.",
    "Typist": "A clean hand on the keys and no patience for carbon paper wasted.",
    "Mailroom Boy": "The chute, the stairs, and the one envelope that is always late. Whistling is permitted on even-numbered floors.",
    "Tea Lady": "The kettle is a department. Biscuits are a philosophy. Dotty will not be drawn on the difference.",
}


def repo_root() -> Path:
    return ROOT


def load_json(path: Path):
    return json.loads(path.read_text())


def save_json(path: Path, data) -> None:
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n")


def slugify(name: str) -> str:
    text = unicodedata.normalize("NFKD", name)
    text = text.encode("ascii", "ignore").decode("ascii")
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text).strip("-")
    return text or "hire"


# Always-on fallback: Miek van Tiffany can never be fired, even if the
# protected list in staff.json is missing or stale.
ALWAYS_PROTECTED = frozenset({
    "miek-van-tiffany",
    "miek van tiffany",
})


def _protected_keys(staff: dict | None) -> set[str]:
    keys = set(ALWAYS_PROTECTED)
    if not staff:
        return keys
    for item in staff.get("protected") or []:
        raw_id = raw_name = ""
        if isinstance(item, str):
            raw_name = item
        elif isinstance(item, dict):
            raw_id = str(item.get("id") or "").strip()
            raw_name = str(item.get("name") or "").strip()
        for raw in (raw_id, raw_name):
            if not raw:
                continue
            keys.add(raw.lower())
            keys.add(slugify(raw))
    keys.discard("")
    keys.discard("hire")
    return keys


def is_protected(hire: dict | None, staff: dict | None = None) -> bool:
    """True if this hire must never be fired or moved to former.json."""
    if not hire:
        return False
    keys = _protected_keys(staff)
    candidates: set[str] = set()
    for raw in (hire.get("id"), hire.get("name")):
        if not raw:
            continue
        raw = str(raw).strip()
        if not raw:
            continue
        candidates.add(raw.lower())
        slug = slugify(raw)
        if slug != "hire":
            candidates.add(slug)
    return bool(candidates & keys)


def tweak_surname(surname: str) -> str:
    if not surname:
        return surname
    # A light period flourish, as in the brief: Hansen -> Hanssen.
    if re.search(r"[sz]en$", surname, re.I) and not re.search(r"ssen$", surname, re.I):
        return re.sub(r"([sz])en$", r"\1sen", surname, flags=re.I)
    return surname


def nickname(first: str) -> str:
    key = re.sub(r"[^a-z]", "", first.lower())
    if key in NICKNAMES:
        return NICKNAMES[key]
    if len(first) <= 3:
        return first
    if first.endswith("y") or first.endswith("ie"):
        return first[0].upper() + first[1:]
    if first.endswith("e"):
        return first + "y"
    return first + "y" if len(first) < 8 else first


def moniker_from(position: str, hobbies: str = "", interests: str = "") -> str:
    if position in POSITION_MONIKERS:
        return POSITION_MONIKERS[position]
    blob = " ".join([hobbies or "", interests or ""])
    words = re.findall(r"[A-Za-z]{4,}", blob)
    skip = {"that", "this", "with", "from", "have", "love", "like", "just", "about", "playing", "watching", "being"}
    for w in words:
        if w.lower() not in skip:
            return "The " + w.capitalize()
    return "The Last Hire"


def invent_name(real_name: str, position: str = "", hobbies: str = "", interests: str = "") -> str:
    parts = [p for p in re.split(r"\s+", real_name.strip()) if p]
    if not parts:
        return "A Friend of the Studio"
    first = parts[0]
    surname = parts[-1] if len(parts) > 1 else ""
    nick = nickname(first)
    moniker = moniker_from(position, hobbies, interests)
    last = tweak_surname(surname)
    if last:
        return f'{nick} "{moniker}" {last}'
    return f'{nick} "{moniker}"'


def word_count(text: str) -> int:
    return len(re.findall(r"\S+", text or ""))


def is_blank(text: str) -> bool:
    return not text or NA.match(text or "") is not None


def score_application(app: dict, photo_path: str | Path | None = None) -> dict:
    """Transparent rubric. Returns a result dict with total, parts, and disqualified."""
    name = (app.get("name") or "").strip()
    consent = str(app.get("consent") or "").strip().lower()
    fields = {
        "hobbies": app.get("hobbies") or "",
        "interests": app.get("interests") or "",
        "favourite_drink": app.get("favourite_drink") or "",
        "why_the_desk": app.get("why_the_desk") or "",
        "can_you_type": app.get("can_you_type") or "",
    }
    reasons = []
    dq = False
    if not name:
        dq = True
        reasons.append("No name.")
    if consent not in {"yes", "true", "on", "agreed", "i agree"}:
        dq = True
        reasons.append("No consent.")

    completeness = 0  # max 5
    for key, val in fields.items():
        if not is_blank(val):
            completeness += 1
        else:
            reasons.append(f"Missing {key.replace('_', ' ')}.")

    humour = 0  # max 4
    why = fields["why_the_desk"]
    wc = word_count(why)
    if 6 <= wc <= 40:
        humour += 1
    position = (app.get("position") or "").strip()
    blob = " ".join([fields["hobbies"], fields["interests"], why, position]).lower()
    tokens = [t for t in re.findall(r"[a-z]+", (position or "").lower()) if len(t) > 2]
    studio_words = ["studio", "ace", "desk", "gaute", "jingle", "telex", "typewriter", "loft"] + tokens
    if any(w in blob for w in studio_words):
        humour += 1
    if (not is_blank(fields["hobbies"]) and len(fields["hobbies"].strip()) > 12) or (
        not is_blank(fields["interests"]) and len(fields["interests"].strip()) > 12
    ):
        humour += 1
    if not is_blank(fields["favourite_drink"]) and len(fields["favourite_drink"].strip()) >= 3:
        humour += 1

    photo_score = 0  # max 2
    path = Path(photo_path) if photo_path else (Path(app["photo"]) if app.get("photo") else None)
    if not path or not path.exists():
        dq = True
        reasons.append("No photograph.")
    else:
        try:
            from PIL import Image
            with Image.open(path) as im:
                im.load()
                w, h = im.size
            if min(w, h) >= 400:
                photo_score = 2
            elif min(w, h) >= 250:
                photo_score = 1
                reasons.append("Photograph is small, but usable.")
            else:
                photo_score = 0
                reasons.append("Photograph is very small.")
        except Exception:
            dq = True
            reasons.append("Photograph could not be opened.")

    total = completeness + humour + photo_score
    return {
        "name": name,
        "disqualified": dq,
        "total": 0 if dq else total,
        "completeness": completeness,
        "humour_fit": humour,
        "photo": photo_score,
        "max": 11,
        "reasons": reasons,
        "submitted_at": app.get("submitted_at") or "",
    }


def parse_when(value: str) -> datetime:
    if not value:
        return datetime.max.replace(tzinfo=timezone.utc)
    try:
        return datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError:
        return datetime.max.replace(tzinfo=timezone.utc)


def choose_winner(applicants: list[dict]) -> dict:
    """Pick the highest-scoring qualified applicant; earliest submission wins ties."""
    scored = []
    for app in applicants:
        result = score_application(app)
        result["applicant"] = app
        scored.append(result)
    qualified = [s for s in scored if not s["disqualified"]]
    qualified.sort(key=lambda s: (-s["total"], parse_when(s["submitted_at"])))
    return {"winner": qualified[0] if qualified else None, "scores": scored}


def occupied_titles(staff: dict) -> set[str]:
    return {h.get("position") for h in staff.get("hires") or [] if h.get("position")}


def refill_openings(openings: dict, staff: dict, target_min: int = 1, target_max: int = 3) -> str | None:
    """If openings fell below target_min, add one unused title from the pool. Returns the new title or None."""
    open_titles = [o["title"] for o in openings.get("open") or []]
    if len(open_titles) >= target_min:
        return None
    reserved = set(openings.get("reserved") or [])
    taken = reserved | set(open_titles) | occupied_titles(staff)
    pool = [t for t in (openings.get("pool") or []) if t not in taken]
    if not pool:
        return None
    # Stable daily pick, not true random: first unused after rotating by date.
    day = datetime.now().timetuple().tm_yday
    title = pool[day % len(pool)]
    slug = slugify(title)
    openings.setdefault("open", []).append({
        "id": slug,
        "title": title,
        "blurb": GENERIC_BLURBS.get(title, "A desk is free. The work will be explained, once, and not loudly."),
    })
    # Never exceed target_max (we only add one here).
    if len(openings["open"]) > target_max:
        openings["open"] = openings["open"][:target_max]
    return title


def write_portrait(src: Path, dest_stem: Path) -> tuple[str, str]:
    """Resize to 864x1152 and write jpg + webp. Returns preview-root relative paths."""
    from PIL import Image
    HIRES_DIR.mkdir(parents=True, exist_ok=True)
    im = Image.open(src)
    if im.mode not in ("RGB", "L"):
        im = im.convert("RGB")
    else:
        im = im.convert("RGB")
    # Cover-crop to 3:4, favouring the top (faces).
    w, h = im.size
    target = 3 / 4
    if w / h > target:
        nw = int(round(h * target))
        left = (w - nw) // 2
        im = im.crop((left, 0, left + nw, h))
    else:
        nh = int(round(w / target))
        top = max(0, int((h - nh) * 0.12))
        if top + nh > h:
            top = h - nh
        im = im.crop((0, top, w, top + nh))
    im = im.resize((864, 1152), Image.Resampling.LANCZOS)
    jpg = dest_stem.with_suffix(".jpg")
    webp = dest_stem.with_suffix(".webp")
    im.save(jpg, "JPEG", quality=88, optimize=True, subsampling=2)
    im.save(webp, "WEBP", quality=82, method=6)
    def rel(p: Path) -> str:
        return p.relative_to(PREVIEW).as_posix()
    return rel(jpg), rel(webp)
