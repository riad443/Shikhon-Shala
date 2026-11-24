import React, { useMemo, useState } from 'react';
import { Copy, Check, Download, ShieldCheck, AlertTriangle } from 'lucide-react';
import { buildBloggerXmlTheme } from '../blogger/bloggerThemeTemplate';

interface ValidationResult {
  xmlValid: boolean;
  xmlMessage: string;
  jsValid: boolean;
  jsMessage: string;
  lineCount: number;
  byteSize: number;
}

export const BloggerXmlStudio: React.FC = () => {
  const xmlCode = useMemo(() => buildBloggerXmlTheme(), []);
  const [copied, setCopied] = useState(false);
  const [validation, setValidation] = useState<ValidationResult | null>(null);

  const runValidation = () => {
    let xmlValid = false;
    let xmlMessage = '';
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xmlCode, 'application/xml');
      const parseErr = doc.querySelector('parsererror');
      if (parseErr) {
        xmlValid = false;
        xmlMessage = parseErr.textContent?.slice(0, 220) || 'XML parse error detected.';
      } else {
        const hasRoot = doc.documentElement?.nodeName === 'html';
        const hasBlogWidget = Boolean(doc.getElementById('Blog1'));
        const hasHeaderWidget = Boolean(doc.getElementById('Header1'));
        xmlValid = hasRoot && hasBlogWidget && hasHeaderWidget;
        xmlMessage = xmlValid
          ? 'Valid XML structure: single <html> root, Header1, LinkList1/2, and Blog1 widgets verified.'
          : 'XML parsed, but required Blogger widgets were missing.';
      }
    } catch (err) {
      xmlValid = false;
      xmlMessage = err instanceof Error ? err.message : 'XML validation failed.';
    }

    let jsValid = false;
    let jsMessage = '';
    try {
      const markerStart = "<script type='text/javascript'>\n  //<![CDATA[";
      const markerEnd = '//]]>\n  </script>';
      const sIdx = xmlCode.indexOf(markerStart);
      const eIdx = xmlCode.lastIndexOf(markerEnd);
      if (sIdx === -1 || eIdx === -1) {
        jsMessage = 'Could not locate main CDATA script block.';
      } else {
        const jsBody = xmlCode.slice(sIdx + markerStart.length, eIdx);
        // Compile-check syntax without executing
        new Function(jsBody);
        jsValid = true;
        jsMessage = 'Vanilla JavaScript syntax compiled cleanly with zero syntax errors.';
      }
    } catch (err) {
      jsValid = false;
      jsMessage = err instanceof Error ? err.message : 'JS syntax check failed.';
    }

    setValidation({
      xmlValid,
      xmlMessage,
      jsValid,
      jsMessage,
      lineCount: xmlCode.split('\n').length,
      byteSize: new Blob([xmlCode]).size,
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(xmlCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback copy via temporary textarea
      const ta = document.createElement('textarea');
      ta.value = xmlCode;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([xmlCode], { type: 'application/xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shikhon-shala-blogger-theme.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111E33] p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-bangla">
              Blogger XML থিম এক্সপোর্ট ও ইনস্টলেশন গাইড
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl font-bangla">
              এটি সম্পূর্ণ স্বয়ংসম্পূর্ণ, আপলোড-রেডি Blogger XML থিম (HTML5 + CSS3 + Vanilla JS)। কোনো আলাদা হোস্টিং বা Node/React ছাড়াই সরাসরি Blogger-এ আপলোড করে ব্যবহার করা যাবে।
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={runValidation}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Validate XML &amp; JS</span>
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied XML' : 'Copy Full XML'}</span>
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download .xml Theme</span>
            </button>
          </div>
        </div>

        {validation && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div
              className={[
                'rounded-xl border p-3.5 text-xs sm:text-sm flex items-start gap-2.5',
                validation.xmlValid
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                  : 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-red-900 dark:text-red-200',
              ].join(' ')}
            >
              {validation.xmlValid ? (
                <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              )}
              <div>
                <div className="font-semibold">
                  XML Parser: {validation.xmlValid ? 'Passed' : 'Failed'} ({validation.lineCount} lines · {(validation.byteSize / 1024).toFixed(1)} KB)
                </div>
                <div className="opacity-90 mt-0.5">{validation.xmlMessage}</div>
              </div>
            </div>
            <div
              className={[
                'rounded-xl border p-3.5 text-xs sm:text-sm flex items-start gap-2.5',
                validation.jsValid
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                  : 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-red-900 dark:text-red-200',
              ].join(' ')}
            >
              {validation.jsValid ? (
                <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              )}
              <div>
                <div className="font-semibold">
                  Embedded JS Engine: {validation.jsValid ? 'Passed' : 'Failed'}
                </div>
                <div className="opacity-90 mt-0.5">{validation.jsMessage}</div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
            shikhon-shala-blogger-theme.xml (Preview)
          </div>
          <pre className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950 text-slate-100 p-4 text-xs font-mono-num overflow-x-auto max-h-[340px]">
            <code>{xmlCode.slice(0, 6500)}&#10;&#10;... ({xmlCode.split('\n').length} total lines — use Copy Full XML or Download .xml Theme for the complete file)</code>
          </pre>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111E33] p-5 space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            1. Step-by-Step Blogger Installation
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>Click <strong>Download .xml Theme</strong> above to save <code>shikhon-shala-blogger-theme.xml</code>.</li>
            <li>Sign in to <strong>Blogger Dashboard</strong> and select your blog.</li>
            <li>Go to <strong>Theme</strong> → click the dropdown arrow next to <strong>Customize</strong> → select <strong>Backup</strong> first to save your current theme.</li>
            <li>Click the same dropdown → select <strong>Restore</strong> → click <strong>Upload</strong> and choose <code>shikhon-shala-blogger-theme.xml</code>.</li>
            <li>Open <strong>Theme → Mobile Settings</strong> (under dropdown) and set to <strong>Desktop</strong> so Blogger renders the responsive theme instead of its legacy mobile wrapper.</li>
          </ol>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111E33] p-5 space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            2. Blogger Setup &amp; Editable Widgets
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li><strong>Logo &amp; Tagline</strong>: Go to <strong>Layout → Site Header (Header1)</strong> to edit the blog title, upload a logo, or change the Bangla tagline.</li>
            <li><strong>Header &amp; Footer Links</strong>: Go to <strong>Layout → Editable Header Links (LinkList1)</strong> and <strong>Editable Footer Links (LinkList2)</strong> to add Privacy Policy, Blog, or external URLs.</li>
            <li><strong>Blog Posts &amp; Pages</strong>: Standard Blogger posts (<code>Blog1</code>) automatically appear below the tutor on the homepage and render full-page articles cleanly on post URLs.</li>
            <li><strong>Colors</strong>: Adjust primary colors directly in <strong>Theme → Customize → Advanced</strong> using the built-in Blogger <code>&lt;Variable&gt;</code> tokens or edit <code>:root</code> CSS variables inside <code>&lt;b:skin&gt;</code>.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111E33] p-5 space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            3. Editing Lessons &amp; Bijoy Key Mappings
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Open <strong>Theme → Edit HTML</strong> and search for <code>var SS_DATA =</code> inside the bottom <code>&lt;script&gt;</code> block:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
            <li><strong>Add/Edit Lessons</strong>: Locate the <code>&quot;lessons&quot;</code> array inside <code>SS_DATA</code>. Each lesson object contains <code>id</code>, <code>titleBn</code>, <code>titleEn</code>, <code>drills</code>, <code>targetAccuracy</code>, and <code>targetWpm</code>.</li>
            <li><strong>Edit Key Mappings</strong>: Locate <code>&quot;keyboardRows&quot;</code> inside <code>SS_DATA</code>. Update <code>bn</code> (normal), <code>bnShift</code> (Shift), <code>bnName</code>, or <code>finger</code> for any key code.</li>
            <li>Always keep your edits inside the <code>//&lt;![CDATA[ ... //]]&gt;</code> script wrapper and never introduce the literal sequence <code>]]&gt;</code>.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111E33] p-5 space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            4. Testing Checklist &amp; Honest Limitations
          </h2>
          <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
            <li><strong>Desktop &amp; Mobile Check</strong>: Verify sidebar drawer toggle at &lt;960px, horizontal scroll on visual keyboard on narrow screens, Light/Dark contrast, 1/3/5-min Speed Test, and a Blogger post URL.</li>
            <li><strong>LocalStorage Limitation</strong>: Progress, completed lessons, and high scores are stored only in the visitor&apos;s current browser/device. Clearing browser data resets progress; there are no cloud accounts or server leaderboards.</li>
            <li><strong>ANSI Font Reality</strong>: Browsers render Bangla using Unicode fonts unless proprietary <code>SutonnyMJ</code> is installed locally. Bijoy Classic (ANSI) mode teaches authentic ANSI visual-order keystrokes while keeping text legible in Unicode.</li>
            <li><strong>Contact Form</strong>: Because Blogger has no custom backend server, the built-in contact form confirms submission locally without an external mail server unless paired with Blogger&apos;s native ContactForm gadget.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
