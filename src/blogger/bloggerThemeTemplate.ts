import {
  KEYBOARD_ROWS,
  CONJUNCT_GUIDE,
  MODE_DIFFERENCES,
} from '../data/bijoyKeymap';
import {
  LESSONS,
  PRACTICE_CATEGORIES,
  SPEED_TEST_PASSAGES,
  GAME_WORDS,
  GAME_SENTENCES,
} from '../data/lessons';

/**
 * Generates the complete, upload-ready Blogger (Blogspot) XML Theme
 * for Shikhon Shala (শিখনশালা) using HTML5, CSS3, and Vanilla JavaScript.
 */
export function buildBloggerXmlTheme(): string {
  const payload = {
    keyboardRows: KEYBOARD_ROWS,
    conjunctGuide: CONJUNCT_GUIDE,
    modeDifferences: MODE_DIFFERENCES,
    lessons: LESSONS,
    practiceCategories: PRACTICE_CATEGORIES,
    speedTestPassages: SPEED_TEST_PASSAGES,
    gameWords: GAME_WORDS,
    gameSentences: GAME_SENTENCES,
  };

  // Safe JSON serialization ensuring no accidental ']]>' breaks XML CDATA
  const serializedData = JSON.stringify(payload).replace(/\]\]>/g, ']\\]>');

  return `<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html>
<html b:css='false' b:defaultwidgetversion='2' b:layoutsVersion='3' b:responsive='true' b:templateVersion='1.3.0' expr:dir='data:blog.languageDirection' expr:lang='data:blog.locale' xmlns='http://www.w3.org/1999/xhtml' xmlns:b='http://www.google.com/2005/gml/b' xmlns:data='http://www.google.com/2005/gml/data' xmlns:expr='http://www.google.com/2005/gml/expr'>
<head>
  <meta charset='UTF-8'/>
  <meta content='width=device-width, initial-scale=1.0' name='viewport'/>
  <b:include data='blog' name='all-head-content'/>

  <b:if cond='data:view.isHomepage'>
    <title><data:blog.title/> — বাংলা টাইপিং শিখুন, দক্ষতা বাড়ান</title>
  <b:elseif cond='data:view.isPost or data:view.isPage'/>
    <title><data:blog.pageName/> | <data:blog.title/></title>
  <b:else/>
    <title><data:blog.pageTitle/></title>
  </b:if>

  <b:if cond='data:blog.metaDescription'>
    <meta expr:content='data:blog.metaDescription' name='description'/>
    <meta expr:content='data:blog.metaDescription' property='og:description'/>
  <b:else/>
    <meta content='Shikhon Shala (শিখনশালা) — Free Bangla Bijoy typing tutor supporting Bijoy Unicode and Bijoy Classic ANSI with 12 lessons, visual keyboard, speed tests, and games.' name='description'/>
    <meta content='Free Bangla Bijoy typing learning platform for beginners and advanced learners.' property='og:description'/>
  </b:if>
  <link expr:href='data:view.url.canonical' rel='canonical'/>

  <!-- Open Graph & Social Meta -->
  <meta expr:content='data:blog.title' property='og:site_name'/>
  <b:if cond='data:view.isHomepage'>
    <meta expr:content='data:blog.title' property='og:title'/>
  <b:else/>
    <meta expr:content='data:blog.pageTitle' property='og:title'/>
  </b:if>
  <meta expr:content='data:view.url.canonical' property='og:url'/>
  <meta content='website' property='og:type'/>
  <meta content='summary_large_image' name='twitter:card'/>

  <!-- Bilingual Typography: Plus Jakarta Sans + Noto Sans Bengali + JetBrains Mono -->
  <link href='https://fonts.googleapis.com' rel='preconnect'/>
  <link crossorigin='anonymous' href='https://fonts.gstatic.com' rel='preconnect'/>
  <link href='https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&amp;family=Noto+Sans+Bengali:wght@400;500;600;700&amp;family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;display=swap' rel='stylesheet'/>

  <!-- Structured Data (Schema.org) -->
  <script type='application/ld+json'>
  //<![CDATA[
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Shikhon Shala (শিখনশালা)",
    "alternateName": "শিখনশালা বাংলা টাইপিং প্ল্যাটফর্ম",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "inLanguage": ["bn", "en"],
    "isAccessibleForFree": true,
    "description": "Free interactive Bijoy Bangla typing tutor supporting Bijoy Unicode and Bijoy Classic ANSI with 12 lessons, visual keyboard, speed tests, and typing games."
  }
  //]]>
  </script>

  <b:skin><![CDATA[
/*
-----------------------------------------------
Blogger Template Name: Shikhon Shala (শিখনশালা)
Version: 1.0.0
Author: Shikhon Shala Team
Description: Free Bangla Bijoy Typing Learning Platform
-----------------------------------------------
*/

/* Variable definitions for Blogger Theme Designer
   ====================
   <Variable name="brand.emerald" description="Primary Accent Green" type="color" default="#059669" value="#059669"/>
   <Variable name="brand.navy" description="Dark Navy Surface" type="color" default="#0B1526" value="#0B1526"/>
   <Variable name="canvas.bg" description="Light Canvas Background" type="color" default="#F8FAFC" value="#F8FAFC"/>
*/

:root {
  --ss-bg: #F8FAFC;
  --ss-surface: #FFFFFF;
  --ss-surface-muted: #F1F5F9;
  --ss-border: #E2E8F0;
  --ss-text: #0F172A;
  --ss-text-muted: #475569;
  --ss-navy: #0B1526;
  --ss-emerald: #059669;
  --ss-emerald-hover: #047857;
  --ss-emerald-soft: #ECFDF5;
  --ss-emerald-text: #065F46;
  --ss-danger: #DC2626;
  --ss-danger-soft: #FEF2F2;
  --ss-amber: #D97706;
  --ss-amber-soft: #FFFBEB;
  --ss-shadow: 0 1px 3px rgba(15, 23, 42, 0.06), 0 1px 2px rgba(15, 23, 42, 0.04);
  --ss-font-sans: 'Plus Jakarta Sans', 'Noto Sans Bengali', system-ui, -apple-system, sans-serif;
  --ss-font-bn: 'Noto Sans Bengali', 'SolaimanLipi', 'Kalpurush', sans-serif;
  --ss-font-mono: 'JetBrains Mono', ui-monospace, monospace;
}

[data-theme="dark"] {
  --ss-bg: #0B1526;
  --ss-surface: #111E33;
  --ss-surface-muted: #172742;
  --ss-border: #1E3252;
  --ss-text: #F1F5F9;
  --ss-text-muted: #94A3B8;
  --ss-navy: #060D18;
  --ss-emerald: #10B981;
  --ss-emerald-hover: #34D399;
  --ss-emerald-soft: rgba(16, 185, 129, 0.14);
  --ss-emerald-text: #6EE7B7;
  --ss-danger: #F87171;
  --ss-danger-soft: rgba(239, 68, 68, 0.14);
  --ss-amber: #FBBF24;
  --ss-amber-soft: rgba(245, 158, 11, 0.14);
  --ss-shadow: 0 2px 6px rgba(0, 0, 0, 0.28);
}

*, *::before, *::after {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  background-color: var(--ss-bg);
  color: var(--ss-text);
  font-family: var(--ss-font-sans);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

a {
  color: var(--ss-emerald);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

button, input, textarea, select {
  font-family: inherit;
}

:focus-visible {
  outline: 2px solid var(--ss-emerald);
  outline-offset: 2px;
}

.ss-bn {
  font-family: var(--ss-font-bn);
}

.ss-mono {
  font-family: var(--ss-font-mono);
  font-variant-numeric: tabular-nums;
}

/* Shell Layout */
.ss-shell {
  display: flex;
  min-height: 100vh;
}

.ss-sidebar {
  width: 268px;
  flex-shrink: 0;
  background: var(--ss-navy);
  color: #E2E8F0;
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  z-index: 40;
}

.ss-brand-box {
  padding: 20px 20px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.ss-brand-title {
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  color: #FFFFFF;
  letter-spacing: -0.02em;
}

.ss-brand-title a {
  color: #FFFFFF;
  text-decoration: none;
}

.ss-brand-sub {
  margin: 4px 0 0;
  font-size: 12px;
  color: #94A3B8;
  font-family: var(--ss-font-bn);
}

.ss-nav-list {
  list-style: none;
  margin: 0;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.ss-nav-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 12px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: #CBD5E1;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
  white-space: nowrap;
}

.ss-nav-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #FFFFFF;
}

.ss-nav-btn.is-active {
  background: var(--ss-emerald);
  color: #FFFFFF;
  font-weight: 600;
}

.ss-sidebar-footer {
  padding: 14px 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 12px;
  color: #94A3B8;
}

.ss-main-area {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.ss-topbar {
  position: sticky;
  top: 0;
  z-index: 30;
  background: var(--ss-surface);
  border-bottom: 1px solid var(--ss-border);
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.ss-topbar-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ss-mobile-toggle {
  display: none;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid var(--ss-border);
  background: var(--ss-surface-muted);
  color: var(--ss-text);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.ss-topbar-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.ss-segmented {
  display: inline-flex;
  background: var(--ss-surface-muted);
  border: 1px solid var(--ss-border);
  border-radius: 9px;
  padding: 3px;
  gap: 2px;
}

.ss-seg-btn {
  border: 0;
  background: transparent;
  color: var(--ss-text-muted);
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}

.ss-seg-btn.is-active {
  background: var(--ss-surface);
  color: var(--ss-emerald);
  box-shadow: var(--ss-shadow);
}

.ss-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 9px 16px;
  border-radius: 9px;
  border: 1px solid var(--ss-border);
  background: var(--ss-surface);
  color: var(--ss-text);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}

.ss-btn:hover {
  background: var(--ss-surface-muted);
}

.ss-btn-primary {
  background: var(--ss-emerald);
  border-color: var(--ss-emerald);
  color: #FFFFFF;
}

.ss-btn-primary:hover {
  background: var(--ss-emerald-hover);
  border-color: var(--ss-emerald-hover);
}

.ss-btn-danger {
  color: var(--ss-danger);
  border-color: rgba(220, 38, 38, 0.3);
}

.ss-content {
  padding: 24px;
  max-width: 1180px;
  width: 100%;
  margin: 0 auto;
  flex: 1;
}

/* Cards & Grids */
.ss-card {
  background: var(--ss-surface);
  border: 1px solid var(--ss-border);
  border-radius: 14px;
  padding: 20px;
  box-shadow: var(--ss-shadow);
}

.ss-grid {
  display: grid;
  gap: 16px;
}

.ss-grid-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.ss-grid-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.ss-grid-4 {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.ss-hero {
  background: linear-gradient(135deg, var(--ss-navy) 0%, #13284A 100%);
  color: #FFFFFF;
  border-radius: 16px;
  padding: 28px;
  margin-bottom: 20px;
}

.ss-hero h1 {
  margin: 0 0 8px;
  font-size: clamp(24px, 3vw, 34px);
  line-height: 1.25;
}

.ss-hero p {
  margin: 0 0 18px;
  color: #CBD5E1;
  max-width: 68ch;
}

.ss-stat-val {
  font-size: 26px;
  font-weight: 700;
  color: var(--ss-text);
  margin: 4px 0 0;
}

.ss-stat-lbl {
  font-size: 12px;
  color: var(--ss-text-muted);
  font-weight: 600;
}

/* Typing Engine */
.ss-target-box {
  background: var(--ss-surface-muted);
  border: 1px solid var(--ss-border);
  border-radius: 12px;
  padding: 20px;
  font-family: var(--ss-font-bn);
  font-size: 26px;
  line-height: 1.85;
  letter-spacing: 0.01em;
  min-height: 124px;
  word-wrap: break-word;
  user-select: none;
}

.ss-ch-correct {
  color: var(--ss-emerald-text);
  background: var(--ss-emerald-soft);
  border-radius: 3px;
}

.ss-ch-wrong {
  color: var(--ss-danger);
  background: var(--ss-danger-soft);
  text-decoration: underline wavy var(--ss-danger);
  border-radius: 3px;
}

.ss-ch-current {
  border-bottom: 3px solid var(--ss-emerald);
  background: rgba(5, 150, 105, 0.14);
  border-radius: 3px;
  padding: 0 1px;
}

.ss-input-area {
  width: 100%;
  margin-top: 14px;
  padding: 14px 16px;
  border-radius: 12px;
  border: 2px solid var(--ss-border);
  background: var(--ss-surface);
  color: var(--ss-text);
  font-family: var(--ss-font-bn);
  font-size: 20px;
  resize: none;
}

.ss-input-area:focus {
  outline: none;
  border-color: var(--ss-emerald);
}

/* Visual Bijoy Keyboard */
.ss-kbd-wrap {
  margin-top: 18px;
  background: var(--ss-surface-muted);
  border: 1px solid var(--ss-border);
  border-radius: 14px;
  padding: 14px;
  overflow-x: auto;
}

.ss-kbd-row {
  display: flex;
  gap: 6px;
  margin-bottom: 6px;
  min-width: 720px;
}

.ss-kbd-row:last-child {
  margin-bottom: 0;
}

.ss-key {
  flex: 1;
  min-width: 42px;
  height: 54px;
  background: var(--ss-surface);
  border: 1px solid var(--ss-border);
  border-bottom: 3px solid var(--ss-border);
  border-radius: 8px;
  padding: 4px 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: transform 0.08s ease, background-color 0.12s ease, border-color 0.12s ease;
  user-select: none;
}

.ss-key:hover {
  border-color: var(--ss-emerald);
}

.ss-key.w-sm { flex: 1.45; }
.ss-key.w-md { flex: 1.8; }
.ss-key.w-lg { flex: 2.35; }
.ss-key.w-space { flex: 6; align-items: center; justify-content: center; }

.ss-key.is-expected {
  background: var(--ss-emerald-soft);
  border-color: var(--ss-emerald);
  border-bottom-color: var(--ss-emerald);
  box-shadow: 0 0 0 2px rgba(5, 150, 105, 0.25);
}

.ss-key.is-pressed {
  transform: translateY(2px);
  background: var(--ss-emerald);
  color: #FFFFFF;
}

.ss-key-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  color: var(--ss-text-muted);
  font-family: var(--ss-font-mono);
}

.ss-key.is-pressed .ss-key-top,
.ss-key.is-pressed .ss-key-bn {
  color: #FFFFFF;
}

.ss-key-bn {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-family: var(--ss-font-bn);
  font-size: 16px;
  font-weight: 700;
  color: var(--ss-text);
}

.ss-key-bn-shift {
  font-size: 12px;
  font-weight: 500;
  color: var(--ss-text-muted);
}

/* Progress Bar */
.ss-progress-track {
  width: 100%;
  height: 10px;
  background: var(--ss-surface-muted);
  border-radius: 999px;
  overflow: hidden;
  border: 1px solid var(--ss-border);
}

.ss-progress-fill {
  height: 100%;
  background: var(--ss-emerald);
  transition: width 0.25s ease;
}

/* Blogger Standard Blog & Footer Sections */
.ss-blog-wrapper {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 24px 28px;
}

.ss-post-card {
  background: var(--ss-surface);
  border: 1px solid var(--ss-border);
  border-radius: 14px;
  padding: 24px;
  margin-bottom: 18px;
}

.ss-post-title {
  margin: 0 0 8px;
  font-size: 22px;
}

.ss-post-meta {
  font-size: 13px;
  color: var(--ss-text-muted);
  margin-bottom: 14px;
}

.ss-footer {
  background: var(--ss-surface);
  border-top: 1px solid var(--ss-border);
  padding: 22px 24px;
  margin-top: auto;
}

.ss-footer-inner {
  max-width: 1180px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 13px;
  color: var(--ss-text-muted);
}

.ss-linklist ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.ss-table-wrap {
  overflow-x: auto;
}

table.ss-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

table.ss-table th,
table.ss-table td {
  padding: 10px 12px;
  border-bottom: 1px solid var(--ss-border);
  text-align: left;
}

table.ss-table th {
  font-size: 12px;
  color: var(--ss-text-muted);
  font-weight: 700;
}

.ss-notice {
  background: var(--ss-emerald-soft);
  color: var(--ss-emerald-text);
  border: 1px solid rgba(5, 150, 105, 0.25);
  border-radius: 10px;
  padding: 12px 14px;
  font-size: 13px;
}

.ss-mobile-tip {
  display: none;
  background: var(--ss-amber-soft);
  color: var(--ss-amber);
  border: 1px solid rgba(217, 119, 6, 0.3);
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 13px;
  margin-bottom: 14px;
}

.ss-backdrop {
  display: none;
}

@media (max-width: 960px) {
  .ss-sidebar {
    position: fixed;
    left: -280px;
    transition: left 0.2s ease;
  }
  .ss-sidebar.is-open {
    left: 0;
  }
  .ss-backdrop.is-open {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.55);
    z-index: 35;
  }
  .ss-mobile-toggle {
    display: inline-flex;
  }
  .ss-grid-4, .ss-grid-3 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .ss-mobile-tip {
    display: block;
  }
}

@media (max-width: 640px) {
  .ss-grid-4, .ss-grid-3, .ss-grid-2 {
    grid-template-columns: 1fr;
  }
  .ss-content {
    padding: 16px;
  }
  .ss-target-box {
    font-size: 21px;
  }
}
  ]]></b:skin>

  <b:template-skin><![CDATA[
    body#layout .ss-sidebar { display: none; }
    body#layout .ss-section-box { border: 1px dashed #94A3B8; padding: 12px; margin-bottom: 12px; }
  ]]></b:template-skin>
</head>
<body>
  <div class='ss-shell'>
    <!-- Mobile Sidebar Backdrop -->
    <div class='ss-backdrop' id='ssBackdrop'></div>

    <!-- Navigation Sidebar -->
    <aside aria-label='Main Navigation' class='ss-sidebar' id='ssSidebar'>
      <div class='ss-brand-box'>
        <b:section class='ss-section-box' id='header' maxwidgets='1' name='Site Header' showaddelement='no'>
          <b:widget id='Header1' locked='true' title='Shikhon Shala (শিখনশালা)' type='Header' version='2' visible='true'>
            <b:includable id='main'>
              <h2 class='ss-brand-title'>
                <a expr:href='data:blog.homepageUrl'><data:title/></a>
              </h2>
              <p class='ss-brand-sub'>
                <b:if cond='data:description'>
                  <data:description/>
                <b:else/>
                  বাংলা টাইপিং শিখুন, দক্ষতা বাড়ান।
                </b:if>
              </p>
            </b:includable>
            <b:includable id='behindImageStyle'/>
            <b:includable id='description'/>
            <b:includable id='image'/>
            <b:includable id='title'/>
          </b:widget>
        </b:section>
      </div>

      <ul class='ss-nav-list' id='ssNavList'>
        <li><button class='ss-nav-btn is-active' data-route='home' type='button'><span>হোম / ড্যাশবোর্ড</span><span>Home</span></button></li>
        <li><button class='ss-nav-btn' data-route='start' type='button'><span>শেখা শুরু করুন</span><span>Start</span></button></li>
        <li><button class='ss-nav-btn' data-route='keyboard' type='button'><span>বিজয় কিবোর্ড লেআউট</span><span>Layout</span></button></li>
        <li><button class='ss-nav-btn' data-route='lessons' type='button'><span>১২টি লেসন</span><span>Lessons</span></button></li>
        <li><button class='ss-nav-btn' data-route='practice' type='button'><span>টাইপিং অনুশীলন</span><span>Practice</span></button></li>
        <li><button class='ss-nav-btn' data-route='speedtest' type='button'><span>স্পিড টেস্ট</span><span>Speed Test</span></button></li>
        <li><button class='ss-nav-btn' data-route='games' type='button'><span>টাইপিং গেমস</span><span>Games</span></button></li>
        <li><button class='ss-nav-btn' data-route='progress' type='button'><span>অগ্রগতি রিপোর্ট</span><span>Progress</span></button></li>
        <li><button class='ss-nav-btn' data-route='about' type='button'><span>শিখনশালা সম্পর্কে</span><span>About</span></button></li>
        <li><button class='ss-nav-btn' data-route='contact' type='button'><span>যোগাযোগ</span><span>Contact</span></button></li>
      </ul>

      <div class='ss-sidebar-footer'>
        <div>Free Bijoy Bangla Typing Tutor</div>
        <div style='margin-top:4px;opacity:0.8;'>Progress saved locally in browser</div>
      </div>
    </aside>

    <!-- Main Workspace Area -->
    <div class='ss-main-area'>
      <header class='ss-topbar'>
        <div class='ss-topbar-left'>
          <button aria-label='Toggle menu' class='ss-mobile-toggle' id='ssMobileMenuBtn' type='button'>☰ মেনু</button>
          <b:section class='ss-linklist' id='nav-links' maxwidgets='1' name='Editable Header Links' showaddelement='yes'>
            <b:widget id='LinkList1' locked='false' title='Navigation Links' type='LinkList' version='2' visible='true'>
              <b:includable id='main'>
                <b:if cond='data:links'>
                  <ul>
                    <b:loop values='data:links' var='link'>
                      <li><a expr:href='data:link.target'><data:link.name/></a></li>
                    </b:loop>
                  </ul>
                </b:if>
              </b:includable>
            </b:widget>
          </b:section>
        </div>

        <div class='ss-topbar-controls'>
          <div aria-label='Bijoy Mode Selector' class='ss-segmented' role='group'>
            <button class='ss-seg-btn is-active' data-mode='unicode' type='button'>Bijoy Unicode</button>
            <button class='ss-seg-btn' data-mode='ansi' type='button'>Bijoy Classic (ANSI)</button>
          </div>
          <div aria-label='Input Method Selector' class='ss-segmented' role='group'>
            <button class='ss-seg-btn is-active' data-input='virtual' type='button'>Virtual Mapper</button>
            <button class='ss-seg-btn' data-input='ime' type='button'>System IME</button>
          </div>
          <button aria-label='Toggle Light or Dark Theme' class='ss-btn' id='ssThemeToggle' type='button'>Dark Mode</button>
        </div>
      </header>

      <!-- Interactive Shikhon Shala Application (Homepage / Tutor View) -->
      <b:if cond='data:view.isHomepage or data:view.isSearch'>
        <main class='ss-content' id='ssAppRoot'>
          <div class='ss-mobile-tip ss-bn'>
            মোবাইল টিপস: বিজয় টাইপিং ফিজিক্যাল QWERTY কিবোর্ডের জন্য নির্মিত। মোবাইল স্ক্রিনে নিচের ভিজ্যুয়াল কিবোর্ডের কী ট্যাপ করেও বর্ণ ও অবস্থান অনুশীলন করতে পারবেন।
          </div>
          <div id='ssViewContainer'>
            <noscript>
              <div class='ss-card'>
                <h2>JavaScript Required</h2>
                <p>Shikhon Shala requires JavaScript enabled in your browser to run the interactive Bijoy typing tutor.</p>
              </div>
            </noscript>
          </div>
        </main>
      <b:else/>
        <!-- On Single Post or Static Page: Provide Quick Bar to Return to Typing Tutor -->
        <div class='ss-content' style='padding-bottom:0;'>
          <div class='ss-card' style='display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;'>
            <span class='ss-bn'><strong>শিখনশালা</strong> — বিজয় বাংলা টাইপিং টিউটর</span>
            <a class='ss-btn ss-btn-primary' expr:href='data:blog.homepageUrl'>হোম ও টাইপিং টিউটরে ফিরুন</a>
          </div>
        </div>
      </b:if>

      <!-- Standard Blogger Blog & Static Pages Section (Preserved) -->
      <section aria-label='Blog Posts and Pages' class='ss-blog-wrapper'>
        <b:section class='ss-section-box' id='main' maxwidgets='2' name='Blog Posts' showaddelement='yes'>
          <b:widget id='Blog1' locked='true' title='Blog Posts' type='Blog' version='2' visible='true'>
            <b:includable id='main' var='top'>
              <b:if cond='data:posts.notEmpty'>
                <b:if cond='data:view.isHomepage'>
                  <div style='margin-top:16px;margin-bottom:12px;font-size:15px;font-weight:700;color:var(--ss-text-muted);'>
                    সাম্প্রতিক ব্লগ পোস্ট ও টিপস
                  </div>
                </b:if>
                <b:loop values='data:posts' var='post'>
                  <article class='ss-post-card'>
                    <h2 class='ss-post-title ss-bn'>
                      <b:if cond='data:post.link'>
                        <a expr:href='data:post.link'><data:post.title/></a>
                      <b:elseif cond='data:post.url'/>
                        <a expr:href='data:post.url'><data:post.title/></a>
                      <b:else/>
                        <data:post.title/>
                      </b:if>
                    </h2>
                    <div class='ss-post-meta'>
                      <b:if cond='data:post.date'><data:post.date/></b:if>
                      <b:if cond='data:post.author'> · <data:post.author.name/></b:if>
                    </div>
                    <div class='ss-bn'>
                      <b:if cond='data:view.isSingleItem'>
                        <data:post.body/>
                      <b:else/>
                        <p><data:post.snippet/></p>
                        <a class='ss-btn' expr:href='data:post.url'>বিস্তারিত পড়ুন</a>
                      </b:if>
                    </div>
                  </article>
                </b:loop>
                <b:if cond='data:olderPageUrl or data:newerPageUrl'>
                  <div style='display:flex;justify-content:space-between;gap:12px;'>
                    <b:if cond='data:newerPageUrl'><a class='ss-btn' expr:href='data:newerPageUrl'>← নতুন পোস্ট</a></b:if>
                    <b:if cond='data:olderPageUrl'><a class='ss-btn' expr:href='data:olderPageUrl'>পুরাতন পোস্ট →</a></b:if>
                  </div>
                </b:if>
              </b:if>
            </b:includable>
            <b:includable id='aboutPostAuthor'/>
            <b:includable id='addComments'/>
            <b:includable id='blogThisShare'/>
            <b:includable id='bylineByName'/>
            <b:includable id='bylineRegion'/>
            <b:includable id='commentAuthorAvatar'/>
            <b:includable id='commentDeleteIcon'/>
            <b:includable id='commentForm'/>
            <b:includable id='commentFormIframeSrc'/>
            <b:includable id='commentItem'/>
            <b:includable id='commentList'/>
            <b:includable id='commentPicker'/>
            <b:includable id='comments'/>
            <b:includable id='commentsLink'/>
            <b:includable id='commentsLinkIframe'/>
            <b:includable id='commentsTitle'/>
            <b:includable id='defaultAdUnit'/>
            <b:includable id='emailPostIcon'/>
            <b:includable id='facebookShare'/>
            <b:includable id='feedLinks'/>
            <b:includable id='feedLinksBody'/>
            <b:includable id='footerBylines'/>
            <b:includable id='googlePlusShare'/>
            <b:includable id='headerByline'/>
            <b:includable id='homePageLink'/>
            <b:includable id='iframeComments'/>
            <b:includable id='inlineAd'/>
            <b:includable id='linkShare'/>
            <b:includable id='manageComments'/>
            <b:includable id='nextPageLink'/>
            <b:includable id='otherSharingButton'/>
            <b:includable id='platformShare'/>
            <b:includable id='post'/>
            <b:includable id='postAuthor'/>
            <b:includable id='postBody'/>
            <b:includable id='postBodySnippet'/>
            <b:includable id='postCommentsAndAd'/>
            <b:includable id='postCommentsLink'/>
            <b:includable id='postFooter'/>
            <b:includable id='postFooterAuthorProfile'/>
            <b:includable id='postHeader'/>
            <b:includable id='postJumpLink'/>
            <b:includable id='postLabels'/>
            <b:includable id='postLocation'/>
            <b:includable id='postMeta'/>
            <b:includable id='postMetadataJSON'/>
            <b:includable id='postPagination'/>
            <b:includable id='postReactions'/>
            <b:includable id='postShareButtons'/>
            <b:includable id='postTimestamp'/>
            <b:includable id='postTitle'/>
            <b:includable id='previousPageLink'/>
            <b:includable id='sharingButton'/>
            <b:includable id='sharingButtonContent'/>
            <b:includable id='sharingButtons'/>
            <b:includable id='sharingButtonsMenu'/>
            <b:includable id='sharingPlatformIcon'/>
            <b:includable id='threadedCommentForm'/>
            <b:includable id='threadedCommentJs'/>
            <b:includable id='threadedComments'/>
          </b:widget>
        </b:section>
      </section>

      <!-- Footer -->
      <footer class='ss-footer'>
        <div class='ss-footer-inner'>
          <div class='ss-bn'>
            © <span id='ssYear'></span> <strong><data:blog.title/></strong> — বিনামূল্যে বিজয় বাংলা টাইপিং শিখুন।
          </div>
          <b:section class='ss-linklist' id='footer-links' maxwidgets='1' name='Editable Footer Links' showaddelement='yes'>
            <b:widget id='LinkList2' locked='false' title='Footer Links' type='LinkList' version='2' visible='true'>
              <b:includable id='main'>
                <b:if cond='data:links'>
                  <ul>
                    <b:loop values='data:links' var='link'>
                      <li><a expr:href='data:link.target'><data:link.name/></a></li>
                    </b:loop>
                  </ul>
                <b:else/>
                  <ul>
                    <li><a href='#about' onclick='window.SSApp &amp;&amp; window.SSApp.navigate("about");return false;'>About</a></li>
                    <li><a href='#keyboard' onclick='window.SSApp &amp;&amp; window.SSApp.navigate("keyboard");return false;'>Bijoy Layout</a></li>
                    <li><a href='#contact' onclick='window.SSApp &amp;&amp; window.SSApp.navigate("contact");return false;'>Contact</a></li>
                  </ul>
                </b:if>
              </b:includable>
            </b:widget>
          </b:section>
        </div>
      </footer>
    </div>
  </div>

  <!-- Shikhon Shala Application Script -->
  <script type='text/javascript'>
  //<![CDATA[
  (function () {
    'use strict';

    var SS_DATA = ${serializedData};
    var STORAGE_KEY = 'shikhon_shala_blogger_v1';
    var PRE_BASE_KARS = { 'ি': true, 'ে': true, 'ৈ': true };
    var HASANTA = '্';
    var CONSONANT_RE = /^[\u0995-\u09B9\u09DC-\u09DF]$/;

    var DEFAULT_STATE = {
      route: 'home',
      mode: 'unicode',
      inputMode: 'virtual',
      theme: 'light',
      activeLessonId: 1,
      activeDrillIdx: 0,
      completedLessons: [],
      bestScores: {},
      history: []
    };

    var appState = loadState();
    var runtime = {
      targetText: '',
      typedText: '',
      keystrokes: 0,
      errors: 0,
      startTime: null,
      elapsedSec: 0,
      timerId: null,
      finished: false,
      testDurationSec: 60,
      testPassageIdx: 0,
      practiceCatIdx: 0,
      practiceTextIdx: 0,
      customPracticeText: '',
      virtualState: { text: '', pendingPreKar: null, pendingHasanta: false, pendingReph: false, lastAutoPreKar: null },
      keyboardShiftPreview: false,
      selectedKeyCode: null,
      gameType: 'word',
      gameActive: false,
      gameScore: 0,
      gameStreak: 0,
      gameCorrect: 0,
      gameTotal: 0,
      gameTimeLeft: 60,
      gameTimerId: null,
      gamePrompt: '',
      gameInput: '',
      gameMessage: ''
    };

    var KEY_BY_CODE = {};
    var CHAR_TO_KEY = {};
    var EN_TO_KEYDEF = {};

    (function buildKeyMaps() {
      for (var r = 0; r < SS_DATA.keyboardRows.length; r++) {
        var row = SS_DATA.keyboardRows[r];
        for (var c = 0; c < row.length; c++) {
          var k = row[c];
          KEY_BY_CODE[k.code] = k;
          if (!k.isModifier) {
            if (!CHAR_TO_KEY[k.bn]) CHAR_TO_KEY[k.bn] = { code: k.code, shift: false, keyDef: k };
            if (!CHAR_TO_KEY[k.bnShift]) CHAR_TO_KEY[k.bnShift] = { code: k.code, shift: true, keyDef: k };
            EN_TO_KEYDEF[k.en] = { code: k.code, shift: false, keyDef: k };
            EN_TO_KEYDEF[k.enShift] = { code: k.code, shift: true, keyDef: k };
          } else if (k.code === 'Space') {
            CHAR_TO_KEY[' '] = { code: 'Space', shift: false, keyDef: k };
          }
        }
      }
    })();

    function loadState() {
      try {
        var raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return JSON.parse(JSON.stringify(DEFAULT_STATE));
        var parsed = JSON.parse(raw);
        return {
          route: parsed.route || 'home',
          mode: parsed.mode === 'ansi' ? 'ansi' : 'unicode',
          inputMode: parsed.inputMode === 'ime' ? 'ime' : 'virtual',
          theme: parsed.theme === 'dark' ? 'dark' : 'light',
          activeLessonId: parsed.activeLessonId || 1,
          activeDrillIdx: parsed.activeDrillIdx || 0,
          completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
          bestScores: parsed.bestScores || {},
          history: Array.isArray(parsed.history) ? parsed.history : []
        };
      } catch (e) {
        return JSON.parse(JSON.stringify(DEFAULT_STATE));
      }
    }

    function saveState() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
      } catch (e) {
        // Ignore storage quota errors
      }
    }

    function escapeHtml(str) {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    function applyTheme() {
      document.documentElement.setAttribute('data-theme', appState.theme);
      var btn = document.getElementById('ssThemeToggle');
      if (btn) btn.textContent = appState.theme === 'dark' ? 'Light Mode' : 'Dark Mode';
    }

    function applyVirtualKeystroke(keyChar, st) {
      if (keyChar === ' ') {
        return { text: st.text + ' ', pendingPreKar: null, pendingHasanta: false, pendingReph: false, lastAutoPreKar: null };
      }
      var lookup = EN_TO_KEYDEF[keyChar];
      if (!lookup) return st;
      var glyph = lookup.shift ? lookup.keyDef.bnShift : lookup.keyDef.bn;
      var gMap = { 'া': 'আ', 'ি': 'ই', 'ী': 'ঈ', 'ু': 'উ', 'ূ': 'ঊ', 'ৃ': 'ঋ', 'ে': 'এ', 'ৈ': 'ঐ', 'ৌ': 'ঔ' };

      if (st.pendingHasanta) {
        if (gMap[glyph]) {
          return { text: st.text + gMap[glyph], pendingPreKar: st.pendingPreKar, pendingHasanta: false, pendingReph: false, lastAutoPreKar: null };
        }
        return applyVirtualKeystroke(keyChar, { text: st.text + HASANTA, pendingPreKar: st.pendingPreKar, pendingHasanta: false, pendingReph: st.pendingReph, lastAutoPreKar: null });
      }

      if (glyph === HASANTA) {
        var lastCh = st.text.slice(-1);
        if (st.lastAutoPreKar && PRE_BASE_KARS[st.lastAutoPreKar] && lastCh === st.lastAutoPreKar) {
          return { text: st.text.slice(0, -1) + HASANTA, pendingPreKar: st.lastAutoPreKar, pendingHasanta: false, pendingReph: false, lastAutoPreKar: null };
        }
        if (CONSONANT_RE.test(lastCh)) {
          return { text: st.text + HASANTA, pendingPreKar: st.pendingPreKar, pendingHasanta: false, pendingReph: false, lastAutoPreKar: null };
        }
        return { text: st.text, pendingPreKar: st.pendingPreKar, pendingHasanta: true, pendingReph: false, lastAutoPreKar: null };
      }

      if (glyph === 'র্') {
        return { text: st.text, pendingPreKar: st.pendingPreKar, pendingHasanta: false, pendingReph: true, lastAutoPreKar: null };
      }

      if (PRE_BASE_KARS[glyph]) {
        var lc = st.text.slice(-1);
        if (appState.mode === 'unicode' && CONSONANT_RE.test(lc) && !st.pendingPreKar) {
          return { text: st.text + glyph, pendingPreKar: null, pendingHasanta: false, pendingReph: false, lastAutoPreKar: null };
        }
        return { text: st.text, pendingPreKar: glyph, pendingHasanta: false, pendingReph: false, lastAutoPreKar: null };
      }

      if (glyph === 'া' && st.lastAutoPreKar === 'ে' && st.text.slice(-1) === 'ে') {
        return { text: st.text.slice(0, -1) + 'ো', pendingPreKar: null, pendingHasanta: false, pendingReph: false, lastAutoPreKar: null };
      }

      if (glyph === 'ৌ' && st.lastAutoPreKar === 'ে' && st.text.slice(-1) === 'ে') {
        return { text: st.text.slice(0, -1) + 'ৌ', pendingPreKar: null, pendingHasanta: false, pendingReph: false, lastAutoPreKar: null };
      }

      if (glyph === '্র' || glyph === '্য') {
        var fola = glyph === '্র' ? HASANTA + 'র' : HASANTA + 'য';
        if (st.pendingPreKar) {
          return { text: st.text + fola + st.pendingPreKar, pendingPreKar: null, pendingHasanta: false, pendingReph: false, lastAutoPreKar: st.pendingPreKar };
        }
        return { text: st.text + fola, pendingPreKar: null, pendingHasanta: false, pendingReph: false, lastAutoPreKar: null };
      }

      if (CONSONANT_RE.test(glyph)) {
        var chunk = glyph;
        if (st.pendingReph) chunk = 'র' + HASANTA + chunk;
        if (st.pendingPreKar) chunk = chunk + st.pendingPreKar;
        return { text: st.text + chunk, pendingPreKar: null, pendingHasanta: false, pendingReph: false, lastAutoPreKar: st.pendingPreKar };
      }

      return { text: st.text + glyph, pendingPreKar: st.pendingPreKar, pendingHasanta: false, pendingReph: false, lastAutoPreKar: null };
    }

    function getNextHint() {
      var target = runtime.targetText;
      var typed = runtime.typedText;
      if (!target || typed.length >= target.length) return null;
      var rem = target.slice(typed.length);
      var ch = rem[0];
      var vs = runtime.virtualState;

      if (vs.pendingHasanta) {
        var map2 = {
          'আ': ['KeyF', false, 'F'], 'ই': ['KeyD', false, 'D'], 'ঈ': ['KeyD', true, 'Shift + D'],
          'উ': ['KeyS', false, 'S'], 'ঊ': ['KeyS', true, 'Shift + S'], 'ঋ': ['KeyA', false, 'A'],
          'এ': ['KeyC', false, 'C'], 'ঐ': ['KeyC', true, 'Shift + C'], 'ঔ': ['KeyX', true, 'Shift + X']
        };
        if (map2[ch]) {
          return { code: map2[ch][0], shift: map2[ch][1], label: map2[ch][2], seq: 'G + ' + map2[ch][2] + ' = ' + ch };
        }
      }

      var gStart = { 'আ': 'G + F', 'ই': 'G + D', 'ঈ': 'G + Shift+D', 'উ': 'G + S', 'ঊ': 'G + Shift+S', 'ঋ': 'G + A', 'এ': 'G + C', 'ঐ': 'G + Shift+C', 'ঔ': 'G + Shift+X' };
      if (gStart[ch]) {
        return { code: 'KeyG', shift: false, label: 'G', seq: gStart[ch] + ' = ' + ch };
      }

      if (rem.length >= 3 && rem[0] === 'র' && rem[1] === HASANTA && CONSONANT_RE.test(rem[2])) {
        return { code: 'KeyA', shift: true, label: 'Shift + A', seq: 'Shift+A (র্) + ব্যঞ্জন' };
      }
      if (rem.length >= 2 && rem[0] === HASANTA && rem[1] === 'র') {
        return { code: 'KeyZ', shift: false, label: 'Z', seq: 'Z = র-ফলা (্র)' };
      }
      if (rem.length >= 2 && rem[0] === HASANTA && rem[1] === 'য') {
        return { code: 'KeyZ', shift: true, label: 'Shift + Z', seq: 'Shift+Z = য-ফলা (্য)' };
      }

      if (!vs.pendingPreKar && CONSONANT_RE.test(ch)) {
        var idx = 1;
        while (idx + 1 < rem.length && rem[idx] === HASANTA && CONSONANT_RE.test(rem[idx + 1])) idx += 2;
        var aft = rem[idx];
        if (aft && (PRE_BASE_KARS[aft] || aft === 'ো')) {
          var pk = aft === 'ো' ? 'ে' : aft;
          var mp = CHAR_TO_KEY[pk];
          if (mp) {
            var lbl = mp.shift ? 'Shift + ' + mp.keyDef.en.toUpperCase() : mp.keyDef.en.toUpperCase();
            return { code: mp.code, shift: mp.shift, label: lbl, seq: 'ব্যঞ্জনের আগে ' + pk + ' (' + lbl + ')' };
          }
        }
      }

      if (ch === 'ো') {
        return { code: 'KeyF', shift: false, label: 'F', seq: 'C (ে) + ব্যঞ্জন + F (া) = ো' };
      }

      var m = CHAR_TO_KEY[ch];
      if (m) {
        var kl = m.keyDef.en.length === 1 ? m.keyDef.en.toUpperCase() : m.keyDef.en;
        var dl = m.shift ? 'Shift + ' + kl : kl;
        return { code: m.code, shift: m.shift, label: dl, seq: dl + ' = ' + ch };
      }
      return null;
    }

    function stopTimers() {
      if (runtime.timerId) {
        clearInterval(runtime.timerId);
        runtime.timerId = null;
      }
      if (runtime.gameTimerId) {
        clearInterval(runtime.gameTimerId);
        runtime.gameTimerId = null;
      }
    }

    function resetTypingSession(newTarget) {
      if (runtime.timerId) {
        clearInterval(runtime.timerId);
        runtime.timerId = null;
      }
      runtime.targetText = newTarget;
      runtime.typedText = '';
      runtime.keystrokes = 0;
      runtime.errors = 0;
      runtime.startTime = null;
      runtime.elapsedSec = 0;
      runtime.finished = false;
      runtime.virtualState = { text: '', pendingPreKar: null, pendingHasanta: false, pendingReph: false, lastAutoPreKar: null };
    }

    function calcStats() {
      var typed = runtime.typedText;
      var target = runtime.targetText;
      var correct = 0;
      for (var i = 0; i < typed.length; i++) {
        if (typed[i] === target[i]) correct++;
      }
      var sec = Math.max(runtime.elapsedSec, 1);
      var mins = sec / 60;
      var wpm = typed.length > 0 ? Math.round((correct / 5) / mins) : 0;
      var cpm = typed.length > 0 ? Math.round(correct / mins) : 0;
      var total = Math.max(typed.length, 1);
      var acc = typed.length > 0 ? Math.max(0, Math.round(((correct) / (typed.length + runtime.errors * 0.25)) * 100)) : 100;
      if (acc > 100) acc = 100;
      return { correct: correct, wpm: wpm, cpm: cpm, accuracy: acc };
    }

    function recordSession(label, wpm, cpm, accuracy) {
      appState.history.unshift({
        date: new Date().toLocaleDateString('bn-BD'),
        label: label,
        mode: appState.mode === 'ansi' ? 'Classic ANSI' : 'Unicode',
        wpm: wpm,
        cpm: cpm,
        accuracy: accuracy
      });
      if (appState.history.length > 25) appState.history.length = 25;
      saveState();
    }

    function renderKeyboardHtml(interactiveTyping) {
      var hint = interactiveTyping ? getNextHint() : null;
      var html = '<div class="ss-kbd-wrap">';
      if (hint) {
        html += '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:10px;font-size:13px;">';
        html += '<span class="ss-bn">পরবর্তী কী: <strong style="color:var(--ss-emerald);">' + escapeHtml(hint.seq) + '</strong></span>';
        if (runtime.virtualState.pendingPreKar || runtime.virtualState.pendingHasanta || runtime.virtualState.pendingReph) {
          var pend = runtime.virtualState.pendingPreKar || (runtime.virtualState.pendingHasanta ? 'G (স্বরবর্ণ অপেক্ষমাণ)' : 'র্ (রেফ অপেক্ষমাণ)');
          html += '<span class="ss-bn" style="color:var(--ss-amber);font-weight:600;">অপেক্ষমাণ: ' + escapeHtml(pend) + '</span>';
        }
        html += '</div>';
      }

      for (var r = 0; r < SS_DATA.keyboardRows.length; r++) {
        var row = SS_DATA.keyboardRows[r];
        html += '<div class="ss-kbd-row">';
        for (var c = 0; c < row.length; c++) {
          var k = row[c];
          var cls = 'ss-key';
          if (k.width === 'wide-sm') cls += ' w-sm';
          else if (k.width === 'wide-md') cls += ' w-md';
          else if (k.width === 'wide-lg') cls += ' w-lg';
          else if (k.width === 'space') cls += ' w-space';

          var isExpected = hint && (hint.code === k.code || (hint.shift && (k.code === 'ShiftLeft' || k.code === 'ShiftRight')));
          if (isExpected) cls += ' is-expected';
          if (runtime.selectedKeyCode === k.code) cls += ' is-expected';

          html += '<button type="button" class="' + cls + '" data-keycode="' + k.code + '" data-en="' + escapeHtml(k.en) + '" data-enshift="' + escapeHtml(k.enShift) + '">';
          if (k.code === 'Space') {
            html += '<span class="ss-bn" style="font-size:13px;font-weight:600;">Space / স্পেস</span>';
          } else {
            html += '<div class="ss-key-top"><span>' + escapeHtml(k.en.toUpperCase()) + '</span><span>' + escapeHtml(k.finger) + '</span></div>';
            html += '<div class="ss-key-bn"><span>' + escapeHtml(runtime.keyboardShiftPreview ? k.bnShift : k.bn) + '</span>';
            if (!k.isModifier && k.bn !== k.bnShift) {
              html += '<span class="ss-key-bn-shift">' + escapeHtml(runtime.keyboardShiftPreview ? k.bn : k.bnShift) + '</span>';
            }
            html += '</div>';
          }
          html += '</button>';
        }
        html += '</div>';
      }
      html += '</div>';
      return html;
    }

    function renderTargetCharsHtml() {
      var target = runtime.targetText;
      var typed = runtime.typedText;
      var out = '';
      for (var i = 0; i < target.length; i++) {
        var ch = escapeHtml(target[i]);
        if (i < typed.length) {
          out += typed[i] === target[i]
            ? '<span class="ss-ch-correct">' + ch + '</span>'
            : '<span class="ss-ch-wrong">' + ch + '</span>';
        } else if (i === typed.length) {
          out += '<span class="ss-ch-current">' + ch + '</span>';
        } else {
          out += '<span>' + ch + '</span>';
        }
      }
      return out;
    }

    function renderTypingStudio(options) {
      var stats = calcStats();
      var pct = runtime.targetText.length ? Math.min(100, Math.round((runtime.typedText.length / runtime.targetText.length) * 100)) : 0;
      var timeDisplay = options.isCountdown
        ? Math.max(0, runtime.testDurationSec - runtime.elapsedSec)
        : runtime.elapsedSec;
      var mins = Math.floor(timeDisplay / 60);
      var secs = timeDisplay % 60;
      var timeStr = (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs;

      var html = '';
      html += '<div class="ss-grid ss-grid-4" style="margin-bottom:14px;">';
      html += '<div class="ss-card" style="padding:14px;"><div class="ss-stat-lbl">গতি (WPM)</div><div class="ss-stat-val ss-mono" id="ssStatWpm">' + stats.wpm + '</div></div>';
      html += '<div class="ss-card" style="padding:14px;"><div class="ss-stat-lbl">অক্ষর/মিনিট (CPM)</div><div class="ss-stat-val ss-mono" id="ssStatCpm">' + stats.cpm + '</div></div>';
      html += '<div class="ss-card" style="padding:14px;"><div class="ss-stat-lbl">নির্ভুলতা (Accuracy)</div><div class="ss-stat-val ss-mono" id="ssStatAcc">' + stats.accuracy + '%</div></div>';
      html += '<div class="ss-card" style="padding:14px;"><div class="ss-stat-lbl">' + (options.isCountdown ? 'বাকি সময়' : 'সময়') + '</div><div class="ss-stat-val ss-mono" id="ssStatTime">' + timeStr + '</div></div>';
      html += '</div>';

      html += '<div class="ss-card">';
      html += '<div style="display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:10px;flex-wrap:wrap;">';
      html += '<span class="ss-bn" style="font-size:13px;color:var(--ss-text-muted);">মোড: <strong>' + (appState.mode === 'ansi' ? 'Bijoy Classic (ANSI)' : 'Bijoy Unicode') + '</strong> · ইনপুট: <strong>' + (appState.inputMode === 'virtual' ? 'Virtual Bijoy Mapper' : 'System IME') + '</strong></span>';
      html += '<span class="ss-mono" style="font-size:12px;color:var(--ss-text-muted);" id="ssStatProg">' + pct + '% সম্পন্ন</span>';
      html += '</div>';
      html += '<div class="ss-progress-track" style="margin-bottom:14px;"><div class="ss-progress-fill" id="ssProgBar" style="width:' + pct + '%;"></div></div>';

      if (runtime.finished) {
        var passed = !options.minAccuracy || stats.accuracy >= options.minAccuracy;
        html += '<div class="ss-notice" style="margin-bottom:14px;">';
        html += '<h3 class="ss-bn" style="margin:0 0 6px;">' + (passed ? 'অভিনন্দন! অনুশীলন সম্পন্ন হয়েছে' : 'অনুশীলন শেষ — আরও নির্ভুলতা প্রয়োজন') + '</h3>';
        html += '<p class="ss-bn" style="margin:0;">WPM: <strong>' + stats.wpm + '</strong> · CPM: <strong>' + stats.cpm + '</strong> · নির্ভুলতা: <strong>' + stats.accuracy + '%</strong> · ভুল স্ট্রোক: <strong>' + runtime.errors + '</strong></p>';
        html += '</div>';
      }

      html += '<div class="ss-target-box" id="ssTargetBox">' + renderTargetCharsHtml() + '</div>';
      html += '<textarea aria-label="Bangla typing input box" class="ss-input-area" id="ssTypingInput" placeholder="' + (appState.inputMode === 'virtual' ? 'সরাসরি ইংরেজি কিবোর্ডে টাইপ করুন (Virtual Bijoy সক্রিয়)...' : 'আপনার সিস্টেমের Bijoy IME চালু করে এখানে টাইপ করুন...') + '" rows="3"' + (runtime.finished ? ' disabled="disabled"' : '') + '>' + escapeHtml(runtime.typedText) + '</textarea>';

      html += '<div style="display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:12px;flex-wrap:wrap;">';
      html += '<div style="display:flex;gap:8px;flex-wrap:wrap;">';
      html += '<button type="button" class="ss-btn" id="ssRestartBtn">পুনরায় শুরু (Restart)</button>';
      if (options.onNextLabel) {
        html += '<button type="button" class="ss-btn ss-btn-primary" id="ssNextBtn">' + escapeHtml(options.onNextLabel) + '</button>';
      }
      html += '</div>';
      html += '<span class="ss-bn" style="font-size:12px;color:var(--ss-text-muted);">ভুল হলে Backspace চাপুন</span>';
      html += '</div>';

      html += '<div id="ssKbdHost">' + renderKeyboardHtml(true) + '</div>';
      html += '</div>';
      return html;
    }

    function updateLiveTypingDom(isCountdown, minAccuracy, lessonIdToComplete) {
      var targetBox = document.getElementById('ssTargetBox');
      var wpmEl = document.getElementById('ssStatWpm');
      var cpmEl = document.getElementById('ssStatCpm');
      var accEl = document.getElementById('ssStatAcc');
      var progEl = document.getElementById('ssStatProg');
      var barEl = document.getElementById('ssProgBar');
      var kbdHost = document.getElementById('ssKbdHost');

      var stats = calcStats();
      var pct = runtime.targetText.length ? Math.min(100, Math.round((runtime.typedText.length / runtime.targetText.length) * 100)) : 0;
      if (targetBox) targetBox.innerHTML = renderTargetCharsHtml();
      if (wpmEl) wpmEl.textContent = String(stats.wpm);
      if (cpmEl) cpmEl.textContent = String(stats.cpm);
      if (accEl) accEl.textContent = stats.accuracy + '%';
      if (progEl) progEl.textContent = pct + '% সম্পন্ন';
      if (barEl) barEl.style.width = pct + '%';
      if (kbdHost) kbdHost.innerHTML = renderKeyboardHtml(true);

      if (!runtime.finished && runtime.typedText.length >= runtime.targetText.length && runtime.targetText.length > 0) {
        completeActiveSession(stats, minAccuracy, lessonIdToComplete);
      }
    }

    function completeActiveSession(stats, minAccuracy, lessonIdToComplete) {
      runtime.finished = true;
      if (runtime.timerId) {
        clearInterval(runtime.timerId);
        runtime.timerId = null;
      }
      if (lessonIdToComplete && stats.accuracy >= (minAccuracy || 80)) {
        if (appState.completedLessons.indexOf(lessonIdToComplete) === -1) {
          appState.completedLessons.push(lessonIdToComplete);
        }
        var prev = appState.bestScores[lessonIdToComplete];
        if (!prev || stats.wpm > prev.wpm) {
          appState.bestScores[lessonIdToComplete] = { wpm: stats.wpm, accuracy: stats.accuracy };
        }
      }
      recordSession(appState.route === 'speedtest' ? 'Speed Test' : (lessonIdToComplete ? 'Lesson ' + lessonIdToComplete : 'Practice'), stats.wpm, stats.cpm, stats.accuracy);
      render();
    }

    function startTypingTimer(isCountdown, minAccuracy, lessonIdToComplete) {
      if (runtime.startTime || runtime.finished) return;
      runtime.startTime = Date.now();
      runtime.timerId = setInterval(function () {
        runtime.elapsedSec = Math.floor((Date.now() - runtime.startTime) / 1000);
        var timeEl = document.getElementById('ssStatTime');
        var disp = isCountdown ? Math.max(0, runtime.testDurationSec - runtime.elapsedSec) : runtime.elapsedSec;
        var m = Math.floor(disp / 60);
        var s = disp % 60;
        if (timeEl) timeEl.textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;

        var st = calcStats();
        var wpmEl = document.getElementById('ssStatWpm');
        var cpmEl = document.getElementById('ssStatCpm');
        if (wpmEl) wpmEl.textContent = String(st.wpm);
        if (cpmEl) cpmEl.textContent = String(st.cpm);

        if (isCountdown && runtime.elapsedSec >= runtime.testDurationSec) {
          completeActiveSession(st, minAccuracy, lessonIdToComplete);
        }
      }, 400);
    }

    function bindTypingEvents(opts) {
      var input = document.getElementById('ssTypingInput');
      if (input) {
        input.addEventListener('keydown', function (e) {
          if (runtime.finished) return;
          if (e.code) {
            var keyBtn = document.querySelector('.ss-key[data-keycode="' + e.code + '"]');
            if (keyBtn) {
              keyBtn.classList.add('is-pressed');
              setTimeout(function () { keyBtn.classList.remove('is-pressed'); }, 140);
            }
          }

          if (appState.inputMode !== 'virtual') return;
          if (e.ctrlKey || e.metaKey || e.altKey) return;

          if (e.key === 'Backspace') {
            e.preventDefault();
            if (runtime.virtualState.pendingPreKar || runtime.virtualState.pendingHasanta || runtime.virtualState.pendingReph) {
              runtime.virtualState.pendingPreKar = null;
              runtime.virtualState.pendingHasanta = false;
              runtime.virtualState.pendingReph = false;
            } else if (runtime.typedText.length > 0) {
              runtime.typedText = runtime.typedText.slice(0, -1);
              runtime.virtualState.text = runtime.typedText;
            }
            input.value = runtime.typedText;
            updateLiveTypingDom(opts.isCountdown, opts.minAccuracy, opts.lessonId);
            return;
          }

          if (e.key.length === 1) {
            e.preventDefault();
            startTypingTimer(opts.isCountdown, opts.minAccuracy, opts.lessonId);
            var prevLen = runtime.typedText.length;
            runtime.virtualState = applyVirtualKeystroke(e.key, runtime.virtualState);
            runtime.typedText = runtime.virtualState.text;
            runtime.keystrokes++;
            if (runtime.typedText.length > prevLen) {
              var idx = runtime.typedText.length - 1;
              if (runtime.typedText[idx] !== runtime.targetText[idx]) runtime.errors++;
            }
            input.value = runtime.typedText;
            updateLiveTypingDom(opts.isCountdown, opts.minAccuracy, opts.lessonId);
          }
        });

        input.addEventListener('input', function () {
          if (appState.inputMode !== 'ime' || runtime.finished) return;
          startTypingTimer(opts.isCountdown, opts.minAccuracy, opts.lessonId);
          var val = input.value;
          if (val.length > runtime.typedText.length) {
            var pos = val.length - 1;
            if (val[pos] !== runtime.targetText[pos]) runtime.errors++;
          }
          runtime.typedText = val;
          updateLiveTypingDom(opts.isCountdown, opts.minAccuracy, opts.lessonId);
        });
      }

      var kbdHost = document.getElementById('ssKbdHost');
      if (kbdHost) {
        kbdHost.addEventListener('click', function (e) {
          var btn = e.target.closest('.ss-key');
          if (!btn || runtime.finished) return;
          var code = btn.getAttribute('data-keycode');
          if (code === 'ShiftLeft' || code === 'ShiftRight') {
            runtime.keyboardShiftPreview = !runtime.keyboardShiftPreview;
            kbdHost.innerHTML = renderKeyboardHtml(true);
            return;
          }
          if (code === 'Backspace') {
            runtime.typedText = runtime.typedText.slice(0, -1);
            runtime.virtualState.text = runtime.typedText;
            if (input) input.value = runtime.typedText;
            updateLiveTypingDom(opts.isCountdown, opts.minAccuracy, opts.lessonId);
            return;
          }
          var enChar = code === 'Space' ? ' ' : (runtime.keyboardShiftPreview ? btn.getAttribute('data-enshift') : btn.getAttribute('data-en'));
          if (enChar && enChar.length === 1) {
            startTypingTimer(opts.isCountdown, opts.minAccuracy, opts.lessonId);
            runtime.virtualState = applyVirtualKeystroke(enChar, runtime.virtualState);
            runtime.typedText = runtime.virtualState.text;
            if (input) input.value = runtime.typedText;
            updateLiveTypingDom(opts.isCountdown, opts.minAccuracy, opts.lessonId);
          }
        });
      }

      var restartBtn = document.getElementById('ssRestartBtn');
      if (restartBtn) {
        restartBtn.addEventListener('click', function () {
          resetTypingSession(runtime.targetText);
          render();
        });
      }

      var nextBtn = document.getElementById('ssNextBtn');
      if (nextBtn && opts.onNext) {
        nextBtn.addEventListener('click', opts.onNext);
      }
    }

    function renderHome() {
      var doneCount = appState.completedLessons.length;
      var totalCount = SS_DATA.lessons.length;
      var pct = Math.round((doneCount / totalCount) * 100);
      var bestWpm = 0;
      for (var k in appState.bestScores) {
        if (appState.bestScores[k].wpm > bestWpm) bestWpm = appState.bestScores[k].wpm;
      }

      var html = '';
      html += '<section class="ss-hero">';
      html += '<h1 class="ss-bn">শিখনশালা (Shikhon Shala) — বাংলা টাইপিং শিখুন, দক্ষতা বাড়ান।</h1>';
      html += '<p class="ss-bn">শুরু থেকে দক্ষতা পর্যন্ত সম্পূর্ণ বিনামূল্যে বিজয় ইউনিকোড এবং বিজয় ক্লাসিক (ANSI) বাংলা টাইপিং শেখার পূর্ণাঙ্গ মাধ্যম।</p>';
      html += '<div style="display:flex;gap:10px;flex-wrap:wrap;">';
      html += '<button type="button" class="ss-btn ss-btn-primary" data-go="lessons">শেখা শুরু করুন (১২টি লেসন)</button>';
      html += '<button type="button" class="ss-btn" style="background:rgba(255,255,255,0.12);color:#fff;border-color:rgba(255,255,255,0.22);" data-go="speedtest">স্পিড টেস্ট দিন</button>';
      html += '<button type="button" class="ss-btn" style="background:rgba(255,255,255,0.12);color:#fff;border-color:rgba(255,255,255,0.22);" data-go="keyboard">বিজয় কিবোর্ড লেআউট</button>';
      html += '</div></section>';

      html += '<div class="ss-grid ss-grid-4" style="margin-bottom:20px;">';
      html += '<div class="ss-card"><div class="ss-stat-lbl">সম্পন্ন লেসন</div><div class="ss-stat-val ss-mono">' + doneCount + ' / ' + totalCount + '</div></div>';
      html += '<div class="ss-card"><div class="ss-stat-lbl">মোট অগ্রগতি</div><div class="ss-stat-val ss-mono">' + pct + '%</div></div>';
      html += '<div class="ss-card"><div class="ss-stat-lbl">সর্বোচ্চ গতি</div><div class="ss-stat-val ss-mono">' + bestWpm + ' WPM</div></div>';
      html += '<div class="ss-card"><div class="ss-stat-lbl">সক্রিয় মোড</div><div class="ss-stat-val" style="font-size:18px;margin-top:8px;">' + (appState.mode === 'ansi' ? 'Bijoy Classic ANSI' : 'Bijoy Unicode') + '</div></div>';
      html += '</div>';

      html += '<div class="ss-grid ss-grid-2">';
      html += '<div class="ss-card"><h2 class="ss-bn" style="margin-top:0;">দ্রুত শুরু ও কারিকুলাম</h2><p class="ss-bn" style="color:var(--ss-text-muted);">হোম রো পরিচিতি থেকে শুরু করে স্বরবর্ণ, ব্যঞ্জনবর্ণ, কার, ফলা, যুক্তবর্ণ ও চূড়ান্ত পরীক্ষা পর্যন্ত ১২টি ধাপে সাজানো পাঠ্যক্রম।</p>';
      html += '<div class="ss-progress-track" style="margin:12px 0;"><div class="ss-progress-fill" style="width:' + pct + '%;"></div></div>';
      html += '<button type="button" class="ss-btn ss-btn-primary" data-go="lessons">পরবর্তী লেসনে যান</button></div>';

      html += '<div class="ss-card"><h2 class="ss-bn" style="margin-top:0;">টাইপিং গেমস ও চ্যালেঞ্জ</h2><p class="ss-bn" style="color:var(--ss-text-muted);">শব্দ চ্যালেঞ্জ, বাক্য চ্যালেঞ্জ এবং নির্ধারিত সময়ের গেম খেলে আনন্দের সাথে বাংলা টাইপিং গতি বাড়ান।</p>';
      html += '<button type="button" class="ss-btn" data-go="games">গেমস খেলুন</button></div>';
      html += '</div>';
      return html;
    }

    function renderStartLearning() {
      var html = '<div class="ss-card" style="margin-bottom:18px;">';
      html += '<h1 class="ss-bn" style="margin-top:0;">বিজয় বাংলা টাইপিং শেখা শুরু করুন</h1>';
      html += '<p class="ss-bn" style="color:var(--ss-text-muted);">নতুন শিক্ষার্থীদের জন্য সঠিক বসার ভঙ্গি, আঙুল রাখার নিয়ম এবং ইউনিকোড ও ক্লাসিক ANSI-এর পার্থক্য।</p>';
      html += '<div class="ss-grid ss-grid-3" style="margin-top:16px;">';
      html += '<div class="ss-card"><h3 class="ss-bn" style="margin-top:0;">১. হোম রো অবস্থান</h3><p class="ss-bn" style="font-size:14px;color:var(--ss-text-muted);">বাম হাতের চার আঙুল A S D F এবং ডান হাতের চার আঙুল J K L ; কীতে রাখুন।</p></div>';
      html += '<div class="ss-card"><h3 class="ss-bn" style="margin-top:0;">২. যুক্তবর্ণ ও স্বরবর্ণের G কী</h3><p class="ss-bn" style="font-size:14px;color:var(--ss-text-muted);">বিজয় লেআউটে G কী হসন্ত (্) হিসেবে কাজ করে। আ = G+F, ই = G+D, এবং ক্ষ = J+G+Shift+N।</p></div>';
      html += '<div class="ss-card"><h3 class="ss-bn" style="margin-top:0;">৩. কার চিহ্নের ক্রম</h3><p class="ss-bn" style="font-size:14px;color:var(--ss-text-muted);">ক্লাসিক ANSI-তে ই-কার (D), এ-কার (C), ঐ-কার (Shift+C) সবসময় ব্যঞ্জনের আগে চাপতে হয়।</p></div>';
      html += '</div>';
      html += '<div style="margin-top:18px;"><button type="button" class="ss-btn ss-btn-primary" data-go="lessons">লেসন ০১ থেকে শুরু করুন</button></div>';
      html += '</div>';
      return html;
    }

    function renderKeyboardReference() {
      var sel = runtime.selectedKeyCode ? KEY_BY_CODE[runtime.selectedKeyCode] : null;
      var html = '<div class="ss-card" style="margin-bottom:18px;">';
      html += '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">';
      html += '<div><h1 class="ss-bn" style="margin:0 0 4px;">বিজয় কিবোর্ড লেআউট ও রেফারেন্স</h1><p class="ss-bn" style="margin:0;color:var(--ss-text-muted);">যেকোনো কীতে ক্লিক করে তার স্বাভাবিক ও Shift অবস্থানের বাংলা বর্ণ দেখুন।</p></div>';
      html += '<button type="button" class="ss-btn" id="ssToggleShiftRef">' + (runtime.keyboardShiftPreview ? 'Shift লেয়ার সক্রিয় (স্বাভাবিক দেখুন)' : 'Shift লেয়ার দেখুন') + '</button>';
      html += '</div>';
      html += renderKeyboardHtml(false);
      if (sel) {
        html += '<div class="ss-notice" style="margin-top:14px;">';
        html += '<strong class="ss-mono">' + escapeHtml(sel.en.toUpperCase()) + '</strong> (' + escapeHtml(sel.finger) + ' আঙুল) — স্বাভাবিক: <strong class="ss-bn">' + escapeHtml(sel.bnName) + '</strong> · Shift: <strong class="ss-bn">' + escapeHtml(sel.bnShiftName) + '</strong>';
        if (sel.note) html += '<div class="ss-bn" style="margin-top:4px;">নোট: ' + escapeHtml(sel.note) + '</div>';
        html += '</div>';
      }
      html += '</div>';

      html += '<div class="ss-grid ss-grid-2">';
      html += '<div class="ss-card"><h2 class="ss-bn" style="margin-top:0;">Bijoy Classic (ANSI) বনাম Bijoy Unicode</h2>';
      html += '<div class="ss-table-wrap"><table class="ss-table"><thead><tr><th>বিষয়</th><th>Classic ANSI</th><th>Bijoy Unicode</th></tr></thead><tbody>';
      for (var i = 0; i < SS_DATA.modeDifferences.length; i++) {
        var d = SS_DATA.modeDifferences[i];
        html += '<tr><td class="ss-bn"><strong>' + escapeHtml(d.aspect) + '</strong></td><td class="ss-bn">' + escapeHtml(d.ansi) + '</td><td class="ss-bn">' + escapeHtml(d.unicode) + '</td></tr>';
      }
      html += '</tbody></table></div></div>';

      html += '<div class="ss-card"><h2 class="ss-bn" style="margin-top:0;">গুরুত্বপূর্ণ যুক্তবর্ণ তালিকা</h2>';
      html += '<div class="ss-table-wrap"><table class="ss-table"><thead><tr><th>যুক্তবর্ণ</th><th>গঠন</th><th>বিজয় কী</th><th>উদাহরণ</th></tr></thead><tbody>';
      for (var j = 0; j < SS_DATA.conjunctGuide.length; j++) {
        var cj = SS_DATA.conjunctGuide[j];
        html += '<tr><td class="ss-bn" style="font-size:18px;font-weight:700;">' + escapeHtml(cj.conjunct) + '</td><td class="ss-bn">' + escapeHtml(cj.parts) + '</td><td class="ss-mono">' + escapeHtml(cj.keys) + '</td><td class="ss-bn">' + escapeHtml(cj.example) + '</td></tr>';
      }
      html += '</tbody></table></div></div>';
      html += '</div>';
      return html;
    }

    function renderLessons() {
      var lesson = SS_DATA.lessons[appState.activeLessonId - 1] || SS_DATA.lessons[0];
      var html = '<div class="ss-card" style="margin-bottom:16px;">';
      html += '<div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:6px;">';
      for (var i = 0; i < SS_DATA.lessons.length; i++) {
        var l = SS_DATA.lessons[i];
        var isDone = appState.completedLessons.indexOf(l.id) !== -1;
        var isCur = l.id === lesson.id;
        html += '<button type="button" class="ss-btn ' + (isCur ? 'ss-btn-primary' : '') + '" data-lesson="' + l.id + '">';
        html += 'লেসন ' + l.code + (isDone ? ' ✓' : '');
        html += '</button>';
      }
      html += '</div>';
      html += '<div style="margin-top:14px;">';
      html += '<div style="font-size:12px;color:var(--ss-text-muted);font-weight:600;">Lesson ' + lesson.code + ' · ' + escapeHtml(lesson.category) + ' · Target ' + lesson.targetAccuracy + '% / ' + lesson.targetWpm + ' WPM</div>';
      html += '<h1 class="ss-bn" style="margin:4px 0 6px;">' + escapeHtml(lesson.titleBn) + '</h1>';
      html += '<p class="ss-bn" style="margin:0 0 10px;color:var(--ss-text-muted);">' + escapeHtml(lesson.goalBn) + '</p>';
      html += '<div class="ss-notice ss-bn">' + escapeHtml(appState.mode === 'ansi' ? lesson.ansiTip : lesson.unicodeTip) + '</div>';
      if (lesson.drills.length > 1) {
        html += '<div style="display:flex;gap:8px;margin-top:12px;">';
        for (var d = 0; d < lesson.drills.length; d++) {
          html += '<button type="button" class="ss-btn ' + (appState.activeDrillIdx === d ? 'ss-btn-primary' : '') + '" data-drill="' + d + '">অনুশীলন ' + (d + 1) + '</button>';
        }
        html += '</div>';
      }
      html += '</div></div>';

      html += renderTypingStudio({
        isCountdown: false,
        minAccuracy: lesson.targetAccuracy,
        onNextLabel: lesson.id < SS_DATA.lessons.length ? 'পরবর্তী লেসন →' : 'অগ্রগতি দেখুন'
      });
      return html;
    }

    function renderPractice() {
      var cat = SS_DATA.practiceCategories[runtime.practiceCatIdx] || SS_DATA.practiceCategories[0];
      var html = '<div class="ss-card" style="margin-bottom:16px;">';
      html += '<h1 class="ss-bn" style="margin-top:0;">স্বাধীন টাইপিং অনুশীলন (Typing Practice)</h1>';
      html += '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;">';
      for (var i = 0; i < SS_DATA.practiceCategories.length; i++) {
        var c = SS_DATA.practiceCategories[i];
        html += '<button type="button" class="ss-btn ' + (runtime.practiceCatIdx === i ? 'ss-btn-primary' : '') + '" data-pcat="' + i + '">' + escapeHtml(c.labelBn) + '</button>';
      }
      html += '</div>';
      html += '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;">';
      for (var j = 0; j < cat.texts.length; j++) {
        html += '<button type="button" class="ss-btn ' + (runtime.practiceTextIdx === j && !runtime.customPracticeText ? 'ss-btn-primary' : '') + '" data-ptext="' + j + '">সেট ' + (j + 1) + '</button>';
      }
      html += '</div>';
      html += '<div style="display:flex;gap:8px;flex-wrap:wrap;">';
      html += '<input id="ssCustomInput" class="ss-input-area" style="margin:0;flex:1;min-width:220px;font-size:15px;padding:9px 12px;" placeholder="অথবা আপনার নিজের বাংলা অনুশীলন লেখা এখানে লিখুন..." value="' + escapeHtml(runtime.customPracticeText) + '"/>';
      html += '<button type="button" class="ss-btn" id="ssLoadCustomBtn">লোড করুন</button>';
      html += '</div></div>';

      html += renderTypingStudio({ isCountdown: false, minAccuracy: 80, onNextLabel: 'নতুন সেট' });
      return html;
    }

    function renderSpeedTest() {
      var html = '<div class="ss-card" style="margin-bottom:16px;">';
      html += '<h1 class="ss-bn" style="margin-top:0;">বিজয় টাইপিং স্পিড টেস্ট (Speed Test)</h1>';
      html += '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">';
      html += '<div style="display:flex;gap:8px;flex-wrap:wrap;">';
      var durations = [60, 180, 300];
      for (var i = 0; i < durations.length; i++) {
        var sec = durations[i];
        html += '<button type="button" class="ss-btn ' + (runtime.testDurationSec === sec ? 'ss-btn-primary' : '') + '" data-dur="' + sec + '">' + (sec / 60) + ' মিনিট</button>';
      }
      html += '</div>';
      html += '<div style="display:flex;gap:8px;flex-wrap:wrap;">';
      for (var p = 0; p < SS_DATA.speedTestPassages.length; p++) {
        var ps = SS_DATA.speedTestPassages[p];
        html += '<button type="button" class="ss-btn ' + (runtime.testPassageIdx === p ? 'ss-btn-primary' : '') + '" data-passage="' + p + '">' + escapeHtml(ps.titleBn) + '</button>';
      }
      html += '</div></div></div>';

      html += renderTypingStudio({ isCountdown: true, minAccuracy: 85, onNextLabel: 'অন্য অনুচ্ছেদ' });
      return html;
    }

    function renderGames() {
      var html = '<div class="ss-card" style="margin-bottom:16px;">';
      html += '<h1 class="ss-bn" style="margin-top:0;">টাইপিং গেমস (Typing Games)</h1>';
      html += '<p class="ss-bn" style="color:var(--ss-text-muted);">নির্দেশনা: স্ক্রিনে প্রদর্শিত বাংলা শব্দ বা বাক্যটি সঠিকভাবে টাইপ করে Enter (অথবা স্বয়ংক্রিয়ভাবে ম্যাচ হলে) পয়েন্ট অর্জন করুন।</p>';
      html += '<div style="display:flex;gap:8px;flex-wrap:wrap;">';
      html += '<button type="button" class="ss-btn ' + (runtime.gameType === 'word' ? 'ss-btn-primary' : '') + '" data-gtype="word">শব্দ চ্যালেঞ্জ (Word)</button>';
      html += '<button type="button" class="ss-btn ' + (runtime.gameType === 'sentence' ? 'ss-btn-primary' : '') + '" data-gtype="sentence">বাক্য চ্যালেঞ্জ (Sentence)</button>';
      html += '<button type="button" class="ss-btn ' + (runtime.gameType === 'timed' ? 'ss-btn-primary' : '') + '" data-gtype="timed">টাইমড চ্যালেঞ্জ (60s Blitz)</button>';
      html += '</div></div>';

      var gAcc = runtime.gameTotal > 0 ? Math.round((runtime.gameCorrect / runtime.gameTotal) * 100) : 100;
      html += '<div class="ss-grid ss-grid-4" style="margin-bottom:16px;">';
      html += '<div class="ss-card"><div class="ss-stat-lbl">স্কোর</div><div class="ss-stat-val ss-mono" id="ssGameScore">' + runtime.gameScore + '</div></div>';
      html += '<div class="ss-card"><div class="ss-stat-lbl">ধারাবাহিকতা (Streak)</div><div class="ss-stat-val ss-mono" id="ssGameStreak">' + runtime.gameStreak + '</div></div>';
      html += '<div class="ss-card"><div class="ss-stat-lbl">নির্ভুলতা</div><div class="ss-stat-val ss-mono" id="ssGameAcc">' + gAcc + '%</div></div>';
      html += '<div class="ss-card"><div class="ss-stat-lbl">বাকি সময়</div><div class="ss-stat-val ss-mono" id="ssGameTime">' + runtime.gameTimeLeft + 's</div></div>';
      html += '</div>';

      html += '<div class="ss-card">';
      if (!runtime.gameActive) {
        html += '<div style="text-align:center;padding:24px 12px;">';
        if (runtime.gameMessage) html += '<div class="ss-notice ss-bn" style="margin-bottom:14px;">' + escapeHtml(runtime.gameMessage) + '</div>';
        html += '<p class="ss-bn">শুরু করতে নিচের বোতামে ক্লিক করুন।</p>';
        html += '<button type="button" class="ss-btn ss-btn-primary" id="ssGameStartBtn">গেম শুরু করুন</button>';
        html += '</div>';
      } else {
        html += '<div style="text-align:center;padding:12px;">';
        html += '<div class="ss-stat-lbl">এই লেখাটি টাইপ করুন</div>';
        html += '<div class="ss-bn" id="ssGamePrompt" style="font-size:32px;font-weight:700;margin:12px 0;color:var(--ss-emerald);">' + escapeHtml(runtime.gamePrompt) + '</div>';
        html += '<input id="ssGameInput" class="ss-input-area" style="max-width:520px;margin:0 auto;text-align:center;" autocomplete="off" placeholder="এখানে টাইপ করুন..." value="' + escapeHtml(runtime.gameInput) + '"/>';
        html += '<div style="margin-top:12px;"><button type="button" class="ss-btn" id="ssGameStopBtn">গেম থামান</button></div>';
        html += '</div>';
      }
      html += '</div>';
      return html;
    }

    function renderProgress() {
      var done = appState.completedLessons.length;
      var total = SS_DATA.lessons.length;
      var pct = Math.round((done / total) * 100);
      var html = '<div class="ss-card" style="margin-bottom:16px;">';
      html += '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">';
      html += '<div><h1 class="ss-bn" style="margin:0 0 4px;">অগ্রগতি রিপোর্ট (Progress Report)</h1>';
      html += '<p class="ss-bn" style="margin:0;color:var(--ss-text-muted);">আপনার সমস্ত স্কোর ও সম্পন্ন লেসনের তথ্য কেবল এই ব্রাউজার ও ডিভাইসে (LocalStorage) সংরক্ষিত থাকে। কোনো ক্লাউড অ্যাকাউন্ট বা সার্ভার লিডারবোর্ড নেই।</p></div>';
      html += '<button type="button" class="ss-btn ss-btn-danger" id="ssResetProgressBtn">অগ্রগতি রিসেট করুন</button>';
      html += '</div>';
      html += '<div style="margin-top:14px;"><div class="ss-mono" style="margin-bottom:6px;">' + done + ' / ' + total + ' লেসন সম্পন্ন (' + pct + '%)</div><div class="ss-progress-track"><div class="ss-progress-fill" style="width:' + pct + '%;"></div></div></div>';
      html += '</div>';

      html += '<div class="ss-card" style="margin-bottom:16px;"><h2 class="ss-bn" style="margin-top:0;">লেসনভিত্তিক সেরা স্কোর</h2>';
      html += '<div class="ss-table-wrap"><table class="ss-table"><thead><tr><th>লেসন</th><th>অবস্থা</th><th>সেরা WPM</th><th>নির্ভুলতা</th></tr></thead><tbody>';
      for (var i = 0; i < SS_DATA.lessons.length; i++) {
        var l = SS_DATA.lessons[i];
        var isDone = appState.completedLessons.indexOf(l.id) !== -1;
        var bs = appState.bestScores[l.id];
        html += '<tr><td class="ss-bn">' + l.code + '. ' + escapeHtml(l.titleBn) + '</td><td class="ss-bn">' + (isDone ? 'সম্পন্ন ✓' : 'বাকি') + '</td><td class="ss-mono">' + (bs ? bs.wpm : '—') + '</td><td class="ss-mono">' + (bs ? bs.accuracy + '%' : '—') + '</td></tr>';
      }
      html += '</tbody></table></div></div>';

      html += '<div class="ss-card"><h2 class="ss-bn" style="margin-top:0;">সাম্প্রতিক অনুশীলনের ইতিহাস</h2>';
      if (!appState.history.length) {
        html += '<p class="ss-bn" style="color:var(--ss-text-muted);">এখনো কোনো অনুশীলনের রেকর্ড সংরক্ষিত হয়নি।</p>';
      } else {
        html += '<div class="ss-table-wrap"><table class="ss-table"><thead><tr><th>তারিখ</th><th>কার্যক্রম</th><th>মোড</th><th>WPM</th><th>CPM</th><th>নির্ভুলতা</th></tr></thead><tbody>';
        for (var h = 0; h < appState.history.length; h++) {
          var item = appState.history[h];
          html += '<tr><td class="ss-bn">' + escapeHtml(item.date) + '</td><td>' + escapeHtml(item.label) + '</td><td>' + escapeHtml(item.mode) + '</td><td class="ss-mono">' + item.wpm + '</td><td class="ss-mono">' + item.cpm + '</td><td class="ss-mono">' + item.accuracy + '%</td></tr>';
        }
        html += '</tbody></table></div>';
      }
      html += '</div>';
      return html;
    }

    function renderAbout() {
      return '<div class="ss-card">'
        + '<h1 class="ss-bn" style="margin-top:0;">শিখনশালা (Shikhon Shala) সম্পর্কে</h1>'
        + '<p class="ss-bn">শিখনশালা একটি সম্পূর্ণ বিনামূল্যের বাংলা বিজয় টাইপিং শেখার প্ল্যাটফর্ম। কোনো সাইনআপ, ফি বা বিজ্ঞাপনের ঝামেলা ছাড়াই নতুন ও অভিজ্ঞ শিক্ষার্থীরা এখানে বিজয় ইউনিকোড এবং বিজয় ক্লাসিক (ANSI) পদ্ধতিতে বাংলা টাইপিং শিখতে পারেন।</p>'
        + '<h3 class="ss-bn">সীমাবদ্ধতা ও স্বচ্ছতা</h3>'
        + '<ul class="ss-bn">'
        + '<li>সমস্ত অগ্রগতি ও স্কোর কেবল আপনার বর্তমান ব্রাউজারের LocalStorage-এ সংরক্ষিত হয়; ডিভাইস বা ব্রাউজার পরিবর্তন করলে তথ্য স্থানান্তর হয় না।</li>'
        + '<li>ওয়েব ব্রাউজারে SutonnyMJ-এর মতো প্রোপ্রাইটারি ANSI ফন্ট ইনস্টল না থাকায় Bijoy Classic (ANSI) মোডেও স্ক্রিনে ইউনিকোড বাংলা দেখানো হয়, তবে টাইপিং অর্ডার ও কী-স্ট্রোক নিয়ম খাঁটি ক্লাসিক ANSI অনুসরণ করে।</li>'
        + '</ul>'
        + '</div>';
    }

    function renderContact() {
      return '<div class="ss-card">'
        + '<h1 class="ss-bn" style="margin-top:0;">যোগাযোগ ও মতামত (Contact)</h1>'
        + '<p class="ss-bn" style="color:var(--ss-text-muted);">আপনার কোনো পরামর্শ, লেসন সংশোধন বা প্রশ্ন থাকলে নিচের ফর্মে বার্তা প্রস্তুত করুন (আপনার ডিভাইসের ইমেইল ক্লায়েন্টের মাধ্যমে পাঠানো হবে অথবা স্থানীয়ভাবে সংরক্ষিত বার্তা প্রদর্শিত হবে)।</p>'
        + '<form id="ssContactForm" style="display:flex;flex-direction:column;gap:12px;max-width:560px;">'
        + '<input required class="ss-input-area" style="margin:0;font-size:15px;padding:10px 12px;" id="ssContactName" placeholder="আপনার নাম"/>'
        + '<input required type="email" class="ss-input-area" style="margin:0;font-size:15px;padding:10px 12px;" id="ssContactEmail" placeholder="ইমেইল ঠিকানা"/>'
        + '<textarea required rows="4" class="ss-input-area" style="margin:0;font-size:15px;padding:10px 12px;" id="ssContactMsg" placeholder="আপনার বার্তা লিখুন..."></textarea>'
        + '<div><button type="submit" class="ss-btn ss-btn-primary">বার্তা জমা দিন</button></div>'
        + '<div id="ssContactStatus" class="ss-bn"></div>'
        + '</form></div>';
    }

    function pickGamePrompt() {
      var pool = runtime.gameType === 'sentence' ? SS_DATA.gameSentences : SS_DATA.gameWords;
      return pool[Math.floor(Math.random() * pool.length)];
    }

    function startGame() {
      stopTimers();
      runtime.gameActive = true;
      runtime.gameScore = 0;
      runtime.gameStreak = 0;
      runtime.gameCorrect = 0;
      runtime.gameTotal = 0;
      runtime.gameTimeLeft = runtime.gameType === 'timed' ? 60 : 90;
      runtime.gamePrompt = pickGamePrompt();
      runtime.gameInput = '';
      runtime.gameMessage = '';
      runtime.virtualState = { text: '', pendingPreKar: null, pendingHasanta: false, pendingReph: false, lastAutoPreKar: null };
      runtime.gameTimerId = setInterval(function () {
        runtime.gameTimeLeft--;
        var tEl = document.getElementById('ssGameTime');
        if (tEl) tEl.textContent = runtime.gameTimeLeft + 's';
        if (runtime.gameTimeLeft <= 0) {
          stopTimers();
          runtime.gameActive = false;
          var acc = runtime.gameTotal > 0 ? Math.round((runtime.gameCorrect / runtime.gameTotal) * 100) : 100;
          runtime.gameMessage = 'সময় শেষ! আপনার চূড়ান্ত স্কোর: ' + runtime.gameScore + ' (নির্ভুলতা: ' + acc + '%)';
          recordSession('Game (' + runtime.gameType + ')', runtime.gameScore, runtime.gameCorrect, acc);
          render();
        }
      }, 1000);
      render();
      var gInp = document.getElementById('ssGameInput');
      if (gInp) gInp.focus();
    }

    function render() {
      var container = document.getElementById('ssViewContainer');
      if (!container) return;

      var navBtns = document.querySelectorAll('#ssNavList .ss-nav-btn');
      for (var i = 0; i < navBtns.length; i++) {
        var r = navBtns[i].getAttribute('data-route');
        if (r === appState.route) navBtns[i].classList.add('is-active');
        else navBtns[i].classList.remove('is-active');
      }

      var modeBtns = document.querySelectorAll('.ss-seg-btn[data-mode]');
      for (var m = 0; m < modeBtns.length; m++) {
        if (modeBtns[m].getAttribute('data-mode') === appState.mode) modeBtns[m].classList.add('is-active');
        else modeBtns[m].classList.remove('is-active');
      }

      var inpBtns = document.querySelectorAll('.ss-seg-btn[data-input]');
      for (var n = 0; n < inpBtns.length; n++) {
        if (inpBtns[n].getAttribute('data-input') === appState.inputMode) inpBtns[n].classList.add('is-active');
        else inpBtns[n].classList.remove('is-active');
      }

      var html = '';
      if (appState.route === 'home') html = renderHome();
      else if (appState.route === 'start') html = renderStartLearning();
      else if (appState.route === 'keyboard') html = renderKeyboardReference();
      else if (appState.route === 'lessons') html = renderLessons();
      else if (appState.route === 'practice') html = renderPractice();
      else if (appState.route === 'speedtest') html = renderSpeedTest();
      else if (appState.route === 'games') html = renderGames();
      else if (appState.route === 'progress') html = renderProgress();
      else if (appState.route === 'about') html = renderAbout();
      else if (appState.route === 'contact') html = renderContact();
      else html = renderHome();

      container.innerHTML = html;
      bindViewHandlers();
    }

    function bindViewHandlers() {
      var goBtns = document.querySelectorAll('[data-go]');
      for (var i = 0; i < goBtns.length; i++) {
        goBtns[i].addEventListener('click', function () {
          navigate(this.getAttribute('data-go'));
        });
      }

      if (appState.route === 'keyboard') {
        var shBtn = document.getElementById('ssToggleShiftRef');
        if (shBtn) shBtn.addEventListener('click', function () {
          runtime.keyboardShiftPreview = !runtime.keyboardShiftPreview;
          render();
        });
        var keys = document.querySelectorAll('.ss-key');
        for (var k = 0; k < keys.length; k++) {
          keys[k].addEventListener('click', function () {
            runtime.selectedKeyCode = this.getAttribute('data-keycode');
            render();
          });
        }
      }

      if (appState.route === 'lessons') {
        var lBtns = document.querySelectorAll('[data-lesson]');
        for (var l = 0; l < lBtns.length; l++) {
          lBtns[l].addEventListener('click', function () {
            appState.activeLessonId = Number(this.getAttribute('data-lesson'));
            appState.activeDrillIdx = 0;
            saveState();
            var cur = SS_DATA.lessons[appState.activeLessonId - 1];
            resetTypingSession(cur.drills[0]);
            render();
          });
        }
        var dBtns = document.querySelectorAll('[data-drill]');
        for (var d = 0; d < dBtns.length; d++) {
          dBtns[d].addEventListener('click', function () {
            appState.activeDrillIdx = Number(this.getAttribute('data-drill'));
            saveState();
            var cur = SS_DATA.lessons[appState.activeLessonId - 1];
            resetTypingSession(cur.drills[appState.activeDrillIdx] || cur.drills[0]);
            render();
          });
        }
        var curLesson = SS_DATA.lessons[appState.activeLessonId - 1] || SS_DATA.lessons[0];
        bindTypingEvents({
          isCountdown: false,
          minAccuracy: curLesson.targetAccuracy,
          lessonId: curLesson.id,
          onNext: function () {
            if (curLesson.id < SS_DATA.lessons.length) {
              appState.activeLessonId = curLesson.id + 1;
              appState.activeDrillIdx = 0;
              saveState();
              resetTypingSession(SS_DATA.lessons[appState.activeLessonId - 1].drills[0]);
              render();
            } else {
              navigate('progress');
            }
          }
        });
      }

      if (appState.route === 'practice') {
        var pCats = document.querySelectorAll('[data-pcat]');
        for (var pc = 0; pc < pCats.length; pc++) {
          pCats[pc].addEventListener('click', function () {
            runtime.practiceCatIdx = Number(this.getAttribute('data-pcat'));
            runtime.practiceTextIdx = 0;
            runtime.customPracticeText = '';
            resetTypingSession(SS_DATA.practiceCategories[runtime.practiceCatIdx].texts[0]);
            render();
          });
        }
        var pTexts = document.querySelectorAll('[data-ptext]');
        for (var pt = 0; pt < pTexts.length; pt++) {
          pTexts[pt].addEventListener('click', function () {
            runtime.practiceTextIdx = Number(this.getAttribute('data-ptext'));
            runtime.customPracticeText = '';
            resetTypingSession(SS_DATA.practiceCategories[runtime.practiceCatIdx].texts[runtime.practiceTextIdx]);
            render();
          });
        }
        var loadBtn = document.getElementById('ssLoadCustomBtn');
        if (loadBtn) {
          loadBtn.addEventListener('click', function () {
            var ci = document.getElementById('ssCustomInput');
            var val = ci ? ci.value.trim() : '';
            if (val) {
              runtime.customPracticeText = val;
              resetTypingSession(val);
              render();
            }
          });
        }
        bindTypingEvents({
          isCountdown: false,
          minAccuracy: 80,
          onNext: function () {
            var cat = SS_DATA.practiceCategories[runtime.practiceCatIdx];
            runtime.practiceTextIdx = (runtime.practiceTextIdx + 1) % cat.texts.length;
            resetTypingSession(cat.texts[runtime.practiceTextIdx]);
            render();
          }
        });
      }

      if (appState.route === 'speedtest') {
        var durBtns = document.querySelectorAll('[data-dur]');
        for (var du = 0; du < durBtns.length; du++) {
          durBtns[du].addEventListener('click', function () {
            runtime.testDurationSec = Number(this.getAttribute('data-dur'));
            resetTypingSession(SS_DATA.speedTestPassages[runtime.testPassageIdx].text);
            render();
          });
        }
        var pasBtns = document.querySelectorAll('[data-passage]');
        for (var pa = 0; pa < pasBtns.length; pa++) {
          pasBtns[pa].addEventListener('click', function () {
            runtime.testPassageIdx = Number(this.getAttribute('data-passage'));
            resetTypingSession(SS_DATA.speedTestPassages[runtime.testPassageIdx].text);
            render();
          });
        }
        bindTypingEvents({
          isCountdown: true,
          minAccuracy: 85,
          onNext: function () {
            runtime.testPassageIdx = (runtime.testPassageIdx + 1) % SS_DATA.speedTestPassages.length;
            resetTypingSession(SS_DATA.speedTestPassages[runtime.testPassageIdx].text);
            render();
          }
        });
      }

      if (appState.route === 'games') {
        var gTypes = document.querySelectorAll('[data-gtype]');
        for (var gt = 0; gt < gTypes.length; gt++) {
          gTypes[gt].addEventListener('click', function () {
            stopTimers();
            runtime.gameActive = false;
            runtime.gameType = this.getAttribute('data-gtype');
            render();
          });
        }
        var startBtn = document.getElementById('ssGameStartBtn');
        if (startBtn) startBtn.addEventListener('click', startGame);
        var stopBtn = document.getElementById('ssGameStopBtn');
        if (stopBtn) stopBtn.addEventListener('click', function () {
          stopTimers();
          runtime.gameActive = false;
          render();
        });
        var gInp = document.getElementById('ssGameInput');
        if (gInp) {
          gInp.addEventListener('keydown', function (e) {
            if (appState.inputMode !== 'virtual') return;
            if (e.ctrlKey || e.metaKey || e.altKey) return;
            if (e.key === 'Backspace') {
              e.preventDefault();
              runtime.gameInput = runtime.gameInput.slice(0, -1);
              runtime.virtualState.text = runtime.gameInput;
              gInp.value = runtime.gameInput;
              return;
            }
            if (e.key.length === 1) {
              e.preventDefault();
              runtime.virtualState = applyVirtualKeystroke(e.key, runtime.virtualState);
              runtime.gameInput = runtime.virtualState.text;
              gInp.value = runtime.gameInput;
              checkGameMatch();
            }
          });
          gInp.addEventListener('input', function () {
            if (appState.inputMode !== 'ime') return;
            runtime.gameInput = gInp.value;
            checkGameMatch();
          });
        }
      }

      if (appState.route === 'progress') {
        var rst = document.getElementById('ssResetProgressBtn');
        if (rst) rst.addEventListener('click', function () {
          appState.completedLessons = [];
          appState.bestScores = {};
          appState.history = [];
          saveState();
          render();
        });
      }

      if (appState.route === 'contact') {
        var form = document.getElementById('ssContactForm');
        if (form) form.addEventListener('submit', function (e) {
          e.preventDefault();
          var st = document.getElementById('ssContactStatus');
          if (st) st.innerHTML = '<div class="ss-notice">ধন্যবাদ! আপনার বার্তা প্রস্তুত হয়েছে। অনুগ্রহ করে ব্লগের অফিশিয়াল যোগাযোগ ইমেইলের মাধ্যমে সরাসরি যুক্ত থাকুন।</div>';
          form.reset();
        });
      }
    }

    function checkGameMatch() {
      runtime.gameTotal++;
      if (runtime.gameInput === runtime.gamePrompt) {
        runtime.gameCorrect++;
        runtime.gameStreak++;
        runtime.gameScore += 10 + Math.min(20, runtime.gameStreak * 2);
        runtime.gamePrompt = pickGamePrompt();
        runtime.gameInput = '';
        runtime.virtualState = { text: '', pendingPreKar: null, pendingHasanta: false, pendingReph: false, lastAutoPreKar: null };
        var sc = document.getElementById('ssGameScore');
        var sk = document.getElementById('ssGameStreak');
        var pr = document.getElementById('ssGamePrompt');
        var gi = document.getElementById('ssGameInput');
        if (sc) sc.textContent = String(runtime.gameScore);
        if (sk) sk.textContent = String(runtime.gameStreak);
        if (pr) pr.textContent = runtime.gamePrompt;
        if (gi) gi.value = '';
      } else if (runtime.gamePrompt.indexOf(runtime.gameInput) === 0) {
        runtime.gameCorrect++;
      } else {
        runtime.gameStreak = 0;
      }
      var ac = document.getElementById('ssGameAcc');
      if (ac) ac.textContent = (runtime.gameTotal > 0 ? Math.round((runtime.gameCorrect / runtime.gameTotal) * 100) : 100) + '%';
    }

    function navigate(route) {
      stopTimers();
      runtime.gameActive = false;
      appState.route = route;
      saveState();
      if (route === 'lessons') {
        var l = SS_DATA.lessons[appState.activeLessonId - 1] || SS_DATA.lessons[0];
        resetTypingSession(l.drills[appState.activeDrillIdx] || l.drills[0]);
      } else if (route === 'practice') {
        var cat = SS_DATA.practiceCategories[runtime.practiceCatIdx] || SS_DATA.practiceCategories[0];
        resetTypingSession(runtime.customPracticeText || cat.texts[runtime.practiceTextIdx] || cat.texts[0]);
      } else if (route === 'speedtest') {
        var ps = SS_DATA.speedTestPassages[runtime.testPassageIdx] || SS_DATA.speedTestPassages[0];
        resetTypingSession(ps.text);
      }
      var sb = document.getElementById('ssSidebar');
      var bd = document.getElementById('ssBackdrop');
      if (sb) sb.classList.remove('is-open');
      if (bd) bd.classList.remove('is-open');
      render();
    }

    function init() {
      var yr = document.getElementById('ssYear');
      if (yr) yr.textContent = String(new Date().getFullYear());
      applyTheme();

      var navList = document.getElementById('ssNavList');
      if (navList) {
        navList.addEventListener('click', function (e) {
          var btn = e.target.closest('.ss-nav-btn');
          if (!btn) return;
          navigate(btn.getAttribute('data-route'));
        });
      }

      var modeBtns = document.querySelectorAll('.ss-seg-btn[data-mode]');
      for (var i = 0; i < modeBtns.length; i++) {
        modeBtns[i].addEventListener('click', function () {
          appState.mode = this.getAttribute('data-mode');
          saveState();
          render();
        });
      }

      var inpBtns = document.querySelectorAll('.ss-seg-btn[data-input]');
      for (var j = 0; j < inpBtns.length; j++) {
        inpBtns[j].addEventListener('click', function () {
          appState.inputMode = this.getAttribute('data-input');
          saveState();
          render();
        });
      }

      var tBtn = document.getElementById('ssThemeToggle');
      if (tBtn) {
        tBtn.addEventListener('click', function () {
          appState.theme = appState.theme === 'dark' ? 'light' : 'dark';
          saveState();
          applyTheme();
        });
      }

      var mobBtn = document.getElementById('ssMobileMenuBtn');
      var sb = document.getElementById('ssSidebar');
      var bd = document.getElementById('ssBackdrop');
      if (mobBtn && sb && bd) {
        mobBtn.addEventListener('click', function () {
          sb.classList.toggle('is-open');
          bd.classList.toggle('is-open');
        });
        bd.addEventListener('click', function () {
          sb.classList.remove('is-open');
          bd.classList.remove('is-open');
        });
      }

      window.SSApp = { navigate: navigate };
      navigate(appState.route || 'home');
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  })();
  //]]>
  </script>
</body>
</html>`;
}
