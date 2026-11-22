#!/usr/bin/env python3
"""Invent a public desk name: the applicant's real first name plus a brand-new funny surname.

The real surname is never used. Legacy --hobbies is still accepted if the new
Starman-worker field is empty.

Usage:
  python3 scripts/invent_name.py --name "Bob Hansen" --position "Typist" \\
    --starman-worker "I was born in the paste-up." --funny-about-yourself "I alphabetise biscuits."
  # -> Bob van Ribbon   (never Hansen, never Hanssen, never Bobby Hansen)
"""
import argparse
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from sms_hiring import desk_name_leaks_surname, format_approval_summary, invent_name


def main():
    p = argparse.ArgumentParser(description="Invent a desk name (real first name + funny surname).")
    p.add_argument("--name", required=True, help="The applicant's real name (only the first name is used publicly)")
    p.add_argument("--position", default="", help="The desk they are being hired to")
    p.add_argument("--what-makes-you-a-starman-worker", "--starman-worker", dest="starman_worker", default="")
    p.add_argument("--hobbies", default="", help="Legacy alias; used only if the Starman-worker field is empty")
    p.add_argument("--interests", default="")
    p.add_argument("--funny-about-yourself", dest="funny_about_yourself", default="")
    p.add_argument("--approval", action="store_true", help="Also print the approval summary")
    args = p.parse_args()
    desk = invent_name(
        args.name,
        args.position,
        hobbies=args.hobbies,
        interests=args.interests,
        starman_worker=args.starman_worker,
        funny_about_yourself=args.funny_about_yourself,
    )
    print(desk)
    if desk_name_leaks_surname(desk, args.name):
        sys.exit("Refusing to print a desk name that contains the real surname.")
    if args.approval:
        print()
        print(format_approval_summary(
            desk,
            position=args.position,
            real_name=args.name,
            starman_worker=args.starman_worker or args.hobbies,
            funny_about_yourself=args.funny_about_yourself,
        ))


if __name__ == "__main__":
    main()
