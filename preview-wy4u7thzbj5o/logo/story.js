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
   The rocker: always skinny trousers and one red + one green high-top; a new outfit and face scarf each day, kept within a scene:
   Day 1 (2-4) fringed suede vest, purple planet tee, blue jeans, silver scarf · Night (5) boxer shorts · Day 2 (cover, 6-9) black satin shirt,
   mustard octopus tee, black jeans, teal scarf · Day 3 (10) studded leather vest, pink winged-burger tee, leopard scarf · Day 4 (11-12) green
   sequined jacket, orange robot tee, black jeans, black star scarf (dream: tux + love-gun tee) · Day 5 (13-14) tan corduroy jacket, crowned-eyeball
   tee, grey jeans, red paisley scarf · Day 6 (17) maroon velvet blazer, cactus tee, indigo jeans, mustard scarf · Day 7 (18) white satin bomber,
   rocket-skate tee, white jeans, black lightning-bolt scarf. No tattoos. */
const AF = "Ace Frehley, No Regrets (2011)";
const TILT_DN = {k0: "scale(1.14) translateY(5.5%)", k1: "scale(1.14) translateY(-5.5%)", dur: 12};
const TILT_UP = {k0: "scale(1.14) translateY(-5.5%)", k1: "scale(1.14) translateY(5.5%)", dur: 12};
const STORY = {
  panels: [
    { img: "k02-name", kb: "still", alt: "Bird's-eye view of a messy rehearsal loft in late-afternoon light: amps, a drum kit, pizza boxes and flying confetti. The masked rocker in a fringed suede vest, purple planet tee, blue skinny jeans and one red and one green high-top throws both fists in the air, while three band mates, shown only as black silhouettes, jump and dance around him.",
      bits: [ {t: "cap", pos: "tl", text: "Queens, New York, 1973.<br>A brand-new band. A brand-new name: KISS."},
              {t: "say", pos: "br", tail: "t", joke: true, text: "Now we need a LOGO!"} ] },
    { img: "k03-fancy", kb: "still", alt: "Outside a plain brick wall and a black club door, two band mates talk. Seen strictly from behind, a very tall band mate with long black hair, a faded jeans jacket with a big gold upside-down dollar sign on its back, white skinny trousers and white clogs reaches out and lays down the law; the masked rocker, marker in hand, rubs the back of his head.",
      bits: [ {t: "cap", pos: "tl", mini: true, text: "Gene Simmons, on the band’s big new photo for a club window:"},
              {t: "quote", pos: "bc", text: "Nobody will know what it is. They’ll think it’s a drag show. Put the name of the group on it and make it look fancy.", who: "Gene Simmons, in KISS: Behind the Mask"} ] },
    { img: "k04-walk", cam: TILT_UP, alt: "Low angle from the wet street at night: the masked rocker strides toward us under the elevated subway, a sketchpad under one arm and a fistful of markers in the other hand, his red sneaker stepping close to the camera.",
      bits: [ {t: "cap", pos: "tl", text: "So the band’s guitarist takes the job home."},
              {t: "say", pos: "br", tail: "t", joke: true, text: "Fancy. How hard can it be?"} ] },
    { img: "k05-sweat", kb: "still", alt: "Tilted, harshly lit close-up at 3 a.m.: the masked rocker, stripped down to loud orange-and-brown 1970s flower-power boxer shorts and his red and green high-tops, hunches bare-chested over the kitchen table, scribbling a jagged zigzag with one hand and clutching his hair with the other. Sweat drops fly off him, crumpled drafts swirl in the air, and a tower of coffee cups teeters beside the coffee pot.",
      bits: [ {t: "sfx", x: 84, y: 33, mx: 82, my: 33, rot: 10, size: 1.1, text: "DRIP!"},
              {t: "say", pos: "tl", tail: "b", joke: true, text: "Is it fancy yet?"},
              {t: "cap", pos: "bl", mini: true, joke: true, text: "Our version takes all night. (Spoiler: the real one didn’t.)"} ] },
    { img: "k06-lying", cam: {k0: "scale(1)", k1: "scale(1.18)", o: "50% 22%", dur: 10}, alt: "Straight down from above: the masked rocker, now in an open black satin shirt over a mustard octopus tee, black skinny jeans and a teal face scarf, lies on his back on a checkered kitchen floor buried in crumpled drafts, holding a blank sketchpad up at arm’s length, a ginger cat curled on his chest.",
      bits: [ {t: "sfx", x: 70, y: 70, mx: 68, my: 72, rot: -6, size: 1.3, text: "CRUMPLE!"},
              {t: "say", pos: "bl", tail: "t", joke: true, text: "Too round. Too soft. Too… cat."} ] },
    { img: "k07-window", cam: {k0: "scale(1.12)", k1: "scale(1)", o: "30% 35%", dur: 8}, buzz: 40, alt: "A huge bolt of lightning cracks right outside: the masked rocker leaps off the window ledge toward the flashing glass, one palm on the pane, hair blown back, papers whirling through the room and rain spraying in.",
      bits: [ {t: "sfx", x: 30, y: 10, mx: 30, my: 10, rot: -8, size: 1.4, text: "KRAKOOM!"},
              {t: "say", pos: "bl", tail: "t", joke: true, text: "Sharp. Electric. THAT’s fancy!"} ] },
    { img: "k08-wall", cam: {k0: "scale(1)", k1: "scale(1.2)", o: "45% 40%", dur: 10}, alt: "Mid-spin in front of an apartment wall plastered with pinned tries at the parody word BIZZ (bubbly, wobbly, disco script, too thin, tumbling letters, several crossed out in red, notes saying TOO THIN, MORE SHARP! and FANCY??, one big sharp red BIZZ circled YES!!), the masked rocker rips a sheet off the wall with one hand, flings a paper ball with the other and kicks one leg up as crumpled balls arc into an overflowing wastebasket.",
      bits: [ {t: "cap", pos: "tl", mini: true, joke: true, text: "Our version: a whole wall of tries. (BIZZ is our stand-in. The real logo stays off these pages.)"},
              {t: "say", pos: "br", tail: "l", joke: true, text: "Fancy… but SHARPER!"} ] },
    { img: "k09-leap", cam: {k0: "scale(1.25)", k1: "scale(1)", o: "50% 12%", dur: 9}, buzz: 50, alt: "Dramatic low angle: the masked rocker leaps into the air off his kitchen chair, which tips over behind him, holding the finished drawing high over his head with both hands: the parody word BIZZ in sharp red letters. Pencils, markers and crumpled drafts fly, and a mug tips over.",
      bits: [ {t: "sfx", x: 74, y: 28, mx: 72, my: 28, rot: 8, size: 1.3, text: "DONE!"},
              {t: "quote", pos: "bl", text: "Being excited about my new band, I roughed out a sketch of the original Kiss logo in no time at all.", who: AF} ] },
    { img: "k10-crowd", cam: {k0: "scale(1.2)", k1: "scale(1)", o: "50% 25%", dur: 10}, alt: "Worm’s-eye view from the floor of the loft: three guys and two women, invented 1970s friends, stand in a circle with the masked rocker (studded leather vest, pink winged-burger tee, leopard-print face scarf), all grinning down at a sheet of paper held high above us, its blank back toward the camera, fists pumping as confetti falls.",
      bits: [ {t: "say", pos: "tl", tail: "b", joke: true, text: "You got a winner, dude!"},
              {t: "quote", pos: "bc", text: "When Ace came in a week later with his sketch for a Kiss logo, the name was confirmed in heaven.", who: "Peter Criss, Makeup to Breakup (2012)"} ] },
    { img: "k11-stage", cam: {k0: "scale(1.25)", k1: "scale(1)", o: "62% 18%", dur: 11}, alt: "A packed club show seen from the side balcony: our parody band BIZZ plays under a light box glowing with the BIZZ wordmark. A singer with an invented mask of white paint, a turquoise eye band and red cheek hearts leaps in a sky-blue jumpsuit; a drummer with green leaf face paint pounds the kit; a tall long-haired bassist, seen only from behind, has a gold upside-down dollar sign on his black jacket; the masked rocker in a green sequined jacket and star-print scarf leans back into a smoking guitar solo. Flash pots explode and the crowd’s hands reach up.",
      bits: [ {t: "sfx", x: 30, y: 74, mx: 30, my: 74, rot: -10, size: 1.2, text: "KA-BOOM!"},
              {t: "quote", pos: "bc", text: "It’s probably one of the most recognizable rock logos in the world. I think it’s probably number three.", who: "Ace Frehley, decades later, to Eric Spitznagel, MTV (2011)"} ] },
    { img: "k12-dream", cam: TILT_DN, alt: "After the show the masked rocker dozes in an armchair, still in his green sequined jacket and star-print scarf. In his dream bubble he lounges in a limousine in a black tuxedo and bow tie over a T-shirt printed with a heart-shaped ray gun firing little hearts, sipping a pink milkshake under his scarf, flanked by two glamorous 1970s women in sequined dresses sipping colourful cocktails. Banknotes float around.",
      bits: [ {t: "cap", pos: "tl", mini: true, joke: true, text: "Our version: he’s already dreaming of the limo."},
              {t: "say", pos: "bl", tail: "t", joke: true, text: "Zzz… royalties…"} ] },
    { img: "k13-merch", cam: TILT_DN, alt: "A clanking 1970s merch factory: a printing press spews a fountain of dollar bills while a conveyor belt carries BIZZ T-shirts, BIZZ lunchboxes, buttons and stacks of BIZZ posters, with a big BIZZ poster on the wall. A tall long-haired band mate, seen from behind with an upside-down dollar sign on his jeans jacket, shovels cash into a wheelbarrow, and the masked rocker in a corduroy jacket and red paisley scarf throws his arms wide as money rains down.",
      bits: [ {t: "sfx", x: 34, y: 16, mx: 34, my: 16, rot: -8, size: 1.15, text: "KA-CHING!"},
              {t: "say", pos: "br", tail: "t", joke: true, text: "Our version: a logo is also a money machine. Fancy enough?"} ] },
    { img: "k14-handoff", kb: "still", alt: "In a dim stairwell the masked rocker bounds up the last steps and thrusts a sheet of paper at a band mate shown only as a black silhouette, who lunges to catch it, a long steel ruler in his other hand. Pencils tumble down the stairs.",
      bits: [ {t: "cap", pos: "tl", text: "Paul Stanley, a trained artist, takes Ace’s sketch home to polish it."},
              {t: "say", pos: "bl", tail: "t", joke: true, text: "Don’t change a thing! …OK, change a thing."} ] },
    { img: "k15-sofa", cam: TILT_UP, alt: "A tidy 1970s living room with a plastic-covered floral sofa and a ceramic poodle. A young man, shown only as a black silhouette, sits on the sofa with a drawing board on his knees, a straightedge and a drafting pen in his hands.",
      bits: [ {t: "quote", pos: "bc", text: "I vividly remember sitting on my parents’ sofa while they were out of town and drawing up the final version on thick white stock using a straightedge and a drafting pen.", who: "Paul Stanley, Face the Music (2014)"},
              {t: "say", pos: "tl", tail: "b", joke: true, text: "Polished it!"} ] },
    { img: "k16-ruler", cam: {k0: "scale(1)", k1: "scale(1.15)", o: "56% 60%", dur: 10}, alt: "Close-up from above on a white drawing card: the polished parody word BIZZ in red, a steel ruler beneath it, and red measuring brackets above the two Z's showing the last Z is wider and thicker than the other.",
      bits: [ {t: "cap", pos: "tl", mini: true, text: "Paul’s polish: one Z thicker than the other. Just like the real thing."},
              {t: "quote", pos: "bc", text: "The SS in the logo actually consists of one S that is thicker than the other, with different proportions, and they aren’t exactly parallel — because I just eyeballed it.", who: "Paul Stanley, Face the Music (2014)"},
              {t: "say", pos: "tr", tail: "b", joke: true, text: "Looks perfect to me!"} ] },
    { img: "k17-smug", kb: "still", alt: "At dawn the masked rocker, in a maroon velvet blazer, cactus tee and mustard scarf, tips back on a kitchen chair with one red and one green sneaker kicked up, twirling his smoking marker round one finger like a gunslinger’s pistol. A cat sleeps on the pile of crumpled drafts; band mates wait in the doorway as silhouettes.",
      bits: [ {t: "quote", pos: "tl", text: "Designing one of the most recognizable rock logos in history wasn’t really that difficult.", who: AF},
              {t: "quote", pos: "br", text: "(Thanks, Paul!)", who: AF} ] },
    { img: "k18-billboards", cam: {k0: "scale(1.35)", k1: "scale(1)", o: "50% 62%", dur: 12}, alt: "A sunny 1970s city corner. The masked rocker, in a white satin bomber and lightning-bolt scarf, leaps into a rock-star scissor kick, fist punched up, under three giant parody billboards: NIKKY with a droopy backwards swoosh, Coca-Cooler in red curly script with an ice-cube mascot in sunglasses, and Apfel with a bitten yellow lemon. A passer-by drops a bag of oranges and another loses his hat.",
      bits: [ {t: "say", pos: "bl", tail: "r", joke: true, text: "Up there with NIKKY, Coca-\u2060Cooler and Apfel!"},
              {t: "cap", pos: "bl", mini: true, text: "Fact: the Rock & Roll Hall of Fame noted that the Nike swoosh and the Apple logo were “still on the drawing board” when KISS designed theirs."} ] }
  ]
};
