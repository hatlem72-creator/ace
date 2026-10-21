/* Fake vinyl ads: SITE DATA for the Ace Is Back! site.
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
    url: "https://recordstoreday.com/Stores", label: "Find a shop near you", color: "#ff5fa2", img: "ad-shop",
    alt: "A run-down little record shop at dusk: peeling paint, a taped-up window, a pink neon record sign and crates of vinyl spilling onto the pavement. Nobody in sight.",
    head: "Support your local record shop!",
    fine: "No algorithm was harmed."
  },
  anywhere: {
    url: "https://www.discogs.com/artist/315339-Ace-Frehley", label: "Ace on Discogs", color: "#8fb4ff", img: "ad-anywhere",
    alt: "A beaming 1970s superfan with a curly perm, a moustache, a wonky homemade silver star smeared round one eye and glitter on his cheeks holds up an Ace Frehley LP in a dark starry sleeve with a silver lightning bolt.",
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
      alt: "A sweaty 1970s bodybuilder with a perm, a moustache and a headband sips a pink milkshake through three plastic straws taped together." },
    "mixtape": { color: "#ff3b5c", img: "ad-mixtape", head: "Mixtape = love letter.", fine: "Side B is where you say it.",
      alt: "A nervous 1970s teenager with braces and a shaggy haircut holds out a cassette with a hand-drawn heart on it." },
    "louder": { color: "#3b82ff", img: "ad-louder", head: "Louder.", fine: "Hair not guaranteed to come back.",
      alt: "A small man in a powder-blue 1970s leisure suit stands before a towering wall of speakers, his long hair and scarf blown sideways." },
    "champagne": { color: "#e8c35a", img: "ad-champagne", head: "Bring a straw.", fine: "Vintage pressing. Vintage bubbly. Bendy straw, obviously.",
      alt: "A smug 1970s man in a velvet bow tie and frilly shirt sips champagne off a vinyl record through a striped bendy straw." },
    "side-b": { color: "#9be15d", img: "ad-side-b", head: "Side B is better.", fine: "He will tell you why. For an hour.",
      alt: "A smug 1970s record collector with a giant afro, a belly-length beard and tinted glasses points at the vinyl record he holds up." }
  },
  coffee: {
    color: "#ff9f43", img: "ad-coffee",
    alt: "A 1970s man with a mullet and a walrus moustache inspects a coffee through a jeweller's loupe; the foam looks like a vinyl record.",
    head: "Fuel the next issue.",
    fine: "One cup ≈ one panel of mayhem."
  }
};
