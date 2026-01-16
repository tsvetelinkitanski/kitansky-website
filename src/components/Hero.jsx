import { ChevronDown } from 'lucide-react';

const Hero = ({ translations, language }) => {
  const t = translations[language];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 px-4 relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop&q=80"
          srcSet="
            https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=640&h=360&fit=crop&q=75 640w,
            https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1024&h=576&fit=crop&q=80 1024w,
            https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop&q=80 1920w,
            https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=2560&h=1440&fit=crop&q=85 2560w
          "
          sizes="100vw"
          alt="Luxury Building"
          loading="eager"
          fetchpriority="high"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/50 to-neutral-900/50"></div>
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="space-y-8">
          <div className="overflow-hidden">
            <h2 className="text-7xl md:text-9xl font-black mb-6 bg-gradient-to-r from-stone-200 via-white to-neutral-200 bg-clip-text text-transparent animate-fade-in-up inline-block drop-shadow-2xl">
              {t.hero.title}
            </h2>
          </div>

          <h3 className="text-2xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up animation-delay-200 drop-shadow-lg">
            {t.hero.subtitle}
          </h3>

          <div className="flex flex-wrap gap-3 justify-center mb-8 animate-fade-in-up animation-delay-400">
            <span className="px-6 py-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-2 border-white/50 dark:border-slate-700/50 rounded-full text-sm font-bold text-slate-900 dark:text-slate-100 shadow-2xl hover:scale-105 transition-all hover:bg-white dark:hover:bg-slate-800">
              ✓ {t.hero.experience}
            </span>
            <span className="px-6 py-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-2 border-white/50 dark:border-slate-700/50 rounded-full text-sm font-bold text-slate-900 dark:text-slate-100 shadow-2xl hover:scale-105 transition-all hover:bg-white dark:hover:bg-slate-800">
              ✓ {t.hero.projects}
            </span>
            <span className="px-6 py-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-2 border-white/50 dark:border-slate-700/50 rounded-full text-sm font-bold text-slate-900 dark:text-slate-100 shadow-2xl hover:scale-105 transition-all hover:bg-white dark:hover:bg-slate-800">
              ✓ {t.hero.quality}
            </span>
          </div>

          <p className="text-xl md:text-2xl text-stone-100 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-600 drop-shadow-lg font-medium">
            {t.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-800">
            <a
              href="tel:+359878349453"
              className="px-8 py-4 bg-gradient-to-r from-amber-600/90 to-orange-600/90 hover:from-amber-700 hover:to-orange-700 backdrop-blur-sm text-white rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-2xl flex items-center justify-center gap-2 border-2 border-amber-500/30"
              onClick={() => {
                if (window.gtag) {
                  window.gtag('event', 'qualify_lead', {
                    event_category: 'Contact',
                    event_label: 'Hero Call Button Click',
                    value: 100,
                    currency: 'BGN'
                  });
                }
              }}
            >
              <span className="text-xl">📞</span>
              {t.hero.callNow}
            </a>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 bg-white/90 hover:bg-white backdrop-blur-sm text-slate-900 rounded-2xl font-bold transition-all duration-300 border-2 border-white/40 transform hover:scale-105 shadow-2xl"
            >
              {t.hero.contactMe}
            </button>
          </div>
        </div>

        <div className="mt-20 animate-bounce">
          <ChevronDown
            className="mx-auto text-white drop-shadow-lg"
            size={40}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
