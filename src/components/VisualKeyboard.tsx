import React from 'react';
import { KEYBOARD_ROWS, KeyDefinition, KeyHint } from '../data/bijoyKeymap';

interface VisualKeyboardProps {
  hint?: KeyHint | null;
  pressedCode?: string | null;
  shiftPreview: boolean;
  onToggleShiftPreview: () => void;
  selectedKeyCode?: string | null;
  onKeyClick?: (key: KeyDefinition) => void;
  pendingStateLabel?: string | null;
}

export const VisualKeyboard: React.FC<VisualKeyboardProps> = ({
  hint,
  pressedCode,
  shiftPreview,
  onToggleShiftPreview,
  selectedKeyCode,
  onKeyClick,
  pendingStateLabel,
}) => {
  const widthClass = (w?: KeyDefinition['width']) => {
    switch (w) {
      case 'wide-sm':
        return 'flex-[1.45]';
      case 'wide-md':
        return 'flex-[1.85]';
      case 'wide-lg':
        return 'flex-[2.35]';
      case 'space':
        return 'flex-[6] items-center justify-center';
      default:
        return 'flex-1';
    }
  };

  const activeShift = shiftPreview || Boolean(hint?.shift);

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-[#0D1A2E] p-3 sm:p-4">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
          {hint ? (
            <span className="font-bangla text-slate-700 dark:text-slate-200">
              পরবর্তী কী:{' '}
              <strong className="text-emerald-700 dark:text-emerald-400 font-semibold">
                {hint.sequenceHint}
              </strong>
              <span className="text-slate-400 mx-2" aria-hidden="true">·</span>
              <span className="font-mono-num text-xs text-slate-500 dark:text-slate-400">
                Finger: {hint.finger}
              </span>
            </span>
          ) : (
            <span className="font-bangla text-slate-600 dark:text-slate-300">
              যেকোনো কীতে ক্লিক করে বিজয় বাংলা বর্ণ ও আঙুলের অবস্থান দেখুন
            </span>
          )}
          {pendingStateLabel && (
            <span className="font-bangla text-xs font-semibold text-amber-700 dark:text-amber-400">
              অপেক্ষমাণ: {pendingStateLabel}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={onToggleShiftPreview}
          className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-emerald-600 dark:hover:border-emerald-500 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          {shiftPreview ? 'Shift Layer Active' : 'Show Shift Layer'}
        </button>
      </div>

      <div className="overflow-x-auto pb-1">
        <div className="min-w-[720px] flex flex-col gap-1.5">
          {KEYBOARD_ROWS.map((row, rIdx) => (
            <div key={rIdx} className="flex gap-1.5">
              {row.map((keyDef) => {
                const isShiftKey = keyDef.code === 'ShiftLeft' || keyDef.code === 'ShiftRight';
                const isExpected =
                  Boolean(hint) &&
                  (hint?.code === keyDef.code || (Boolean(hint?.shift) && isShiftKey));
                const isSelected = selectedKeyCode === keyDef.code;
                const isPressed = pressedCode === keyDef.code;

                return (
                  <button
                    key={keyDef.code}
                    type="button"
                    onClick={() => onKeyClick?.(keyDef)}
                    aria-label={`${keyDef.en} — ${keyDef.bnName}`}
                    className={[
                      'h-14 min-w-[42px] rounded-lg border border-b-[3px] px-1.5 py-1 flex flex-col justify-between text-left select-none transition-all duration-100 cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-600',
                      widthClass(keyDef.width),
                      isPressed
                        ? 'translate-y-[2px] bg-emerald-600 border-emerald-700 text-white'
                        : isExpected || isSelected
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-600 dark:border-emerald-500 ring-2 ring-emerald-500/25 text-slate-900 dark:text-white'
                          : 'bg-white dark:bg-[#13223A] border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:border-emerald-500/70',
                    ].join(' ')}
                  >
                    {keyDef.code === 'Space' ? (
                      <span className="font-bangla text-xs font-semibold text-center w-full">
                        Space / স্পেস
                      </span>
                    ) : (
                      <>
                        <div className="w-full flex items-center justify-between text-[10px] font-mono-num opacity-70">
                          <span className="font-semibold">
                            {keyDef.en.length === 1 ? keyDef.en.toUpperCase() : keyDef.en}
                          </span>
                          <span>{keyDef.finger}</span>
                        </div>
                        <div className="w-full flex items-baseline justify-between font-bangla">
                          <span className="text-base font-bold leading-none">
                            {activeShift ? keyDef.bnShift : keyDef.bn}
                          </span>
                          {!keyDef.isModifier && keyDef.bn !== keyDef.bnShift && (
                            <span className="text-[11px] opacity-60 leading-none">
                              {activeShift ? keyDef.bn : keyDef.bnShift}
                            </span>
                          )}
                        </div>
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
