import { Cookie } from 'lucide-react';

const CookieConsent = ({ cookieConsent, acceptCookies, declineCookies, translations, language }) => {
  const t = translations[language];

  if (cookieConsent !== null) {
    return null;
  }

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
};

export default CookieConsent;
