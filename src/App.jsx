import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Award,
  CheckCircle,
  Menu,
  X,
  Linkedin,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Globe,
  Cookie,
} from "lucide-react";
import emailjs from "@emailjs/browser";

const KitanskiWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [language, setLanguage] = useState("bg");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [cookieConsent, setCookieConsent] = useState(null);

  // Check cookie consent and language preference on mount
  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (consent) {
      setCookieConsent(consent === "accepted");
    }

    // Load saved language preference
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && (savedLanguage === "bg" || savedLanguage === "en")) {
      setLanguage(savedLanguage);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setCookieConsent(true);
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "declined");
    setCookieConsent(false);
  };

  // Translations
  const translations = {
    bg: {
      nav: {
        home: "Начало",
        about: "За мен",
        projects: "Проекти",
        services: "Услуги",
        contact: "Контакти",
        blog: "Блог",
        privacy: "Поверителност",
      },
      hero: {
        title: "Kitanski",
        subtitle: "Project & Property Management",
        experience: "8+ години опит",
        projects: "15+ проекта",
        quality: "100% качество",
        description:
          "Професионално управление на строителни проекти с фокус върху качество, срокове и иновации",
        viewProjects: "Разгледай проекти",
        contactMe: "Свържи се с мен",
      },
      about: {
        title: "За мен",
        name: "Цветелин Китански",
        intro: "Project Manager със солиден опит в строителната индустрия.",
        career:
          "Започнах кариерата си като работник на обект, преминах през позицията на технически ръководител и днес управлявам цялостни строителни проекти от началото до края.",
        vision:
          "Моята визия е да създавам качествени проекти, които съчетават функционалност, естетика и устойчивост, като винаги спазвам срокове и бюджет.",
        experienceTitle: "Опит",
        experienceText: "8+ години в строителството",
        specializationTitle: "Специализация",
        specializationText: "Project Management & Технически надзор",
        completedTitle: "Завършени проекти",
        completedText: "15+ успешно реализирани обекта",
      },
      services: {
        title: "Услуги",
        pm: {
          title: "Project Management",
          description:
            "Пълно управление на строителни проекти от концепция до завършване",
        },
        supervision: {
          title: "Технически надзор",
          description:
            "Професионален технически контрол и координация на строителния процес",
        },
        consulting: {
          title: "Консултации",
          description:
            "Експертни консултации за оптимизация на строителни процеси",
        },
      },
      projectsSection: {
        title: "Проекти",
        viewGallery: "Виж галерия",
        media: "медия",
        disclaimer:
          "Изображенията са примерни илюстрации. Реалните снимки от завършените проекти не могат да бъдат публикувани онлайн поради авторски права и политики за поверителност на клиентите.",
      },
      contact: {
        title: "Контакти",
        connectTitle: "Свържете се с мен",
        followMe: "Последвай ме:",
        sendTitle: "Изпрати запитване",
        name: "Име",
        email: "Имейл",
        phone: "Телефон",
        message: "Съобщение",
        sendButton: "Изпрати запитване",
        sending: "Изпраща се...",
        successMessage:
          "Съобщението е изпратено успешно! Ще се свържа с вас скоро.",
        errorMessage:
          "Грешка при изпращане. Моля, опитайте отново или ми пишете директно на имейл.",
        namePlaceholder: "Вашето име",
        emailPlaceholder: "your.email@example.com",
        phonePlaceholder: "+359 XXX XXX XXX",
        messagePlaceholder: "Разкажете ми за вашия проект...",
      },
      footer: {
        rights: "© 2024 Kitanski Project Management. Всички права запазени.",
        tagline: "Разработено за строителната индустрия",
        privacy: "Политика за поверителност",
      },
      cookies: {
        title: "Бисквитки",
        message:
          "Този сайт използва бисквитки за подобряване на потребителското изживяване и анализ на трафика.",
        accept: "Приемам",
        decline: "Отказвам",
        learnMore: "Научете повече",
      },
      privacy: {
        title: "Политика за поверителност",
        lastUpdated: "Последна актуализация: 19 ноември 2024",
        intro:
          "Kitanski зачита вашата поверителност. Тази политика описва как събираме, използваме и защитаваме вашата лична информация.",
        section1Title: "1. Информация, която събираме",
        section1Text:
          "Събираме само информацията, която доброволно предоставяте чрез контактната форма: име, имейл адрес, телефонен номер и съобщение.",
        section2Title: "2. Как използваме информацията",
        section2Text:
          "Използваме предоставената информация единствено за да отговорим на вашето запитване и да предоставим исканата услуга. Не продаваме и не споделяме вашите данни с трети страни.",
        section3Title: "3. Бисквитки",
        section3Text:
          "Използваме само необходими бисквитки за функционалност на сайта. Можете да откажете използването на бисквитки чрез банера за съгласие.",
        section4Title: "4. Вашите права",
        section4Text:
          "Имате право на достъп, коригиране или изтриване на вашите лични данни. За упражняване на тези права, свържете се с нас на kitanskitsvetelin@gmail.com.",
        section5Title: "5. Сигурност",
        section5Text:
          "Прилагаме подходящи технически и организационни мерки за защита на вашите лични данни.",
        section6Title: "6. Контакт",
        section6Text: "За въпроси относно тази политика, свържете се с нас:",
        close: "Затвори",
      },
      projects: {
        doml2: {
          title: "Жилищен комплекс - Нов квартал",
          company: "Строителна компания",
          location: "София",
          description:
            "Цялостно управление на строителството на изцяло нов жилищен квартал. Пълна координация от изкопни работи до Акт 16 и довършителни работи. Организация на всички етапи - конструкция, фасади (EPS и окачена фасада), инсталации, общи части. Изготвяне на графици, договаряне на цени с подизпълнители и контрол на качеството.",
          role: "Project Manager",
          category: "Жилищно строителство",
        },
        corner: {
          title: "Жилищна сграда - Фасадни системи и инсталации",
          company: "Строителна компания",
          location: "София",
          description:
            "Управление на фасадни работи (EPS топлоизолация и окачена фасада) и технически инсталации. Организация и координация на подово отопление, изработване на изпълнителни графици и контрол на срокове. Договаряне с подизпълнители и осигуряване на качество.",
          role: "Технически ръководител",
          category: "Жилищно строителство",
        },
        fountains: {
          title: "Жилищна сграда - Общи части по дизайнерски проект",
          company: "Строителна компания",
          location: "София",
          description:
            "Изпълнение на общи части на жилищна сграда по дизайнерски проект. Координация на довършителни работи, управление на различни занаятчийски екипи и спазване на проектна документация. Организация на материали и контрол на качеството на изпълнение.",
          role: "Project Manager",
          category: "Жилищно строителство",
        },
      },
    },
    en: {
      nav: {
        home: "Home",
        about: "About",
        projects: "Projects",
        services: "Services",
        contact: "Contact",
        blog: "Blog",
        privacy: "Privacy",
      },
      hero: {
        title: "Kitanski",
        subtitle: "Project & Property Management",
        experience: "8+ years experience",
        projects: "15+ projects",
        quality: "100% quality",
        description:
          "Professional construction project management with focus on quality, deadlines and innovation",
        viewProjects: "View Projects",
        contactMe: "Contact Me",
      },
      about: {
        title: "About Me",
        name: "Tsvetelin Kitanski",
        intro:
          "Project Manager with solid experience in the construction industry.",
        career:
          "I started my career as a construction worker, progressed through the position of technical manager, and today I manage complete construction projects from start to finish.",
        vision:
          "My vision is to create quality projects that combine functionality, aesthetics and sustainability, while always meeting deadlines and budgets.",
        experienceTitle: "Experience",
        experienceText: "8+ years in construction",
        specializationTitle: "Specialization",
        specializationText: "Project Management & Technical Supervision",
        completedTitle: "Completed Projects",
        completedText: "15+ successfully realized projects",
      },
      services: {
        title: "Services",
        pm: {
          title: "Project Management",
          description:
            "Complete management of construction projects from concept to completion",
        },
        supervision: {
          title: "Technical Supervision",
          description:
            "Professional technical control and coordination of the construction process",
        },
        consulting: {
          title: "Consulting",
          description:
            "Expert consulting for optimization of construction processes",
        },
      },
      projectsSection: {
        title: "Projects",
        viewGallery: "View Gallery",
        media: "media",
        disclaimer:
          "Images are illustrative examples. Actual photos from completed projects cannot be published online due to copyright and client confidentiality policies.",
      },
      contact: {
        title: "Contact",
        connectTitle: "Get in Touch",
        followMe: "Follow me:",
        sendTitle: "Send Inquiry",
        name: "Name",
        email: "Email",
        phone: "Phone",
        message: "Message",
        sendButton: "Send Inquiry",
        sending: "Sending...",
        successMessage: "Message sent successfully! I will contact you soon.",
        errorMessage:
          "Error sending message. Please try again or email me directly.",
        namePlaceholder: "Your name",
        emailPlaceholder: "your.email@example.com",
        phonePlaceholder: "+359 XXX XXX XXX",
        messagePlaceholder: "Tell me about your project...",
      },
      footer: {
        rights: "© 2024 Kitanski Project Management. All rights reserved.",
        tagline: "Developed with ❤️ for the construction industry",
        privacy: "Privacy Policy",
      },
      cookies: {
        title: "Cookies",
        message:
          "This website uses cookies to improve user experience and analyze traffic.",
        accept: "Accept",
        decline: "Decline",
        learnMore: "Learn more",
      },
      privacy: {
        title: "Privacy Policy",
        lastUpdated: "Last updated: November 19, 2024",
        intro:
          "Kitanski respects your privacy. This policy describes how we collect, use, and protect your personal information.",
        section1Title: "1. Information We Collect",
        section1Text:
          "We only collect information you voluntarily provide through the contact form: name, email address, phone number, and message.",
        section2Title: "2. How We Use Information",
        section2Text:
          "We use the provided information solely to respond to your inquiry and provide the requested service. We do not sell or share your data with third parties.",
        section3Title: "3. Cookies",
        section3Text:
          "We only use necessary cookies for site functionality. You can decline cookie usage through the consent banner.",
        section4Title: "4. Your Rights",
        section4Text:
          "You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at kitanskitsvetelin@gmail.com.",
        section5Title: "5. Security",
        section5Text:
          "We implement appropriate technical and organizational measures to protect your personal data.",
        section6Title: "6. Contact",
        section6Text: "For questions about this policy, contact us:",
        close: "Close",
      },
      projects: {
        doml2: {
          title: "Residential Complex - New District",
          company: "Construction Company",
          location: "Sofia",
          description:
            "Complete management of construction of an entirely new residential district. Full coordination from excavation to Act 16 and finishing works. Organization of all stages - structure, facades (EPS and ventilated facade), installations, common areas. Schedule preparation, subcontractor price negotiation, and quality control.",
          role: "Project Manager",
          category: "Residential Construction",
        },
        corner: {
          title: "Residential Building - Facade Systems and Installations",
          company: "Construction Company",
          location: "Sofia",
          description:
            "Management of facade works (EPS insulation and ventilated facade) and technical installations. Organization and coordination of underfloor heating, execution schedule development, and deadline control. Subcontractor negotiations and quality assurance.",
          role: "Technical Manager",
          category: "Residential Construction",
        },
        fountains: {
          title: "Residential Building - Common Areas by Design Project",
          company: "Construction Company",
          location: "Sofia",
          description:
            "Execution of common areas in residential building according to design project. Coordination of finishing works, management of various craft teams, and adherence to project documentation. Material organization and execution quality control.",
          role: "Project Manager",
          category: "Residential Construction",
        },
      },
    },
  };

  const t = translations[language];

  // Set page title and meta tags for SEO
  useEffect(() => {
    const metaTags =
      language === "bg"
        ? {
            title:
              "Kitanski - Project Management София | Строителство & Ремонт",
            description:
              "Професионално управление на строителни проекти в София. Жилищно строителство, ремонтни дейности, обзавеждане, технически надзор. 8+ години опит. ☎ +359 878 34 94 53",
            keywords:
              "project management софия, строителство софия, ремонтни дейности, жилищно строителство, обзавеждане, фирма за ремонт, технически надзор, консултации строителство, project manager българия, ремонт на ново строителство",
          }
        : {
            title:
              "Kitanski - Project Management Sofia | Construction & Renovation",
            description:
              "Professional construction project management in Sofia. Residential construction, renovation, interior design, technical supervision. 8+ years of experience. ☎ +359 878 34 94 53",
            keywords:
              "project management sofia, construction sofia, renovation services, residential construction, interior design, construction consulting, technical supervision, project manager bulgaria",
          };

    document.title = metaTags.title;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = metaTags.description;

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.name = "keywords";
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = metaTags.keywords;

    const ogTags = [
      { property: "og:title", content: metaTags.title },
      { property: "og:description", content: metaTags.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://kitansky.com" },
      { property: "og:image", content: "https://kitansky.com/og-image.jpg" },
      { property: "og:locale", content: language === "bg" ? "bg_BG" : "en_US" },
    ];

    ogTags.forEach((tag) => {
      let metaTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (!metaTag) {
        metaTag = document.createElement("meta");
        metaTag.setAttribute("property", tag.property);
        document.head.appendChild(metaTag);
      }
      metaTag.content = tag.content;
    });

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Kitanski Project Management",
      description: metaTags.description,
      url: "https://kitansky.com",
      telephone: "+359878349453",
      email: "kitanskitsvetelin@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Sofia",
        addressCountry: "BG",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "42.6977",
        longitude: "23.3219",
      },
      priceRange: "$$",
      areaServed: {
        "@type": "City",
        name: "Sofia",
      },
      serviceType: [
        "Project Management",
        "Construction Management",
        "Residential Construction",
        "Renovation Services",
        "Technical Supervision",
        "Construction Consulting",
      ],
      founder: {
        "@type": "Person",
        name: "Tsvetelin Kitanski",
        jobTitle: "Project Manager",
      },
    };

    let scriptTag = document.querySelector(
      'script[type="application/ld+json"]'
    );
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);
  }, [language]);

  // Scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(".scroll-animate");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const toggleLanguage = () => {
    const newLanguage = language === "bg" ? "en" : "bg";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const validateEmail = (email) => {
    // Split email into username and domain
    const parts = email.split('@');
    if (parts.length !== 2) return false;

    const [username, domain] = parts;

    // Username MUST contain at least one letter (not just numbers)
    if (!/[a-zA-Z]/.test(username)) return false;

    // Full email format validation
    const emailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = language === "bg" ? "Моля въведете име" : "Please enter your name";
    } else if (!/[a-zA-Zа-яА-Я]/.test(formData.name)) {
      errors.name = language === "bg" ? "Името трябва да съдържа поне една буква" : "Name must contain at least one letter";
    }

    if (!formData.email.trim()) {
      errors.email = language === "bg" ? "Моля въведете email" : "Please enter your email";
    } else if (!validateEmail(formData.email)) {
      errors.email = language === "bg" ? "Невалиден email адрес" : "Invalid email address";
    }

    // Validate phone if provided
    if (formData.phone.trim()) {
      // Phone must start with + or digit, end with digit, proper format
      const phoneRegex = /^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/;
      const digitsOnly = formData.phone.replace(/\D/g, '');

      if (digitsOnly.length < 5) {
        errors.phone = language === "bg" ? "Телефонният номер трябва да съдържа поне 5 цифри" : "Phone number must contain at least 5 digits";
      } else if (digitsOnly.length > 15) {
        errors.phone = language === "bg" ? "Телефонният номер е твърде дълъг" : "Phone number is too long";
      } else if (!phoneRegex.test(formData.phone)) {
        errors.phone = language === "bg" ? "Невалиден формат на телефонен номер" : "Invalid phone number format";
      }
    }

    if (!formData.message.trim()) {
      errors.message = language === "bg" ? "Моля въведете съобщение" : "Please enter a message";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // For phone field, allow only numbers, +, -, spaces, and parentheses
    if (name === 'phone') {
      const sanitizedValue = value.replace(/[^0-9+\s\-()]/g, '');
      setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submitting
    if (!validateForm()) {
      return;
    }

    setFormStatus("sending");

    try {
      const templateParams = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || "Not specified",
        message: formData.message,
        reply_to: formData.email,
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setFormStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });

      setTimeout(() => setFormStatus(""), 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setFormStatus("error");
      setTimeout(() => setFormStatus(""), 5000);
    }
  };

  const openGallery = (project, mediaIndex = 0) => {
    setCurrentProject(project);
    setCurrentMediaIndex(mediaIndex);
    setGalleryOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeGallery = () => {
    setGalleryOpen(false);
    setCurrentProject(null);
    setCurrentMediaIndex(0);
    document.body.style.overflow = "unset";
  };

  const nextMedia = () => {
    if (currentProject && currentMediaIndex < currentProject.media.length - 1) {
      setCurrentMediaIndex(currentMediaIndex + 1);
    }
  };

  const prevMedia = () => {
    if (currentMediaIndex > 0) {
      setCurrentMediaIndex(currentMediaIndex - 1);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!galleryOpen) return;

      if (e.key === "Escape") closeGallery();
      if (e.key === "ArrowRight") nextMedia();
      if (e.key === "ArrowLeft") prevMedia();
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [galleryOpen, currentMediaIndex, currentProject]);

  // Projects with royalty-free Unsplash images
  const projects = [
    {
      id: 1,
      title: t.projects.doml2.title,
      company: t.projects.doml2.company,
      location: t.projects.doml2.location,
      description: t.projects.doml2.description,
      role: t.projects.doml2.role,
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      category: t.projects.doml2.category,
      media: [
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=900&fit=crop",
          caption: language === "bg" ? "Външен изглед" : "Exterior view",
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=900&fit=crop",
          caption: language === "bg" ? "Фасада" : "Facade",
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1200&h=900&fit=crop",
          caption:
            language === "bg" ? "Строителен процес" : "Construction process",
        },
      ],
    },
    {
      id: 2,
      title: t.projects.corner.title,
      company: t.projects.corner.company,
      location: t.projects.corner.location,
      description: t.projects.corner.description,
      role: t.projects.corner.role,
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
      category: t.projects.corner.category,
      media: [
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=900&fit=crop",
          caption: language === "bg" ? "Бизнес сграда" : "Business building",
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=900&fit=crop",
          caption: language === "bg" ? "Интериор" : "Interior",
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=900&fit=crop",
          caption: language === "bg" ? "Работно пространство" : "Workspace",
        },
      ],
    },
    {
      id: 3,
      title: t.projects.fountains.title,
      company: t.projects.fountains.company,
      location: t.projects.fountains.location,
      description: t.projects.fountains.description,
      role: t.projects.fountains.role,
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
      category: t.projects.fountains.category,
      media: [
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=900&fit=crop",
          caption: language === "bg" ? "Луксозна сграда" : "Luxury building",
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=900&fit=crop",
          caption:
            language === "bg" ? "Модерна архитектура" : "Modern architecture",
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=900&fit=crop",
          caption: language === "bg" ? "Вътрешен двор" : "Interior courtyard",
        },
      ],
    },
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-neutral-100 to-stone-100 text-slate-900">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-stone-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-neutral-200/30 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Cookie Consent Banner */}
      {cookieConsent === null && (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900 text-white p-6 shadow-2xl z-50 border-t-4 border-stone-600">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Cookie size={32} className="text-stone-300 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-1">{t.cookies.title}</h3>
                <p className="text-stone-300 text-sm">{t.cookies.message}</p>
              </div>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <a
                href="/privacy.html"
                className="px-4 py-2 text-stone-300 hover:text-white transition-colors text-sm underline"
              >
                {t.cookies.learnMore}
              </a>
              <button
                onClick={declineCookies}
                className="px-6 py-2 bg-stone-700 hover:bg-stone-600 rounded-full transition-colors font-medium"
              >
                {t.cookies.decline}
              </button>
              <button
                onClick={acceptCookies}
                className="px-6 py-2 bg-gradient-to-r from-stone-600 to-neutral-700 hover:from-stone-700 hover:to-neutral-800 rounded-full transition-colors font-bold shadow-lg"
              >
                {t.cookies.accept}
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg z-50 border-b border-stone-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-stone-700 to-neutral-700 bg-clip-text text-transparent">
                Kitanski
              </h1>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {Object.values(t.nav).map((item, index) => {
                if (index === 5) {
                  return (
                    <a
                      key={item}
                      href="/blog.html"
                      className="text-slate-700 hover:text-stone-700 transition-all duration-300 font-medium relative group"
                    >
                      {item}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-stone-700 group-hover:w-full transition-all duration-300"></span>
                    </a>
                  );
                }
                if (index === 6) {
                  return (
                    <a
                      key={item}
                      href="/privacy.html"
                      className="text-slate-700 hover:text-stone-700 transition-all duration-300 font-medium relative group"
                    >
                      {item}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-stone-700 group-hover:w-full transition-all duration-300"></span>
                    </a>
                  );
                }
                return (
                  <button
                    key={item}
                    onClick={() => {
                      scrollToSection(
                        ["home", "about", "projects", "services", "contact"][
                          index
                        ]
                      );
                    }}
                    className="text-slate-700 hover:text-stone-700 transition-all duration-300 font-medium relative group"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-stone-700 group-hover:w-full transition-all duration-300"></span>
                  </button>
                );
              })}

              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-stone-600 to-neutral-700 text-white rounded-full hover:from-stone-700 hover:to-neutral-800 transition-all duration-300 font-bold shadow-lg"
              >
                <Globe size={18} />
                <span>{language === "bg" ? "EN" : "BG"}</span>
              </button>
            </div>

            <div className="md:hidden flex items-center gap-3">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-stone-600 to-neutral-700 text-white rounded-full text-sm font-bold"
              >
                <Globe size={16} />
                {language === "bg" ? "EN" : "BG"}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-700 hover:text-stone-700"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-stone-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {Object.values(t.nav).map((item, index) => {
                if (index === 5) {
                  return (
                    <a
                      key={item}
                      href="/blog.html"
                      className="block w-full text-left px-3 py-2 text-slate-700 hover:text-stone-700 hover:bg-stone-50 rounded-md transition-colors"
                    >
                      {item}
                    </a>
                  );
                }
                if (index === 6) {
                  return (
                    <a
                      key={item}
                      href="/privacy.html"
                      className="block w-full text-left px-3 py-2 text-slate-700 hover:text-stone-700 hover:bg-stone-50 rounded-md transition-colors"
                    >
                      {item}
                    </a>
                  );
                }
                return (
                  <button
                    key={item}
                    onClick={() => {
                      scrollToSection(
                        ["home", "about", "projects", "services", "contact"][
                          index
                        ]
                      );
                    }}
                    className="block w-full text-left px-3 py-2 text-slate-700 hover:text-stone-700 hover:bg-stone-50 rounded-md transition-colors"
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      <section
        id="home"
        className="min-h-screen flex items-center justify-center pt-20 px-4 relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop&q=90"
            alt="Luxury Building"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/50 to-neutral-900/50"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="space-y-8">
            <div className="overflow-hidden">
              <h2 className="text-7xl md:text-9xl font-black mb-6 bg-gradient-to-r from-stone-200 via-white to-neutral-200 bg-clip-text text-transparent animate-fade-in-up inline-block drop-shadow-2xl">
                {t.hero.title}
              </h2>
            </div>

            <h3 className="text-2xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up animation-delay-200 drop-shadow-lg">
              {t.hero.subtitle}
            </h3>

            <div className="flex flex-wrap gap-3 justify-center mb-8 animate-fade-in-up animation-delay-400">
              <span className="px-6 py-3 bg-white/90 backdrop-blur-sm border-2 border-white/50 rounded-full text-sm font-bold text-slate-900 shadow-2xl hover:scale-105 transition-transform hover:bg-white">
                ✓ {t.hero.experience}
              </span>
              <span className="px-6 py-3 bg-white/90 backdrop-blur-sm border-2 border-white/50 rounded-full text-sm font-bold text-slate-900 shadow-2xl hover:scale-105 transition-transform hover:bg-white">
                ✓ {t.hero.projects}
              </span>
              <span className="px-6 py-3 bg-white/90 backdrop-blur-sm border-2 border-white/50 rounded-full text-sm font-bold text-slate-900 shadow-2xl hover:scale-105 transition-transform hover:bg-white">
                ✓ {t.hero.quality}
              </span>
            </div>

            <p className="text-xl md:text-2xl text-stone-100 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-600 drop-shadow-lg font-medium">
              {t.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-800">
              <button
                onClick={() => scrollToSection("projects")}
                className="px-10 py-5 bg-white hover:bg-stone-50 text-slate-900 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-2xl"
              >
                {t.hero.viewProjects} →
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="px-10 py-5 bg-gradient-to-r from-stone-700 to-neutral-700 hover:from-stone-800 hover:to-neutral-800 text-white rounded-2xl font-bold transition-all duration-300 border-2 border-white/30 transform hover:scale-105 shadow-2xl"
              >
                {t.hero.contactMe}
              </button>
            </div>
          </div>

          <div className="mt-20 animate-bounce">
            <ChevronDown
              className="mx-auto text-white drop-shadow-lg"
              size={40}
            />
          </div>
        </div>
      </section>

      <section
        id="about"
        className="py-24 px-4 bg-white relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-64 h-64 bg-stone-100/60 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-neutral-100/60 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-16 bg-gradient-to-r from-stone-700 to-neutral-700 bg-clip-text text-transparent">
            {t.about.title}
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-white to-stone-50/50 p-10 rounded-3xl border border-stone-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <h3 className="text-4xl font-black text-transparent bg-gradient-to-r from-stone-700 to-neutral-700 bg-clip-text mb-6">
                  {t.about.name}
                </h3>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  {t.about.intro}
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  {t.about.career}
                </p>
                <p className="text-slate-600 leading-relaxed">
                  {t.about.vision}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div
                className="scroll-animate slide-from-right bg-gradient-to-br from-stone-600 to-neutral-700 p-8 rounded-3xl text-white shadow-2xl transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: "0.1s" }}
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
                style={{ animationDelay: "0.3s" }}
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
                style={{ animationDelay: "0.5s" }}
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

      <section
        id="services"
        className="py-24 px-4 bg-gradient-to-br from-stone-50 to-neutral-100"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-16 bg-gradient-to-r from-stone-700 to-neutral-700 bg-clip-text text-transparent">
            {t.services.title}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`scroll-animate slide-from-bottom group bg-white p-10 rounded-3xl border-2 border-stone-200 hover:border-stone-400 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl relative overflow-hidden`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-stone-200/30 to-neutral-200/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>

                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-stone-600 to-neutral-700 p-4 rounded-2xl inline-block mb-6 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-white">{service.icon}</div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-800">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-8 bg-gradient-to-r from-stone-700 to-neutral-700 bg-clip-text text-transparent">
            {t.projectsSection.title}
          </h2>

          {/* Disclaimer за снимките */}
          <div className="max-w-4xl mx-auto mb-12 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <svg
                  className="w-6 h-6 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                {t.projectsSection.disclaimer}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                onClick={() => openGallery(project, 0)}
                className="scroll-animate scale-fade-in group bg-gradient-to-br from-white to-stone-50/30 rounded-3xl overflow-hidden border-2 border-stone-100 hover:border-stone-300 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-stone-600 to-neutral-700 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg">
                    {project.category}
                  </div>
                  {project.media && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-slate-800 px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                      📸 {project.media.length} {t.projectsSection.media}
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 px-6 py-3 rounded-full font-bold text-slate-800 shadow-2xl">
                      {t.projectsSection.viewGallery} →
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2 text-slate-800 group-hover:text-stone-700 transition-colors">
                    {project.title}
                  </h3>
                  {project.company && (
                    <p className="text-stone-600 font-semibold mb-1">
                      🏢 {project.company}
                    </p>
                  )}
                  <p className="text-stone-600 mb-2">📍 {project.location}</p>
                  {project.role && (
                    <p className="text-stone-600 font-medium mb-3">
                      👔 {project.role}
                    </p>
                  )}
                  <p className="text-slate-600 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="py-24 px-4 bg-gradient-to-br from-stone-50 to-neutral-50"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-16 bg-gradient-to-r from-stone-700 to-neutral-700 bg-clip-text text-transparent">
            {t.contact.title}
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="bg-white p-10 rounded-3xl border-2 border-stone-200 shadow-xl">
                <h3 className="text-3xl font-bold mb-8 text-transparent bg-gradient-to-r from-stone-700 to-neutral-700 bg-clip-text">
                  {t.contact.connectTitle}
                </h3>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-slate-700 hover:text-stone-700 transition-colors group">
                    <div className="bg-gradient-to-br from-stone-600 to-neutral-700 p-3 rounded-2xl group-hover:scale-110 transition-transform">
                      <Mail className="text-white" size={24} />
                    </div>
                    <a
                      href="mailto:kitanskitsvetelin@gmail.com"
                      className="text-lg font-medium"
                    >
                      kitanskitsvetelin@gmail.com
                    </a>
                  </div>

                  <div className="flex items-center gap-4 text-slate-700 group">
                    <div className="bg-gradient-to-br from-stone-600 to-neutral-700 p-3 rounded-2xl group-hover:scale-110 transition-transform">
                      <Phone className="text-white" size={24} />
                    </div>
                    <a href="tel:+359878349453" className="text-lg font-medium">
                      +359 878 34 94 53
                    </a>
                  </div>

                  <div className="flex items-center gap-4 text-slate-700 group">
                    <div className="bg-gradient-to-br from-stone-600 to-neutral-700 p-3 rounded-2xl group-hover:scale-110 transition-transform">
                      <MapPin className="text-white" size={24} />
                    </div>
                    <span className="text-lg font-medium">
                      {language === "bg"
                        ? "София, България"
                        : "Sofia, Bulgaria"}
                    </span>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t-2 border-stone-100">
                  <p className="text-slate-700 mb-4 font-semibold">
                    {t.contact.followMe}
                  </p>
                  <div className="flex gap-4">
                    <a
                      href="https://www.linkedin.com/in/tsvetelin-kitanski-07819a183/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-br from-stone-600 to-neutral-700 hover:from-stone-700 hover:to-neutral-800 p-4 rounded-2xl transition-all transform hover:scale-110 shadow-lg"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={24} className="text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 rounded-3xl border-2 border-stone-200 shadow-xl">
              <h3 className="text-3xl font-bold mb-8 text-transparent bg-gradient-to-r from-stone-700 to-neutral-700 bg-clip-text">
                {t.contact.sendTitle}
              </h3>

              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-bold text-slate-700 mb-2"
                  >
                    {t.contact.name} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    aria-label={t.contact.name}
                    aria-required="true"
                    className={`w-full px-5 py-4 bg-stone-50/50 border-2 ${formErrors.name ? 'border-red-500' : 'border-stone-200'} rounded-2xl focus:ring-2 focus:ring-stone-500 focus:border-stone-500 outline-none transition-all text-slate-800 font-medium`}
                    placeholder={t.contact.namePlaceholder}
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold text-slate-700 mb-2"
                  >
                    {t.contact.email} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    aria-label={t.contact.email}
                    aria-required="true"
                    className={`w-full px-5 py-4 bg-stone-50/50 border-2 ${formErrors.email ? 'border-red-500' : 'border-stone-200'} rounded-2xl focus:ring-2 focus:ring-stone-500 focus:border-stone-500 outline-none transition-all text-slate-800 font-medium`}
                    placeholder={t.contact.emailPlaceholder}
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-bold text-slate-700 mb-2"
                  >
                    {t.contact.phone}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    inputMode="numeric"
                    aria-label={t.contact.phone}
                    className={`w-full px-5 py-4 bg-stone-50/50 border-2 ${formErrors.phone ? 'border-red-500' : 'border-stone-200'} rounded-2xl focus:ring-2 focus:ring-stone-500 focus:border-stone-500 outline-none transition-all text-slate-800 font-medium`}
                    placeholder={t.contact.phonePlaceholder}
                  />
                  {formErrors.phone && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-bold text-slate-700 mb-2"
                  >
                    {t.contact.message} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    aria-label={t.contact.message}
                    aria-required="true"
                    className={`w-full px-5 py-4 bg-stone-50/50 border-2 ${formErrors.message ? 'border-red-500' : 'border-stone-200'} rounded-2xl focus:ring-2 focus:ring-stone-500 focus:border-stone-500 outline-none transition-all text-slate-800 font-medium resize-none`}
                    placeholder={t.contact.messagePlaceholder}
                  />
                  {formErrors.message && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="w-full px-10 py-5 bg-gradient-to-r from-stone-700 to-neutral-700 hover:from-stone-800 hover:to-neutral-800 text-white rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-stone-500/30 text-lg"
                >
                  {formStatus === "sending"
                    ? t.contact.sending
                    : `${t.contact.sendButton} →`}
                </button>

                {formStatus === "success" && (
                  <div className="bg-green-100 border-2 border-green-500 text-green-700 px-6 py-4 rounded-2xl font-semibold">
                    ✓ {t.contact.successMessage}
                  </div>
                )}

                {formStatus === "error" && (
                  <div className="bg-red-100 border-2 border-red-500 text-red-700 px-6 py-4 rounded-2xl font-semibold">
                    ✗ {t.contact.errorMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Lightbox */}
      {galleryOpen && currentProject && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeGallery}
        >
          <button
            onClick={closeGallery}
            className="absolute top-6 right-6 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-full transition-all"
          >
            <X size={32} className="text-white" />
          </button>

          {currentMediaIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevMedia();
              }}
              className="absolute left-6 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-full transition-all"
            >
              <ChevronLeft size={32} className="text-white" />
            </button>
          )}

          {currentMediaIndex < currentProject.media.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextMedia();
              }}
              className="absolute right-6 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-full transition-all"
            >
              <ChevronRight size={32} className="text-white" />
            </button>
          )}

          <div
            className="max-w-7xl w-full px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-black/50 backdrop-blur-sm rounded-3xl p-8">
              <img
                src={currentProject.media[currentMediaIndex].src}
                alt={currentProject.media[currentMediaIndex].caption}
                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
              />

              <div className="mt-6 text-center">
                <p className="text-white text-xl font-semibold mb-2">
                  {currentProject.media[currentMediaIndex].caption}
                </p>
                <p className="text-stone-300 text-sm">
                  {currentMediaIndex + 1} / {currentProject.media.length}
                </p>
                <div className="mt-4 flex gap-2 justify-center flex-wrap">
                  {currentProject.media.map((media, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentMediaIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentMediaIndex
                          ? "bg-white w-8"
                          : "bg-white/40 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gradient-to-r from-slate-900 to-slate-800 border-t-4 border-stone-600 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-stone-100 text-lg font-semibold">
            {t.footer.rights}
          </p>
          <p className="text-slate-400 mt-3">{t.footer.tagline}</p>
          <div className="flex gap-4 justify-center mt-4">
            <a
              href="/blog.html"
              className="text-stone-300 hover:text-white underline transition-colors"
            >
              {t.nav.blog}
            </a>
            <span className="text-stone-600">•</span>
            <a
              href="/privacy.html"
              className="text-stone-300 hover:text-white underline transition-colors"
            >
              {t.footer.privacy}
            </a>
          </div>
        </div>
      </footer>

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
