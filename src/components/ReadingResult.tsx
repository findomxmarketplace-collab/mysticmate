import { useState } from "react";
import { ReadingType } from "@/lib/ai/prompts";

interface ReadingResultProps {
  reading: string;
  title: string;
  type: ReadingType;
  formData?: {
    name: string;
    starSign: string;
    mood: string;
  };
  onReset: () => void;
  onUpsell: (type: ReadingType, title: string) => void;
}

const CARD_IMAGES: Record<string, string> = {
  'the hermit': '/images/tarot/hermit.png',
  'the star': '/images/tarot/star.png',
  'the sun': '/images/tarot/sun.png',
  'the moon': '/images/tarot/moon.png',
  'the tower': '/images/tarot/tower.png',
  'wheel of fortune': '/images/tarot/wheel.png',
};

const CARD_BACK = '/images/tarot/card-back.png';

function getCardImage(cardName: string): string {
  const key = cardName.toLowerCase().trim();
  for (const [name, img] of Object.entries(CARD_IMAGES)) {
    if (key.includes(name)) return img;
  }
  return CARD_BACK;
}

export default function ReadingResult({ 
  reading, 
  title, 
  type, 
  formData, 
  onReset, 
  onUpsell 
}: ReadingResultProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [cardImgErrors, setCardImgErrors] = useState<Record<string, boolean>>({});

  const downloadPDF = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch("/api/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reading,
          title,
          name: formData?.name || "Seeker",
          starSign: formData?.starSign || "Unknown",
          mood: formData?.mood || "Open",
          type,
        }),
      });

      if (!response.ok) {
        throw new Error("PDF channel interrupted");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `MysticMate-${title.replace(/\s+/g, '-')}.pdf`;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);
    } catch (error: any) {
      console.error("PDF download failed:", error);
      alert("The cosmic PDF channel is busy. Please use the 'PRINT' button or Right-Click -> Print to save as PDF instantly!");
    } finally {
      setIsDownloading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`My MysticMate Reading: ${title}\n\n${reading}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const printReading = () => {
    window.print();
  };

  const handleImgError = (cardName: string) => {
    setCardImgErrors(prev => ({ ...prev, [cardName]: true }));
  };

  return (
    <div className="w-full max-w-4xl space-y-12 mb-24">
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div
          className="bg-[#0f051d] border-2 border-mystic-gold/40 rounded-[3rem] p-6 md:p-20 shadow-[0_0_100px_rgba(184,134,11,0.15)] relative overflow-hidden"
          id="reading-content"
        >
          <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-mystic-gold/30 rounded-tl-[3rem] pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-mystic-gold/30 rounded-tr-[3rem] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-mystic-gold/30 rounded-bl-[3rem] pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-mystic-gold/30 rounded-br-[3rem] pointer-events-none"></div>

          <div className="flex flex-col items-center text-center gap-6 mb-16 border-b-2 border-mystic-gold/20 pb-12">
            <h1 className="text-4xl md:text-6xl font-cinzel font-bold text-mystic-gold tracking-[0.3em] uppercase">MysticMate</h1>
            <p className="text-sm text-mystic-lavender/60 uppercase tracking-[0.5em] font-bold">The Sacred Master Blueprint</p>
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-mystic-gold to-transparent" />
            <div className="space-y-2">
              <h2 className="text-3xl font-cinzel text-white">{title}</h2>
              <p className="text-mystic-gold/80 font-cinzel text-lg tracking-widest uppercase">Prepared for {formData?.name || "Radiant Soul"}</p>
              <p className="text-sm text-mystic-lavender/40 italic">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none prose-p:text-mystic-lavender/90 prose-p:text-xl prose-p:leading-relaxed prose-headings:font-cinzel prose-strong:text-mystic-gold prose-hr:border-mystic-gold/20">
            {reading.split("\n").map((line, i) => {
              const trimmedLine = line.trim();
              if (!trimmedLine && line !== "\n") return null;

              if (line.startsWith("# ")) {
                return <h1 key={i} className="text-4xl md:text-5xl text-mystic-gold mt-20 mb-10 border-b border-mystic-gold/10 pb-8 text-center uppercase tracking-widest">{line.replace("# ", "")}</h1>;
              }

              if (line.startsWith("## [CARD")) {
                const parts = line.replace("## ", "").split(":");
                const cardHeader = parts[0];
                const cardName = parts[1]?.split("**")[0] || "Tarot Card";
                const cardImage = getCardImage(cardName);
                const imgError = cardImgErrors[cardName.trim()];

                return (
                  <div key={i} className="my-20 p-8 md:p-14 rounded-[4rem] bg-gradient-to-br from-mystic-purple/20 via-mystic-dark to-black border-2 border-mystic-gold/30 shadow-2xl relative overflow-hidden group">
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                      <div className="relative flex-shrink-0 group/card">
                        <div className="absolute inset-0 bg-mystic-gold/30 blur-2xl rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
                        <div className="relative w-56 h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-mystic-gold/40 bg-mystic-dark transform transition-all duration-700 hover:rotate-2 hover:scale-105">
                          <img 
                            src={!imgError ? cardImage : CARD_BACK} 
                            alt={cardName}
                            className="w-full h-full object-cover"
                            onError={() => handleImgError(cardName.trim())}
                          />
                        </div>
                      </div>
                      <div className="flex-1 space-y-6 text-center md:text-left">
                        <span className="text-sm font-cinzel text-mystic-gold tracking-[0.4em] uppercase font-bold">{cardHeader}</span>
                        <h3 className="text-4xl md:text-5xl font-cinzel text-white tracking-widest">{cardName}</h3>
                        <div className="h-[2px] w-20 bg-mystic-gold/40 mx-auto md:mx-0" />
                      </div>
                    </div>
                  </div>
                );
              }

              if (line.startsWith("## ")) {
                return <h2 key={i} className="text-3xl font-cinzel text-white mt-16 mb-8 flex items-center gap-6">
                  <span className="h-[2px] flex-1 bg-gradient-to-r from-mystic-gold to-transparent opacity-30"></span>
                  {line.replace("## ", "")}
                  <span className="h-[2px] flex-1 bg-gradient-to-l from-mystic-gold to-transparent opacity-30"></span>
                </h2>;
              }

              if (line.startsWith("### ")) {
                return <h3 key={i} className="text-2xl font-cinzel text-mystic-gold mt-12 mb-6 flex items-center gap-3">
                  <span className="text-mystic-gold">✦</span>
                  {line.replace("### ", "")}
                </h3>;
              }

              if (line.trim() === "---") {
                return <hr key={i} className="my-16 opacity-30" />;
              }

              return (
                <p key={i} className="text-mystic-lavender/90 mb-10 leading-relaxed text-lg md:text-xl font-light">
                  {line}
                </p>
              );
            })}
          </div>

          <div className="mt-24 pt-12 border-t border-mystic-gold/20 text-center space-y-6">
            <p className="text-xs text-mystic-lavender/40 uppercase tracking-[0.6em] font-bold">
              Bound by Cosmic Intention — © 2026 MysticMate
            </p>
            <p className="text-[11px] text-mystic-lavender/30 uppercase leading-relaxed max-w-3xl mx-auto font-light">
              Disclaimer: For entertainment and spiritual exploration purposes only. This AI-guided reading is a reflection of current energies and should not replace professional medical, legal, or financial advice. All content is strictly copyright-protected.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-8 no-print">
          <div className="space-y-4">
            <button
              onClick={downloadPDF}
              disabled={isDownloading}
              className="w-full px-10 py-8 rounded-2xl bg-gradient-to-r from-mystic-gold to-yellow-600 text-mystic-dark font-cinzel font-bold tracking-[0.2em] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex flex-col items-center justify-center gap-2 text-xl"
            >
              <span>{isDownloading ? "CHANNELING PDF..." : "DOWNLOAD SACRED PDF"}</span>
              <span className="text-[10px] opacity-80 uppercase tracking-widest font-sans">Wait 5s for download or Right-Click & Print to Save</span>
            </button>
            
            <div className="flex flex-col md:flex-row gap-4">
              <button
                onClick={printReading}
                className="flex-1 px-8 py-6 rounded-2xl border-2 border-mystic-gold text-mystic-gold hover:bg-mystic-gold/10 transition-all font-cinzel font-bold tracking-[0.15em] flex items-center justify-center gap-2"
              >
                PRINT SACRED SCROLL
              </button>
              
              <button
                onClick={copyToClipboard}
                className="flex-1 px-8 py-6 rounded-2xl border-2 border-white/20 bg-white/5 text-white hover:bg-white/10 transition-all font-cinzel font-bold tracking-[0.15em] flex items-center justify-center gap-2"
              >
                {copied ? "COPIED!" : "SHARE MAGIC"}
              </button>
            </div>
          </div>

          <div className="bg-mystic-gold/10 border border-mystic-gold/20 p-6 rounded-2xl text-center">
            <p className="text-mystic-gold text-sm font-cinzel tracking-widest uppercase mb-2">💡 Quick Tip for Mobile & Desktop</p>
            <p className="text-mystic-lavender/70 text-xs leading-relaxed">
              If the download button doesn't trigger, simply <strong className="text-white">Right-Click (or Long-Press)</strong> anywhere on your reading and select <strong className="text-white">"Print"</strong>. Then choose <strong className="text-white">"Save as PDF"</strong> to keep your sacred guidance forever.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center no-print">
          <button
            onClick={onReset}
            className="text-mystic-lavender/40 hover:text-mystic-gold transition-colors font-cinzel tracking-[0.3em] text-sm uppercase"
          >
            ← Return to the Altar
          </button>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; color: black !important; }
          #reading-content { 
            border: 2px solid #8b6e00 !important; 
            padding: 2rem !important; 
            margin: 0 !important; 
            box-shadow: none !important;
            background: white !important;
            border-radius: 0 !important;
          }
          .prose-invert { 
            --tw-prose-body: #1a1a1a; 
            --tw-prose-headings: #000; 
            --tw-prose-bold: #000;
          }
          h1, h2, h3, .text-mystic-gold { color: #8b6e00 !important; }
          .bg-gradient-to-br { background: #f9f9f9 !important; border: 1px solid #ddd !important; border-radius: 2rem !important; }
          img { max-height: 400px; object-fit: contain; }
        }
      `}</style>
    </div>
  );
}
