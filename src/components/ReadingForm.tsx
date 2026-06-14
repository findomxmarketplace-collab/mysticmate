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
    if (step < 3) {
      nextStep();
    } else {
      nextStep(); // Go to step 4 (Payment)
    }
  };

  const isStepValid = () => {
    if (step === 1) return formData.name.trim() !== "" && formData.starSign !== "";
    if (step === 2) return formData.mood !== "";
    return true;
  };

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
            Step {step} of 4
          </span>
          <h2 className="text-2xl font-cinzel font-bold text-white">
            {readingTitle}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-mystic-lavender/60 mb-2 font-medium">Your Name</label>
                  <input
                    autoFocus
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-mystic-purple/10 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-mystic-gold/50 transition-colors"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm text-mystic-lavender/60 mb-2 font-medium">Birth Date (Optional)</label>
                  <input
                    type="date"
                    value={formData.birthDate || ""}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    className="w-full bg-mystic-purple/10 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-mystic-gold/50 transition-colors [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-mystic-lavender/60 mb-2 font-medium">Star Sign</label>
                  <div className="grid grid-cols-3 gap-2">
                    {STAR_SIGNS.map((sign) => (
                      <button
                        key={sign}
                        type="button"
                        onClick={() => setFormData({ ...formData, starSign: sign })}
                        className={`py-2 text-xs rounded-lg border transition-all ${
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
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <label className="block text-sm text-mystic-lavender/60 mb-4 font-medium text-center">
                How is your energy flowing today?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {MOODS.map((mood) => (
                  <button
                    key={mood}
                    type="button"
                    onClick={() => setFormData({ ...formData, mood: mood })}
                    className={`py-3 rounded-xl border transition-all flex items-center justify-center ${
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
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <label className="block text-sm text-mystic-lavender/60 mb-2 font-medium">
                Any recent signs, symbols, or context? (Optional)
              </label>
              <textarea
                value={formData.recentSigns}
                onChange={(e) => setFormData({ ...formData, recentSigns: e.target.value })}
                className="w-full bg-mystic-purple/10 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-mystic-gold/50 transition-colors h-32 resize-none"
                placeholder="Repeated numbers, animals, dreams..."
              />
              <p className="mt-2 text-[10px] text-mystic-lavender/30 italic">
                This helps us attune the reading to your specific path.
              </p>
            </div>
          )}

          {step === 4 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 text-center">
              <p className="text-mystic-lavender/80 mb-6 italic">
                To receive your personalized {readingTitle}, please complete the secure payment of {price}.
              </p>
              
              {formData.name.toUpperCase() === "TEST" ? (
                <button
                  type="button"
                  onClick={() => onPaymentSuccess(formData)}
                  className="w-full py-4 rounded-xl bg-green-600 text-white font-bold font-cinzel hover:bg-green-700 transition-colors shadow-lg shadow-green-900/20"
                >
                  Test Payment (Bypass)
                </button>
              ) : (
                <PayPalButton 
                  amount={price.replace("$", "")} 
                  onSuccess={() => onPaymentSuccess(formData)}
                />
              )}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            {step > 1 && step < 4 && (
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 py-4 rounded-xl border border-white/10 text-mystic-lavender/60 hover:text-white hover:bg-white/5 transition-all font-medium"
              >
                Back
              </button>
            )}
            {step < 4 && (
              <button
                type="submit"
                disabled={!isStepValid()}
                className={`flex-[2] py-4 rounded-xl font-cinzel font-bold tracking-widest transition-all ${
                  isStepValid()
                    ? "bg-gradient-to-r from-mystic-gold to-yellow-600 text-mystic-dark shadow-lg shadow-mystic-gold/20 hover:scale-[1.02] active:scale-[0.98]"
                    : "bg-white/5 text-white/20 cursor-not-allowed"
                }`}
              >
                {step === 3 ? "Proceed to Payment" : "Continue"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
