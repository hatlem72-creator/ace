# Star Man Studio — friend-hiring pipeline

A low-compute, deadpan system for seating friends at junior desks on the preview site. The public pages are static (GitHub Pages). Applications arrive by email. A daily routine reads the in-tray, chooses a winner, makes a 1974 portrait, and commits the result.

The fourteen permanent staff on The Team are not managed here. They live in `preview-wy4u7thzbj5o/team/index.html`.

## Desks

- **Letterhead:** 14 permanent staff (plus Frank the company cat).
- **Junior desks:** 5 friend hires, listed in `preview-wy4u7thzbj5o/data/staff.json` (`maxFriendDesks`).
- When all five junior desks are occupied, the **longest-serving non-protected friend hire** (earliest `hiredAt`) is moved to `preview-wy4u7thzbj5o/data/former.json` with a deadpan reason, and the new hire takes the desk. If every seated junior is protected, `add_hire.py` refuses rather than firing them or writing them to `former.json`.

## Protected / unfireable staff

Miek van Tiffany is unfireable. She is listed in `staff.json` under `protected` (`id`: `miek-van-tiffany`). `scripts/sms_hiring.py` exposes `is_protected()`, and `scripts/add_hire.py` will only fire the oldest hire who is not protected. Miek is also hard-coded as a fallback in `ALWAYS_PROTECTED`, so she stays protected even if the JSON key is missing or stale.

She sits on the letterhead (`team/index.html`), so she is already outside the junior firing rotation. The protection still applies if she is ever re-added to `hires`. She must never be moved to `former.json`, auto-refilled, or rotated out of a desk. No hiring script may invent a firing reason for her.

Do not show her smoking in any image.

## Data

| File | Role |
|---|---|
| `preview-wy4u7thzbj5o/data/openings.json` | `pool` of titles, `reserved` titles already held on the letterhead, and `open` (the 1–3 jobs currently advertised). |
| `preview-wy4u7thzbj5o/data/staff.json` | Friend hires only, plus the `protected` list of unfireable staff. |
| `preview-wy4u7thzbj5o/data/former.json` | Former friend hires, with the reason they left. |
| `data/processed-applications.json` | Gmail message IDs already handled. The daily routine skips these. |

Portraits for friend hires go in `preview-wy4u7thzbj5o/team/img/hires/` as `.jpg` + `.webp`. Paths in the JSON are relative to `preview-wy4u7thzbj5o/` (for example `team/img/hires/bobby-the-typewriter-hanssen.jpg`).

Reserved titles (not re-advertised while the letterhead holds them): Creative Director, Art Director, Copywriter, Film Director, Company Clown, Master Stylist.

## What visitors see

- **Home** (`preview-wy4u7thzbj5o/`): a “Now hiring” notice that reads `openings.json` and rotates a line such as “Star Man Studio is hiring: a Jingle Writer.” It links to the application. If nothing is open: “All desks are filled. Apply anyway.” If any friend hires exist, a framed Employee of the Month (chosen by the day of the year, so it stays put for the day) also appears in the lobby.
- **Careers** and **Application** (`careers/`, `careers/apply/`): the openings, and a 1970s typed form.
- **Thanks** (`careers/thanks/`): “Your application has been placed in the in-tray. The in-tray is reviewed daily, between drinks.”
- **The Team**: friend hires render automatically under “Junior desks.” Former employees render on a small wall beneath the letterhead fine print.

`hiring.js` loads the JSON with `cache: "no-store"` so a newly pushed hire appears without a cache-bust bump.

## The application form

