/* Bonus short: "The Logo!" (New York, 1973). PORTRAIT 9:16 panels, Issue #5 format.
   cap = narration (sourced, paraphrased), say = comic dialogue, quote = exact, attributed words, sfx.
   joke: true = invented gag, tagged "Joke!" on the page.
   Camera: mostly stills (kb "still"), a few gentle zooms and slow vertical tilts. No pans.
   RULE: the real logo, its letters and its bolts are never shown. Band mates are silhouettes only.
   Sources: Ace Frehley, No Regrets (2011, excerpts via Rolling Stone and Ultimate Classic Rock); Gene Simmons in KISS: Behind the Mask;
   Peter Criss, Makeup to Breakup (2012); Paul Stanley, Face the Music (2014); Ace to Eric Spitznagel, MTV (2011, via Logo Design Love);
   Rock & Roll Hall of Fame KISS biography (2014, archived). */
const AF = "Ace Frehley, No Regrets (2011)";
const TILT_DN = {k0: "scale(1.14) translateY(5.5%)", k1: "scale(1.14) translateY(-5.5%)", dur: 12};
const TILT_UP = {k0: "scale(1.14) translateY(-5.5%)", k1: "scale(1.14) translateY(5.5%)", dur: 12};
const STORY = {
  panels: [
    { img: "k02-photo", kb: "still", alt: "Outside a small Queens rock club, a giant blown-up photo of four long-haired rockers, shown only as dark silhouettes, leans against the window. A band mate, shown only as a black silhouette, points at it, while the masked rocker in a fringed suede vest and a purple planet tee scratches his head with a marker in his hand. Passers-by squint at the photo.",
      bits: [ {t: "cap", pos: "tl", text: "Queens, New York, 1973.<br>A brand-new band. A brand-new name: KISS."},
              {t: "quote", pos: "bl", text: "Nobody will know what it is. They’ll think it’s a drag show. Put the name of the group on it and make it look fancy.", who: "Gene Simmons, in KISS: Behind the Mask"} ] },
    { img: "k03-kitchen", kb: "still", alt: "Late at night in a cramped New York kitchen, the masked rocker hunches over a sketchpad at a small formica table under a hanging lamp, surrounded by crumpled paper, a ruler, markers and a coffee mug, with the elevated subway outside the window. Three band mates wait in the dark doorway, shown only as black silhouettes.",
      bits: [ {t: "cap", pos: "tl", text: "So the guitarist takes the job home."},
              {t: "say", pos: "tr", tail: "b", joke: true, text: "Is it fancy yet?"} ] },
    { img: "k04-drafts", cam: {k0: "scale(1)", k1: "scale(1.2)", o: "52% 30%", dur: 10}, alt: "Close-up of a mountain of crumpled sketch paper on a kitchen table at nearly three in the morning, a snapped ruler and a chewed marker beside it, and a wide-eyed cat peeking out of the paper pile.",
      bits: [ {t: "sfx", x: 70, y: 12, mx: 66, my: 10, rot: -6, size: 1.3, text: "CRUMPLE!"},
              {t: "cap", pos: "bl", mini: true, joke: true, text: "In our version it takes all night. (Spoiler: it didn’t.)"} ] },
    { img: "k05-boots", cam: TILT_DN, alt: "Close-up at floor level: a pair of shiny silver platform boots under the kitchen table, each with a single glowing yellow lightning-bolt stripe down the side, giving off tiny sparks.",
      bits: [ {t: "cap", pos: "tl", mini: true, text: "Then he looks down at his own boots…"},
              {t: "quote", pos: "bc", text: "…my first boots had lightning bolts down the side.", who: "Ace Frehley, via Ultimate Classic Rock"} ] },
    { img: "k06-spark", cam: {k0: "scale(1)", k1: "scale(1.22)", o: "56% 62%", dur: 9}, buzz: 50, alt: "Close-up from above: a hand in a fringed suede cuff presses a black felt-tip marker to a blank page, and a starburst of glowing sparks and curling energy leaps up off the paper.",
      bits: [ {t: "sfx", x: 66, y: 22, mx: 64, my: 20, rot: -8, size: 1.5, text: "ZZZAP!"},
              {t: "quote", pos: "bl", text: "Being excited about my new band, I roughed out a sketch of the original Kiss logo in no time at all.", who: AF} ] },
    { img: "k07-button", kb: "still", alt: "Extreme close-up: a black-nailed hand pins a small round homemade button to the fringed suede vest. We see only the silver back and the pin; a tiny diamond-shaped sparkle twinkles from its hidden front.",
      bits: [ {t: "sfx", x: 74, y: 30, mx: 72, my: 28, rot: 8, size: 1.1, text: "TING!"},
              {t: "quote", pos: "tl", text: "I then transferred the logo to a button using a felt-tip pen and presented it to the group…", who: AF},
              {t: "cap", pos: "bl", mini: true, text: "His version even had a little diamond for the dot on the “i”."} ] },
    { img: "k08-reveal", cam: {k0: "scale(1.3)", k1: "scale(1)", o: "50% 30%", dur: 10}, alt: "The masked rocker, seen from behind, holds the sketchpad high toward his band mates. Only the plain cardboard back faces us, while a brilliant white-gold glow blazes from the hidden page and crumpled drafts swirl in the air. The three band mates, shown as black silhouettes, recoil in amazement.",
      bits: [ {t: "say", pos: "tr", tail: "b", joke: true, text: "WHOA."},
              {t: "quote", pos: "bl", text: "When Ace came in a week later with his sketch for a Kiss logo, the name was confirmed in heaven.", who: "Peter Criss, Makeup to Breakup (2012)"} ] },
    { img: "k09-sofa", cam: TILT_UP, alt: "A tidy 1970s living room with a plastic-covered floral sofa, a ceramic poodle and a suitcase. A young man, shown only as a black silhouette, sits on the sofa with a stiff drawing board on his knees, a straightedge and a drafting pen in his hands. We see only the back of the board, glowing softly at the top edge.",
      bits: [ {t: "cap", pos: "tl", text: "Then Paul, a trained artist, gave it the final polish."},
              {t: "quote", pos: "bc", text: "I vividly remember sitting on my parents’ sofa while they were out of town and drawing up the final version on thick white stock using a straightedge and a drafting pen.", who: "Paul Stanley, Face the Music (2014)"} ] },
    { img: "k10-smug", kb: "still", alt: "At dawn the masked rocker leans back on a kitchen chair with his silver boots on the table, smugly blowing on his marker like a gunslinger blowing smoke from a pistol. A cat sleeps on the pile of crumpled drafts; band mates wait in the doorway as silhouettes.",
      bits: [ {t: "quote", pos: "tl", text: "Designing one of the most recognizable rock logos in history wasn’t really that difficult.", who: AF},
              {t: "quote", pos: "br", text: "(Thanks, Paul!)", who: AF} ] },
    { img: "k11-three", cam: {k0: "scale(1.3)", k1: "scale(1)", o: "70% 22%", dur: 12}, alt: "On a giant arena stage, the masked rocker stands on the bronze, third-place block of a winners' podium, hoisting a bronze trophy over his head with a bronze medal on his chest. The gold and silver blocks are empty and lit by blinding spotlights, and a huge crowd cheers with lighters and raised fists.",
      bits: [ {t: "cap", pos: "tl", mini: true, text: "Decades later, he was asked about it."},
              {t: "quote", pos: "bl", text: "It’s probably one of the most recognizable rock logos in the world. I think it’s probably number three.", who: "Ace Frehley, to Eric Spitznagel, MTV (2011)"} ] },
    { img: "k12-billboards", cam: {k0: "scale(1.35)", k1: "scale(1)", o: "50% 62%", dur: 12}, alt: "A sunny 1970s city corner. The masked rocker stands proudly, hands on hips, under three giant parody billboards: NIKKY with a droopy backwards swoosh, Coca-Cooler in red curly script with an ice-cube mascot in sunglasses, and Apfel with a bitten yellow lemon. Passers-by do double-takes.",
      bits: [ {t: "say", pos: "bl", tail: "r", joke: true, text: "Up there with NIKKY, Coca-\u2060Cooler and Apfel!"},
              {t: "cap", pos: "bl", mini: true, text: "Fact: the Rock & Roll Hall of Fame noted that the Nike swoosh and the Apple logo were “still on the drawing board” when KISS designed theirs."} ] }
  ]
};
