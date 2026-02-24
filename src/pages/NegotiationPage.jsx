import { useState, useEffect, useCallback } from 'react';
import { useSeason } from '../context/SeasonContext.jsx';
import { calculateBreakEvenForSeason } from '../services/negotiationService.js';
import { checkOffer } from '../services/feedbackService.js';
import { updateSeason } from '../services/seasonService.js';
import HarvestInput from '../components/negotiation/HarvestInput.jsx';
import BucketVisual from '../components/negotiation/BucketVisual.jsx';
import NegotiationSlider from '../components/negotiation/NegotiationSlider.jsx';
import BreakEvenDisplay from '../components/negotiation/BreakEvenDisplay.jsx';
import BigButton from '../components/ui/BigButton.jsx';

export default function NegotiationPage() {
  const { totalExpenses, season, refresh } = useSeason();
  const [harvestWeight, setHarvestWeight] = useState(0);
  const [breakEvenPrice, setBreakEvenPrice] = useState(0);
  const [offerPrice, setOfferPrice] = useState(0);
  const [isProfitable, setIsProfitable] = useState(true);
  const [weightSaved, setWeightSaved] = useState(false);

  // Recompute break-even whenever harvest weight changes
  useEffect(() => {
    if (harvestWeight > 0) {
      calculateBreakEvenForSeason(harvestWeight).then((price) => {
        setBreakEvenPrice(price);
        // Reset slider to break-even as a sensible default
        setOfferPrice(Math.ceil(price));
        setIsProfitable(checkOffer(Math.ceil(price), price));
      });
    } else {
      setBreakEvenPrice(0);
      setOfferPrice(0);
    }
  }, [harvestWeight]);

  // Real-time slider: fire the exact millisecond the value changes
  const handleSliderChange = useCallback(
    (value) => {
      setOfferPrice(value);
      const profitable = checkOffer(value, breakEvenPrice);
      setIsProfitable(profitable);
    },
    [breakEvenPrice]
  );

  async function handleSaveWeight() {
    if (!season || harvestWeight <= 0) return;
    await updateSeason(season.id, { totalWeight: harvestWeight, totalExpenseValue: totalExpenses });
    await refresh();
    setWeightSaved(true);
  }

  // Background color driven by profitability
  const bgClass = breakEvenPrice > 0
    ? isProfitable
      ? 'bg-green-600'
      : 'bg-red-600'
    : 'bg-green-50';

  const textClass = breakEvenPrice > 0 ? 'text-white' : 'text-gray-800';

  return (
    <div className={`min-h-screen flex flex-col gap-6 py-6 transition-colors duration-150 ${bgClass}`}>
      {/* Bucket visual */}
      <div className="flex flex-col items-center">
        <BucketVisual totalExpenses={totalExpenses} />
      </div>

      {/* Harvest weight input */}
      <div className={breakEvenPrice > 0 ? 'bg-white/10 rounded-2xl mx-4 p-4' : ''}>
        <HarvestInput value={harvestWeight} onChange={setHarvestWeight} />
        {harvestWeight > 0 && (
          <div className="px-4 pt-3">
            <BigButton
              onClick={handleSaveWeight}
              className={`w-full ${weightSaved ? 'bg-gray-300 text-gray-600' : 'bg-green-700 text-white'}`}
            >
              {weightSaved ? 'Na-save na ang Timbang ✓' : 'I-set ang Timbang'}
            </BigButton>
          </div>
        )}
      </div>

      {/* Break-even display */}
      {breakEvenPrice > 0 && (
        <BreakEvenDisplay breakEvenPrice={breakEvenPrice} isProfitable={isProfitable} />
      )}

      {/* Negotiation slider */}
      {breakEvenPrice > 0 && (
        <div className="bg-white rounded-2xl mx-4 p-4">
          <NegotiationSlider
            value={offerPrice}
            onChange={handleSliderChange}
            breakEvenPrice={breakEvenPrice}
          />
        </div>
      )}

      {/* Status label */}
      {breakEvenPrice > 0 && (
        <div className="flex justify-center">
          <span className={`text-5xl font-black tracking-widest ${textClass}`}>
            {isProfitable ? 'KITA! 🎉' : 'LUGI! ⚠️'}
          </span>
        </div>
      )}

      {/* Helper hint when no weight entered yet */}
      {harvestWeight <= 0 && (
        <div className="px-6 text-center">
          <p className="text-lg text-gray-500">
            Ilagay ang timbang ng ani mo para makita ang presyong balik-puhunan.
          </p>
        </div>
      )}
    </div>
  );
}
