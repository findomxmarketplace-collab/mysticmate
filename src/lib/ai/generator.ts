import { PROMPTS, ReadingContext, ReadingType, SYSTEM_PROMPT, TAROT_CARDS, SPIRIT_ANIMALS } from "./prompts";

const MOCK_DELAY = 2000;

export async function generateReading(type: ReadingType, context: ReadingContext): Promise<string> {
  // Simulate AI generation delay
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));

  // Mock implementation for development
  if (type === "tarot") {
    const cards = [...TAROT_CARDS].sort(() => 0.5 - Math.random()).slice(0, 3);
    return `
CARDS: ${cards.join(", ")}

The stars have aligned for you, ${context.name}. As a ${context.starSign}, your celestial path is currently illuminated by these sacred mirrors.

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

A deep connection has been formed between your ${context.starSign} essence and the spirit realm.

- Your Spirit Animal Guide: The ${animal}. This guide has appeared to mirror your current energy of being ${context.mood}. The ${animal} represents a powerful alignment with your natural ${context.starSign} instincts, offering you the strength to navigate your current transitions with wisdom.
- Aura Energy Analysis: Your aura, influenced by your ${context.starSign} nature, is currently vibrating with a high-frequency light. This suggests that you are entering a phase of profound spiritual reception.
- Integration Message: Carry the spirit of the ${animal} with you. When you feel ${context.mood}, remember the quiet power and steady gaze of your guide.

You are never alone on this path, ${context.name}.
    `.trim();
  }

  // Generic Mock for others
  return `
[Deep MysticMate Reading for ${context.name}]

The celestial bodies have much to reveal for a ${context.starSign} feeling ${context.mood} today.

- Current Energy: Your ${context.starSign} vibration is resonating with a frequency of renewal. The universe acknowledges your current state of being ${context.mood} and offers a gentle shift.
- Insights for the Path: As a ${context.starSign}, you possess a unique ability to harmonize conflicting energies. This week, focus on your inner core.
- Final Guidance: Trust the process, ${context.name}. Your journey is written in the stars, but your heart holds the pen.

Stay blessed and walk in light.
  `.trim();
}
