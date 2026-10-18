/* Issue #1 script. Each panel: img (in img/), focus = horizontal crop point for portrait screens,
   bits = overlays. pos: tl tr bl br tc bc (corners/edges). sfx use x/y in % of the panel. */
const STORY = {
  panels: [
    { img: "p1-arena", focus: "45%", alt: "A 1970s concrete civic center at night, marquee lights blazing, fans in flares and platform boots lining up",
      bits: [ {t: "cap", pos: "tl", text: "Lakeland, Florida.<br>Sunday, December 12, 1976."},
              {t: "cap", pos: "br", text: "The Lakeland Civic Center is sold out. About 10,000 fans have come to see KISS."} ] },
    { img: "p2-stage", focus: "50%", alt: "A huge arena stage with walls of amplifier stacks, a tall metal staircase and columns of pyro",
      bits: [ {t: "cap", pos: "tl", text: "The show opens with “Detroit Rock City.”"},
              {t: "sfx", x: 78, y: 66, mx: 70, my: 58, rot: -8, size: 1, text: "BOOM!"},
              {t: "cap", pos: "bl", text: "The band makes its entrance down metal staircases, high above walls of Marshall stacks."} ] },
    { img: "p3-boot", focus: "35%", alt: "A silver platform boot stepping onto a metal grating on top of the amp stacks, purple smoke behind",
      bits: [ {t: "cap", pos: "tr", text: "Ace has never been famous for his balance…"},
              {t: "cap", pos: "br", text: "…so, up on the staircase, he reaches for the handrail to steady himself."} ] },
    { img: "p4-hand", focus: "55%", alt: "A silver-gloved hand reaching for a metal handrail as a small blue spark flickers on it",
      bits: [ {t: "cap", pos: "tl", text: "Nobody knows the railing isn’t grounded."},
              {t: "cap", pos: "bl", text: "And his Les Paul is plugged in."} ] },
    { img: "p5-zap", focus: "52%", alt: "A huge electric flash bursts from the handrail as the silver glove grips it",
      bits: [ {t: "sfx", x: 22, y: 26, mx: 42, my: 17, rot: -10, size: 1.6, text: "ZZZAP!!"},
              {t: "cap", pos: "br", text: "Hand plus railing plus live guitar equals a circuit. For a few long seconds, he can’t let go."} ] },
    { img: "p6-guitar", focus: "50%", alt: "A cherry sunburst single-cutaway guitar tumbling through sparks and smoke",
      bits: [ {t: "cap", pos: "tl", text: "Then he falls. Backwards, luckily, not head-first off the stacks."},
              {t: "quote", pos: "br", text: "I should have been dead that night.", who: "Ace Frehley, years later, to Guitar Player"} ] },
    { img: "p7-crew", focus: "50%", alt: "Silhouetted road crew rush to the foot of a staircase on a dark, smoky stage",
      bits: [ {t: "cap", pos: "tr", text: "The show stops. The road crew drags him off the stairs."},
              {t: "cap", pos: "bl", text: "Backstage, he sits for about ten minutes. He can barely feel his hands."} ] },
    { img: "p8-show", focus: "50%", alt: "The stage blazes with lights and confetti as a cheering crowd raises their arms",
      bits: [ {t: "sfx", x: 50, y: 50, mx: 50, my: 46, rot: -4, size: 1.2, text: "THE SHOW GOES ON!"},
              {t: "cap", pos: "bl", text: "He walks back out to a standing ovation, with the crowd chanting his name, and plays the rest of the show."},
              {t: "cap", pos: "tr", small: true, text: "(That same night, Gene set his hair on fire. Just another Sunday for KISS.)"} ] }
  ]
};
