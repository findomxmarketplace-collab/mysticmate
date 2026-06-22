"use client";

import { useState } from "react";
import StarsBackground from "@/components/StarsBackground";
import ReadingForm from "@/components/ReadingForm";
import ReadingResult from "@/components/ReadingResult";
import { ReadingType, ReadingContext } from "@/lib/ai/prompts";

export default function Home() {
  const [selectedReading, setSelectedReading] = useState<{
    type: ReadingType;
    title: string;
    price: string;
  } | null>(null);
  const [readingResult, setReadingResult] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const readings: { title: string; description: string; price: string; icon: string; color: string; type: ReadingType }[] = [
    {
      title: "Tarot Card Spread",
      description: "Reveal the hidden paths of your past, present, and future.",
      price: "$1.00",
      icon: "🔮",
      color: "border-purple-500/50 hover:border-purple-500",
      type: "tarot",
    },
    {
      title: "Spirit Animal & Energy",
      description: "Connect with your spiritual guide and understand your aura.",
      price: "$1.00",
      icon: "🦌",
      color: "border-blue-500/50 hover:border-blue-500",
      type: "spirit-animal",
    },
    {
      title: "Love & Relationships",
      description: "Deep insights into your heart's journey and soul connections.",
      price: "$2.00",
      icon: "💖",
      color: "border-pink-500/50 hover:border-pink-500",
      type: "love",
    },
    {
      title: "Career & Finances",
      description: "Navigate your professional path and manifest abundance.",
      price: "$2.00",
      icon: "💰",
      color: "border-gold-500/50 hover:border-gold-500",
      type: "career",
    },
    {
      title: "Personalized Spell",
      description: "A custom AI-crafted white magic ritual for your specific intentions.",
      price: "$4.44",
      icon: "📜",
      color: "border-green-500/50 hover:border-green-500",
      type: "spell",
    },
    {
      title: "Crystal Guide",
      description: "Discover the perfect crystal for your current goals and star sign.",
      price: "$4.44",
      icon: "💎",
      color: "border-cyan-500/50 hover:border-cyan-500",
      type: "crystal",
    },
  ];

  const handlePaymentSuccess = async (context: ReadingContext) => {
    if (!selectedReading) return;
    setIsGenerating(true);
    
    try {
      const response = await fetch("/api/reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: selectedReading.type,
          context,
        }),
      });
      
      const data = await response.json();
      if (data.reading) {
        setReadingResult(data.reading);
      } else {
        alert("The stars are clouded. Please try again in a moment.");
        setSelectedReading(null);
      }
    } catch (error) {
      console.error("Error fetching reading:", error);
      alert("The connection to the cosmos was interrupted.");
      setSelectedReading(null);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center p-4 md:p-8 overflow-x-hidden">
      <StarsBackground />
      
      <div className="absolute top-4 text-[10px] uppercase tracking-widest text-mystic-lavender/40 text-center w-full px-4">
        © MysticMate - Copyright Not For Resale
      </div>

      <main className="flex-1 flex flex-col items-center justify-center max-w-6xl w-full py-12 md:py-16">
        {!readingResult && !isGenerating && (
          <div className="text-center mb-12 md:mb-16 animate-float">
            <h1 className="text-5xl md:text-8xl font-bold mb-4 bg-gradient-to-b from-mystic-gold to-yellow-600 bg-clip-text text-transparent drop-shadow-sm font-cinzel tracking-tighter">
              MysticMate
            </h1>
            <p className="text-lg md:text-2xl text-mystic-lavender/80 tracking-[0.2em] font-light italic uppercase mb-2">
              Sacred Guidance
            </p>
            <p className="text-sm md:text-lg text-mystic-gold/60 font-medium italic tracking-wide max-w-lg mx-auto">
              Created by a spiritual witch for those who love woo woo
            </p>
          </div>
        )}

        {isGenerating && (
          <div className="text-center py-20 animate-pulse">
            <div className="text-6xl mb-8">✨</div>
            <h2 className="text-3xl font-cinzel text-mystic-gold mb-4 uppercase tracking-widest">Consulting the Cosmos</h2>
            <p className="text-mystic-lavender/60 italic text-lg">Your unique guidance is being woven into the celestial tapestry...</p>
          </div>
        )}

        {readingResult && (
          <ReadingResult 
            reading={readingResult} 
            title={selectedReading?.title || "Your Reading"}
            type={selectedReading?.type || "tarot"}
            onReset={() => {
              setReadingResult(null);
              setSelectedReading(null);
            }}
            onUpsell={(type) => {
              setReadingResult(null);
              const upsellReading = readings.find(r => r.type === type);
              if (upsellReading) {
                setSelectedReading({
                  type: upsellReading.type,
                  title: upsellReading.title,
                  price: upsellReading.price
                });
              }
            }}
          />
        )}

        {!readingResult && !isGenerating && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-2">
            {readings.map((reading, index) => (
              <div
                key={index}
                onClick={() => setSelectedReading({ type: reading.type, title: reading.title, price: reading.price })}
                className={`group relative p-8 rounded-3xl border bg-mystic-dark/40 backdrop-blur-md transition-all duration-500 cursor-pointer hover:scale-[1.03] active:scale-[0.98] flex flex-col items-center text-center shadow-xl hover:shadow-mystic-purple/20 ${reading.color}`}
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500 drop-shadow-glow">
                  {reading.icon}
                </div>
                <h3 className="text-xl font-cinzel font-bold mb-3 text-white uppercase tracking-tight">{reading.title}</h3>
                <p className="text-sm text-mystic-lavender/60 mb-8 flex-1 leading-relaxed">
                  {reading.description}
                </p>
                <div className="mt-auto">
                  <div className="px-6 py-2 rounded-full bg-mystic-gold/10 border border-mystic-gold/20">
                    <span className="text-xl font-cinzel font-bold text-mystic-gold tracking-widest">
                      {reading.price}
                    </span>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="w-full max-w-4xl border-t border-white/5 pt-8 pb-12 text-center px-4">
        <div className="text-[9px] md:text-[10px] text-mystic-lavender/20 leading-relaxed uppercase tracking-widest max-w-2xl mx-auto">
          Disclaimer: For entertainment purposes only. MysticMate provides spiritual insights 
          and AI-generated guidance based on celestial archetypes. Our readings should not replace professional 
          legal, medical, or financial advice. All content is G-rated and copyright-protected.
        </div>
      </footer>

      {selectedReading && !isGenerating && !readingResult && (
        <ReadingForm
          readingType={selectedReading.type}
          readingTitle={selectedReading.title}
          price={selectedReading.price}
          onClose={() => setSelectedReading(null)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}
