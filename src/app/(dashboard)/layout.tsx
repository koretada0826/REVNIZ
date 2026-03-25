import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { Toaster } from "sonner";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-h-[calc(100vh-56px)] overflow-x-hidden min-w-0">
          <div className="max-w-[1080px] mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-x-hidden">{children}</div>
        </main>
      </div>
      <Footer />
      <ScrollToTop />
      <Toaster position="top-right" toastOptions={{ className: "font-sans text-[14px]" }} />
    </div>
  );
}
