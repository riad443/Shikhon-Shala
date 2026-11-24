export interface Lesson {
  id: number;
  code: string;
  titleBn: string;
  titleEn: string;
  category: string;
  goalBn: string;
  goalEn: string;
  unicodeTip: string;
  ansiTip: string;
  targetAccuracy: number;
  targetWpm: number;
  drills: string[];
}

export const LESSONS: Lesson[] = [
  {
    id: 1,
    code: '01',
    titleBn: 'বিজয় কিবোর্ড পরিচিতি ও হোম রো',
    titleEn: 'Introduction to Bijoy Keyboard',
    category: 'Foundation',
    goalBn: 'বাম ও ডান হাতের আঙুলগুলো হোম রো (A S D F G এবং H J K L) কীগুলোতে স্থাপন করে মূল ব্যঞ্জনবর্ণ ও কার চিহ্ন অনুশীলন করুন।',
    goalEn: 'Place your fingers on the home row (A S D F G / H J K L) and build muscle memory for core Bijoy consonants and signs.',
    unicodeTip: 'বিজয় ইউনিকোড মোডে (Ctrl+Alt+V) যেকোনো আধুনিক বাংলা ফন্টে সরাসরি টাইপ হয়।',
    ansiTip: 'বিজয় ক্লাসিক ANSI মোডে (Ctrl+Alt+B) হোম রো অনুশীলনের সময় প্রতিটি কী-স্ট্রোক SutonnyMJ-এর নির্দিষ্ট অক্ষরে ম্যাপ হয়।',
    targetAccuracy: 85,
    targetWpm: 10,
    drills: [
      'ক ত দ ব ব দ ত ক কা তা দা বা কাক তাক দাদ বাবা',
      'কত বদ কদম বক তব দব কাকা তাত দাদা কাকাতুয়া',
    ],
  },
  {
    id: 2,
    code: '02',
    titleBn: 'কিবোর্ড লেআউট ও ওপর-নিচ সারি পরিচিতি',
    titleEn: 'Keyboard Layout & Key Positions',
    category: 'Foundation',
    goalBn: 'উপরের সারি (Q–P) এবং নিচের সারির (Z–M) কীগুলোর অবস্থান ও শিফট কী ব্যবহার আয়ত্ত করুন।',
    goalEn: 'Master top-row (Q–P) and bottom-row (Z–M) positions along with Shift combinations.',
    unicodeTip: 'একই কীতে স্বাভাবিক ও Shift অবস্থানে দুটি করে বর্ণ থাকে (যেমন J = ক, Shift+J = খ)।',
    ansiTip: 'ক্লাসিক ANSI-তেও প্রতিটি QWERTY কী-এর অবস্থান অভিন্ন; বাম ও ডান কনিষ্ঠা দিয়ে Shift ধরুন।',
    targetAccuracy: 85,
    targetWpm: 12,
    drills: [
      'প ট চ জ হ গ য ড র ন স ম ল শ ষ খ থ ধ ভ ফ',
      'জল ফল ঘর মন পথ সন চমক গরম নরম পরম সহজ',
    ],
  },
  {
    id: 3,
    code: '03',
    titleBn: 'বাংলা স্বরবর্ণ অনুশীলন',
    titleEn: 'Bangla Vowels',
    category: 'Alphabet',
    goalBn: 'অ থেকে ঔ পর্যন্ত ১১টি স্বরবর্ণ G (হসন্ত) এবং Shift সমন্বয়ে নির্ভুলভাবে টাইপ করতে শিখুন।',
    goalEn: 'Practice all 11 independent Bangla vowels using Shift+F (অ), X (ও), and G + vowel-sign combinations.',
    unicodeTip: 'আ = G+F, ই = G+D, ঈ = G+Shift+D, উ = G+S, ঊ = G+Shift+S, ঋ = G+A, এ = G+C, ঐ = G+Shift+C, ঔ = G+Shift+X।',
    ansiTip: 'ক্লাসিক ANSI ও ইউনিকোডে স্বরবর্ণ তৈরির G-লিংক কী পদ্ধতি হুবহু একই থাকে।',
    targetAccuracy: 88,
    targetWpm: 12,
    drills: [
      'অ আ ই ঈ উ ঊ ঋ এ ঐ ও ঔ',
      'অমর আকাশ ইলিশ ঈগল উট ঊষা ঋতু একতা ঐক্য ওজন ঔষধ',
    ],
  },
  {
    id: 4,
    code: '04',
    titleBn: 'বাংলা ব্যঞ্জনবর্ণ অনুশীলন',
    titleEn: 'Bangla Consonants',
    category: 'Alphabet',
    goalBn: 'ক থেকে ঁ পর্যন্ত সকল ব্যঞ্জনবর্ণ ও বিশেষ বর্ণ (ড়, ঢ়, য়, ৎ, ং, ঃ, ঁ) দ্রুত টাইপ করুন।',
    goalEn: 'Build fluency across all 39 Bangla consonants including ড়, ঢ়, য়, ৎ, ং, ঃ, and ঁ.',
    unicodeTip: 'ৎ = ব্যাকস্ল্যাশ (\\), ঃ = Shift+\\ (|), ং = Shift+Q এবং ঁ = Shift+7।',
    ansiTip: 'অল্পপ্রাণ বর্ণ সাধারণ কীতে এবং মহাপ্রাণ বর্ণ (খ, ঘ, ছ, ঝ, ঠ, ঢ, থ, ধ, ফ, ভ) Shift সহ চাপুন।',
    targetAccuracy: 88,
    targetWpm: 14,
    drills: [
      'ক খ গ ঘ ঙ চ ছ জ ঝ ঞ ট ঠ ড ঢ ণ ত থ দ ধ ন প ফ ব ভ ম',
      'য র ল শ ষ স হ ড় ঢ় য় ৎ ং ঃ ঁ কলম খাতা গরু ঘড়ি চশমা',
    ],
  },
  {
    id: 5,
    code: '05',
    titleBn: 'স্বরচিহ্ন বা কার (া, ি, ী, ু, ূ, ৃ, ে, ৈ, ো, ৌ)',
    titleEn: 'Vowel Signs (কার)',
    category: 'Modifiers',
    goalBn: 'ব্যঞ্জনবর্ণের সাথে সঠিক নিয়মে কার চিহ্ন যুক্ত করে পড়ার ও লেখার গতি বাড়ান।',
    goalEn: 'Combine consonants with all 10 vowel signs and learn pre-base visual vs logical ordering.',
    unicodeTip: 'বিজয় ইউনিকোড ড্রাইভারে ই-কার (D), এ-কার (C) ও ঐ-কার (Shift+C) ব্যঞ্জনের আগে চাপলেও স্বয়ংক্রিয়ভাবে সঠিক ইউনিকোডে সাজে।',
    ansiTip: 'ANSI নিয়ম: ি (D), ে (C), ৈ (Shift+C) অবশ্যই ব্যঞ্জনের আগে টাইপ করতে হয়। কো = C + J + F।',
    targetAccuracy: 90,
    targetWpm: 16,
    drills: [
      'কা কি কী কু কূ কৃ কে কৈ কো কৌ মা মি মী মু মূ মৃ মে মৈ মো মৌ',
      'কবিতা বইমেলা দিনলিপি সুখী জীবন কৌতূহল কোমল ছায়া',
    ],
  },
  {
    id: 6,
    code: '06',
    titleBn: 'ফলা ও বিশেষ চিহ্ন (্র, ্য, র্, ্, ং, ঃ, ঁ)',
    titleEn: 'Fola and Modifiers',
    category: 'Modifiers',
    goalBn: 'র-ফলা (Z), য-ফলা (Shift+Z), রেফ (Shift+A) এবং অনুস্বার-বিসর্গ-চন্দ্রবিন্দুর সঠিক ব্যবহার শিখুন।',
    goalEn: 'Master r-fola (Z), y-fola (Shift+Z), reph (Shift+A), anusvara, visarga, and chandrabindu.',
    unicodeTip: 'ক্র = J+Z, ক্য = J+Shift+Z, র্ক = Shift+A+J। চাঁদ লিখতে চ + া + ঁ + দ।',
    ansiTip: 'ক্লাসিক ও ইউনিকোড উভয় মোডেই Shift+A (রেফ) ব্যঞ্জনের আগে এবং Z / Shift+Z ফলা ব্যঞ্জনের পরে চাপতে হয়।',
    targetAccuracy: 90,
    targetWpm: 16,
    drills: [
      'প্রথম গ্রাম শ্রম প্রিয় ধন্য সূর্য কর্ম ধর্ম বর্ণ চাঁদ বাঁশি দুঃখ',
      'প্রাণের বাংলা ভাষা সূর্যের মতো উজ্জ্বল ও সুন্দর।',
    ],
  },
  {
    id: 7,
    code: '07',
    titleBn: 'যুক্তবর্ণ ও কঠিন শব্দ গঠন',
    titleEn: 'Compound Letters (যুক্তবর্ণ)',
    category: 'Conjuncts',
    goalBn: 'G (হসন্ত) ব্যবহার করে ক্ষ, জ্ঞ, ক্ত, ন্ত, ন্দ, স্থ, ত্ত, হ্ম, দ্ধ ও ষ্ট যুক্তবর্ণ তৈরি করুন।',
    goalEn: 'Construct high-frequency Bangla compound letters using the Hasanta (G) link key.',
    unicodeTip: 'সূত্র: প্রথম ব্যঞ্জন + G + দ্বিতীয় ব্যঞ্জন। যেমন: ক্ষ = J + G + Shift+N, জ্ঞ = U + G + Shift+I।',
    ansiTip: 'ANSI-তেও একইভাবে মাঝখানে G চাপলে SutonnyMJ ফন্ট যুক্তবর্ণের গ্লিফ প্রদর্শন করে।',
    targetAccuracy: 90,
    targetWpm: 16,
    drills: [
      'শিক্ষা বিজ্ঞান রক্ত শান্ত সুন্দর অবস্থা উত্তর বুদ্ধ কষ্ট বঙ্গ',
      'পরীক্ষায় ভালো ফল করতে নিয়মিত জ্ঞান ও দক্ষতা অর্জন জরুরি।',
    ],
  },
  {
    id: 8,
    code: '08',
    titleBn: 'দৈনন্দিন শব্দ অনুশীলন',
    titleEn: 'Word Practice',
    category: 'Fluency',
    goalBn: 'বাস্তব জীবনে ব্যবহৃত সাধারণ ও প্রয়োজনীয় বাংলা শব্দ দ্রুত ও নির্ভুলভাবে টাইপ করুন।',
    goalEn: 'Improve rhythm and transition speed across everyday Bangla vocabulary.',
    unicodeTip: 'শব্দের শেষে স্পেস বার দেওয়ার আগে পরের শব্দটি চোখে দেখে নিন।',
    ansiTip: 'প্রি-বেস কার (ি, ে) যুক্ত শব্দে আঙুল আগেভাগে প্রস্তুত রাখুন।',
    targetAccuracy: 92,
    targetWpm: 20,
    drills: [
      'বাংলাদেশ ঢাকা শিক্ষা বিদ্যালয় প্রযুক্তি কম্পিউটার ইন্টারনেট সংবাদপত্র সাহিত্য সংস্কৃতি',
      'পরিবার সমাজ উন্নয়ন পরিবেশ কৃষি অর্থনীতি স্বাধীনতা মুক্তিযুদ্ধ ভাষা আন্দোলন',
    ],
  },
  {
    id: 9,
    code: '09',
    titleBn: 'বাক্য গঠন ও বিরামচিহ্ন অনুশীলন',
    titleEn: 'Sentence Practice',
    category: 'Fluency',
    goalBn: 'কমা (,), দাঁড়ি (Shift+G) ও প্রশ্নবোধক চিহ্ন (?) সহ পূর্ণাঙ্গ বাংলা বাক্য টাইপ করুন।',
    goalEn: 'Practice full Bangla sentences with proper punctuation including Dari (Shift+G).',
    unicodeTip: 'বাক্য শেষে দাঁড়ি (।) দিতে Shift + G চাপুন এবং দাঁড়ির আগে স্পেস দেবেন না।',
    ansiTip: 'ক্লাসিক ও ইউনিকোড উভয় পদ্ধতিতেই Shift+G হলো দাঁড়ি (।)।',
    targetAccuracy: 92,
    targetWpm: 22,
    drills: [
      'আমার সোনার বাংলা, আমি তোমায় ভালোবাসি। প্রতিদিন সকালে নিয়মিত অনুশীলন করলে টাইপিং গতি বাড়ে।',
      'মাতৃভাষা বাংলায় নির্ভুলভাবে লিখতে পারা একটি দারুণ দক্ষতা। তুমি কি আজ অনুশীলন করেছ?',
    ],
  },
  {
    id: 10,
    code: '10',
    titleBn: 'অনুচ্ছেদ টাইপিং অনুশীলন',
    titleEn: 'Paragraph Practice',
    category: 'Mastery',
    goalBn: 'ধারাবাহিক কয়েকটি বাক্যের একটি完整 অনুচ্ছেদ মনোযোগ ধরে রেখে নির্ভুলভাবে টাইপ করুন।',
    goalEn: 'Sustain focus, steady cadence, and high accuracy across multi-sentence passages.',
    unicodeTip: 'কিবোর্ডের দিকে না তাকিয়ে কেবল স্ক্রিনের টার্গেট অক্ষরের দিকে তাকান।',
    ansiTip: 'দীর্ঘ অনুচ্ছেদে ভুল হলে তাৎক্ষণিক ব্যাকস্পেস ব্যবহার করে সংশোধন করার অভ্যাস গড়ুন।',
    targetAccuracy: 93,
    targetWpm: 25,
    drills: [
      'বাংলা আমাদের প্রিয় মাতৃভাষা। ডিজিটাল যুগে অফিস, সংবাদমাধ্যম ও শিক্ষাক্ষেত্রে বাংলা টাইপিংয়ের গুরুত্ব দিন দিন বাড়ছে। নিয়মিত ধৈর্য নিয়ে প্রতিদিন পনেরো মিনিট বিজয় লেআউট অনুশীলন করলে অল্প সময়েই দ্রুত ও নির্ভুল টাইপিং আয়ত্ত করা সম্ভব।',
    ],
  },
  {
    id: 11,
    code: '11',
    titleBn: 'বাস্তব জীবনের ব্যবহারিক টাইপিং',
    titleEn: 'Real-Life Typing Exercises',
    category: 'Mastery',
    goalBn: 'দাপ্তরিক নোটিশ, আবেদনপত্র ও সংবাদ প্রতিবেদন ধাঁচের বাস্তব লেখা অনুশীলন করুন।',
    goalEn: 'Type realistic office notices, formal requests, and editorial news snippets.',
    unicodeTip: 'তারিখ ও সংখ্যায় বাংলা অঙ্ক (১, ২, ৩...) ব্যবহার করার অভ্যাস করুন।',
    ansiTip: 'দাপ্তরিক চিঠিপত্র ও প্রিন্টিং কাজের জন্য ANSI ও ইউনিকোড উভয় ফরম্যাটেই নিখুঁত বানান জরুরি।',
    targetAccuracy: 94,
    targetWpm: 28,
    drills: [
      'তারিখ: ২৩ নভেম্বর ২০২৬। বিষয়: বাংলা কম্পিউটার টাইপিং প্রশিক্ষণ কর্মশালায় অংশগ্রহণ প্রসঙ্গে। বিনীত নিবেদন এই যে, অফিসের দৈনন্দিন দাপ্তরিক নথি ও প্রতিবেদন বাংলায় নির্ভুলভাবে প্রস্তুত করার জন্য আমাদের দক্ষতা বৃদ্ধি অত্যন্ত প্রয়োজন।',
    ],
  },
  {
    id: 12,
    code: '12',
    titleBn: 'চূড়ান্ত বিজয় টাইপিং পরীক্ষা',
    titleEn: 'Final Typing Exam',
    category: 'Certification',
    goalBn: 'সমস্ত স্বরবর্ণ, ব্যঞ্জনবর্ণ, কার, ফলা, যুক্তবর্ণ ও বিরামচিহ্নের সমন্বয়ে চূড়ান্ত মূল্যায়ন সম্পন্ন করুন।',
    goalEn: 'Pass the comprehensive final exam combining vowels, consonants, signs, conjuncts, and punctuation.',
    unicodeTip: 'পাশ করতে অন্তত ৯৫% নির্ভুলতা এবং ২৫+ WPM গতি বজায় রাখার চেষ্টা করুন।',
    ansiTip: 'স্থির ছন্দে টাইপ করুন; অযথা তাড়াহুড়ো করলে ভুলের সংখ্যা বাড়ে ও গতি কমে যায়।',
    targetAccuracy: 95,
    targetWpm: 25,
    drills: [
      'একুশে ফেব্রুয়ারি আমাদের জাতীয় জীবনে এক অবিস্মরণীয় দিন। ভাষা শহীদদের আত্মত্যাগের বিনিময়ে আমরা পেয়েছি স্বাধীনভাবে বাংলা ভাষায় কথা বলার ও লেখার অধিকার। আজকের তথ্যপ্রযুক্তির যুগে শিক্ষা, সাহিত্য, বিজ্ঞান ও প্রশাসনিক কাজে নির্ভুল বাংলা টাইপিং আমাদের দক্ষতা ও আত্মবিশ্বাসকে নতুন উচ্চতায় নিয়ে যায়।',
    ],
  },
];

