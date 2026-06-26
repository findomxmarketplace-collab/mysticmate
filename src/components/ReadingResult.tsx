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
  onUpsell: (type: ReadingType, title: string) => void;
}

export default function ReadingResult({ reading, title, type, onReset, onUpsell }: ReadingResultProps) {
  const resultRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  const downloadPDF = async () => {
    if (!resultRef.current) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(resultRef.current, {
        backgroundColor: "#0f051d",
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width / 2, canvas.height / 2],
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width / 2, canvas.height / 2);
      pdf.save(`MysticMate-${title.replace(/\s+/g, "-")}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`My MysticMate Reading: ${title}\n\n${reading}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getUpsellRecommendation = () => {
    const recommendations: Record<ReadingType, { type: ReadingType; title: string }> = {
      tarot: { type: "spirit-animal", title: "Spirit Animal & Energy" },
      "spirit-animal": { type: "tarot", title: "Tarot Card Spread" },
      love: { type: "spell", title: "Personalized Spell" },
      career: { type: "crystal-guide", title: "Crystal Guide" },
      "crystal-ball": { type: "bundle", title: "Spiritual Bundle" },
      spell: { type: "crystal-guide", title: "Crystal Guide" },
      "crystal-guide": { type: "love", title: "Love & Relationships" },
      bundle: { type: "crystal-ball", title: "Crystal Ball Vision" },
    };
    return recommendations[type];
  };

  const upsell = getUpsellRecommendation();

  return (
    <div className="w-full max-w-3xl space-y-8">
      <div className="animate-in fade-in zoom-in duration-700">
        <div
          ref={resultRef}
          className="bg-mystic-dark border border-mystic-gold/20 rounded-3xl p-10 shadow-2xl shadow-mystic-purple/20 relative overflow-hidden"
        >
          {/* Visual Crystal Ball for Crystal Ball Readings */}
          {type === 'crystal-ball' && (
            <div className="flex justify-center mb-10">
              <div className="relative w-40 h-40">
                <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-2xl animate-pulse" />
                <div className="relative w-full h-full rounded-full border-4 border-white/10 bg-gradient-to-br from-cyan-300/30 via-purple-500/30 to-blue-600/30 backdrop-blur-xl flex items-center justify-center overflow-hidden shadow-inner">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-spin-slow" />
                  <span className="text-6xl filter drop-shadow-lg">🔮</span>
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-black/40 rounded-[100%] blur-sm" />
              </div>
            </div>
          )}

          {/* Branding in PDF */}
          <div className="flex justify-between items-start mb-8 border-b border-mystic-gold/10 pb-6">
            <div>
              <h1 className="text-2xl font-cinzel font-bold text-mystic-gold tracking-widest uppercase">MysticMate</h1>
              <p className="text-[10px] text-mystic-lavender/40 uppercase tracking-widest font-bold">AI Generated Sacred Insights</p>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-cinzel text-white">{title}</h2>
              <p className="text-[10px] text-mystic-lavender/40 italic">{new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            {reading.split("\n").map((line, i) => {
              if (line.startsWith("# ")) {
                return <h1 key={i} className="text-3xl font-cinzel text-mystic-gold mt-8 mb-4">{line.replace("# ", "")}</h1>;
              }
              if (line.startsWith("## ")) {
                return <h2 key={i} className="text-2xl font-cinzel text-white mt-6 mb-3">{line.replace("## ", "")}</h2>;
              }
              if (line.trim() === "---") {
                return <hr key={i} className="border-mystic-gold/20 my-8" />;
              }
              return (
                <p key={i} className="text-mystic-lavender/90 mb-4 leading-relaxed whitespace-pre-wrap text-lg">
                  {line}
                </p>
              );
            })}
          </div>

          {/* Footer in PDF */}
          <div className="mt-10 pt-8 border-t border-mystic-gold/10 text-center">
            <p className="text-[10px] text-mystic-lavender/30 uppercase tracking-widest mb-2 font-bold">
              <strong>AI Generated</strong> - © MysticMate - Copyright Not For Resale
            </p>
            <p className="text-[8px] text-mystic-lavender/20 uppercase leading-tight max-w-md mx-auto">
              Disclaimer: For entertainment purposes only. Our readings should not replace professional advice.
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
          onClick={() => onUpsell(upsell.type, upsell.title)}
          className="px-10 py-4 rounded-full bg-mystic-gold/10 border border-mystic-gold text-mystic-gold hover:bg-mystic-gold hover:text-mystic-dark transition-all font-cinzel font-bold tracking-[0.2em] group"
        >
          Explore {upsell.title} <span className="inline-block group-hover:translate-x-1 transition-transform ml-2">→</span>
        </button>
      </div>
    </div>
  );
}
