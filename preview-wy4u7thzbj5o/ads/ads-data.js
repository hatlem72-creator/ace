/* Fake vinyl ads: SITE DATA for the Star Man Studio site.
   Copy ads.js + ads.css + this file (and an img/ folder) to reuse on another music site; only this file and img/ change per site.
   BMAC_URL: paste the Buy Me a Coffee link here. The coffee ad stays hidden until it is set. */
const BMAC_URL = "";

window.VINYL_ADS = {
  bmacUrl: BMAC_URL,
  /* the payoff line every ad signs off with (house rule: exactly this) */
  payoff: "Lover of muzak!",
  /* Image first, few words. img = file name in img/ without extension (.webp + .jpg fallback, 960x540).
     Facts (artist, title, label, year, track, discogs) are real and checked; the joke is the picture + head + one line of fine print.
     The models are invented, generic music nerds (no real people). color = the accent. */
  records: {
    "love-gun": {
      artist: "KISS", title: "Love Gun", label: "Casablanca", year: 1977, track: "Shock Me",
      discogs: "https://www.discogs.com/master/41815-Kiss-Love-Gun",
      spin: "https://www.youtube.com/results?search_query=KISS+Shock+Me+Love+Gun+1977",
      color: "#ff3b5c", img: "ad-love-gun",
      alt: "A 1970s fan with a feathered mullet and big sideburns, hair standing on end, gapes at the vinyl record crackling with electricity in his hands.",
      head: "Please ground your amps.",
      fine: "Inspired by a true story (Lakeland, 1976). We are not electricians."
    },
    "ace-1978": {
      artist: "Ace Frehley", title: "Ace Frehley", label: "Casablanca", year: 1978, track: "New York Groove",
      discogs: "https://www.discogs.com/master/49903-Kiss-Ace-Frehley-Ace-Frehley",
      spin: "https://www.youtube.com/results?search_query=Ace+Frehley+New+York+Groove+1978",
      color: "#3b82ff", img: "ad-ace-1978",
      alt: "A 1970s fan with an afro, aviators and huge paisley flares struts down a New York street at dusk, an LP under his arm, a yellow cab behind him.",
      head: "Strut responsibly.",
      fine: "Platform boots sold separately."
    },
    "comet-1987": {
      artist: "Ace Frehley", title: "Frehley’s Comet", label: "Megaforce / Atlantic", year: 1987, track: "Rock Soldiers",
      discogs: "https://www.discogs.com/master/49907-Ace-Frehley-Frehleys-Comet",
      spin: "https://www.youtube.com/results?search_query=Frehley%27s+Comet+Rock+Soldiers",
      color: "#c0c8d0", img: "ad-comet-1987",
      alt: "A 1970s fan with a mullet and a leather jacket kneels on the road beside fresh skid marks, cradling a still-smoking vinyl record.",
      head: "Zero to 85.",
      fine: "Gull-wing doors sold separately. Never drink and drive."
    },
    "dynasty-1979": {
      artist: "KISS", title: "Dynasty", label: "Casablanca", year: 1979, track: "Hard Times",
      discogs: "https://www.discogs.com/master/41703-Kiss-Dynasty",
      spin: "https://www.youtube.com/results?search_query=KISS+Hard+Times+Dynasty+1979",
      color: "#b26bff", img: "ad-dynasty-1979",
      alt: "A worried 1970s fan with a perm and tinted aviators hugs a fire extinguisher next to a turntable that is pouring out smoke.",
      head: "Do not extinguish.",
      fine: "Rockets not included."
    },
    "space-invader": {
      artist: "Ace Frehley", title: "Space Invader", label: "Entertainment One", year: 2014, track: "Gimme a Feelin’",
      discogs: "https://www.discogs.com/master/723141-Ace-Frehley-Space-Invader",
      spin: "https://www.youtube.com/results?search_query=Ace+Frehley+Gimme+a+Feelin",
      color: "#39ff88", img: "ad-space-invader",
      alt: "A giant vinyl record hovers like a UFO over a 1970s suburban street and beams up an ecstatic fan in flares, clutching a stack of LPs.",
      head: "Take me to your vinyl.",
      fine: "Limit one per planet."
    },
    "origins-1": {
      artist: "Ace Frehley", title: "Origins Vol. 1", label: "eOne", year: 2016, track: "Cold Gin",
      discogs: "https://www.discogs.com/master/987841-Ace-Frehley-Origins-Vol1",
      spin: "https://www.youtube.com/results?search_query=Ace+Frehley+Origins+Vol+1+Cold+Gin",
      color: "#ff8a3d", img: "ad-origins-1",
      alt: "A moustached 1970s man in a cardigan sits on a shag rug, proudly cradling a cracked golden egg with a vinyl record hatching out of it.",
      head: "It’s a record!",
      fine: "Origin story. No radioactive spiders involved."
    }
  },
  /* house ads: standard on every music site */
  shop: {
    url: "https://recordstoreday.com/Stores", label: "Find a shop near you", color: "#ff7a18",
    img: "ad-vinyl-heaven", width: 1280, height: 720,
    alt: "A smiling 1970s advertising man with long feathered hair and a mustache, in a mustard jacket and a teal-and-magenta patterned tank top, stands in the open doorway of a colourful record shop and beckons you in with both arms open. A neon sign in the window reads VINYL HEAVEN, and crates of colourful records sit on the sidewalk.",
    head: "Come on in — Vinyl Heaven is open!",
    line: "“Step inside, friend. The good stuff is in the crates.” — The Ad Man",
    payoff: "Support your local record shop!"
  },
  rsd: {
    url: "https://recordstoreday.com/Stores", label: "Find a shop. Bring your elbows", color: "#e4007c",
    img: "ad-rsd", width: 1280, height: 720,
    alt: "A grainy 1970s press photo of a frenzied crowd of stylish people in flares, afros, fringe jackets and sunglasses sprinting toward the open doors of a colourful record shop. Some scream with joy and clutch records; a policeman tries to hold the rush back. The sign above the doors reads RECORD STORE DAY.",
    head: "RECORD STORE DAY",
    line: "Doors open at 8. Bring your elbows.",
    payoff: "See you at the door."
  },
  anywhere: {
    url: "https://www.discogs.com/artist/315339-Ace-Frehley", label: "Ace on Discogs", color: "#8fb4ff", img: "ad-anywhere",
    alt: "A beaming 1970s superfan with a curly perm and a moustache, a wonky homemade silver lightning bolt smeared on one cheek and glitter on the other, holds up an Ace Frehley LP in a dark starry sleeve with a silver lightning bolt.",
    caption: "Model is holding an Ace Frehley record.",
    head: "Buy vinyl. Anywhere!",
    fine: "Face paint optional. Glitter is forever."
  },
  /* wonky-70s house ads: no record, just the love of muzak (rotate with the record ads) */
  extras: {
    "flip": { color: "#ff8a3d", img: "ad-flip", head: "Flip it.", fine: "Side A, then Side B. Not the pan.",
      alt: "A gangly 1970s man with a handlebar moustache and an orange apron flips a vinyl record out of a frying pan like a pancake in an avocado-green kitchen." },
    "pencil": { color: "#2ec4b6", img: "ad-pencil", head: "Rewind with a pencil.", fine: "Batteries are for quitters.",
      alt: "A wide-eyed 1970s grandma with a grey perm and huge glasses winds a cassette tape with a yellow pencil." },
    "straws": { color: "#ff5fa2", img: "ad-straws", head: "Suck it, paper.", fine: "Plastic straws: still the loudest way to finish a milkshake.",
      alt: "A sweaty 1970s bodybuilder with a perm, a moustache and a headband grips a pink milkshake and sips it through three plastic straws taped together into one contraption." },
    "mixtape": { color: "#ff3b5c", img: "ad-mixtape", head: "Mixtape = love letter.", fine: "Side B is where you say it.",
      alt: "A nervous 1970s teenager with braces and a shaggy haircut holds out a cassette with a hand-drawn heart on it." },
    "louder": { color: "#3b82ff", img: "ad-louder", head: "Louder.", fine: "Hair not guaranteed to come back.",
      alt: "A man in a powder-blue 1970s leisure suit leans into the blast from a towering wall of speakers, his long hair and tie blown straight back." },
    "champagne": { color: "#e8c35a", img: "ad-champagne", head: "Bring a straw.", fine: "Vintage pressing. Vintage bubbly. Bendy straw, obviously.",
      alt: "A smug 1970s man in a velvet bow tie and frilly shirt sips champagne off a vinyl record through a striped bendy straw." },
    "side-b": { color: "#9be15d", img: "ad-side-b", head: "Side B is better.", fine: "He will tell you why. For an hour.",
      alt: "A smug 1970s record collector with a giant afro, a belly-length beard and tinted glasses points at the vinyl record he holds up." }
  },
  /* Vintage magazine hi-fi ads (full-page scans). Rendered as .vad-scan:
     no HTML headline over the printed type. Portrait originals, not 960x540. */
  hifi: {
    "technics-science": {
      color: "#3d6bb3", img: "ad-technics-science", width: 784, height: 1168,
      label: "Vintage Technics magazine advertisement",
      alt: "Vintage magazine ad headed Technics — The Sound of Science. A woman in a patterned dress sits beside a Technics SL-1200 turntable, SA-700 receiver and a pair of SB-700 speakers."
    },
    "marantz-beauty": {
      color: "#c4a574", img: "ad-marantz-beauty", width: 784, height: 1168,
      label: "Vintage Marantz magazine advertisement",
      alt: "Vintage magazine ad headed Marantz — The Real Beauty is the Sound. A woman in a floral dress leans on a stack of Marantz components beside Marantz speakers."
    },
    "marantz-nice-pair": {
      color: "#c4a574", img: "ad-marantz-nice-pair", width: 784, height: 1168,
      label: "Vintage Marantz magazine advertisement, 1974",
      alt: "Vintage 1974 magazine ad headed Nice Pair. Listen to This. A woman in a white tank and denim shorts sits between Marantz speakers, with a receiver and other components stacked on the cabinets. The page names the Model 2270 stereo receiver and Model HD-88 speaker system."
    },
    "pioneer-speakers": {
      color: "#e85d04", img: "ad-pioneer-speakers", width: 784, height: 1168,
      label: "Vintage Pioneer magazine advertisement",
      alt: "Vintage magazine ad headed What a Pair of Speakers! A woman in a white halter and yellow shorts sits on a shag rug beside a Pioneer SX-737 receiver, CT-F7171 cassette deck and CS-99A speakers."
    },
    "pioneer-pair": {
      color: "#e85d04", img: "ad-pioneer-pair", width: 784, height: 1168,
      label: "Vintage Pioneer magazine advertisement",
      alt: "Vintage magazine ad headed What a Pair! A woman in a patterned mini dress sits on a stack of Pioneer components, with a turntable, speakers and a cassette deck around her."
    },
    "pioneer-sound": {
      color: "#e85d04", img: "ad-pioneer-sound", width: 784, height: 1168,
      label: "Vintage Pioneer magazine advertisement",
      alt: "Vintage magazine ad headed What a Sound! A woman in rust shorts and a cream halter leans on a Pioneer CS-66A speaker, with an SX-727 receiver and CT-4141 cassette deck behind her."
    },
    "jbl-lancer": {
      color: "#d4a017", img: "ad-jbl-lancer", width: 784, height: 1168,
      label: "Vintage JBL magazine advertisement",
      alt: "Vintage magazine ad headed JBL — The new Lancer 66. A woman in a mustard dress leans on a stack of components beside a JBL Lancer 66 loudspeaker. The headline at the bottom reads Feel the Music."
    },
    "orbit-reel": {
      color: "#c45c26", img: "ad-orbit-reel", width: 784, height: 1168, v: 2,
      label: "Vintage Orbit magazine advertisement",
      alt: "Vintage magazine ad headed ORBIT / Both reels. A woman in a metallic copper jumpsuit presents a walnut open-reel tape machine that floats in mid-air with tape curling around it like rings, against a gold starburst and a colourful cosmic backdrop. The campaign payoff at the bottom reads Stay in orbit."
    },
    "orbit-speaker": {
      color: "#1f7a4d", img: "ad-orbit-speaker", width: 784, height: 1168,
      label: "Vintage Orbit magazine advertisement",
      alt: "Vintage magazine ad headed ORBIT / It has a pull. A woman with a dark 1970s beehive, in a metallic emerald jumpsuit, presents a walnut loudspeaker that floats in mid-air with a ring of gold light, against a gold starburst and a colourful cosmic backdrop. Body copy: A walnut cabinet with a gravity of its own. The campaign payoff reads Stay in orbit."
    },
    "orbit-stylus": {
      color: "#6b3fa0", img: "ad-orbit-stylus", width: 784, height: 1168,
      label: "Vintage Orbit magazine advertisement",
      alt: "Vintage magazine ad headed ORBIT / It never skips. A woman with an auburn-red 1970s feathered mane, in a metallic purple jumpsuit, presents a chrome-and-black phono cartridge and diamond stylus that floats in mid-air with a ring of gold light, against a gold starburst and a colourful cosmic backdrop. Body copy: A diamond that stays in the groove. Even when the dancing doesn’t. The campaign payoff reads Stay in orbit."
    },
    "orbit-turntable": {
      color: "#1e4d8c", img: "ad-orbit-turntable", width: 784, height: 1168,
      label: "Vintage Orbit magazine advertisement",
      alt: "Vintage magazine ad headed ORBIT / One revolution. A woman with a short dark 1970s shag, in a metallic cobalt jumpsuit, presents a walnut-and-silver turntable that floats in mid-air with a record turning and a ring of gold light, against a gold starburst and a colourful cosmic backdrop. Body copy: A platter that finds its speed and keeps it. The campaign payoff reads Stay in orbit."
    },
    "fisher-434b": {
      color: "#5a7a4a", img: "ad-fisher-434b", width: 784, height: 1168,
      label: "Vintage Fisher and Altec Lansing magazine advertisement",
      alt: "Vintage magazine ad headed Hear the Difference. Power and Beauty. A woman in a green blouse and pale trousers sits on a sofa beside a Fisher 434B receiver and a pair of grille-cloth speakers. The page also carries Altec Lansing branding."
    },
    "yamaha-natural": {
      color: "#b45309", img: "ad-yamaha-natural", width: 784, height: 1168,
      label: "Vintage Yamaha magazine advertisement",
      alt: "Vintage magazine ad headed Yamaha — Natural Sound. A woman in a floral jumpsuit and tan jacket leans on a Yamaha CR-620 receiver beside a YP-211 turntable and a pair of Yamaha speakers."
    },
    "kenwood-difference": {
      color: "#b91c1c", img: "ad-kenwood-difference", width: 784, height: 1168,
      label: "Vintage Kenwood magazine advertisement",
      alt: "Vintage magazine ad headed Kenwood — Listen to the Difference. A woman in a floral blouse and rust trousers sits beside a stack of Kenwood components and a pair of speakers. The copy names the KR-6030 receiver."
    },
    "sansui-name": {
      color: "#6b4f3a", img: "ad-sansui-name", width: 784, height: 1168,
      label: "Vintage Sansui magazine advertisement",
      alt: "Vintage magazine ad headed Sansui — Music in the Name. A woman in a patterned mini dress stands beside a stack of Sansui components and a turntable, with SP-2000 and SP-1000 speakers labeled on the cabinets."
    },
    "roomspan-cable": {
      color: "#e85d04", img: "ad-roomspan-cable", width: 784, height: 1168,
      label: "Vintage Roomspan magazine advertisement",
      alt: "Vintage magazine ad headed ROOMSPAN / It reaches. A woman with a blonde blowout, in a lemon-yellow jumpsuit, walks a long copper-orange speaker cable across an orange shag rug to a far walnut speaker. The page is signed Roomspan Speaker Cable."
    },
    "goldstrand-cable": {
      color: "#c9a227", img: "ad-goldstrand-cable", width: 784, height: 1168,
      label: "Vintage Goldstrand magazine advertisement",
      alt: "Vintage magazine ad headed GOLDSTRAND / Listen to the jacket. A woman with a dark feathered shag, in a metallic gold blouse and rust trousers, holds a gold-jacketed speaker cable like jewellery beside a walnut speaker. The page is signed Goldstrand Cable."
    },
    "westgauge-cable": {
      color: "#1e3a5f", img: "ad-westgauge-cable", width: 784, height: 1168,
      label: "Vintage Westgauge magazine advertisement",
      alt: "Vintage magazine ad headed WESTGAUGE / Twelve. Not ten. A woman with a chestnut short crop, in a pink floral blouse and cream trousers, holds a fat colourful 12-gauge speaker cable beside a man with a sandy moustache, in a navy knit and jeans, who holds a skinny grey cable. The page is signed Westgauge Speaker Cable."
    }
  },
    coffee: {
    color: "#ff9f43", img: "ad-coffee",
    alt: "A 1970s man with a mullet and a walrus moustache inspects a coffee through a jeweller's loupe; the foam looks like a vinyl record.",
    head: "Fuel the next issue.",
    fine: "One cup ≈ one panel of mayhem."
  }
};
