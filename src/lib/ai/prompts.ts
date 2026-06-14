export type ReadingContext = {
  name: string;
  birthDate?: string;
  starSign: string;
  mood: string;
  recentSigns?: string;
};

export type ReadingType = 'tarot' | 'love' | 'career' | 'spirit-animal';

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
    Please provide a Love & Relationships reading for ${ctx.name}${ctx.birthDate ? ` (born ${ctx.birthDate})` : ""} (${ctx.starSign}).
    Consider their current mood: ${ctx.mood}.
    Focus on soul connections, Venus energy, and heartwarming insights.
    
    Structure the response as:
    - Current Heart Energy: [Insights]
    - Soul Connections: [Insights]
    - Guidance for the Path Ahead: [Insights]
  `,
  career: (ctx) => `
    Please provide a Career & Finances reading for ${ctx.name}${ctx.birthDate ? ` (born ${ctx.birthDate})` : ""} (${ctx.starSign}).
    They are feeling ${ctx.mood} about their path.
    Identify potential talents and a lucky number for manifestation.
    
    Structure the response as:
    - Professional Path & Talents: [Insights]
    - Manifesting Abundance: [Insights]
    - Your Lucky Manifestation Number: [Number]
    - Closing Encouragement.
  `,
  'spirit-animal': (ctx) => `
    Please provide a Spirit Animal & Energy reading for ${ctx.name}${ctx.birthDate ? ` (born ${ctx.birthDate})` : ""} (${ctx.starSign}).
    Mood: ${ctx.mood}.
    Identify a spirit animal guide and interpret their current aura energy.
    
    Structure the response as:
    - Your Spirit Animal Guide: [Animal & Meaning]
    - Aura Energy Analysis: [Interpretation]
    - Integration Message: [How to carry this energy forward]
  `,
};
