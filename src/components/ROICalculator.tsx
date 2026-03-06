import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { TrendingUp, Users, Target, ChevronDown, ChevronUp, Truck, PercentIcon, Send, ArrowRight, CheckCircle, Gift, FileText, X, Zap, BarChart3, RefreshCw, Sparkles, AlertTriangle } from 'lucide-react';

const LEAFY_GREENS_COST_PER_KG = 4;
const CALENDLY_URL = "https://calendar.app.google/eadGAQFJjJNzFKbS6";
const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbwCQRfblsP09BHgMQCNABwTVLgHy1jc6YW6gUCV1nbze7aN_lSZaoQ7NGfZuNdKLQlH/exec";

const BRAND = {
  darkTeal: '#1E3932',
  gold: '#E0C04A',
  cream: '#F5F3EF',
  darkBg: '#0F1F1C',
  cardBg: '#162B26',
  cardBorder: '#1E3932',
  inputBg: '#0F1F1C',
  inputBorder: '#2A4A42',
  textPrimary: '#F5F3EF',
  textSecondary: '#8FA9A0',
  textMuted: '#5A7A70',
  redCost: '#E05555',
  redBg: 'rgba(224, 85, 85, 0.08)',
  redBorder: 'rgba(224, 85, 85, 0.2)',
  greenSave: '#4ADE80',
  greenBg: 'rgba(74, 222, 128, 0.08)',
  greenBorder: 'rgba(74, 222, 128, 0.2)',
  goldBg: 'rgba(197, 168, 59, 0.08)',
  goldBorder: 'rgba(197, 168, 59, 0.2)',
  qcErrorOrange: '#DD6B20',
  handlingGreen: '#2F855A',
};

const AIQC_DEFAULTS = {
  qcErrorPct: 15,
  labourReductionPct: 80,
};

const AnimatedNumber = ({ value, duration = 600 }: { value: number; duration?: number }) => {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const from = prevRef.current;
    const to = value;
    if (from === to) return;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(from + (to - from) * eased);
      if (progress < 1) frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    prevRef.current = to;
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [value, duration]);

  return <>{new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(display)}</>;
};

