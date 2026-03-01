import { useState, useEffect, useRef } from "react";

const FONTS = {
  logo:    "'Righteous', 'Arial Black', sans-serif",
  duvet:   "'Bebas Neue', 'Arial Narrow', sans-serif",
  rustyne: "'Playfair Display', Georgia, serif",
  body:    "'Helvetica Neue', Helvetica, Arial, sans-serif",
};

const C = {
  cream:      "#FEFAE0",
  tan1:       "#EFDCAC",
  tan2:       "#D4A373",
  burnt:      "#BC6C25",
  olive:      "#606C38",
  dark:       "#45462A",
  pula:       "#C0392B",
  pulaLight:  "#FDF0EE",
  pulaBorder: "rgba(192,57,43,0.25)",
  berde:      "#3B7D3E",
  berdeLight: "#EEF5EE",
  berdeBorder:"rgba(59,125,62,0.28)",
  white:      "#FFFFFF",
  line:       "#E0D4B0",
  muted:      "#8B7D5A",
  shadow:     "rgba(69,70,42,0.12)",
};

const card = {
  background: C.white,
  border: `1.5px solid ${C.line}`,
  borderRadius: 18,
  overflow: "hidden",
  boxShadow: `0 2px 12px ${C.shadow}`,
};

/* ─── SMALL COMPONENTS ──────────────────────── */

function TopBar() {
  return (
    <header className="level-topbar">
      <div className="topbar-inner">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18 }}>🌾</span>
          <span style={{
            fontFamily: FONTS.logo, fontSize: "clamp(20px, 4vw, 26px)",
            color: C.tan1, letterSpacing: 3, textTransform: "uppercase", lineHeight: 1,
          }}>Level</span>
        </div>
        <span style={{
          fontFamily: FONTS.rustyne, fontStyle: "italic",
          fontSize: "clamp(9px, 1.8vw, 11px)",
          color: C.tan1, letterSpacing: 0.5, opacity: 0.55,
        }}>Alamin ang tamang presyo.</span>
      </div>
    </header>
  );
}

function BottomNav({ active, onNav }) {
  const items = [
    { key: "sakahan", icon: "🛖", label: "Kamalig" },
    { key: "gastos",  icon: "📋", label: "Gastos"  },
    { key: "nego",    icon: "⚖️", label: "Benta" },
  ];
  return (
    <nav className="level-bottomnav">
      {items.map(it => (
        <button
          key={it.key}
          onClick={() => onNav(it.key)}
          className="nav-btn"
        >
          <span style={{ fontSize: "clamp(20px, 4vw, 24px)" }}>{it.icon}</span>
          <span style={{
            fontSize: "clamp(9px, 1.8vw, 11px)",
            fontWeight: active === it.key ? 800 : 500,
            color: active === it.key ? C.burnt : C.muted,
            letterSpacing: 0.5, textTransform: "uppercase",
          }}>
            {it.label}
          </span>
          {active === it.key && (
            <div style={{ width: 24, height: 3, borderRadius: 2, background: C.burnt, marginTop: 2 }} />
          )}
        </button>
      ))}
    </nav>
  );
}

function ActionBtn({ variant, onClick, children, disabled }) {
  const bg = variant === "olive"
    ? `linear-gradient(135deg, ${C.dark}, ${C.olive})`
    : `linear-gradient(135deg, #9A4A10, ${C.burnt})`;
  const shadow = variant === "olive"
    ? "0 4px 16px rgba(96,108,56,0.35)"
    : "0 4px 16px rgba(188,108,37,0.35)";

  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: "100%", border: "none", borderRadius: 16,
      padding: "clamp(18px, 4vw, 26px) 24px",
      fontFamily: FONTS.duvet, fontSize: "clamp(18px, 3.5vw, 22px)",
      letterSpacing: 2, textTransform: "uppercase",
      color: C.cream, background: disabled ? C.tan1 : bg,
      boxShadow: disabled ? "none" : shadow,
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "all 0.2s",
      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
    }}>
      {children}
    </button>
  );
}

function SuccessFlash({ visible }) {
  if (!visible) return null;
  return (
    <div className="success-flash">
      <div style={{
        width: 80, height: 80, borderRadius: "50%",
        background: "rgba(254,250,224,0.25)",
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "pulseCheck 0.6s ease-out",
      }}>
        <span style={{ fontSize: 48, color: C.cream }}>✓</span>
      </div>
      <span style={{
        fontFamily: FONTS.duvet, fontSize: "clamp(18px, 4vw, 24px)",
        color: C.cream, letterSpacing: 3, textTransform: "uppercase",
      }}>
        Nailista na
      </span>
    </div>
  );
}

/* ─── SCREEN: SAKAHAN ─────────────────────────── */

