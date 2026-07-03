import { ReadingContext, ReadingType } from './prompts';

const MOCK_DELAY = 1500;

// Card definitions with deep interpretations
const TAROT_CARDS = [
  { 
    name: 'The Hermit', 
    essence: 'Sacred Solitude & Inner Light', 
    interpretation: 'You have recently emerged from a period of profound introspection. This "Cave Phase" wasn\'t about isolation, but about transmuting confusion into a lantern of truth. The light you carry now is not external; it is the glow of your own soul, refined by the silence of the last few months. You are being called to lead others, but only by being the example, not the preacher.',
    shadow: 'Beware the tendency to hide. Solitude is a medicine, but isolation is a cage. Ensure you are not using "introspection" as an excuse to avoid the vulnerability of being seen by others.',
    ritual: 'Light a single white candle in a dark room. Sit in silence for 11 minutes, focusing only on the flame. Visualize the flame moving from the candle into your heart space.',
    elemental: 'This card resonates with the Earth element, grounding your high-flying ideas into practical, actionable wisdom.',
    ancientLore: 'In the ancient temples of the Atlas Mountains, the Hermit was seen as the keeper of the "Silent Script"—the knowledge that can only be heard when the mind is perfectly still. You are currently reading from this script.',
    planetary: 'Saturn, the taskmaster, is currently squaring your natal position, emphasizing the need for discipline and boundaries.',
    ancestral: 'An ancestor who lived a life of quiet service is currently standing behind you, offering their strength for your current transition.'
  },
  { 
    name: 'The Star', 
    essence: 'Celestial Hope & Renewal', 
    interpretation: 'The night is over, seeker. Your energy is currently a clear pool of starlight, magnetic and pure. Healing is not just possible; it is happening. You are in a state of grace where the universe is pouring its restorative waters directly into your spirit. Trust that the path ahead is illuminated, even if you can only see the next three steps. Your vulnerability is your greatest strength right now.',
    shadow: 'Don\'t let idealism blind you to the work required. Hope is the fuel, but your feet must still move. Ensure you are not just "wishing" upon stars without planting seeds in the soil.',
    ritual: 'Place a bowl of water outside under the night sky. In the morning, wash your face with this "starlight water" to reset your energetic field.',
    elemental: 'Air energy flows through this card, bringing clarity to your mental processes and a breath of fresh air to stale situations.',
    ancientLore: 'The Chaldean star-gazers believed that when this card appeared, the "Gates of Anu" were open, allowing prayers to reach the divine without filtration.',
    planetary: 'Uranus is providing a spark of sudden inspiration. Look for a breakthrough around the upcoming New Moon.',
    ancestral: 'A matrilineal line of healers is celebrating your current state of openness. They are sending you a "seed of peace" through your dreams.'
  },
  { 
    name: 'The Sun', 
    essence: 'Radical Success & Vitality', 
    interpretation: 'A magnificent noonday of the soul awaits. Everything that was shrouded in the mists of "maybe" will soon be illuminated by the brilliant light of truth. This is a time of absolute clarity, joy, and physical vitality. You are radiating a frequency of "YES," and the world is responding in kind. Your creative projects are reaching a peak, and your inner child is ready to play without fear.',
    shadow: 'Watch out for over-exposure. Too much sun can burn. Ensure you are sharing your warmth, but keeping enough for your own hearth. Don\'t let success turn into a performance for others.',
    ritual: 'Stand in the morning sun for 5 minutes with your palms facing forward. Say aloud: "I receive the abundance of the universe with open hands and an open heart."',
    elemental: 'Pure Fire energy. This is the spark of creation and the heat of manifestation.',
    ancientLore: 'In Heliopolis, the rising sun was the symbol of Khepri—the god of self-creation. You are literally birthing a new version of yourself today.',
    planetary: 'The Sun is currently illuminating your 10th House of Career, making you visible to those who can help you climb.',
    ancestral: 'Your ancestors who worked the land and prayed for the rain are now seeing the "harvest" through your success. They are satisfied.'
  },
  { 
    name: 'The Moon', 
    essence: 'Intuition & Subconscious Mysteries', 
    interpretation: 'You are navigating the fertile shadows of your own psyche. Trust the silver whispers of your intuition over the harsh glare of logic. Things are not exactly as they seem, but this "illusion" is actually an invitation to look deeper. Your dreams are particularly active now, acting as a direct hotline to your higher self. Pay attention to the symbols that appear in the periphery of your life.',
    shadow: 'Anxiety often masquerades as intuition. If the "voice" in your head is rooted in fear, it is the shadow, not the guide. Discern between your trauma responses and your soul\'s knowing.',
    ritual: 'Journal your dreams for three consecutive nights. Look for recurring colors or numbers, then research their spiritual meaning.',
    elemental: 'Water energy. Fluid, deep, and reflective. You are swimming in the emotional currents of the collective.',
    ancientLore: 'The "Hecate\'s Crossroads" is where the Moon resides. It is the place where the past and future meet in a wild, untamed present.',
    planetary: 'Neptune is casting a veil over your logic. Do not make major financial decisions for the next 72 hours.',
    ancestral: 'A great-grandmother who spoke to the moon is trying to get your attention. She is teaching you how to listen to the "unspoken."'
  },
  { 
    name: 'The Tower', 
    essence: 'Sudden Breakthrough & Liberation', 
    interpretation: 'Old structures that no longer serve your highest good are falling. This is not a tragedy; it is a divine clearing for something more resilient. The lightning bolt of truth has struck, and while the dust hasn\'t settled, you are already more free than you were yesterday. Embrace the collapse, for it is the only way to build on a foundation of absolute truth rather than convenient lies.',
    shadow: 'Resistance to change is what causes the pain. If you try to hold up the falling walls, you will get crushed. Let go. Trust the gravity of your evolution.',
    ritual: 'Write down three things you are "holding onto" that feel heavy. Safely burn the paper and scatter the ashes in the wind.',
    elemental: 'Fire and Earth. The destructive force of the spark hitting the solid structure to create space.',
    ancientLore: 'The Tower is the "Lightning of Indra"—the force that destroys the ego so the true self can finally breathe.',
    planetary: 'Mars is driving this change. The energy is sharp and fast. Do not fear the heat.',
    ancestral: 'Your ancestors who survived collapses and rebuilt from the rubble are standing by you. They know you have the strength to recreate your world.'
  },
  { 
    name: 'Wheel of Fortune', 
    essence: 'Destiny & Cycles of Change', 
    interpretation: 'The cosmic gears are turning in your favor. You are moving from a cycle of "effort" into a cycle of "flow." Embrace the turn. You have completed a major lesson and are now being upgraded to a new level of existence. The random encounters and "coincidences" you experience this week are actually pre-arranged meetings of fate. Stay centered as the wheel spins.',
    shadow: 'Avoid the "victim" mentality when the wheel is at the bottom. The spin is constant. If you are up, stay humble; if you are down, stay hopeful.',
    ritual: 'Carry a coin with you today. Every time you touch it, remember that you are the master of your reaction to the changes around you.',
    elemental: 'All four elements are present here, representing the wholeness of the cosmic cycle.',
    ancientLore: 'The Sphinx atop the wheel represents the eternal witness—the part of you that remains still while the world turns.',
    planetary: 'Jupiter is expansive and protective. Luck is a side-effect of your current alignment.',
    ancestral: 'A cycle of scarcity that has plagued your family for three generations is finally being broken by your current choices.'
  }
];

