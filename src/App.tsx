import React, { useCallback, useEffect, useState } from 'react';
import {
  LayoutDashboard,
  Compass,
  Keyboard,
  BookOpen,
  PenTool,
  Gauge,
  Gamepad2,
  BarChart3,
  Info,
  Mail,
  Code2,
  Sun,
  Moon,
  Menu,
  X,
  ArrowRight,
  RotateCcw,
  Check,
  Smartphone,
} from 'lucide-react';
import {
  BijoyMode,
  CONJUNCT_GUIDE,
  InputMode,
  KeyDefinition,
  MODE_DIFFERENCES,
} from './data/bijoyKeymap';
import {
  LESSONS,
  PRACTICE_CATEGORIES,
  SPEED_TEST_PASSAGES,
} from './data/lessons';
import { TypingStudio, TypingSessionResult } from './components/TypingStudio';
import { VisualKeyboard } from './components/VisualKeyboard';
import { TypingGames } from './components/TypingGames';
import { BloggerXmlStudio } from './components/BloggerXmlStudio';

type RouteId =
  | 'home'
  | 'start'
  | 'keyboard'
  | 'lessons'
  | 'practice'
  | 'speedtest'
  | 'games'
  | 'progress'
  | 'about'
  | 'contact'
  | 'blogger-xml';

interface HistoryEntry {
  date: string;
  label: string;
  mode: string;
  wpm: number;
  cpm: number;
  accuracy: number;
}

interface BestScore {
  wpm: number;
  accuracy: number;
}

interface StoredProgress {
  bijoyMode: BijoyMode;
  inputMode: InputMode;
  theme: 'light' | 'dark';
  activeLessonId: number;
  completedLessons: number[];
  bestScores: Record<number, BestScore>;
  history: HistoryEntry[];
}

const STORAGE_KEY = 'shikhon_shala_app_v1';

const DEFAULT_PROGRESS: StoredProgress = {
  bijoyMode: 'unicode',
  inputMode: 'virtual',
  theme: 'light',
  activeLessonId: 1,
  completedLessons: [],
  bestScores: {},
  history: [],
};

function loadProgress(): StoredProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<StoredProgress>;
    return {
      bijoyMode: parsed.bijoyMode === 'ansi' ? 'ansi' : 'unicode',
      inputMode: parsed.inputMode === 'ime' ? 'ime' : 'virtual',
      theme: parsed.theme === 'dark' ? 'dark' : 'light',
      activeLessonId: typeof parsed.activeLessonId === 'number' ? parsed.activeLessonId : 1,
      completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
      bestScores: parsed.bestScores ?? {},
      history: Array.isArray(parsed.history) ? parsed.history : [],
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

const NAV_ITEMS: { id: RouteId; labelBn: string; labelEn: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'home', labelBn: 'হোম / ড্যাশবোর্ড', labelEn: 'Dashboard', icon: LayoutDashboard },
  { id: 'start', labelBn: 'শেখা শুরু করুন', labelEn: 'Start Learning', icon: Compass },
  { id: 'keyboard', labelBn: 'বিজয় কিবোর্ড লেআউট', labelEn: 'Keyboard Layout', icon: Keyboard },
  { id: 'lessons', labelBn: '১২টি লেসন', labelEn: 'Lessons (01–12)', icon: BookOpen },
  { id: 'practice', labelBn: 'টাইপিং অনুশীলন', labelEn: 'Typing Practice', icon: PenTool },
  { id: 'speedtest', labelBn: 'স্পিড টেস্ট', labelEn: 'Speed Test', icon: Gauge },
  { id: 'games', labelBn: 'টাইপিং গেমস', labelEn: 'Typing Games', icon: Gamepad2 },
  { id: 'progress', labelBn: 'অগ্রগতি রিপোর্ট', labelEn: 'Progress Report', icon: BarChart3 },
  { id: 'about', labelBn: 'শিখনশালা সম্পর্কে', labelEn: 'About', icon: Info },
  { id: 'contact', labelBn: 'যোগাযোগ', labelEn: 'Contact', icon: Mail },
  { id: 'blogger-xml', labelBn: 'Blogger XML থিম', labelEn: 'Get XML Theme', icon: Code2 },
];

