export type BijoyMode = 'unicode' | 'ansi';
export type InputMode = 'virtual' | 'ime';

export interface KeyDefinition {
  code: string;
  en: string;
  enShift: string;
  bn: string;
  bnShift: string;
  bnName: string;
  bnShiftName: string;
  finger: string;
  width?: 'normal' | 'wide-sm' | 'wide-md' | 'wide-lg' | 'space';
  isModifier?: boolean;
  note?: string;
}

export const KEYBOARD_ROWS: KeyDefinition[][] = [
  [
    { code: 'Backquote', en: '`', enShift: '~', bn: '`', bnShift: '~', bnName: 'ব্যাকটিক', bnShiftName: 'টিল্ড', finger: 'L5' },
    { code: 'Digit1', en: '1', enShift: '!', bn: '১', bnShift: '!', bnName: '১ (এক)', bnShiftName: 'বিস্ময়চিহ্ন', finger: 'L5' },
    { code: 'Digit2', en: '2', enShift: '@', bn: '২', bnShift: '@', bnName: '২ (দুই)', bnShiftName: '@', finger: 'L4' },
    { code: 'Digit3', en: '3', enShift: '#', bn: '৩', bnShift: '#', bnName: '৩ (তিন)', bnShiftName: '#', finger: 'L3' },
    { code: 'Digit4', en: '4', enShift: '$', bn: '৪', bnShift: '৳', bnName: '৪ (চার)', bnShiftName: '৳ (টাকা)', finger: 'L2' },
    { code: 'Digit5', en: '5', enShift: '%', bn: '৫', bnShift: '%', bnName: '৫ (পাঁচ)', bnShiftName: 'শতাংশ', finger: 'L2' },
    { code: 'Digit6', en: '6', enShift: '^', bn: '৬', bnShift: '^', bnName: '৬ (ছয়)', bnShiftName: '^', finger: 'R2' },
    { code: 'Digit7', en: '7', enShift: '&', bn: '৭', bnShift: 'ঁ', bnName: '৭ (সাত)', bnShiftName: 'ঁ (চন্দ্রবিন্দু)', finger: 'R2' },
    { code: 'Digit8', en: '8', enShift: '*', bn: '৮', bnShift: '*', bnName: '৮ (আট)', bnShiftName: '*', finger: 'R3' },
    { code: 'Digit9', en: '9', enShift: '(', bn: '৯', bnShift: '(', bnName: '৯ (নয়)', bnShiftName: '(', finger: 'R4' },
    { code: 'Digit0', en: '0', enShift: ')', bn: '০', bnShift: ')', bnName: '০ (শূন্য)', bnShiftName: ')', finger: 'R5' },
    { code: 'Minus', en: '-', enShift: '_', bn: '-', bnShift: '_', bnName: 'হাইফেন', bnShiftName: 'আন্ডারস্কোর', finger: 'R5' },
    { code: 'Equal', en: '=', enShift: '+', bn: '=', bnShift: '+', bnName: 'সমান', bnShiftName: 'যোগ', finger: 'R5' },
    { code: 'Backspace', en: 'Backspace', enShift: 'Backspace', bn: '⌫', bnShift: '⌫', bnName: 'মুছুন', bnShiftName: 'মুছুন', finger: 'R5', width: 'wide-md', isModifier: true },
  ],
  [
    { code: 'Tab', en: 'Tab', enShift: 'Tab', bn: '⇥', bnShift: '⇥', bnName: 'ট্যাব', bnShiftName: 'ট্যাব', finger: 'L5', width: 'wide-sm', isModifier: true },
    { code: 'KeyQ', en: 'q', enShift: 'Q', bn: 'ঙ', bnShift: 'ং', bnName: 'ঙ', bnShiftName: 'ং (অনুস্বার)', finger: 'L5' },
    { code: 'KeyW', en: 'w', enShift: 'W', bn: 'য', bnShift: 'য়', bnName: 'য', bnShiftName: 'য়', finger: 'L4' },
    { code: 'KeyE', en: 'e', enShift: 'E', bn: 'ড', bnShift: 'ঢ', bnName: 'ড', bnShiftName: 'ঢ', finger: 'L3' },
    { code: 'KeyR', en: 'r', enShift: 'R', bn: 'প', bnShift: 'ফ', bnName: 'প', bnShiftName: 'ফ', finger: 'L2' },
    { code: 'KeyT', en: 't', enShift: 'T', bn: 'ট', bnShift: 'ঠ', bnName: 'ট', bnShiftName: 'ঠ', finger: 'L2' },
    { code: 'KeyY', en: 'y', enShift: 'Y', bn: 'চ', bnShift: 'ছ', bnName: 'চ', bnShiftName: 'ছ', finger: 'R2' },
    { code: 'KeyU', en: 'u', enShift: 'U', bn: 'জ', bnShift: 'ঝ', bnName: 'জ', bnShiftName: 'ঝ', finger: 'R2' },
    { code: 'KeyI', en: 'i', enShift: 'I', bn: 'হ', bnShift: 'ঞ', bnName: 'হ', bnShiftName: 'ঞ', finger: 'R3' },
    { code: 'KeyO', en: 'o', enShift: 'O', bn: 'গ', bnShift: 'ঘ', bnName: 'গ', bnShiftName: 'ঘ', finger: 'R4' },
    { code: 'KeyP', en: 'p', enShift: 'P', bn: 'ড়', bnShift: 'ঢ়', bnName: 'ড়', bnShiftName: 'ঢ়', finger: 'R5' },
    { code: 'BracketLeft', en: '[', enShift: '{', bn: '[', bnShift: '{', bnName: '[', bnShiftName: '{', finger: 'R5' },
    { code: 'BracketRight', en: ']', enShift: '}', bn: ']', bnShift: '}', bnName: ']', bnShiftName: '}', finger: 'R5' },
    { code: 'Backslash', en: '\\', enShift: '|', bn: 'ৎ', bnShift: 'ঃ', bnName: 'ৎ (খণ্ড-ত)', bnShiftName: 'ঃ (বিসর্গ)', finger: 'R5', width: 'wide-sm', note: 'Some Bijoy charts map / to ঃ and Shift+/ to ৎ.' },
  ],
  [
    { code: 'CapsLock', en: 'Caps', enShift: 'Caps', bn: 'Caps', bnShift: 'Caps', bnName: 'ক্যাপস লক', bnShiftName: 'ক্যাপস লক', finger: 'L5', width: 'wide-md', isModifier: true },
    { code: 'KeyA', en: 'a', enShift: 'A', bn: 'ৃ', bnShift: 'র্', bnName: 'ৃ-কার (G+A = ঋ)', bnShiftName: 'রেফ (র্)', finger: 'L5' },
    { code: 'KeyS', en: 's', enShift: 'S', bn: 'ু', bnShift: 'ূ', bnName: 'ু-কার (G+S = উ)', bnShiftName: 'ূ-কার (G+Shift+S = ঊ)', finger: 'L4' },
    { code: 'KeyD', en: 'd', enShift: 'D', bn: 'ি', bnShift: 'ী', bnName: 'ি-কার (G+D = ই)', bnShiftName: 'ী-কার (G+Shift+D = ঈ)', finger: 'L3' },
    { code: 'KeyF', en: 'f', enShift: 'F', bn: 'া', bnShift: 'অ', bnName: 'া-কার (G+F = আ)', bnShiftName: 'অ', finger: 'L2' },
    { code: 'KeyG', en: 'g', enShift: 'G', bn: '্', bnShift: '।', bnName: 'হসন্ত / লিংক কী', bnShiftName: '। (দাঁড়ি)', finger: 'L2', note: 'G acts as Hasanta (যুক্তবর্ণ joiner) and independent vowel prefix.' },
    { code: 'KeyH', en: 'h', enShift: 'H', bn: 'ব', bnShift: 'ভ', bnName: 'ব', bnShiftName: 'ভ', finger: 'R2' },
    { code: 'KeyJ', en: 'j', enShift: 'J', bn: 'ক', bnShift: 'খ', bnName: 'ক', bnShiftName: 'খ', finger: 'R2' },
    { code: 'KeyK', en: 'k', enShift: 'K', bn: 'ত', bnShift: 'থ', bnName: 'ত', bnShiftName: 'থ', finger: 'R3' },
    { code: 'KeyL', en: 'l', enShift: 'L', bn: 'দ', bnShift: 'ধ', bnName: 'দ', bnShiftName: 'ধ', finger: 'R4' },
    { code: 'Semicolon', en: ';', enShift: ':', bn: ';', bnShift: ':', bnName: 'সেমিকোলন', bnShiftName: 'কোলন', finger: 'R5' },
    { code: 'Quote', en: "'", enShift: '"', bn: "'", bnShift: '"', bnName: 'উদ্ধৃতি চিহ্ন', bnShiftName: 'ডাবল উদ্ধৃতি', finger: 'R5' },
    { code: 'Enter', en: 'Enter', enShift: 'Enter', bn: '↵', bnShift: '↵', bnName: 'এন্টার', bnShiftName: 'এন্টার', finger: 'R5', width: 'wide-lg', isModifier: true },
  ],
  [
    { code: 'ShiftLeft', en: 'Shift', enShift: 'Shift', bn: '⇧ Shift', bnShift: '⇧ Shift', bnName: 'বাম শিফট', bnShiftName: 'বাম শিফট', finger: 'L5', width: 'wide-lg', isModifier: true },
    { code: 'KeyZ', en: 'z', enShift: 'Z', bn: '্র', bnShift: '্য', bnName: 'র-ফলা (্র)', bnShiftName: 'য-ফলা (্য)', finger: 'L5' },
    { code: 'KeyX', en: 'x', enShift: 'X', bn: 'ও', bnShift: 'ৌ', bnName: 'ও', bnShiftName: 'ৌ-কার (G+Shift+X = ঔ)', finger: 'L4' },
    { code: 'KeyC', en: 'c', enShift: 'C', bn: 'ে', bnShift: 'ৈ', bnName: 'ে-কার (G+C = এ)', bnShiftName: 'ৈ-কার (G+Shift+C = ঐ)', finger: 'L3' },
    { code: 'KeyV', en: 'v', enShift: 'V', bn: 'র', bnShift: 'ল', bnName: 'র', bnShiftName: 'ল', finger: 'L2' },
    { code: 'KeyB', en: 'b', enShift: 'B', bn: 'ন', bnShift: 'ণ', bnName: 'ন', bnShiftName: 'ণ', finger: 'L2' },
    { code: 'KeyN', en: 'n', enShift: 'N', bn: 'স', bnShift: 'ষ', bnName: 'স', bnShiftName: 'ষ', finger: 'R2' },
    { code: 'KeyM', en: 'm', enShift: 'M', bn: 'ম', bnShift: 'শ', bnName: 'ম', bnShiftName: 'শ', finger: 'R2' },
    { code: 'Comma', en: ',', enShift: '<', bn: ',', bnShift: '<', bnName: 'কমা', bnShiftName: '<', finger: 'R3' },
    { code: 'Period', en: '.', enShift: '>', bn: '.', bnShift: '>', bnName: 'দশমিক / বিন্দু', bnShiftName: '>', finger: 'R4' },
    { code: 'Slash', en: '/', enShift: '?', bn: '/', bnShift: '?', bnName: 'স্ল্যাশ', bnShiftName: 'প্রশ্নবোধক (?)', finger: 'R5' },
    { code: 'ShiftRight', en: 'Shift', enShift: 'Shift', bn: 'Shift ⇧', bnShift: 'Shift ⇧', bnName: 'ডান শিফট', bnShiftName: 'ডান শিফট', finger: 'R5', width: 'wide-lg', isModifier: true },
  ],
  [
    { code: 'Space', en: 'Space', enShift: 'Space', bn: 'স্পেস (Space)', bnShift: 'স্পেস', bnName: 'স্পেস বার', bnShiftName: 'স্পেস বার', finger: 'Thumb', width: 'space', isModifier: true },
  ],
];

