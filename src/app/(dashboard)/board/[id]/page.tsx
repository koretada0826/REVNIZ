import { consultations } from "@/data/mock";
import BoardDetailClient from "./BoardDetailClient";

export function generateStaticParams() {
  return consultations.map((p) => ({ id: p.id }));
}

export default function BoardDetailPage() {
  return <BoardDetailClient />;
}
