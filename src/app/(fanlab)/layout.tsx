import HeaderFL from "@/components/layout-fanlab/HeaderFL";
import SidebarFL from "@/components/layout-fanlab/SidebarFL";
import FooterFL from "@/components/layout-fanlab/FooterFL";

export default function FanLabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg">
      <HeaderFL />
      <div className="flex">
        <SidebarFL />
        <main className="flex-1 min-h-[calc(100vh-64px)]">
          <div className="max-w-[1080px] mx-auto px-6 lg:px-8 py-8">{children}</div>
        </main>
      </div>
      <FooterFL />
    </div>
  );
}
