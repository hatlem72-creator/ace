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
    "Paste-up Artist": "The Rule",
    "Retoucher": "The Airbrush",
    "Switchboard Operator": "The Switchboard",
    "Chauffeur": "The Motor",
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
    "Film Director": "The megaphone is on the hook. The chair is free.",
    "Media Buyer": "Knows which hour of the afternoon a spot can still afford.",
    "Traffic Manager": "The job is to say no, pleasantly, and then the same again.",
    "Studio Photographer": "Lights, a roll of film, and a firm opinion about chins.",
    "Executive Secretary": "Keeps a book that is better than the book.",
    "Receptionist": "The first face, the last ashtray, and the telephone that never rings once.",
    "Typist": "A clean hand on the keys and no patience for carbon paper wasted.",
    "Mailroom Boy": "The chute, the stairs, and the one envelope that is always late.",
    "Tea Lady": "The kettle is a department. Biscuits are a philosophy.",
    "Paste-up Artist": "A steel rule, a sharp blade, and no patience for a crooked margin.",
    "Retoucher": "The face is already good. You will make it printable.",
    "Switchboard Operator": "The first hello and the last goodbye, and never a crossed line.",
    "Chauffeur": "The car is black. The route is a matter of opinion.",
    "Copywriter": "Twelve words, if you have them. Eleven, if you do not.",
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
    """Kept only to recognise obvious variants of a real surname so they are never published."""
    if not surname:
        return surname
    if re.search(r"[sz]en$", surname, re.I) and not re.search(r"ssen$", surname, re.I):
        return re.sub(r"([sz])en$", r"\1sen", surname, flags=re.I)
    return surname


def nickname(first: str) -> str:
    """Legacy helper. Public desk names now keep the real first name, not a nickname."""
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


def _clean_token(text: str) -> str:
    return re.sub(r"[^a-z]", "", (text or "").lower())


def real_first_name(real_name: str) -> str:
    parts = [p for p in re.split(r"\s+", (real_name or "").strip()) if p]
    if not parts:
        return ""
    first = parts[0]
    if first.isupper() or first.islower() or (len(first) > 1 and first[1:].isupper()):
        pieces = []
        for part in first.split("-"):
            if not part:
                pieces.append(part)
            else:
                pieces.append(part[0].upper() + part[1:].lower())
        return "-".join(pieces)
    return first


def real_surname_tokens(real_name: str) -> set[str]:
    """Every part of the real name after the first name, plus obvious flourishes."""
    parts = [p for p in re.split(r"\s+", (real_name or "").strip()) if p]
    tokens: set[str] = set()
    for part in parts[1:]:
        for variant in (part, tweak_surname(part)):
            token = _clean_token(variant)
            if len(token) >= 3:
                tokens.add(token)
    return tokens


def desk_name_leaks_surname(desk_name: str, real_name: str) -> bool:
    """True if a public desk name contains the applicant's real surname (or a tweak of it)."""
    forbidden = real_surname_tokens(real_name)
    if not forbidden:
        return False
    first = _clean_token(real_first_name(real_name))
    for word in re.findall(r"[A-Za-z]+", desk_name or ""):
        token = _clean_token(word)
        if token and token != first and token in forbidden:
            return True
    return False


def first_filled(app: dict | None, *keys: str) -> str:
    if not app:
        return ""
    for key in keys:
        val = app.get(key)
        if val and not is_blank(str(val)):
            return str(val)
    return ""


def starman_worker_text(app: dict | None = None, hobbies: str = "", starman_worker: str = "") -> str:
    """Canonical 'What makes you a Starman worker?' answer, falling back to legacy hobbies."""
    if app is not None:
        return first_filled(app, "what_makes_you_a_starman_worker", "hobbies")
    return (starman_worker or hobbies or "").strip()


def funny_about_text(app: dict | None = None, can_you_type: str = "", funny_about_yourself: str = "") -> str:
    """Canonical 'Say something funny about yourself' answer, falling back to legacy can_you_type."""
    if app is not None:
        return first_filled(app, "funny_about_yourself", "can_you_type")
    return (funny_about_yourself or can_you_type or "").strip()


