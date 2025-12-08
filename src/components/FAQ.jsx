import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ = ({ translations, language }) => {
  const t = translations[language];
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    // Add FAQ Schema markup
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": t.faq.items.map((item) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };

    let scriptTag = document.querySelector('script[data-faq-schema]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('data-faq-schema', 'true');
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(faqSchema);

    return () => {
      const tag = document.querySelector('script[data-faq-schema]');
      if (tag) tag.remove();
    };
  }, [t.faq.items]);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-24 px-4 bg-white relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-stone-100/60 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-neutral-100/60 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-5xl md:text-6xl font-black text-center mb-6 bg-gradient-to-r from-stone-700 to-neutral-700 bg-clip-text text-transparent scroll-animate slide-from-bottom">
          {t.faq.title}
        </h2>
        <p className="text-center text-slate-600 text-lg mb-16 scroll-animate slide-from-bottom animation-delay-200">
          {t.faq.subtitle}
        </p>

        <div className="space-y-4">
          {t.faq.items.map((item, index) => (
            <div
              key={index}
              className="scroll-animate scale-fade-in bg-gradient-to-br from-white to-stone-50/50 rounded-2xl border-2 border-stone-200/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              style={{ animationDelay: `${0.1 * (index + 2)}s` }}
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-stone-50/50 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-bold text-slate-800 pr-4">
                  {item.question}
                </span>
                <ChevronDown
                  className={`flex-shrink-0 text-stone-600 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  size={24}
                />
              </button>
              {openIndex === index && (
                <div className="px-8 pb-6 text-slate-700 leading-relaxed animate-fade-in-up">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center scroll-animate slide-from-bottom animation-delay-800">
          <p className="text-lg text-slate-700 mb-6">
            {language === 'bg'
              ? 'Имате друг въпрос? Свържете се с мен!'
              : 'Have another question? Get in touch!'}
          </p>
          <a
            href="#contact"
            className="inline-block px-10 py-5 bg-gradient-to-r from-stone-700 to-neutral-700 hover:from-stone-800 hover:to-neutral-800 text-white rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-stone-500/30"
          >
            {language === 'bg' ? 'Свържете се с мен' : 'Contact Me'} →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