const RejectionBarChart = ({ currentQcPct, currentHandlingPct, aiqcQcPct, aiqcHandlingPct, showAiqc, totalRejectCost }: { currentQcPct: number; currentHandlingPct: number; aiqcQcPct: number; aiqcHandlingPct: number; showAiqc: boolean; totalRejectCost: number }) => {
  const fmt = (n: number) => new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);
  const currentQcCost = totalRejectCost * (currentQcPct / 100);
  const currentHandlingCost = totalRejectCost * (currentHandlingPct / 100);
  const aiqcQcCost = totalRejectCost * (aiqcQcPct / 100);
  const aiqcHandlingCost = totalRejectCost * (aiqcHandlingPct / 100);
  const maxVal = totalRejectCost;

  const Bar = ({ label, qcVal, handlingVal, total, isAiqc }: { label: string; qcVal: number; handlingVal: number; total: number; isAiqc: boolean }) => {
    const qcW = maxVal > 0 ? (qcVal / maxVal) * 100 : 0;
    const hW = maxVal > 0 ? (handlingVal / maxVal) * 100 : 0;
    return (
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: isAiqc ? 13 : 12, color: isAiqc ? BRAND.greenSave : BRAND.redCost, fontFamily: 'Arial, sans-serif', fontWeight: 600 }}>{label}</span>
          <span style={{ fontSize: 18, fontWeight: 700, color: isAiqc ? BRAND.greenSave : BRAND.redCost, fontFamily: 'Georgia, serif', textDecoration: !isAiqc ? 'line-through' : 'none', textDecorationColor: BRAND.redCost }}>{fmt(total)}</span>
        </div>
        <div style={{ display: 'flex', height: 28, borderRadius: 6, overflow: 'hidden', background: 'rgba(255,255,255,0.03)' }}>
          <div style={{ width: `${qcW}%`, background: isAiqc ? 'rgba(74,222,128,0.6)' : BRAND.qcErrorOrange, transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {qcW > 12 && <span style={{ fontSize: 10, color: '#fff', fontFamily: 'Arial, sans-serif', fontWeight: 600 }}>QC Errors</span>}
          </div>
          <div style={{ width: `${hW}%`, background: isAiqc ? 'rgba(74,222,128,0.3)' : BRAND.handlingGreen, transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {hW > 12 && <span style={{ fontSize: 10, color: '#fff', fontFamily: 'Arial, sans-serif', fontWeight: 600 }}>Handling</span>}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Bar label="Current" qcVal={currentQcCost} handlingVal={currentHandlingCost} total={totalRejectCost} isAiqc={false} />
      {showAiqc && <Bar label="With AI QC" qcVal={aiqcQcCost} handlingVal={aiqcHandlingCost} total={aiqcQcCost + aiqcHandlingCost} isAiqc={true} />}
    </div>
  );
};

interface Segments { visual: number; recording: number; other: number; }

const SegmentSlider = ({ visual, recording, other, onChange }: { visual: number; recording: number; other: number; onChange: (s: Segments) => void }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const combined = visual + recording;

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    dragging.current = true;
    const onMove = (ev: PointerEvent | TouchEvent) => {
      if (!barRef.current || !dragging.current) return;
      const rect = barRef.current.getBoundingClientRect();
      const clientX = 'touches' in ev ? ev.touches[0].clientX : ev.clientX;
      const pct = Math.round(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
      const newCombined = Math.max(10, Math.min(95, pct));
      const newOther = 100 - newCombined;
      // Keep the same ratio between visual and recording
      const ratio = visual / (visual + recording);
      const newVisual = Math.round(newCombined * ratio);
      const newRecording = newCombined - newVisual;
      onChange({ visual: newVisual, recording: newRecording, other: newOther });
    };
    const onUp = () => {
      dragging.current = false;
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onUp);
    };
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend', onUp);
  }, [visual, recording, other, onChange]);

  return (
    <div style={{ marginTop: 12, padding: 12, paddingTop: 18, borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: BRAND.textSecondary, fontFamily: 'Arial, sans-serif' }}>Visual Inspection & Recording</span>
        
      </div>
      <p style={{ fontSize: 11, color: BRAND.textMuted, marginBottom: 8, minHeight: 28 }}>% of QC time on visual inspection + record keeping</p>
      <div style={{ display: 'flex', fontSize: 10, fontWeight: 600, marginBottom: 4, userSelect: 'none', fontFamily: 'Arial, sans-serif' }}>
        <span style={{ width: `${combined}%`, textAlign: 'center', color: '#F6AD55', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', padding: '0 2px' }}>Insp. & Recording</span>
        <span style={{ width: `${other}%`, textAlign: 'center', color: '#68D391', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', padding: '0 2px' }}>Other Activities</span>
      </div>
      <div ref={barRef} style={{ position: 'relative', height: 36, borderRadius: 8, display: 'flex', cursor: 'default', userSelect: 'none', touchAction: 'none', overflow: 'visible' }}>
        <div style={{ width: `${combined}%`, height: '100%', background: '#DD6B20', borderRadius: '8px 0 0 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700, transition: 'width 75ms', fontFamily: 'Arial, sans-serif' }}>{combined}%</div>
        <div onPointerDown={handlePointerDown} style={{ position: 'absolute', top: 0, bottom: 0, left: `${combined}%`, transform: 'translateX(-50%)', zIndex: 10, display: 'flex', alignItems: 'center', cursor: 'col-resize' }}>
          <div style={{ width: 12, height: 36, background: '#fff', borderRadius: 3, boxShadow: '0 2px 6px rgba(0,0,0,0.4)', border: '1px solid rgba(0,0,0,0.15)' }} />
        </div>
        <div style={{ width: `${other}%`, height: '100%', background: '#2F855A', borderRadius: '0 8px 8px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700, transition: 'width 75ms', fontFamily: 'Arial, sans-serif' }}>{other}%</div>
      </div>
    </div>
  );
};

const RejectionCauseSplitSlider = ({ qcErrorPct, handlingPct, onChange }: { qcErrorPct: number; handlingPct: number; onChange: (v: number) => void }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    dragging.current = true;
    const onMove = (ev: PointerEvent | TouchEvent) => {
      if (!barRef.current || !dragging.current) return;
      const rect = barRef.current.getBoundingClientRect();
      const clientX = 'touches' in ev ? ev.touches[0].clientX : ev.clientX;
      const pct = Math.round(((clientX - rect.left) / rect.width) * 100);
      const clamped = Math.max(10, Math.min(95, Math.round(pct / 5) * 5));
      onChange(clamped);
    };
    const onUp = () => {
      dragging.current = false;
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onUp);
    };
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend', onUp);
  }, [onChange]);

  return (
    <div style={{ marginTop: 12, padding: 12, paddingTop: 18, borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: BRAND.textSecondary, fontFamily: 'Arial, sans-serif' }}>Rejection Cause Split</span>
      </div>
      <p style={{ fontSize: 11, color: BRAND.textMuted, marginBottom: 8, minHeight: 28 }}>What percentage of rejections are due to QC errors vs handling issues? (refrigeration, late trucks, rough handling)</p>
      <div style={{ display: 'flex', fontSize: 10, fontWeight: 600, marginBottom: 4, userSelect: 'none', fontFamily: 'Arial, sans-serif' }}>
        <span style={{ width: `${qcErrorPct}%`, textAlign: 'center', color: '#F6AD55', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', padding: '0 2px' }}>QC Errors</span>
        <span style={{ width: `${handlingPct}%`, textAlign: 'center', color: '#68D391', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', padding: '0 2px' }}>Handling</span>
      </div>
      <div ref={barRef} style={{ position: 'relative', height: 36, borderRadius: 8, display: 'flex', cursor: 'default', userSelect: 'none', touchAction: 'none', overflow: 'visible' }}>
        <div style={{ width: `${qcErrorPct}%`, height: '100%', background: BRAND.qcErrorOrange, borderRadius: '8px 0 0 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700, transition: 'width 75ms', fontFamily: 'Arial, sans-serif' }}>
          {qcErrorPct}%
        </div>
        <div onPointerDown={handlePointerDown} style={{ position: 'absolute', top: 0, bottom: 0, zIndex: 10, display: 'flex', alignItems: 'center', cursor: 'col-resize', left: `${qcErrorPct}%`, transform: 'translateX(-50%)' }}>
          <div style={{ width: 12, height: 36, background: '#fff', borderRadius: 3, boxShadow: '0 2px 6px rgba(0,0,0,0.4)', border: '1px solid rgba(0,0,0,0.15)' }} />
        </div>
        <div style={{ width: `${handlingPct}%`, height: '100%', background: BRAND.handlingGreen, borderRadius: '0 8px 8px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700, transition: 'width 75ms', fontFamily: 'Arial, sans-serif' }}>
          {handlingPct}%
        </div>
      </div>
      
    </div>
  );
};

const ROICalculator = () => {
  const [showAiqc, setShowAiqc] = useState(false);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', company: '', email: '', phone: '' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [qcHoursPerDay, setQcHoursPerDay] = useState(4.5);
  const [rejectionRate, setRejectionRate] = useState(5);
  const [hourlyRate, setHourlyRate] = useState(35);
  const [daysPerWeek, setDaysPerWeek] = useState(5);
  const [weeksPerYear, setWeeksPerYear] = useState(52);
  const [volumePerWeek, setVolumePerWeek] = useState(20000);
  const [costPerReject, setCostPerReject] = useState(LEAFY_GREENS_COST_PER_KG);
  const [truckValue, setTruckValue] = useState(8000);
  const [rejectionMode, setRejectionMode] = useState('rate');
  const [dispatchesPerMonth, setDispatchesPerMonth] = useState(30);
  const [kgPerDispatch, setKgPerDispatch] = useState(2000);
  const [rejectedDispatches, setRejectedDispatches] = useState(1);
  const [markdownDispatches, setMarkdownDispatches] = useState(1);
  const [markdownPct, setMarkdownPct] = useState(20);
  const [qcStaff, setQcStaff] = useState(2);
  const [segments, setSegments] = useState<Segments>({ visual: 15, recording: 20, other: 65 });
  const automatedPct = segments.visual + segments.recording;
  const [qcErrorPct, setQcErrorPct] = useState(75);
  const handlingPct = 100 - qcErrorPct;
  const [aiqcQcErrorPct, setAiqcQcErrorPct] = useState(AIQC_DEFAULTS.qcErrorPct);
  const [aiqcLabourReduction, setAiqcLabourReduction] = useState(AIQC_DEFAULTS.labourReductionPct);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const volumePerDay = daysPerWeek > 0 ? volumePerWeek / daysPerWeek : 0;

  useEffect(() => {
    if (rejectionMode === 'dispatches' && kgPerDispatch > 0) {
      setCostPerReject(parseFloat((truckValue / kgPerDispatch).toFixed(2)));
    }
  }, [truckValue, kgPerDispatch, rejectionMode]);

  const results = useMemo(() => {
    const operatingDays = daysPerWeek * weeksPerYear;
    const annualLabour = hourlyRate * qcHoursPerDay * operatingDays * qcStaff;
    let totalRejectCost = 0, annualMarkdownCost = 0;
    if (rejectionMode === 'dispatches') {
      const annualRejectCost = rejectedDispatches * truckValue * 12;
      annualMarkdownCost = markdownDispatches * truckValue * (markdownPct / 100) * 12;
      totalRejectCost = annualRejectCost + annualMarkdownCost;
    } else {
      totalRejectCost = volumePerDay * (rejectionRate / 100) * costPerReject * operatingDays;
    }
    const totalCurrentCost = annualLabour + totalRejectCost;
    const qcErrorCost = totalRejectCost * (qcErrorPct / 100);
    const handlingCost = totalRejectCost * (handlingPct / 100);
    const aiqcLabourCost = annualLabour * (1 - aiqcLabourReduction / 100);
    const aiqcQcErrorCost = totalRejectCost * (aiqcQcErrorPct / 100);
    const aiqcHandlingCost = handlingCost;
    const aiqcTotalRejectCost = aiqcQcErrorCost + aiqcHandlingCost;
    const aiqcTotalCost = aiqcLabourCost + aiqcTotalRejectCost;
    const savings = totalCurrentCost - aiqcTotalCost;
    const dailySavings = operatingDays > 0 ? savings / operatingDays : 0;
    return {
      operatingDays, annualLabour, totalRejectCost, totalCurrentCost, qcErrorCost, handlingCost,
      aiqcLabourCost, aiqcQcErrorCost, aiqcHandlingCost, aiqcTotalRejectCost, aiqcTotalCost,
      savings, dailySavings, labourSaved: annualLabour - aiqcLabourCost, rejectSaved: totalRejectCost - aiqcTotalRejectCost,
      isSeasonal: weeksPerYear < 52,
    };
  }, [qcHoursPerDay, rejectionRate, hourlyRate, daysPerWeek, weeksPerYear, volumePerWeek, volumePerDay, costPerReject, qcStaff, qcErrorPct, handlingPct, aiqcQcErrorPct, aiqcLabourReduction, rejectionMode, dispatchesPerMonth, kgPerDispatch, rejectedDispatches, markdownDispatches, markdownPct, truckValue]);

  const fmt = (n: number) => new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);

  const generateDiscountCode = () => {
    const prefix = 'GOMICRO5';
    const timestamp = Date.now().toString(36).toUpperCase().slice(-4);
    const random = Math.random().toString(36).toUpperCase().slice(-3);
    return `${prefix}-${timestamp}${random}`;
  };

  const [discountCode] = useState(() => generateDiscountCode());

  const validateEmail = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Required';
    if (!formData.email.trim()) errors.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Invalid email';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEmailSubmit = () => {
    if (validateEmail()) {
      const payload = {
        timestamp: new Date().toISOString(),
        calculatorType: 'leafy_greens',
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        role: '',
        calculatedSavings: results.savings,
        dailySavings: results.dailySavings,
        currentQcCost: results.totalCurrentCost,
        aiqcCost: results.aiqcTotalCost,
        sourceUrl: window.location.href,
        interestAnswers: { q1: '', q2: '', q3: '', q4: '' },
        discountCode: discountCode,
        notes: `Phase 2 AIQC viewed. Labour reduction: ${aiqcLabourReduction}%. QC error rejection: ${aiqcQcErrorPct}%. QC error cause split: ${qcErrorPct}%/${handlingPct}%. Staff: ${qcStaff}. Segments: Visual ${segments.visual}%, Recording ${segments.recording}%, Other ${segments.other}%.`,
        values: {
          daysPerWeek, weeksPerYear, qcHoursPerDay, hourlyRate, costPerReject, qcStaff,
          volumePerWeek, rejectionRate,
          qcErrorPct, handlingPct, aiqcQcErrorPct, aiqcLabourReduction,
          segments: { visual: segments.visual, recording: segments.recording, other: segments.other },
          automatedPct,
          annualLabour: results.annualLabour,
          totalRejectCost: results.totalRejectCost,
        }
      };
      fetch(WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(err => console.error('Webhook error:', err));
      setEmailSent(true);
    }
  };

  const activateAiqc = () => {
    setShowAiqc(true);
    setAiqcQcErrorPct(AIQC_DEFAULTS.qcErrorPct);
    setAiqcLabourReduction(AIQC_DEFAULTS.labourReductionPct);
  };

  const deactivateAiqc = () => {
    setShowAiqc(false);
  };

  const s = {
    page: { minHeight: '100vh', background: `linear-gradient(165deg, ${BRAND.darkBg} 0%, #0A1612 40%, ${BRAND.darkBg} 100%)`, padding: '24px 16px', fontFamily: 'Arial, sans-serif' } as React.CSSProperties,
    container: { maxWidth: 960, margin: '0 auto' } as React.CSSProperties,
    card: { background: BRAND.cardBg, border: `1px solid ${BRAND.cardBorder}`, borderRadius: 16, padding: 24, marginBottom: 16 } as React.CSSProperties,
    sectionLabel: { fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: BRAND.gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Arial, sans-serif' } as React.CSSProperties,
    label: { fontSize: 13, fontWeight: 600, color: BRAND.textSecondary, fontFamily: 'Arial, sans-serif' } as React.CSSProperties,
    value: { fontSize: 18, fontWeight: 700, color: BRAND.gold, fontFamily: 'Georgia, serif' } as React.CSSProperties,
    input: { background: BRAND.inputBg, border: `1px solid ${BRAND.inputBorder}`, borderRadius: 8, color: BRAND.textPrimary, padding: '8px 12px', fontSize: 14, fontFamily: 'Arial, sans-serif', outline: 'none', textAlign: 'right' as const, width: 80 } as React.CSSProperties,
    slider: { width: '100%', height: 6, borderRadius: 3, appearance: 'none' as const, cursor: 'pointer', background: BRAND.inputBorder, accentColor: BRAND.gold } as React.CSSProperties,
    hint: { fontSize: 11, color: BRAND.textMuted, marginTop: 2, fontFamily: 'Arial, sans-serif' } as React.CSSProperties,
    grid4: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 } as React.CSSProperties,
  };

  const SliderInput = ({ label, value, onChange, min, max, step, unit, description }: { label: string; value: number; onChange: (v: number) => void; min: number; max: number; step: number; unit: string; description?: string }) => (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <span style={s.label}>{label}</span>
        <span style={{ ...s.value, fontSize: 20 }}>{value}{unit}</span>
      </div>
      {description && <p style={s.hint}>{description}</p>}
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} style={{ ...s.slider, marginTop: 8 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', ...s.hint, marginTop: 4 }}><span>{min}{unit}</span><span>{max}{unit}</span></div>
    </div>
  );

  const BoxInput = ({ label, value, onChange, unit, width, hint, step: inputStep = 'any' }: { label: string; value: number; onChange: (v: number) => void; unit?: string; width?: number; hint?: string; step?: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', padding: '8px 0', gap: 12 }}>
      <div style={{ flex: 1 }}>
        <span style={s.label}>{label}</span>
        {hint && <p style={{ ...s.hint, marginTop: 1 }}>{hint}</p>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
        <input type="number" value={value} step={inputStep} onChange={(e) => onChange(parseFloat(e.target.value) || 0)} style={{ ...s.input, width: width || 80 }} />
        {unit && <span style={{ fontSize: 11, color: BRAND.textMuted, width: 32 }}>{unit}</span>}
      </div>
    </div>
  );

  const AiqcSlider = ({ label, value, onChange, min, max, step, unit, defaultVal, description }: { label: string; value: number; onChange: (v: number) => void; min: number; max: number; step: number; unit: string; defaultVal: number; description?: string }) => {
    const isDefault = value === defaultVal;
    return (
      <div style={{ marginBottom: 16, padding: 12, background: 'rgba(74,222,128,0.04)', borderRadius: 10, border: '1px solid rgba(74,222,128,0.12)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: BRAND.greenSave, fontFamily: 'Arial, sans-serif' }}>{label}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: BRAND.greenSave, fontFamily: 'Georgia, serif' }}>{value}{unit}</span>
            {!isDefault && (
              <button onClick={() => onChange(defaultVal)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, display: 'flex', alignItems: 'center' }} title="Reset to projected value">
                <RefreshCw style={{ width: 12, height: 12, color: BRAND.textMuted }} />
              </button>
            )}
          </div>
        </div>
        {description && <p style={{ ...s.hint, color: 'rgba(74,222,128,0.5)', marginBottom: 6 }}>{description}</p>}
        <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} style={{ ...s.slider, accentColor: BRAND.greenSave }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: BRAND.textMuted, marginTop: 2 }}><span>{min}{unit}</span><span>{max}{unit}</span></div>
      </div>
    );
  };

  return (
    <div style={s.page}>
      <style>{`
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; height: 20px; width: 20px; border-radius: 50%; cursor: pointer; background: ${BRAND.gold}; border: 2px solid ${BRAND.cream}; box-shadow: 0 1px 4px rgba(0,0,0,0.3); }
        input[type="range"]::-moz-range-thumb { height: 20px; width: 20px; border-radius: 50%; cursor: pointer; background: ${BRAND.gold}; border: 2px solid ${BRAND.cream}; box-shadow: 0 1px 4px rgba(0,0,0,0.3); }
        input[type="number"]:focus { border-color: ${BRAND.gold} !important; }
        input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type="number"] { -moz-appearance: textfield; }
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulseGlow { 0%, 100% { box-shadow: 0 0 0 0 rgba(197,168,59,0.3); } 50% { box-shadow: 0 0 20px 4px rgba(197,168,59,0.15); } }
        .fade-in { animation: fadeSlideUp 0.5s ease-out forwards; }
        .pulse-glow { animation: pulseGlow 2.5s ease-in-out infinite; }
      `}</style>

      <div style={s.container}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 36, fontWeight: 700, color: BRAND.cream, margin: 0, lineHeight: 1.2 }}>
            Calculate Your QC Cost
          </h1>
          <p style={{ fontSize: 16, color: BRAND.textSecondary, marginTop: 8, fontFamily: 'Arial, sans-serif' }}>
            Find Your True Cost of Quality Control in Minutes
          </p>
          <p style={{ fontSize: 14, color: BRAND.textMuted, marginTop: 6, fontFamily: 'Arial, sans-serif' }}>
            Leafy greens calculator — lettuce, spinach, rocket, kale, herbs
          </p>
        </div>

        {/* PHASE 1: YOUR OPERATION */}
        <div style={s.card}>
          <div style={s.sectionLabel}>
            <Target style={{ width: 14, height: 14 }} /> Your Operation
          </div>
          <div style={s.grid4}>
            <BoxInput label="Weekly Volume" value={volumePerWeek} onChange={setVolumePerWeek} unit="kg" width={96} step="1000" hint={volumePerWeek >= 500 ? `≈ ${(volumePerWeek / 1000).toFixed(0)}t/week` : 'Min 500kg'} />
            <BoxInput label="Days / Week" value={daysPerWeek} onChange={setDaysPerWeek} unit="days" width={64} step="1" />
            <BoxInput label="Weeks / Year" value={weeksPerYear} onChange={setWeeksPerYear} unit="wks" width={64} step="1" hint={weeksPerYear < 52 ? 'Seasonal' : ''} />
            
          </div>
        </div>

        {/* QC LABOUR + REJECTIONS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 16 }}>
          {/* QC Labour */}
          <div style={{ ...s.card, display: 'flex', flexDirection: 'column' }}>
            <div style={{ ...s.sectionLabel, color: BRAND.gold, marginBottom: 16 }}>
              <Users style={{ width: 14, height: 14 }} /> QC Labour Cost
            </div>
            <div style={{ marginTop: 16 }}><BoxInput label="QC Staff" value={qcStaff} onChange={setQcStaff} unit="ppl" width={72} step="0.5" hint="People doing QC" /></div>
            <BoxInput label="Hourly Labour Cost" value={hourlyRate} onChange={setHourlyRate} unit="$/hr" step="1" hint="Base + ~30% on-costs" />
            <div style={{ marginTop: 'auto' }}>
              <SegmentSlider visual={segments.visual} recording={segments.recording} other={segments.other} onChange={setSegments} />
            </div>
            <div style={{ marginTop: 'auto', padding: 12, borderRadius: 10, background: BRAND.redBg, border: `1px solid ${BRAND.redBorder}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: 12, color: BRAND.redCost, fontWeight: 600, fontFamily: 'Arial, sans-serif' }}>Annual QC Labour Cost</span>
                <span style={{ fontSize: 22, fontWeight: 700, color: BRAND.redCost, fontFamily: 'Georgia, serif' }}>
                  <AnimatedNumber value={results.annualLabour} />
                </span>
              </div>
              <p style={{ fontSize: 11, color: BRAND.textMuted, marginTop: 4 }}>{qcStaff} staff × {qcHoursPerDay}hrs × {results.operatingDays} days × ${hourlyRate}/hr</p>
            </div>
          </div>

          {/* Rejections */}
          <div style={{ ...s.card, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={s.sectionLabel}>
                <TrendingUp style={{ width: 14, height: 14 }} /> Rejection Cost
              </div>
              <div style={{ display: 'flex', background: BRAND.inputBg, borderRadius: 8, padding: 2 }}>
                <button onClick={() => setRejectionMode('rate')} style={{ padding: '4px 10px', fontSize: 11, fontWeight: 600, borderRadius: 6, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Arial, sans-serif', background: rejectionMode === 'rate' ? BRAND.darkTeal : 'transparent', color: rejectionMode === 'rate' ? BRAND.gold : BRAND.textMuted }}>
                  <PercentIcon style={{ width: 10, height: 10 }} /> Rate
                </button>
                <button onClick={() => setRejectionMode('dispatches')} style={{ padding: '4px 10px', fontSize: 11, fontWeight: 600, borderRadius: 6, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Arial, sans-serif', background: rejectionMode === 'dispatches' ? BRAND.darkTeal : 'transparent', color: rejectionMode === 'dispatches' ? BRAND.gold : BRAND.textMuted }}>
                  <Truck style={{ width: 10, height: 10 }} /> Dispatches
                </button>
              </div>
            </div>

            {rejectionMode === 'rate' ? (
              <>
                <BoxInput label="Buyer Rejection Rate" value={rejectionRate} onChange={setRejectionRate} unit="%" width={64} step="1" hint="% rejected or sent back. Industry: 3–12%" />
                <BoxInput label="Cost Per Rejected Unit" value={costPerReject} onChange={setCostPerReject} unit="$/kg" width={64} step="0.1" hint="~$4/kg wholesale" />
              </>
            ) : (
              <>
                <BoxInput label="Dispatches / Month" value={dispatchesPerMonth} onChange={setDispatchesPerMonth} unit="" width={64} step="1" />
                <BoxInput label="Kg Per Dispatch" value={kgPerDispatch} onChange={setKgPerDispatch} unit="kg" width={96} step="100" />
                <div style={{ padding: 10, background: BRAND.redBg, border: `1px solid ${BRAND.redBorder}`, borderRadius: 8, marginBottom: 8 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: BRAND.redCost, marginBottom: 6 }}>Outright Rejections</p>
                  <BoxInput label="Dispatches rejected / month" value={rejectedDispatches} onChange={setRejectedDispatches} unit="" width={64} step="1" />
                </div>
                <div style={{ padding: 10, background: BRAND.goldBg, border: `1px solid ${BRAND.goldBorder}`, borderRadius: 8 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: BRAND.gold, marginBottom: 6 }}>Price Markdowns</p>
                  <BoxInput label="Dispatches marked down / month" value={markdownDispatches} onChange={setMarkdownDispatches} unit="" width={64} step="1" />
                  <BoxInput label="Avg. markdown" value={markdownPct} onChange={setMarkdownPct} unit="%" width={64} step="5" />
                </div>
              </>
            )}

            <RejectionCauseSplitSlider qcErrorPct={qcErrorPct} handlingPct={handlingPct} onChange={setQcErrorPct} />

            <div style={{ marginTop: 'auto', padding: 12, borderRadius: 10, background: BRAND.redBg, border: `1px solid ${BRAND.redBorder}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: 12, color: BRAND.redCost, fontWeight: 600, fontFamily: 'Arial, sans-serif' }}>Annual Rejection Cost</span>
                <span style={{ fontSize: 22, fontWeight: 700, color: BRAND.redCost, fontFamily: 'Georgia, serif' }}>
                  <AnimatedNumber value={results.totalRejectCost} />
                </span>
              </div>
              <div style={{ display: 'flex', gap: 16, marginTop: 6 }}>
                <span style={{ fontSize: 11, color: BRAND.textMuted }}>QC errors: {fmt(results.qcErrorCost)}</span>
                <span style={{ fontSize: 11, color: BRAND.textMuted }}>Handling: {fmt(results.handlingCost)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* TOTAL QC COST */}
        <div style={{ ...s.card, background: 'linear-gradient(135deg, rgba(224,85,85,0.06) 0%, rgba(224,85,85,0.02) 100%)', border: `1px solid ${BRAND.redBorder}`, textAlign: 'center', padding: 32 }} className="fade-in">
          <p style={{ fontSize: 12, fontWeight: 600, color: BRAND.redCost, textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 8, fontFamily: 'Arial, sans-serif' }}>
            Your Total Annual QC Cost{results.isSeasonal ? ` (${weeksPerYear}-week season)` : ''}
          </p>
          <p style={{ fontSize: 48, fontWeight: 700, color: BRAND.redCost, fontFamily: 'Georgia, serif', margin: '0 0 8px 0', lineHeight: 1 }}>
            <AnimatedNumber value={results.totalCurrentCost} />
          </p>
          <p style={{ fontSize: 13, color: BRAND.textMuted, fontFamily: 'Arial, sans-serif' }}>
            Labour {fmt(results.annualLabour)} + Rejections {fmt(results.totalRejectCost)}
          </p>
        </div>

        {/* PHASE 2 TRIGGER */}
        {!showAiqc && (
          <div style={{ textAlign: 'center', margin: '24px 0' }} className="fade-in">
            <button
              onClick={activateAiqc}
              className="pulse-glow"
              style={{
                padding: '16px 32px',
                background: `linear-gradient(135deg, ${BRAND.darkTeal} 0%, #2A5548 100%)`,
                border: `2px solid ${BRAND.gold}`,
                borderRadius: 14,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                fontSize: 17,
                fontWeight: 700,
                color: BRAND.gold,
                fontFamily: 'Georgia, serif',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.transform = 'scale(1.03)'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.transform = 'scale(1)'; }}
            >
              <Sparkles style={{ width: 20, height: 20 }} /> Find Out Your AI QC Savings
            </button>
          </div>
        )}

        {/* PHASE 2: AIQC COMPARISON */}
        {showAiqc && (
          <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Zap style={{ width: 16, height: 16, color: BRAND.greenSave }} />
                <span style={{ fontSize: 14, fontWeight: 700, color: BRAND.greenSave, fontFamily: 'Georgia, serif' }}>AI Quality Control Projections</span>
              </div>
              <button onClick={deactivateAiqc} style={{ fontSize: 11, color: BRAND.textMuted, background: 'none', border: `1px solid ${BRAND.inputBorder}`, borderRadius: 8, padding: '4px 12px', cursor: 'pointer', fontFamily: 'Arial, sans-serif' }}>
                ← Back to Current Cost
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 16 }}>
              {/* AIQC Labour */}
              <div style={{ ...s.card, border: '1px solid rgba(74,222,128,0.15)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ ...s.sectionLabel, color: BRAND.greenSave, marginBottom: 16 }}>
                  <Users style={{ width: 14, height: 14 }} /> Labour With AI QC
                </div>
                <AiqcSlider label="QC Labour Reduction" value={aiqcLabourReduction} onChange={setAiqcLabourReduction} min={20} max={95} step={5} unit="%" defaultVal={AIQC_DEFAULTS.labourReductionPct} description="% of QC labour hours automated by AI QC" />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4, marginTop: 24 }}>
                  <span style={{ fontSize: 12, color: BRAND.redCost, fontWeight: 600, fontFamily: 'Arial, sans-serif' }}>Current</span>
                  <span style={{ fontSize: 18, fontWeight: 700, color: BRAND.redCost, textDecoration: 'line-through', textDecorationColor: BRAND.redCost, fontFamily: 'Georgia, serif' }}>{fmt(results.annualLabour)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4, marginTop: 44 }}>
                  <span style={{ fontSize: 13, color: BRAND.greenSave, fontWeight: 600, fontFamily: 'Arial, sans-serif' }}>With AI QC</span>
                  <span style={{ fontSize: 18, fontWeight: 700, color: BRAND.greenSave, fontFamily: 'Georgia, serif' }}><AnimatedNumber value={results.aiqcLabourCost} /></span>
                </div>
                <div style={{ marginTop: 'auto', padding: 10, borderRadius: 8, background: BRAND.goldBg, border: `1px solid ${BRAND.goldBorder}`, textAlign: 'center' }}>
                  <span style={{ fontSize: 18, color: BRAND.gold, fontWeight: 700, fontFamily: 'Georgia, serif' }}>Saving <AnimatedNumber value={results.labourSaved} /> / year on labour costs</span>
                </div>
              </div>

              {/* AIQC Rejections */}
              <div style={{ ...s.card, border: '1px solid rgba(74,222,128,0.15)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ ...s.sectionLabel, color: BRAND.greenSave, marginBottom: 16 }}>
                  <BarChart3 style={{ width: 14, height: 14 }} /> Rejections With AI QC
                </div>
                 <AiqcSlider label="QC-Error Rejection Rate After AI QC" value={aiqcQcErrorPct} onChange={setAiqcQcErrorPct} min={5} max={qcErrorPct} step={5} unit="%" defaultVal={AIQC_DEFAULTS.qcErrorPct} description="AI QC reduces QC-caused rejections — handling stays the same" />
                 <p style={{ fontSize: 11, color: BRAND.textMuted, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                   <AlertTriangle style={{ width: 11, height: 11 }} /> Handling rejections ({handlingPct}%) are unaffected by AI QC
                </p>
                <RejectionBarChart currentQcPct={qcErrorPct} currentHandlingPct={handlingPct} aiqcQcPct={aiqcQcErrorPct} aiqcHandlingPct={handlingPct} showAiqc={true} totalRejectCost={results.totalRejectCost} />
                <div style={{ marginTop: 'auto', padding: 10, borderRadius: 8, background: BRAND.goldBg, border: `1px solid ${BRAND.goldBorder}`, textAlign: 'center' }}>
                  <span style={{ fontSize: 18, color: BRAND.gold, fontWeight: 700, fontFamily: 'Georgia, serif' }}>Saving <AnimatedNumber value={results.rejectSaved} /> / year on rejections</span>
                </div>
              </div>
            </div>

            {/* AIQC Total Savings */}
            <div style={{ ...s.card, background: 'linear-gradient(135deg, rgba(74,222,128,0.06) 0%, rgba(74,222,128,0.02) 100%)', border: `1px solid ${BRAND.greenBorder}`, padding: 32 }} className="fade-in">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 24, textAlign: 'center', alignItems: 'end' }}>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 600, color: BRAND.redCost, textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: 4 }}>Current QC Cost</p>
                  <p style={{ fontSize: 28, fontWeight: 700, color: BRAND.redCost, fontFamily: 'Georgia, serif', textDecoration: 'line-through', margin: 0 }}>
                    <AnimatedNumber value={results.totalCurrentCost} />
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 600, color: BRAND.greenSave, textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: 4 }}>QC Cost with AI QC</p>
                  <p style={{ fontSize: 28, fontWeight: 700, color: BRAND.greenSave, fontFamily: 'Georgia, serif', margin: 0 }}>
                    <AnimatedNumber value={results.aiqcTotalCost} />
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 600, color: BRAND.gold, textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: 4 }}>Annual Savings</p>
                  <p style={{ fontSize: 28, fontWeight: 700, color: BRAND.gold, fontFamily: 'Georgia, serif', margin: 0 }}>
                    <AnimatedNumber value={results.savings} />
                  </p>
                </div>
              </div>
            </div>

            {/* Generate Report */}
            <div style={{ textAlign: 'center', margin: '24px 0' }}>
              <button
                onClick={() => setShowEmailCapture(true)}
                style={{
                  padding: '16px 32px',
                  background: `linear-gradient(135deg, ${BRAND.darkTeal} 0%, #2A5548 100%)`,
                  border: `2px solid ${BRAND.gold}`,
                  borderRadius: 14,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: 16,
                  fontWeight: 700,
                  color: BRAND.gold,
                  fontFamily: 'Georgia, serif',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.transform = 'scale(1.02)'; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.transform = 'scale(1)'; }}
              >
                <FileText style={{ width: 18, height: 18 }} /> Generate Your Savings Report + 5% Discount
              </button>
              <p style={{ fontSize: 11, color: BRAND.textMuted, marginTop: 8 }}>We'll email you a personalised breakdown</p>
            </div>

            {/* Assumptions toggle */}
            <div style={{ textAlign: 'center' }}>
              <button onClick={() => setShowAdvanced(!showAdvanced)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, color: BRAND.textMuted, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Arial, sans-serif' }}>
                {showAdvanced ? <ChevronUp style={{ width: 12, height: 12 }} /> : <ChevronDown style={{ width: 12, height: 12 }} />} AI QC Assumptions
              </button>
              {showAdvanced && (
                <div style={{ marginTop: 8, padding: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 10, maxWidth: 400, margin: '8px auto 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                    <span style={{ fontSize: 12, color: BRAND.textMuted }}>Labour Reduction</span>
                    <span style={{ fontSize: 12, color: BRAND.textPrimary, fontWeight: 600 }}>{aiqcLabourReduction}%</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                    <span style={{ fontSize: 12, color: BRAND.textMuted }}>QC Error Rate After AI QC</span>
                    <span style={{ fontSize: 12, color: BRAND.textPrimary, fontWeight: 600 }}>{aiqcQcErrorPct}%</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                    <span style={{ fontSize: 12, color: BRAND.textMuted }}>Handling Rate (unchanged)</span>
                    <span style={{ fontSize: 12, color: BRAND.textPrimary, fontWeight: 600 }}>{handlingPct}%</span>
                  </div>
                  <p style={{ fontSize: 10, color: BRAND.textMuted, marginTop: 8, fontStyle: 'italic' }}>These values are adjustable — drag the sliders above to test your own assumptions.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {emailSent && !showEmailCapture && (
          <div style={{ ...s.card, background: BRAND.greenBg, border: `1px solid ${BRAND.greenBorder}`, textAlign: 'center', padding: 20, marginTop: 16 }}>
            <Gift style={{ width: 20, height: 20, color: BRAND.greenSave, margin: '0 auto 8px' }} />
            <p style={{ fontSize: 14, fontWeight: 700, color: BRAND.greenSave }}>Your 5% discount code: <span style={{ fontFamily: 'monospace', letterSpacing: '0.05em' }}>{discountCode}</span></p>
            <p style={{ fontSize: 11, color: BRAND.textMuted, marginTop: 4 }}>Check your inbox for the full report.</p>
          </div>
        )}

      </div>

      {/* EMAIL CAPTURE MODAL */}
      {showEmailCapture && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)', padding: 16 }}>
          <div style={{ background: BRAND.cardBg, border: `1px solid ${BRAND.goldBorder}`, borderRadius: 20, padding: 28, maxWidth: 420, width: '100%', boxShadow: '0 24px 48px rgba(0,0,0,0.4)', position: 'relative' }}>
            <button onClick={() => setShowEmailCapture(false)} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer', color: BRAND.textMuted, padding: 4 }}>
              <X style={{ width: 18, height: 18 }} />
            </button>

            {!emailSent ? (
              <>
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: BRAND.goldBg, border: `1px solid ${BRAND.goldBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                    <FileText style={{ width: 22, height: 22, color: BRAND.gold }} />
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: BRAND.cream, fontFamily: 'Georgia, serif', margin: 0 }}>Get Your Savings Report + 5% Off</h3>
                  <p style={{ fontSize: 13, color: BRAND.textMuted, marginTop: 6, fontFamily: 'Arial, sans-serif' }}>We'll email your personalised QC cost report</p>
                </div>

                <div style={{ padding: 12, borderRadius: 10, background: BRAND.goldBg, border: `1px solid ${BRAND.goldBorder}`, marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: BRAND.gold, fontFamily: 'Arial, sans-serif' }}>Your estimated annual savings</span>
                  <span style={{ fontSize: 18, fontWeight: 700, color: BRAND.gold, fontFamily: 'Georgia, serif' }}>{fmt(results.savings)}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <input type="text" placeholder="Your name *" value={formData.name} onChange={(e) => setFormData(p => ({...p, name: e.target.value}))}
                      style={{ ...s.input, width: '100%', textAlign: 'left' as const, padding: '10px 12px', borderColor: formErrors.name ? BRAND.redCost : BRAND.inputBorder }} />
                    <input type="text" placeholder="Company" value={formData.company} onChange={(e) => setFormData(p => ({...p, company: e.target.value}))}
                      style={{ ...s.input, width: '100%', textAlign: 'left' as const, padding: '10px 12px' }} />
                  </div>
                  <input type="email" placeholder="Email *" value={formData.email} onChange={(e) => setFormData(p => ({...p, email: e.target.value}))}
                    style={{ ...s.input, width: '100%', textAlign: 'left' as const, padding: '10px 12px', borderColor: formErrors.email ? BRAND.redCost : BRAND.inputBorder }} />
                  <input type="tel" placeholder="Phone (optional)" value={formData.phone} onChange={(e) => setFormData(p => ({...p, phone: e.target.value}))}
                    style={{ ...s.input, width: '100%', textAlign: 'left' as const, padding: '10px 12px' }} />
                </div>

                <button onClick={handleEmailSubmit} style={{
                  width: '100%', marginTop: 16, padding: '12px 0',
                  background: `linear-gradient(135deg, ${BRAND.darkTeal}, #2A5548)`,
                  border: `1px solid ${BRAND.gold}`,
                  borderRadius: 12, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  fontSize: 15, fontWeight: 700, color: BRAND.gold, fontFamily: 'Georgia, serif',
                }}>
                  <Send style={{ width: 16, height: 16 }} /> Send My Report + Discount Code
                </button>
                <p style={{ fontSize: 10, color: BRAND.textMuted, textAlign: 'center', marginTop: 10 }}>No spam. Just your report and discount.</p>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: BRAND.greenBg, border: `1px solid ${BRAND.greenBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <CheckCircle style={{ width: 28, height: 28, color: BRAND.greenSave }} />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: BRAND.cream, fontFamily: 'Georgia, serif', marginBottom: 8 }}>You're all set!</h3>
                <p style={{ fontSize: 13, color: BRAND.textMuted, marginBottom: 16 }}>Check your inbox for your personalised QC cost report.</p>
                <div style={{ padding: 16, borderRadius: 12, background: BRAND.goldBg, border: `1px solid ${BRAND.goldBorder}`, marginBottom: 16 }}>
                  <p style={{ fontSize: 11, color: BRAND.textMuted, marginBottom: 4 }}>Your 5% discount code</p>
                  <p style={{ fontSize: 20, fontWeight: 700, color: BRAND.gold, fontFamily: 'monospace', letterSpacing: '0.08em' }}>{discountCode}</p>
                </div>
                <p style={{ fontSize: 13, color: BRAND.textMuted, marginBottom: 12 }}>Want to discuss your results with our team?</p>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '10px 20px',
                  background: `linear-gradient(135deg, ${BRAND.darkTeal}, #2A5548)`,
                  border: `1px solid ${BRAND.gold}`,
                  borderRadius: 10, textDecoration: 'none',
                  fontSize: 14, fontWeight: 700, color: BRAND.gold, fontFamily: 'Georgia, serif',
                }}>
                  Book a 15-min QC Review <ArrowRight style={{ width: 14, height: 14 }} />
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ROICalculator;
