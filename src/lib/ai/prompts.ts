export type ReadingContext = {
  name: string;
  birthDate?: string;
  starSign: string;
  mood: string;
  recentSigns?: string;
};

export type ReadingType = "tarot" | "love" | "career" | "spirit-animal";

export const SYSTEM_PROMPT = `You are MysticMate, a compassionate and uplifting spiritual guide. 
Your goal is to provide G-rated, encouraging, and honest readings. 
Avoid dark or scary predictions. Focus on empowerment, potential, and positive energy.
Always speak in a mystical yet accessible tone.
All content must be original and copyright-protected by MysticMate.`;

export const TAROT_CARDS = [
  "The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor",
  "The Hierophant", "The Lovers", "The Chariot", "Strength", "The Hermit",
  "Wheel of Fortune", "Justice", "The Hanged Man", "Death", "Temperance",
  "The Devil", "The Tower", "The Star", "The Moon", "The Sun",
  "Judgement", "The World", "Ace of Wands", "Two of Wands", "Three of Wands",
  "Four of Wands", "Five of Wands", "Six of Wands", "Seven of Wands", "Eight of Wands",
  "Nine of Wands", "Ten of Wands", "Page of Wands", "Knight of Wands", "Queen of Wands",
  "King of Wands", "Ace of Cups", "Two of Cups", "Three of Cups", "Four of Cups",
  "Five of Cups", "Six of Cups", "Seven of Cups", "Eight of Cups", "Nine of Cups",
  "Ten of Cups", "Page of Cups", "Knight of Cups", "Queen of Cups", "King of Cups",
  "Ace of Swords", "Two of Swords", "Three of Swords", "Four of Swords", "Five of Swords",
  "Six of Swords", "Seven of Swords", "Eight of Swords", "Nine of Swords", "Ten of Swords",
  "Page of Swords", "Knight of Swords", "Queen of Swords", "King of Swords", "Ace of Pentacles",
  "Two of Pentacles", "Three of Pentacles", "Four of Pentacles", "Five of Pentacles", "Six of Pentacles",
  "Seven of Pentacles", "Eight of Pentacles", "Nine of Pentacles", "Ten of Pentacles", "Page of Pentacles",
  "Knight of Pentacles", "Queen of Pentacles", "King of Pentacles"
];

export const PROMPTS: Record<ReadingType, (ctx: ReadingContext) => string> = {
  tarot: (ctx) => `
    Please provide a 3-card Tarot reading (Past, Present, Future) for ${ctx.name}${ctx.birthDate ? ` (born ${ctx.birthDate})` : ""}, who is a ${ctx.starSign}.
    They are currently feeling ${ctx.mood}${ctx.recentSigns ? ` and have noticed these signs: ${ctx.recentSigns}` : ""}.
    
    IMPORTANT: First, explicitly name the 3 cards drawn at the very top of your response in this format:
    CARDS: [Card 1], [Card 2], [Card 3]

    Then, provide a deep analysis that heavily incorporates the traits and celestial nature of their star sign (${ctx.starSign}).
    
    Structure the response as:
    1. The Past ([Card 1]): [Deep Interpretation]
    2. The Present ([Card 2]): [Deep Interpretation]
    3. The Future ([Card 3]): [Deep Interpretation]
    4. A final uplifting message tailored to their ${ctx.starSign} nature.
  `,
  love: (ctx) => `
    Please provide a deep Love & Relationships reading for ${ctx.name}${ctx.birthDate ? ` (born ${ctx.birthDate})` : ""} (${ctx.starSign}).
    Consider their current mood: ${ctx.mood}.
    Provide insights that reflect the unique romantic challenges and strengths of a ${ctx.starSign}.
    Focus on soul connections, Venus energy, and heartwarming insights.
    
    Structure the response as:
    - Current Heart Energy: [Insights]
    - Soul Connections: [Insights]
    - Guidance for the Path Ahead: [Insights]
  `,
  career: (ctx) => `
    Please provide an in-depth Career & Finances reading for ${ctx.name}${ctx.birthDate ? ` (born ${ctx.birthDate})` : ""} (${ctx.starSign}).
    They are feeling ${ctx.mood} about their path.
    Tailor the advice to the professional archetypes of a ${ctx.starSign}.
    Identify potential talents and a lucky number for manifestation.
    
    Structure the response as:
    - Professional Path & Talents: [Insights]
    - Manifesting Abundance: [Insights]
    - Your Lucky Manifestation Number: [Number]
    - Closing Encouragement.
  `,
  "spirit-animal": (ctx) => `
    Please provide a profound Spirit Animal & Energy reading for ${ctx.name}${ctx.birthDate ? ` (born ${ctx.birthDate})` : ""} (${ctx.starSign}).
    Mood: ${ctx.mood}.
    Connect their ${ctx.starSign} traits to their animal guide.
    Identify a spirit animal guide and interpret their current aura energy.
    
    Structure the response as:
    - Your Spirit Animal Guide: [Animal & Meaning]
    - Aura Energy Analysis: [Interpretation]
    - Integration Message: [How to carry this energy forward]
  `,
};