export default function App() {
  const [progress, setProgress] = useState<StoredProgress>(() => loadProgress());
  const [route, setRoute] = useState<RouteId>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sub-state for interactive pages
  const [activeDrillIdx, setActiveDrillIdx] = useState(0);
  const [practiceCatIdx, setPracticeCatIdx] = useState(0);
  const [practiceTextIdx, setPracticeTextIdx] = useState(0);
  const [customPracticeInput, setCustomPracticeInput] = useState('');
  const [customPracticeActive, setCustomPracticeActive] = useState<string | null>(null);
  const [testDuration, setTestDuration] = useState<60 | 180 | 300>(60);
  const [testPassageIdx, setTestPassageIdx] = useState(0);
  const [refShiftPreview, setRefShiftPreview] = useState(false);
  const [selectedRefKey, setSelectedRefKey] = useState<KeyDefinition | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage errors
    }
  }, [progress]);

  useEffect(() => {
    const root = document.documentElement;
    if (progress.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [progress.theme]);

  const recordHistory = useCallback(
    (label: string, wpm: number, cpm: number, accuracy: number) => {
      setProgress((prev) => ({
        ...prev,
        history: [
          {
            date: new Date().toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            }),
            label,
            mode: prev.bijoyMode === 'ansi' ? 'Classic ANSI' : 'Unicode',
            wpm,
            cpm,
            accuracy,
          },
          ...prev.history.slice(0, 24),
        ],
      }));
    },
    []
  );

  const handleLessonComplete = useCallback(
    (lessonId: number, minAccuracy: number, res: TypingSessionResult) => {
      setProgress((prev) => {
        const passed = res.accuracy >= minAccuracy;
        const completedLessons =
          passed && !prev.completedLessons.includes(lessonId)
            ? [...prev.completedLessons, lessonId]
            : prev.completedLessons;
        const existingBest = prev.bestScores[lessonId];
        const nextBest =
          !existingBest || res.wpm > existingBest.wpm
            ? { wpm: res.wpm, accuracy: res.accuracy }
            : existingBest;
        return {
          ...prev,
          completedLessons,
          bestScores: { ...prev.bestScores, [lessonId]: nextBest },
          history: [
            {
              date: new Date().toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              }),
              label: `Lesson ${String(lessonId).padStart(2, '0')}`,
              mode: prev.bijoyMode === 'ansi' ? 'Classic ANSI' : 'Unicode',
              wpm: res.wpm,
              cpm: res.cpm,
              accuracy: res.accuracy,
            },
            ...prev.history.slice(0, 24),
          ],
        };
      });
    },
    []
  );

  const navigate = (next: RouteId) => {
    setRoute(next);
    setMobileMenuOpen(false);
    setConfirmReset(false);
  };

  const completedCount = progress.completedLessons.length;
  const progressPct = Math.round((completedCount / LESSONS.length) * 100);
  const bestWpm = Object.values(progress.bestScores).reduce(
    (max, item) => Math.max(max, item.wpm),
    0
  );
  const nextUncompletedLesson =
    LESSONS.find((l) => !progress.completedLessons.includes(l.id)) ?? LESSONS[0];

  const activeLesson = LESSONS.find((l) => l.id === progress.activeLessonId) ?? LESSONS[0];
  const activePracticeCat = PRACTICE_CATEGORIES[practiceCatIdx] ?? PRACTICE_CATEGORIES[0];
  const activePracticeText =
    customPracticeActive ?? activePracticeCat.texts[practiceTextIdx] ?? activePracticeCat.texts[0];
  const activeTestPassage = SPEED_TEST_PASSAGES[testPassageIdx] ?? SPEED_TEST_PASSAGES[0];

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-[#0B1526] text-slate-900 dark:text-slate-100">
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-950/60 z-40 lg:hidden"
        />
      )}

      {/* Desktop Sidebar & Mobile Slide-out Drawer */}
      <aside
        aria-label="Primary Navigation"
        className={[
          'fixed lg:sticky top-0 left-0 z-50 h-screen w-[272px] shrink-0 bg-[#0B1526] text-slate-200 border-r border-white/10 flex flex-col transition-transform duration-200',
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        ].join(' ')}
      >
        <div className="px-5 py-5 border-b border-white/10 flex items-center justify-between gap-2">
          <div>
            <button
              type="button"
              onClick={() => navigate('home')}
              className="text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-500 rounded"
            >
              <div className="text-lg font-extrabold tracking-tight text-white">
                Shikhon Shala
              </div>
              <div className="text-xs font-bangla text-slate-400 mt-0.5">
                শিখনশালা · বাংলা টাইপিং শিখুন
              </div>
            </button>
          </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
            className="lg:hidden p-1.5 rounded-lg text-slate-300 hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = route === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate(item.id)}
                className={[
                  'w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-sm transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-400',
                  active
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'text-slate-300 hover:bg-white/8 hover:text-white font-medium',
                ].join(' ')}
              >
                <span className="flex items-center gap-2.5 min-w-0">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="font-bangla truncate">{item.labelBn}</span>
                </span>
                <span className="text-[11px] opacity-70 shrink-0">{item.labelEn}</span>
              </button>
            );
          })}
        </nav>

        <div className="px-5 py-3.5 border-t border-white/10 text-xs text-slate-400">
          <div>Free Bijoy Bangla Tutor</div>
          <div className="mt-0.5 opacity-80">Saved locally on this device</div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Workspace Bar */}
        <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#111E33]/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="lg:hidden inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-semibold text-slate-800 dark:text-slate-100 cursor-pointer"
            >
              <Menu className="w-4 h-4" />
              <span>মেনু</span>
            </button>
            <div className="hidden sm:block text-sm font-semibold text-slate-700 dark:text-slate-200 font-bangla">
              {NAV_ITEMS.find((n) => n.id === route)?.labelBn}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Bijoy Mode Selector */}
            <div
              role="group"
              aria-label="Bijoy Layout Encoding Mode"
              className="inline-flex rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 p-0.5"
            >
              <button
                type="button"
                onClick={() => setProgress((p) => ({ ...p, bijoyMode: 'unicode' }))}
                className={[
                  'px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer',
                  progress.bijoyMode === 'unicode'
                    ? 'bg-white dark:bg-[#182946] text-emerald-700 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white',
                ].join(' ')}
              >
                Bijoy Unicode
              </button>
              <button
                type="button"
                onClick={() => setProgress((p) => ({ ...p, bijoyMode: 'ansi' }))}
                className={[
                  'px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer',
                  progress.bijoyMode === 'ansi'
                    ? 'bg-white dark:bg-[#182946] text-emerald-700 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white',
                ].join(' ')}
              >
                Bijoy Classic (ANSI)
              </button>
            </div>

            {/* Input Mode Selector */}
            <div
              role="group"
              aria-label="Keyboard Input Mode"
              className="inline-flex rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 p-0.5"
            >
              <button
                type="button"
                onClick={() => setProgress((p) => ({ ...p, inputMode: 'virtual' }))}
                className={[
                  'px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer',
                  progress.inputMode === 'virtual'
                    ? 'bg-white dark:bg-[#182946] text-emerald-700 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white',
                ].join(' ')}
              >
                Virtual Mapper
              </button>
              <button
                type="button"
                onClick={() => setProgress((p) => ({ ...p, inputMode: 'ime' }))}
                className={[
                  'px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer',
                  progress.inputMode === 'ime'
                    ? 'bg-white dark:bg-[#182946] text-emerald-700 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white',
                ].join(' ')}
              >
                System IME
              </button>
            </div>

            {/* Light / Dark Mode Toggle */}
            <button
              type="button"
              onClick={() =>
                setProgress((p) => ({ ...p, theme: p.theme === 'dark' ? 'light' : 'dark' }))
              }
              aria-label="Toggle light and dark theme"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {progress.theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-600" />
                  <span>Dark</span>
                </>
              )}
            </button>
          </div>
        </header>

        {/* Main View Container */}
        <main className="flex-1 max-w-[1200px] w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
          {/* Mobile Typing Guidance Banner */}
          <div className="lg:hidden rounded-xl border border-amber-200 dark:border-amber-800/60 bg-amber-50 dark:bg-amber-950/40 p-3.5 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5 font-bangla">
            <Smartphone className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              মোবাইল ব্যবহারকারীদের জন্য নির্দেশনা: বিজয় টাইপিং মূলত ডেস্কটপ QWERTY কিবোর্ডের জন্য। তবে মোবাইলেও নিচের ভিজ্যুয়াল কিবোর্ডের বোতামে ট্যাপ করে প্রতিটি বর্ণ ও কী-অবস্থান অনুশীলন করতে পারবেন।
            </span>
          </div>

          {route === 'home' && (
            <div className="space-y-6">
              <section className="rounded-2xl bg-gradient-to-br from-[#0B1526] to-[#13294B] text-white p-6 sm:p-8 border border-slate-800">
                <h1 className="text-2xl sm:text-4xl font-extrabold font-bangla tracking-tight max-w-3xl text-balance">
                  শিখনশালা (Shikhon Shala) — বাংলা টাইপিং শিখুন, দক্ষতা বাড়ান।
                </h1>
                <p className="text-sm sm:text-base text-slate-300 font-bangla mt-3 max-w-2xl leading-relaxed">
                  শুরু থেকে পেশাদার দক্ষতা পর্যন্ত সম্পূর্ণ বিনামূল্যে বিজয় ইউনিকোড এবং বিজয় ক্লাসিক (ANSI) বাংলা টাইপিং শেখার পূর্ণাঙ্গ ইন্টার‍্যাক্টিভ প্ল্যাটফর্ম ও আপলোড-রেডি Blogger XML থিম।
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setProgress((p) => ({ ...p, activeLessonId: nextUncompletedLesson.id }));
                      setActiveDrillIdx(0);
                      navigate('lessons');
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>শেখা শুরু করুন</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('blogger-xml')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Code2 className="w-4 h-4" />
                    <span>Get Blogger XML Theme</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('speedtest')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>স্পিড টেস্ট দিন</span>
                  </button>
                </div>
              </section>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111E33] p-5">
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400 font-bangla">সম্পন্ন লেসন</div>
                  <div className="text-2xl font-bold font-mono-num text-slate-900 dark:text-white mt-1">
                    {completedCount} / {LESSONS.length}
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111E33] p-5">
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400 font-bangla">মোট অগ্রগতি</div>
                  <div className="text-2xl font-bold font-mono-num text-slate-900 dark:text-white mt-1">
                    {progressPct}%
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111E33] p-5">
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400 font-bangla">সর্বোচ্চ গতি</div>
                  <div className="text-2xl font-bold font-mono-num text-slate-900 dark:text-white mt-1">
                    {bestWpm} WPM
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111E33] p-5">
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400 font-bangla">সক্রিয় মোড</div>
                  <div className="text-base font-bold text-emerald-700 dark:text-emerald-400 mt-2">
                    {progress.bijoyMode === 'ansi' ? 'Bijoy Classic (ANSI)' : 'Bijoy Unicode'}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111E33] p-6 space-y-4">
                  <h2 className="text-xl font-bold font-bangla text-slate-900 dark:text-white">
                    ১২টি ধাপের পূর্ণাঙ্গ কারিকুলাম
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300 font-bangla">
                    হোম রো পরিচিতি থেকে স্বরবর্ণ, ব্যঞ্জনবর্ণ, কার চিহ্ন, ফলা, যুক্তবর্ণ, বাস্তব দাপ্তরিক অনুশীলন এবং চূড়ান্ত পরীক্ষা।
                  </p>
                  <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 dark:bg-emerald-500"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-bangla">পরবর্তী: লেসন {nextUncompletedLesson.code}</span>
                    <button
                      type="button"
                      onClick={() => navigate('lessons')}
                      className="text-emerald-700 dark:text-emerald-400 font-semibold hover:underline cursor-pointer"
                    >
                      সকল লেসন দেখুন →
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111E33] p-6 space-y-4">
                  <h2 className="text-xl font-bold font-bangla text-slate-900 dark:text-white">
                    ইন্টার‍্যাক্টিভ গেমস ও স্পিড টেস্ট
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300 font-bangla">
                    ১, ৩ ও ৫ মিনিটের স্পিড টেস্ট এবং শব্দ, বাক্য ও টাইমড চ্যালেঞ্জ গেমের মাধ্যমে আপনার টাইপিং গতি যাচাই করুন।
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => navigate('games')}
                      className="px-4 py-2 rounded-lg bg-slate-900 dark:bg-slate-800 text-white text-xs font-semibold hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      গেমস খেলুন
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('keyboard')}
                      className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      বিজয় কিবোর্ড ম্যাপ দেখুন
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {route === 'start' && (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111E33] p-6 space-y-6">
              <div>
                <h1 className="text-2xl font-bold font-bangla text-slate-900 dark:text-white">
                  বিজয় বাংলা টাইপিং শেখা শুরু করুন
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-300 font-bangla mt-1">
                  সঠিকভাবে বিজয় লেআউট শেখার জন্য নিচের তিনটি মৌলিক নিয়ম অনুসরণ করুন:
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0D1A2E] p-5 space-y-2">
                  <div className="text-xs font-mono-num text-emerald-700 dark:text-emerald-400 font-semibold">STEP 01</div>
                  <h2 className="text-base font-bold font-bangla">হোম রো-তে আঙুল স্থাপন</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300 font-bangla">
                    বাম হাতের চার আঙুল A, S, D, F এবং ডান হাতের চার আঙুল J, K, L, ; কীতে রাখুন। বৃদ্ধাঙ্গুলি রাখুন Space বারের ওপর।
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0D1A2E] p-5 space-y-2">
                  <div className="text-xs font-mono-num text-emerald-700 dark:text-emerald-400 font-semibold">STEP 02</div>
                  <h2 className="text-base font-bold font-bangla">G (হসন্ত) ও Shift এর ব্যবহার</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300 font-bangla">
                    আ, ই, ঈ, উ, ঊ, ঋ, এ, ঐ, ঔ লিখতে প্রথমে G চেপে তারপর সংশ্লিষ্ট কার কী চাপুন। যুক্তবর্ণের মাঝেও G বসে (যেমন: ক + G + ষ = ক্ষ)।
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0D1A2E] p-5 space-y-2">
                  <div className="text-xs font-mono-num text-emerald-700 dark:text-emerald-400 font-semibold">STEP 03</div>
                  <h2 className="text-base font-bold font-bangla">Unicode বনাম Classic ANSI</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300 font-bangla">
                    ওয়েব ও ডিজিটাল লেখার জন্য Bijoy Unicode এবং প্রিন্টিং প্রেসের SutonnyMJ কাজের জন্য Bijoy Classic (ANSI) মোড বেছে নিন।
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigate('lessons')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                <span>লেসন ০১ শুরু করুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {route === 'keyboard' && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111E33] p-6 space-y-4">
                <div>
                  <h1 className="text-2xl font-bold font-bangla text-slate-900 dark:text-white">
                    বিজয় কিবোর্ড লেআউট ও পূর্ণাঙ্গ রেফারেন্স
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-300 font-bangla mt-1">
                    যেকোনো কীতে ক্লিক করে তার বাংলা বর্ণ, Shift বর্ণ ও আঙুলের নির্দেশনা দেখুন।
                  </p>
                </div>

                <VisualKeyboard
                  shiftPreview={refShiftPreview}
                  onToggleShiftPreview={() => setRefShiftPreview((p) => !p)}
                  selectedKeyCode={selectedRefKey?.code ?? null}
                  onKeyClick={(k) => setSelectedRefKey(k)}
                />

                {selectedRefKey && (
                  <div className="rounded-xl border border-emerald-200 dark:border-emerald-800/70 bg-emerald-50 dark:bg-emerald-950/40 p-4 text-sm font-bangla text-emerald-900 dark:text-emerald-200">
                    <strong>Key:</strong> <span className="font-mono-num">{selectedRefKey.en.toUpperCase()}</span>
                    <span className="mx-2" aria-hidden="true">·</span>
                    <strong>Finger:</strong> <span className="font-mono-num">{selectedRefKey.finger}</span>
                    <span className="mx-2" aria-hidden="true">·</span>
                    <strong>স্বাভাবিক:</strong> {selectedRefKey.bnName}
                    <span className="mx-2" aria-hidden="true">·</span>
                    <strong>Shift:</strong> {selectedRefKey.bnShiftName}
                    {selectedRefKey.note && (
                      <div className="text-xs mt-1 opacity-90">{selectedRefKey.note}</div>
                    )}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111E33] p-6">
                  <h2 className="text-lg font-bold font-bangla text-slate-900 dark:text-white mb-3">
                    Bijoy Classic (ANSI) বনাম Bijoy Unicode পার্থক্য
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                          <th className="py-2 pr-3 font-semibold">Aspect</th>
                          <th className="py-2 pr-3 font-semibold">Classic (ANSI)</th>
                          <th className="py-2 font-semibold">Bijoy Unicode</th>
                        </tr>
                      </thead>
                      <tbody>
                        {MODE_DIFFERENCES.map((row) => (
                          <tr key={row.aspect} className="border-b border-slate-100 dark:border-slate-800/70">
                            <td className="py-2.5 pr-3 font-semibold text-slate-800 dark:text-slate-200">
                              {row.aspect}
                            </td>
                            <td className="py-2.5 pr-3 text-slate-600 dark:text-slate-300 font-bangla">
                              {row.ansi}
                            </td>
                            <td className="py-2.5 text-slate-600 dark:text-slate-300 font-bangla">
                              {row.unicode}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111E33] p-6">
                  <h2 className="text-lg font-bold font-bangla text-slate-900 dark:text-white mb-3">
                    প্রয়োজনীয় যুক্তবর্ণ (Juktakshar) তালিকা
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                          <th className="py-2 pr-3 font-semibold">যুক্তবর্ণ</th>
                          <th className="py-2 pr-3 font-semibold">গঠন</th>
                          <th className="py-2 pr-3 font-semibold">বিজয় কী</th>
                          <th className="py-2 font-semibold">উদাহরণ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {CONJUNCT_GUIDE.map((item) => (
                          <tr key={item.conjunct} className="border-b border-slate-100 dark:border-slate-800/70">
                            <td className="py-2 pr-3 font-bangla text-lg font-bold text-emerald-700 dark:text-emerald-400">
                              {item.conjunct}
                            </td>
                            <td className="py-2 pr-3 font-bangla text-slate-600 dark:text-slate-300">
                              {item.parts}
                            </td>
                            <td className="py-2 pr-3 font-mono-num text-xs font-semibold text-slate-800 dark:text-slate-200">
                              {item.keys}
                            </td>
                            <td className="py-2 font-bangla text-slate-600 dark:text-slate-300">
                              {item.example}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {route === 'lessons' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111E33] p-4 sm:p-6 space-y-4">
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {LESSONS.map((lesson) => {
                    const isDone = progress.completedLessons.includes(lesson.id);
                    const isActive = lesson.id === activeLesson.id;
                    return (
                      <button
                        key={lesson.id}
                        type="button"
                        onClick={() => {
                          setProgress((p) => ({ ...p, activeLessonId: lesson.id }));
                          setActiveDrillIdx(0);
                        }}
                        className={[
                          'inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer',
                          isActive
                            ? 'bg-emerald-600 text-white'
                            : 'border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800',
                        ].join(' ')}
                      >
                        <span className="font-bangla">লেসন {lesson.code}</span>
                        {isDone && <Check className="w-3.5 h-3.5" />}
                      </button>
                    );
                  })}
                </div>

                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <span>Lesson {activeLesson.code}</span>
                    <span className="mx-1.5" aria-hidden="true">·</span>
                    <span>{activeLesson.category}</span>
                    <span className="mx-1.5" aria-hidden="true">·</span>
                    <span className="font-mono-num">
                      Target {activeLesson.targetAccuracy}% accuracy / {activeLesson.targetWpm} WPM
                    </span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold font-bangla text-slate-900 dark:text-white mt-1">
                    {activeLesson.titleBn} ({activeLesson.titleEn})
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-300 font-bangla mt-1">
                    {activeLesson.goalBn}
                  </p>
                  <div className="mt-3 rounded-xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/35 px-4 py-2.5 text-xs sm:text-sm font-bangla text-emerald-900 dark:text-emerald-200">
                    {progress.bijoyMode === 'ansi' ? activeLesson.ansiTip : activeLesson.unicodeTip}
                  </div>
                  {activeLesson.drills.length > 1 && (
                    <div className="flex gap-2 mt-3">
                      {activeLesson.drills.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveDrillIdx(idx)}
                          className={[
                            'px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer',
                            activeDrillIdx === idx
                              ? 'bg-slate-900 dark:bg-emerald-600 text-white'
                              : 'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200',
                          ].join(' ')}
                        >
                          অনুশীলন {idx + 1}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <TypingStudio
                targetText={activeLesson.drills[activeDrillIdx] ?? activeLesson.drills[0]}
                bijoyMode={progress.bijoyMode}
                inputMode={progress.inputMode}
                minAccuracy={activeLesson.targetAccuracy}
                nextLabel={activeLesson.id < LESSONS.length ? 'পরবর্তী লেসন' : 'অগ্রগতি দেখুন'}
                onNext={() => {
                  if (activeLesson.id < LESSONS.length) {
                    setProgress((p) => ({ ...p, activeLessonId: activeLesson.id + 1 }));
                    setActiveDrillIdx(0);
                  } else {
                    navigate('progress');
                  }
                }}
                onComplete={(res) =>
                  handleLessonComplete(activeLesson.id, activeLesson.targetAccuracy, res)
                }
              />
            </div>
          )}

          {route === 'practice' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111E33] p-5 space-y-4">
                <div>
                  <h1 className="text-2xl font-bold font-bangla text-slate-900 dark:text-white">
                    স্বাধীন টাইপিং অনুশীলন (Typing Practice)
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-300 font-bangla mt-1">
                    বিভাগ বেছে নিন অথবা নিজের পছন্দের বাংলা লেখা দিয়ে অনুশীলন করুন।
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {PRACTICE_CATEGORIES.map((cat, idx) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setPracticeCatIdx(idx);
                        setPracticeTextIdx(0);
                        setCustomPracticeActive(null);
                      }}
                      className={[
                        'px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer',
                        practiceCatIdx === idx && !customPracticeActive
                          ? 'bg-emerald-600 text-white'
                          : 'border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200',
                      ].join(' ')}
                    >
                      {cat.labelBn} ({cat.labelEn})
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {activePracticeCat.texts.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setPracticeTextIdx(idx);
                        setCustomPracticeActive(null);
                      }}
                      className={[
                        'px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer',
                        practiceTextIdx === idx && !customPracticeActive
                          ? 'bg-slate-900 dark:bg-slate-700 text-white'
                          : 'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300',
                      ].join(' ')}
                    >
                      সেট {idx + 1}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  <input
                    type="text"
                    value={customPracticeInput}
                    onChange={(e) => setCustomPracticeInput(e.target.value)}
                    placeholder="নিজের বাংলা অনুশীলন লেখা পেস্ট বা টাইপ করুন..."
                    className="flex-1 min-w-[220px] rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0B1526] px-3.5 py-2 text-sm font-bangla text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (customPracticeInput.trim()) {
                        setCustomPracticeActive(customPracticeInput.trim());
                      }
                    }}
                    className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    কাস্টম লেখা লোড করুন
                  </button>
                </div>
              </div>

              <TypingStudio
                targetText={activePracticeText}
                bijoyMode={progress.bijoyMode}
                inputMode={progress.inputMode}
                minAccuracy={85}
                nextLabel="পরবর্তী অনুশীলন সেট"
                onNext={() => {
                  setCustomPracticeActive(null);
                  setPracticeTextIdx((i) => (i + 1) % activePracticeCat.texts.length);
                }}
                onComplete={(res) =>
                  recordHistory(`Practice (${activePracticeCat.labelEn})`, res.wpm, res.cpm, res.accuracy)
                }
              />
            </div>
          )}

          {route === 'speedtest' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111E33] p-5 space-y-4">
                <div>
                  <h1 className="text-2xl font-bold font-bangla text-slate-900 dark:text-white">
                    বিজয় টাইপিং স্পিড টেস্ট (Typing Speed Test)
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-300 font-bangla mt-1">
                    ১, ৩ অথবা ৫ মিনিট সময় নির্ধারণ করে আপনার প্রকৃত WPM ও নির্ভুলতা যাচাই করুন।
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {([60, 180, 300] as const).map((sec) => (
                      <button
                        key={sec}
                        type="button"
                        onClick={() => setTestDuration(sec)}
                        className={[
                          'px-4 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer',
                          testDuration === sec
                            ? 'bg-emerald-600 text-white'
                            : 'border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200',
                        ].join(' ')}
                      >
                        {sec / 60} মিনিট ({sec / 60} min)
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {SPEED_TEST_PASSAGES.map((ps, idx) => (
                      <button
                        key={ps.id}
                        type="button"
                        onClick={() => setTestPassageIdx(idx)}
                        className={[
                          'px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer',
                          testPassageIdx === idx
                            ? 'bg-slate-900 dark:bg-slate-700 text-white'
                            : 'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300',
                        ].join(' ')}
                      >
                        {ps.titleBn}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <TypingStudio
                targetText={activeTestPassage.text}
                bijoyMode={progress.bijoyMode}
                inputMode={progress.inputMode}
                durationSec={testDuration}
                minAccuracy={88}
                nextLabel="অন্য অনুচ্ছেদ"
                onNext={() => setTestPassageIdx((i) => (i + 1) % SPEED_TEST_PASSAGES.length)}
                onComplete={(res) =>
                  recordHistory(`Speed Test (${testDuration / 60}m)`, res.wpm, res.cpm, res.accuracy)
                }
              />
            </div>
          )}

          {route === 'games' && (
            <TypingGames
              bijoyMode={progress.bijoyMode}
              inputMode={progress.inputMode}
              onGameFinish={(label, score, correct, acc) =>
                recordHistory(label, score, correct, acc)
              }
            />
          )}

          {route === 'progress' && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111E33] p-6 space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold font-bangla text-slate-900 dark:text-white">
                      অগ্রগতি রিপোর্ট (Progress Report)
                    </h1>
                    <p className="text-sm text-slate-600 dark:text-slate-300 font-bangla mt-1 max-w-2xl">
                      আপনার সম্পন্ন লেসন, সেরা WPM এবং অনুশীলনের ইতিহাস কেবল আপনার এই ব্রাউজার ও ডিভাইসের LocalStorage-এ সংরক্ষিত থাকে। কোনো ক্লাউড অ্যাকাউন্ট বা সার্ভার লিডারবোর্ড নেই।
                    </p>
                  </div>

                  {!confirmReset ? (
                    <button
                      type="button"
                      onClick={() => setConfirmReset(true)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 dark:border-red-800/70 text-red-600 dark:text-red-400 text-xs font-semibold hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Reset Progress</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setProgress((p) => ({
                            ...DEFAULT_PROGRESS,
                            theme: p.theme,
                            bijoyMode: p.bijoyMode,
                            inputMode: p.inputMode,
                          }));
                          setConfirmReset(false);
                        }}
                        className="px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold cursor-pointer"
                      >
                        নিশ্চিত রিসেট
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmReset(false)}
                        className="px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold cursor-pointer"
                      >
                        বাতিল
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono-num text-slate-600 dark:text-slate-300 mb-1.5">
                    <span>{completedCount} / {LESSONS.length} Lessons Completed</span>
                    <span>{progressPct}%</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 dark:bg-emerald-500 transition-all"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111E33] p-6">
                <h2 className="text-lg font-bold font-bangla text-slate-900 dark:text-white mb-3">
                  লেসনভিত্তিক অগ্রগতি ও সেরা স্কোর
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                        <th className="py-2 pr-4 font-semibold">Lesson</th>
                        <th className="py-2 pr-4 font-semibold">Status</th>
                        <th className="py-2 pr-4 font-semibold">Best WPM</th>
                        <th className="py-2 font-semibold">Best Accuracy</th>
                      </tr>
                    </thead>
                    <tbody>
                      {LESSONS.map((l) => {
                        const done = progress.completedLessons.includes(l.id);
                        const bs = progress.bestScores[l.id];
                        return (
                          <tr key={l.id} className="border-b border-slate-100 dark:border-slate-800/70">
                            <td className="py-2.5 pr-4 font-bangla font-medium">
                              {l.code}. {l.titleBn}
                            </td>
                            <td className="py-2.5 pr-4 font-bangla">
                              {done ? (
                                <span className="text-emerald-700 dark:text-emerald-400 font-semibold">সম্পন্ন ✓</span>
                              ) : (
                                <span className="text-slate-400">বাকি</span>
                              )}
                            </td>
                            <td className="py-2.5 pr-4 font-mono-num">{bs ? bs.wpm : '—'}</td>
                            <td className="py-2.5 font-mono-num">{bs ? `${bs.accuracy}%` : '—'}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111E33] p-6">
                <h2 className="text-lg font-bold font-bangla text-slate-900 dark:text-white mb-3">
                  সাম্প্রতিক অনুশীলনের ইতিহাস
                </h2>
                {progress.history.length === 0 ? (
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-bangla">
                    এখনো কোনো অনুশীলনের রেকর্ড সংরক্ষিত হয়নি। যেকোনো লেসন, স্পিড টেস্ট বা গেম সম্পন্ন করলে এখানে দেখা যাবে।
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                          <th className="py-2 pr-4 font-semibold">Date</th>
                          <th className="py-2 pr-4 font-semibold">Activity</th>
                          <th className="py-2 pr-4 font-semibold">Mode</th>
                          <th className="py-2 pr-4 font-semibold">WPM / Score</th>
                          <th className="py-2 pr-4 font-semibold">CPM</th>
                          <th className="py-2 font-semibold">Accuracy</th>
                        </tr>
                      </thead>
                      <tbody>
                        {progress.history.map((h, i) => (
                          <tr key={i} className="border-b border-slate-100 dark:border-slate-800/70">
                            <td className="py-2 pr-4 font-mono-num text-xs">{h.date}</td>
                            <td className="py-2 pr-4 font-medium">{h.label}</td>
                            <td className="py-2 pr-4 text-slate-500 dark:text-slate-400">{h.mode}</td>
                            <td className="py-2 pr-4 font-mono-num">{h.wpm}</td>
                            <td className="py-2 pr-4 font-mono-num">{h.cpm}</td>
                            <td className="py-2 font-mono-num">{h.accuracy}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {route === 'about' && (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111E33] p-6 space-y-4">
              <h1 className="text-2xl font-bold font-bangla text-slate-900 dark:text-white">
                শিখনশালা (Shikhon Shala) সম্পর্কে
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-bangla leading-relaxed">
                শিখনশালা (Shikhon Shala) একটি সম্পূর্ণ বিনামূল্যের বাংলা বিজয় টাইপিং শেখার প্ল্যাটফর্ম ও Blogger XML থিম। বাংলা ভাষায় কম্পিউটার টাইপিং শেখাকে সহজ, বিনামূল্যে এবং সবার জন্য উন্মুক্ত করার লক্ষ্যে এটি তৈরি করা হয়েছে—যাতে কোনো সাইনআপ বা পেমেন্ট ছাড়াই শিক্ষার্থীরা বিজয় ইউনিকোড ও বিজয় ক্লাসিক (ANSI) শিখতে পারেন।
              </p>
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0D1A2E] p-5 space-y-2">
                <h2 className="text-base font-bold font-bangla text-slate-900 dark:text-white">
                  স্বচ্ছতা ও সীমাবদ্ধতা
                </h2>
                <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-600 dark:text-slate-300 font-bangla">
                  <li>ব্যবহারকারীর সমস্ত অগ্রগতি ও স্কোর কেবল নিজ ব্রাউজারের LocalStorage-এ সংরক্ষিত থাকে; কোনো ক্লাউড সার্ভার বা গ্লোবাল লিডারবোর্ড নেই।</li>
                  <li>ওয়েব ব্রাউজারে SutonnyMJ-এর মতো প্রোপ্রাইটারি ANSI ফন্ট না থাকায় Classic ANSI মোডেও লেখাটি পড়ার সুবিধার্থে ইউনিকোডে প্রদর্শিত হয়, তবে কী-স্ট্রোক ও প্রি-কার ক্রম খাঁটি Classic ANSI নিয়মে কাজ করে।</li>
                </ul>
              </div>
            </div>
          )}

          {route === 'contact' && (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111E33] p-6 max-w-2xl space-y-4">
              <div>
                <h1 className="text-2xl font-bold font-bangla text-slate-900 dark:text-white">
                  যোগাযোগ ও মতামত (Contact)
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-300 font-bangla mt-1">
                  লেসন উন্নয়ন, কিবোর্ড ম্যাপিং বা ব্লগার থিম সংক্রান্ত যেকোনো মতামত জানান।
                </p>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setContactSubmitted(true);
                  setContactName('');
                  setContactEmail('');
                  setContactMsg('');
                }}
                className="space-y-3"
              >
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1 font-bangla">
                    আপনার নাম
                  </label>
                  <input
                    required
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="যেমন: তানভীর আহমেদ"
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0B1526] px-3.5 py-2.5 text-sm font-bangla focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1 font-bangla">
                    ইমেইল ঠিকানা
                  </label>
                  <input
                    required
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0B1526] px-3.5 py-2.5 text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1 font-bangla">
                    বার্তা
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    placeholder="আপনার পরামর্শ বা প্রশ্ন লিখুন..."
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0B1526] px-3.5 py-2.5 text-sm font-bangla focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors cursor-pointer"
                >
                  বার্তা পাঠান
                </button>
              </form>

              {contactSubmitted && (
                <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 p-4 text-sm font-bangla text-emerald-900 dark:text-emerald-200">
                  ধন্যবাদ! আপনার বার্তাটি স্থানীয়ভাবে গৃহীত হয়েছে। সরাসরি ইমেইল যোগাযোগের জন্য Blogger থিমের ContactForm উইজেট বা আপনার ব্লগ ইমেইল যুক্ত করতে পারেন।
                </div>
              )}
            </div>
          )}

          {route === 'blogger-xml' && <BloggerXmlStudio />}
        </main>

        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111E33] px-6 py-4">
          <div className="max-w-[1200px] mx-auto flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
            <div className="font-bangla">
              © {new Date().getFullYear()} Shikhon Shala (শিখনশালা) — বিনামূল্যে বিজয় বাংলা টাইপিং শিখুন
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button type="button" onClick={() => navigate('keyboard')} className="hover:text-emerald-600 cursor-pointer">
                Bijoy Layout
              </button>
              <button type="button" onClick={() => navigate('lessons')} className="hover:text-emerald-600 cursor-pointer">
                Lessons
              </button>
              <button type="button" onClick={() => navigate('blogger-xml')} className="hover:text-emerald-600 cursor-pointer">
                Blogger XML
              </button>
              <button type="button" onClick={() => navigate('about')} className="hover:text-emerald-600 cursor-pointer">
                About
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
