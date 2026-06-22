export type ReadingContext = {
  name: string;
  birthDate?: string;
  starSign: string;
  mood: string;
  recentSigns?: string;
  relationshipStatus?: "single" | "partnered";
  careerStatus?: "employed" | "seeking";
  lifeGoals?: string;
};

export type ReadingType = "tarot" | "love" | "career" | "spirit-animal" | "spell" | "crystal";

export const SYSTEM_PROMPT = `You are MysticMate, a compassionate and uplifting spiritual guide. 
Your goal is to provide G-rated, encouraging, and honest readings and spiritual guidance. 
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
    Provide a 3-card Tarot reading for ${ctx.name} (${ctx.starSign}).
    Current Date: ${new Date().toLocaleDateString()}. Moon Influence: Active Cycle.
    Mood: ${ctx.mood}. Signs: ${ctx.recentSigns || "None"}.
    
    IMPORTANT: Name the 3 cards at the top: CARDS: [Card 1], [Card 2], [Card 3]
    Incorporate moon phase and ${ctx.starSign} traits.
  `,
  love: (ctx) => `
    Provide a DEEP Love & Relationships reading for ${ctx.name} (${ctx.starSign}).
    Status: ${ctx.relationshipStatus}. Date: ${new Date().toLocaleDateString()}.
    Mood: ${ctx.mood}.
    
    Incorporate moon phase and romantic strengths of ${ctx.starSign}.
  `,
  career: (ctx) => `
    Provide an in-depth Career reading for ${ctx.name} (${ctx.starSign}).
    Status: ${ctx.careerStatus}. Date: ${new Date().toLocaleDateString()}.
    Mood: ${ctx.mood}.
    
    Incorporate current month energy and ${ctx.starSign} archetypes.
  `,
  "spirit-animal": (ctx) => `
    Provide a Spirit Animal reading for ${ctx.name} (${ctx.starSign}).
    Date: ${new Date().toLocaleDateString()}.
    IMPORTANT: Name animal at top: ANIMAL: [Name]
  `,
  spell: (ctx) => `
    Generate a personalized, uplifting, AI-designed "White Magic" spell for ${ctx.name} (${ctx.starSign}).
    Based on their mood: ${ctx.mood} and the current moon phase (${new Date().toLocaleDateString()}).
    The spell should be based on traditional positive witchcraft but designed for modern spiritual use.
    
    Structure:
    - Spell Name: [A mystical title]
    - Components Needed: [Simple household or natural items]
    - The Ritual: [Steps to perform]
    - The Incantation: [Empowering words to speak]
  `,
  crystal: (ctx) => `
    Suggest a specific Crystal and provide a deep energetic guide for ${ctx.name} (${ctx.starSign}).
    Life Goals: ${ctx.lifeGoals}. Mood: ${ctx.mood}.
    
    IMPORTANT: Name the crystal at top: CRYSTAL: [Name]
    
    Structure:
    - Your Suggested Crystal: [Name & Origins]
    - Energetic Alignment: [How it supports their ${ctx.starSign} nature and goals]
    - Usage Guide: [How to work with this stone]
  `,
};
