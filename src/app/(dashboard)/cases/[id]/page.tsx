import { successCases } from "@/data/mock";
import CaseDetailClient from "./CaseDetailClient";

export function generateStaticParams() {
  return successCases.map((sc) => ({ id: sc.id }));
}

export default function CaseDetailPage({ params }: { params: { id: string } }) {
  return <CaseDetailClient id={params.id} />;
}
