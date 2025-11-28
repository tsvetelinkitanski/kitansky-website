const LoadingSpinner = () => {
  return (
    <div className="w-full py-24 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-stone-200 border-t-stone-700 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-neutral-700 rounded-full animate-spin animation-delay-150"></div>
        </div>
        <p className="text-slate-600 font-medium">Зареждане...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
