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

  // Parse cards if it is a tarot reading
  const cardsLine = reading.split("\n").find(l => l.startsWith("CARDS:"));
  const cards = cardsLine ? cardsLine.replace("CARDS:", "").split(",").map(c => c.trim()) : [];
  const cleanReading = reading.split("\n").filter(l => !l.startsWith("CARDS:")).join("\n").trim();

  const downloadPDF = async () => {
    if (!resultRef.current) return;
    setIsDownloading(true);

    try {
      // Use a more robust configuration for html2canvas
      const canvas = await html2canvas(resultRef.current, {
        backgroundColor: "#0f051d",
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        onclone: (clonedDoc) => {
          // Ensure cloned elements are visible for capture
          const el = clonedDoc.querySelector("[data-capture-container]") as HTMLElement;
          if (el) el.style.transform = "none";
        }
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width / 2, canvas.height / 2],
      });

      pdf.addImage(imgData, "JPEG", 0, 0, canvas.width / 2, canvas.height / 2);
      pdf.save(`MysticMate-${title.replace(/\s+/g, "-")}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate PDF. Please try again. Detailed error: " + (error instanceof Error ? error.message : "Unknown error"));
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
          {/* Branding in PDF */}
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

          {/* Visual Tarot Cards Section */}
          {type === "tarot" && cards.length > 0 && (
            <div className="mb-10 flex justify-center gap-4">
              {cards.map((card, idx) => (
                <div key={idx} className="flex flex-col items-center group">
                  <div className="w-24 h-40 rounded-lg border-2 border-mystic-gold/30 bg-mystic-purple/20 flex flex-col items-center justify-center p-2 text-center shadow-inner overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-mystic-gold/5 to-transparent"></div>
                    <span className="text-[10px] text-mystic-gold/60 font-cinzel mb-1 uppercase tracking-tighter">
                      {idx === 0 ? "Past" : idx === 1 ? "Present" : "Future"}
                    </span>
                    <div className="w-10 h-10 rounded-full border border-mystic-gold/20 flex items-center justify-center mb-2">
                      <span className="text-xl text-mystic-gold">✧</span>
                    </div>
                    <span className="text-[11px] font-cinzel text-white font-bold leading-tight uppercase">
                      {card}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="prose prose-invert max-w-none">
            {cleanReading.split("\n").map((line, i) => (
              <p key={i} className="text-mystic-lavender/90 mb-4 leading-relaxed whitespace-pre-wrap text-lg">
                {line}
              </p>
            ))}
          </div>

          {/* Footer in PDF */}
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

      {/* Upsell Section */}
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