POSITION_SURNAMES = {
    "Copywriter": ["van Headline", "McTwelve", "de Copy"],
    "Jingle Writer": ["de Jingle", "von Hum", "McTune"],
    "Paste-up Artist": ["van Rule", "McStencil", "Pastepot"],
    "Retoucher": ["van Airbrush", "McSpot", "de Repair"],
    "Media Buyer": ["van Spot", "McSchedule", "de Airtime"],
    "TV Producer": ["van Wrap", "McClapper", "de Lunch"],
    "Switchboard Operator": ["van Switch", "McHello", "de Exchange"],
    "Chauffeur": ["van Motor", "McCoach", "de Drive"],
    "Mailroom Boy": ["van Chute", "McParcel", "de Envelope"],
    "Tea Lady": ["van Kettle", "de Biscuit", "McPot"],
    "Typist": ["van Ribbon", "Carboncopy", "McKeys"],
    "Studio Photographer": ["van Flash", "McLens"],
    "Receptionist": ["de Lobby", "McAshtray"],
    "Illustrator": ["van Ink", "McBrush"],
    "Art Director": ["van Board", "McLayout"],
    "TV Producer": ["van Wrap", "McClapper", "de Lunch"],
}

FUNNY_SURNAMES = [
    "van Velvet", "McPasteup", "de Loft", "von Telex", "Featherbin",
    "Afterhours", "Goldnib", "McStencil", "Littlecarbon", "van Proof",
    "de Cyan", "McGalley", "von Grommet", "Pastepot", "van Trim",
    "de Rule", "McLeading", "van Dummy", "de Overlay", "McCrop",
    "van Velvet", "Shorebreak", "de Kettle", "McRibbon", "van Flash",
]


def invent_surname(
    real_name: str,
    position: str = "",
    starman_worker: str = "",
    interests: str = "",
    funny_about_yourself: str = "",
) -> str:
    forbidden = real_surname_tokens(real_name)
    skip = {
        "that", "this", "with", "from", "have", "love", "like", "just", "about",
        "playing", "watching", "being", "very", "really", "would", "could",
        "should", "make", "made", "starman", "studio", "worker", "myself",
        "something", "funny", "because", "their", "there", "where", "when",
        "your", "ours", "them", "they", "what", "which",
    }
    candidates: list[str] = []
    blob = " ".join([starman_worker or "", interests or "", funny_about_yourself or ""])
    for word in re.findall(r"[A-Za-z]{4,}", blob):
        token = _clean_token(word)
        if token in skip or token in forbidden:
            continue
        candidates.append("van " + word.capitalize())
        candidates.append("Mc" + word.capitalize())
        if len(candidates) >= 8:
            break
    candidates.extend(POSITION_SURNAMES.get(position, []))
    candidates.extend(FUNNY_SURNAMES)
    usable = [c for c in candidates if c and not desk_name_leaks_surname(c, real_name)]
    if not usable:
        usable = ["de Loft", "van Telex", "McPasteup"]
        usable = [c for c in usable if not desk_name_leaks_surname(c, real_name)] or ["de Loft"]
    first = real_first_name(real_name) or "Friend"
    seed = " ".join([first, position or "", starman_worker or "", interests or "", funny_about_yourself or ""])
    idx = sum(ord(ch) for ch in seed) % len(usable)
    return usable[idx]


def moniker_from(position: str, hobbies: str = "", interests: str = "") -> str:
    """Legacy moniker helper. New desk names use invent_surname() instead."""
    if position in POSITION_MONIKERS:
        return POSITION_MONIKERS[position]
    blob = " ".join([hobbies or "", interests or ""])
    words = re.findall(r"[A-Za-z]{4,}", blob)
    skip = {"that", "this", "with", "from", "have", "love", "like", "just", "about", "playing", "watching", "being"}
    for w in words:
        if w.lower() not in skip:
            return "The " + w.capitalize()
    return "The Last Hire"


def invent_name(
    real_name: str,
    position: str = "",
    hobbies: str = "",
    interests: str = "",
    starman_worker: str = "",
    funny_about_yourself: str = "",
) -> str:
    """Public desk name: real first name + a brand-new funny surname. Never the real surname."""
    first = real_first_name(real_name)
    if not first:
        return "A Friend of the Studio"
    worker = starman_worker or hobbies
    funny = funny_about_yourself
    surname = invent_surname(real_name, position, worker, interests, funny)
    published = f"{first} {surname}"
    if desk_name_leaks_surname(published, real_name):
        published = f"{first} de Loft"
        if desk_name_leaks_surname(published, real_name):
            published = f"{first} McTelex"
    return published