export const CONJUNCT_GUIDE = [
  { conjunct: 'ক্ষ', parts: 'ক + ্ + ষ', keys: 'J + G + Shift+N', example: 'শিক্ষা, পরীক্ষা' },
  { conjunct: 'জ্ঞ', parts: 'জ + ্ + ঞ', keys: 'U + G + Shift+I', example: 'জ্ঞান, বিজ্ঞান' },
  { conjunct: 'ক্ত', parts: 'ক + ্ + ত', keys: 'J + G + K', example: 'রক্ত, শক্ত' },
  { conjunct: 'ন্ত', parts: 'ন + ্ + ত', keys: 'B + G + K', example: 'শান্ত, অন্তর' },
  { conjunct: 'ন্দ', parts: 'ন + ্ + দ', keys: 'B + G + L', example: 'সুন্দর, আনন্দ' },
  { conjunct: 'স্থ', parts: 'স + ্ + থ', keys: 'N + G + Shift+K', example: 'অবস্থা, স্থান' },
  { conjunct: 'ত্ত', parts: 'ত + ্ + ত', keys: 'K + G + K', example: 'উত্তর, সত্য' },
  { conjunct: 'হ্ম', parts: 'হ + ্ + ম', keys: 'I + G + M', example: 'ব্রাহ্মণ, ব্রহ্মপুত্র' },
  { conjunct: 'দ্ধ', parts: 'দ + ্ + ধ', keys: 'L + G + Shift+L', example: 'বুদ্ধ, শুদ্ধ' },
  { conjunct: 'ষ্ট', parts: 'ষ + ্ + ট', keys: 'Shift+N + G + T', example: 'কষ্ট, স্পষ্ট' },
  { conjunct: 'ঙ্ক', parts: 'ঙ + ্ + ক', keys: 'Q + G + J', example: 'অঙ্ক, শঙ্কা' },
  { conjunct: 'ঙ্গ', parts: 'ঙ + ্ + গ', keys: 'Q + G + O', example: 'বঙ্গ, সঙ্গ' },
];

