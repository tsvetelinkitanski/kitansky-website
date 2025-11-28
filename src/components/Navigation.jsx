import { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';

const Navigation = ({ language, toggleLanguage, translations }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[language];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg z-50 border-b border-stone-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-stone-700 to-neutral-700 bg-clip-text text-transparent">
              Kitanski
            </h1>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {Object.values(t.nav).map((item, index) => {
              if (index === 5) {
                return (
                  <a
                    key={item}
                    href="/blog.html"
                    className="text-slate-700 hover:text-stone-700 transition-all duration-300 font-medium relative group"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-stone-700 group-hover:w-full transition-all duration-300"></span>
                  </a>
                );
              }
              if (index === 6) {
                return (
                  <a
                    key={item}
                    href="/privacy.html"
                    className="text-slate-700 hover:text-stone-700 transition-all duration-300 font-medium relative group"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-stone-700 group-hover:w-full transition-all duration-300"></span>
                  </a>
                );
              }
              return (
                <button
                  key={item}
                  onClick={() => {
                    scrollToSection(
                      ['home', 'about', 'projects', 'services', 'contact'][
                        index
                      ]
                    );
                  }}
                  className="text-slate-700 hover:text-stone-700 transition-all duration-300 font-medium relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-stone-700 group-hover:w-full transition-all duration-300"></span>
                </button>
              );
            })}

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-stone-600 to-neutral-700 text-white rounded-full hover:from-stone-700 hover:to-neutral-800 transition-all duration-300 font-bold shadow-lg"
            >
              <Globe size={18} />
              <span>{language === 'bg' ? 'EN' : 'BG'}</span>
            </button>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-stone-600 to-neutral-700 text-white rounded-full text-sm font-bold"
            >
              <Globe size={16} />
              {language === 'bg' ? 'EN' : 'BG'}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-700 hover:text-stone-700"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-stone-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {Object.values(t.nav).map((item, index) => {
              if (index === 5) {
                return (
                  <a
                    key={item}
                    href="/blog.html"
                    className="block w-full text-left px-3 py-2 text-slate-700 hover:text-stone-700 hover:bg-stone-50 rounded-md transition-colors"
                  >
                    {item}
                  </a>
                );
              }
              if (index === 6) {
                return (
                  <a
                    key={item}
                    href="/privacy.html"
                    className="block w-full text-left px-3 py-2 text-slate-700 hover:text-stone-700 hover:bg-stone-50 rounded-md transition-colors"
                  >
                    {item}
                  </a>
                );
              }
              return (
                <button
                  key={item}
                  onClick={() => {
                    scrollToSection(
                      ['home', 'about', 'projects', 'services', 'contact'][
                        index
                      ]
                    );
                  }}
                  className="block w-full text-left px-3 py-2 text-slate-700 hover:text-stone-700 hover:bg-stone-50 rounded-md transition-colors"
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
