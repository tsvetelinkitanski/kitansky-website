import { useState, useEffect, useCallback } from 'react';
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
  };

  const closeGallery = useCallback(() => {
    setGalleryOpen(false);
    setCurrentProject(null);
    setCurrentMediaIndex(0);
  }, []);

  // Manage body scroll when gallery opens/closes
  useEffect(() => {
    if (galleryOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [galleryOpen]);

  const nextMedia = useCallback(() => {
    setCurrentMediaIndex((prevIndex) => {
      if (currentProject && prevIndex < currentProject.media.length - 1) {
        return prevIndex + 1;
      }
      return prevIndex;
    });
  }, [currentProject]);

  const prevMedia = useCallback(() => {
    setCurrentMediaIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      }
      return prevIndex;
    });
  }, []);

  useEffect(() => {
    if (!galleryOpen) return;

    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeGallery();
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextMedia();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevMedia();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [galleryOpen, closeGallery, nextMedia, prevMedia]);

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
          id: 'doml2-1',
          type: 'image',
          src: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=900&fit=crop',
          caption: language === 'bg' ? 'Външен изглед' : 'Exterior view',
        },
        {
          id: 'doml2-2',
          type: 'image',
          src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=900&fit=crop',
          caption: language === 'bg' ? 'Фасада' : 'Facade',
        },
        {
          id: 'doml2-3',
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
          id: 'corner-1',
          type: 'image',
          src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=900&fit=crop',
          caption: language === 'bg' ? 'Бизнес сграда' : 'Business building',
        },
        {
          id: 'corner-2',
          type: 'image',
          src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=900&fit=crop',
          caption: language === 'bg' ? 'Интериор' : 'Interior',
        },
        {
          id: 'corner-3',
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
          id: 'fountains-1',
          type: 'image',
          src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=900&fit=crop',
          caption: language === 'bg' ? 'Луксозна сграда' : 'Luxury building',
        },
        {
          id: 'fountains-2',
          type: 'image',
          src: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=900&fit=crop',
          caption:
            language === 'bg' ? 'Модерна архитектура' : 'Modern architecture',
        },
        {
          id: 'fountains-3',
          type: 'image',
          src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=900&fit=crop',
          caption: language === 'bg' ? 'Вътрешен двор' : 'Interior courtyard',
        },
      ],
    },
  ];

  return (
    <>
      <section id="projects" className="py-24 px-4 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-8 bg-gradient-to-r from-stone-700 to-neutral-700 dark:from-stone-300 dark:to-neutral-300 bg-clip-text text-transparent">
            {t.projectsSection.title}
          </h2>

          <div className="max-w-4xl mx-auto mb-12 bg-stone-50 dark:bg-slate-800 border-l-4 border-stone-400 dark:border-slate-600 rounded-lg p-6 transition-colors duration-300">
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm transition-colors duration-300">
              {t.projectsSection.disclaimer}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                onClick={() => openGallery(project, 0)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openGallery(project, 0);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`${project.title} - ${language === 'bg' ? 'Отвори галерия' : 'Open gallery'}`}
                className="scroll-animate scale-fade-in group bg-gradient-to-br from-white to-stone-50/30 dark:from-slate-800 dark:to-slate-800/50 rounded-3xl overflow-hidden border-2 border-stone-100 dark:border-slate-700 hover:border-stone-300 dark:hover:border-slate-600 focus:border-stone-400 dark:focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-stone-500 dark:focus:ring-slate-400 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-stone-600 to-neutral-700 dark:from-slate-700 dark:to-slate-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg transition-colors duration-300">
                    {project.category}
                  </div>
                  {project.media && (
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-slate-800 dark:text-slate-100 px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2 transition-colors duration-300">
                      📸 {project.media.length} {t.projectsSection.media}
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 dark:bg-slate-800/90 px-6 py-3 rounded-full font-bold text-slate-800 dark:text-slate-100 shadow-2xl transition-colors duration-300">
                      {t.projectsSection.viewGallery} →
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2 text-slate-800 dark:text-slate-100 group-hover:text-stone-700 dark:group-hover:text-stone-300 transition-colors duration-300">
                    {project.title}
                  </h3>
                  {project.company && (
                    <p className="text-stone-600 dark:text-slate-300 font-semibold mb-1 transition-colors duration-300">
                      🏢 {project.company}
                    </p>
                  )}
                  <p className="text-stone-600 dark:text-slate-300 mb-2 transition-colors duration-300">📍 {project.location}</p>
                  {project.role && (
                    <p className="text-stone-600 dark:text-slate-300 font-medium mb-3 transition-colors duration-300">
                      👔 {project.role}
                    </p>
                  )}
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed transition-colors duration-300">
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
            aria-label={language === 'bg' ? 'Затвори галерия' : 'Close gallery'}
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
              aria-label={language === 'bg' ? 'Предишна снимка' : 'Previous image'}
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
              aria-label={language === 'bg' ? 'Следваща снимка' : 'Next image'}
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
                loading="lazy"
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
                      key={media.id}
                      onClick={() => setCurrentMediaIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentMediaIndex
                          ? 'bg-white w-8'
                          : 'bg-white/40 hover:bg-white/60'
                      }`}
                      aria-label={
                        language === 'bg'
                          ? `Покажи снимка ${index + 1}`
                          : `Show image ${index + 1}`
                      }
                      aria-current={index === currentMediaIndex ? 'true' : 'false'}
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
