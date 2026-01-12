import { Quote, Linkedin } from 'lucide-react';

const Testimonials = ({ translations, language }) => {
  const t = translations[language];

  return (
    <section
      id="testimonials"
      className="py-24 px-4 bg-gradient-to-br from-stone-50 to-neutral-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-black text-center mb-4 bg-gradient-to-r from-stone-700 to-neutral-700 dark:from-stone-300 dark:to-neutral-300 bg-clip-text text-transparent">
          {t.testimonials.title}
        </h2>
        <p className="text-center text-slate-600 dark:text-slate-300 text-lg mb-16 max-w-2xl mx-auto transition-colors duration-300">
          {t.testimonials.subtitle}
        </p>

        <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
          {t.testimonials.items.map((testimonial, index) => (
            <div
              key={index}
              className="scroll-animate slide-from-bottom group bg-white dark:bg-slate-800 p-10 md:p-12 rounded-3xl border-2 border-stone-200 dark:border-slate-700 hover:border-stone-400 dark:hover:border-slate-600 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-stone-200/30 to-neutral-200/30 dark:from-slate-700/40 dark:to-slate-600/40 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>

              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <div className="bg-gradient-to-br from-stone-600 to-neutral-700 dark:from-slate-700 dark:to-slate-600 p-4 rounded-2xl transition-colors duration-300">
                    <Quote className="w-8 h-8 text-white" />
                  </div>
                </div>

                <blockquote className="text-slate-700 dark:text-slate-200 text-lg md:text-xl leading-relaxed mb-8 text-center italic transition-colors duration-300">
                  "{testimonial.text}"
                </blockquote>

                <div className="flex flex-col items-center gap-2 pt-6 border-t-2 border-stone-200 dark:border-slate-700 transition-colors duration-300">
                  <div className="text-center">
                    <p className="font-bold text-xl text-slate-800 dark:text-slate-100 transition-colors duration-300">
                      {testimonial.name}
                    </p>
                    <p className="text-stone-600 dark:text-slate-300 font-semibold transition-colors duration-300">
                      {testimonial.role}
                    </p>
                    <p className="text-stone-500 dark:text-slate-400 text-sm mt-1 transition-colors duration-300">
                      {testimonial.company}
                    </p>
                    {testimonial.linkedIn && (
                      <a
                        href={testimonial.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300"
                        aria-label={`LinkedIn ${language === 'bg' ? 'профил на' : 'profile of'} ${testimonial.name}`}
                      >
                        <Linkedin className="w-5 h-5" />
                        <span className="text-sm font-medium">LinkedIn</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
