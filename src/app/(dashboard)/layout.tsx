import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-h-[calc(100vh-56px)]">
          <div className="max-w-[1080px] mx-auto px-6 lg:px-8 py-8">{children}</div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
