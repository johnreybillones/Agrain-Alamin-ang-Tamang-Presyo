import { useState, useEffect, useRef } from 'react';
import { useSeason } from '../context/SeasonContext.jsx';
import { checkOffer } from '../services/feedbackService.js';
import { updateSeason } from '../services/seasonService.js';
import { COLORS, FONTS, CARD_STYLE } from '../utils/designTokens.js';
import HarvestInput from '../components/negotiation/HarvestInput.jsx';
import NegotiationSlider from '../components/negotiation/NegotiationSlider.jsx';
import BreakEvenDisplay from '../components/negotiation/BreakEvenDisplay.jsx';

export default function NegotiationPage() {
  const { totalExpenses, season, refresh } = useSeason();
  const [harvest, setHarvest] = useState('');
  const SLIDER_MIN = 1;

  // Pre-populate harvest weight from the saved season record.
  // Runs once when season first loads from IndexedDB (starts as null).
  useEffect(() => {
    if (season?.totalWeight > 0 && !harvest) {
      setHarvest(String(season.totalWeight));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [season?.totalWeight]);

  // Derived state
  const kg = parseFloat(harvest) || 0;
  // Always ceil to nearest cent — the farmer needs at LEAST this price to break even.
  // Math.round would round ₱1.004 DOWN to ₱1.00, showing SULIT while losing money.
  const be = kg > 0 && totalExpenses > 0
    ? Math.ceil((totalExpenses / kg) * 100) / 100
    : null;
  const isReady = be !== null;
  const [offer, setOffer] = useState(SLIDER_MIN);
  // Strict comparison — no tolerance so SULIT/LUGI always matches the summary table
  const isProfit = isReady && offer >= be;

  // sliderMax only ever grows — prevents the native <input type="range"> thumb from
  // momentarily snapping to 100% (far right) when `max` shrinks faster than `value`
  // during rapid typing (browser processes `max` attribute before `value`).
  const computedMax = be !== null
    ? Math.max(Math.round(be * 1.5 * 100) / 100, 80)
    : 80;
  const [sliderMax, setSliderMax] = useState(computedMax);
  useEffect(() => {
    if (isReady) setSliderMax(prev => Math.max(prev, computedMax));
  }, [isReady, computedMax]);

  // Initialize the slider at break-even only when isReady first becomes true.
  // Subsequent harvest edits keep the slider where the user last left it.
  const prevIsReadyRef = useRef(false);
  useEffect(() => {
    if (isReady && !prevIsReadyRef.current && be !== null) {
      setOffer(Math.min(computedMax, Math.max(SLIDER_MIN, be)));
    }
    prevIsReadyRef.current = isReady;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  // Vibrate only on the transition from profit → loss (not on every update)
  const prevProfitRef = useRef(true);
  // Debounce timer for DB saves — avoids hitting IndexedDB on every keystroke
  const saveTimerRef = useRef(null);
  // Clear pending save on unmount so it doesn't fire after navigation
  useEffect(() => () => clearTimeout(saveTimerRef.current), []);
  useEffect(() => {
    if (isReady && !isProfit && prevProfitRef.current) {
      checkOffer(offer, be); // fires navigator.vibrate internally
    }
    prevProfitRef.current = isProfit;
  }, [offer, isProfit, isReady, be]);

  // Persist harvest weight to season store.
  // Accepts fresh string value directly to avoid stale closure on `harvest` state.
  async function saveHarvestWeight(freshVal) {
    const kgFresh = parseFloat(freshVal) || 0;
    if (!season || kgFresh <= 0) return;
    await updateSeason(season.id, { totalWeight: kgFresh, totalExpenseValue: totalExpenses });
    await refresh();
  }

  // Dynamic background — mirrors LevelAppV2 exactly
  const screenBg = !isReady ? COLORS.cream : isProfit ? '#66BB6A' : '#EF5350';

  // Profit/loss summary row data — same structure as LevelAppV2
  const pl = kg > 0 ? offer * kg - totalExpenses : null;
  const summaryRows = isReady ? [
    { key: 'Kabuuang Gastos',          val: `₱${totalExpenses.toLocaleString()}`,   accent: false },
    { key: 'Timbang ng Ani',           val: `${kg} kg`,                             accent: false },
    { key: 'Presyong balik-puhunan',   val: `₱${be}`,                              accent: 'burnt' },
    {
      key: isProfit ? 'Kita sa alok' : 'Lugi sa alok',
      val: pl >= 0
        ? `+₱${Math.abs(pl).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
        : `−₱${Math.abs(pl).toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
      accent: isProfit ? 'olive' : 'pula',
    },
  ] : [];

  return (
    <div className="screen-body" style={{ background: screenBg, transition: 'background 0.4s' }}>

      {/* Total cost header — shown only when there are expenses */}
      {totalExpenses > 0 && (
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: 8,
        }}>
          <div style={{
            fontFamily: FONTS.duvet, fontSize: 'clamp(18px, 3.5vw, 24px)',
            color: COLORS.dark, letterSpacing: 2, textTransform: 'uppercase',
          }}>
            Suriin ang tamang presyo:
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontFamily: FONTS.duvet, fontSize: 'clamp(14px, 2.8vw, 18px)',
              fontWeight: 700, color: COLORS.dark, letterSpacing: 2, textTransform: 'uppercase',
            }}>
              Kabuuang Gastos
            </div>
            <div style={{
              fontFamily: FONTS.duvet, fontSize: 'clamp(18px, 3.5vw, 24px)',
              color: COLORS.pula, letterSpacing: 1, fontWeight: 700,
            }}>
              ₱{totalExpenses.toLocaleString()}
            </div>
          </div>
        </div>
      )}

      {/* Harvest input — shown when there are expenses */}
      {totalExpenses > 0 && (
        <HarvestInput
          value={harvest}
          onChange={(v) => {
            setHarvest(v);
            clearTimeout(saveTimerRef.current);
            saveTimerRef.current = setTimeout(() => saveHarvestWeight(v), 600);
          }}
        />
      )}

      {/* Break-even display — shown only when ready */}
      {isReady && <BreakEvenDisplay breakEvenPrice={be} />}

      {/* Slider — shown only when ready. toQuarter is applied inside NegotiationSlider. */}
      {isReady && (
        <NegotiationSlider
          value={offer}
          onChange={(v) => setOffer(v)}
          breakEvenPrice={be}
          isProfitable={isProfit}
          max={sliderMax}
          min={SLIDER_MIN}
        />
      )}

      {/* Summary table — shown only when ready */}
      {isReady && (
        <div style={{ ...CARD_STYLE, overflow: 'hidden' }}>
          {summaryRows.map((row, i, arr) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '11px 16px',
              borderBottom: i < arr.length - 1 ? `1px solid ${COLORS.tan1}` : 'none',
            }}>
              <span style={{ fontSize: 12, color: COLORS.muted, fontWeight: 600 }}>
                {row.key}
              </span>
              <span style={{
                fontFamily: FONTS.duvet, fontSize: 15, letterSpacing: 0.5,
                color:
                  row.accent === 'burnt' ? COLORS.burnt :
                  row.accent === 'olive' ? COLORS.olive :
                  row.accent === 'pula'  ? COLORS.pula  : COLORS.dark,
                transition: 'color 0.4s',
              }}>
                {row.val}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Empty state — no expenses yet */}
      {!isReady && totalExpenses === 0 && (
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: 10, textAlign: 'center', paddingBottom: 40,
        }}>
          <span style={{ fontSize: 52, opacity: 0.4 }}>⚖️</span>
          <span style={{
            fontFamily: FONTS.duvet,
            fontSize: 'clamp(18px, 3.5vw, 22px)',
            letterSpacing: 2, textTransform: 'uppercase', color: COLORS.dark,
          }}>
            Maglista muna ng gastos
          </span>
          <span style={{
            fontSize: 'clamp(13px, 2.5vw, 15px)',
            lineHeight: 1.6, color: COLORS.dark, fontWeight: 500,
          }}>
            Para makita ang tamang presyo.
          </span>
        </div>
      )}
    </div>
  );
}

