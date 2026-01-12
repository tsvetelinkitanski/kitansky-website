const Footer = ({ translations, language }) => {
  const t = translations[language];

  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 border-t-4 border-stone-600 dark:border-slate-700 py-12 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-stone-100 dark:text-slate-100 text-lg font-semibold transition-colors duration-300">
          {t.footer.rights}
        </p>
        <p className="text-slate-400 dark:text-slate-400 mt-3 transition-colors duration-300">{t.footer.tagline}</p>
        <div className="flex gap-4 justify-center mt-4">
          <a
            href="/blog.html"
            className="text-stone-300 dark:text-slate-300 hover:text-white dark:hover:text-white underline transition-colors duration-300"
          >
            {t.nav.blog}
          </a>
          <span className="text-stone-600 dark:text-slate-600 transition-colors duration-300">•</span>
          <a
            href="/privacy.html"
            className="text-stone-300 dark:text-slate-300 hover:text-white dark:hover:text-white underline transition-colors duration-300"
          >
            {t.footer.privacy}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
