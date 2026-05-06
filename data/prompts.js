/* Prompt data for the Echo-Infinity showcase rows.
 * - 5s / 30s / 240s: single-prompt videos. Map: caseId -> string
 * - 60s: multi-prompt interactive (6 segments × 10s each). Map: caseId -> [string × 6]
 * - 1h / 24h: YouTube placeholder cards (no per-prompt text — generic labels)
 * Edit the YOUTUBE_PLACEHOLDER_URL once you upload the real videos.
 */
window.YOUTUBE_PLACEHOLDER_URL = "https://www.youtube.com/watch?v=S3zpLIMOU4c";

// Row-level / modal explanatory notes. Keyed by length string.
window.CARD_NOTES = {
  '24h': "Note: Each 24-hour demo is too large to host inline, so it is only viewable via YouTube. Each clip is split into two consecutive 12-hour parts due to YouTube's per-video duration limit, and visual quality has been moderately compressed for upload bandwidth efficiency.",
};

// Per-card YouTube id + visible label.
// `integrate.py` will rewrite this block in-place after each upload batch
// so the youtubeId fields hold real IDs from data/youtube_links.json.
// 1h:  14 cards (one per 1h-ours/*.mp4 source).
// 24h: 12 cards (one per demo); each card carries both Part 1 + Part 2 ids.
window.YOUTUBE_VIDEOS = {
  "1h": [
    {
      "label": "1 h Demo #1",
      "prompt": "Close-up of a polished glass sphere housing a serene Zen garden, featuring a weathered Eastern dwarf raking sand with a bamboo tool, crafting intricate patterns. His slow, deliberate motions exude calm focus, enhanced by soft ambient light and blurred greenery outside the sphere. Slight elevation in camera angle emphasizes his meditative posture and the tranquil, enclosed world within.",
      "youtubeId": "3h_gvozoX68"
    },
    {
      "label": "1 h Demo #2",
      "prompt": "Close-up 3D animated scene of a short, fluffy monster with large, wide eyes and an open mouth, kneeling beside a melting red candle, gazing at the flickering flame in awe. The creature's soft, plush-like fur glows under warm, dramatic lighting, emphasizing its innocent and curious expression. Its playful, hunched posture suggests wonder and discovery, as if experiencing fire for the first time. Behind, a cozy, warmly lit room features a crackling fireplace, soft rugs, and wooden furniture blurred in the background. Rich amber, crimson, and golden hues enhance the magical, intimate atmosphere. Gentle flickers of candlelight animate the scene with subtle realism. Smooth Pixar-style rendering, shallow depth of field, eye-level angle.",
      "youtubeId": "H4v3qjshO6c"
    },
    {
      "label": "1 h Demo #3",
      "prompt": "Close-up wildlife photography of a Victoria crowned pigeon with vibrant blue plumage, red chest, and intricate lacy crest, head tilted proudly, sharp red eye, soft blurred natural background, dramatic lighting, lifelike detail, regal expression, shallow depth of field.",
      "youtubeId": "RKZZNvWteJc"
    },
    {
      "label": "1 h Demo #4",
      "prompt": "A highly detailed papercraft illustration of a vibrant coral reef bustling with colorful fish and sea creatures. Intricately layered coral formations feature precise polyps and branching structures, all meticulously cut and assembled. Schools of tropical fish in shimmering turquoise, orange, and purple glide gracefully, while sea turtles drift overhead and clownfish dart playfully around a textured anemone. Soft pastel blues and gentle wave patterns fill the background, with dappled sunlight filtering through the water. Rendered in a lifelike, textured papercraft style with fine shadows and depth. Close-up view from a slightly elevated angle, emphasizing rich layers and delicate craftsmanship.",
      "youtubeId": "gH3v27nPt70"
    },
    {
      "label": "1 h Demo #5",
      "prompt": "Cinematic grainy photo, a white and orange tabby cat darts joyfully through a dense garden, chasing something unseen. Wide, happy eyes scan the foliage as it runs along a narrow winding path. Shot from ground level with warm tones, dappled sunlight, shallow depth of field, sharp focus on the cat’s expressive face and fur.",
      "youtubeId": "hj4yB8a7Gzs"
    },
    {
      "label": "1 h Demo #6",
      "prompt": "A charming 3D digital render of a happy otter standing confidently on a surfboard, wearing a bright yellow lifejacket, gliding through crystal clear turquoise tropical waters. The otter has soft, detailed fur and an expressive, joyful face, radiating playful energy. Lush green tropical islands with palm trees frame the background, sunlit and vibrant, enhancing the serene island atmosphere. Gentle waves ripple under the board as sunlight filters through the water, creating a lively, tranquil scene. Medium shot with a slightly tilted angle, capturing the otter mid-glide in a dynamic, adventurous pose.",
      "youtubeId": "f4P4Owb9KN0"
    },
    {
      "label": "1 h Demo #7",
      "prompt": "Realistic Japanese manga-style digital painting, a young woman with long black hair in a traditional kimono adorned with intricate floral patterns and a neat obi sash sits quietly inside a moving train. She gazes out the window with a contemplative, serene expression, her reflection softly captured on the glass. Outside, the Tokyo suburbs rush by—lush green fields, dense forests, and distant cherry blossoms blend into vivid streaks of emerald, brown, and gold. Faint outlines of skyscrapers peek through the horizon. The dimly lit cabin features warm wooden seats with soft shadows, enhancing the quiet mood. Medium shot, slightly tilted angle, emphasizing the interplay between reflection, motion, and stillness.",
      "youtubeId": "tq5uIsddQiA"
    },
    {
      "label": "1 h Demo #8",
      "prompt": "Aerial view of Santorini at blue hour, white Cycladic houses with blue domes cascade down volcanic cliffs into the twilight sea. Soft warm glows from windows contrast the cool dusk sky, enhancing the dreamy, ethereal atmosphere. Wide-angle lens captures intricate architecture and vast caldera below, emphasizing dramatic coastal cliffs and serene Aegean expanse. Bird’s-eye perspective with gentle ambient light, highlighting textures and depth in a surreal, tranquil landscape.",
      "youtubeId": "6l2dYCQIqEo"
    },
    {
      "label": "1 h Demo #9",
      "prompt": "3D animation of a small, round, fluffy blue creature with big expressive eyes, part rabbit, part squirrel, hopping through a vibrant enchanted forest. Soft fur, bushy striped tail, wide-eyed wonder as it explores a sparkling stream, glowing color-shifting flowers, purple-silver leaves, floating firefly lights. Playfully interacts with tiny fairy-like beings dancing around a mushroom ring, then gazes up in awe at a massive glowing central tree. Detailed fantasy style, ethereal lighting, soft glow, magical atmosphere. Camera follows in medium shot with dynamic angles, capturing curiosity and enchantment.",
      "youtubeId": "xgn_nB5S51g"
    },
    {
      "label": "1 h Demo #10",
      "prompt": "A detailed digital painting style illustration of a cheerful small man with round glasses and a warm smile, gently holding colorful building blocks, standing in an art gallery. He wears a cozy sweater and neat trousers, his eyes fixed on a large serene landscape painting before him. The gallery features polished wooden floors, modern abstract and classic artworks on the walls, soft warm lighting enhancing textures, and scattered chairs and tables. Slightly low-angle medium shot captures the man and the richly detailed gallery environment, emphasizing his wonder and the artistic ambiance.",
      "youtubeId": "WIEO-39j4Gg"
    },
    {
      "label": "1 h Demo #11",
      "prompt": "A close-up, slightly elevated shot of a winter forest scene: fluffy golden retriever puppies playfully emerge from fresh snow, fur glistening in soft sunlight, tails wagging joyfully. One digs its nose into the snow while another chases a small red ball, leaving tiny paw prints in the pristine white blanket. Dense evergreen trees and a gentle slope frame the background, with delicate snowflakes drifting in the crisp air. Lively, warm-hearted moment in a serene snowy wilderness.",
      "youtubeId": "WxB0PMTfDC4"
    },
    {
      "label": "1 h Demo #12",
      "prompt": "A cinematic 35mm film shot of a young man with short, tousled brown hair and intense, determined eyes sprinting down a neon-lit city street, arms driving powerfully, face focused and energetic. The camera follows closely from a low, slightly behind-the-subject angle, capturing dynamic step-printing motion and every forceful stride. Tall buildings streak past in blurred motion, the cityscape dissolving into a dreamy sepia gradient. Nostalgic vintage film texture with grain and subtle lens flare enhances the dramatic, high-energy atmosphere. Close-up, eye-level tracking shot with smooth dolly movement.",
      "youtubeId": "csM9oSd1b4Q"
    }
  ],
  "24h": [
    {
      "label": "24 h Demo #1",
      "prompt": "Whimsical soft watercolor illustration of a fluffy white cat with bright green eyes peeking from a patterned woven basket behind cozy cushions, one paw lifted, ears up, whiskers twitching, sunlight streams through window, warm living room glow, intricate basket details, close-up from low angle, gentle light on fur.",
      "parts": [
        {
          "n": 1,
          "youtubeId": "dQsq5Xm5d0I"
        },
        {
          "n": 2,
          "youtubeId": "J7wTNNS-_jQ"
        }
      ]
    },
    {
      "label": "24 h Demo #2",
      "prompt": "A cinematic 35mm film shot of a young man with short, tousled brown hair and intense, determined eyes sprinting down a neon-lit city street, arms driving powerfully, face focused and energetic. The camera follows closely from a low, slightly behind-the-subject angle, capturing dynamic step-printing motion and every forceful stride. Tall buildings streak past in blurred motion, the cityscape dissolving into a dreamy sepia gradient. Nostalgic vintage film texture with grain and subtle lens flare enhances the dramatic, high-energy atmosphere. Close-up, eye-level tracking shot with smooth dolly movement.",
      "parts": [
        {
          "n": 1,
          "youtubeId": "2hNCFISpJa8"
        },
        {
          "n": 2,
          "youtubeId": "Z6bWQ0ltrp8"
        }
      ]
    },
    {
      "label": "24 h Demo #3",
      "prompt": "A close-up, slightly elevated shot of a winter forest scene: fluffy golden retriever puppies playfully emerge from fresh snow, fur glistening in soft sunlight, tails wagging joyfully. One digs its nose into the snow while another chases a small red ball, leaving tiny paw prints in the pristine white blanket. Dense evergreen trees and a gentle slope frame the background, with delicate snowflakes drifting in the crisp air. Lively, warm-hearted moment in a serene snowy wilderness.",
      "parts": [
        {
          "n": 1,
          "youtubeId": "rEjSa6Pr3bg"
        },
        {
          "n": 2,
          "youtubeId": "tuL5spS9O_8"
        }
      ]
    },
    {
      "label": "24 h Demo #4",
      "prompt": "Cinematic grainy photo, a white and orange tabby cat darts joyfully through a dense garden, chasing something unseen. Wide, happy eyes scan the foliage as it runs along a narrow winding path. Shot from ground level with warm tones, dappled sunlight, shallow depth of field, sharp focus on the cat’s expressive face and fur.",
      "parts": [
        {
          "n": 1,
          "youtubeId": "KwXYAgHV2vs"
        },
        {
          "n": 2,
          "youtubeId": "gQgQA6dYxH0"
        }
      ]
    },
    {
      "label": "24 h Demo #5",
      "prompt": "Close-up 3D animated scene of a short, fluffy monster with large, wide eyes and an open mouth, kneeling beside a melting red candle, gazing at the flickering flame in awe. The creature's soft, plush-like fur glows under warm, dramatic lighting, emphasizing its innocent and curious expression. Its playful, hunched posture suggests wonder and discovery, as if experiencing fire for the first time. Behind, a cozy, warmly lit room features a crackling fireplace, soft rugs, and wooden furniture blurred in the background. Rich amber, crimson, and golden hues enhance the magical, intimate atmosphere. Gentle flickers of candlelight animate the scene with subtle realism. Smooth Pixar-style rendering, shallow depth of field, eye-level angle.",
      "parts": [
        {
          "n": 1,
          "youtubeId": "MIHlkslsEBs"
        },
        {
          "n": 2,
          "youtubeId": "5zAuqNKZyss"
        }
      ]
    },
    {
      "label": "24 h Demo #6",
      "prompt": "Realistic Japanese manga-style digital painting, a young woman with long black hair in a traditional kimono adorned with intricate floral patterns and a neat obi sash sits quietly inside a moving train. She gazes out the window with a contemplative, serene expression, her reflection softly captured on the glass. Outside, the Tokyo suburbs rush by—lush green fields, dense forests, and distant cherry blossoms blend into vivid streaks of emerald, brown, and gold. Faint outlines of skyscrapers peek through the horizon. The dimly lit cabin features warm wooden seats with soft shadows, enhancing the quiet mood. Medium shot, slightly tilted angle, emphasizing the interplay between reflection, motion, and stillness.",
      "parts": [
        {
          "n": 1,
          "youtubeId": "hd9gPVLmtqU"
        },
        {
          "n": 2,
          "youtubeId": "sQlpS5cle2g"
        }
      ]
    },
    {
      "label": "24 h Demo #7",
      "prompt": "An astronaut in a bright white, reflective spacesuit adorned with technical patches sprints dynamically through a narrow, dimly lit alley in Rio de Janeiro, one hand on hip, the other reaching forward for balance. Sunlight glints off the helmet’s visor, highlighting the contrast between the futuristic gear and the vibrant urban surroundings. Colorful street art covers the walls, and lively locals pass by as sunlight slices through the tight space. Shot from a low-angle mid-shot perspective, emphasizing energy, motion, and the surreal clash of space exploration and Brazilian street culture.",
      "parts": [
        {
          "n": 1,
          "youtubeId": "WlqILMn9veU"
        },
        {
          "n": 2,
          "youtubeId": "GwEJeYmElS4"
        }
      ]
    },
    {
      "label": "24 h Demo #8",
      "prompt": "Macro close-up of a young freckled woman with intense focus, searching intently. Her wide, slightly squinted eyes show determination, freckles scattered playfully across her cheeks and nose. Soft, loose hair frames her face, strands falling over her forehead. Smooth skin with a natural rosy glow, subtle texture visible. Shallow depth of field, blurred desk background with faint outlines of objects. Extreme close-up, eye-level angle, capturing delicate details and quiet concentration.",
      "parts": [
        {
          "n": 1,
          "youtubeId": "okvGF42GkaE"
        },
        {
          "n": 2,
          "youtubeId": "96Z41jX0d7I"
        }
      ]
    },
    {
      "label": "24 h Demo #9",
      "prompt": "Close-up wildlife photography of a Victoria crowned pigeon with vibrant blue plumage, red chest, and intricate lacy crest, head tilted proudly, sharp red eye, soft blurred natural background, dramatic lighting, lifelike detail, regal expression, shallow depth of field.",
      "parts": [
        {
          "n": 1,
          "youtubeId": "rXwuoukng5Y"
        },
        {
          "n": 2,
          "youtubeId": "t2qd01SZyoU"
        }
      ]
    },
    {
      "label": "24 h Demo #10",
      "prompt": "Close-up of a vibrant blue parrot with shimmering, metallic feathers in vivid blues, deep indigos, and greens, glistening in natural light. The alert bird perches on a branch, eyes bright with curiosity, set against a softly blurred warm background. Lifelike detail highlights plumage texture and subtle movements. Naturalistic wildlife style, shallow depth of field.",
      "parts": [
        {
          "n": 1,
          "youtubeId": "Hr6XonPQbe0"
        },
        {
          "n": 2,
          "youtubeId": "8JesxwufG04"
        }
      ]
    },
    {
      "label": "24 h Demo #11",
      "prompt": "Cartoon-style vibrant illustration of a cheerful black-and-white panda playing a small acoustic guitar, sitting on a round stool with one paw strumming and the other on its knee. The panda has round, expressive eyes and a friendly smile, fully focused on its music. Warm cozy room background with potted plants, colorful wall hangings, and soft lighting. Slightly overhead camera angle, capturing the joyful moment in a lively, inviting atmosphere.",
      "parts": [
        {
          "n": 1,
          "youtubeId": "-VC6BDaKzvE"
        },
        {
          "n": 2,
          "youtubeId": "E-ynmABMUbA"
        }
      ]
    }
  ]
};

