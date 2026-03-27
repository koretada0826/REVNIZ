import { limitedPlans } from "@/data/benefits";
import BenefitDetailClient from "./BenefitDetailClient";

export function generateStaticParams() {
  return limitedPlans.map((p) => ({ id: String(p.id) }));
}

export default function BenefitDetailPage({ params }: { params: { id: string } }) {
  return <BenefitDetailClient id={params.id} />;
}