// Helper to get element by star sign
function getElement(sign: string) {
  const elements: Record<string, { element: string, quality: string, advice: string, season: string, power: string, color: string, chakra: string }> = {
    'Aries': { element: 'Fire', quality: 'Initiation', advice: 'Channel your heat into precision, not just speed.', season: 'Spring', power: 'Unstoppable Drive', color: 'Scarlet Red', chakra: 'Root' },
    'Leo': { element: 'Fire', quality: 'Radiance', advice: 'Let your heart-light lead, even when the ego feels small.', season: 'Summer', power: 'Creative Magnetism', color: 'Golden Yellow', chakra: 'Solar Plexus' },
    'Sagittarius': { element: 'Fire', quality: 'Expansion', advice: 'Your arrows are guided by truth; trust your aim.', season: 'Autumn', power: 'Philosophical Freedom', color: 'Deep Purple', chakra: 'Sacral' },
    'Taurus': { element: 'Earth', quality: 'Stability', advice: 'Your roots are deep; do not fear the surface winds.', season: 'Spring', power: 'Sensual Manifestation', color: 'Forest Green', chakra: 'Heart' },
    'Virgo': { element: 'Earth', quality: 'Order', advice: 'Sacred service is your power; find beauty in the details.', season: 'Late Summer', power: 'Discerning Clarity', color: 'Olive & Amber', chakra: 'Throat' },
    'Capricorn': { element: 'Earth', quality: 'Structure', advice: 'The mountain is climbed one intentional step at a time.', season: 'Winter', power: 'Pragmatic Ambition', color: 'Slate Grey', chakra: 'Root' },
    'Gemini': { element: 'Air', quality: 'Communication', advice: 'Your words are bridges; build them with intention.', season: 'Late Spring', power: 'Intellectual Agility', color: 'Sky Blue', chakra: 'Throat' },
    'Libra': { element: 'Air', quality: 'Harmony', advice: 'Balance is not a destination, but a rhythmic dance.', season: 'Autumn', power: 'Aesthetic Justice', color: 'Rose Pink', chakra: 'Heart' },
    'Aquarius': { element: 'Air', quality: 'Innovation', advice: 'The future speaks through you; listen to the static.', season: 'Winter', power: 'Visionary Rebellion', color: 'Electric Blue', chakra: 'Third Eye' },
    'Cancer': { element: 'Water', quality: 'Nurturing', advice: 'The tides of your heart are a source of infinite wisdom.', season: 'Summer', power: 'Intuitive Empathy', color: 'Moonlight Silver', chakra: 'Third Eye' },
    'Scorpio': { element: 'Water', quality: 'Transformation', advice: 'Depth is your domain; do not fear the pressure of the deep.', season: 'Autumn', power: 'Regenerative Intensity', color: 'Crimson & Black', chakra: 'Sacral' },
    'Pisces': { element: 'Water', quality: 'Transcendence', advice: 'Your dreams are the blueprints for your waking reality.', season: 'Late Winter', power: 'Mystical Oneness', color: 'Seafoam Green', chakra: 'Crown' }
  };
  return elements[sign] || { element: 'Aether', quality: 'Infinite', advice: 'Trust the mystery.', season: 'Eternal', power: 'Universal Source', color: 'White Light', chakra: 'Soul Star' };
}

