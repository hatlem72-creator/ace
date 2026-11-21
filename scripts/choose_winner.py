#!/usr/bin/env python3
"""Choose a winner for one opening from a JSON file of applicants.

Usage:
  python3 scripts/choose_winner.py applicants.json
  python3 scripts/choose_winner.py applicants.json --pretty

The JSON may be either a list of applicants, or {"position": "...", "applicants": [...]}.
Each applicant should include: name, consent, hobbies, interests, favourite_drink,
why_the_desk, can_you_type, photo (a file path), submitted_at (ISO-8601), and position.
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
        out["winner"]["applicant"] = {
            k: result["winner"]["applicant"].get(k)
            for k in ("name", "email", "position", "hobbies", "interests", "favourite_drink",
                      "why_the_desk", "can_you_type", "photo", "submitted_at")
        }
    print(json.dumps(out, indent=2 if args.pretty else None, ensure_ascii=False))
    if not result["winner"]:
        sys.exit(2)


if __name__ == "__main__":
    main()
