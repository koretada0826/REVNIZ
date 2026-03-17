import HeaderTB from "@/components/layout-bridge/HeaderTB";
import SidebarTB from "@/components/layout-bridge/SidebarTB";
import FooterTB from "@/components/layout-bridge/FooterTB";

export default function TokyoBridgeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg">
      <HeaderTB />
      <div className="flex">
        <SidebarTB />
        <main className="flex-1 min-h-[calc(100vh-64px)]">
          <div className="max-w-[1080px] mx-auto px-6 lg:px-8 py-8">{children}</div>
        </main>
      </div>
      <FooterTB />
    </div>
  );
}
