import { AlertTriangle, TrendingUp, Clock, BadgeAlert } from 'lucide-react';

const CostlyMistakes = ({ translations, language }) => {
  const t = translations[language];

  const mistakes = [
    {
      id: 'budget',
      icon: TrendingUp,
      title: t.costlyMistakes.mistake1.title,
      consequence: t.costlyMistakes.mistake1.consequence,
      description: t.costlyMistakes.mistake1.description,
    },
    {
      id: 'delays',
      icon: Clock,
      title: t.costlyMistakes.mistake2.title,
      consequence: t.costlyMistakes.mistake2.consequence,
      description: t.costlyMistakes.mistake2.description,
    },
    {
      id: 'quality',
      icon: BadgeAlert,
      title: t.costlyMistakes.mistake3.title,
      consequence: t.costlyMistakes.mistake3.consequence,
      description: t.costlyMistakes.mistake3.description,
    },
  ];

  return (
    <section
      id="costly-mistakes"
      className="py-24 px-4 bg-gradient-to-br from-red-50 to-orange-50 dark:from-slate-900 dark:to-red-950/20 relative overflow-hidden transition-colors duration-300"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-200/20 dark:bg-red-900/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-200/20 dark:bg-orange-900/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Warning Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <AlertTriangle className="w-12 h-12 text-red-600 dark:text-red-500 animate-pulse" />
            <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-500 dark:to-orange-500 bg-clip-text text-transparent">
              {t.costlyMistakes.title}
            </h2>
          </div>
          <p className="text-xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto font-semibold transition-colors duration-300">
            {t.costlyMistakes.subtitle}
          </p>
        </div>

        {/* Mistakes Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {mistakes.map((mistake, index) => {
            const Icon = mistake.icon;
            return (
              <div
                key={mistake.id}
                className="scroll-animate slide-from-bottom group"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border-3 border-red-200 dark:border-red-900/50 hover:border-red-400 dark:hover:border-red-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl h-full">
                  {/* Icon and emoji */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{t.costlyMistakes.mistake1.icon}</span>
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 shadow-lg">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Mistake title */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 leading-tight transition-colors duration-300">
                    {mistake.title}
                  </h3>

                  {/* Consequence - highlighted */}
                  <div className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 dark:border-red-600 px-4 py-3 mb-4 rounded-r-xl">
                    <p className="text-red-800 dark:text-red-300 font-bold text-lg transition-colors duration-300">
                      {mistake.consequence}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed transition-colors duration-300">
                    {mistake.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Strong CTA */}
        <div className="scroll-animate scale-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-700 text-white p-10 rounded-3xl shadow-2xl text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-black mb-4">
                {t.costlyMistakes.cta}
              </h3>
              <p className="text-xl mb-8 text-green-50">
                {language === 'bg'
                  ? 'Професионален подход, проверени екипи, гарантирани срокове.'
                  : 'Professional approach, verified teams, guaranteed deadlines.'}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="tel:+359878349453"
                  className="px-10 py-5 bg-white hover:bg-green-50 text-green-700 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl text-lg"
                  onClick={() => {
                    if (window.gtag) {
                      window.gtag('event', 'qualify_lead', {
                        event_category: 'Contact',
                        event_label: 'Costly Mistakes CTA Click',
                        value: 75,
                        currency: 'BGN'
                      });
                    }
                  }}
                >
                  📞 {language === 'bg' ? 'Обадете се сега' : 'Call Now'}
                </a>

                <a
                  href="#contact"
                  className="px-10 py-5 bg-green-700 hover:bg-green-800 text-white rounded-2xl font-bold transition-all duration-300 border-2 border-white/30 text-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {language === 'bg' ? 'Изпратете запитване →' : 'Send Inquiry →'}
                </a>
              </div>

              <p className="mt-6 text-sm text-green-100">
                {language === 'bg'
                  ? '✓ Бърз отговор  •  ✓ Оферта в рамките на 48 часа'
                  : '✓ Quick response  •  ✓ Quote within 48 hours'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CostlyMistakes;
