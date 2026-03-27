import { events } from "@/data/mock";
import EventDetailClient from "./EventDetailClient";

export function generateStaticParams() {
  return events.map((ev) => ({ id: ev.id }));
}

export default function EventDetailPage({ params }: { params: { id: string } }) {
  return <EventDetailClient id={params.id} />;
}