export const INDEPENDENT_VOWEL_SEQUENCES: Record<string, string[]> = {
  'অ': ['Shift+F'],
  'আ': ['G', 'F'],
  'ই': ['G', 'D'],
  'ঈ': ['G', 'Shift+D'],
  'উ': ['G', 'S'],
  'ঊ': ['G', 'Shift+S'],
  'ঋ': ['G', 'A'],
  'এ': ['G', 'C'],
  'ঐ': ['G', 'Shift+C'],
  'ও': ['X'],
  'ঔ': ['G', 'Shift+X'],
};

export interface ModeDifferenceItem {
  aspect: string;
  ansi: string;
  unicode: string;
}

export const MODE_DIFFERENCES: ModeDifferenceItem[] = [
  {
    aspect: 'Shortcut in Bijoy Software',
    ansi: 'Ctrl + Alt + B (Classic / SutonnyMJ)',
    unicode: 'Ctrl + Alt + V (Bijoy Unicode)',
  },
  {
    aspect: 'Font & Encoding Standard',
    ansi: 'Legacy ANSI byte codes requiring SutonnyMJ or ANSI fonts.',
    unicode: 'Universal Unicode (U+0980–U+09FF) compatible with web & mobile.',
  },
  {
    aspect: 'Pre-base Kar Order (ি, ে, ৈ)',
    ansi: 'Strictly visual order: type ি (D), ে (C), ৈ (Shift+C) BEFORE consonant (d + j = কি).',
    unicode: 'Bijoy Unicode driver accepts visual order (d + j), stored logically as ক + ি.',
  },
  {
    aspect: 'O-kar (ো) & Ou-kar (ৌ)',
    ansi: 'Composed visually around consonant: C (ে) + consonant + F (া) = কো.',
    unicode: 'C + consonant + F = কো; consonant + Shift+X or C + consonant + Shift+X = কৌ.',
  },
  {
    aspect: 'Primary Use Case',
    ansi: 'Print newspapers, Adobe InDesign, DTP & legacy office forms.',
    unicode: 'Websites, Blogger, WordPress, social media, search & digital docs.',
  },
];

