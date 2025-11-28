const Footer = ({ translations, language }) => {
  const t = translations[language];

  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-800 border-t-4 border-stone-600 py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-stone-100 text-lg font-semibold">
          {t.footer.rights}
        </p>
        <p className="text-slate-400 mt-3">{t.footer.tagline}</p>
        <div className="flex gap-4 justify-center mt-4">
          <a
            href="/blog.html"
            className="text-stone-300 hover:text-white underline transition-colors"
          >
            {t.nav.blog}
          </a>
          <span className="text-stone-600">•</span>
          <a
            href="/privacy.html"
            className="text-stone-300 hover:text-white underline transition-colors"
          >
            {t.footer.privacy}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