function SakahanScreen({ expenses, onLog, onNego }) {
  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const bucketFill = Math.min((total / 35000) * 100, 100);

  return (
    <div className="screen-body">
      <div style={{
        ...card, border: `2px solid ${C.tan2}`,
        background: `linear-gradient(145deg, ${C.white}, ${C.cream})`,
      }}>
        <div style={{ padding: "16px 20px 0", textAlign: "center" }}>
          <div style={{
            fontFamily: FONTS.duvet, fontSize: "clamp(14px, 3vw, 18px)", fontWeight: 700,
            color: C.dark, letterSpacing: 3, textTransform: "uppercase", marginBottom: 4,
          }}>Kabuuang Gastos</div>
        </div>

        <div className="bucket-tank">
          <div className="bucket-fill" style={{ height: `${bucketFill}%` }} />
          {bucketFill > 5 && <div className="bucket-wave" style={{ bottom: `${bucketFill}%` }} />}
          <div className="bucket-label">
            <div style={{
              fontFamily: FONTS.duvet, fontSize: "clamp(28px, 6vw, 38px)",
              color: C.dark, letterSpacing: -1, lineHeight: 1,
              display: "flex", alignItems: "flex-start", gap: 2,
              textShadow: "0 1px 6px rgba(254,250,224,0.7)",
            }}>
              <span style={{ fontSize: "clamp(18px, 3.5vw, 24px)", color: C.burnt, paddingTop: 4 }}>₱</span>
              <span>{total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div style={{ padding: "6px 20px 14px", textAlign: "center" }}>
          <div style={{ fontSize: "clamp(11px, 2.2vw, 13px)", color: C.muted, fontWeight: 500 }}>
            {expenses.length > 0
              ? `${expenses.length} ang gastos ngayong panahon ng pagtatanim`
              : "Wala pang nakalista— pindutin ang \"Maglista ng Gastos\""}
          </div>
        </div>
      </div>

      <ActionBtn variant="olive" onClick={onLog}>📝&nbsp;Maglista ng Gastos</ActionBtn>
      <ActionBtn variant="burnt" onClick={onNego}>⚖️&nbsp;Magkano dapat ang benta?</ActionBtn>
    </div>
  );
}

/* ─── SCREEN: GASTOS ─────────────────────────── */

function GastosScreen({ expenses, onLog, onDelete }) {
  const total = expenses.reduce((s, e) => s + e.amount, 0);

  return (
    <div className="screen-body gastos-screen-layout">
      <div className="gastos-header" style={{ flexShrink: 0 }}>
        <div style={{ marginBottom: 4, textAlign: "right" }}>
          <span style={{
            fontFamily: FONTS.duvet, fontSize: "clamp(14px, 2.8vw, 18px)",
            color: C.dark, letterSpacing: 2, textTransform: "uppercase",
          }}>Kabuuang gastos: </span>
          <span style={{
            fontFamily: FONTS.duvet, fontSize: "clamp(18px, 3.5vw, 24px)",
            letterSpacing: 1, color: C.pula, fontWeight: 700,
          }}>₱{total.toLocaleString()}</span>
        </div>

        <ActionBtn variant="olive" onClick={onLog}>📝&nbsp;Maglista ng Gastos</ActionBtn>

        <div style={{
          fontFamily: FONTS.duvet, fontSize: "clamp(18px, 3.5vw, 24px)",
          color: C.dark, letterSpacing: 2, textTransform: "uppercase",
          marginTop: 20, marginBottom: 6,
        }}>Mga gastos:</div>
      </div>

      <div className="gastos-list-box">
        {expenses.length === 0 ? (
          <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: "40px 20px", color: C.muted, minHeight: 120,
          }}>
            <span style={{ fontSize: 14, textAlign: "center", lineHeight: 1.6 }}>
              Walang nakalista, pindutin ang "Maglista ng Gastos" para magsimula.
            </span>
          </div>
        ) : (
          <div className="expense-list">
            {expenses.map((e, i) => (
              <ExpenseFullRow key={i} expense={e} index={i} onDelete={onDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ExpenseFullRow({ expense, index, onDelete }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const dateTimeDisplay = expense.dateTime || expense.date || "";

  return (
    <>
      <div style={{
        ...card, display: "flex", alignItems: "center", gap: "clamp(10px, 2vw, 14px)",
        padding: "clamp(10px, 2vw, 14px)", minHeight: 64,
      }}>
        <div style={{
          width: "clamp(44px, 10vw, 56px)", height: "clamp(44px, 10vw, 56px)", borderRadius: 10, overflow: "hidden",
          flexShrink: 0, background: C.tan1, display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {expense.photo ? (
            <img src={expense.photo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <span style={{ fontSize: 22 }}>{expense.emoji}</span>
          )}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: "clamp(13px, 2.5vw, 15px)", fontWeight: 700, color: C.dark }}>{expense.name}</div>
          <div style={{ fontSize: "clamp(10px, 2vw, 12px)", color: C.muted, marginTop: 2 }}>{dateTimeDisplay}</div>
        </div>

        <div style={{ flexShrink: 0, textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
          <span style={{
            fontSize: "clamp(16px, 3.2vw, 20px)", fontWeight: 800, color: C.pula,
            fontFamily: FONTS.duvet, letterSpacing: 0.5,
          }}>₱{expense.amount.toLocaleString()}</span>
          <span style={{
            fontSize: 9, fontWeight: 800, padding: "2px 8px", borderRadius: 100,
            background: ({ S: "#FFF8E1", M: "#FFF3CD", L: "#F5B7B1" })[expense.size],
            color: ({ S: "#8B6914", M: "#B8860B", L: "#CD6155" })[expense.size],
            letterSpacing: 0.5,
          }}>{({ S: "MALIIT", M: "KATAMTAMAN", L: "MALAKI" })[expense.size]}</span>
        </div>

        <button
          onClick={() => setShowDeleteConfirm(true)}
          style={{
            width: 40, height: 40, borderRadius: 10, border: "none",
            background: C.pulaLight, color: C.pula, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, flexShrink: 0,
          }}
          aria-label="Alisin sa listahan"
        >
          🗑️
        </button>
      </div>

      {showDeleteConfirm && (
        <div
          className="modal-overlay"
          onClick={(e) => { if (e.target === e.currentTarget) setShowDeleteConfirm(false); }}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <div style={{
            background: C.cream, borderRadius: 18, padding: "28px 24px",
            maxWidth: 360, width: "90%", boxShadow: `0 8px 32px ${C.shadow}`,
          }} onClick={e => e.stopPropagation()}>
            <div style={{
              fontFamily: FONTS.duvet, fontSize: "clamp(18px, 3.5vw, 22px)",
              color: C.dark, letterSpacing: 2, textTransform: "uppercase",
              textAlign: "center", marginBottom: 24, lineHeight: 1.4,
            }}>Alisin na ito sa listahan?</div>
            <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
              <button
                onClick={() => { onDelete(index); setShowDeleteConfirm(false); }}
                style={{
                  padding: "16px 32px", borderRadius: 14, border: "none",
                  background: C.pula, color: C.white, fontFamily: FONTS.duvet,
                  fontSize: "clamp(16px, 3.2vw, 18px)", letterSpacing: 2, cursor: "pointer",
                }}
              >Oo</button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                style={{
                  padding: "16px 32px", borderRadius: 14, border: `2px solid ${C.tan2}`,
                  background: C.white, color: C.dark, fontFamily: FONTS.duvet,
                  fontSize: "clamp(16px, 3.2vw, 18px)", letterSpacing: 2, cursor: "pointer",
                }}
              >Huwag</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── SCREEN: NEGOSASYON ─────────────────────── */

function NegoScreen({ expenses }) {
  const [harvest, setHarvest] = useState("");
  const SLIDER_MIN = 1;
  const [offer, setOffer] = useState(SLIDER_MIN);
  const totalCost = expenses.reduce((s, e) => s + e.amount, 0);
  const kg = parseFloat(harvest) || 0;
  const be = kg > 0 && totalCost > 0 ? Math.round((totalCost / kg) * 100) / 100 : null;
  const isReady = be !== null;
  const SLIDER_MAX = be !== null ? Math.max(Math.round(be * 1.5 * 100) / 100, 80) : 80;
  const toQuarter = (v) => Math.round(v * 4) / 4;
  const isProfit = isReady && offer >= be - 0.005;

  useEffect(() => {
    if (isReady && be !== null) {
      const clamped = Math.min(SLIDER_MAX, Math.max(SLIDER_MIN, be));
      setOffer(clamped);
    }
  }, [isReady, be, SLIDER_MAX]);

  const prevProfitRef = useRef(true);
  useEffect(() => {
    if (isReady && !isProfit && prevProfitRef.current && navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }
    prevProfitRef.current = isProfit;
  }, [offer, isProfit, isReady]);

  const bePct = be ? ((be - SLIDER_MIN) / (SLIDER_MAX - SLIDER_MIN)) * 100 : 50;
  const pl = kg > 0 ? offer * kg - totalCost : null;

  const screenBg = !isReady ? C.cream : isProfit ? "#66BB6A" : "#EF5350";

  return (
    <div className="screen-body" style={{ background: screenBg, transition: "background 0.4s" }}>

      {totalCost > 0 && (
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8,
        }}>
          <div style={{
            fontFamily: FONTS.duvet, fontSize: "clamp(18px, 3.5vw, 24px)",
            color: C.dark, letterSpacing: 2, textTransform: "uppercase",
          }}>Suriin ang tamang presyo:</div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: FONTS.duvet, fontSize: "clamp(14px, 2.8vw, 18px)", fontWeight: 700, color: C.dark, letterSpacing: 2, textTransform: "uppercase" }}>
              Kabuuang Gastos
            </div>
            <div style={{ fontFamily: FONTS.duvet, fontSize: "clamp(18px, 3.5vw, 24px)", color: C.pula, letterSpacing: 1, fontWeight: 700 }}>
              ₱{totalCost.toLocaleString()}
            </div>
          </div>
        </div>
      )}

      {totalCost > 0 && (
      <div style={{ ...card, padding: "clamp(12px, 2.5vw, 18px)" }}>
        <div style={{
          fontFamily: FONTS.duvet, fontSize: "clamp(16px, 3.5vw, 22px)", fontWeight: 700,
          color: C.dark, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10,
        }}>Ilang kilo ang ani?</div>
        <input
          type="number" value={harvest}
          onChange={e => setHarvest(e.target.value)}
          placeholder="(Halimbawa: 500)"
          className="harvest-input"
          style={{ borderColor: harvest ? C.burnt : C.tan1 }}
        />
        <div style={{ fontSize: "clamp(13px, 2.5vw, 15px)", color: C.dark, marginTop: 10, lineHeight: 1.5, fontWeight: 500 }}>
          Ilagay ang timbang para makita ang tamang presyo.
        </div>
      </div>
      )}

      {isReady && (
        <>
          <div style={{
            ...card, padding: "clamp(12px, 2vw, 16px) clamp(14px, 2.5vw, 20px)",
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
            border: `2px solid ${C.berde}`, background: `linear-gradient(135deg, ${C.berdeLight}, ${C.white})`,
          }}>
            <div style={{
              fontFamily: FONTS.duvet, fontSize: "clamp(14px, 2.8vw, 18px)", fontWeight: 700,
              color: C.dark, letterSpacing: 2, textTransform: "uppercase",
            }}>Presyong Balik-Puhunan</div>
            <div style={{ fontFamily: FONTS.duvet, fontSize: "clamp(24px, 4.5vw, 32px)", color: C.berde, letterSpacing: 1, fontWeight: 800 }}>
              ₱{Math.round(be * 100) / 100}/kg
            </div>
          </div>

          <div style={{ ...card, padding: "clamp(12px, 2.5vw, 16px) clamp(14px, 3vw, 20px)" }}>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 12,
            }}>
              <div style={{
                fontFamily: FONTS.duvet, fontSize: "clamp(14px, 2.8vw, 18px)", fontWeight: 700,
                color: C.dark, letterSpacing: 2, textTransform: "uppercase",
              }}>Magkano ang alok ng buyer? (kada kilo)</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, justifyContent: "flex-end" }}>
                <div style={{ textAlign: "right", lineHeight: 1.2 }}>
                  <div style={{
                    fontFamily: FONTS.duvet, fontSize: "clamp(16px, 3.2vw, 20px)", fontWeight: 800,
                    color: isProfit ? C.berde : C.pula, letterSpacing: 2, textTransform: "uppercase",
                  }}>{isProfit ? "SULIT!" : "LUGI!"}</div>
                  <div style={{
                    fontSize: "clamp(10px, 2vw, 12px)", color: C.dark, fontWeight: 500, marginTop: 0,
                  }}>{isProfit ? "may kita ka na rito" : "tumanggi nalang"}</div>
                </div>
                <div style={{
                  fontFamily: FONTS.duvet, fontSize: "clamp(24px, 4.5vw, 32px)", color: isProfit ? C.berde : C.pula, fontWeight: 800,
                }}>₱{offer.toFixed(2)}/kg</div>
              </div>
            </div>
            <div style={{ position: "relative", paddingTop: 4 }}>
              <div style={{
                position: "absolute", left: `${Math.min(100, Math.max(0, bePct))}%`, top: -20,
                transform: "translateX(-50%)", zIndex: 5, pointerEvents: "none",
                display: "flex", flexDirection: "column", alignItems: "center",
              }}>
                <div style={{
                  fontFamily: FONTS.duvet, fontSize: "clamp(11px, 2.2vw, 14px)", color: C.burnt, fontWeight: 700,
                  textAlign: "center", marginBottom: 2, whiteSpace: "nowrap",
                }}>₱{Math.round(be * 100) / 100}</div>
                <div style={{
                  width: 2, height: 24, borderRadius: 1,
                  background: C.burnt, boxShadow: "0 0 8px rgba(188,108,37,0.5)",
                }} />
              </div>
              <input
                type="range" min={SLIDER_MIN} max={SLIDER_MAX} step={0.01} value={offer}
                onChange={e => setOffer(toQuarter(parseFloat(e.target.value)))}
                className="offer-slider"
                style={{ accentColor: isProfit ? C.olive : C.pula }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
              <span style={{ fontSize: 10, color: C.muted, fontWeight: 600 }}>₱{SLIDER_MIN}/kg</span>
              <span style={{ fontSize: 10, color: C.muted, fontWeight: 600 }}>₱{SLIDER_MAX}/kg</span>
            </div>
          </div>

          <div style={{ ...card, overflow: "hidden" }}>
            {[
              { key: "Kabuuang Gastos", val: `₱${totalCost.toLocaleString()}`, accent: false },
              { key: "Timbang ng Ani", val: `${kg} kg`, accent: false },
              { key: "Presyong balik-puhunan", val: `₱${be}`, accent: "burnt" },
              {
                key: isProfit ? "Kita sa alok" : "Lugi sa alok",
                val: pl >= 0 ? `+₱${Math.abs(pl).toLocaleString(undefined,{maximumFractionDigits:0})}` : `−₱${Math.abs(pl).toLocaleString(undefined,{maximumFractionDigits:0})}`,
                accent: isProfit ? "olive" : "pula",
              },
            ].map((row, i, arr) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "11px 16px",
                borderBottom: i < arr.length - 1 ? `1px solid ${C.tan1}` : "none",
              }}>
                <span style={{ fontSize: 12, color: C.muted, fontWeight: 600 }}>{row.key}</span>
                <span style={{
                  fontFamily: FONTS.duvet, fontSize: 15, letterSpacing: 0.5,
                  color: row.accent === "burnt" ? C.burnt : row.accent === "olive" ? C.olive : row.accent === "pula" ? C.pula : C.dark,
                  transition: "color 0.4s",
                }}>{row.val}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {!isReady && totalCost === 0 && (
        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 10, color: C.muted, textAlign: "center", paddingBottom: 40,
        }}>
          <span style={{ fontSize: 52, opacity: 0.4 }}>⚖️</span>
          <span style={{ fontFamily: FONTS.duvet, fontSize: "clamp(18px, 3.5vw, 22px)", letterSpacing: 2, textTransform: "uppercase", color: C.dark }}>Maglista muna ng gastos</span>
          <span style={{ fontSize: "clamp(13px, 2.5vw, 15px)", lineHeight: 1.6, color: C.dark, fontWeight: 500 }}>
            Para makita ang tamang presyo.
          </span>
        </div>
      )}

    </div>
  );
}

const SIZES_AMOUNT = { S: 300, M: 1500, L: 3500 };
const CATS = {
  "Binhi": "🌱", "Pataba": "🧪", "Tubig": "💧",
  "Tauhan": "👷", "Kagamitan": "🚜", "Iba pa": "📦",
};

/* ─── LOG MODAL ──────────────────────────────── */

function LogModal({ visible, onClose, onSave }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [step, setStep] = useState("camera");
  const [photoData, setPhotoData] = useState(null);
  const [size, setSize] = useState("");
  const [cat, setCat] = useState("");
  const [saving, setSaving] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  function stopCamera() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
  }

  function reset() {
    stopCamera();
    setStep("camera");
    setPhotoData(null);
    setSize("");
    setCat("");
  }

  function handleCancel() {
    reset();
    onClose();
  }

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    setStep("camera");
    setPhotoData(null);

    navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 960 } },
    }).then(stream => {
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    }).catch(() => {
      setStep("form");
    });

    return () => stopCamera();
  }, [visible]);

  function handleRetakePhoto() {
    setPhotoData(null);
    setStep("camera");
    navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 960 } },
    }).then(stream => {
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    }).catch(() => setStep("form"));
  }

  function handleCapture() {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
    setPhotoData(canvas.toDataURL("image/jpeg", 0.8));
    stopCamera();
    setStep("form");
  }

  function handleSave() {
    setSaving(true);
    setTimeout(() => {
      const now = new Date();
      const date = now.toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      });
      const time = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const dateTime = `${date} - ${time}`;
      onSave({ name: cat, emoji: CATS[cat], size, amount: SIZES_AMOUNT[size], date, dateTime, photo: photoData });
      reset();
      setSaving(false);
      onClose();
    }, 300);
  }

  if (!visible) return null;

  const sizeOpts = [
    { key: "S", label: "MALIIT", sub: "mababa sa P500", bars: [14], iconColor: "#FFECB3" },
    { key: "M", label: "KATAMTAMAN", sub: "P500–P2,500", bars: [14, 22, 14], iconColor: "#B8860B" },
    { key: "L", label: "MALAKI", sub: "higit pa sa P2,500", bars: [16, 28, 16], iconColor: C.pula },
  ];

  if (step === "camera") {
    return (
      <div className="camera-fullscreen">
        <video ref={videoRef} autoPlay playsInline muted className="camera-video" />
        <div className="camera-controls">
          <button onClick={handleCancel} className="camera-cancel-btn">Kanselahin</button>
          <button onClick={handleCapture} className="camera-capture-btn">
            <div className="camera-capture-inner" />
          </button>
          <div style={{ width: 80 }} />
        </div>
      </div>
    );
  }

  return (
    <div className="log-form-fullscreen">
      <div className="log-form-content">
        <div style={{
          fontFamily: FONTS.duvet, fontSize: "clamp(16px, 4vw, 24px)",
          color: C.dark, letterSpacing: 2, textTransform: "uppercase",
          flexShrink: 0,
        }}>Gastusin:</div>

        {photoData && (
          <div style={{
            borderRadius: 14, overflow: "hidden", flexShrink: 0,
            minHeight: 64,
            border: `2px solid ${C.olive}`, position: "relative",
          }}>
            <img src={photoData} alt="Litrato" style={{ width: "100%", display: "block", maxHeight: "14vh", objectFit: "cover" }} />
            <button
              onClick={handleRetakePhoto}
              style={{
                position: "absolute", top: 8, right: 8,
                background: C.pula, color: C.white,
                fontSize: "clamp(11px, 2.2vw, 14px)", fontWeight: 700, padding: "6px 12px",
                borderRadius: 100, letterSpacing: 0.5, border: "none",
                cursor: "pointer", fontFamily: FONTS.body,
              }}
            >⟳ Ulitin ang pag-picture</button>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", flexShrink: 0, gap: 8 }}>
          <div style={{ fontFamily: FONTS.duvet, fontSize: "clamp(13px, 2.8vw, 18px)", fontWeight: 700, color: C.dark, letterSpacing: 2, textTransform: "uppercase", flexShrink: 0 }}>
            Gaano kalaki ang gastos?
          </div>
          <div className="size-grid">
            {sizeOpts.map(opt => {
            const isActive = size === opt.key;
            return (
              <div key={opt.key} onClick={() => setSize(opt.key)} className="size-card" data-active={isActive}
                style={{
                  background: isActive ? "#A5D6A7" : C.white,
                  border: isActive ? `3px solid ${C.berde}` : `1.5px solid ${C.tan1}`,
                }}>
                <div style={{ display: "flex", gap: 2, alignItems: "flex-end", height: 24 }}>
                  {opt.bars.map((h, i) => (
                    <div key={i} style={{
                      width: 8, height: h * 1.2, borderRadius: 4,
                      background: opt.iconColor,
                    }} />
                  ))}
                </div>
                <span style={{
                  fontSize: "clamp(12px, 2.6vw, 16px)", fontWeight: 800,
                  color: isActive ? C.dark : C.burnt,
                  letterSpacing: 0.5, textAlign: "center",
                }}>{opt.label}</span>
                <span style={{ fontSize: "clamp(10px, 2vw, 12px)", color: isActive ? C.dark : C.burnt, textAlign: "center", opacity: isActive ? 1 : 0.9 }}>{opt.sub}</span>
              </div>
            );
          })}
          </div>

          <div style={{ fontFamily: FONTS.duvet, fontSize: "clamp(13px, 2.8vw, 18px)", fontWeight: 700, color: C.dark, letterSpacing: 2, textTransform: "uppercase", flexShrink: 0, marginTop: 8 }}>
            Para saan ito?
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "clamp(10px, 1.5vw, 16px)", minWidth: 0 }}>
          {Object.entries(CATS).map(([name, emoji]) => (
            <div key={name} onClick={() => setCat(name)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                padding: "clamp(10px, 1.5vh, 14px) clamp(10px, 1.8vw, 16px)", borderRadius: 12,
                minHeight: 44,
                border: cat === name ? `3px solid #1B5E20` : `1.5px solid ${C.tan1}`,
                background: cat === name ? "#A5D6A7" : C.white,
                fontSize: "clamp(13px, 2.6vw, 16px)", fontWeight: 600,
                color: C.dark,
                cursor: "pointer", transition: "all 0.2s",
              }}>
              <span style={{ fontSize: "clamp(16px, 3vw, 20px)" }}>{emoji}</span>{name}
            </div>
          ))}
          </div>
        </div>

        <button
          onClick={() => {
            if (saving) return;
            if (!size || !cat) setShowWarning(true);
            else handleSave();
          }}
          disabled={saving}
          style={{
            width: "100%", border: "none", borderRadius: 16,
            padding: "clamp(12px, 2.5vh, 20px) 20px",
            fontFamily: FONTS.duvet, fontSize: "clamp(16px, 3.5vw, 22px)",
            flexShrink: 0, minHeight: 44,
            letterSpacing: 2, textTransform: "uppercase",
            color: C.cream,
            background: saving ? C.tan1 : (size && cat) ? `linear-gradient(135deg, ${C.dark}, ${C.olive})` : `linear-gradient(135deg, ${C.dark}, ${C.olive})`,
            opacity: (size && cat) || saving ? 1 : 0.6,
            boxShadow: saving ? "none" : "0 4px 16px rgba(96,108,56,0.35)",
            cursor: saving ? "not-allowed" : "pointer",
            transition: "all 0.2s",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}
        >
          {saving ? "Sine-save..." : "Ilista na"}
        </button>
        {showWarning && (
          <div
            className="modal-overlay"
            style={{ alignItems: "center", justifyContent: "center" }}
            onClick={(e) => { if (e.target === e.currentTarget) setShowWarning(false); }}
          >
            <div style={{
              background: C.cream, borderRadius: 18, padding: "28px 24px",
              maxWidth: 360, width: "90%", boxShadow: `0 8px 32px ${C.shadow}`,
            }} onClick={e => e.stopPropagation()}>
              <div style={{
                fontFamily: FONTS.duvet, fontSize: "clamp(20px, 4.5vw, 26px)",
                color: C.dark, textAlign: "center", marginBottom: 24, lineHeight: 1.4,
                letterSpacing: 1,
              }}>Tukuyin muna ang impormasyon bago ito malista</div>
              <button
                onClick={() => setShowWarning(false)}
                style={{
                  width: "100%", padding: "18px", borderRadius: 14, border: "none",
                  background: C.olive, color: C.cream, fontFamily: FONTS.duvet,
                  fontSize: "clamp(18px, 4vw, 22px)", letterSpacing: 2, cursor: "pointer",
                }}
              >Okay</button>
            </div>
          </div>
        )}
        <button
          onClick={handleCancel}
          style={{
            width: "100%",
            padding: "clamp(10px, 1.5vh, 14px) 20px", borderRadius: 14,
            flexShrink: 0, minHeight: 42,
            border: `2px solid ${C.pula}`,
            background: C.white, color: C.pula,
            fontFamily: FONTS.duvet, fontSize: "clamp(18px, 3.5vw, 24px)",
            letterSpacing: 2, textTransform: "uppercase",
            cursor: "pointer", transition: "all 0.2s",
          }}
        >Kansela</button>
      </div>
    </div>
  );
}

