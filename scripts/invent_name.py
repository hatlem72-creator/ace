#!/usr/bin/env python3
"""Invent a funny 1970s desk name from a real name (and optional position/hobbies).

Usage:
  python3 scripts/invent_name.py --name "Bob Hansen" --position "Typist" --hobbies "typewriters, bowling"
"""
import argparse
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from sms_hiring import invent_name


def main():
    p = argparse.ArgumentParser(description="Invent a funny 1970s desk name.")
    p.add_argument("--name", required=True, help="The applicant's real name")
    p.add_argument("--position", default="", help="The desk they are being hired to")
    p.add_argument("--hobbies", default="")
    p.add_argument("--interests", default="")
    args = p.parse_args()
    print(invent_name(args.name, args.position, args.hobbies, args.interests))


if __name__ == "__main__":
    main()
