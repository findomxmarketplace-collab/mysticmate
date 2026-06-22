"use client";

import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ReadingType } from "@/lib/ai/prompts";

interface ReadingResultProps {
  reading: string;
  title: string;
  type: ReadingType;
  onReset: () => void;
  onUpsell: (type: ReadingType) => void;
}

export default function ReadingResult({ reading, title, type, onReset, onUpsell }: ReadingResultProps) {
  const resultRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Parsing logic
  const cardsLine = reading.split("\n").find(l => l.startsWith("CARDS:"));
  const cards = cardsLine ? cardsLine.replace("CARDS:", "").split(",").map(c => c.trim()) : [];
  
  const animalLine = reading.split("\n").find(l => l.startsWith("ANIMAL:"));
  const animal = animalLine ? animalLine.replace("ANIMAL:", "").trim() : null;

  const cleanReading = reading.split("\n")
    .filter(l => !l.startsWith("CARDS:") && !l.startsWith("ANIMAL:"))
    .join("\n")
    .trim();

  const downloadPDF = async () => {
    if (!resultRef.current) return;
    setIsDownloading(true);

    try {
      // 1. Prepare element for capture (ensure no overflow, solid background)
      const element = resultRef.current;
      
      // 2. Use html2canvas with specific settings for Vercel/Production environments
      const canvas = await html2canvas(element, {
        backgroundColor: "#0f051d",
        scale: 1.5, // Reduced from 2 to prevent memory issues
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: element.offsetWidth,
        height: element.offsetHeight,
        onclone: (clonedDoc) => {
          const el = clonedDoc.querySelector("[data-capture-container]") as HTMLElement;
          if (el) {
            el.style.transform = "none";
            el.style.animation = "none";
            el.style.margin = "0";
            el.style.padding = "40px"; // Add consistent padding for PDF
          }
        }
      });

      // 3. Convert to Image
      const imgData = canvas.toDataURL("image/jpeg", 0.9);
      
      // 4. Create PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "JPEG", 0, 0, canvas.width, canvas.height);
      
      // 5. Trigger download
      const fileName = `MysticMate-${title.replace(/\s+/g, "-")}.pdf`;
      pdf.save(fileName);
      
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("PDF generation failed. Please try on a desktop browser if you are on mobile.");
    } finally {
      setIsDownloading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`My MysticMate Reading: ${title}\n\n${cleanReading}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getUpsellRecommendation = () => {
    const recommendations: Record<ReadingType, { type: ReadingType; title: string }> = {
      tarot: { type: "spirit-animal", title: "Spirit Animal & Energy" },
      "spirit-animal": { type: "tarot", title: "Tarot Card Spread" },
      love: { type: "career", title: "Career & Finances" },
      career: { type: "love", title: "Love & Relationships" },
    };
    return recommendations[type];
  };

  const upsell = getUpsellRecommendation();

  return (
    <div className="w-full max-w-2xl space-y-8">
      <div className="animate-in fade-in zoom-in duration-700">
        <div 
          ref={resultRef}
          data-capture-container
          className="bg-mystic-dark border border-mystic-gold/20 rounded-3xl p-10 shadow-2xl shadow-mystic-purple/20"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-8 border-b border-mystic-gold/10 pb-6">
            <div>
              <h1 className="text-2xl font-cinzel font-bold text-mystic-gold tracking-widest uppercase">MysticMate</h1>
              <p className="text-[10px] text-mystic-lavender/40 uppercase tracking-widest">Sacred Insights</p>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-cinzel text-white">{title}</h2>
              <p className="text-[10px] text-mystic-lavender/40 italic">{new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* Visual Tarot Cards */}
          {type === "tarot" && cards.length > 0 && (
            <div className="mb-10 flex justify-center gap-4">
              {cards.map((card, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="w-24 h-40 rounded-lg border-2 border-mystic-gold/30 bg-mystic-purple/20 flex flex-col items-center justify-center p-2 text-center shadow-inner relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-mystic-gold/5 to-transparent"></div>
                    <span className="text-[9px] text-mystic-gold/60 font-cinzel mb-1 uppercase">
                      {idx === 0 ? "Past" : idx === 1 ? "Present" : "Future"}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-mystic-gold/20 flex items-center justify-center mb-2">
                      <span className="text-lg text-mystic-gold">✧</span>
                    </div>
                    <span className="text-[10px] font-cinzel text-white font-bold leading-tight uppercase">
                      {card}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Visual Spirit Animal */}
          {type === "spirit-animal" && animal && (
            <div className="mb-10 flex flex-col items-center">
              <div className="w-48 h-48 rounded-full border-2 border-mystic-gold/30 bg-mystic-purple/10 flex flex-col items-center justify-center p-6 text-center shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-mystic-gold/5 to-transparent"></div>
                <div className="text-5xl mb-3 drop-shadow-glow">🐾</div>
                <span className="text-[10px] text-mystic-gold/60 font-cinzel mb-1 uppercase tracking-[0.2em]">Your Guide</span>
                <h3 className="text-xl font-cinzel text-white font-bold uppercase tracking-tight">{animal}</h3>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                  <div className="flex gap-1">
                    {[1,2,3].map(i => <span key={i} className="w-1 h-1 rounded-full bg-mystic-gold/40"></span>)}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="prose prose-invert max-w-none">
            {cleanReading.split("\n").map((line, i) => (
              <p key={i} className="text-mystic-lavender/90 mb-4 leading-relaxed whitespace-pre-wrap text-lg">
                {line}
              </p>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-10 pt-8 border-t border-mystic-gold/10 text-center">
            <p className="text-[10px] text-mystic-lavender/30 uppercase tracking-widest mb-2">
              © MysticMate - Copyright Not For Resale
            </p>
            <p className="text-[8px] text-mystic-lavender/20 uppercase leading-tight max-w-md mx-auto">
              Disclaimer: <span className="font-bold text-mystic-gold">AI Generated</span>. For entertainment purposes only. Our readings should not replace professional advice. 
              All content is G-rated and strictly copyright-protected.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <button 
            onClick={downloadPDF}
            disabled={isDownloading}
            className="flex-1 min-w-[200px] px-8 py-4 rounded-xl bg-gradient-to-r from-mystic-gold to-yellow-600 text-mystic-dark font-cinzel font-bold tracking-widest shadow-lg shadow-mystic-gold/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {isDownloading ? "Preparing PDF..." : "Download PDF"}
          </button>
          <button 
            onClick={copyToClipboard}
            className="flex-1 min-w-[200px] px-8 py-4 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all font-cinzel font-bold tracking-widest"
          >
            {copied ? "Copied!" : "Share Reading"}
          </button>
          <button 
            onClick={onReset}
            className="w-full sm:w-auto px-8 py-4 rounded-xl border border-mystic-gold/40 text-mystic-gold hover:bg-mystic-gold/10 transition-all font-cinzel font-bold tracking-widest"
          >
            Home
          </button>
        </div>
      </div>

      <div className="bg-mystic-purple/20 backdrop-blur-sm border border-mystic-gold/10 rounded-3xl p-8 text-center animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-500">
        <h3 className="text-xl font-cinzel text-white mb-2">Deepen Your Journey</h3>
        <p className="text-sm text-mystic-lavender/60 mb-6">
          The stars suggest a complementary <span className="text-mystic-gold font-bold">{upsell.title}</span> to complete your current energetic alignment.
        </p>
        <button 
          onClick={() => onUpsell(upsell.type)}
          className="px-10 py-4 rounded-full bg-mystic-gold/10 border border-mystic-gold text-mystic-gold hover:bg-mystic-gold hover:text-mystic-dark transition-all font-cinzel font-bold tracking-[0.2em] group"
        >
          Explore {upsell.title} <span className="inline-block group-hover:translate-x-1 transition-transform ml-2">→</span>
        </button>
      </div>
    </div>
  );
}
