import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* Sidebar tetap diam di kiri */}
      <Sidebar />

      {/* Area Konten yang bisa di-scroll */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        <main className="p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}