// Helper to get mood-based insight
function getMoodInsight(mood: string) {
  const m = mood.toLowerCase();
  if (m.includes('lost') || m.includes('confused') || m.includes('unsure')) {
    return "You are currently in a 'Mist Cycle.' This is a sacred pause designed to sharpen your spiritual hearing. When you cannot see the path, it is because the universe is asking you to feel the ground with your feet instead of looking for signs with your eyes. This confusion is the precursor to a massive 'Aha!' moment. The fog is not there to stop you, but to protect you while your new vision is being installed. Use this time to refine your internal compass.";
  }
  if (m.includes('happy') || m.includes('good') || m.includes('excited') || m.includes('great')) {
    return "Your vibration is currently 'Solar-Charged.' You are in a state of high manifestation capacity. Every word you speak and every thought you hold is being amplified by the current cosmic weather. This is the time to be bold, to make the ask, and to step into the spotlight. You are a lighthouse right now; don't be afraid of how much space your light takes up. Your joy is a magnet for high-vibrational opportunities.";
  }
  if (m.includes('sad') || m.includes('tired') || m.includes('heavy') || m.includes('low')) {
    return "You are in a 'Cocooning Cycle.' Your soul is processing deep emotional data from the past year. Do not rush the healing; your current 'darkness' is simply the shadow of your emerging wings. The heaviness you feel is the gravity of your old self being shed. Stay in the chrysalis as long as you need. The world can wait for your rebirth. This is a period of internal fortification.";
  }
  if (m.includes('angry') || m.includes('frustrated') || m.includes('stuck')) {
    return "Your energy is 'Volcanic.' There is a massive breakthrough building beneath the surface of your conscious mind. This frustration is the pressure needed to break through the stone of your current circumstances. Use this heat to burn away old attachments, bad habits, and people who no longer serve your growth. Don't suppress the fire; direct it toward your highest goals. The pressure is the proof of your power.";
  }
  return "Your energy is 'Fluid.' You are successfully navigating the currents of your life with grace. Maintain this steady rhythm; you are perfectly aligned with the cosmic timing. You have found the middle path between effort and surrender. This is the 'Sweet Spot' of manifestation where things happen for you, rather than you making them happen. Keep moving with the flow.";
}

