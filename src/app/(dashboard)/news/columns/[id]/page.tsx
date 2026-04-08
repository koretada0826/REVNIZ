import { columns } from "@/data/columns";
import ColumnDetailClient from "./ColumnDetailClient";

export function generateStaticParams() {
  return columns.map((col) => ({ id: String(col.id) }));
}

export default function ColumnDetailPage({ params }: { params: { id: string } }) {
  return <ColumnDetailClient id={params.id} />;
}
