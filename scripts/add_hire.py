#!/usr/bin/env python3
"""Add a friend hire to staff.json, export their portrait, and rotate the openings.

Usage:
  python3 scripts/add_hire.py \\
    --name 'Bob van Ribbon' \\
    --real-name 'Bob Hansen' \\
    --position 'Typist' \\
    --bio 'Keeps a ribbon in his pocket and a joke in reserve.' \\
    --image /path/to/studio-portrait.jpg \\
    [--email bob@example.com] \\
    [--hired-at 1974-11-21] \\
    [--fire-reason 'custom reason if a desk must be freed']

If all junior desks (staff.json maxFriendDesks, default 11) are occupied, the
longest-serving non-protected friend hire is moved to former.json before the new
one is seated. Protected staff (see staff.json and is_protected()) are never
fired; if every seated junior is protected, the script exits without seating.
The filled opening is removed from openings.json. If that would leave none open,
a new unused title from the pool is posted, so one to three desks stay advertised.
Ids listed in staff.json frontOmit are never shown on the home page (Team page only);
if one of those people is seated again, front is set to false and the omit list is kept.
"""
import argparse
import sys
from datetime import date
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from sms_hiring import (
    DATA,
    FIRE_REASONS,
    HIRES_DIR,
    desk_name_leaks_surname,
    format_approval_summary,
    is_protected,
    load_json,
    real_first_name,
    save_json,
    save_reference_photo,
    slugify,
    refill_openings,
    sync_jobs_board,
    write_portrait,
)


def main():
    p = argparse.ArgumentParser(description="Seat a friend hire and rotate the openings.")
    p.add_argument("--name", required=True, help="Funny desk name")
    p.add_argument("--real-name", default="", help="Applicant's real name (kept in the record, not shown)")
    p.add_argument("--position", required=True)
    p.add_argument("--bio", required=True)
    p.add_argument("--image", required=True, type=Path, help="Final 1974-style portrait to publish")
    p.add_argument("--email", default="")
    p.add_argument("--image-side", type=Path, default=None, help="Optional side/profile photograph, saved as an Identity Lock reference")
    p.add_argument("--hired-at", default="", help="ISO date; defaults to today")
    p.add_argument("--fire-reason", default="", help="If a junior desk must be freed, use this reason")
    args = p.parse_args()
    if not args.image.exists():
        sys.exit(f"Image not found: {args.image}")
    if args.image_side and not args.image_side.exists():
        sys.exit(f"Side image not found: {args.image_side}")
    if args.real_name and desk_name_leaks_surname(args.name, args.real_name):
        sys.exit(
            "Refusing to publish a desk name that contains the applicant's real surname. "
            "Use invent_name.py: real first name plus a brand-new funny surname only."
        )

    staff = load_json(DATA / "staff.json")
    former = load_json(DATA / "former.json")
    openings = load_json(DATA / "openings.json")
    hires = staff.setdefault("hires", [])
    cap = int(staff.get("maxFriendDesks") or 11)

    fired = None
    if len(hires) >= cap:
        candidates = [h for h in hires if not is_protected(h, staff)]
        if not candidates:
            sys.exit(
                "Junior desks are full, and every seated hire is protected "
                "(unfireable). Refusing to fire a protected member of staff, "
                "including Miek van Tiffany."
            )
        oldest = min(candidates, key=lambda h: h.get("hiredAt") or "9999")
        if is_protected(oldest, staff):
            sys.exit("Refusing to fire a protected member of staff, including Miek van Tiffany.")
        hires.remove(oldest)
        reason = args.fire_reason.strip() or FIRE_REASONS[len(former.get("employees") or []) % len(FIRE_REASONS)]
        record = {
            "id": oldest.get("id"),
            "name": oldest.get("name"),
            "position": oldest.get("position"),
            "portrait": oldest.get("portrait"),
            "portraitWebp": oldest.get("portraitWebp"),
            "reason": reason,
            "departedAt": args.hired_at or date.today().isoformat(),
        }
        former.setdefault("employees", []).append(record)
        fired = record

    hired_at = args.hired_at or date.today().isoformat()
    ident = slugify(args.name)
    # Avoid clobbering an existing file if a name repeats.
    dest = HIRES_DIR / ident
    if dest.with_suffix(".jpg").exists():
        ident = slugify(f"{args.name}-{hired_at}")
        dest = HIRES_DIR / ident
    portrait, portrait_webp = write_portrait(args.image, dest)
    hire = {
        "id": ident,
        "name": args.name,
        "position": args.position,
        "bio": args.bio,
        "portrait": portrait,
        "portraitWebp": portrait_webp,
        "hiredAt": hired_at,
    }
    # Public file: never store the real surname. First name only, if provided.
    first = real_first_name(args.real_name)
    if first:
        hire["realFirst"] = first
    if args.image_side:
        side_dest = dest.parent / f"{ident}-side.jpg"
        hire["portraitSide"] = save_reference_photo(args.image_side, side_dest)
    if args.email:
        hire["email"] = args.email
    omit = staff.get("frontOmit") or []
    if any((hire["id"] == o or hire["id"].startswith(o)) for o in omit if o):
        hire["front"] = False
    hires.append(hire)

    # Close the filled opening; refill so 1–3 remain posted.
    openings["open"] = [o for o in openings.get("open") or [] if o.get("title") != args.position]
    added = refill_openings(openings, staff, target_min=1, target_max=3)

    save_json(DATA / "staff.json", staff)
    save_json(DATA / "former.json", former)
    save_json(DATA / "openings.json", openings)
    synced = sync_jobs_board()

    print(format_approval_summary(
        args.name,
        position=args.position,
        real_name=args.real_name,
        email=args.email,
        has_side_photo=bool(args.image_side),
    ))
    print(f"Hired {args.name} as {args.position}.")
    print(f"Portrait: {portrait}")
    if hire.get("portraitSide"):
        print(f"Side reference: {hire['portraitSide']}")
    if fired:
        print(f"Moved {fired['name']} to Former Employees: {fired['reason']}")
    if added:
        print(f"Posted a new opening: {added}")
    elif not openings.get("open"):
        print("No openings remain, and the pool is exhausted.")
    for folder in synced:
        print(f"Synced jobs board data: {folder.name}/data/")


if __name__ == "__main__":
    main()
