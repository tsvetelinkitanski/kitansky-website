import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Projects = ({ translations, language }) => {
  const t = translations[language];
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const openGallery = (project, mediaIndex = 0) => {
    setCurrentProject(project);
    setCurrentMediaIndex(mediaIndex);
    setGalleryOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = () => {
    setGalleryOpen(false);
    setCurrentProject(null);
    setCurrentMediaIndex(0);
    document.body.style.overflow = 'unset';
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

      if (e.key === 'Escape') closeGallery();
      if (e.key === 'ArrowRight') nextMedia();
      if (e.key === 'ArrowLeft') prevMedia();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [galleryOpen, currentMediaIndex, currentProject]);

  const projects = [
    {
      id: 1,
      title: t.projects.doml2.title,
      company: t.projects.doml2.company,
      location: t.projects.doml2.location,
      description: t.projects.doml2.description,
      role: t.projects.doml2.role,
      image:
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      category: t.projects.doml2.category,
      media: [
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=900&fit=crop',
          caption: language === 'bg' ? 'Външен изглед' : 'Exterior view',
        },
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=900&fit=crop',
          caption: language === 'bg' ? 'Фасада' : 'Facade',
        },
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1200&h=900&fit=crop',
          caption:
            language === 'bg' ? 'Строителен процес' : 'Construction process',
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
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
      category: t.projects.corner.category,
      media: [
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=900&fit=crop',
          caption: language === 'bg' ? 'Бизнес сграда' : 'Business building',
        },
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=900&fit=crop',
          caption: language === 'bg' ? 'Интериор' : 'Interior',
        },
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=900&fit=crop',
          caption: language === 'bg' ? 'Работно пространство' : 'Workspace',
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
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
      category: t.projects.fountains.category,
      media: [
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=900&fit=crop',
          caption: language === 'bg' ? 'Луксозна сграда' : 'Luxury building',
        },
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=900&fit=crop',
          caption:
            language === 'bg' ? 'Модерна архитектура' : 'Modern architecture',
        },
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=900&fit=crop',
          caption: language === 'bg' ? 'Вътрешен двор' : 'Interior courtyard',
        },
      ],
    },
  ];

  return (
    <>
      <section id="projects" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-8 bg-gradient-to-r from-stone-700 to-neutral-700 bg-clip-text text-transparent">
            {t.projectsSection.title}
          </h2>

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
                          ? 'bg-white w-8'
                          : 'bg-white/40 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;
