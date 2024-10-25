const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-yellow-500 border-r-transparent"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
