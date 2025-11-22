export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div
        className="h-12 w-12 md:h-16 md:w-16 rounded-full border-4 border-t-red-500 border-r-red-500 border-b-transparent border-l-transparent
                   animate-spin
                   dark:border-t-red-600 dark:border-r-red-600
                   transition-colors"
      />
    </div>
  );
}