// SHOWCASE_ORDER for 1h / 24h auto-derives from YOUTUBE_VIDEOS length so we
// never have a mismatch between data and rendered card count.
window.SHOWCASE_ORDER = {
  '1h':  window.YOUTUBE_VIDEOS['1h'].map((_, i) => `1h-${i+1}`),
  '24h': window.YOUTUBE_VIDEOS['24h'].map((_, i) => `24h-${i+1}`),
  '240s': ['1','2','3','4','5','6','7','8','9','10'],
  '30s': ['1','2','3','4','5','6','7','8','9','10','11'],
  '60s': ['1','2','3','4'],
  '5s': ['1','2','3','4','5','6','7','8','9','10'],
};

window.PROMPTS = {

  '240s': {
    '1': "Close-up 3D animated scene of a short, fluffy monster with large, wide eyes and an open mouth, kneeling beside a melting red candle, gazing at the flickering flame in awe. The creature's soft, plush-like fur glows under warm, dramatic lighting, emphasizing its innocent and curious expression. Its playful, hunched posture suggests wonder and discovery, as if experiencing fire for the first time. Behind, a cozy, warmly lit room features a crackling fireplace, soft rugs, and wooden furniture blurred in the background. Rich amber, crimson, and golden hues enhance the magical, intimate atmosphere.",
    '2': "Close-up of a vibrant blue parrot with shimmering, metallic feathers in vivid blues, deep indigos, and greens, glistening in natural light. The alert bird perches on a branch, eyes bright with curiosity, set against a softly blurred warm background. Lifelike detail highlights plumage texture and subtle movements. Naturalistic wildlife style, shallow depth of field.",
    '3': "Close-up of a polished glass sphere housing a serene Zen garden, featuring a weathered Eastern dwarf raking sand with a bamboo tool, crafting intricate patterns. His slow, deliberate motions exude calm focus, enhanced by soft ambient light and blurred greenery outside the sphere. Slight elevation in camera angle emphasizes his meditative posture and the tranquil, enclosed world within.",
    '4': "Black-and-white classic photograph of an elderly man with a weathered face and kind eyes playing an antique piano, fingers gracefully moving over the keys. Side lighting casts dramatic shadows, highlighting textured hands and deep concentration. Upright posture, intense focus, warm ambient glow. Blurred background suggests a cozy room with wooden floors and vintage furniture.",
    '5': "An astronaut in a bright white, reflective spacesuit adorned with technical patches sprints dynamically through a narrow, dimly lit alley in Rio de Janeiro, one hand on hip, the other reaching forward for balance. Sunlight glints off the helmet's visor, highlighting the contrast between the futuristic gear and the vibrant urban surroundings.",
    '6': "A subtle and elegant Japanese-style photograph of a woman with soft, contemplative eyes and long flowing dark hair, seated by the window of a speeding train. She sits serenely, hands gently folded in her lap, gazing thoughtfully beyond the glass as the city rushes past. Rendered with a soft, muted color palette and vintage film texture, the image captures quiet introspection amid motion.",
    '7': "FPV drone shot through a vibrant underwater suburb, coral-lined streets teeming with tropical fish, sunlit shallow waters, vivid colors, dynamic motion, lifelike marine environment, swift fluid movement, immersive first-person perspective.",
    '8': "Close-up cinematic shot of a young woman driving at night, rain streaking the windshield, blurring a dark green forest ahead. She wears a sleek black raincoat and reflective sunglasses, face softly lit by dim dashboard lights. Her hands grip the steering wheel, fingers tapping rhythmically, expression pensive and distant.",
    '9': "Whimsical soft watercolor illustration of a fluffy white cat with bright green eyes peeking from a patterned woven basket behind cozy cushions, one paw lifted, ears up, whiskers twitching, sunlight streams through window, warm living room glow, intricate basket details, close-up from low angle, gentle light on fur.",
    '10': "Macro close-up of a young freckled woman with intense focus, searching intently. Her wide, slightly squinted eyes show determination, freckles scattered playfully across her cheeks and nose. Soft, loose hair frames her face, strands falling over her forehead. Shallow depth of field, blurred desk background with faint outlines of objects.",
  },

  '30s': {
    '1': "A person is drawing in a cozy, well-lit room. They are seated at a large wooden desk, surrounded by various art supplies such as pencils, erasers, and sketchbooks. The person, who has medium-length brown hair and wears casual clothes, is focused intently on their artwork, occasionally pausing to think and adjust their grip on the pencil.",
    '2': "\"Gwen Stacy reading a book, Van Gogh style.\" In this vivid and detailed painting, Gwen Stacy, with her iconic red hair and green eyes, is depicted reading a book in a cozy, sunlit room. She sits in a relaxed posture on a vintage armchair, surrounded by vibrant floral patterns and warm, golden hues typical of Van Gogh's palette.",
    '3': "A high-speed action scene featuring a sleek black motorcycle accelerating down a winding asphalt road. The motorcycle's engine roars as it gains speed, smoke trailing from the tires. The rider, wearing a black leather jacket and helmet, leans forward with intense focus.",
    '4': "A realistic, detailed scene featuring a person standing next to a kitchen sink. The person has tousled brown hair and is wearing a casual, white apron over a blue shirt and jeans. They are leaning slightly towards the sink, reaching for a sponge to clean a dish.",
    '5': "A realistic, serene outdoor scene featuring a small, brown wildcat and a vibrant bluebird. The cat is crouched down with alert ears and narrowed eyes, while the bird stands tall with its wings slightly spread, ready to take flight.",
    '6': "A serene and tranquil tableau of a cozy house nestled in a peaceful countryside setting. The house has a thatched roof, white walls, and wooden shutters painted a soft pastel color. A gentle breeze rustles the leaves of the surrounding trees, causing them to sway softly.",
    '7': "A serene and tranquil tableau of a rugged cliff overlooking the ocean at sunset. The cliff face is weathered with layers of sedimentary rock, showcasing various hues of brown and gray. Soft, wispy clouds drift across the sky, casting gentle shadows over the landscape.",
    '8': "A serene and tranquil tableau of a modern bathroom, featuring soft morning light filtering through a frosted glass window. The room is minimalist with clean white tiles and a large freestanding bathtub filled with water, steam gently rising from it.",
    '9': "A serene and peaceful close-up scene of a bunch of ripe, purple grapes hanging from a vine. The grapes are plump and glistening with dew, creating a vibrant contrast against the green, waxy leaves surrounding them.",
    '10': "In a cyberpunk-themed coastal beach during spring, the sun sets over a futuristic horizon, casting a neon glow over the scene. Waves gently lap against the sandy shore, reflecting the vibrant hues of city lights and holographic advertisements above.",
    '11': "A person is cycling through a scenic park trail. The rider is wearing a helmet, casual clothes, and sunglasses, pedaling steadily. They are mid-action, leaning slightly forward, with one hand on the handlebars and the other hanging loosely.",
  },

  '60s': {
    '1': [
      "A little boy in a blue T-shirt stands on a lush green lawn, arms relaxed at his sides, smiling at the camera, natural fresh realistic style.",
      "A little boy in a blue T-shirt starts to step forward, lightly running, with his arms swinging naturally. The grass and blue sky remain unchanged.",
      "A little boy in a blue T-shirt runs faster, leaning slightly forward, arms swinging naturally, feet lightly off the ground. The background remains the same grassy lawn.",
      "A little boy in a blue T-shirt jumps into the air, knees bent, arms raised, performing a light jump. The grass and sky stay consistent.",
      "A little boy in a blue T-shirt lands and continues running forward, arms swinging naturally, smiling as he enjoys the run. The background remains the same.",
      "A little boy in a blue T-shirt stops running, hands on his hips with a smile, body leaning slightly forward, sunlight falling on the grass, natural fresh realistic style.",
    ],
    '2': [
      "A realistic video of a Texas Hold'em poker event at a casino. A male player in his late 30s with a medium build, short dark hair, light stubble, and a sharp jawline wears a fitted navy blazer over a charcoal crew-neck tee, dark jeans, and a stainless-steel watch. He sits at a well-lit poker table and tightly grips his hole cards, wearing a tense, serious expression. The table is filled with chips of various colors, the dealer is seen dealing cards, and several rows of slot machines glow in the background. The camera focuses on the player's strained concentration. Wide shot to medium close-up.",
      "A realistic video of a Texas Hold'em poker event at a casino. The same male player—late 30s, medium build, short dark hair, light stubble, sharp jawline—dressed in a fitted navy blazer over a charcoal tee, dark jeans, and a stainless-steel watch—flicks his cards onto the felt, then leans back in the chair with arms spread wide in celebration. The dealer continues dealing to the table as stacks of multicolored chips crowd the surface; slot machines and nearby patrons fill the background. The camera locks onto the player's exuberant reaction. Wide shot to medium close-up.",
      "A realistic video of a Texas Hold'em poker event at a casino. The same late-30s male player, medium build with short dark hair and light stubble, wearing a navy blazer, charcoal tee, dark jeans, and a stainless-steel watch, reveals the winning hand and leans back in celebration while the dealer keeps the game moving. A nearby patron claps and cheers for the winner, amplifying the festive atmosphere. The table brims with colorful chips, with slot machines and other tables behind. The camera centers on the winner's reaction as the applause rises. Wide shot to medium close-up.",
      "A realistic video of a Texas Hold'em poker event at a casino. The same male player—late 30s, medium build, short dark hair, light stubble—still in his navy blazer, charcoal tee, dark jeans, and stainless-steel watch—sits upright and begins neatly arranging the stacks of chips in front of him, methodically straightening and organizing the piles. The dealer continues dealing, and rows of slot machines pulse in the background. The camera captures the composed, purposeful movements at the well-lit table. Wide shot to medium close-up.",
      "A realistic video of a Texas Hold'em poker event at a casino. The same late-30s male player with short dark hair, light stubble, and a sharp jawline, wearing a fitted navy blazer over a charcoal tee, dark jeans, and a stainless-steel watch, glances over his chips and breaks into a proud, self-assured smile, basking in the victorious moment. Multicolored chips crowd the felt, the dealer works the table, and slot machines glow behind. The camera emphasizes the winner's pride and satisfaction. Wide shot to medium close-up.",
      "A realistic video of a Texas Hold'em poker event at a casino. The same male player—late 30s, medium build, short dark hair, light stubble—dressed in a navy blazer, charcoal tee, dark jeans, and a stainless-steel watch—shares a celebratory high-five with a nearby patron after the win, laughter and cheers rippling around the table. Stacks of chips are spread across the felt, the dealer continues dealing, and the background features rows of slot machines and other patrons. The camera focuses on the jubilant interaction. Wide shot to medium close-up.",
    ],
    '3': [
      "Apostle Paul from the Bible walking along a dusty path in ancient Roman times. He is wearing traditional biblical attire, including a tunic and cloak, and carries a walking stick in one hand. His facial expression conveys determination and wisdom. The background shows a serene countryside with rolling hills and farmland. The scene captures Apostle Paul in mid-stride, with a slight forward lean, emphasizing his journey. Medium shot, static camera.",
      "Apostle Paul from the Bible continues walking along a dusty path in ancient Roman times. He slowly walks into a patch of low shrubs and bush along the path. His facial expression remains determined and wise. The background shows a serene countryside with rolling hills and farmland. The scene captures Apostle Paul in mid-stride, with a slight forward lean, emphasizing his journey. Medium shot static camera.",
      "Apostle Paul from the Bible continues walking along a dusty path in ancient Roman times. A young boy, wearing gray, threadbare clothes with frayed hems and patched knees, appears from behind a nearby bush, watching Paul curiously. Paul's facial expression remains determined and wise, but he glances momentarily at the boy before continuing his stride. The background shows a serene countryside with rolling hills and farmland. The scene captures Apostle Paul in mid-stride, with a slight forward lean, emphasizing his journey. Medium shot static camera.",
      "Apostle Paul from the Bible standing in the dusty path in ancient Roman times. The young boy, dressed in gray, worn, threadbare clothing, steps out from behind the bush, approaching Paul hesitantly with wide eyes. Paul's facial expression remains determined and wise, but he stops briefly to offer the boy a warm smile and a nod of encouragement. The background shows a serene countryside with rolling hills and farmland. The scene captures Apostle Paul in mid-stride, with a slight forward lean, emphasizing his journey. Medium shot static camera.",
      "Apostle Paul from the Bible standing in a dusty path in ancient Roman times. The young boy, in gray, tattered clothes—faded and threadbare—steps closer, reaching out a hand to touch the hem of Paul's robe, looking up with a mix of curiosity and reverence. Paul's facial expression remains determined and wise, but he pauses again, placing a gentle hand on the boy's shoulder, offering a reassuring squeeze. The background shows a serene countryside with rolling hills and farmland. The scene captures Apostle Paul in mid-stride, with a slight forward lean, emphasizing his journey. Medium shot static camera.",
      "Apostle Paul from the Bible continues walking along a dusty path in ancient Roman times. The young boy, dressed in gray, worn, threadbare clothing, walks beside Paul. As they continue, a few crows sweep across the sky overhead. The background shows a serene countryside with rolling hills and farmland. The scene captures Apostle Paul in mid-stride, with a slight forward lean, emphasizing his journey. Medium shot static camera.",
    ],
    '4': [
      "A vibrant Christmas celebration in Rio de Janeiro, Brazil. The scene features a lively street filled with colorful lights, festive decorations, and cheerful locals in casual summer attire. At the center of the street stands a slightly overweight Black adult man in a blue shirt, holding a small red ball in his hand. People are walking, dancing, and enjoying the festive atmosphere. In the background, there are tall buildings, palm trees, and a glimpse of the iconic Christ the Redeemer statue. The sun is setting, casting a warm golden glow over the scene. Medium shot capturing the bustling energy of the street.",
      "A vibrant Christmas celebration in Rio de Janeiro, Brazil. The scene features a lively street filled with colorful lights, festive decorations, and cheerful locals in casual summer attire. A slightly overweight Black adult man in a blue shirt tosses a small red ball into the air, drawing a small crowd of children and adults who watch in awe. The sun is setting, casting a warm golden glow over the scene. Medium shot capturing the bustling energy of the street.",
      "A vibrant Christmas celebration in Rio de Janeiro, Brazil. The scene features a lively street filled with colorful lights, festive decorations, and cheerful locals in casual summer attire. The slightly overweight Black adult man in a blue shirt switches to flowing ribbons, twirling long, colorful streamers that ripple through the warm air, eliciting gasps and cheers from the growing crowd of children and adults. The sun is setting, casting a warm golden glow over the scene. Medium shot capturing the bustling energy of the street.",
      "A vibrant Christmas celebration in Rio de Janeiro, Brazil. The scene features a lively street filled with colorful lights, festive decorations, and cheerful locals in casual summer attire. The slightly overweight Black adult man in a blue shirt hold a flaming torch and continues performing with it, sending the crowd's excitement surging higher as they watch in awe. The sun is setting, casting a warm golden glow over the scene. Medium shot capturing the bustling energy of the street.",
      "A vibrant Christmas celebration in Rio de Janeiro, Brazil. The scene features a lively street filled with colorful lights, festive decorations, and cheerful locals in casual summer attire. The slightly overweight Black adult man in a blue shirt balances the flaming torch on his chin, while children press closer to the front, eyes wide with wonder. The sun is setting, casting a warm golden glow over the scene. Medium shot capturing the bustling energy of the street.",
      "A vibrant Christmas celebration in Rio de Janeiro, Brazil. The scene features a lively street filled with colorful lights, festive decorations, and cheerful locals in casual summer attire. The slightly overweight Black adult man in a blue shirt twirls the flaming torch between his fingers, and the audience begins applauding, waves of clapping rolling through the crowd. The sun is setting, casting a warm golden glow over the scene. Medium shot capturing the bustling energy of the street.",
    ],
  },

  '5s': {
    '1': "A bicycle accelerating to gain speed, captured in a smooth time-lapse sequence. The bicycle is a classic red road bike with sleek aerodynamic handlebars and reflective wheels. The rider, a focused individual in cycling gear, leans forward, pedaling vigorously. The background shows a winding asphalt road leading into a forest.",
    '2': "A person swimming in the ocean, with waves gently crashing around them. The swimmer is fully submerged, with only their head breaking the water's surface, taking deep breaths between strokes. They are wearing a black swimsuit and have wavy, shoulder-length brown hair that floats around their face.",
    '3': "A playful golden retriever puppy running through a green meadow covered with wildflowers. The puppy has a joyful expression, with its tail wagging energetically. It is bounding through the grass, leaving a trail of small footprints behind.",
    '4': "A dynamic and vibrant scene featuring a skateboard and a surfboard lying side by side on a sandy beach. The skateboard is sleek black with colorful stickers, while the surfboard is white with blue stripes and a fin.",
    '5': "A person is digging in a sunny, rural field. They are wearing a brown work jacket, blue jeans, and a straw hat to protect themselves from the sun. Their face is covered with sweat, and they have a determined look as they focus intently on the task.",
    '6': "A person performing push-ups on a gym mat. They are wearing athletic clothing - a black sports bra and matching leggings. Their muscles are flexing as they move up and down, maintaining a steady rhythm.",
    '7': "A person is rock climbing, focusing on their intense concentration and determination. They are gripping the rock face with strong hands, pushing off with their legs to pull themselves up. Their muscles flex as they navigate the uneven terrain.",
    '8': "A black and white animation-style video of a panda drinking coffee in a cozy café in Paris. The panda is sitting at a small round table with a steaming cup of coffee in front of it. It holds the cup delicately with its paw, sipping slowly with a relaxed and content expression.",
    '9': "3D render of origami dancers made from white paper, performing a modern dance routine against a pristine white background in a studio setting. Each dancer has delicate folds and creases that catch the light, enhancing their ethereal appearance.",
    '10': "A vibrant, animated scene featuring a lively orange bird perched on a branch. The bird has bright orange feathers, a curved beak, and expressive black eyes. It tilts its head curiously, then flaps its wings slightly as if testing the air before taking off.",
  },
};

