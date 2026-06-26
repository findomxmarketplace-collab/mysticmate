import { PROMPTS, ReadingContext, ReadingType, SYSTEM_PROMPT } from './prompts';

const MOCK_DELAY = 1500;

export async function generateReading(type: ReadingType, context: ReadingContext): Promise<string> {
  // Handle bundle logic separately
  if (type === 'bundle') {
    const types: ReadingType[] = ['tarot', 'love', 'career', 'spirit-animal', 'spell', 'crystal-guide', 'crystal-ball'];
    const results = await Promise.all(types.map(t => generateReading(t, context)));
    
    return `
      # Your Grand Spiritual Bundle
      Prepared with love for ${context.name}

      ---

      ${results.join('\n\n---\n\n')}

      ---
      
      May this comprehensive guidance illuminate your path and bring peace to your soul.
    `.trim();
  }

  // Simulate AI generation delay
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));

  // In a real implementation, you would call your AI provider here.
  // For now, we provide enhanced mock responses for all types.

  const mockResponses: Record<Exclude<ReadingType, 'bundle'>, string> = {
    tarot: `
      [3-Card Tarot Spread]
      1. The Past (The Hermit): You have recently completed a significant period of inner reflection. This solitude has given you the wisdom needed for your next step.
      2. The Present (The Star): Hope and inspiration are flowing into your life. You are being guided toward your true purpose.
      3. The Future (The Sun): Radiance, success, and joy are on the horizon. A period of great abundance is beginning.
      
      Uplifting Message: Trust the light within you; it is brighter than any shadow you may encounter.
    `,
    love: `
      [Love & Relationships]
      - Current Heart Energy: Your heart is vibrating at a frequency of deep compassion and readiness for connection.
      - Soul Connections: The universe is aligning a meeting with someone whose soul resonates with your own values and dreams.
      - Guidance for the Path Ahead: Open your heart to the unexpected. True love often arrives in a form we didn't initially recognize.
    `,
    career: `
      [Career & Finances]
      - Professional Path & Talents: Your ability to see the 'big picture' is your greatest professional gift right now.
      - Manifesting Abundance: By focusing on gratitude for what you have, you open the gates for greater prosperity to enter.
      - Your Lucky Manifestation Number: ${Math.floor(Math.random() * 99) + 1}
      
      Closing Encouragement: You are a magnet for success. Step forward with confidence.
    `,
    'spirit-animal': `
      [Spirit Animal & Energy]
      - Your Spirit Animal Guide: The Snowy Owl. Representing intuition, the ability to see what others miss, and silent wisdom.
      - Aura Energy Analysis: Your aura is shimmering with a protective gold light, shielding you from negativity and amplifying your inner truth.
      - Integration Message: Spend time in quiet contemplation this week to hear the whispers of your guide.
    `,
    spell: `
      [Your Personalized Spell]
      - Your Personal Intention: "I am a vessel of light, attracting only that which serves my highest good."
      - The Ritual: Place a small bowl of water by your window tonight. In the morning, use the water to touch your forehead and heart, sealing your intention.
      - The Incantation: 
        "Stars above and earth below,
         Bring the blessings that I sow.
         Light within and light without,
         Faith replaces every doubt."
    `,
    'crystal-guide': `
      [Your Personalized Crystal Guide]
      - Your Core Crystal: Amethyst. It will help soothe your mind and enhance your connection to the divine.
      - How to Use Your Crystal: Keep a piece of Amethyst near your bed to promote peaceful dreams and intuitive insights.
      - Companion Stones: Rose Quartz (for self-love) and Citrine (for manifesting joy).
    `,
    'crystal-ball': (() => {
      const visions = [
        "As the mists clear within the crystal ball, I see a golden key resting upon a bed of moss. A door you thought was locked is about to swing wide open.",
        "The crystal reveals a shimmering bridge across a misty valley. You are being called to take a leap of faith into a new, unexplored territory.",
        "I see a single white feather falling slowly through a sunbeam. A message of peace and confirmation is coming from someone you have been thinking of.",
        "Within the sphere, a compass needle spins rapidly before settling on a new direction. Your path is shifting, and it is leading you toward your heart's truest desire."
      ];
      const paths = [
        "This vision indicates that a hidden opportunity in your personal life is ready to be discovered. The 'key' is your own courage.",
        "Your destiny is tied to expansion. Do not fear the unknown, for it is where your greatest growth lies.",
        "You are being watched over and guided. Trust the coincidences and 'signs' you see this week; they are your map.",
        "A major breakthrough in your career or creative life is imminent. Align your actions with your values, and the way will be made clear."
      ];
      const randomIndex = Math.floor(Math.random() * visions.length);
      return `
      [Crystal Ball Vision]
      - The Vision: ${visions[randomIndex]}
      - Your Destined Path: ${paths[randomIndex]}
      
      Mystical Blessing: May the mists always part to show you the beauty of your own destiny.
      `;
    })(),
  };

  const response = mockResponses[type as Exclude<ReadingType, 'bundle'>];
  return (typeof response === 'string' ? response : (response as any)).trim();
}
