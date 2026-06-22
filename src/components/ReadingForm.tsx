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
    
    // Determine the next step based on reading type
    if (step === 1) {
      if (readingType === "love") {
        setStep(10); // Special Relationship Status step
      } else if (readingType === "career") {
        setStep(20); // Special Career Status step
      } else {
        setStep(2);
      }
    } else if (step === 10 || step === 20) {
      setStep(2);
    } else if (step < 3) {
      nextStep();
    } else {
      setStep(4); // Payment step
    }
  };

  const isStepValid = () => {
    if (step === 1) return formData.name.trim() !== "" && formData.starSign !== "";
    if (step === 10) return !!formData.relationshipStatus;
    if (step === 20) return !!formData.careerStatus;
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
            Personalizing Your Journey
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
                  <label className="block text-sm text-mystic-lavender/60 mb-2 font-medium">Your Name (Mandatory)</label>
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

          {step === 10 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <label className="block text-sm text-mystic-lavender/60 mb-4 font-medium text-center">
                Tell us about your hearts
