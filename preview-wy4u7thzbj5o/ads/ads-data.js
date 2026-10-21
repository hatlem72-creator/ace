/* Fake vinyl ads: SITE DATA for the Ace Is Back! site.
   Copy ads.js + ads.css + this file to reuse on another music site; only this file changes per site.
   BMAC_URL: paste the Buy Me a Coffee link here. The coffee ad stays hidden until it is set. */
const BMAC_URL = "";

window.VINYL_ADS = {
  bmacUrl: BMAC_URL,
  /* every record: real facts only (artist, title, label, year, track, Discogs master). The jokes go in head/sub/body/quote/fine. color = the neon accent. */
  records: {
    "love-gun": {
      artist: "KISS", title: "Love Gun", label: "Casablanca", year: 1977, track: "Shock Me",
      discogs: "https://www.discogs.com/master/41815-Kiss-Love-Gun",
      spin: "https://www.youtube.com/results?search_query=KISS+Shock+Me+Love+Gun+1977",
      color: "#ff3b5c",
      head: "Grounded. Finally.",
      sub: "The song Ace wrote after a stage handrail tried to electrocute him.",
      body: "Lakeland, 1976: a railing nearly ends his career. His bandmates’ advice: write a song about it. “Shock Me” became the first KISS song he ever sang lead on, recorded lying on his back in the dark because he was nervous. Relatable.",
      quote: "I’ve never been shocked by a song before. I have since licked a 9-volt battery. Unrelated.",
      who: "Darlene P., made-up fan",
      fine: "Ground your amps. Avoid handrails. Plugged-in guitars and metal staircases are not a pairing. We are not electricians."
    },
    "ace-1978": {
      artist: "Ace Frehley", title: "Ace Frehley", label: "Casablanca", year: 1978, track: "New York Groove",
      discogs: "https://www.discogs.com/master/49903-Kiss-Ace-Frehley-Ace-Frehley",
      spin: "https://www.youtube.com/results?search_query=Ace+Frehley+New+York+Groove+1978",
      color: "#3b82ff",
      head: "Now in New York Groove.",
      sub: "One of four KISS solo albums released on the same day, 18 September 1978. His is the one with the strut.",
      body: "Contains “New York Groove”, which makes walking to the corner shop feel like the opening credits of a film. Side effects include finger-snapping on public transport.",
      quote: "I put it on and walked to New Jersey. I live in Queens. I don’t know how.",
      who: "Gary M., made-up fan",
      fine: "Strut at your own risk. Platform boots not included. Neighbours may form a backing band without warning."
    },
    "comet-1987": {
      artist: "Ace Frehley", title: "Frehley’s Comet", label: "Megaforce / Atlantic", year: 1987, track: "Rock Soldiers",
      discogs: "https://www.discogs.com/master/49907-Ace-Frehley-Frehleys-Comet",
      spin: "https://www.youtube.com/results?search_query=Frehley%27s+Comet+Rock+Soldiers",
      color: "#c0c8d0",
      head: "Zero to 85 in one track.",
      sub: "The comeback album. Its opener, “Rock Soldiers”, is partly about that day in White Plains.",
      body: "Four years after the chase, Ace turned it into a song. Same adrenaline, considerably fewer police cars.",
      quote: "I listened to it in the car. Then I parked outside a florist, out of respect.",
      who: "Earl T., made-up fan",
      fine: "Results not typical. Gull-wing doors sold separately. The DeLorean speedometer still stops at 85. Never drink and drive; the florists have been through enough."
    },
    "dynasty-1979": {
      artist: "KISS", title: "Dynasty", label: "Casablanca", year: 1979, track: "Hard Times",
      discogs: "https://www.discogs.com/master/41703-Kiss-Dynasty",
      spin: "https://www.youtube.com/results?search_query=KISS+Hard+Times+Dynasty+1979",
      color: "#b26bff",
      head: "Now with rockets. Again.",
      sub: "The album of the 1979 tour that brought back Ace’s rocket launcher.",
      body: "On the Dynasty tour, twin rockets were aimed at his smoking guitar up in the lights. On the record: “Hard Times”, written by Ace. No fire marshal was consulted for this ad.",
      quote: "My guitar started smoking on track seven. Turns out it was on the toaster.",
      who: "Lorraine B., made-up fan",
      fine: "Smoke not included. Rockets not included. Keep a fire extinguisher near the turntable, as a lifestyle choice."
    },
    "space-invader": {
      artist: "Ace Frehley", title: "Space Invader", label: "Entertainment One", year: 2014, track: "Gimme a Feelin’",
      discogs: "https://www.discogs.com/master/723141-Ace-Frehley-Space-Invader",
      spin: "https://www.youtube.com/results?search_query=Ace+Frehley+Gimme+a+Feelin",
      color: "#39ff88",
      head: "The Spaceman has re-entered the atmosphere.",
      sub: "His 2014 solo album, with the lead single “Gimme a Feelin’”.",
      body: "Recommended listening altitude: anywhere above the sofa. Air guitar is optional but will happen anyway.",
      quote: "Abducted by aliens. They let me go once I promised to stream it. I bought the vinyl to be safe.",
      who: "Mervin Q., made-up fan",
      fine: "Not responsible for crop circles. One per planet. Gravity still applies."
    },
    "origins-1": {
      artist: "Ace Frehley", title: "Origins Vol. 1", label: "eOne", year: 2016, track: "Cold Gin",
      discogs: "https://www.discogs.com/master/987841-Ace-Frehley-Origins-Vol1",
      spin: "https://www.youtube.com/results?search_query=Ace+Frehley+Origins+Vol+1+Cold+Gin",
      color: "#ff8a3d",
      head: "The origin story, minus the spider.",
      sub: "Ace plays the songs that made him, plus a new take on “Cold Gin”, the KISS classic he wrote.",
      body: "Twelve songs, mostly covers. Basically his record collection, except he plays all of it for you.",
      quote: "I learned all twelve songs in one weekend. My parents now live elsewhere.",
      who: "Rhonda V., made-up fan",
      fine: "No radioactive spiders, gamma rays or tragic backstories were involved. Covers contain songs."
    }
  },
  /* house ads (always the same rules on every music site) */
  shop: {
    url: "https://recordstoreday.com/Stores", label: "Find a record shop near you", color: "#ffd60a",
    head: "The original streaming service.",
    sub: "Your local record shop: real racks, real people, real opinions you didn’t ask for.",
    body: "Every record in these ads is sitting in a bin somewhere near you, waiting to be flipped past twice and then bought.",
    quote: "Went in for one LP. Came out with nine and a best friend called Clerk.", who: "Tommy O., made-up fan",
    fine: "Side effects include dusty fingertips and saying “the B-side is better” at parties. No algorithm was harmed in the making of this ad."
  },
  coffee: {
    color: "#ff9f43",
    head: "Fuel the next issue.",
    sub: "One coffee = one more panel of mayhem.",
    body: "Every true tale takes sources, fact-checking and an irresponsible number of speed lines. Your coffee keeps the artist upright and the rockets firing.",
    quote: "I bought one coffee and a rocket flew out of the next issue.", who: "Bev K., made-up fan",
    fine: "Exchange rate: roughly one cup per panel. No refunds on mayhem. Decaf accepted; the panels may come out a bit sleepy."
  }
};