export interface PracticeCategory {
  id: string;
  labelBn: string;
  labelEn: string;
  texts: string[];
}

export const PRACTICE_CATEGORIES: PracticeCategory[] = [
  {
    id: 'home-row',
    labelBn: 'হোম রো ও মৌলিক',
    labelEn: 'Home Row Drills',
    texts: [
      'ক ত দ ব কা তা দা বা কাক তাত দাদ বাবা বদল কদম দবদব',
      'কতদূর বসবাস তবলা দমকল কাকলি বাতাস দালান সকাল',
    ],
  },
  {
    id: 'vowels-kar',
    labelBn: 'স্বরবর্ণ ও কার',
    labelEn: 'Vowels & Signs',
    texts: [
      'অ আ ই ঈ উ ঊ ঋ এ ঐ ও ঔ কা কি কী কু কূ কৃ কে কৈ কো কৌ',
      'আমাদের প্রিয় বইমেলায় নীল আকাশ ও সুন্দর কোকিলের গান শোনা যায়।',
    ],
  },
  {
    id: 'conjuncts',
    labelBn: 'যুক্তবর্ণ ও ফলা',
    labelEn: 'Conjuncts & Fola',
    texts: [
      'শিক্ষা বিজ্ঞান রক্ত প্রিয় সূর্য আনন্দ অবস্থা উত্তর শুদ্ধ স্পষ্ট বঙ্গ সঙ্কট',
      'প্রযুক্তির উৎকর্ষ ও শিক্ষার প্রসারে বাংলাদেশের তরুণ সমাজ এগিয়ে চলেছে।',
    ],
  },
  {
    id: 'numbers',
    labelBn: 'বাংলা সংখ্যা ও চিহ্ন',
    labelEn: 'Bangla Digits & Symbols',
    texts: [
      '১২৩৪৫৬৭৮৯০ তারিখ: ১৬ ডিসেম্বর ১৯৭১, ২১ ফেব্রুয়ারি ১৯৫২, ২৬ মার্চ ১৯৭১।',
      'মোট মূল্য ৫০০৳; ছাড় ১০% হলে নিট প্রদেয় ৪৫০৳ মাত্র। আপনি কি সম্মত?',
    ],
  },
];