/* ── ROOT APP ── */

export default function LevelApp() {
  const [screen, setScreen] = useState("sakahan");
  const [expenses, setExpenses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  function handleSave(expense) {
    setExpenses(prev => [expense, ...prev]);
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 1100);
    if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
  }

  function handleDeleteExpense(index) {
    setExpenses(prev => prev.filter((_, i) => i !== index));
  }

  return (
    <>
      <GlobalStyles />
      <div className={`level-root ${screen === "gastos" ? "gastos-page-active" : ""}`}>
        <TopBar />

        {screen === "sakahan" && (
          <SakahanScreen
            expenses={expenses}
            onLog={() => setShowModal(true)}
            onNego={() => setScreen("nego")}
          />
        )}
        {screen === "gastos" && (
          <GastosScreen expenses={expenses} onLog={() => setShowModal(true)} onDelete={handleDeleteExpense} />
        )}
        {screen === "nego" && (
          <NegoScreen expenses={expenses} />
        )}

        <BottomNav active={screen} onNav={setScreen} />

        <LogModal visible={showModal} onClose={() => setShowModal(false)} onSave={handleSave} />
        <SuccessFlash visible={showFlash} />
      </div>
    </>
  );
}

/* ── GLOBAL STYLES ── */

function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Righteous&family=Bebas+Neue&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
      body { background: ${C.cream}; font-family: ${FONTS.body}; overflow-x: hidden; }

      @keyframes sheetUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
      @keyframes flashAnim { 0%{opacity:0} 15%{opacity:1} 75%{opacity:1} 100%{opacity:0} }
      @keyframes vibBlink { 0%,100%{opacity:1} 50%{opacity:0.2} }
      @keyframes pulseCheck { 0%{transform:scale(0.3);opacity:0} 50%{transform:scale(1.15)} 100%{transform:scale(1);opacity:1} }

      .level-root {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        min-height: 100dvh;
        background: ${C.cream};
        position: relative;
      }
      .level-root.gastos-page-active {
        height: 100vh;
        height: 100dvh;
        overflow: hidden;
      }

      .level-topbar {
        position: sticky; top: 0; z-index: 40;
        background: ${C.dark};
        border-bottom: 2px solid ${C.burnt};
        flex-shrink: 0;
      }
      .topbar-inner {
        max-width: 720px;
        margin: 0 auto;
        padding: 14px clamp(14px, 3vw, 24px);
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .season-pill {
        background: ${C.olive}; color: ${C.tan1};
        font-size: clamp(9px, 1.8vw, 11px); font-weight: 700;
        padding: 6px 14px; border-radius: 100px;
        letter-spacing: 0.5;
        border: 1px solid ${C.burnt};
        white-space: nowrap;
      }

      .level-bottomnav {
        position: sticky; bottom: 0; z-index: 40;
        background: ${C.cream};
        border-top: 2px solid ${C.tan1};
        display: flex;
        flex-shrink: 0;
        max-width: 720px;
        width: 100%;
        margin: 0 auto;
        padding-bottom: env(safe-area-inset-bottom, 0px);
      }
      .nav-btn {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3px;
        padding: 10px 0 6px;
        border: none;
        background: none;
        cursor: pointer;
        font-family: ${FONTS.body};
      }

      .screen-body {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        overflow-x: hidden;
        padding: clamp(14px, 3vw, 24px);
        display: flex;
        flex-direction: column;
        gap: 14px;
        max-width: 720px;
        width: 100%;
        margin: 0 auto;
      }


      .bucket-tank {
        position: relative;
        height: clamp(110px, 20vw, 150px);
        margin: 8px clamp(14px, 3vw, 22px);
        background: ${C.cream};
        border: 2.5px solid ${C.tan2};
        border-radius: 16px;
        overflow: hidden;
      }
      .bucket-fill {
        position: absolute;
        bottom: 0; left: 0; right: 0;
        background: linear-gradient(to top, ${C.olive}cc, ${C.burnt}99);
        transition: height 0.8s cubic-bezier(0.22,1,0.36,1);
        border-radius: 0 0 13px 13px;
      }
      .bucket-wave {
        position: absolute;
        left: -5px; right: -5px;
        height: 8px;
        background: ${C.olive}55;
        border-radius: 50%;
        transform: translateY(50%);
        transition: bottom 0.8s cubic-bezier(0.22,1,0.36,1);
      }
      .bucket-label {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 2;
      }

      .expense-row {
        display: flex;
        align-items: center;
        gap: clamp(8px, 2vw, 12px);
        padding: clamp(8px, 2vw, 12px) clamp(10px, 2vw, 14px);
        background: ${C.white};
        border-radius: 12px;
        border: 1.5px solid ${C.line};
        margin-bottom: 8px;
      }
      .expense-icon {
        width: clamp(36px, 7vw, 44px);
        height: clamp(36px, 7vw, 44px);
        border-radius: 10px;
        background: ${C.cream};
        border: 1.5px solid ${C.tan1};
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: clamp(16px, 3vw, 20px);
        flex-shrink: 0;
      }
      .expense-icon-lg {
        width: clamp(40px, 8vw, 50px);
        height: clamp(40px, 8vw, 50px);
        border-radius: 12px;
        background: ${C.cream};
        border: 1.5px solid ${C.tan1};
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: clamp(18px, 3.5vw, 24px);
        flex-shrink: 0;
      }
      .expense-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .screen-body.gastos-screen-layout {
        overflow: hidden;
        gap: 0;
      }
      .gastos-screen-layout {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-height: 0;
      }
      .gastos-header {
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
      }
      .gastos-list-box {
        flex: 1;
        min-height: 0;
        overflow-y: scroll;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
        border: 2px solid ${C.tan1};
        border-radius: 14px;
        background: ${C.white};
        padding: 12px;
      }

      .harvest-input {
        width: 100%;
        background: ${C.cream};
        border: 2px solid ${C.tan1};
        border-radius: 10px;
        padding: clamp(10px, 2vw, 14px) 16px;
        font-family: ${FONTS.duvet};
        font-size: clamp(18px, 3.5vw, 24px);
        color: ${C.dark};
        outline: none;
        letter-spacing: 1;
        transition: border-color 0.2s;
      }

      .offer-slider {
        width: 100%;
        height: 8px;
        cursor: pointer;
        -webkit-appearance: none;
        appearance: none;
        border-radius: 4px;
        background: ${C.tan1};
      }
      .offer-slider::-webkit-slider-thumb {
        -webkit-appearance: none; appearance: none;
        width: clamp(30px, 6vw, 40px);
        height: clamp(30px, 6vw, 40px);
        border-radius: 50%;
        background: ${C.burnt};
        border: 3px solid ${C.cream};
        box-shadow: 0 2px 12px rgba(188,108,37,0.45);
        cursor: pointer;
      }
      .offer-slider::-moz-range-thumb {
        width: clamp(30px, 6vw, 40px);
        height: clamp(30px, 6vw, 40px);
        border-radius: 50%;
        background: ${C.burnt};
        border: 3px solid ${C.cream};
        box-shadow: 0 2px 12px rgba(188,108,37,0.45);
        cursor: pointer;
      }

      .modal-overlay {
        position: fixed; inset: 0;
        background: rgba(69,70,42,0.55);
        backdrop-filter: blur(3px);
        z-index: 50;
        display: flex;
        align-items: flex-end;
        justify-content: center;
      }
      .modal-sheet {
        background: ${C.cream};
        border-radius: 28px 28px 0 0;
        width: 100%;
        max-width: 600px;
        padding: 8px clamp(16px, 3vw, 24px) clamp(24px, 4vw, 36px);
        max-height: 90vh;
        max-height: 90dvh;
        overflow-y: auto;
        animation: sheetUp 0.35s cubic-bezier(0.22,1,0.36,1);
      }
      .camera-fullscreen {
        position: fixed;
        inset: 0;
        z-index: 100;
        background: #000;
        display: flex;
        flex-direction: column;
      }
      .log-form-fullscreen {
        position: fixed;
        inset: 0;
        z-index: 100;
        background: ${C.cream};
        display: flex;
        flex-direction: column;
        overflow: hidden;
        padding-bottom: env(safe-area-inset-bottom, 0px);
      }
      .log-form-fullscreen .log-form-content {
        -webkit-overflow-scrolling: touch;
      }
      .log-form-content {
        flex: 1;
        width: 100%;
        max-width: 720px;
        margin: 0 auto;
        padding: clamp(12px, 2vh, 20px) clamp(14px, 2.5vw, 24px) clamp(18px, 2.5vw, 28px);
        display: flex;
        flex-direction: column;
        gap: 14px;
        min-height: 0;
        overflow-y: auto;
        overflow-x: hidden;
      }
      .camera-video {
        flex: 1;
        width: 100%;
        object-fit: cover;
      }
      .camera-controls {
        position: absolute;
        bottom: 0; left: 0; right: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 24px clamp(20px, 5vw, 40px);
        padding-bottom: max(24px, env(safe-area-inset-bottom, 24px));
        background: linear-gradient(transparent, rgba(0,0,0,0.7));
      }
      .camera-cancel-btn {
        background: none;
        border: none;
        color: #fff;
        font-family: ${FONTS.body};
        font-size: clamp(14px, 3vw, 17px);
        font-weight: 600;
        cursor: pointer;
        padding: 10px 16px;
        border-radius: 10px;
        letter-spacing: 0.3px;
        width: 80px;
        text-align: center;
      }
      .camera-cancel-btn:active {
        background: rgba(255,255,255,0.15);
      }
      .camera-capture-btn {
        width: clamp(64px, 14vw, 80px);
        height: clamp(64px, 14vw, 80px);
        border-radius: 50%;
        border: 4px solid #fff;
        background: rgba(255,255,255,0.2);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.15s;
      }
      .camera-capture-btn:active {
        transform: scale(0.9);
      }
      .camera-capture-inner {
        width: calc(100% - 8px);
        height: calc(100% - 8px);
        border-radius: 50%;
        background: #fff;
      }
      .size-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: clamp(10px, 1.5vw, 16px);
        min-width: 0;
      }
      .size-card {
        border-radius: 12px;
        padding: clamp(10px, 1.5vh, 14px) clamp(10px, 1.8vw, 14px);
        min-width: 0;
        min-height: 60px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        cursor: pointer;
        transition: all 0.2s;
      }

      .success-flash {
        position: fixed; inset: 0;
        background: ${C.olive};
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 14px;
        z-index: 200;
        animation: flashAnim 1.1s forwards;
      }

      /* Landscape */
      @media (orientation: landscape) and (max-height: 500px) {
        .level-topbar .topbar-inner { padding-top: 6px; padding-bottom: 6px; }
        .level-bottomnav { padding-bottom: 0; }
        .screen-body { padding-top: 10px; padding-bottom: 10px; gap: 10px; }
        .bucket-tank { height: 90px; }
        .nav-btn { padding: 6px 0 2px; }
      }

      /* Visible scrollbar para makita at magamit kapag may overflow */
      .screen-body::-webkit-scrollbar,
      .modal-sheet::-webkit-scrollbar,
      .gastos-list-box::-webkit-scrollbar,
      .log-form-content::-webkit-scrollbar {
        width: 10px;
        height: 10px;
      }
      .screen-body::-webkit-scrollbar-track,
      .modal-sheet::-webkit-scrollbar-track,
      .gastos-list-box::-webkit-scrollbar-track,
      .log-form-content::-webkit-scrollbar-track {
        background: ${C.tan1}33;
        border-radius: 5px;
      }
      .screen-body::-webkit-scrollbar-thumb,
      .modal-sheet::-webkit-scrollbar-thumb,
      .gastos-list-box::-webkit-scrollbar-thumb,
      .log-form-content::-webkit-scrollbar-thumb {
        background: ${C.burnt}99;
        border-radius: 5px;
      }
      .screen-body::-webkit-scrollbar-thumb:hover,
      .modal-sheet::-webkit-scrollbar-thumb:hover,
      .gastos-list-box::-webkit-scrollbar-thumb:hover,
      .log-form-content::-webkit-scrollbar-thumb:hover {
        background: ${C.burnt};
      }
      .screen-body, .modal-sheet, .log-form-content {
        scrollbar-width: thin;
        scrollbar-color: ${C.burnt}99 ${C.tan1}33;
      }
      .gastos-list-box {
        scrollbar-width: auto;
        scrollbar-color: ${C.burnt}99 ${C.tan1}33;
      }

      /* Safe area for notched phones */
      @supports (padding-top: env(safe-area-inset-top)) {
        .level-topbar .topbar-inner { padding-top: max(14px, env(safe-area-inset-top)); }
        .level-bottomnav { padding-bottom: env(safe-area-inset-bottom); }
      }
    `}</style>
  );
}