// Build fast lookup maps
const KEY_BY_CODE = new Map<string, KeyDefinition>();
const CHAR_TO_KEY = new Map<string, { code: string; shift: boolean; keyDef: KeyDefinition }>();
const EN_TO_KEYDEF = new Map<string, { code: string; shift: boolean; keyDef: KeyDefinition }>();

for (const row of KEYBOARD_ROWS) {
  for (const k of row) {
    KEY_BY_CODE.set(k.code, k);
    if (!k.isModifier) {
      if (!CHAR_TO_KEY.has(k.bn)) {
        CHAR_TO_KEY.set(k.bn, { code: k.code, shift: false, keyDef: k });
      }
      if (!CHAR_TO_KEY.has(k.bnShift)) {
        CHAR_TO_KEY.set(k.bnShift, { code: k.code, shift: true, keyDef: k });
      }
      EN_TO_KEYDEF.set(k.en, { code: k.code, shift: false, keyDef: k });
      EN_TO_KEYDEF.set(k.enShift, { code: k.code, shift: true, keyDef: k });
    } else if (k.code === 'Space') {
      CHAR_TO_KEY.set(' ', { code: 'Space', shift: false, keyDef: k });
    }
  }
}

export function getKeyDefByCode(code: string): KeyDefinition | undefined {
  return KEY_BY_CODE.get(code);
}