export interface SpeedTestPassage {
  id: string;
  titleBn: string;
  titleEn: string;
  text: string;
}

export const SPEED_TEST_PASSAGES: SpeedTestPassage[] = [
  {
    id: 'padma',
    titleBn: 'বাংলার প্রকৃতি ও নদী',
    titleEn: 'Nature & Rivers of Bengal',
    text: 'নদীমাতৃক বাংলাদেশে পদ্মা, মেঘনা ও যমুনার প্রবাহ যুগ যুগ ধরে এ দেশের মাটিকে উর্বর করে রেখেছে। বর্ষাকালে আকাশে কালো মেঘ জমে এবং ঝুম বৃষ্টিতে সবুজ গ্রামগুলো নতুন প্রাণে জেগে ওঠে। শরতের সাদা কাশফুল আর শীতের কুয়াশাচ্ছন্ন সকাল বাংলার প্রকৃতিকে করে তোলে অপরূপ। কৃষকের হাসি, মাঝির ভাটিয়ালি গান আর পাখির কলতানে মুখরিত থাকে আমাদের এই প্রিয় জন্মভূমি।',
  },
  {
    id: 'digital-bangla',
    titleBn: 'তথ্যপ্রযুক্তি ও বাংলা টাইপিং',
    titleEn: 'Technology & Bangla Typing',
    text: 'আধুনিক কর্মক্ষেত্রে কম্পিউটার দক্ষতার পাশাপাশি বাংলা টাইপিং জানা অত্যন্ত জরুরি। সরকারি দপ্তর, প্রকাশনা সংস্থা, সংবাদপত্র এবং শিক্ষাপ্রতিষ্ঠানে প্রতিদিন হাজার হাজার বাংলা নথি তৈরি হয়। বিজয় কিবোর্ড লেআউট আয়ত্ত করতে পারলে যেকোনো বাংলা লেখা দ্রুত ও নির্ভুলভাবে সম্পন্ন করা সম্ভব। নিয়মিত অনুশীলনই গতি ও নির্ভুলতা বাড়ানোর একমাত্র নির্ভরযোগ্য উপায়।',
  },
  {
    id: 'ekushey',
    titleBn: 'বাংলা ভাষার গৌরব',
    titleEn: 'Pride of Bangla Language',
    text: 'বাঙালির ইতিহাস ও ঐতিহ্যের সাথে বাংলা ভাষা ওতপ্রোতভাবে জড়িত। রবীন্দ্রনাথ ঠাকুর, কাজী নজরুল ইসলাম ও জীবনানন্দ দাশের সাহিত্য আমাদের চিন্তাজগৎকে সমৃদ্ধ করেছে। বিশ্বজুড়ে কোটি কোটি মানুষ আজ বাংলা ভাষায় কথা বলে, লেখে এবং ডিজিটাল মাধ্যমে নিজেদের ভাবনা প্রকাশ করে। মাতৃভাষার শুদ্ধ চর্চা আমাদের সকলের নৈতিক দায়িত্ব।',
  },
];

