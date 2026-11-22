#!/usr/bin/env python3
"""Choose a winner for one opening from a JSON file of applicants.

Usage:
  python3 scripts/choose_winner.py applicants.json
  python3 scripts/choose_winner.py applicants.json --pretty

The JSON may be either a list of applicants, or {"position": "...", "applicants": [...]}.
Each applicant should include: name, consent, what_makes_you_a_starman_worker
(or legacy hobbies), interests, favourite_drink, why_the_desk, funny_about_yourself
(or legacy can_you_type), photo (front, a file path), optional photo_side, submitted_at
(ISO-8601), and position.
Prints the winner (and the score table) as JSON. Exit 2 if nobody qualifies.
"""
import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from sms_hiring import choose_winner


def main():
    p = argparse.ArgumentParser(description="Choose a hire by the published rubric.")
    p.add_argument("applicants", type=Path, help="JSON file of applicants")
    p.add_argument("--pretty", action="store_true")
    args = p.parse_args()
    data = json.loads(args.applicants.read_text())
    if isinstance(data, dict):
        apps = data.get("applicants") or []
        position = data.get("position")
        if position:
            for a in apps:
                a.setdefault("position", position)
    else:
        apps = data
    result = choose_winner(apps)
    # Don't dump the whole applicant image bytes; keep the record compact.
    out = {
        "winner": None if not result["winner"] else {
            k: result["winner"][k] for k in
            ("name", "total", "completeness", "humour_fit", "photo", "submitted_at", "reasons")
        },
        "scores": [
            {k: s[k] for k in ("name", "disqualified", "total", "completeness", "humour_fit", "photo", "submitted_at", "reasons")}
            for s in result["scores"]
        ],
    }
    if result["winner"]:
        app = result["winner"]["applicant"]
        from sms_hiring import funny_about_text, starman_worker_text
        out["winner"]["applicant"] = {
            k: app.get(k)
            for k in (
                "name", "email", "position",
                "what_makes_you_a_starman_worker", "hobbies",
                "interests", "favourite_drink", "why_the_desk",
                "funny_about_yourself", "can_you_type",
                "photo", "photo_side", "submitted_at",
            )
        }
        if not (out["winner"]["applicant"].get("what_makes_you_a_starman_worker") or "").strip():
            out["winner"]["applicant"]["what_makes_you_a_starman_worker"] = starman_worker_text(app)
        if not (out["winner"]["applicant"].get("funny_about_yourself") or "").strip():
            out["winner"]["applicant"]["funny_about_yourself"] = funny_about_text(app)
    print(json.dumps(out, indent=2 if args.pretty else None, ensure_ascii=False))
    if not result["winner"]:
        sys.exit(2)


if __name__ == "__main__":
    main()
