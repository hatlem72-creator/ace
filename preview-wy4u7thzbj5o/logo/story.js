/* Bonus short: "The Logo!" (New York, 1973). PORTRAIT 9:16 panels, Issue #5 format.
   cap = narration (sourced, paraphrased), say = comic dialogue, quote = exact, attributed words, sfx.
   joke: true = invented gag, tagged "Joke!" on the page.
   Camera: mostly stills (kb "still"), a few gentle zooms and slow vertical tilts. No pans.
   RULE: the real logo, its letters and its bolts are never shown. The drawn logo is our parody stand-in BIZZ (scripted lettering,
   tools/bizz.py): Ace's sketch has matching Z's, Paul's polished final has mismatched Z's. Band mates are silhouettes only.
   Sources: Ace Frehley, No Regrets (2011, excerpts via Rolling Stone and Ultimate Classic Rock); Gene Simmons in KISS: Behind the Mask;
   Peter Criss, Makeup to Breakup (2012); Paul Stanley, Face the Music (2014); Ace to Eric Spitznagel, MTV (2011, via Logo Design Love);
   Rock & Roll Hall of Fame KISS biography (2014, archived).
   Gene (band mate) is shown ONLY from behind with long black hair, faded jeans jacket with an upside-down $ on its back, white skinny trousers, white clogs.
   The rocker: skinny blue jeans, one red and one green high-top. No tattoos in 1973 (his first, an ACE name tattoo, came in the early KISS days). */