export const GAME_WORDS: string[] = [
  'বাংলা', 'শিখনশালা', 'কিবোর্ড', 'বিজয়', 'আকাশ', 'নদী', 'বইমেলা', 'প্রভাত', 'কলম', 'খাতা',
  'শিক্ষা', 'বিজ্ঞান', 'সূর্য', 'চাঁদ', 'ফুল', 'পাখি', 'দেশ', 'মানুষ', 'সবুজ', 'স্বপ্ন',
  'আলো', 'বাতাস', 'সময়', 'গতি', 'দক্ষতা', 'আনন্দ', 'সুন্দর', 'কবিতা', 'সংবাদ', 'প্রযুক্তি',
  'সাগর', 'পাহাড়', 'বৃক্ষ', 'বৃষ্টি', 'শরৎ', 'বসন্ত', 'বন্ধু', 'পরিবার', 'সত্য', 'শান্তি',
];

export const GAME_SENTENCES: string[] = [
  'বাংলা আমার মায়ের ভাষা।',
  'নিয়মিত অনুশীলন দক্ষতা বাড়ায়।',
  'শিখনশালায় বিনামূল্যে বাংলা টাইপিং শিখুন।',
  'ভোরের আকাশে সোনালি সূর্য উঠেছে।',
  'সত্য ও সুন্দরের পথে এগিয়ে চলো।',
  'বই মানুষের সবচেয়ে ভালো বন্ধু।',
  'পরিশ্রম ও ধৈর্য সফলতার চাবিকাঠি।',
  'ডিজিটাল বাংলাদেশে বাংলা চর্চা বাড়ছে।',
];
