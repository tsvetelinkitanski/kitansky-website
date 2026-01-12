import { useState, useEffect, lazy, Suspense } from 'react';
import { translations } from './constants/translations';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import CookieConsent from './components/CookieConsent';
import LoadingSpinner from './components/LoadingSpinner';
import reportWebVitals from './utils/reportWebVitals';

const About = lazy(() => import('./components/About'));
const Services = lazy(() => import('./components/Services'));
const Projects = lazy(() => import('./components/Projects'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const ContactForm = lazy(() => import('./components/ContactForm'));
const Footer = lazy(() => import('./components/Footer'));

const KitanskiWebsite = () => {
  const [language, setLanguage] = useState('bg');
  const [cookieConsent, setCookieConsent] = useState(null);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (consent) {
      setCookieConsent(consent === 'accepted');
    }

    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && (savedLanguage === 'bg' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }

    // Load theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        setTheme('dark');
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  // Load Google Analytics only after user consent (GDPR compliance)
  useEffect(() => {
    if (cookieConsent === true) {
      const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

      if (!GA_MEASUREMENT_ID) {
        if (import.meta.env.DEV) {
          console.warn('Google Analytics ID not configured');
        }
        return;
      }

      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;

      // Load GA script
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      script.async = true;
      document.head.appendChild(script);

      // Configure GA and start Web Vitals tracking
      script.onload = () => {
        gtag('js', new Date());
        gtag('config', GA_MEASUREMENT_ID);

        // Start tracking Web Vitals after GA is loaded
        reportWebVitals();
      };
    }
  }, [cookieConsent]);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setCookieConsent(true);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setCookieConsent(false);
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'bg' ? 'en' : 'bg';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    const metaTags =
      language === 'bg'
        ? {
            title:
              'Kitanski - Project Management София | Строителство & Ремонт',
            description:
              'Професионално управление на строителни проекти в София. Жилищно строителство, ремонтни дейности, обзавеждане, технически надзор. 8+ години опит. ☎ +359 878 34 94 53',
            keywords:
              'project management софия, строителство софия, ремонтни дейности, жилищно строителство, обзавеждане, фирма за ремонт, технически надзор, консултации строителство, project manager българия, ремонт на ново строителство',
          }
        : {
            title:
              'Kitanski - Project Management Sofia | Construction & Renovation',
            description:
              'Professional construction project management in Sofia. Residential construction, renovation, interior design, technical supervision. 8+ years of experience. ☎ +359 878 34 94 53',
            keywords:
              'project management sofia, construction sofia, renovation services, residential construction, interior design, construction consulting, technical supervision, project manager bulgaria',
          };

    document.title = metaTags.title;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = metaTags.description;

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = metaTags.keywords;

    const ogTags = [
      { property: 'og:title', content: metaTags.title },
      { property: 'og:description', content: metaTags.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://kitansky.com' },
      { property: 'og:image', content: 'https://kitansky.com/og-image.jpg' },
      { property: 'og:locale', content: language === 'bg' ? 'bg_BG' : 'en_US' },
    ];

    ogTags.forEach((tag) => {
      let metaTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', tag.property);
        document.head.appendChild(metaTag);
      }
      metaTag.content = tag.content;
    });

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Kitanski Project Management',
      description: metaTags.description,
      url: 'https://kitansky.com',
      telephone: '+359878349453',
      email: 'kitanskitsvetelin@gmail.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Sofia',
        addressCountry: 'BG',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '42.6977',
        longitude: '23.3219',
      },
      priceRange: '$$',
      areaServed: {
        '@type': 'City',
        name: 'Sofia',
      },
      serviceType: [
        'Project Management',
        'Construction Management',
        'Residential Construction',
        'Renovation Services',
        'Technical Supervision',
        'Construction Consulting',
      ],
      founder: {
        '@type': 'Person',
        name: 'Tsvetelin Kitanski',
        jobTitle: 'Project Manager',
      },
    };

    let scriptTag = document.querySelector(
      'script[type="application/ld+json"]'
    );
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);
  }, [language]);

  // Scroll animations - optimized observer for lazy-loaded components
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Track observed elements to avoid duplicates
    const observedElements = new Set();

    const observeElements = () => {
      const elements = document.querySelectorAll('.scroll-animate');
      elements.forEach((el) => {
        if (!observedElements.has(el)) {
          observer.observe(el);
          observedElements.add(el);
        }
      });
    };

    // Initial observation
    observeElements();

    // Use MutationObserver to detect new elements (more efficient than multiple timeouts)
    const mutationObserver = new MutationObserver((mutations) => {
      // Check if any new nodes with scroll-animate class were added
      let hasNewElements = false;
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // Element node
            if (node.classList?.contains('scroll-animate') ||
                node.querySelector?.('.scroll-animate')) {
              hasNewElements = true;
            }
          }
        });
      });

      if (hasNewElements) {
        observeElements();
      }
    });

    // Observe DOM changes for lazy-loaded components
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      observedElements.clear(); // Clear the Set to prevent memory leaks
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-neutral-100 to-stone-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-stone-200/30 dark:bg-slate-700/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-neutral-200/30 dark:bg-slate-700/30 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <CookieConsent
        cookieConsent={cookieConsent}
        acceptCookies={acceptCookies}
        declineCookies={declineCookies}
        translations={translations}
        language={language}
      />

      <Navigation
        language={language}
        toggleLanguage={toggleLanguage}
        theme={theme}
        toggleTheme={toggleTheme}
        translations={translations}
      />

      <main id="main-content">
        <Hero translations={translations} language={language} />

      <Suspense fallback={<LoadingSpinner language={language} />}>
        <About translations={translations} language={language} />
      </Suspense>

      <Suspense fallback={<LoadingSpinner language={language} />}>
        <Services translations={translations} language={language} />
      </Suspense>

      <Suspense fallback={<LoadingSpinner language={language} />}>
        <Projects translations={translations} language={language} />
      </Suspense>

      <Suspense fallback={<LoadingSpinner language={language} />}>
        <Testimonials translations={translations} language={language} />
      </Suspense>

      <Suspense fallback={<LoadingSpinner language={language} />}>
        <ContactForm translations={translations} language={language} />
      </Suspense>

      <Suspense fallback={<LoadingSpinner language={language} />}>
        <Footer translations={translations} language={language} />
      </Suspense>
      </main>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-from-right {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-from-left {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-from-bottom {
          from {
            opacity: 0;
            transform: translateY(80px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-fade-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .scroll-animate {
          opacity: 0;
        }

        .scroll-animate.animate-in {
          animation-fill-mode: forwards;
        }

        .scroll-animate.slide-from-right.animate-in {
          animation: slide-from-right 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)
            forwards;
        }

        .scroll-animate.slide-from-left.animate-in {
          animation: slide-from-left 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)
            forwards;
        }

        .scroll-animate.slide-from-bottom.animate-in {
          animation: slide-from-bottom 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)
            forwards;
        }

        .scroll-animate.scale-fade-in.animate-in {
          animation: scale-fade-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)
            forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }

        .animation-delay-800 {
          animation-delay: 0.8s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default KitanskiWebsite;
