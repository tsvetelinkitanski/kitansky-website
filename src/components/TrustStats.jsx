import { Award, Building2, Users, ThumbsUp, HardHat } from 'lucide-react';

const TrustStats = ({ translations, language }) => {
  const t = translations[language];

  const stats = [
    {
      icon: Award,
      value: t.stats.experience,
      label: t.stats.experienceDesc,
      gradient: 'from-amber-500 to-orange-600',
    },
    {
      icon: Building2,
      value: t.stats.projects,
      label: t.stats.projectsDesc,
      gradient: 'from-blue-500 to-indigo-600',
    },
    {
      icon: HardHat,
      value: t.stats.area,
      label: t.stats.areaDesc,
      gradient: 'from-green-500 to-emerald-600',
    },
    {
      icon: ThumbsUp,
      value: t.stats.satisfaction,
      label: t.stats.satisfactionDesc,
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      icon: Users,
      value: t.stats.contractors,
      label: t.stats.contractorsDesc,
      gradient: 'from-red-500 to-rose-600',
    },
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-stone-700 to-neutral-800 dark:from-slate-800 dark:to-slate-900 relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE2YzAgNi42MjctNS4zNzMgMTItMTIgMTJzLTEyLTUuMzczLTEyLTEyIDUuMzczLTEyIDEyLTEyIDEyIDUuMzczIDEyIDEyem0wIDBjMCA2LjYyNy01LjM3MyAxMi0xMiAxMnMtMTItNS4zNzMtMTItMTIgNS4zNzMtMTIgMTItMTIgMTIgNS4zNzMgMTIgMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="scroll-animate scale-fade-in group text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-white/10 dark:bg-slate-900/30 backdrop-blur-sm p-4 rounded-3xl border-2 border-white/20 dark:border-slate-700/50 hover:border-white/40 dark:hover:border-slate-600/70 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl min-h-[180px] flex flex-col justify-center">
                  <div className="mb-3 flex justify-center">
                    <div className={`p-2.5 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <div className="text-2xl md:text-3xl font-black text-white mb-2 group-hover:scale-105 transition-transform duration-300">
                    {stat.value}
                  </div>

                  <div className="text-xs text-stone-200 dark:text-slate-300 font-semibold uppercase tracking-wide leading-tight px-2">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustStats;
