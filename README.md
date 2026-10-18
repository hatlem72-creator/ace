# Ace Is Back! True Tales
A non-commercial pop-art comic fan series of Ace Frehley's wildest *true* stories. Live: https://hatlem72-creator.github.io/ace/

- `index.html` + `style.css`: the shop window (issue rack).
- `issue-1/`: full-screen comic reader. Panel script and overlays (captions, bubbles, sound effects) live in `issue-1/story.js`; the reader engine is `issue-1/reader.js`.
- `tools/make_images.py`: turns raw art in `img-src/raw/` (not committed) into web images.
- `counter.js`: no-cookie visitor counter (Abacus). `poll.js`: "Vote for Issue #5!" poll, built but switched off (`POLL_ENABLED = false`).
