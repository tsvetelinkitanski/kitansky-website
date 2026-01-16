import { Phone } from 'lucide-react';
import { useState, useEffect } from 'react';

const StickyCallButton = ({ language }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after scrolling down 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const handleClick = () => {
    if (window.gtag) {
      window.gtag('event', 'qualify_lead', {
        event_category: 'Contact',
        event_label: 'Sticky Call Button Click',
        value: 100,
        currency: 'BGN'
      });
    }
  };

  return (
    <>
      {/* Mobile: Fixed bottom button (full width) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-white via-white to-transparent dark:from-slate-900 dark:via-slate-900 dark:to-transparent pointer-events-none transition-colors duration-300">
        <a
          href="tel:+359878349453"
          onClick={handleClick}
          className="pointer-events-auto flex items-center justify-center gap-3 w-full py-5 px-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-2xl font-bold transition-all duration-300 shadow-2xl transform hover:scale-105 active:scale-95"
          aria-label={language === 'bg' ? 'Обадете се сега' : 'Call now'}
        >
          <div className="relative">
            <Phone className="w-6 h-6 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
          </div>
          <span className="text-lg">
            {language === 'bg' ? 'ОБАДЕТЕ СЕ СЕГА' : 'CALL NOW'}
          </span>
        </a>
      </div>

      {/* Desktop: Floating button (bottom right) */}
      <div
        className={`hidden md:block fixed bottom-8 right-8 z-50 transition-all duration-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'
        }`}
      >
        <a
          href="tel:+359878349453"
          onClick={handleClick}
          className="group flex items-center gap-3 py-5 px-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-full font-bold transition-all duration-300 shadow-2xl transform hover:scale-110 hover:-translate-y-1"
          aria-label={language === 'bg' ? 'Обадете се сега' : 'Call now'}
        >
          <div className="relative">
            <Phone className="w-6 h-6 group-hover:animate-wiggle" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
          </div>
          <span className="text-base whitespace-nowrap">
            📞 +359 878 34 94 53
          </span>
        </a>
      </div>

      <style jsx>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-15deg); }
          75% { transform: rotate(15deg); }
        }

        .group:hover .group-hover\\:animate-wiggle {
          animation: wiggle 0.5s ease-in-out;
        }
      `}</style>
    </>
  );
};

export default StickyCallButton;