export interface KeyHint {
  code: string;
  shift: boolean;
  displayKey: string;
  targetChar: string;
  sequenceHint: string;
  finger: string;
}

const PRE_BASE_KARS = new Set(['ি', 'ে', 'ৈ']);
const CONSONANTS_REGEX = /^[\u0995-\u09B9\u09DC-\u09DF]$/;
const HASANTA = '্';

/**
 * Computes the expected next physical key on the Bijoy keyboard given targetText & typedText.
 * Handles Bijoy Classic (ANSI) visual order (pre-base ি, ে, ৈ before consonant, C + cons + F for ো)
 * and independent vowels (G + F = আ, etc.).
 */
export function getNextKeyHint(
  targetText: string,
  typedText: string,
  mode: BijoyMode,
  pendingPreKar: string | null,
  pendingHasanta: boolean
): KeyHint | null {
  if (typedText.length >= targetText.length) return null;

  const remaining = targetText.slice(typedText.length);
  const nextChar = remaining[0];

  // If user already pressed G waiting for independent vowel
  if (pendingHasanta) {
    const vowelSecondKey: Record<string, { code: string; shift: boolean; label: string }> = {
      'আ': { code: 'KeyF', shift: false, label: 'F' },
      'ই': { code: 'KeyD', shift: false, label: 'D' },
      'ঈ': { code: 'KeyD', shift: true, label: 'Shift + D' },
      'উ': { code: 'KeyS', shift: false, label: 'S' },
      'ঊ': { code: 'KeyS', shift: true, label: 'Shift + S' },
      'ঋ': { code: 'KeyA', shift: false, label: 'A' },
      'এ': { code: 'KeyC', shift: false, label: 'C' },
      'ঐ': { code: 'KeyC', shift: true, label: 'Shift + C' },
      'ঔ': { code: 'KeyX', shift: true, label: 'Shift + X' },
    };
    const match = vowelSecondKey[nextChar];
    if (match) {
      const def = KEY_BY_CODE.get(match.code)!;
      return {
        code: match.code,
        shift: match.shift,
        displayKey: match.label,
        targetChar: nextChar,
        sequenceHint: `G + ${match.label} = ${nextChar}`,
        finger: def.finger,
      };
    }
  }

  // Independent vowels formed with G + vowel sign
  if (nextChar in INDEPENDENT_VOWEL_SEQUENCES && nextChar !== 'অ' && nextChar !== 'ও') {
    const seq = INDEPENDENT_VOWEL_SEQUENCES[nextChar];
    const defG = KEY_BY_CODE.get('KeyG')!;
    return {
      code: 'KeyG',
      shift: false,
      displayKey: 'G',
      targetChar: nextChar,
      sequenceHint: `${seq.join(' + ')} = ${nextChar}`,
      finger: defG.finger,
    };
  }

  // Handle Reph (র্ + consonant): in targetText it appears as র + ্ + consonant
  if (remaining.length >= 3 && remaining[0] === 'র' && remaining[1] === HASANTA && CONSONANTS_REGEX.test(remaining[2])) {
    const defA = KEY_BY_CODE.get('KeyA')!;
    return {
      code: 'KeyA',
      shift: true,
      displayKey: 'Shift + A',
      targetChar: `র্${remaining[2]}`,
      sequenceHint: mode === 'ansi' ? 'র-ফলা/রেফ (Shift+A) + ব্যঞ্জন' : 'Shift+A (র্) অথবা র + ্ + ব্যঞ্জন',
      finger: defA.finger,
    };
  }

  // Handle Fola: ্ + র (z) or ্ + য (Shift+Z)
  if (remaining.length >= 2 && remaining[0] === HASANTA && remaining[1] === 'র') {
    const defZ = KEY_BY_CODE.get('KeyZ')!;
    return {
      code: 'KeyZ',
      shift: false,
      displayKey: 'Z',
      targetChar: '্র',
      sequenceHint: 'Z = র-ফলা (্র)',
      finger: defZ.finger,
    };
  }
  if (remaining.length >= 2 && remaining[0] === HASANTA && remaining[1] === 'য') {
    const defZ = KEY_BY_CODE.get('KeyZ')!;
    return {
      code: 'KeyZ',
      shift: true,
      displayKey: 'Shift + Z',
      targetChar: '্য',
      sequenceHint: 'Shift + Z = য-ফলা (্য)',
      finger: defZ.finger,
    };
  }

  // Handle pre-base vowel sign in visual Bijoy order:
  // If remaining starts with consonant (+ optional conjuncts) + pre-base kar (ি, ে, ৈ, ো)
  if (!pendingPreKar && CONSONANTS_REGEX.test(nextChar)) {
    // Scan ahead past consonant cluster (C + ্ + C ...)
    let idx = 1;
    while (idx + 1 < remaining.length && remaining[idx] === HASANTA && CONSONANTS_REGEX.test(remaining[idx + 1])) {
      idx += 2;
    }
    const afterCluster = remaining[idx];
    if (afterCluster && (PRE_BASE_KARS.has(afterCluster) || afterCluster === 'ো')) {
      const preKar = afterCluster === 'ো' ? 'ে' : afterCluster;
      const mapped = CHAR_TO_KEY.get(preKar);
      if (mapped) {
        return {
          code: mapped.code,
          shift: mapped.shift,
          displayKey: mapped.shift ? `Shift + ${mapped.keyDef.en.toUpperCase()}` : mapped.keyDef.en.toUpperCase(),
          targetChar: afterCluster,
          sequenceHint:
            mode === 'ansi'
              ? `ANSI নিয়ম: ব্যঞ্জনের আগে ${preKar} (${mapped.shift ? 'Shift+' : ''}${mapped.keyDef.en.toUpperCase()}) চাপুন`
              : `বিজয় নিয়ম: আগে ${preKar} (${mapped.shift ? 'Shift+' : ''}${mapped.keyDef.en.toUpperCase()}) চাপুন`,
          finger: mapped.keyDef.finger,
        };
      }
    }
  }

  // When pendingPreKar is active and target expects ো (which uses C + cons + F), after consonant nextChar is 'ো' -> hint F (া)
  if (nextChar === 'ো') {
    const defF = KEY_BY_CODE.get('KeyF')!;
    return {
      code: 'KeyF',
      shift: false,
      displayKey: 'F',
      targetChar: 'ো',
      sequenceHint: 'C (ে) + ব্যঞ্জন + F (া) = ো-কার',
      finger: defF.finger,
    };
  }

  // Direct character lookup
  const mapped = CHAR_TO_KEY.get(nextChar);
  if (mapped) {
    const keyLabel = mapped.keyDef.en.length === 1 ? mapped.keyDef.en.toUpperCase() : mapped.keyDef.en;
    return {
      code: mapped.code,
      shift: mapped.shift,
      displayKey: mapped.shift ? `Shift + ${keyLabel}` : keyLabel,
      targetChar: nextChar,
      sequenceHint: `${mapped.shift ? `Shift + ${keyLabel}` : keyLabel} = ${nextChar}`,
      finger: mapped.keyDef.finger,
    };
  }

  return null;
}

