import type { Event } from "@/types/types"
import CardEvent from "./CardEvent"

interface CardEventListProps {
  cardEventList: Event[]
}

export default function CardEventList({ cardEventList }: CardEventListProps) {
  return (
    <section className="flex flex-col gap-y-3">
      {cardEventList.map((event) => (
        <CardEvent key={event.id} event={event} />
      ))}
    </section>
  )
}
