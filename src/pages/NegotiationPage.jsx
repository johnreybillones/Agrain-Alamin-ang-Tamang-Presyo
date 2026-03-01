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

  // Derived state — matches LevelAppV2's NegoScreen logic exactly
  const kg = parseFloat(harvest) || 0;
  const be = kg > 0 && totalExpenses > 0
    ? Math.round((totalExpenses / kg) * 100) / 100
    : null;
  const isReady = be !== null;
  const SLIDER_MAX = be !== null
    ? Math.max(Math.round(be * 1.5 * 100) / 100, 80)
    : 80;
  const toQuarter = (v) => Math.round(v * 4) / 4;

  const [offer, setOffer] = useState(SLIDER_MIN);
  const isProfit = isReady && offer >= be - 0.005;

  // Clamp offer to break-even when first computed
  useEffect(() => {
    if (isReady && be !== null) {
      const clamped = Math.min(SLIDER_MAX, Math.max(SLIDER_MIN, be));
      setOffer(clamped);
    }
  }, [isReady, be, SLIDER_MAX]);

  // Vibrate only on the transition from profit → loss (not on every update)
  const prevProfitRef = useRef(true);
  useEffect(() => {
    if (isReady && !isProfit && prevProfitRef.current) {
      checkOffer(offer, be); // fires navigator.vibrate internally
    }
    prevProfitRef.current = isProfit;
  }, [offer, isProfit, isReady, be]);

  // Persist harvest weight to season store
  async function saveHarvestWeight() {
    if (!season || kg <= 0) return;
    await updateSeason(season.id, { totalWeight: kg, totalExpenseValue: totalExpenses });
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
          onChange={(v) => { setHarvest(v); saveHarvestWeight(); }}
        />
      )}

      {/* Break-even display — shown only when ready */}
      {isReady && <BreakEvenDisplay breakEvenPrice={be} />}

      {/* Slider — shown only when ready */}
      {isReady && (
        <NegotiationSlider
          value={offer}
          onChange={(v) => setOffer(toQuarter(v))}
          breakEvenPrice={be}
          isProfitable={isProfit}
          max={SLIDER_MAX}
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

