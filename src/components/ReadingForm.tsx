"use client";

import { useState } from "react";
import { ReadingType, ReadingContext } from "@/lib/ai/prompts";
import PayPalButton from "./PayPalButton";

interface ReadingFormProps {
  readingType: ReadingType;
  readingTitle: string;
  price: string;
  onClose: () => void;
  onPaymentSuccess: (context: ReadingContext, upgradedType?: ReadingType, upgradedTitle?: string) => void;
}

export default function ReadingForm({
  readingType,
  readingTitle,
  price,
  onClose,
  onPaymentSuccess,
}: ReadingFormProps) {
  const [step, setStep] = useState(1);
  const [showBundleUpsell, setShowBundleUpsell] = useState(false);
  const [currentType, setCurrentType] = useState<ReadingType>(readingType);
  const [currentTitle, setCurrentTitle] = useState(readingTitle);
  const [currentPrice, setCurrentPrice] = useState(price);
  const [formData, setFormData] = useState<ReadingContext>({
    name: "",
    starSign: "Aries",
    mood: "",
    birthDate: "",
    recentSigns: "",
  });

  const starSigns = [
    "Aries", "Taurus", "Gemini", "Cancer",
    "Leo", "Virgo", "Libra", "Scorpio",
    "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 3 && currentType !== "bundle") {
      setShowBundleUpsell(true);
    } else if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleUpgrade = () => {
    setCurrentType("bundle");
    setCurrentTitle("Sacred Bundle (All Readings)");
    setCurrentPrice("$9.99");
    setShowBundleUpsell(false);
    setStep(4);
  };

  const handleDeclineUpgrade = () => {
    setShowBundleUpsell(false);
    setStep(4);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const isStepValid = () => {
    if (step === 1) return formData.name.trim().length >= 2;
    if (step === 2) return formData.mood.trim().length >= 3;
    return true;
  };

  const SOLANA_WALLET_ADDRESS = "GsxgBgtbCztWcbdFd6ThgGMseZeBwWjfEwMtKQ3jubgJ";

  const handlePhantomPayment = () => {
    const confirmed = window.confirm(`Connect Phantom Wallet to send SOL to ${SOLANA_WALLET_ADDRESS} for your ${currentTitle}?`);
    if (confirmed) {
      alert(`Payment of ${currentPrice} in SOL sent to ${SOLANA_WALLET_ADDRESS}.\n\nSimulated Phantom Payment Successful!`);
      onPaymentSuccess(formData, currentType === readingType ? undefined : currentType, currentTitle === readingTitle ? undefined : currentTitle);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-mystic-dark/95 backdrop-blur-xl">
      <div className="bg-[#1a0b2e] border border-mystic-gold/20 w-full max-w-lg rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-mystic-gold/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl" />

        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-mystic-lavender/40 hover:text-white transition-colors z-10"
        >
          ✕
        </button>

        {showBundleUpsell ? (
          <div className="text-center space-y-6 animate-in zoom-in fade-in duration-500 py-4">
            <div className="w-20 h-20 bg-mystic-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-mystic-gold/50">
              <span className="text-4xl">✨</span>
            </div>
            <h2 className="text-2xl font-cinzel text-mystic-gold">The Universe wants to give you more...</h2>
            <p className="text-mystic-lavender/80">
              For just a few dollars more, you can unlock the <span className="text-white font-bold">Sacred All-in-One Bundle</span>. 
              Get all 8 readings (Tarot, Spells, Crystals, and more) in one master guide.
            </p>
            <div className="space-y-4">
              <button
                onClick={handleUpgrade}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-mystic-gold to-yellow-600 text-mystic-dark font-bold font-cinzel hover:scale-[1.02] transition-all shadow-lg"
              >
                YES, UPGRADE TO BUNDLE ($9.99)
              </button>
              <button
                onClick={handleDeclineUpgrade}
                className="w-full py-2 text-mystic-lavender/40 hover:text-white transition-colors text-sm underline"
              >
                No thanks, I\"ll stay with {currentTitle}
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <div className="flex justify-between items-end mb-2">
                <h2 className="text-2xl font-cinzel text-mystic-gold">{currentTitle}</h2>
                <span className="text-mystic-lavender/40 text-sm font-light">Step {step} of 4</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-mystic-gold to-yellow-600 transition-all duration-500"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                  <label className="block text-sm font-medium text-mystic-lavender/60 mb-2 tracking-wide uppercase">
                    What is your name?
                  </label>
                  <input
                    autoFocus
                    type="text"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-mystic-gold/50 transition-colors"
                    placeholder="Your sacred name..."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              )}

              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                  <label className="block text-sm font-medium text-mystic-lavender/60 mb-2 tracking-wide uppercase">
                    How are you feeling today?
                  </label>
                  <textarea
                    autoFocus
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-mystic-gold/50 transition-colors h-32 resize-none"
                    placeholder="Describe your current energy or mood..."
                    value={formData.mood}
                    onChange={(e) => setFormData({ ...formData, mood: e.target.value })}
                  />
                </div>
              )}

              {step === 3 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-mystic-lavender/60 mb-2 tracking-wide uppercase">
                      Your Star Sign
                    </label>
                    <select
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-mystic-gold/50 transition-colors appearance-none"
                      value={formData.starSign}
                      onChange={(e) => setFormData({ ...formData, starSign: e.target.value })}
                    >
                      {starSigns.map(sign => (
                        <option key={sign} value={sign} className="bg-mystic-dark">{sign}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-mystic-lavender/60 mb-2 tracking-wide uppercase">
                      Any recent signs from the universe? (Optional)
                    </label>
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-mystic-gold/50 transition-colors"
                      placeholder="Numbers, animals, coincidences..."
                      value={formData.recentSigns}
                      onChange={(e) => setFormData({ ...formData, recentSigns: e.target.value })}
                    />
                  </div>
                  <p className="text-[10px] text-mystic-lavender/40 italic text-center">
                    This helps us attune the reading to your specific path.
                  </p>
                </div>
              )}

              {step === 4 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500 text-center">
                  <p className="text-mystic-lavender/80 mb-6 italic">
                    To receive your personalized {currentTitle}, please complete the secure payment of {currentPrice}.
                  </p>
                  
                  <div className="space-y-4">
                    {formData.name.toUpperCase() === "TEST" ? (
                      <button
                        type="button"
                        onClick={() => onPaymentSuccess(formData, currentType === readingType ? undefined : currentType, currentTitle === readingTitle ? undefined : currentTitle)}
                        className="w-full py-4 rounded-xl bg-green-600 text-white font-bold font-cinzel hover:bg-green-700 transition-colors shadow-lg shadow-green-900/20"
                      >
                        Test Payment (Bypass)
                      </button>
                    ) : (
                      <>
                        <PayPalButton
                          amount={currentPrice.replace("$", "")}
                          onSuccess={() => onPaymentSuccess(formData, currentType === readingType ? undefined : currentType, currentTitle === readingTitle ? undefined : currentTitle)}
                        />
                        
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10"></span></div>
                          <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#1a0b2e] px-2 text-mystic-lavender/40">Or</span></div>
                        </div>

                        <button
                          type="button"
                          onClick={handlePhantomPayment}
                          className="w-full py-4 rounded-xl bg-[#ab9ff2] text-white font-bold font-cinzel hover:bg-[#9084e3] transition-colors shadow-lg flex items-center justify-center gap-2"
                        >
                          <span className="text-xl">👻</span>
                          Pay with Phantom (SOL)
                        </button>
                      </>
                    )}
                  </div>
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
          </>
        )}
      </div>
    </div>
  );
}