export interface VirtualInputState {
  text: string;
  pendingPreKar: string | null;
  pendingHasanta: boolean;
  pendingReph: boolean;
  lastAutoPreKar: string | null;
}

const G_VOWEL_COMBO: Record<string, string> = {
  'া': 'আ',
  'ি': 'ই',
  'ী': 'ঈ',
  'ু': 'উ',
  'ূ': 'ঊ',
  'ৃ': 'ঋ',
  'ে': 'এ',
  'ৈ': 'ঐ',
  'ৌ': 'ঔ',
};

/**
 * Translates a physical US-QWERTY keystroke into Bijoy Bangla output.
 * Faithfully supports Bijoy key mappings, G-prefixed vowels, pre-base ি/ে/ৈ ordering,
 * ো (ে + consonant + া), ্র (r-fola), ্য (y-fola), and র্ (reph).
 */
export function applyVirtualBijoyKeystroke(
  keyChar: string,
  state: VirtualInputState,
  _mode: BijoyMode
): VirtualInputState {
  if (keyChar === ' ') {
    return {
      text: state.text + ' ',
      pendingPreKar: null,
      pendingHasanta: false,
      pendingReph: false,
      lastAutoPreKar: null,
    };
  }

  const lookup = EN_TO_KEYDEF.get(keyChar);
  if (!lookup) {
    return state;
  }

  const outputGlyph = lookup.shift ? lookup.keyDef.bnShift : lookup.keyDef.bn;

  // 1. Handle pending Hasanta (G) for independent vowels (G + F = আ, etc.)
  if (state.pendingHasanta) {
    if (outputGlyph in G_VOWEL_COMBO) {
      return {
        text: state.text + G_VOWEL_COMBO[outputGlyph],
        pendingPreKar: state.pendingPreKar,
        pendingHasanta: false,
        pendingReph: false,
        lastAutoPreKar: null,
      };
    }
    // Otherwise emit literal Hasanta then process current key normally
    const baseText = state.text + HASANTA;
    return applyVirtualBijoyKeystroke(keyChar, {
      ...state,
      text: baseText,
      pendingHasanta: false,
    }, _mode);
  }

  // 2. Pressing G (হসন্ত): if previous char is a consonant, emit Hasanta directly for conjuncts;
  // otherwise buffer pendingHasanta for independent vowels (আ, ই, উ...)
  if (outputGlyph === HASANTA) {
    const lastChar = state.text.slice(-1);
    if (state.lastAutoPreKar && PRE_BASE_KARS.has(state.lastAutoPreKar) && lastChar === state.lastAutoPreKar) {
      // User typed e.g. d + j + g (starting a conjunct under pre-base kar like ক্ষি)
      return {
        text: state.text.slice(0, -1) + HASANTA,
        pendingPreKar: state.lastAutoPreKar,
        pendingHasanta: false,
        pendingReph: false,
        lastAutoPreKar: null,
      };
    }
    if (CONSONANTS_REGEX.test(lastChar)) {
      return {
        ...state,
        text: state.text + HASANTA,
        pendingHasanta: false,
        lastAutoPreKar: null,
      };
    }
    return {
      ...state,
      pendingHasanta: true,
      lastAutoPreKar: null,
    };
  }

  // 3. Pressing Shift+A (রেফ র্) buffers Reph to place before the next consonant
  if (outputGlyph === 'র্') {
    return {
      ...state,
      pendingReph: true,
      lastAutoPreKar: null,
    };
  }

  // 4. Pressing pre-base vowel sign (ি, ে, ৈ) BEFORE consonant
  if (PRE_BASE_KARS.has(outputGlyph)) {
    const lastChar = state.text.slice(-1);
    // In Unicode logical typing, if user pressed consonant first and then ি/ে/ৈ, attach directly
    if (_mode === 'unicode' && CONSONANTS_REGEX.test(lastChar) && !state.pendingPreKar) {
      return {
        text: state.text + outputGlyph,
        pendingPreKar: null,
        pendingHasanta: false,
        pendingReph: false,
        lastAutoPreKar: null,
      };
    }
    return {
      ...state,
      pendingPreKar: outputGlyph,
      lastAutoPreKar: null,
    };
  }

  // 5. Completing ো-কার (C + consonant + F => ে becomes ো)
  if (outputGlyph === 'া' && state.lastAutoPreKar === 'ে' && state.text.endsWith('ে')) {
    return {
      text: state.text.slice(0, -1) + 'ো',
      pendingPreKar: null,
      pendingHasanta: false,
      pendingReph: false,
      lastAutoPreKar: null,
    };
  }

  // 6. Completing ৌ-কার (C + consonant + Shift+X => ে becomes ৌ)
  if (outputGlyph === 'ৌ' && state.lastAutoPreKar === 'ে' && state.text.endsWith('ে')) {
    return {
      text: state.text.slice(0, -1) + 'ৌ',
      pendingPreKar: null,
      pendingHasanta: false,
      pendingReph: false,
      lastAutoPreKar: null,
    };
  }

  // 7. Fola keys (z = ্র, Shift+Z = ্য) emit ্ + র / ্ + য
  if (outputGlyph === '্র' || outputGlyph === '্য') {
    const folaExpanded = outputGlyph === '্র' ? HASANTA + 'র' : HASANTA + 'য';
    if (state.pendingPreKar) {
      return {
        text: state.text + folaExpanded + state.pendingPreKar,
        pendingPreKar: null,
        pendingHasanta: false,
        pendingReph: false,
        lastAutoPreKar: state.pendingPreKar,
      };
    }
    return {
      text: state.text + folaExpanded,
      pendingPreKar: null,
      pendingHasanta: false,
      pendingReph: false,
      lastAutoPreKar: null,
    };
  }

  // 8. Consonant typed
  if (CONSONANTS_REGEX.test(outputGlyph)) {
    let chunk = outputGlyph;
    if (state.pendingReph) {
      chunk = 'র' + HASANTA + chunk;
    }
    if (state.pendingPreKar) {
      chunk = chunk + state.pendingPreKar;
    }
    return {
      text: state.text + chunk,
      pendingPreKar: null,
      pendingHasanta: false,
      pendingReph: false,
      lastAutoPreKar: state.pendingPreKar,
    };
  }

  // 9. Any other glyph (non-prebase kar া, ু, ূ, ী, ৃ, digits, punctuation, অ, ও)
  return {
    text: state.text + outputGlyph,
    pendingPreKar: state.pendingPreKar,
    pendingHasanta: false,
    pendingReph: false,
    lastAutoPreKar: null,
  };
}
