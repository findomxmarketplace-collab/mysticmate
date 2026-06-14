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
      description: "Connect with your spiritual guide and understand your current aura.",
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
        alert("Something went wrong with your reading. Please contact support.");
        setSelectedReading(null);
      }
    } catch (error) {
      console.error("Error fetching reading:", error);
      alert("Error generating reading. Please try again.");
      setSelectedReading(null);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center p-8">
      <StarsBackground />
      
      {/* Copyright Notice Top */}
      <div className="absolute top-4 text-[10px] uppercase tracking-widest text-mystic-lavender/40">
        © MysticMate - Copyright Not For Resale
      </div>

      <main className="flex-1 flex flex-col items-center justify-center max-w-6xl w-full py-16">
        {!readingResult && !isGenerating && (
          <div className="text-center mb-16 animate-float">
            <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-b from-mystic-gold to-yellow-600 bg-clip-text text-transparent drop-shadow-sm">
              MysticMate
            </h1>
            <p className="text-xl md:text-2xl text-mystic-lavender/80 tracking-wide font-light italic">
              Uplifting Spiritual Guidance
            </p>
          </div>
        )}

        {isGenerating && (
          <div className="text-center py-20 animate-pulse">
            <div className="text-6xl mb-8">✨</div>
            <h2 className="text-3xl font-cinzel text-mystic-gold mb-4">Consulting the Stars...</h2>
            <p className="text-mystic-lavender/60 italic text-lg">Your personalized reading is being woven into the cosmic tapestry.</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {readings.map((reading, index) => (
              <div
                key={index}
                onClick={() => setSelectedReading({ type: reading.type, title: reading.title, price: reading.price })}
                className={`group relative p-8 rounded-2xl border bg-mystic-purple/20 backdrop-blur-sm transition-all duration-300 cursor-pointer hover:scale-105 flex flex-col items-center text-center ${reading.color}`}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {reading.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{reading.title}</h3>
                <p className="text-sm text-mystic-lavender/60 mb-6 flex-1 leading-relaxed">
                  {reading.description}
                </p>
                <div className="mt-auto">
                  <span className="text-2xl font-cinzel font-bold text-mystic-gold">
                    {reading.price}
                  </span>
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            ))}
          </div>
        )}

        {!readingResult && !isGenerating && (
          <div className="mt-16 text-center max-w-2xl">
            <p className="text-mystic-lavender/40 text-sm leading-relaxed italic">
              "Your journey is written in the stars, but your destiny is in your hands."
            </p>
          </div>
        )}
      </main>

      {/* Footer / Disclaimer */}
      <footer className="w-full max-w-4xl border-t border-white/5 pt-8 pb-12 text-center">
        <p className="text-[10px] text-mystic-lavender/30 uppercase tracking-widest mb-4">
          © MysticMate - Copyright Not For Resale
        </p>
        <div className="text-[10px] text-mystic-lavender/20 leading-loose uppercase tracking-tighter">
          Disclaimer: For entertainment purposes only. MysticMate provides spiritual insights 
          and uplifting guidance. Our readings should not replace professional advice 
          (legal, medical, financial). All content is G-rated and strictly copyright-protected.
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
