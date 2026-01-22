import { Briefcase, Award, CheckCircle } from 'lucide-react';

const About = ({ translations, language }) => {
  const t = translations[language];

  return (
    <section
      id="about"
      className="py-24 px-4 bg-white dark:bg-slate-900 relative overflow-hidden transition-colors duration-300"
    >
      <div className="absolute top-0 left-0 w-64 h-64 bg-stone-100/60 dark:bg-slate-700/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-neutral-100/60 dark:bg-slate-700/40 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-5xl md:text-6xl font-black text-center mb-16 bg-gradient-to-r from-stone-700 to-neutral-700 dark:from-stone-300 dark:to-neutral-300 bg-clip-text text-transparent">
          {t.about.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-white to-stone-50/50 dark:from-slate-800 dark:to-slate-800/50 p-8 md:p-10 rounded-3xl border border-stone-200/50 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-6">
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-stone-600 to-neutral-700 rounded-2xl transform rotate-3"></div>
                  <img
                    src="/todor-kitanski.jpg"
                    alt="Тодор Китански - Строителен мениджър"
                    className="relative w-40 h-40 md:w-48 md:h-48 object-cover rounded-2xl shadow-xl"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-stone-700 to-neutral-700 dark:from-stone-300 dark:to-neutral-300 bg-clip-text mb-3">
                    {t.about.name}
                  </h3>
                  <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                    {t.about.intro}
                  </p>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                {t.about.career}
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.about.vision}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div
              className="scroll-animate slide-from-right bg-gradient-to-br from-stone-600 to-neutral-700 p-8 rounded-3xl text-white shadow-2xl transform hover:scale-105 transition-all duration-300"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                  <Briefcase className="text-white" size={28} />
                </div>
                <h4 className="text-2xl font-bold">
                  {t.about.experienceTitle}
                </h4>
              </div>
              <p className="text-stone-50 text-lg">
                {t.about.experienceText}
              </p>
            </div>

            <div
              className="scroll-animate slide-from-right bg-gradient-to-br from-neutral-600 to-stone-700 p-8 rounded-3xl text-white shadow-2xl transform hover:scale-105 transition-all duration-300"
              style={{ animationDelay: '0.3s' }}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                  <Award className="text-white" size={28} />
                </div>
                <h4 className="text-2xl font-bold">
                  {t.about.specializationTitle}
                </h4>
              </div>
              <p className="text-neutral-50 text-lg">
                {t.about.specializationText}
              </p>
            </div>

            <div
              className="scroll-animate slide-from-right bg-gradient-to-br from-stone-700 to-neutral-600 p-8 rounded-3xl text-white shadow-2xl transform hover:scale-105 transition-all duration-300"
              style={{ animationDelay: '0.5s' }}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                  <CheckCircle className="text-white" size={28} />
                </div>
                <h4 className="text-2xl font-bold">
                  {t.about.completedTitle}
                </h4>
              </div>
              <p className="text-stone-50 text-lg">{t.about.completedText}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
