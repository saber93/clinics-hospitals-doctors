
const LoadingState = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
        <p className="text-lg">Loading services...</p>
      </div>
    </div>
  );
};

export default LoadingState;
