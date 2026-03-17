import HeaderV2 from "@/components/layout-v2/HeaderV2";
import SidebarV2 from "@/components/layout-v2/SidebarV2";
import FooterV2 from "@/components/layout-v2/FooterV2";

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black-900">
      <HeaderV2 />
      <div className="flex">
        <SidebarV2 />
        <main className="flex-1 min-h-[calc(100vh-64px)]">
          <div className="max-w-[1080px] mx-auto px-6 lg:px-8 py-8">{children}</div>
        </main>
      </div>
      <FooterV2 />
    </div>
  );
}
