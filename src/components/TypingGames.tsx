import React, { useEffect, useRef, useState } from 'react';
import { Play, Square, Trophy } from 'lucide-react';
import {
  BijoyMode,
  InputMode,
  VirtualInputState,
  applyVirtualBijoyKeystroke,
  getNextKeyHint,
} from '../data/bijoyKeymap';
import { GAME_SENTENCES, GAME_WORDS } from '../data/lessons';

type GameType = 'word' | 'sentence' | 'timed';

interface TypingGamesProps {
  bijoyMode: BijoyMode;
  inputMode: InputMode;
  onGameFinish: (label: string, score: number, correct: number, accuracy: number) => void;
}

const INIT_VIRTUAL: VirtualInputState = {
  text: '',
  pendingPreKar: null,
  pendingHasanta: false,
  pendingReph: false,
  lastAutoPreKar: null,
};

export const TypingGames: React.FC<TypingGamesProps> = ({
  bijoyMode,
  inputMode,
  onGameFinish,
}) => {
  const [gameType, setGameType] = useState<GameType>('word');
  const [active, setActive] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [prompt, setPrompt] = useState('');
  const [typed, setTyped] = useState('');
  const [virtualState, setVirtualState] = useState<VirtualInputState>(INIT_VIRTUAL);
  const [finishSummary, setFinishSummary] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const scoreRef = useRef(0);
  const correctRef = useRef(0);
  const totalRef = useRef(0);

  const pickPrompt = (type: GameType) => {
    const pool = type === 'sentence' ? GAME_SENTENCES : GAME_WORDS;
    return pool[Math.floor(Math.random() * pool.length)];
  };

  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(id);
          setActive(false);
          const acc =
            totalRef.current > 0
              ? Math.min(100, Math.round((correctRef.current / totalRef.current) * 100))
              : 100;
          setFinishSummary(
            `সময় শেষ! আপনার চূড়ান্ত স্কোর: ${scoreRef.current} · নির্ভুলতা: ${acc}%`
          );
          onGameFinish(`Game (${gameType})`, scoreRef.current, correctRef.current, acc);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [active, gameType, onGameFinish]);

  const startGame = () => {
    const duration = gameType === 'timed' ? 60 : 90;
    scoreRef.current = 0;
    correctRef.current = 0;
    totalRef.current = 0;
    setScore(0);
    setStreak(0);
    setCorrectCount(0);
    setTotalKeystrokes(0);
    setTimeLeft(duration);
    setPrompt(pickPrompt(gameType));
    setTyped('');
    setVirtualState(INIT_VIRTUAL);
    setFinishSummary(null);
    setActive(true);
    window.setTimeout(() => inputRef.current?.focus(), 40);
  };

  const stopGame = () => {
    setActive(false);
    setFinishSummary(`গেম থামানো হয়েছে · বর্তমান স্কোর: ${score}`);
  };

  const evaluateValue = (nextVal: string) => {
    totalRef.current += 1;
    setTotalKeystrokes(totalRef.current);

    if (nextVal === prompt) {
      correctRef.current += 1;
      setCorrectCount(correctRef.current);
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      const earned = 10 + Math.min(20, nextStreak * 2);
      scoreRef.current += earned;
      setScore(scoreRef.current);
      setPrompt(pickPrompt(gameType));
      setTyped('');
      setVirtualState(INIT_VIRTUAL);
      return;
    }

    if (prompt.startsWith(nextVal)) {
      correctRef.current += 1;
      setCorrectCount(correctRef.current);
    } else {
      setStreak(0);
    }
    setTyped(nextVal);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!active || inputMode !== 'virtual') return;
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
      } else {
        const sliced = typed.slice(0, -1);
        setTyped(sliced);
        setVirtualState({ ...virtualState, text: sliced, lastAutoPreKar: null });
      }
      return;
    }

    if (e.key.length === 1) {
      e.preventDefault();
      const nextVirtual = applyVirtualBijoyKeystroke(e.key, virtualState, bijoyMode);
      setVirtualState(nextVirtual);
      evaluateValue(nextVirtual.text);
    }
  };

  const handleImeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!active || inputMode !== 'ime') return;
    evaluateValue(e.target.value);
  };

  const accuracy =
    totalKeystrokes > 0 ? Math.min(100, Math.round((correctCount / totalKeystrokes) * 100)) : 100;

  const hint = active
    ? getNextKeyHint(
        prompt,
        typed,
        bijoyMode,
        virtualState.pendingPreKar,
        virtualState.pendingHasanta
      )
    : null;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111E33] p-5 sm:p-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-bangla">
          টাইপিং গেমস (Typing Games)
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 font-bangla">
          নির্দেশনা: স্ক্রিনে প্রদর্শিত বাংলা শব্দ বা বাক্যটি সঠিকভাবে টাইপ করুন। পুরো লেখা মিলে গেলেই স্বয়ংক্রিয়ভাবে পরের চ্যালেঞ্জ আসবে এবং ধারাবাহিক সঠিক টাইপিংয়ে বোনাস পয়েন্ট পাবেন।
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          {[
            { id: 'word' as GameType, label: 'শব্দ চ্যালেঞ্জ (Word)' },
            { id: 'sentence' as GameType, label: 'বাক্য চ্যালেঞ্জ (Sentence)' },
            { id: 'timed' as GameType, label: 'টাইমড চ্যালেঞ্জ (60s Blitz)' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActive(false);
                setGameType(tab.id);
                setTimeLeft(tab.id === 'timed' ? 60 : 90);
                setFinishSummary(null);
              }}
              className={[
                'px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer',
                gameType === tab.id
                  ? 'bg-emerald-600 text-white'
                  : 'border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800',
              ].join(' ')}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111E33] p-4">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400 font-bangla">স্কোর</div>
          <div className="text-2xl font-bold font-mono-num text-slate-900 dark:text-white mt-1">{score}</div>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111E33] p-4">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400 font-bangla">ধারাবাহিকতা (Streak)</div>
          <div className="text-2xl font-bold font-mono-num text-slate-900 dark:text-white mt-1">{streak}</div>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111E33] p-4">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400 font-bangla">নির্ভুলতা</div>
          <div className="text-2xl font-bold font-mono-num text-slate-900 dark:text-white mt-1">{accuracy}%</div>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111E33] p-4">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400 font-bangla">বাকি সময়</div>
          <div className="text-2xl font-bold font-mono-num text-slate-900 dark:text-white mt-1">{timeLeft}s</div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111E33] p-6 sm:p-8 text-center">
        {!active ? (
          <div className="space-y-4 max-w-md mx-auto">
            {finishSummary && (
              <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 p-4 text-sm font-bangla text-emerald-900 dark:text-emerald-200 flex items-center justify-center gap-2">
                <Trophy className="w-4 h-4 shrink-0" />
                <span>{finishSummary}</span>
              </div>
            )}
            <p className="text-sm text-slate-600 dark:text-slate-300 font-bangla">
              {gameType === 'word'
                ? 'দ্রুত একের পর এক বাংলা শব্দ টাইপ করে পয়েন্ট জমান (৯০ সেকেন্ড)।'
                : gameType === 'sentence'
                  ? 'দাঁড়ি ও বিরামচিহ্নসহ পূর্ণাঙ্গ বাংলা বাক্য টাইপ করুন (৯০ সেকেন্ড)।'
                  : '৬০ সেকেন্ডের দ্রুতগতির টাইমড চ্যালেঞ্জে সর্বোচ্চ স্কোর গড়ুন।'}
            </p>
            <button
              type="button"
              onClick={startGame}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Play className="w-4 h-4" />
              <span>গেম শুরু করুন</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4 max-w-xl mx-auto">
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 font-bangla">
              এই লেখাটি টাইপ করুন
            </div>
            <div className="text-3xl sm:text-4xl font-bold font-bangla text-emerald-700 dark:text-emerald-400 py-2">
              {prompt.split('').map((ch, idx) => (
                <span
                  key={idx}
                  className={
                    idx < typed.length
                      ? typed[idx] === ch
                        ? 'text-slate-400 dark:text-slate-500'
                        : 'text-red-600 dark:text-red-400 underline'
                      : ''
                  }
                >
                  {ch}
                </span>
              ))}
            </div>
            {hint && (
              <div className="text-xs font-bangla text-slate-500 dark:text-slate-400">
                কী ইঙ্গিত: <strong className="text-slate-800 dark:text-slate-200">{hint.sequenceHint}</strong>
              </div>
            )}
            <input
              ref={inputRef}
              type="text"
              value={typed}
              onKeyDown={handleKeyDown}
              onChange={handleImeChange}
              placeholder={
                inputMode === 'virtual'
                  ? 'ইংরেজি কীতে টাইপ করুন...'
                  : 'Bijoy IME দিয়ে টাইপ করুন...'
              }
              className="w-full rounded-xl border-2 border-slate-200 dark:border-slate-700 focus:border-emerald-600 dark:focus:border-emerald-500 bg-slate-50 dark:bg-[#0B1526] px-4 py-3 text-center font-bangla text-xl text-slate-900 dark:text-white focus:outline-none"
            />
            <div>
              <button
                type="button"
                onClick={stopGame}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Square className="w-3.5 h-3.5" />
                <span>গেম থামান</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
