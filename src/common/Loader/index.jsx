export const Loader = ({ fullscreen = true, size = 16 }) => {
  const containerClasses = fullscreen
    ? "flex h-screen items-center justify-center bg-white dark:bg-black overflow-hidden"
    : "flex items-center justify-center bg-white dark:bg-black overflow-hidden";

  const loaderClasses = `h-${size} w-${size} animate-spin rounded-full border-4 border-solid border-primary border-t-transparent overflow-hidden`;

  return (
    <div className={containerClasses}>
      <div className={loaderClasses}></div>
    </div>
  );
};
