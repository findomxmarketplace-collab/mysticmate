export type ReadingContext = {
  name: string;
  birthDate?: string;
  starSign: string;
  mood: string;
  recentSigns?: string;
  relationshipStatus?: "single" | "partnered";
  careerStatus?: "employed" | "seeking";
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

export const SPIRIT_ANIMALS = [
  "Wolf", "Owl", "Bear", "Hawk", "Dragonfly", "Butterfly", "Stag", "Swan", 
  "Fox", "Lion", "Tiger", "Elephant", "Dolphin", "Eagle", "Hummingbird", "Snake"
];

export const PROMPTS: Record<ReadingType, (ctx: ReadingContext) => string> = {
  tarot: (ctx) => `
    Please provide a 3-card Tarot reading for ${ctx.name} (${ctx.starSign}).
    Current Date: ${new Date().toLocaleDateString()}.
    Current Mood: ${ctx.mood}.
    Recent Signs: ${ctx.recentSigns || "None reported"}.
    
    IMPORTANT: First, explicitly name the 3 cards drawn at the very top of your response in this format:
    CARDS: [Card 1], [Card 2], [Card 3]

    Then, provide a deep analysis that incorporates:
    - The current time of the month and moon cycle influence on a ${ctx.starSign}.
    - How their ${ctx.mood} energy interacts with the cards.
    
    Structure the response as:
    1. The Past ([Card 1]): [Interpretation]
    2. The Present ([Card 2]): [Interpretation]
    3. The Future ([Card 3]): [Interpretation]
    4. A final uplifting message tailored to their ${ctx.starSign} path.
  `,
  love: (ctx) => `
    Please provide a DEEP Love & Relationships reading for ${ctx.name} (${ctx.starSign}).
    Relationship Status: ${ctx.relationshipStatus === "partnered" ? "In a relationship" : "Currently single"}.
    Current Date: ${new Date().toLocaleDateString()}.
    Mood: ${ctx.mood}.
    
    Incorporate the current moon phase energy and time of the month into this romantic guidance.
    Provide insights that reflect the specific romantic strengths/challenges of a ${ctx.starSign} who is ${ctx.relationshipStatus}.
    
    Structure the response as:
    - Current Heart Energy: [Deep Insights]
    - Soul Connections & Moon Influence: [How the current time of month affects their ${ctx.starSign} heart]
    - Guidance for the Path Ahead: [Specific advice for a ${ctx.relationshipStatus} person]
  `,
  career: (ctx) => `
    Please provide an in-depth Career & Finances reading for ${ctx.name} (${ctx.starSign}).
    Career Status: ${ctx.careerStatus === "employed" ? "Currently in a career/job" : "Seeking a new path/unemployed"}.
    Current Date: ${new Date().toLocaleDateString()}.
    Mood: ${ctx.mood}.
    
    Tailor the advice to the professional archetypes of a ${ctx.starSign} during this specific time of the month and moon cycle.
    Identify potential talents and a lucky number for manifestation.
    
    Structure the response as:
    - Professional Path & Talents: [Insights]
    - Manifesting Abundance & Career Growth: [Insights for someone who is ${ctx.careerStatus}]
    - Your Lucky Manifestation Number: [Number]
    - Closing Encouragement.
  `,
  "spirit-animal": (ctx) => `
    Please provide a profound Spirit Animal & Energy reading for ${ctx.name} (${ctx.starSign}).
    Current Date: ${new Date().toLocaleDateString()}.
    Mood: ${ctx.mood}.

    IMPORTANT: First, explicitly name the spirit animal guide at the very top of your response in this format:
    ANIMAL: [Animal Name]

    Connect their ${ctx.starSign} traits to their animal guide and the current lunar energy/time of month.
    
    Structure the response as:
    - Your Spirit Animal Guide: [Animal & Detailed Meaning]
    - Aura Energy Analysis: [Interpretation based on their ${ctx.starSign} nature and the current time of month]
    - Integration Message: [How to carry this energy forward]
  `,
};