def format_approval_summary(
    desk_name: str,
    position: str = "",
    real_name: str = "",
    email: str = "",
    starman_worker: str = "",
    funny_about_yourself: str = "",
    has_side_photo: bool = False,
) -> str:
    """A short approval note. Uses the real first name only; never prints the real surname."""
    first = real_first_name(real_name) or "the applicant"
    lines = [
        f"Proposed desk name: {desk_name}",
        "The public name keeps the real first name only. The surname is invented. Do not publish the applicant's real surname.",
        f"Real first name: {first}",
    ]
    if position:
        lines.append(f"Position: {position}")
    if email:
        lines.append(f"Email: {email}")
    if starman_worker:
        lines.append(f"What makes you a Starman worker?: {starman_worker}")
    if funny_about_yourself:
        lines.append(f"Say something funny about yourself.: {funny_about_yourself}")
    lines.append("Side photograph: " + ("yes, use it as an extra Identity Lock reference." if has_side_photo else "no, front photograph only."))
    if real_name and desk_name_leaks_surname(desk_name, real_name):
        lines.append("WARNING: the proposed desk name appears to contain the real surname. Invent another.")
    return "\n".join(lines)


def word_count(text: str) -> int:
    return len(re.findall(r"\S+", text or ""))


def is_blank(text: str) -> bool:
    return not text or NA.match(text or "") is not None


def score_application(app: dict, photo_path: str | Path | None = None) -> dict:
    """Transparent rubric. Returns a result dict with total, parts, and disqualified."""
    name = (app.get("name") or "").strip()
    consent = str(app.get("consent") or "").strip().lower()
    worker = starman_worker_text(app)
    funny = funny_about_text(app)
    fields = {
        "what_makes_you_a_starman_worker": worker,
        "interests": app.get("interests") or "",
        "favourite_drink": app.get("favourite_drink") or "",
        "funny_about_yourself": funny,
    }
    # why_the_desk is no longer asked or scored. Older mail may still include it; it is ignored here.
    reasons = []
    dq = False
    if not name:
        dq = True
        reasons.append("No name.")
    if consent not in {"yes", "true", "on", "agreed", "i agree"}:
        dq = True
        reasons.append("No consent.")

    completeness = 0  # max 4
    for key, val in fields.items():
        if not is_blank(val):
            completeness += 1
        else:
            reasons.append(f"Missing {key.replace('_', ' ')}.")

    humour = 0  # max 3
    position = (app.get("position") or "").strip()
    blob = " ".join([
        fields["what_makes_you_a_starman_worker"],
        fields["interests"],
        fields["funny_about_yourself"],
        position,
    ]).lower()
    tokens = [t for t in re.findall(r"[a-z]+", (position or "").lower()) if len(t) > 2]
    studio_words = ["studio", "ace", "desk", "gaute", "jingle", "telex", "typewriter", "loft"] + tokens
    if any(w in blob for w in studio_words):
        humour += 1
    if (
        (not is_blank(fields["what_makes_you_a_starman_worker"]) and len(fields["what_makes_you_a_starman_worker"].strip()) > 12)
        or (not is_blank(fields["interests"]) and len(fields["interests"].strip()) > 12)
        or (not is_blank(fields["funny_about_yourself"]) and len(fields["funny_about_yourself"].strip()) > 12)
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


def save_reference_photo(src: Path, dest: Path, max_edge: int = 1600) -> str:
    """Save a likeness reference (front or side) without a 3:4 studio crop. Returns a preview-root relative path."""
    from PIL import Image
    dest = Path(dest)
    dest.parent.mkdir(parents=True, exist_ok=True)
    im = Image.open(src)
    if im.mode != "RGB":
        im = im.convert("RGB")
    w, h = im.size
    longest = max(w, h)
    if longest > max_edge:
        scale = max_edge / longest
        im = im.resize((max(1, int(w * scale)), max(1, int(h * scale))), Image.Resampling.LANCZOS)
    if dest.suffix.lower() != ".jpg":
        dest = dest.with_suffix(".jpg")
    im.save(dest, "JPEG", quality=90, optimize=True, subsampling=0)
    return dest.relative_to(PREVIEW).as_posix()
