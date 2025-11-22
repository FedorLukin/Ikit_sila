import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 space-y-6">
      <h1 className="text-6xl font-extrabold text-red-500">404</h1>
      <p className="text-2xl font-semibold">Страница не найдена</p>
      <p className="text-sm opacity-80 text-center max-w-sm">
        Извините, такой страницы не существует или она была удалена.
      </p>
      <Link to="/">
        <Button className="bg-red-500 text-white rounded-xl px-6 py-2 text-sm font-medium
                           hover:bg-red-600 focus:ring-2 focus:ring-red-400 active:scale-95 transition-all">
          Вернуться на главную
        </Button>
      </Link>
    </div>
  );
}
