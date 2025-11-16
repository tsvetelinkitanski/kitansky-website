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
  Play,
} from "lucide-react";
import emailjs from "@emailjs/browser";

const KitanSkyWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("sending");

    try {
      // EmailJS Integration
      const templateParams = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || "Не е посочен",
        message: formData.message,
        reply_to: formData.email,
      };

      await emailjs.send(
        "service_94n1zrf", // Service ID
        "template_aw7ixk3", // Template ID
        templateParams,
        "fEgB1v3-6_xRrvVHg" // Public Key
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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

  // Keyboard navigation
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

  const projects = [
    {
      id: 1,
      title: "ДОМЛ2 - Жилищен комплекс",
      company: "Домекс",
      location: "София, кв. Люлин",
      description:
        "10,000 м² РЗП жилищен комплекс със 144 апартамента, EPS топлоизолация и специфична архитектура. Пълно управление от изкоп и укрепване до Акт 16 и довършителни работи.",
      role: "Project Manager",
      image: "/projects/doml2_3d.jpg",
      category: "Жилищно строителство",
      media: [
        {
          type: "image",
          src: "/projects/doml2_3d.jpg",
          caption: "3D визуализация",
        },

        {
          type: "image",
          src: "/projects/DJI_0363.jpg",
          caption: "Aerial view - строителство",
        },
        {
          type: "image",
          src: "/projects/doml2_drone2.jpg",
          caption: "Drone снимка - общ изглед",
        },
      ],
    },
    {
      id: 2,
      title: "The Corner",
      company: "Инфинити",
      location: "София, ул. Черковна 20",
      description:
        "Участие в целия строителен процес от изкоп до довършителни работи като технически ръководител на проекта.",
      role: "Технически ръководител",
      image: "/projects/IMG_0146.jpg",
      category: "Довършителни работи",
      media: [
        {
          type: "image",
          src: "/projects/IMG_0146.jpg",
          caption: "Довършителни работи",
        },
        { type: "image", src: "/projects/IMG_0147.jpg", caption: "Интериор" },
        { type: "image", src: "/projects/IMG_0148.jpg", caption: "Детайли" },
        { type: "image", src: "/projects/IMG_0526.jpg", caption: "Фасада" },
        {
          type: "image",
          src: "/projects/IMG_0529.jpg",
          caption: "Завършен изглед",
        },
      ],
    },
    {
      id: 3,
      title: "Фонтани - Green District",
      company: "Домекс",
      location: "София, Драгалевци",
      description:
        "Луксозен жилищен комплекс с модерна архитектура и зелени площи. Управление на строителния процес от основи до завършване.",
      role: "Project Manager",
      image: "/projects/fountains_3d_sunset.jpg",
      category: "Жилищно строителство",
      media: [
        {
          type: "image",
          src: "/projects/fountains_3d_sunset.jpg",
          caption: "3D визуализация - залез",
        },
        {
          type: "image",
          src: "/projects/fountains_3d_day.jpg",
          caption: "3D визуализация - ден",
        },

        {
          type: "image",
          src: "/projects/fountains_construction1.jpg",
          caption: "Строителен процес",
        },
        {
          type: "image",
          src: "/projects/fountains_construction2.jpg",
          caption: "Конструкция",
        },
        {
          type: "image",
          src: "/projects/fountains_construction3.jpg",
          caption: "Груб строеж",
        },
        {
          type: "image",
          src: "/projects/fountains_construction4.jpg",
          caption: "Детайли на конструкцията",
        },
        {
          type: "image",
          src: "/projects/fountains_construction5.jpg",
          caption: "Общ изглед на обекта",
        },
      ],
    },
  ];

  const services = [
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Project Management",
      description:
        "Пълно управление на строителни проекти от концепция до завършване",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Технически надзор",
      description:
        "Професионален технически контрол и координация на строителния процес",
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Консултации",
      description: "Експертни консултации за оптимизация на строителни процеси",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-neutral-100 to-stone-100 text-slate-900">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-stone-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-neutral-200/30 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg z-50 border-b border-stone-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-stone-700 to-neutral-700 bg-clip-text text-transparent">
                KitanSky
              </h1>
            </div>

            <div className="hidden md:flex space-x-8">
              {["Начало", "За мен", "Проекти", "Услуги", "Контакти"].map(
                (item, index) => (
                  <button
                    key={item}
                    onClick={() =>
                      scrollToSection(
                        ["home", "about", "projects", "services", "contact"][
                          index
                        ]
                      )
                    }
                    className="text-slate-700 hover:text-stone-700 transition-all duration-300 font-medium relative group"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-stone-700 group-hover:w-full transition-all duration-300"></span>
                  </button>
                )
              )}
            </div>

            <div className="md:hidden">
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
              {["Начало", "За мен", "Проекти", "Услуги", "Контакти"].map(
                (item, index) => (
                  <button
                    key={item}
                    onClick={() =>
                      scrollToSection(
                        ["home", "about", "projects", "services", "contact"][
                          index
                        ]
                      )
                    }
                    className="block w-full text-left px-3 py-2 text-slate-700 hover:text-stone-700 hover:bg-stone-50 rounded-md transition-colors"
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </nav>

      <section
        id="home"
        className="min-h-screen flex items-center justify-center pt-20 px-4 relative overflow-hidden"
      >
        {/* Background Image with Overlay */}
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
                KitanSky
              </h2>
            </div>

            <h3 className="text-2xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up animation-delay-200 drop-shadow-lg">
              Project & Property Management
            </h3>

            <div className="flex flex-wrap gap-3 justify-center mb-8 animate-fade-in-up animation-delay-400">
              <span className="px-6 py-3 bg-white/90 backdrop-blur-sm border-2 border-white/50 rounded-full text-sm font-bold text-slate-900 shadow-2xl hover:scale-105 transition-transform hover:bg-white">
                ✓ 8+ години опит
              </span>
              <span className="px-6 py-3 bg-white/90 backdrop-blur-sm border-2 border-white/50 rounded-full text-sm font-bold text-slate-900 shadow-2xl hover:scale-105 transition-transform hover:bg-white">
                ✓ 15+ проекта
              </span>
              <span className="px-6 py-3 bg-white/90 backdrop-blur-sm border-2 border-white/50 rounded-full text-sm font-bold text-slate-900 shadow-2xl hover:scale-105 transition-transform hover:bg-white">
                ✓ 100% качество
              </span>
            </div>

            <p className="text-xl md:text-2xl text-stone-100 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-600 drop-shadow-lg font-medium">
              Професионално управление на строителни проекти с фокус върху
              качество, срокове и иновации
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-800">
              <button
                onClick={() => scrollToSection("projects")}
                className="px-10 py-5 bg-white hover:bg-stone-50 text-slate-900 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-2xl"
              >
                Разгледай проекти →
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="px-10 py-5 bg-gradient-to-r from-stone-700 to-neutral-700 hover:from-stone-800 hover:to-neutral-800 text-white rounded-2xl font-bold transition-all duration-300 border-2 border-white/30 transform hover:scale-105 shadow-2xl"
              >
                Свържи се с мен
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
            За мен
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-white to-stone-50/50 p-10 rounded-3xl border border-stone-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <h3 className="text-4xl font-black text-transparent bg-gradient-to-r from-stone-700 to-neutral-700 bg-clip-text mb-6">
                  Цветелин Китански
                </h3>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Project Manager със солиден опит в строителната индустрия.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Започнах кариерата си като работник на обект, преминах през
                  позицията на технически ръководител и днес управлявам цялостни
                  строителни проекти от началото до края.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Моята визия е да създавам качествени проекти, които съчетават
                  функционалност, естетика и устойчивост, като винаги спазвам
                  срокове и бюджет.
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
                  <h4 className="text-2xl font-bold">Опит</h4>
                </div>
                <p className="text-stone-50 text-lg">
                  8+ години в строителството
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
                  <h4 className="text-2xl font-bold">Специализация</h4>
                </div>
                <p className="text-neutral-50 text-lg">
                  Project Management & Технически надзор
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
                  <h4 className="text-2xl font-bold">Завършени проекти</h4>
                </div>
                <p className="text-stone-50 text-lg">
                  15+ успешно реализирани обекта
                </p>
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
            Услуги
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
          <h2 className="text-5xl md:text-6xl font-black text-center mb-16 bg-gradient-to-r from-stone-700 to-neutral-700 bg-clip-text text-transparent">
            Проекти
          </h2>

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
                      📸 {project.media.length} медия
                      {project.media.some((m) => m.type === "video") && (
                        <Play
                          size={16}
                          className="text-red-600"
                          fill="currentColor"
                        />
                      )}
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 px-6 py-3 rounded-full font-bold text-slate-800 shadow-2xl">
                      Виж галерия →
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

          <div className="mt-16 text-center">
            <p className="text-slate-500 text-lg bg-stone-50 inline-block px-8 py-4 rounded-full border border-stone-200">
              ✨ Реални снимки и видеа от моите проекти
            </p>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="py-24 px-4 bg-gradient-to-br from-stone-50 to-neutral-50"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-16 bg-gradient-to-r from-stone-700 to-neutral-700 bg-clip-text text-transparent">
            Контакти
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="bg-white p-10 rounded-3xl border-2 border-stone-200 shadow-xl">
                <h3 className="text-3xl font-bold mb-8 text-transparent bg-gradient-to-r from-stone-700 to-neutral-700 bg-clip-text">
                  Свържете се с мен
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
                    <span className="text-lg font-medium">
                      +359 878 34 94 53
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-slate-700 group">
                    <div className="bg-gradient-to-br from-stone-600 to-neutral-700 p-3 rounded-2xl group-hover:scale-110 transition-transform">
                      <MapPin className="text-white" size={24} />
                    </div>
                    <span className="text-lg font-medium">София, България</span>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t-2 border-stone-100">
                  <p className="text-slate-700 mb-4 font-semibold">
                    Последвай ме:
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
                Изпрати запитване
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-bold text-slate-700 mb-2"
                  >
                    Име *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 bg-stone-50/50 border-2 border-stone-200 rounded-2xl focus:ring-2 focus:ring-stone-500 focus:border-stone-500 outline-none transition-all text-slate-800 font-medium"
                    placeholder="Вашето име"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold text-slate-700 mb-2"
                  >
                    Имейл *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 bg-stone-50/50 border-2 border-stone-200 rounded-2xl focus:ring-2 focus:ring-stone-500 focus:border-stone-500 outline-none transition-all text-slate-800 font-medium"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-bold text-slate-700 mb-2"
                  >
                    Телефон
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 bg-stone-50/50 border-2 border-stone-200 rounded-2xl focus:ring-2 focus:ring-stone-500 focus:border-stone-500 outline-none transition-all text-slate-800 font-medium"
                    placeholder="+359 XXX XXX XXX"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-bold text-slate-700 mb-2"
                  >
                    Съобщение *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    className="w-full px-5 py-4 bg-stone-50/50 border-2 border-stone-200 rounded-2xl focus:ring-2 focus:ring-stone-500 focus:border-stone-500 outline-none transition-all text-slate-800 font-medium resize-none"
                    placeholder="Разкажете ми за вашия проект..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="w-full px-10 py-5 bg-gradient-to-r from-stone-700 to-neutral-700 hover:from-stone-800 hover:to-neutral-800 text-white rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-stone-500/30 text-lg"
                >
                  {formStatus === "sending"
                    ? "Изпраща се..."
                    : "Изпрати запитване →"}
                </button>

                {formStatus === "success" && (
                  <div className="bg-green-100 border-2 border-green-500 text-green-700 px-6 py-4 rounded-2xl font-semibold">
                    ✓ Съобщението е изпратено успешно! Ще се свържа с вас скоро.
                  </div>
                )}

                {formStatus === "error" && (
                  <div className="bg-red-100 border-2 border-red-500 text-red-700 px-6 py-4 rounded-2xl font-semibold">
                    ✗ Грешка при изпращане. Моля, опитайте отново или ми пишете
                    директно на имейл.
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
              {currentProject.media[currentMediaIndex].type === "image" ? (
                <img
                  src={currentProject.media[currentMediaIndex].src}
                  alt={currentProject.media[currentMediaIndex].caption}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
                />
              ) : (
                <video
                  src={currentProject.media[currentMediaIndex].src}
                  controls
                  autoPlay
                  className="w-full h-auto max-h-[80vh] rounded-2xl"
                  poster={currentProject.media[currentMediaIndex].poster}
                >
                  Your browser does not support the video tag.
                </video>
              )}

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
            © 2024 KitanSky Project Management. Всички права запазени.
          </p>
          <p className="text-slate-400 mt-3">
            Разработено за строителната индустрия
          </p>
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

export default KitanSkyWebsite;
