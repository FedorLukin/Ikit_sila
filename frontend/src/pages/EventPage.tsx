import { useLocation } from "react-router-dom";
import type { Event } from "@/types/types";


export default function EventPage() {
    const location = useLocation()
    const { event } = location.state as { event: Event }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-3xl font-bold">{event.title}</h1>

      <div className="space-y-1 text-sm opacity-80">
        <p><span className="font-semibold">Место:</span> {event.location}</p>
        <p><span className="font-semibold">Дата:</span> {event.date}</p>
        <p><span className="font-semibold">Время:</span> {event.time}</p>
        <p><span className="font-semibold">Организатор:</span> {event.organizer}</p>
      </div>

      <div className="pt-4 border-t border-neutral-300 dark:border-neutral-700">
        <h2 className="text-xl font-semibold mb-2">Описание</h2>
        <p className="opacity-80 text-sm leading-relaxed">писание должно быть!</p>
      </div>
    </div>
  );
}