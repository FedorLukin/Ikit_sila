import { Link } from 'react-router-dom';
import type { Event } from '../types/types';

interface CardEventProps {
    event: Event
}


export default function CardEvent({ event }: CardEventProps) {
    return (
        <Link
            to="/event"
            state={{event}}
            className="block w-full border border-neutral-300 dark:border-neutral-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200 bg-white dark:bg-neutral-800"
        >
            <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">{event.title}</h3>
                <div className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                    <p><span className="font-medium">Место:</span> {event.location}</p>
                    <p><span className="font-medium">Дата:</span> {event.date}</p>
                    <p><span className="font-medium">Время:</span> {event.time}</p>
                    <p><span className="font-medium">Организатор:</span> {event.organizer}</p>
                </div>
            </div>
        </Link>
    );
}