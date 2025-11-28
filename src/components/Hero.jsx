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
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop&q=90"
          alt="Luxury Building"
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
            <span className="px-6 py-3 bg-white/90 backdrop-blur-sm border-2 border-white/50 rounded-full text-sm font-bold text-slate-900 shadow-2xl hover:scale-105 transition-transform hover:bg-white">
              ✓ {t.hero.experience}
            </span>
            <span className="px-6 py-3 bg-white/90 backdrop-blur-sm border-2 border-white/50 rounded-full text-sm font-bold text-slate-900 shadow-2xl hover:scale-105 transition-transform hover:bg-white">
              ✓ {t.hero.projects}
            </span>
            <span className="px-6 py-3 bg-white/90 backdrop-blur-sm border-2 border-white/50 rounded-full text-sm font-bold text-slate-900 shadow-2xl hover:scale-105 transition-transform hover:bg-white">
              ✓ {t.hero.quality}
            </span>
          </div>

          <p className="text-xl md:text-2xl text-stone-100 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-600 drop-shadow-lg font-medium">
            {t.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-800">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-10 py-5 bg-white hover:bg-stone-50 text-slate-900 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-2xl"
            >
              {t.hero.viewProjects} →
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-10 py-5 bg-gradient-to-r from-stone-700 to-neutral-700 hover:from-stone-800 hover:to-neutral-800 text-white rounded-2xl font-bold transition-all duration-300 border-2 border-white/30 transform hover:scale-105 shadow-2xl"
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
