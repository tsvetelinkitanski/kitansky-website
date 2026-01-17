import { CheckCircle, Clock, Eye, Users } from 'lucide-react';

const WhyKitanski = ({ translations, language }) => {
  const t = translations[language];

  const reasons = [
    {
      id: 'time',
      icon: Clock,
      title: t.whyKitanski.reason1.title,
      description: t.whyKitanski.reason1.description,
      gradient: 'from-green-600 to-emerald-700 dark:from-green-700 dark:to-emerald-800',
    },
    {
      id: 'transparency',
      icon: Eye,
      title: t.whyKitanski.reason2.title,
      description: t.whyKitanski.reason2.description,
      gradient: 'from-blue-600 to-cyan-700 dark:from-blue-700 dark:to-cyan-800',
    },
    {
      id: 'team',
      icon: Users,
      title: t.whyKitanski.reason3.title,
      description: t.whyKitanski.reason3.description,
      gradient: 'from-purple-600 to-indigo-700 dark:from-purple-700 dark:to-indigo-800',
    },
  ];

  return (
    <section
      id="why-kitanski"
      className="py-24 px-4 bg-gradient-to-br from-white to-stone-50 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden transition-colors duration-300"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-stone-200/30 dark:bg-slate-700/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-neutral-200/30 dark:bg-slate-700/30 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-stone-700 to-neutral-700 dark:from-stone-300 dark:to-neutral-300 bg-clip-text text-transparent">
            {t.whyKitanski.title}
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto transition-colors duration-300">
            {t.whyKitanski.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.id}
                className="scroll-animate scale-fade-in group bg-white dark:bg-slate-800 p-8 rounded-3xl border-2 border-stone-200 dark:border-slate-700 hover:border-stone-400 dark:hover:border-slate-600 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-stone-100/50 to-neutral-100/50 dark:from-slate-700/40 dark:to-slate-600/40 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>

                <div className="relative z-10">
                  <div className="mb-6">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${reason.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100 transition-colors duration-300">
                    {reason.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed transition-colors duration-300">
                    {reason.description}
                  </p>

                  <div className="mt-6 pt-6 border-t-2 border-stone-100 dark:border-slate-700">
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                      <CheckCircle className="w-5 h-5" />
                      <span>{language === 'bg' ? 'Гарантирано' : 'Guaranteed'}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-4 bg-gradient-to-br from-stone-700 to-neutral-700 dark:from-slate-700 dark:to-slate-600 text-white px-10 py-8 rounded-3xl shadow-2xl">
            <p className="text-2xl font-bold">
              {language === 'bg'
                ? 'Готови ли сте да започнем вашия проект?'
                : 'Ready to start your project?'}
            </p>
            <a
              href="tel:+359878349453"
              className="px-8 py-4 bg-white hover:bg-stone-50 text-slate-900 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
              onClick={() => {
                if (window.gtag) {
                  window.gtag('event', 'qualify_lead', {
                    event_category: 'Contact',
                    event_label: 'Why Kitanski CTA Click',
                    value: 50,
                    currency: 'BGN'
                  });
                }
              }}
            >
              📞 +359 878 34 94 53
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyKitanski;
