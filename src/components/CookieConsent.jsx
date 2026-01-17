import { useState } from 'react';
import { Cookie, Settings, X } from 'lucide-react';

const CookieConsent = ({ cookieConsent, acceptCookies, declineCookies, translations, language }) => {
  const t = translations[language];
  const [showManagePanel, setShowManagePanel] = useState(false);

  // Show initial consent banner if no choice made
  if (cookieConsent === null) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900 text-white p-6 shadow-2xl z-50 border-t-4 border-stone-600">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Cookie size={32} className="text-stone-300 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-1">{t.cookies.title}</h3>
              <p className="text-stone-300 text-sm">{t.cookies.message}</p>
            </div>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a
              href="/privacy.html"
              className="px-4 py-2 text-stone-300 hover:text-white transition-colors text-sm underline"
            >
              {t.cookies.learnMore}
            </a>
            <button
              onClick={declineCookies}
              className="px-6 py-2 bg-stone-700 hover:bg-stone-600 rounded-full transition-colors font-medium"
            >
              {t.cookies.decline}
            </button>
            <button
              onClick={acceptCookies}
              className="px-6 py-2 bg-gradient-to-r from-stone-600 to-neutral-700 hover:from-stone-700 hover:to-neutral-800 rounded-full transition-colors font-bold shadow-lg"
            >
              {t.cookies.accept}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show floating settings button and management panel
  return (
    <>
      {/* Floating Cookie Settings Button */}
      <button
        onClick={() => setShowManagePanel(!showManagePanel)}
        className="fixed bottom-6 right-6 bg-slate-900 hover:bg-slate-800 text-white p-3 rounded-full shadow-lg z-40 transition-all hover:scale-110"
        aria-label={t.cookies.manageCookies}
        title={t.cookies.manageCookies}
      >
        <Settings size={24} />
      </button>

      {/* Management Panel */}
      {showManagePanel && (
        <div className="fixed bottom-20 right-6 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-6 rounded-lg shadow-2xl z-50 border border-stone-300 dark:border-stone-700 max-w-md">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <Cookie size={28} className="text-stone-600 dark:text-stone-300" />
              <h3 className="font-bold text-lg">{t.cookies.manageCookies}</h3>
            </div>
            <button
              onClick={() => setShowManagePanel(false)}
              className="text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200 transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mb-4 p-3 bg-stone-100 dark:bg-stone-800 rounded-lg">
            <p className="text-sm font-medium mb-1">{t.cookies.currentStatus}</p>
            <p className="text-sm">
              {cookieConsent ? (
                <span className="text-green-600 dark:text-green-400 font-bold">
                  ✓ {t.cookies.accepted}
                </span>
              ) : (
                <span className="text-red-600 dark:text-red-400 font-bold">
                  ✗ {t.cookies.declined}
                </span>
              )}
            </p>
          </div>

          <p className="text-sm text-stone-600 dark:text-stone-400 mb-4">
            {t.cookies.message}
          </p>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                acceptCookies();
                setShowManagePanel(false);
              }}
              className="w-full px-4 py-2 bg-gradient-to-r from-stone-600 to-neutral-700 hover:from-stone-700 hover:to-neutral-800 text-white rounded-full transition-colors font-medium shadow-md"
            >
              {t.cookies.accept}
            </button>
            <button
              onClick={() => {
                declineCookies();
                setShowManagePanel(false);
              }}
              className="w-full px-4 py-2 bg-stone-300 dark:bg-stone-700 hover:bg-stone-400 dark:hover:bg-stone-600 text-slate-900 dark:text-white rounded-full transition-colors font-medium"
            >
              {t.cookies.decline}
            </button>
            <a
              href="/privacy.html"
              className="text-center text-sm text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 underline mt-2"
              onClick={() => setShowManagePanel(false)}
            >
              {t.cookies.learnMore}
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;