const AF = "Ace Frehley, No Regrets (2011)";
const TILT_DN = {k0: "scale(1.14) translateY(5.5%)", k1: "scale(1.14) translateY(-5.5%)", dur: 12};
const TILT_UP = {k0: "scale(1.14) translateY(-5.5%)", k1: "scale(1.14) translateY(5.5%)", dur: 12};
const STORY = {
  panels: [
    { img: "k02-name", kb: "still", alt: "Bird's-eye view of a messy rehearsal loft in late-afternoon light: amps, a drum kit, pizza boxes and flying confetti. The masked rocker in a fringed suede vest, purple planet tee, blue skinny jeans and one red and one green high-top sneaker throws both fists in the air, while three band mates, shown only as black silhouettes, jump and dance around him.",
      bits: [ {t: "cap", pos: "tl", text: "Queens, New York, 1973.<br>A brand-new band. A brand-new name: KISS."},
              {t: "say", pos: "br", tail: "t", joke: true, text: "Now we need a LOGO!"} ] },
    { img: "k03-fancy", kb: "still", alt: "Outside a small brick club, a giant photo of four long-haired rockers, shown only as black silhouettes, leans in the window. Seen strictly from behind, a very tall band mate with long black hair, a faded jeans jacket with a big gold upside-down dollar sign on its back, white skinny trousers and white clogs points at it. Beside him the masked rocker scratches his head with a marker.",
      bits: [ {t: "quote", pos: "tl", text: "Nobody will know what it is. They’ll think it’s a drag show. Put the name of the group on it and make it look fancy.", who: "Gene Simmons, in KISS: Behind the Mask"} ] },
    { img: "k04-walk", cam: TILT_UP, alt: "Low angle from the wet street at night: the masked rocker strides toward us under the elevated subway, a sketchpad under one arm and a fistful of markers in the other hand, his red sneaker stepping close to the camera.",
      bits: [ {t: "cap", pos: "tl", text: "So the band’s guitarist takes the job home."},
              {t: "say", pos: "br", tail: "t", joke: true, text: "Fancy. How hard can it be?"} ] },
    { img: "k05-sweat", kb: "still", alt: "Tilted, harshly lit close-up at 3 a.m.: the masked rocker, stripped down to loud orange-and-brown 1970s flower-power boxer shorts and his red and green high-tops, hunches bare-chested over the kitchen table, scribbling a jagged zigzag with one hand and clutching his hair with the other. Sweat drops fly off him, crumpled drafts swirl in the air, and a tower of coffee cups teeters beside the coffee pot.",
      bits: [ {t: "sfx", x: 84, y: 33, mx: 82, my: 33, rot: 10, size: 1.1, text: "DRIP!"},
              {t: "say", pos: "tl", tail: "b", joke: true, text: "Is it fancy yet?"},
              {t: "cap", pos: "bl", mini: true, joke: true, text: "Our version takes all night. (Spoiler: the real one didn’t.)"} ] },
    { img: "k06-lying", cam: {k0: "scale(1)", k1: "scale(1.18)", o: "50% 22%", dur: 10}, alt: "Straight down from above: the masked rocker lies on his back on a checkered kitchen floor buried in crumpled drafts, holding a blank sketchpad up at arm’s length, with a ginger cat curled on his chest. Markers and a snapped ruler lie scattered around.",
      bits: [ {t: "sfx", x: 70, y: 70, mx: 68, my: 72, rot: -6, size: 1.3, text: "CRUMPLE!"},
              {t: "say", pos: "bl", tail: "t", joke: true, text: "Too round. Too soft. Too… cat."} ] },
    { img: "k07-window", kb: "still", alt: "Side view: the masked rocker sits on a window ledge, chin on his fist, watching a jagged bolt of lightning split the night sky over the city skyline and a passing elevated train.",
      bits: [ {t: "sfx", x: 30, y: 10, mx: 30, my: 10, rot: -8, size: 1.4, text: "KRAKOOM!"},
              {t: "say", pos: "bl", tail: "t", joke: true, text: "Sharp. Electric. THAT’s fancy."} ] },
    { img: "k08-wall", cam: {k0: "scale(1)", k1: "scale(1.3)", o: "42% 36%", dur: 12}, alt: "The masked rocker, seen from behind, scratches his head in front of an apartment wall plastered with pinned sheets, each one a different try at the parody word BIZZ: bubbly, wobbly, disco script, too thin, tumbling letters, several crossed out in red, with notes saying TOO THIN, MORE SHARP! and FANCY??. In the middle a big sharp-edged red BIZZ is circled: YES!!",
      bits: [ {t: "cap", pos: "tl", mini: true, joke: true, text: "Our version: a whole wall of tries. (BIZZ is our stand-in. The real logo stays off these pages.)"},
              {t: "say", pos: "br", tail: "l", joke: true, text: "Fancy… but SHARPER."} ] },
    { img: "k09-eureka", cam: {k0: "scale(1)", k1: "scale(1.16)", o: "30% 30%", dur: 9}, buzz: 50, alt: "Low angle: the masked rocker leaps up onto a kitchen chair, one red sneaker on the seat, thrusting his marker into the air as golden sparks and crackling energy explode around him and a sketchpad flies.",
      bits: [ {t: "sfx", x: 64, y: 14, mx: 62, my: 12, rot: -8, size: 1.5, text: "ZZZAP!"},
              {t: "quote", pos: "bl", text: "Being excited about my new band, I roughed out a sketch of the original Kiss logo in no time at all.", who: AF} ] },
    { img: "k10-button", kb: "still", alt: "Extreme close-up of a round white pin-back button on the masked rocker’s fringed suede vest: it shows the parody word BIZZ in red with a little silver diamond sparkling above the I. His thumb is up beside it.",
      bits: [ {t: "sfx", x: 72, y: 20, mx: 70, my: 18, rot: 8, size: 1.1, text: "TING!"},
              {t: "quote", pos: "tl", text: "I then transferred the logo to a button using a felt-tip pen and presented it to the group…", who: AF},
              {t: "cap", pos: "bl", mini: true, text: "His version even had a little diamond for the dot on the “i”."} ] },
    { img: "k11-reveal", cam: {k0: "scale(1.3)", k1: "scale(1)", o: "50% 30%", dur: 10}, alt: "In the kitchen the masked rocker faces us, proudly holding up his glowing sketchpad with the parody word BIZZ in sharp-edged red letters. In the foreground three band mates, seen from behind as black silhouettes, clutch their heads in amazement; the one on the right has a faint upside-down dollar sign on his back.",
      bits: [ {t: "say", pos: "tr", tail: "b", joke: true, text: "Happy now?"},
              {t: "quote", pos: "bl", text: "When Ace came in a week later with his sketch for a Kiss logo, the name was confirmed in heaven.", who: "Peter Criss, Makeup to Breakup (2012)"} ] },
    { img: "k12-crowd", cam: {k0: "scale(1.2)", k1: "scale(1)", o: "50% 60%", dur: 10}, alt: "Worm’s-eye view: two hands hold up a sheet with the parody word BIZZ while a crowd of cheering friends, roadies and club folks and three band mates as black silhouettes raise their fists in a shower of confetti.",
      bits: [ {t: "say", pos: "tl", tail: "b", joke: true, text: "You got a winner, dude!"},
              {t: "quote", pos: "bc", text: "It’s probably one of the most recognizable rock logos in the world. I think it’s probably number three.", who: "Ace Frehley, decades later, to Eric Spitznagel, MTV (2011)"} ] },
    { img: "k13-window", kb: "still", alt: "Wide view across the street at night: the club window now shows the parody word BIZZ in big red letters above the giant silhouette photo of the band. The masked rocker stands below it with his arms crossed while passers-by, a kid on a bike and a lady with a poodle gawk. A yellow cab rolls past.",
      bits: [ {t: "cap", pos: "tl", mini: true, text: "Gene got his wish: the name, right there on the big photo."},
              {t: "say", pos: "br", tail: "t", joke: true, text: "Fancy enough?"} ] },
    { img: "k14-dream", cam: TILT_DN, alt: "A dream bubble over the masked rocker dozing in an armchair: in the dream he lounges in a limousine in a black tuxedo and bow tie over a T-shirt printed with a heart-shaped ray gun firing little hearts, sipping a pink milkshake under his scarf, flanked by two glamorous 1970s women in sequined dresses sipping colourful cocktails. Banknotes float around.",
      bits: [ {t: "cap", pos: "tl", mini: true, joke: true, text: "Our version: he’s already dreaming of the limo."},
              {t: "say", pos: "bl", tail: "t", joke: true, text: "Zzz… royalties…"} ] },
    { img: "k15-flyer", cam: TILT_DN, alt: "Low angle on a sunny New York street: the masked rocker, one red sneaker on a paste bucket, brushes a flyer with the parody word BIZZ onto a green lamppost, a stack of flyers under his arm and a pigeon watching from the lamp.",
      bits: [ {t: "cap", pos: "tl", text: "The logo goes to work: on flyers for the band’s first shows."},
              {t: "sfx", x: 30, y: 50, mx: 28, my: 50, rot: -6, size: 1.1, text: "SLAP!"} ] },
    { img: "k16-handoff", kb: "still", alt: "Side view in a dim stairwell: the masked rocker hands a sheet of paper to a band mate shown only as a black silhouette, who holds a long steel ruler.",
      bits: [ {t: "cap", pos: "tl", text: "Paul Stanley, a trained artist, takes Ace’s sketch home to polish it."},
              {t: "say", pos: "bl", tail: "t", joke: true, text: "Don’t change a thing! …OK, change a thing."} ] },
    { img: "k17-sofa", cam: TILT_UP, alt: "A tidy 1970s living room with a plastic-covered floral sofa and a ceramic poodle. A young man, shown only as a black silhouette, sits on the sofa with a drawing board on his knees, a straightedge and a drafting pen in his hands.",
      bits: [ {t: "quote", pos: "bc", text: "I vividly remember sitting on my parents’ sofa while they were out of town and drawing up the final version on thick white stock using a straightedge and a drafting pen.", who: "Paul Stanley, Face the Music (2014)"},
              {t: "say", pos: "tl", tail: "b", joke: true, text: "Polished it!"} ] },
    { img: "k18-ruler", cam: {k0: "scale(1)", k1: "scale(1.15)", o: "56% 60%", dur: 10}, alt: "Close-up from above on a white drawing card: the polished parody word BIZZ in red, a steel ruler beneath it, and red measuring brackets above the two Z's showing the last Z is wider and thicker than the other.",
      bits: [ {t: "cap", pos: "tl", mini: true, text: "Paul’s polish: one Z thicker than the other. Just like the real thing."},
              {t: "quote", pos: "bc", text: "The SS in the logo actually consists of one S that is thicker than the other, with different proportions, and they aren’t exactly parallel — because I just eyeballed it.", who: "Paul Stanley, Face the Music (2014)"},
              {t: "say", pos: "tr", tail: "b", joke: true, text: "Looks perfect to me!"} ] },
    { img: "k19-smug", kb: "still", alt: "At dawn the masked rocker leans back on a kitchen chair, one red and one green sneaker up, smugly blowing on his marker like a gunslinger blowing smoke from a pistol. A cat sleeps on the pile of crumpled drafts; band mates wait in the doorway as silhouettes.",
      bits: [ {t: "quote", pos: "tl", text: "Designing one of the most recognizable rock logos in history wasn’t really that difficult.", who: AF},
              {t: "quote", pos: "br", text: "(Thanks, Paul!)", who: AF} ] },
    { img: "k20-billboards", cam: {k0: "scale(1.35)", k1: "scale(1)", o: "50% 62%", dur: 12}, alt: "A sunny 1970s city corner. The masked rocker stands proudly, hands on hips, under three giant parody billboards: NIKKY with a droopy backwards swoosh, Coca-Cooler in red curly script with an ice-cube mascot in sunglasses, and Apfel with a bitten yellow lemon. Passers-by do double-takes.",
      bits: [ {t: "say", pos: "bl", tail: "r", joke: true, text: "Up there with NIKKY, Coca-\u2060Cooler and Apfel!"},
              {t: "cap", pos: "bl", mini: true, text: "Fact: the Rock & Roll Hall of Fame noted that the Nike swoosh and the Apple logo were “still on the drawing board” when KISS designed theirs."} ] }
  ]
};