The form posts, as `multipart/form-data`, to [FormSubmit](https://formsubmit.co) at `gautehatlem72@gmail.com`.

Hidden fields: `_subject` is `Star Man Studio application: {position}`, `_captcha` is `true`, `_template` is `table`, `_next` is the live thanks page.

**Activation.** The first real submission makes FormSubmit send Gaute an activation email. He must click it once. Until then, applications are held (text for 30 days; **uploaded portraits are not retained** if activation is delayed, so he should click promptly). After activation, FormSubmit offers a random alias string that hides the address. Swap it into the form `action` where the TODO comment is, in `preview-wy4u7thzbj5o/careers/apply/index.html`. Do not send a test application just to trigger that mail unless Gaute has been told first.

Fields (and the names the email will use):

- `name` — real name (required)
- `email` — optional, used as Reply-To when present
- `position` — from `openings.json`
- `portrait` — image, max 5 MB (checked in the browser)
- `hobbies`, `interests`, `favourite_drink`, `why_the_desk`, `can_you_type` (Yes / No / Somewhat)
- `consent` — they agree the photo may become a 1970s portrait and appear on the site

## Daily routine

Run this once a day, in this order. Low compute: no need to re-generate portraits for people already seated.

1. **Read new application emails** in Gmail whose subject starts with `Star Man Studio application:`. Group them by the position after the colon. Download each portrait attachment to a working folder and write one JSON file per open position, in this shape:

   ```json
   {
     "position": "Jingle Writer",
     "applicants": [
       {
         "name": "Bob Hansen",
         "email": "bob@example.com",
         "position": "Jingle Writer",
         "hobbies": "…",
         "interests": "…",
         "favourite_drink": "…",
         "why_the_desk": "…",
         "can_you_type": "Yes",
         "consent": "yes",
         "photo": "/tmp/applications/bob-hansen.jpg",
         "submitted_at": "2026-11-21T10:04:00+01:00"
       }
     ]
   }
   ```

   `submitted_at` should be the email’s Date header, as ISO-8601 with a timezone. Skip mail that is clearly a FormSubmit activation notice, not an application.

   **Skip any message whose Gmail id already appears in `data/processed-applications.json`.** After a round is seated (or a batch is held or disqualified), append every message id that was considered — including duplicates of the same applicant — so the next run never reprocesses them. Do not mark or modify the Gmail messages themselves unless asked.

2. **Only fill currently open positions.** Read `openings.json`. If a batch is for a desk that is no longer open, hold it for the next time that title (or “The next desk that comes free”) is posted.

3. **Choose the winner** with the published rubric (below):

   ```bash
   python3 scripts/choose_winner.py /tmp/applications/jingle-writer.json --pretty
   ```

   Exit code 2 means nobody qualified. Leave the opening posted and try again tomorrow.

4. **Invent a funny 1970s name** from the real name (and the desk, and the hobbies if useful):

   ```bash
   python3 scripts/invent_name.py --name "Bob Hansen" --position "Typist" --hobbies "typewriters, bowling"
   # -> Bobby "The Typewriter" Hanssen
   ```

   The routine may lightly edit a clunker, but should stay in this shape: a familiar nickname, a moniker in quotes, and the surname (sometimes with a period flourish, Hansen → Hanssen).

5. **Write a dry bio** from the answers, in the studio’s voice: two or three short sentences, no exclamation marks, no praise for enthusiasm alone. Mention a hobby, a drink, or a typing habit if it is funny. Do not invent a second career.

6. **Generate one 1974 cheesy studio portrait** from the winner’s photograph, in exactly the same style as the letterhead staff on The Team: tight head-and-shoulders 3:4 crop, mottled painted studio backdrop (not an office), soft analogue lighting, warm faded colour, fine film grain, a slightly cheesy pose that suits the desk. Use one existing team portrait (for example Gaute or Whit) as the *style* reference only. Do not copy another staff member’s face. Save the result to a file.

   **Likeness rule (always):** use the uploaded photograph as the portrait reference — whoever is in it, even if it is a famous person, a painting, or an advertisement — as long as there is a clear face. Do not substitute a different reference, a staff portrait, or another photo of the applicant. Only if there is no usable face at all, stop and report that instead of guessing or inventing a face. Phone-screenshot chrome may be cropped off, but the person in the upload must remain the likeness.

7. **Seat them and rotate the board:**

   ```bash
   python3 scripts/add_hire.py \
     --name 'Bobby "The Typewriter" Hanssen' \
     --real-name 'Bob Hansen' \
     --position 'Typist' \
     --bio 'Keeps a ribbon in his pocket and a joke in reserve. The rusty nail is not a typo.' \
     --image /tmp/portraits/bobby.jpg \
     --email bob@example.com
   ```

   This script: exports `864×1152` `.jpg` + `.webp` into `team/img/hires/`; appends the hire to `staff.json`; if the five junior desks are full, moves the longest-serving non-protected friend hire to `former.json` with a deadpan reason (override with `--fire-reason`); refuses if every seated junior is protected; removes the filled title from `openings.json`; and, if that would leave none open, posts a new unused title from the pool so that **1–3 jobs stay advertised**.

8. **Commit and push**, as `hatlem72-creator`, only the preview data, portraits, and (if touched) openings. Do not change the public root `index.html` (it stays “Coming soon”). A suitable message: `Preview: seat {name} at the {position} desk.`

9. **Notify the winner** only if they left an email. A short, deadpan note is enough. Do not send the unsuccessful applicants a critique.

If several positions are open and have applicants the same day, fill them one at a time (choose, name, portrait, `add_hire.py`) so a firing, if it happens, is settled before the next desk is seated.

## The rubric

Each qualified applicant is scored out of **11**. The highest total wins. **Ties go to the earliest `submitted_at`.** An applicant is disqualified (score 0, cannot win) with no name, no consent, or no usable photograph.

| Part | Points | How it is awarded |
|---|---:|---|
| Completeness | 0–5 | One point each for a non-empty hobbies, interests, favourite drink, why-the-desk sentence, and “Can you type?”. “n/a”, “none”, or a dash does not count. |
| Humour / fit | 0–4 | +1 if the why-the-desk sentence is 6–40 words; +1 if the answers mention the job, the studio, the Ace stories, the desk, or a kindred word; +1 if hobbies or interests run longer than twelve characters; +1 if the favourite drink is a real answer (at least three characters). |
| Photograph | 0–2 | The file must open as an image, or the applicant is disqualified. +2 if the shorter side is at least 400 pixels; +1 if it is at least 250; +0 if it is smaller than that but still opens. |

`scripts/choose_winner.py` prints every score, so the choice can be explained later without re-running a model.

## Scripts

All commands are run from the repo root (`/workspace/ace-site` in this workspace).

| Script | Purpose |
|---|---|
| `scripts/choose_winner.py <file> [--pretty]` | Read a batch of applicants and print the winner plus the score table. Exit 2 if nobody qualifies. |
| `scripts/invent_name.py --name NAME [--position TITLE] [--hobbies …] [--interests …]` | Print a funny desk name. |
| `scripts/add_hire.py --name NAME --position TITLE --bio TEXT --image PATH [--real-name NAME] [--email EMAIL] [--hired-at YYYY-MM-DD] [--fire-reason TEXT]` | Seat the hire, export portraits, rotate openings, and fire the longest-serving non-protected friend hire if the junior desks are full. Never fires protected staff (including Miek van Tiffany). |
| `scripts/sms_hiring.py` | Library used by the three commands above. Not a CLI. |

The routine should call these rather than editing the JSON by hand.

## Voice

Pompous, short, and straight-faced. The comics are the masterpiece. The advertisements pay the rent. The in-tray is reviewed daily, between drinks.
