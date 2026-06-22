"use client";

import { useState } from "react";
import { ReadingType, ReadingContext } from "@/lib/ai/prompts";
import PayPalButton from "./PayPalButton";

interface ReadingFormProps {
  readingType: ReadingType;
  readingTitle: string;
  price: string;
  onClose: () => void;
  onPaymentSuccess: (context: ReadingContext) => void;
}

const STAR_SIGNS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

const MOODS = [
  "Hopeful", "Anxious", "Curious", "Grateful", "Lost", "Energetic", "Peaceful", "Seeking"
];

export default function ReadingForm({ readingType, readingTitle, price, onClose, onPaymentSuccess }: ReadingFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ReadingContext>({
    name: "",
    starSign: "",
    mood: "",
    recentSigns: "",
  });

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      if (readingType === "love") setStep(10);
      else if (readingType === "career") setStep(20);
      else if (readingType === "crystal") setStep(30);
      else setStep(2);
    } else if (step === 10 || step === 20 || step === 30) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    }
  };

  const isStepValid = () => {
    if (step === 1) return formData.name.trim() !== "" && formData.starSign !== "";
    if (step === 10) return !!formData.relationshipStatus;
    if (step === 20) return !!formData.careerStatus;
    if (step === 30) return !!formData.lifeGoals && formData.lifeGoals.length > 5;
    if (step === 2) return formData.mood !== "";
    return true;
  };

  const isTestMode = formData.name.toUpperCase() === "TEST";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-mystic-dark border border-mystic-gold/30 rounded-3xl p-8 shadow-2xl shadow-mystic-purple/20 my-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-mystic-lavender/40 hover:text-white transition-colors"
        >
          ✕
        </button>

        <div className="mb-8 text-center">
          <span className="text-[10px] uppercase tracking-[0.2em] text-mystic-gold/60 mb-2 block">
            Sacred Preparation
          </span>
          <h2 className="text-2xl font-cinzel font-bold text-white uppercase tracking-tight">
            {readingTitle}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-mystic-lavender/60 mb-3 font-cinzel">Your Name (Mandatory)</label>
                <input
                  autoFocus
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-mystic-purple/10 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-mystic-gold/50 transition-colors text-lg"
                  placeholder="Who seeks guidance?"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-mystic-lavender/60 mb-3 font-cinzel">Your Star Sign</label>
                <div className="grid grid-cols-3 gap-2">
                  {STAR_SIGNS.map((sign) => (
                    <button
                      key={sign}
                      type="button"
                      onClick={() => setFormData({ ...formData, starSign: sign })}
                      className={`py-3 text-[10px] uppercase tracking-tighter rounded-lg border transition-all ${
                        formData.starSign === sign
                          ? "bg-mystic-gold/20 border-mystic-gold text-white"
                          : "bg-white/5 border-white/5 text-mystic-lavender/40 hover:border-white/20"
                      }`}
                    >
                      {sign}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 10 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-4">
              <label className="block text-sm text-mystic-lavender/60 mb-4 font-medium text-center">
                Where is your heart currently resting?
              </label>
              <div className="grid grid-cols-2 gap-4">
                {["single", "partnered"].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setFormData({ ...formData, relationshipStatus: status as any })}
                    className={`py-5 rounded-xl border transition-all font-cinzel tracking-[0.2em] uppercase text-xs ${
                      formData.relationshipStatus === status
                        ? "bg-mystic-gold/20 border-mystic-gold text-white"
                        : "bg-white/5 border-white/5 text-mystic-lavender/40 hover:border-white/20"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 20 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-4">
              <label className="block text-sm text-mystic-lavender/60 mb-4 font-medium text-center">
                Tell us about your professional path:
              </label>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: "employed", label: "In a Career" },
                  { id: "seeking", label: "Seeking New Path" }
                ].map((choice) => (
                  <button
                    key={choice.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, careerStatus: choice.id as any })}
                    className={`py-5 rounded-xl border transition-all font-cinzel tracking-[0.2em] uppercase text-xs ${
                      formData.careerStatus === choice.id
                        ? "bg-mystic-gold/20 border-mystic-gold text-white"
                        : "bg-white/5 border-white/5 text-mystic-lavender/40 hover:border-white/20"
                    }`}
                  >
                    {choice.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 30 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-4">
              <label className="block text-sm text-mystic-lavender/60 mb-2 font-medium">
                What do you desire most from life right now?
              </label>
              <textarea
                autoFocus
                required
                value={formData.lifeGoals}
                onChange={(e) => setFormData({ ...formData, lifeGoals: e.target.value })}
                className="w-full bg-mystic-purple/10 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-mystic-gold/50 transition-colors h-32 resize-none"
                placeholder="Describe your dreams or goals..."
              />
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-4">
              <label className="block text-sm text-mystic-lavender/60 mb-4 font-medium text-center">
                How is your energy flowing today?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {MOODS.map((mood) => (
                  <button
                    key={mood}
                    type="button"
                    onClick={() => setFormData({ ...formData, mood: mood })}
                    className={`py-4 rounded-xl border transition-all flex items-center justify-center ${
                      formData.mood === mood
                        ? "bg-mystic-gold/20 border-mystic-gold text-white"
                        : "bg-white/5 border-white/5 text-mystic-lavender/40 hover:border-white/20"
                    }`}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-4">
              <label className="block text-sm text-mystic-lavender/60 mb-2 font-medium">
                Any specific symbols or recent signs? (Optional)
              </label>
              <textarea
                value={formData.recentSigns}
                onChange={(e) => setFormData({ ...formData, recentSigns: e.target.value })}
                className="w-full bg-mystic-purple/10 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-mystic-gold/50 transition-colors h-32 resize-none"
                placeholder="Dreams, repeated numbers, animals..."
              />
            </div>
          )}

          {step === 4 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 text-center">
              <div className="mb-8">
                <div className="text-4xl mb-2">✨</div>
                <p className="text-mystic-lavender/80 italic leading-relaxed">
                  Your path is illuminated. Complete the secure checkout to receive your guidance.
                </p>
              </div>
              
              {isTestMode ? (
                <div className="space-y-6">
                  <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-xl">
                    <p className="text-green-500 text-sm font-bold font-cinzel mb-1 uppercase tracking-widest">Test Mode Activated</p>
                    <p className="text-green-500/60 text-[10px]">Verify results and PDF generation instantly.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onPaymentSuccess(formData)}
                    className="w-full py-5 rounded-xl bg-green-600 text-white font-bold font-cinzel tracking-widest hover:bg-green-700 transition-all shadow-xl shadow-green-900/40 uppercase"
                  >
                    Bypass for Test
                  </button>
                  <div className="relative flex items-center">
                    <div className="flex-grow border-t border-white/5"></div>
                    <span className="flex-shrink mx-4 text-[10px] text-white/20 uppercase tracking-widest font-cinzel">or</span>
                    <div className="flex-grow border-t border-white/5"></div>
                  </div>
                  <PayPalButton amount={price.replace("$", "")} onSuccess={() => onPaymentSuccess(formData)} />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center px-4 py-2 border-b border-white/5 mb-4">
                    <span className="text-mystic-lavender/40 text-xs uppercase font-cinzel">Service Fee</span>
                    <span className="text-mystic-gold font-bold text-xl">{price}</span>
                  </div>
                  <PayPalButton amount={price.replace("$", "")} onSuccess={() => onPaymentSuccess(formData)} />
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3 pt-6">
            {step !== 1 && step < 4 && (
              <button
                type="button"
                onClick={() => {
                  if (step === 10 || step === 20 || step === 30) setStep(1);
                  else if (step === 2) {
                    if (readingType === "love") setStep(10);
                    else if (readingType === "career") setStep(20);
                    else if (readingType === "crystal") setStep(30);
                    else setStep(1);
                  }
                  else prevStep();
                }}
                className="flex-1 py-4 rounded-xl border border-white/10 text-mystic-lavender/60 hover:text-white transition-all font-cinzel tracking-widest uppercase text-xs"
              >
                Back
              </button>
            )}
            {step < 4 && (
              <button
                type="submit"
                disabled={!isStepValid()}
                className={`flex-[2] py-4 rounded-xl font-cinzel font-bold tracking-widest transition-all uppercase ${
                  isStepValid()
                    ? "bg-gradient-to-r from-mystic-gold to-yellow-600 text-mystic-dark shadow-xl shadow-mystic-gold/20 hover:scale-[1.02] active:scale-[0.98]"
                    : "bg-white/5 text-white/20 cursor-not-allowed"
                }`}
              >
                {step === 3 ? "Unlock Reading" : "Continue"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