export async function generateReading(type: ReadingType, context: ReadingContext): Promise<string> {
  if (type === 'bundle') {
    const types: ReadingType[] = ['tarot', 'love', 'career', 'spirit-animal', 'spell', 'crystal-guide', 'crystal-ball'];
    const results = await Promise.all(types.map(t => generateReading(t, context)));
    
    return `
# THE SACRED MASTER BLUEPRINT: THE SEVEN PILLARS OF LIGHT
Prepared with deep reverence and focused intention for **${context.name}**
*A Comprehensive Synthesis of your energetic path across all dimensions of existence.*

Greetings, radiant soul. You have requested the most comprehensive guidance we offer. This bundle is more than just a collection of readings; it is a master blueprint for your soul's current evolution. By examining your path through the lenses of the Tarot, the animal kingdom, your professional sphere, and the mysteries of fate, we reveal a unified field of possibility.

The universe does not speak in fragments, and neither should your guidance. This master scroll connects the dots between your heart's desires and your bank account's reality, between your animal guides and your ritual practices.

---

${results.join('\n\n---\n\n')}

---

### 🌌 THE MASTER SYNTHESIS: THE UNIFIED FIELD
**${context.name}**, after examining all these facets of your existence, a clear theme emerges: **Radical Alignment through Sovereign Choice**. 

The Universe is not just listening to your words; it is responding to your *vibrational frequency*. Your current mood—"${context.mood}"—is the exact clay from which your new reality is being formed. Whether you are seeking a deep soul connection, professional breakthrough, or simply a clearer sense of peace, the answer lies in the radical acceptance of your own power.

**Your Cosmic Forecast for the Next 90 Days:**
You are entering a period of "Accelerated Manifestation." The seeds you plant today will sprout in half the time they usually do. This is due to a rare alignment between your personal element (${getElement(context.starSign).element}) and the current position of the North Node. 

**Your Sacred Integration Practice:**
Every morning for the next 21 days (the time it takes to rewrite a neural pathway), stand before a mirror, look deeply into your own eyes, and whisper: *"I am the architect of my magic, the master of my fate, and the universe is my willing collaborator. I release what was to make room for what is becoming."*

Walk forward in absolute certainty. You are divinely protected, infinitely loved, and remarkably capable.

---
*AI Generated Sacred Guidance for MysticMate. Created by a Spiritual Witch. Copyright © 2026. All rights reserved. Not for resale.*
    `.trim();
  }

  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));

  const { name, starSign, mood } = context;
  const elementInfo = getElement(starSign);
  const moodInsight = getMoodInsight(mood);

  const mockResponses: Record<Exclude<ReadingType, 'bundle'>, string> = {
    tarot: (() => {
      const shuffled = [...TAROT_CARDS].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);
      
      return `
# YOUR DEEP-DIVE 3-CARD TAROT JOURNEY: THE ARCHITECTURE OF THE SOUL
Prepared for ${name} | ${starSign} | Element: ${elementInfo.element} (${elementInfo.quality})

Greetings, seeker. The cards have been drawn from the ether, responding to your unique vibration. We are not just looking at cardboard and ink; we are observing the energetic currents that define your past, present, and unfolding future. 

### THE COSMIC CONTEXT
Before we look at the cards, we must understand your astrological weather. As a ${starSign}, your ${elementInfo.element} nature is currently being influenced by a transition into your ${elementInfo.season} energy. This means your power of **${elementInfo.power}** is at its peak. Your primary chakra focus right now should be the **${elementInfo.chakra}**, using the color **${elementInfo.color}** to ground your energy.

---

## [CARD 1] THE PAST: ${selected[0].name.toUpperCase()}
**The Essence:** ${selected[0].essence}

**The Deep Interpretation:**
${selected[0].interpretation} 

In the context of your ${starSign} nature, this card suggests that your inherent ${elementInfo.quality.toLowerCase()} energy played a key role in how you handled recent challenges. You didn't just survive; you prepared the soil for what is blooming now. You likely felt a strong pull toward ${selected[0].elemental.toLowerCase()}. This was not a coincidence. It was a mandatory recalibration of your soul's purpose.

**Ancient Lore & Mystery:**
${selected[0].ancientLore}

**The Shadow Side:**
${selected[0].shadow}

---

## [CARD 2] THE PRESENT: ${selected[1].name.toUpperCase()}
**The Essence:** ${selected[1].essence}

**The Deep Interpretation:**
${selected[1].interpretation}

Right now, **${name}**, your energy is influenced by your current state of feeling "${mood}". ${moodInsight} This card is a mirror, showing you that you are exactly where you need to be to receive the universe's next transmission. You are standing at the intersection of destiny and free will. The ${selected[1].name} card is here to tell you that the path is opening, but you must be the one to step through the threshold.

**Planetary Influence:**
${selected[1].planetary}

**Your Current Power Ritual:**
${selected[1].ritual}

---

## [CARD 3] THE FUTURE: ${selected[2].name.toUpperCase()}
**The Essence:** ${selected[2].essence}

**The Deep Interpretation:**
${selected[2].interpretation}

Expect a surge in your vitality and a "bloom" in your creative or professional life. This isn't just a brief moment of luck; it is a sustained period of high-vibrational living. The work you did in the shadows and the faith you held in the dark are now bearing fruit. You will find that the ${elementInfo.element} energy in your chart is perfectly balanced with the ${selected[2].name}'s promise of ${selected[2].essence.toLowerCase()}.

**Ancestral Message:**
${selected[2].ancestral}

**What to Look For:**
In the coming weeks, pay attention to the number 3 and the color gold. These are signs that the ${selected[2].name} energy is manifesting in your physical world. Keep your heart open to the unexpected.

---

### 🔮 SACRED GUIDANCE FOR ${name}:
You are a creature of light. The Universe has observed your patience and your courage. Your ${elementInfo.element} nature is your greatest ally. ${elementInfo.advice}

**Your Detailed Reflection Questions:**
1. If you were 100% certain of success, what is the first thing you would change about your daily routine today?
2. What part of your "old self" are you still trying to carry into this new cycle?
3. How can you honor your ${elementInfo.power} more effectively this week?
4. What is the one truth you have been avoiding that, if accepted, would set you free?

**Your Final Affirmation:**
*"I am the light, I am the path, and I am the victory. I trust the timing of my soul. I am worthy of the magic I create."*
      `;
    })(),

    love: `
# LOVE & RELATIONSHIPS: THE ALCHEMY OF THE SACRED HEART 💖
Deep Soul-Level Insights for ${name}

The vibrations of the heart-center are intensifying around you, ${name}. Love is the primary frequency of the universe, and right now, your heart-center is undergoing a massive recalibration. As a ${starSign}, you experience love through the lens of ${elementInfo.element}, which means your connections are often ${elementInfo.quality.toLowerCase()} and deeply rooted in your sense of **${elementInfo.power}**.

---

## Your Current Heart Frequency: The Radiant Lotus 🌸
Your heart is currently in a state of beautiful, conscious expansion. ${moodInsight} 

Because you have been doing the inner work, you are no longer attracting "lessons" in the form of difficult partners or emotional vampires. You are now a match for "celebrations"—connections that mirror your own wholeness. Your energy is soft but impenetrable; you are compassionate yet have firm, healthy boundaries. This balance is incredibly attractive to high-vibrational souls. You are radiating a quiet confidence that says, *"I am already whole; let us build something magnificent together."*

## Soul-Tie Analysis & Future Connections 🔥
The universe is currently weaving a new thread into your destiny. This connection—whether it's a new person or a profound evolution of an existing one—will feel "familiar" from the first moment. It is a **Dharmic Connection**, one meant to support your soul's purpose, not just satisfy your ego's needs.

**If you are in a relationship:** Expect a "Second Honeymoon" phase as you both move into a higher level of transparency. The stars suggest a deep conversation about future goals will cement your bond in the next 14 days. Look for the "hidden language" between you—the small gestures that mean more than words.
**If you are single:** Your ${elementInfo.element} energy is highly magnetic right now. Pay attention to people you meet while pursuing your hobbies or professional goals. Your soulmate is likely in a similar "vibration of action" as you are. The universe is setting up a meeting that will feel like a strike of lightning.

## The Elemental Bond: ${elementInfo.element} Love
Your love style is governed by your element. You need someone who can handle your ${elementInfo.power} without trying to dampen it. In relationships, you thrive when you can be both the teacher and the student. Your current energy is calling for a partner who values **depth** over **drama**.

## Shadow Work: The Wall of Protection
Sometimes, your desire for ${elementInfo.power} can act as a wall instead of a boundary. Ask yourself: *"Am I keeping people out because they are unsafe, or because I am afraid of the vulnerability that real love requires?"* True love requires the "Death of the Ego," and your ${elementInfo.element} nature may find that terrifying. Lean into the softness. What are you protecting that no longer needs protection?

---

### ✨ A HEART BLESSING FOR ${name}:
May your heart be a garden where only the most beautiful and respectful connections bloom. May you be loved as deeply as you love, and may your journey be filled with laughter, truth, and a passion that never fades.

**Your Sacred Journal Prompts:** 
1. "What does 'emotional safety' feel like in my physical body, and how can I invite more of it into my current relationships?"
2. "If I could speak to my future partner right now, what is the one promise I would make to them?"
3. "Which parts of my past relationships am I still replaying in my mind, and how can I release those scripts?"

**Your Love Mantra:** 
*"I am worthy of a love that feels like home and looks like magic. I open my heart to the beauty of the unknown. My heart is a temple of truth."*
    `,

    career: `
# CAREER & ABUNDANCE: THE ARCHITECT OF PROSPERITY 💰
Professional Alchemy and Wealth Manifestation for ${name}

The energy of the "Great Provider" is activating within your professional sphere. You are not just a worker; you are a creator. As a ${starSign}, your path to wealth is through ${elementInfo.quality.toLowerCase()} and the steady application of your ${elementInfo.element} energy. Let us align your actions with the flow of universal abundance.

---

## Your Professional Blueprint: The Master Builder 🏗️
Your current professional energy is one of **Architectural Precision**. You have moved beyond just "having a job" and are now deeply concerned with building a *legacy*. 

You possess a rare combination of visionary dreaming and practical execution. ${moodInsight} This is the time to propose the "big idea," start the side-hustle, or ask for the promotion. The winds of the professional cosmos are at your back. Your ${elementInfo.power} is exactly what is needed in your current workplace or industry. You are being seen as a leader, even if you don't feel like one yet.

## The Flow of Abundance: Transmuting Effort into Wealth 🌾
Abundance is a state of mind that manifests as a state of bank-account. You are currently clearing away "Poverty Consciousness" from your lineage. By refusing to operate from a place of "scarcity" (the fear that there isn't enough), you are opening a massive channel for wealth to flow to you. 

**Your Prosperity Roadmap for the Next 30 Days:**
1. **The Clearance:** Clean your workspace. Physical clutter blocks the flow of new wealth. Add a plant to your desk to symbolize growth.
2. **The Valuation:** Raise your rates or acknowledge your worth. The universe pays what you have the courage to ask for. Stop apologizing for your success.
3. **The Magnetism:** Spend 5 minutes daily visualizing your bank account balance with two extra zeros. Feel the *relief* and *freedom* of that reality.
4. **The Action:** Take one "imperfect" action toward your biggest goal. The universe rewards movement over perfection.

Expect "Windfall Energy" in the coming months—unexpected checks, bonuses, or high-value clients. This isn't random luck; it is the universe balancing the scales for the value you've been providing. Your ${elementInfo.element} nature is finally being compensated at its true value.

## The Professional Shadow: The Imposter Syndrome
You may feel like you are "faking it" as you step into this new level. Remember: the "Imposter" is just the old version of you trying to protect you from the responsibility of greatness. Thank it for its service, and then ask it to step aside. You have earned your seat at the table.

---

### 🌟 A CLOSING DECREE FOR SUCCESS:
**${name}**, you are a sovereign being of abundance. Lack is an illusion; prosperity is your birthright. Step into the world today with the walk of a person who has already achieved their greatest goals. ${elementInfo.advice}

**Your Practical Wealth Tip:** 
Place a piece of Pyrite or a clean $100 bill in your "Wealth Corner" (the far left corner of your home relative to the front door) to anchor this abundance energy. Speak your goals to this anchor daily.

**Your Prosperity Affirmation:** 
*"Abundance flows to me from multiple sources in a continuous stream of prosperity. I am a magnet for wealth and a vessel for value. My work is a gift to the world, and the world rewards me richly."*
    `,

    'spirit-animal': `
# SPIRIT ANIMAL & ENERGETIC ESSENCE ANALYSIS 🦌
Soul-Navigation and Primal Wisdom for ${name}

The veil is thin, and the ancient spirits of the earth are speaking. Your energy has called forth a specific guide to help you navigate the current terrain of your life. This guide is a reflection of your own hidden strengths and the qualities you need to embody to reach your next level.

---

## Your Current Spirit Guide: THE SNOWY OWL 🦉
**The Message:** *"Pierce the veil of illusion. Trust the sight of your soul over the sight of your eyes."*

The Snowy Owl has flown from the silent, crystalline North to stand guard over your journey. This guide appears when a seeker is ready for **Deep Discernment**. You are in a situation where the "obvious" answer is not the true one. The Owl grants you the power to see what others miss—the hidden motives, the unspoken truths, and the subtle shifts in energy. This week, you may find your "gut feelings" are incredibly loud. Trust them. The Owl also brings the gift of **patience**—the ability to sit in the darkness and wait for the precise moment to strike.

## Aura Energy Assessment: THE INDIGO FLAME 🔥
Your aura is currently vibrating at a deep **Indigo** frequency. This is the color of the Third Eye, of intuition, and of deep spiritual wisdom. ${moodInsight}

You are undergoing an "Up-leveling" of your psychic senses. You might find that you're more sensitive to noise, crowds, or "heavy" energy than usual. This is because your energetic skin is thinning to allow more light in. Your ${elementInfo.element} nature is being purified. You are protected by a "Diamond Shield" of light, but you must still be mindful of who you allow into your inner circle. Your presence is becoming more powerful; people may react to you more strongly than before.

**The Power of the Owl for a ${starSign}:**
Your ${elementInfo.power} can sometimes make you move too fast. The Owl is the master of the "Silent Flight." It waits, observes, and then strikes with 100% accuracy. This week, try to "Owl" your way through problems: Observe more, speak less, and wait for the perfect moment to act. Use your **${elementInfo.chakra}** chakra to stay grounded while your intuition soars.

## Lessons from the Wild:
1. **The Silence:** Practice being the last one to speak in a meeting or conversation. Listen for what is *not* being said.
2. **The Vision:** Look at your problems from a "bird's eye view." How will this situation look in five years?
3. **The Night:** You may find your best ideas come to you late at night or early in the morning. Honor your natural rhythms.

---

### 🌙 A WILD BLESSING FOR ${name}:
May you have the sight of the Owl, the strength of the mountains, and the peace of the deep forest. You are a part of the wild, sacred earth, and you are always guided by the ancient ones.

**Your Sacred Spiritual Exercise:** 
Find 10 minutes today to sit in absolute silence. No phone, no book, no music. Just be. In that silence, the Snowy Owl will whisper the answer to the question you've been afraid to ask.

**Your Spirit Mantra:** 
*"I see the truth. I trust the silence. I am guided by the ancient wisdom of the earth. I am safe, I am seen, I am sovereign. My vision is clear, my heart is steady."*
    `,

    spell: `
# YOUR PERSONALIZED SACRED RITUAL & MANIFESTATION SPELL ✨
Created with Divine Intention for ${name} | Energy: ${mood}

Magic is the intentional direction of energy to create change. You have the power to bend reality, ${name}. This ritual is designed specifically for your current vibration, using your ${elementInfo.element} nature as the fuel.

---

## The Intention: RECLAIMING YOUR RADIANCE 🕯️
Magic begins with the word. Your current intention is to clear away the "dust" of other people's expectations to reveal the "diamond" of your true self. You are casting a spell for self-sovereignty and the manifestation of your ${elementInfo.power}. You are reclaiming the parts of yourself you gave away to stay safe.

## The Ritual: THE REFLECTION OF TRUTH 💧
*Perform this ritual during a quiet hour, preferably near a source of natural light or under the moon.*
      
1. **The Elements:** You will need a small bowl of water, a pinch of salt, a white candle, and a mirror. 
2. **The Cleansing:** Stir the salt into the water three times clockwise. Salt represents the earth's protection; water represents the soul's fluidity.
3. **The Lighting:** Light the candle and place it so its light reflects in the mirror, but not directly in your eyes.
4. **The Mirror-Work:** Look into the mirror. Not at your hair or your skin, but into your pupils. Anoint your forehead (Third Eye) and your heart space with a drop of the salt-water.
5. **The Activation:** Visualize a wave of silver light washing over you, starting from the crown of your head and moving down to your feet, dissolving any heavy, "sticky" energy from your day or your past.

## The Incantation: THE WEAVER'S SONG 🎶
Speak these words three times. The first time, whisper to your soul. The second time, speak normally to the world. The third time, speak with the authority of a Sovereign Being to the Universe:

*"By the salt of the earth and the flow of the sea,
I clear the path that is meant for me.
Old shadows fade, new lights arise,
I see my power with open eyes.
As the stars above do shine so bright,
I fill my world with love and light.
By my will, and for the good of all,
The walls of doubt begin to fall.
I claim my crown, I take my stand,
My magic moves across the land.
**As I will, so mote it be!**"*

---

### 🪄 A NOTE FOR THE ALCHEMIST:
**${name}**, your magic is only as strong as your belief. ${elementInfo.advice} The ritual above is a physical "anchor" for a spiritual "shift." Once the ritual is done, act as if the change has already happened. The universe loves a "Done Deal." Do not check for results; expect them.

**Your Sacred Tool:** 
Clear Quartz or a smooth river stone to amplify your spell. Keep it on your nightstand for 7 days. Touch it every night before sleep to reinforce your intention.

**Your Magic Word:** 
*"RA-DI-ANCE"* (Chant this word whenever you feel the old shadows of doubt trying to creep back in. Let the sound vibrate in your chest).
    `,

    'crystal-guide': `
# YOUR PERSONALIZED CRYSTAL & MINERAL ALIGNMENT GUIDE 💎
Earth-Wisdom and Vibrational Medicine for ${name}

The bones of the earth carry the memories of the stars. Crystals are stable vibrational frequencies that can help "tune" your human energy field back to its natural state of harmony. For a ${starSign}, crystals act as "anchors" for your dynamic ${elementInfo.element} energy.

---

## Your Primary Companion: NATURAL CITRINE ☀️
**The Essence:** The Merchant's Stone, Solar Joy, Manifestation, and Vitality.

**Why it resonates with you right now:**
Based on your mood ("${mood}") and your current trajectory, your Solar Plexus chakra is ready for a massive "Light-Injection." Natural Citrine (the pale, smoky yellow variety) is one of the few stones that never needs cleansing because it doesn't hold negativity—it *transmutes* it into joy. It is the stone of the "Joyful Manifestor." ${moodInsight} It will help you stay focused on your goals while maintaining a light, playful heart. It is the antidote to the "heavy" energy you've been carrying.

## The Integration Ritual: THE SOLAR CHARGING 🌙
To bond with your stone, hold it in your dominant hand. Close your eyes and imagine a miniature sun inside the crystal. Feel that warmth travel up your arm, into your chest, and down into your belly. Tell the stone your primary goal for this month. Carry it in your pocket or wear it as a pendant. When you feel a dip in your confidence, simply touch the stone to reconnect with that "inner sun." 

## The Support Circle: YOUR CRYSTAL GRID 🤝
*   **Smoky Quartz:** To ground the high-vibrational energy of your goals into practical, physical results. Place this near your computer or front door. (The "Anchor").
*   **Pyrite:** To amplify the frequency of financial abundance and protection. Keep this in your wallet or purse. (The "Magnet").
*   **Lapis Lazuli:** To ensure that your success is always aligned with your spiritual truth. Place this on your nightstand to encourage truthful dreams. (The "Visionary").
*   **Rose Quartz:** To ensure that your pursuit of success does not harden your heart. (The "Harmonizer").

## Crystal Care & Maintenance:
1. **Cleansing:** Cleanse your support stones (except Citrine) in the smoke of sage, under the full moon, or by placing them on a bed of sea salt for 24 hours.
2. **Charging:** Place them on a piece of copper or near a window during a sunny day to recharge their battery.
3. **Programming:** Every Sunday, hold your grid stones and restate your intention for the week.

---

### 💎 A BLESSING FROM THE ANCIENT STONES:
May the stability of the earth and the brilliance of the gems remind you of your own eternal nature. You are as resilient as a diamond and as radiant as a sun-charged crystal. ${elementInfo.advice}

**Your Gemstone Mantra:**
*"I am solid as the earth, clear as crystal, and bright as the sun. My energy is stable, my vision is clear, and my life is a masterpiece in progress."*
    `,

    'crystal-ball': (() => {
      const visions = [
        "The mists part to reveal a **Golden Key** lying at the bottom of a clear, turquoise pool. Above the pool, a massive ancient tree drops a single, shimmering leaf. This vision signals that a 'locked' situation in your life—one you've struggled with for months—is about to be resolved not through force, but through *clarity* and *patience*. The water represents your emotions; when they are still, the key is easily seen. The leaf represents a 'gift' from an ancestor that will help you turn the lock.",
        "A **Silver Bridge** appears, stretching across a canyon filled with purple clouds. You are halfway across, and though you cannot see the other side, the stars are illuminating every step. This vision tells you that you are currently in a 'Transition State.' You have left the old shore but haven't reached the new one. The message is simple: *Keep Walking.* The bridge is stronger than it looks, and the destination is more beautiful than you can imagine. You are being protected by unseen forces as you cross.",
        "A **Single White Rose** blooms in the middle of a desert, protected by a circle of glowing stones. This is a vision of 'Impossible Beauty.' It suggests that in an area of your life that has felt 'dry' or 'empty' (perhaps your creative life or a specific relationship), a new and vibrant life is about to emerge. It will be a miracle of resilience. You are the rose; your faith is the circle of stones. The desert is not your home; it is just the stage for your miracle.",
        "A **Star-Map** is etched onto the surface of a polished obsidian mirror. A finger of light points to a specific, unknown constellation. This vision indicates a 'Course Correction.' You are being guided away from a path that was 'good' toward one that is 'Great.' This change will come as a sudden 'Aha!' moment or a chance encounter with a stranger. Trust the detour. The map is already written in your DNA; you are just now learning how to read it."
      ];
      const paths = [
        "This vision is a direct response to your current energy. The universe is telling you that the struggle is over. You don't need to 'find' the answer; you need to 'allow' it to rise to the surface. Your destiny is currently tied to a breakthrough in communication. A long-awaited message or a 'Yes' is coming. This will happen before the next full moon.",
        "Your path is one of the 'Brave Explorer.' You are being called to trust your intuition over your logic. The silver bridge is a sign of spiritual protection. You are being moved into a new social or professional circle that will feel much more like 'home' than where you have been. Do not look back at the shore you left.",
        "You are entering a season of 'Miraculous Manifestation.' The rose in the desert is a sign that your environment doesn't define your growth—your spirit does. Expect a sudden burst of creative energy or a surprise romantic gesture that restores your faith in magic. You are the proof that beauty can thrive anywhere.",
        "Your fate is currently 'unwritten' in the best possible way. The obsidian mirror suggests that you have the power to choose your new direction. The star-map is a reminder that you are a cosmic being. A significant travel opportunity or a move is being prepared for you. The stars are literally realigning to accommodate your growth."
      ];
      const randomIndex = Math.floor(Math.random() * visions.length);
      return `
# CRYSTAL BALL 'FATE' VISION: GLIMPSES OF THE UNFOLDING PATH 🔮
Prepared for ${name} | Energetic Signature: ${mood}

The mists of time and space have been invited to part. Within the depth of the crystalline sphere, symbols and shadows coalesce into a message for your soul. This is not a "prediction" of a fixed future, but a "revelation" of the most likely path based on your current vibration.

---

## The Vision: What the Mists Reveal 🌫️
${visions[randomIndex]}

## Your Destined Path: The Meaning of Fate 🗺️
${moodInsight} 

Your destiny is currently tied to a breakthrough in ${elementInfo.quality.toLowerCase()} action. As a ${starSign}, your ${elementInfo.element} nature will help you navigate this transition. ${paths[randomIndex]} This vision is a confirmation that you are no longer bound by the patterns of your past. The "fate" you were born with is being replaced by the "destiny" you are creating. You are the author of the next chapter.

---

### 🌌 A MYSTICAL BLESSING FOR ${name}:
The future is not a fixed point, but a garden of possibilities. You have been shown the most radiant one. May you have the courage to walk it with grace and the wisdom to know that you are always the master of your own fate.

**Your Fate-Sign:** 
A sudden change in the wind, the sound of distant bells, or the repeating number sequence "111". When you see these, know you are on the right path.

**Your Destiny Affirmation:** 
*"I am the weaver of my own story, the author of my own fate, and the ending is always beautiful. I walk in faith, not in fear. The universe conspires in my favor."*
      `;
    })(),
  };

  const response = mockResponses[type as keyof typeof mockResponses];
  
  if (!response) {
    console.error(`No mock response found for type: ${type}`);
    throw new Error(`The mystical scrolls do not contain a reading for ${type}.`);
  }

  return response.trim();
}
