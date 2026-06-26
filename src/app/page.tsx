"use client";

import { useState, useEffect } from "react";
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
  const [purchaseCount, setPurchaseCount] = useState(14231);

  useEffect(() => {
    // Simulate live updates to the purchase counter
    const interval = setInterval(() => {
      setPurchaseCount(prev => prev + Math.floor(Math.random() * 3));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

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
    {
      title: "Crystal Ball Vision",
      description: "Gaze into the future and discover your destined path.",
      price: "$2.99",
      icon: "🔮",
      color: "border-cyan-500/50 hover:border-cyan-500",
      type: "crystal-ball",
    },
    {
      title: "Personalized Spells",
      description: "Bespoke AI-generated spells and rituals for your intentions.",
      price: "$4.44",
      icon: "✨",
      color: "border-indigo-500/50 hover:border-indigo-500",
      type: "spell",
    },
    {
      title: "Crystal Guide",
      description: "Find the perfect stones to support your energetic journey.",
      price: "$4.44",
      icon: "💎",
      color: "border-emerald-500/50 hover:border-emerald-500",
      type: "crystal-guide",
    },
    {
      title: "Spiritual Bundle",
      description: "One of everything! The ultimate mystical experience.",
      price: "$9.99",
      icon: "🌟",
      color: "border-orange-500/50 hover:border-orange-500",
      type: "bundle",
    },
  ];

  const handlePaymentSuccess = async (context: ReadingContext, upgradedType?: ReadingType, upgradedTitle?: string) => {
    if (!selectedReading) return;
    
    const finalType = upgradedType || selectedReading.type;
    const finalTitle = upgradedTitle || selectedReading.title;

    if (upgradedType) {
      setSelectedReading({
        type: upgradedType,
        title: upgradedTitle || selectedReading.title,
        price: "$9.99"
      });
    }

    setIsGenerating(true);
    setReadingResult(null); 
    try {
      const response = await fetch("/api/reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: finalType,
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

  const handleUpsell = (type: ReadingType, title: string) => {
    const reading = readings.find(r => r.type === type);
    if (reading) {
      setReadingResult(null);
      setSelectedReading({ type: reading.type, title: reading.title, price: reading.price });
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
            <div className="mt-4 text-sm font-bold text-mystic-gold uppercase tracking-widest">
              <strong>AI Generated</strong>
            </div>
          </div>
        )}

        {isGenerating && (
          <div className="flex flex-col items-center justify-center space-y-8 animate-pulse">
            <div className="text-6xl animate-spin-slow">🔮</div>
            <div className="text-center">
              <h2 className="text-2xl font-cinzel text-mystic-gold mb-2">Consulting the Universe...</h2>
              <p className="text-mystic-lavender/60 italic">Your personal reading is being written in the stars.</p>
            </div>
          </div>
        )}

        {readingResult && (
          <ReadingResult 
            reading={readingResult} 
            title={selectedReading?.title || 'Mystic Reading'}
            type={selectedReading?.type || 'tarot'}
            onReset={() => {
              setReadingResult(null);
              setSelectedReading(null);
            }} 
            onUpsell={handleUpsell}
          />
        )}

        {!readingResult && !isGenerating && (
          <>
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

            <div className="mt-12 text-center">
              <p className="text-mystic-lavender/80 font-cinzel text-lg mb-2">
                Long for some real human connection?
              </p>
              <div className="flex justify-center gap-4">
                <a href="#" className="text-mystic-gold hover:text-white transition-colors text-sm underline">
                  Personal One-on-One Readings
                </a>
                <a href="#" className="text-mystic-gold hover:text-white transition-colors text-sm underline">
                  Join Our Spiritual Community
                </a>
              </div>
            </div>

            <div className="mt-20 w-full max-w-4xl">
              <h2 className="text-3xl font-cinzel text-center text-mystic-gold mb-12">Frequently Asked Questions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h3 className="font-bold text-white mb-2">Are readings refundable?</h3>
                  <p className="text-sm text-mystic-lavender/60">As these are digital spiritual products generated instantly, all sales are final and non-refundable.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h3 className="font-bold text-white mb-2">How long does it take?</h3>
                  <p className="text-sm text-mystic-lavender/60">Your reading is generated in real-time and will be ready in just a few seconds.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h3 className="font-bold text-white mb-2">One-time or Ongoing?</h3>
                  <p className="text-sm text-mystic-lavender/60">Each purchase is for a single, unique reading. There are no recurring subscriptions.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h3 className="font-bold text-white mb-2">Is my data private?</h3>
                  <p className="text-sm text-mystic-lavender/60">We do not create accounts or store your personal details beyond the generation of your reading.</p>
                </div>
              </div>
            </div>

            <div className="mt-16 p-8 bg-mystic-gold/10 rounded-2xl border border-mystic-gold/20 text-center max-w-2xl w-full">
              <h3 className="text-xl font-bold text-mystic-gold mb-2">Share the Magic</h3>
              <p className="text-sm text-mystic-lavender/80 mb-6">Love your reading? Share MysticMate with your friends and get your next reading free!</p>
              <div className="flex justify-center gap-4">
                <button className="px-6 py-2 bg-[#1877F2] text-white rounded-full text-sm font-bold hover:opacity-90 transition-opacity">Facebook</button>
                <button className="px-6 py-2 bg-[#1DA1F2] text-white rounded-full text-sm font-bold hover:opacity-90 transition-opacity">Twitter</button>
                <button className="px-6 py-2 bg-[#E4405F] text-white rounded-full text-sm font-bold hover:opacity-90 transition-opacity">Instagram</button>
              </div>
            </div>

            <div className="mt-16 text-center">
              <p className="text-mystic-gold font-cinzel text-xl mb-1 animate-pulse">
                {purchaseCount.toLocaleString()} readings provided
              </p>
              <p className="text-mystic-lavender/40 text-xs uppercase tracking-widest">
                Trusted by seekers worldwide
              </p>
            </div>

            <div className="mt-12 text-center max-w-2xl">
              <p className="text-mystic-lavender/40 text-sm leading-relaxed italic">
              "Your journey is written in the stars, but your destiny is in your hands."
              </p>
            </div>
          </>
        )}
      </main>

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