// Comparison videos.
//   case = anonymized per-row index (1..N), used as the runtime sub-dir name
//          (videos/compare/<L>/<case>/<method>.mp4). Original HF case prefixes
//          are stored only in yt_pipeline/anonymity_mapping.json.
window.COMPARE = {
  '240s': [
    { case: '1', prompt: window.PROMPTS['240s']['3'],
      files: {ours: '1', longlive: '1', memflow: '1', memorize: '1'} },
    { case: '2', prompt: window.PROMPTS['240s']['5'],
      files: {ours: '2', longlive: '2', memflow: '2', memorize: '2'} },
    { case: '3', prompt: window.PROMPTS['240s']['2'],
      files: {ours: '3', longlive: '3', memflow: '3', memorize: '3'} },
  ],
  '30s': [
    { case: '1', prompt: window.PROMPTS['30s']['3'],
      files: {ours: '1', longlive: '1', memflow: '1', memorize: '1'} },
    { case: '2',
      prompt: "A serene countryside scene featuring a brown horse grazing alongside a white sheep. The horse stands tall with a flowing mane and tail, while the sheep grazes peacefully nearby. Both animals are set against a backdrop of rolling green hills and a clear blue sky dotted with fluffy clouds. The horse's muscular body and the sheep's fluffy coat are highlighted, capturing their natural postures and interactions. Medium shot focusing on both animals in a harmonious rural setting.",
      files: {ours: '2', longlive: '2', memflow: '2', memorize: '2'} },
    { case: '3', prompt: window.PROMPTS['30s']['5'],
      files: {ours: '3', longlive: '3', memflow: '3', memorize: '3'} },
  ],
  '60s': [
    { case: '1',
      // Multi-prompt 60s scene — first segment kept as `prompt` for legacy callers,
      // full 6-segment array in `prompts` for the showcase-style multi rendering.
      prompt: window.PROMPTS['60s']['1'][0],
      prompts: window.PROMPTS['60s']['1'],
      files: {ours: '1', longlive: '1', memflow: '1', memorize: '1'} },
  ],
  '5s': [
    { case: '1', prompt: window.PROMPTS['5s']['5'],
      files: {ours: '1', longlive: '1', memflow: '1', memorize: '1'} },
    { case: '2', prompt: window.PROMPTS['5s']['1'],
      files: {ours: '2', longlive: '2', memflow: '2', memorize: '2'} },
    { case: '3', prompt: window.PROMPTS['5s']['2'],
      files: {ours: '3', longlive: '3', memflow: '3', memorize: '3'} },
  ],
};
