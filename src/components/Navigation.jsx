import { useState } from 'react';
import { Menu, X, Globe, Moon, Sun } from 'lucide-react';

const Navigation = ({ language, toggleLanguage, theme, toggleTheme, translations }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[language];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: t.nav.home, section: 'home' },
    { label: t.nav.about, section: 'about' },
    { label: t.nav.projects, section: 'projects' },
    { label: t.nav.services, section: 'services' },
    { label: t.nav.faq, href: '/faq.html' },
    { label: t.nav.contact, section: 'contact' },
    { label: t.nav.blog, href: '/blog.html' },
  ];

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-stone-700 dark:bg-stone-200 text-white dark:text-slate-900 px-4 py-2 rounded-md z-[100] font-medium shadow-lg"
      >
        {language === 'bg' ? 'Към съдържанието' : 'Skip to main content'}
      </a>

      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/90 backdrop-blur-lg z-50 border-b border-stone-200 dark:border-slate-700 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-stone-700 to-neutral-700 dark:from-stone-300 dark:to-neutral-300 bg-clip-text text-transparent">
              Kitanski
            </h1>
          </div>

          <div className="hidden md:flex items-center space-x-6 overflow-x-auto scrollbar-hide">
            {navItems.map((item) => {
              if (item.href) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-slate-700 dark:text-slate-300 hover:text-stone-700 dark:hover:text-stone-300 transition-all duration-300 font-medium relative group focus:outline-none focus:ring-2 focus:ring-stone-500 dark:focus:ring-stone-400 rounded px-2 py-1"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-stone-700 dark:bg-stone-300 group-hover:w-full transition-all duration-300"></span>
                  </a>
                );
              }
              return (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.section)}
                  className="text-slate-700 dark:text-slate-300 hover:text-stone-700 dark:hover:text-stone-300 transition-all duration-300 font-medium relative group focus:outline-none focus:ring-2 focus:ring-stone-500 dark:focus:ring-stone-400 rounded px-2 py-1"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-stone-700 dark:bg-stone-300 group-hover:w-full transition-all duration-300"></span>
                </button>
              );
            })}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-slate-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-stone-500 dark:focus:ring-stone-400"
              aria-label={theme === 'light' ? t.nav.darkMode : t.nav.lightMode}
              title={theme === 'light' ? t.nav.darkMode : t.nav.lightMode}
            >
              {theme === 'light' ? (
                <Moon size={20} className="text-slate-700" />
              ) : (
                <Sun size={20} className="text-slate-300" />
              )}
            </button>

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-stone-600 to-neutral-700 dark:from-stone-700 dark:to-neutral-800 text-white rounded-full hover:from-stone-700 hover:to-neutral-800 dark:hover:from-stone-800 dark:hover:to-neutral-900 transition-all duration-300 font-bold shadow-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
              aria-label={`${language === 'bg' ? 'Switch to English' : 'Превключи на български'}`}
            >
              <Globe size={18} />
              <span>{language === 'bg' ? 'EN' : 'BG'}</span>
            </button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-slate-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-stone-500 dark:focus:ring-stone-400"
              aria-label={theme === 'light' ? t.nav.darkMode : t.nav.lightMode}
            >
              {theme === 'light' ? (
                <Moon size={18} className="text-slate-700" />
              ) : (
                <Sun size={18} className="text-slate-300" />
              )}
            </button>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-stone-600 to-neutral-700 text-white rounded-full text-sm font-bold focus:outline-none focus:ring-2 focus:ring-stone-400"
              aria-label={`${language === 'bg' ? 'Switch to English' : 'Превключи на български'}`}
            >
              <Globe size={16} />
              {language === 'bg' ? 'EN' : 'BG'}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-700 dark:text-slate-300 hover:text-stone-700 dark:hover:text-stone-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500 dark:focus:ring-stone-400"
              aria-label={isMenuOpen ? (language === 'bg' ? 'Затвори меню' : 'Close menu') : (language === 'bg' ? 'Отвори меню' : 'Open menu')}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-stone-200 dark:border-slate-700 transition-colors duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => {
              if (item.href) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block w-full text-left px-3 py-2 text-slate-700 dark:text-slate-300 hover:text-stone-700 dark:hover:text-stone-300 hover:bg-stone-50 dark:hover:bg-slate-800 rounded-md transition-colors"
                  >
                    {item.label}
                  </a>
                );
              }
              return (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.section)}
                  className="block w-full text-left px-3 py-2 text-slate-700 dark:text-slate-300 hover:text-stone-700 dark:hover:text-stone-300 hover:bg-stone-50 dark:hover:bg-slate-800 rounded-md transition-colors"
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
      </nav>
    </>
  );
};

export default Navigation;
