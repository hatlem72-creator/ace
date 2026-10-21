/* Retro fake vinyl ads: SITE DATA for the Ace Is Back! site.
   Copy ads.js + ads.css + this file to reuse on another music site; only this file changes per site.
   BMAC_URL: paste the Buy Me a Coffee link here. The coffee ad stays hidden until it is set. */
const BMAC_URL = "";

window.VINYL_ADS = {
  bmacUrl: BMAC_URL,
  /* every record: real facts only (artist, title, label, year, track, Discogs master). The jokes go in head/sub/body/quote/fine. */
  records: {
    "love-gun": {
      artist: "KISS", title: "Love Gun", label: "Casablanca", year: 1977, track: "Shock Me",
      discogs: "https://www.discogs.com/master/41815-Kiss-Love-Gun",
      spin: "https://www.youtube.com/results?search_query=KISS+Shock+Me+Love+Gun+1977",
      color: "#e3262d", sleeve: "#ffd60a", ink: "#111",
      burst: "1st lead vocal!",
      head: "Guaranteed to SHOCK you!",
      sub: "(Not literally. Please ground your amps.)",
      body: "After a Lakeland handrail tried to fry him, his bandmates said: write a song about it. So he did. “Shock Me” became the first KISS song Ace ever sang lead on. He was so nervous he sang it lying on his back in the dark.",
      quote: "I played side one and my hair stood straight up. My mom says it was the carpet.", who: "Darlene P., age 14, Duluth (made-up fan)",
      coupon: "YES! Zap me a copy of the album with “Shock Me”!",
      fine: "Handrail not included. Rubber-soled boots recommended but not required. Do not operate a plugged-in Les Paul near staircases, swimming pools or the bath."
    },
    "ace-1978": {
      artist: "Ace Frehley", title: "Ace Frehley", label: "Casablanca", year: 1978, track: "New York Groove",
      discogs: "https://www.discogs.com/master/49903-Kiss-Ace-Frehley-Ace-Frehley",
      spin: "https://www.youtube.com/results?search_query=Ace+Frehley+New+York+Groove+1978",
      color: "#1d5fd8", sleeve: "#e3262d", ink: "#fff",
      burst: "4 solo LPs! 1 day!",
      head: "SEND NO MONEY!",
      sub: "Just send a little GROOVE!",
      body: "On 18 September 1978 all four KISS members put out solo albums on the same day. The Spaceman’s comes loaded with “New York Groove”, scientifically proven* to make you strut down any avenue, boulevard or cul-de-sac.",
      quote: "I put on “New York Groove” in Brooklyn and strutted all the way to New Jersey by mistake.", who: "Gary “Grooves” McFadden, Queens (made-up fan)",
      coupon: "YES! Rush me the album with “New York Groove”!",
      fine: "*Not scientifically proven. Strutting at owner’s risk. Platform boots sold separately. Neighbours may join in."
    },
    "comet-1987": {
      artist: "Ace Frehley", title: "Frehley’s Comet", label: "Megaforce / Atlantic", year: 1987, track: "Rock Soldiers",
      discogs: "https://www.discogs.com/master/49907-Ace-Frehley-Frehleys-Comet",
      spin: "https://www.youtube.com/results?search_query=Frehley%27s+Comet+Rock+Soldiers",
      color: "#9aa4ad", sleeve: "#111", ink: "#ffd60a",
      burst: "Fifth-gear sound!",
      head: "Leave the police in your DUST!",
      sub: "(With your EARS. Please obey the speed limit.)",
      body: "Four years after the White Plains chase came the comeback album, and its opener “Rock Soldiers” is partly about that very day. All of the thrills, none of the court dates.",
      quote: "Played it in my station wagon. Hit 85… on the volume knob. The wagon is fine.", who: "Earl T., Yonkers (made-up fan)",
      coupon: "YES! Send me the album with “Rock Soldiers”! (No sirens, please.)",
      fine: "Results not typical. Gull-wing doors sold separately. DeLorean speedometer still only goes up to 85. Florist phone not included. Never drink and drive."
    },
    "dynasty-1979": {
      artist: "KISS", title: "Dynasty", label: "Casablanca", year: 1979, track: "Hard Times",
      discogs: "https://www.discogs.com/master/41703-Kiss-Dynasty",
      spin: "https://www.youtube.com/results?search_query=KISS+Hard+Times+Dynasty+1979",
      color: "#8a2be2", sleeve: "#ff8a00", ink: "#111",
      burst: "Rockets return!",
      head: "AMAZE your friends! ALARM your fire department!",
      sub: "The album of the tour that brought back Ace’s rocket launcher!",
      body: "On the 1979 Dynasty tour, the rocket launcher came back as a twin launcher aimed at his smoking guitar up in the lights. Flip the record over for “Hard Times”, written by Ace himself.",
      quote: "My guitar started smoking during side two. Turns out I’d left it on the toaster.", who: "Lorraine B., Scranton (made-up fan)",
      coupon: "YES! Launch me the album with “Hard Times”!",
      fine: "Smoke not included. Rockets not included. Bandmates’ hair not insured. Keep a fire extinguisher within reach of the turntable at all times."
    },
    "space-invader": {
      artist: "Ace Frehley", title: "Space Invader", label: "Entertainment One", year: 2014, track: "Gimme a Feelin’",
      discogs: "https://www.discogs.com/master/723141-Ace-Frehley-Space-Invader",
      spin: "https://www.youtube.com/results?search_query=Ace+Frehley+Gimme+a+Feelin",
      color: "#16a34a", sleeve: "#111", ink: "#7CFC00",
      burst: "Lands 2014!",
      head: "BEAM IT HOME TODAY!",
      sub: "The Spaceman has landed. Again.",
      body: "Ace’s 2014 solo album, with the lead single “Gimme a Feelin’”. Earthlings report a sudden urge to play air guitar while standing on furniture.",
      quote: "I was abducted by aliens. They only let me go when I promised to buy this.", who: "Mervin Q., Area 52 (made-up fan)",
      coupon: "YES! Beam down the album with “Gimme a Feelin’”!",
      fine: "Not responsible for crop circles. Flying saucer sold separately. Limit one per planet."
    },
    "origins-1": {
      artist: "Ace Frehley", title: "Origins Vol. 1", label: "eOne", year: 2016, track: "Cold Gin",
      discogs: "https://www.discogs.com/master/987841-Ace-Frehley-Origins-Vol1",
      spin: "https://www.youtube.com/results?search_query=Ace+Frehley+Origins+Vol+1+Cold+Gin",
      color: "#c2410c", sleeve: "#1d5fd8", ink: "#fff",
      burst: "Secret origins!",
      head: "LEARN the SECRET ORIGINS of the Spaceman!",
      sub: "Twelve songs. Zero radioactive spiders.",
      body: "Ace plays the songs that shaped him, plus a new take on “Cold Gin”, the KISS classic he wrote himself.",
      quote: "I learned all twelve songs in one weekend. My parents moved out.", who: "Rhonda V., Paramus (made-up fan)",
      coupon: "YES! Reveal my origins! Send the album with “Cold Gin”!",
      fine: "Origins may vary. No spiders, gamma rays or radioactive amps were involved. Mostly covers. Covers contain songs."
    }
  },
  /* house ads (always the same rules on every music site) */
  shop: {
    url: "https://recordstoreday.com/Stores", label: "Find a record shop near you",
    burst: "Free browsing!",
    head: "SUPPORT YOUR LOCAL RECORD SHOP!",
    sub: "The ORIGINAL streaming service: you stream in, flip the crates, stream out happy.",
    body: "Real people! Real racks! Real “you have to hear this” from someone behind the counter! Every record in these ads is waiting in a bin somewhere near you.",
    quote: "Went in for one LP. Came out with nine, a poster and a new best friend called Clerk.", who: "Tommy “Crate-Digger” Oakes (made-up fan)",
    coupon: "YES! Point me to the nearest crate!",
    fine: "Side effects include dusty fingertips, sore thumbs and saying “the B-side is better” at parties. No algorithm was harmed in the making of this ad."
  },
  coffee: {
    burst: "Mayhem fuel!",
    head: "FUEL THE NEXT ISSUE!",
    sub: "One coffee = one more panel of mayhem!",
    body: "Every true tale takes research, sources and a frankly irresponsible number of speed lines. Your coffee keeps the artist awake and the rockets firing.",
    quote: "I bought one coffee and a rocket flew out of the next issue.", who: "Bev “Two Sugars” Kowalski (made-up fan)",
    coupon: "YES! Here’s a coffee! Make it a double (panel)!",
    fine: "Coffee is converted into comics at roughly one cup per panel. No refunds on mayhem. Decaf accepted, but the panels may be a bit sleepy."
  }
};
