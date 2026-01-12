import { Briefcase, Award, CheckCircle } from 'lucide-react';

const Services = ({ translations, language }) => {
  const t = translations[language];

  const services = [
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: t.services.pm.title,
      description: t.services.pm.description,
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: t.services.supervision.title,
      description: t.services.supervision.description,
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: t.services.consulting.title,
      description: t.services.consulting.description,
    },
  ];

  return (
    <section
      id="services"
      className="py-24 px-4 bg-gradient-to-br from-stone-50 to-neutral-100 dark:from-slate-800 dark:to-slate-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-black text-center mb-16 bg-gradient-to-r from-stone-700 to-neutral-700 dark:from-stone-300 dark:to-neutral-300 bg-clip-text text-transparent">
          {t.services.title}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`scroll-animate slide-from-bottom group bg-white dark:bg-slate-800 p-10 rounded-3xl border-2 border-stone-200 dark:border-slate-700 hover:border-stone-400 dark:hover:border-slate-600 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl relative overflow-hidden`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-stone-200/30 to-neutral-200/30 dark:from-slate-600/30 dark:to-slate-700/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>

              <div className="relative z-10">
                <div className="bg-gradient-to-br from-stone-600 to-neutral-700 dark:from-stone-700 dark:to-neutral-800 p-4 rounded-2xl inline-block mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">{service.icon}</div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                  {service.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
