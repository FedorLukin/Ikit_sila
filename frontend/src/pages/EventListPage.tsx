import { Link, useLocation } from "react-router-dom";
import CardEventList from "@/components/CardEventList";
import { Button } from "@/components/ui/button";
import type { Event } from "@/types/types";

export default function EventListPage() {
  const location = useLocation()
  const { list } = location.state as { list: Event[] }

  return (
    <section className="min-h-screen text-neutral-900 dark:text-neutral-100 px-4 py-8 space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Список мероприятий</h1>
        <p className="text-sm opacity-80">
          Здесь вы можете увидеть все доступные события и выбрать интересующее.
        </p>
      </div>

      <CardEventList cardEventList={list} />

      <div className="flex justify-center mt-6">
        <Button
          className="bg-red-500 text-white rounded-xl px-6 py-2 text-sm font-medium
                     hover:bg-red-600 focus:ring-2 focus:ring-red-400 active:scale-95 transition-all"
        >
          <Link to="/">
            Назад на главную
          </Link>
        </Button>
      </div>
    </section>
  );
}
