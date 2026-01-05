import { Quote, Linkedin } from 'lucide-react';

const Testimonials = ({ translations, language }) => {
  const t = translations[language];

  return (
    <section
      id="testimonials"
      className="py-24 px-4 bg-gradient-to-br from-stone-50 to-neutral-100"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-black text-center mb-4 bg-gradient-to-r from-stone-700 to-neutral-700 bg-clip-text text-transparent">
          {t.testimonials.title}
        </h2>
        <p className="text-center text-slate-600 text-lg mb-16 max-w-2xl mx-auto">
          {t.testimonials.subtitle}
        </p>

        <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
          {t.testimonials.items.map((testimonial, index) => (
            <div
              key={index}
              className="scroll-animate slide-from-bottom group bg-white p-10 md:p-12 rounded-3xl border-2 border-stone-200 hover:border-stone-400 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-stone-200/30 to-neutral-200/30 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>

              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <div className="bg-gradient-to-br from-stone-600 to-neutral-700 p-4 rounded-2xl">
                    <Quote className="w-8 h-8 text-white" />
                  </div>
                </div>

                <blockquote className="text-slate-700 text-lg md:text-xl leading-relaxed mb-8 text-center italic">
                  "{testimonial.text}"
                </blockquote>

                <div className="flex flex-col items-center gap-2 pt-6 border-t-2 border-stone-200">
                  <div className="text-center">
                    <p className="font-bold text-xl text-slate-800">
                      {testimonial.name}
                    </p>
                    <p className="text-stone-600 font-semibold">
                      {testimonial.role}
                    </p>
                    <p className="text-stone-500 text-sm mt-1">
                      {testimonial.company}
                    </p>
                    {testimonial.linkedIn && (
                      <a
                        href={testimonial.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-3 text-blue-600 hover:text-blue-700 transition-colors"
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
