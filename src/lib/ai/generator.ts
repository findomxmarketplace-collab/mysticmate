import { PROMPTS, ReadingContext, ReadingType, SYSTEM_PROMPT, TAROT_CARDS, SPIRIT_ANIMALS } from "./prompts";

const MOCK_DELAY = 2000;

export async function generateReading(type: ReadingType, context: ReadingContext): Promise<string> {
  // Simulate AI generation delay
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));

  // Mock implementation for development - Using randomness for variety
  const dateStr = new Date().toLocaleDateString();

  if (type === "tarot") {
    const cards = [...TAROT_CARDS].sort(() => 0.5 - Math.random()).slice(0, 3);
    return `
CARDS: ${cards.join(", ")}

The stars have aligned for you, ${context.name}. As a ${context.starSign}, your celestial path is currently illuminated by these sacred mirrors on this day of ${dateStr}.

1. The Past (${cards[0]}): This card reflects a time when your ${context.starSign} nature was tested. You navigated a period of complexity with the grace inherent to your sign, laying the foundation for your current growth.
2. The Present (${cards[1]}): Right now, the universe is asking you to lean into your ${context.starSign} strengths. You are feeling ${context.mood}, and this card suggests that your intuition is your most valuable guide in this moment.
3. The Future (${cards[2]}): Looking ahead, a transformation is brewing. For a ${context.starSign}, this will manifest as a breakthrough in your personal clarity before the next lunar cycle.

Your ${context.starSign} heart is a vessel of light. Continue to trust the signs you see around you, ${context.name}. The universe whispers that your path is secure.
    `.trim();
  }

  if (type === "spirit-animal") {
    const animal = SPIRIT_ANIMALS[Math.floor(Math.random() * SPIRIT_ANIMALS.length)];
    return `
ANIMAL: ${animal}

A deep connection has been formed between your ${context.starSign} essence and the spirit realm on ${dateStr}.

- Your Spirit Animal Guide: The ${animal}. This guide has appeared to mirror your current energy of being ${context.mood}. The ${animal} represents a powerful alignment with your natural ${context.starSign} instincts.
- Aura Energy Analysis: Your aura, influenced by your ${context.starSign} nature and the current moon cycle, is currently vibrating with a high-frequency light.
- Integration Message: Carry the spirit of the ${animal} with you. When you feel ${context.mood}, remember the quiet power and steady gaze of your guide.
    `.trim();
  }

  if (type === "spell") {
    const spellTitles = ["Radiant Heart Ritual", "Luminous Abundance Call", "Stellar Path Clearance", "Lunar Peace Weaving"];
    const title = spellTitles[Math.floor(Math.random() * spellTitles.length)];
    return `
[Sacred MysticMate Spell for ${context.name}]

- Spell Name: ${title}
- Components Needed: A small bowl of fresh water, a white candle, and a piece of paper.
- The Ritual: Light the candle at dusk. Place the water bowl before it. Write your current intention (addressing your ${context.mood} energy) on the paper. Fold it three times toward you. 
- The Incantation: "By the light of the ${context.starSign} stars and the grace of the moon, I call forth clarity and peace into my heart. My path is clear, my soul is bright. So mote it be."

This spell is uniquely attuned to your ${context.starSign} nature for ${dateStr}.
    `.trim();
  }

  if (type === "crystal") {
    const crystals = ["Rose Quartz", "Amethyst", "Citrine", "Clear Quartz", "Lapis Lazuli", "Black Tourmaline"];
    const crystal = crystals[Math.floor(Math.random() * crystals.length)];
    return `
CRYSTAL: ${crystal}

Your energetic signature on ${dateStr} draws the resonance of ${crystal}.

- Your Suggested Crystal: ${crystal}. A stone of profound vibrational power.
- Energetic Alignment: For a ${context.starSign} focusing on ${context.lifeGoals || "general growth"}, ${crystal} acts as a stabilizer. It transmutes your ${context.mood} energy into a focused power source.
- Usage Guide: Keep this stone near your bedside or carry it in your pocket. Cleanse it under the light of the next full moon to maintain its alignment with your ${context.starSign} traits.
    `.trim();
  }

  // Generic Mock for others (Love/Career)
  return `
[Deep MysticMate Reading for ${context.name}]

The celestial bodies have much to reveal for a ${context.starSign} feeling ${context.mood} today, ${dateStr}.

- Heart & Soul Insights: Your ${context.starSign} vibration is resonating with a frequency of renewal. The universe acknowledges your current state of being ${context.mood} and offers a gentle shift.
- Insights for the Path: As a ${context.starSign}, you possess a unique ability to harmonize conflicting energies. This week, focus on your inner core.
- Final Guidance: Trust the process, ${context.name}. Your journey is written in the stars, but your heart holds the pen.

Stay blessed and walk in light.
  `.trim();
}
