export type ReadingContext = {
  name: string;
  birthDate?: string;
  starSign: string;
  mood: string;
  recentSigns?: string;
};

export type ReadingType = 
  | 'tarot' 
  | 'love' 
  | 'career' 
  | 'spirit-animal' 
  | 'spell' 
  | 'crystal-guide' 
  | 'crystal-ball' 
  | 'bundle';

export const SYSTEM_PROMPT = `You are MysticMate, a compassionate and uplifting spiritual guide.
Your goal is to provide G-rated, encouraging, and honest readings.
Avoid dark or scary predictions. Focus on empowerment, potential, and positive energy.
Always speak in a mystical yet accessible tone.
All content must be original and copyright-protected by MysticMate.`;

export const PROMPTS: Record<ReadingType, (ctx: ReadingContext) => string> = {
  tarot: (ctx) => `
    Please provide a 3-card Tarot reading (Past, Present, Future) for ${ctx.name}${ctx.birthDate ? ` (born ${ctx.birthDate})` : ""}, who is a ${ctx.starSign}.
    They are currently feeling ${ctx.mood}${ctx.recentSigns ? ` and have noticed these signs: ${ctx.recentSigns}` : ''}.
    Structure the response as:
    1. The Past: [Interpretation]
    2. The Present: [Interpretation]
    3. The Future: [Interpretation]
    4. A final uplifting message.
  `,
  love: (ctx) => `
    Please provide a Love & Relationships reading for ${ctx.name}${ctx.birthDate ? ` (born ${ctx.birthDate})` : ""}, a ${ctx.starSign}.
    Consider their current mood: ${ctx.mood}.
    Focus on soul connections, Venus energy, and heartwarming insights.
    Structure the response as:
    - Current Heart Energy: [Insights]
    - Soul Connections: [Insights]
    - Guidance for the Path Ahead: [Insights]
  `,
  career: (ctx) => `
    Please provide a Career & Finances reading for ${ctx.name}${ctx.birthDate ? ` (born ${ctx.birthDate})` : ""}, a ${ctx.starSign}.
    They are feeling ${ctx.mood} about their path.
    Identify potential talents and a lucky number for manifestation.
    Structure the response as:
    - Professional Path & Talents: [Insights]
    - Manifesting Abundance: [Insights]
    - Your Lucky Manifestation Number: [Number]
    - Closing Encouragement.
  `,
  'spirit-animal': (ctx) => `
    Please provide a Spirit Animal & Energy reading for ${ctx.name}${ctx.birthDate ? ` (born ${ctx.birthDate})` : ""}, a ${ctx.starSign}.
    Mood: ${ctx.mood}.
    Identify a spirit animal guide and interpret their current aura energy.
    Structure the response as:
    - Your Spirit Animal Guide: [Animal & Meaning]
    - Aura Energy Analysis: [Interpretation]
    - Integration Message: [How to carry this energy forward]
  `,
  spell: (ctx) => `
    Please create a personalized AI-generated spell for ${ctx.name}${ctx.birthDate ? ` (born ${ctx.birthDate})` : ""}, a ${ctx.starSign}.
    Based on their mood of ${ctx.mood}, create a positive, G-rated intention or ritual.
    Structure the response as:
    - Your Personal Intention: [A short, powerful affirmation]
    - The Ritual: [Simple steps using common items like candles or water]
    - The Incantation: [A rhyming or rhythmic verse to speak]
  `,
  'crystal-guide': (ctx) => `
    Please provide a personalized Crystal Guide for ${ctx.name}${ctx.birthDate ? ` (born ${ctx.birthDate})` : ""}, a ${ctx.starSign}.
    Based on their current energy (${ctx.mood}), recommend crystals for support.
    Structure the response as:
    - Your Core Crystal: [Crystal Name & Why it fits]
    - How to Use Your Crystal: [Simple practice]
    - Companion Stones: [2-3 other crystals]
  `,
  'crystal-ball': (ctx) => `
    Please provide a Crystal Ball 'Fate' reading for ${ctx.name}${ctx.birthDate ? ` (born ${ctx.birthDate})` : ""}.
    As they gaze into the crystal ball with their current mood of ${ctx.mood}, what glimpses of their destiny appear?
    Focus on a single, powerful 'fate' message that feels destined.
    Structure the response as:
    - The Vision: [Description of what is seen in the crystal ball]
    - Your Destined Path: [Interpretation of the fate message]
    - A final mystical blessing.
  `,
  bundle: (ctx) => `
    Please provide a comprehensive Spiritual Bundle reading for ${ctx.name}${ctx.birthDate ? ` (born ${ctx.birthDate})` : ""}, a ${ctx.starSign}.
    Their current mood is ${ctx.mood}${ctx.recentSigns ? ` and they've noticed these signs: ${ctx.recentSigns}` : ''}.
    Combine insights from all our mystical arts into one grand reading:
    1. Tarot (Past, Present, Future)
    2. Love & Relationships (Heart energy and connections)
    3. Career & Finances (Talents and manifestation)
    4. Spirit Animal & Aura Analysis
    5. Personalized Spell & Ritual
    6. Crystal Guide
    7. Crystal Ball Vision (A glimpse of fate)
    Ensure the reading flows beautifully as a single cohesive experience.
  `,
};
