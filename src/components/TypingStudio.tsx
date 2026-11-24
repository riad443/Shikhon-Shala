import React, { useEffect, useRef, useState } from 'react';
import { RotateCcw, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  BijoyMode,
  InputMode,
  KeyDefinition,
  VirtualInputState,
  applyVirtualBijoyKeystroke,
  getNextKeyHint,
} from '../data/bijoyKeymap';
import { VisualKeyboard } from './VisualKeyboard';

export interface TypingSessionResult {
  wpm: number;
  cpm: number;
  accuracy: number;
  errors: number;
  elapsedSec: number;
}

interface TypingStudioProps {
  targetText: string;
  bijoyMode: BijoyMode;
  inputMode: InputMode;
  durationSec?: number; // If set, acts as countdown timer (Speed Test)
  minAccuracy?: number;
  nextLabel?: string;
  onNext?: () => void;
  onComplete?: (result: TypingSessionResult) => void;
}

const INITIAL_VIRTUAL: VirtualInputState = {
  text: '',
  pendingPreKar: null,
  pendingHasanta: false,
  pendingReph: false,
  lastAutoPreKar: null,
};

export const TypingStudio: React.FC<TypingStudioProps> = ({
  targetText,
  bijoyMode,
  inputMode,
  durationSec,
  minAccuracy = 85,
  nextLabel,
  onNext,
  onComplete,
}) => {
  const [typedText, setTypedText] = useState('');
  const [virtualState, setVirtualState] = useState<VirtualInputState>(INITIAL_VIRTUAL);
  const [errors, setErrors] = useState(0);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const [pressedCode, setPressedCode] = useState<string | null>(null);
  const [shiftPreview, setShiftPreview] = useState(false);

  const startRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const completedOnceRef = useRef(false);

  const resetSession = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    startRef.current = null;
    completedOnceRef.current = false;
    setTypedText('');
    setVirtualState(INITIAL_VIRTUAL);
    setErrors(0);
    setElapsedSec(0);
    setRunning(false);
    setFinished(false);
    window.setTimeout(() => inputRef.current?.focus(), 30);
  };

  useEffect(() => {
    resetSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetText, durationSec]);

  const computeStats = (currentTyped: string, currentErrs: number, sec: number): TypingSessionResult => {
    let correct = 0;
    for (let i = 0; i < currentTyped.length; i++) {
      if (currentTyped[i] === targetText[i]) correct++;
    }
    const safeSec = Math.max(sec, 1);
    const mins = safeSec / 60;
    const wpm = currentTyped.length > 0 ? Math.round(correct / 5 / mins) : 0;
    const cpm = currentTyped.length > 0 ? Math.round(correct / mins) : 0;
    const acc =
      currentTyped.length > 0
        ? Math.min(100, Math.max(0, Math.round((correct / (currentTyped.length + currentErrs * 0.25)) * 100)))
        : 100;
    return { wpm, cpm, accuracy: acc, errors: currentErrs, elapsedSec: sec };
  };

  const finalizeSession = (currentTyped: string, currentErrs: number, sec: number) => {
    if (completedOnceRef.current) return;
    completedOnceRef.current = true;
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setRunning(false);
    setFinished(true);
    const res = computeStats(currentTyped, currentErrs, sec);
    onComplete?.(res);
  };

  useEffect(() => {
    if (!running) return;
    if (!startRef.current) startRef.current = Date.now();
    timerRef.current = window.setInterval(() => {
      const sec = Math.floor((Date.now() - (startRef.current ?? Date.now())) / 1000);
      setElapsedSec(sec);
      if (durationSec && sec >= durationSec) {
        finalizeSession(typedText, errors, durationSec);
      }
    }, 300);

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, durationSec]);

  const startIfNeeded = () => {
    if (!running && !finished) {
      startRef.current = Date.now();
      setRunning(true);
    }
  };

  const flashPressedKey = (code: string) => {
    setPressedCode(code);
    window.setTimeout(() => {
      setPressedCode((prev) => (prev === code ? null : prev));
    }, 140);
  };

  const handleVirtualChar = (keyChar: string) => {
    if (finished) return;
    startIfNeeded();
    const nextVirtual = applyVirtualBijoyKeystroke(keyChar, virtualState, bijoyMode);
    setVirtualState(nextVirtual);
    const prevLen = typedText.length;
    const nextText = nextVirtual.text;
    let nextErrors = errors;
    if (nextText.length > prevLen) {
      const idx = nextText.length - 1;
      if (nextText[idx] !== targetText[idx]) {
        nextErrors += 1;
        setErrors(nextErrors);
      }
    }
    setTypedText(nextText);
    if (nextText.length >= targetText.length && targetText.length > 0) {
      const sec = startRef.current ? Math.max(1, Math.floor((Date.now() - startRef.current) / 1000)) : 1;
      setElapsedSec(sec);
      finalizeSession(nextText, nextErrors, sec);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (finished) return;
    if (e.code) flashPressedKey(e.code);

    if (inputMode !== 'virtual') return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    if (e.key === 'Backspace') {
      e.preventDefault();
      if (virtualState.pendingPreKar || virtualState.pendingHasanta || virtualState.pendingReph) {
        setVirtualState({
          ...virtualState,
          pendingPreKar: null,
          pendingHasanta: false,
          pendingReph: false,
        });
      } else if (typedText.length > 0) {
        const sliced = typedText.slice(0, -1);
        setTypedText(sliced);
        setVirtualState({ ...virtualState, text: sliced, lastAutoPreKar: null });
      }
      return;
    }

    if (e.key.length === 1) {
      e.preventDefault();
      handleVirtualChar(e.key);
    }
  };

  const handleImeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (inputMode !== 'ime' || finished) return;
    startIfNeeded();
    const val = e.target.value;
    let nextErrors = errors;
    if (val.length > typedText.length) {
      const idx = val.length - 1;
      if (val[idx] !== targetText[idx]) {
        nextErrors += 1;
        setErrors(nextErrors);
      }
    }
    setTypedText(val);
    if (val.length >= targetText.length && targetText.length > 0) {
      const sec = startRef.current ? Math.max(1, Math.floor((Date.now() - startRef.current) / 1000)) : 1;
      setElapsedSec(sec);
      finalizeSession(val, nextErrors, sec);
    }
  };

  const handleOnScreenKeyClick = (keyDef: KeyDefinition) => {
    if (finished) return;
    flashPressedKey(keyDef.code);
    if (keyDef.code === 'ShiftLeft' || keyDef.code === 'ShiftRight') {
      setShiftPreview((prev) => !prev);
      return;
    }
    if (keyDef.code === 'Backspace') {
      const sliced = typedText.slice(0, -1);
      setTypedText(sliced);
      setVirtualState({ ...virtualState, text: sliced, pendingPreKar: null, pendingHasanta: false, pendingReph: false });
      return;
    }
    const ch = keyDef.code === 'Space' ? ' ' : shiftPreview ? keyDef.enShift : keyDef.en;
    if (ch.length === 1) {
      handleVirtualChar(ch);
    }
  };

  const stats = computeStats(typedText, errors, elapsedSec);
  const progressPct = targetText.length
    ? Math.min(100, Math.round((typedText.length / targetText.length) * 100))
    : 0;
  const displaySec = durationSec ? Math.max(0, durationSec - elapsedSec) : elapsedSec;
  const mins = Math.floor(displaySec / 60);
  const secs = displaySec % 60;
  const timeStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  const nextHint = getNextKeyHint(
    targetText,
    typedText,
    bijoyMode,
    virtualState.pendingPreKar,
    virtualState.pendingHasanta
  );

  const pendingLabel = virtualState.pendingPreKar
    ? `প্রি-কার (${virtualState.pendingPreKar})`
    : virtualState.pendingHasanta
      ? 'G (স্বরবর্ণ অপেক্ষমাণ)'
      : virtualState.pendingReph
        ? 'র্ (রেফ অপেক্ষমাণ)'
        : null;

  const passed = stats.accuracy >= minAccuracy;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111E33] p-4">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400 font-bangla">গতি (WPM)</div>
          <div className="text-2xl font-bold font-mono-num text-slate-900 dark:text-white mt-1">{stats.wpm}</div>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111E33] p-4">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400 font-bangla">অক্ষর/মিনিট (CPM)</div>
          <div className="text-2xl font-bold font-mono-num text-slate-900 dark:text-white mt-1">{stats.cpm}</div>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111E33] p-4">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400 font-bangla">নির্ভুলতা (Accuracy)</div>
          <div className="text-2xl font-bold font-mono-num text-slate-900 dark:text-white mt-1">{stats.accuracy}%</div>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111E33] p-4">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400 font-bangla">
            {durationSec ? 'বাকি সময়' : 'অতিবাহিত সময়'}
          </div>
          <div className="text-2xl font-bold font-mono-num text-slate-900 dark:text-white mt-1">{timeStr}</div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111E33] p-4 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
          <div className="font-bangla">
            মোড: <strong className="text-slate-800 dark:text-slate-200">{bijoyMode === 'ansi' ? 'Bijoy Classic (ANSI)' : 'Bijoy Unicode'}</strong>
            <span className="mx-2" aria-hidden="true">·</span>
            ইনপুট: <strong className="text-slate-800 dark:text-slate-200">{inputMode === 'virtual' ? 'Virtual Bijoy Mapper' : 'System IME'}</strong>
          </div>
          <span className="font-mono-num font-semibold">{progressPct}% সম্পন্ন</span>
        </div>

        <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-emerald-600 dark:bg-emerald-500 transition-all duration-200"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {finished && (
          <div
            className={[
              'rounded-xl border p-4 flex flex-wrap items-center justify-between gap-4',
              passed
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/70 text-emerald-900 dark:text-emerald-200'
                : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/70 text-amber-900 dark:text-amber-200',
            ].join(' ')}
          >
            <div className="flex items-start gap-3">
              {passed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              )}
              <div className="font-bangla">
                <div className="font-bold text-base">
                  {passed ? 'অভিনন্দন! অনুশীলন সফলভাবে সম্পন্ন হয়েছে' : 'অনুশীলন শেষ — আরও একটু অনুশীলন করুন'}
                </div>
                <div className="text-sm opacity-90 mt-0.5">
                  গতি: <span className="font-mono-num font-semibold">{stats.wpm} WPM</span> ({stats.cpm} CPM)
                  <span className="mx-2" aria-hidden="true">·</span>
                  নির্ভুলতা: <span className="font-mono-num font-semibold">{stats.accuracy}%</span>
                  <span className="mx-2" aria-hidden="true">·</span>
                  ভুল স্ট্রোক: <span className="font-mono-num font-semibold">{stats.errors}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={resetSession}
                className="px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                আবার চেষ্টা করুন
              </button>
              {onNext && nextLabel && (
                <button
                  type="button"
                  onClick={onNext}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {nextLabel}
                </button>
              )}
            </div>
          </div>
        )}

        <div
          onClick={() => inputRef.current?.focus()}
          className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0D1A2E] p-5 font-bangla text-2xl sm:text-[26px] leading-[1.9] tracking-[0.01em] min-h-[120px] select-none cursor-text"
        >
          {targetText.split('').map((ch, idx) => {
            if (idx < typedText.length) {
              const isMatch = typedText[idx] === ch;
              return (
                <span
                  key={idx}
                  className={
                    isMatch
                      ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-500/12 rounded-[3px]'
                      : 'text-red-600 dark:text-red-400 bg-red-500/15 underline decoration-wavy decoration-red-500 rounded-[3px]'
                  }
                >
                  {ch}
                </span>
              );
            }
            if (idx === typedText.length) {
              return (
                <span
                  key={idx}
                  className="border-b-[3px] border-emerald-600 dark:border-emerald-400 bg-emerald-500/15 rounded-[3px] text-slate-950 dark:text-white"
                >
                  {ch}
                </span>
              );
            }
            return (
              <span key={idx} className="text-slate-700 dark:text-slate-300">
                {ch}
              </span>
            );
          })}
        </div>

        <textarea
          ref={inputRef}
          rows={3}
          value={typedText}
          onKeyDown={handleKeyDown}
          onChange={handleImeChange}
          disabled={finished}
          aria-label="Bangla typing input box"
          placeholder={
            inputMode === 'virtual'
              ? 'সরাসরি ইংরেজি QWERTY কিবোর্ডে টাইপ করুন (Virtual Bijoy সক্রিয়)...'
              : 'আপনার কম্পিউটারের Bijoy IME চালু করে এখানে টাইপ করুন...'
          }
          className="w-full rounded-xl border-2 border-slate-200 dark:border-slate-700 focus:border-emerald-600 dark:focus:border-emerald-500 bg-white dark:bg-[#0B1526] px-4 py-3 font-bangla text-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none resize-none transition-colors"
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={resetSession}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>পুনরায় শুরু (Restart)</span>
            </button>
            {onNext && nextLabel && (
              <button
                type="button"
                onClick={onNext}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>{nextLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-bangla">
            ভুল হলে Backspace চেপে সংশোধন করুন
          </span>
        </div>

        <VisualKeyboard
          hint={nextHint}
          pressedCode={pressedCode}
          shiftPreview={shiftPreview}
          onToggleShiftPreview={() => setShiftPreview((p) => !p)}
          onKeyClick={handleOnScreenKeyClick}
          pendingStateLabel={pendingLabel}
        />
      </div>
    </div>
  );
};
