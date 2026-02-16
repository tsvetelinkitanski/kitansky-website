import { Search, FileText, Rocket, Hammer, Key } from 'lucide-react';

const HowWeWork = ({ translations, language }) => {
  const t = translations[language];

  const steps = [
    {
      number: '1',
      icon: Search,
      title: t.howWeWork.step1.title,
      timeline: t.howWeWork.step1.timeline,
      description: t.howWeWork.step1.description,
      color: 'from-blue-500 to-blue-700',
    },
    {
      number: '2',
      icon: FileText,
      title: t.howWeWork.step2.title,
      timeline: t.howWeWork.step2.timeline,
      description: t.howWeWork.step2.description,
      color: 'from-green-500 to-green-700',
    },
    {
      number: '3',
      icon: Rocket,
      title: t.howWeWork.step3.title,
      timeline: t.howWeWork.step3.timeline,
      description: t.howWeWork.step3.description,
      color: 'from-purple-500 to-purple-700',
    },
    {
      number: '4',
      icon: Hammer,
      title: t.howWeWork.step4.title,
      timeline: t.howWeWork.step4.timeline,
      description: t.howWeWork.step4.description,
      color: 'from-orange-500 to-orange-700',
    },
    {
      number: '5',
      icon: Key,
      title: t.howWeWork.step5.title,
      timeline: t.howWeWork.step5.timeline,
      description: t.howWeWork.step5.description,
      color: 'from-emerald-500 to-emerald-700',
    },
  ];

  return (
    <section
      id="how-we-work"
      className="py-24 px-4 bg-gradient-to-br from-stone-50 to-neutral-100 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden transition-colors duration-300"
    >
      <div className="absolute top-20 left-10 w-72 h-72 bg-stone-200/30 dark:bg-slate-700/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-neutral-200/30 dark:bg-slate-700/30 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-stone-700 to-neutral-700 dark:from-stone-300 dark:to-neutral-300 bg-clip-text text-transparent">
            {t.howWeWork.title}
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto transition-colors duration-300">
            {t.howWeWork.subtitle}
          </p>
        </div>

        <div className="space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;

            return (
              <div
                key={step.number}
                className={`scroll-animate ${isEven ? 'slide-from-left' : 'slide-from-right'} flex flex-col md:flex-row gap-6 items-center`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Step number badge - appears on left on desktop */}
                <div className="flex-shrink-0 order-1 md:order-1">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300`}>
                    <span className="text-3xl font-black text-white">{step.number}</span>
                  </div>
                </div>

                {/* Connector line - hidden on mobile */}
                <div className="hidden md:block flex-shrink-0 order-2">
                  <div className="w-16 h-1 bg-gradient-to-r from-stone-300 to-neutral-300 dark:from-slate-700 dark:to-slate-600"></div>
                </div>

                {/* Content card */}
                <div className="flex-grow order-3 w-full">
                  <div className="group bg-white dark:bg-slate-800 p-8 rounded-3xl border-2 border-stone-200 dark:border-slate-700 hover:border-stone-400 dark:hover:border-slate-600 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                    <div className="flex items-start gap-6">
                      {/* Icon */}
                      <div className={`flex-shrink-0 p-4 rounded-2xl bg-gradient-to-br ${step.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      {/* Text content */}
                      <div className="flex-grow">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 mb-3">
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 transition-colors duration-300">
                            {step.title}
                          </h3>
                          <span className="inline-flex items-center px-4 py-2 bg-stone-100 dark:bg-slate-700 text-stone-700 dark:text-slate-300 rounded-full text-sm font-bold transition-colors duration-300">
                            📅 {step.timeline}
                          </span>
                        </div>

                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed transition-colors duration-300">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-stone-100 to-neutral-100 dark:from-slate-800 dark:to-slate-700 px-8 py-6 rounded-3xl border-2 border-stone-300 dark:border-slate-600 shadow-xl transition-colors duration-300">
            <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {language === 'bg'
                ? '🚀 Готови ли сте да стартираме? Всичко започва с едно обаждане.'
                : '🚀 Ready to start? Everything begins with one call.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
