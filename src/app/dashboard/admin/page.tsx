// app/dashboard/admin/page.tsx
import { withAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";
import SantriTable from "@/components/SantriTable"
import AddSantriModal from "@/components/AddSantriModal"; // Import Modal Client Component
import { logoutAction } from "@/lib/actions";

export default async function AdminDashboard() {
  const user = await withAuth();
  if (!user) return null;

  // 1. Fetching Data secara Paralel (Multi-threaded style)
  const [totalSantri, totalUstadz, sessionKeys] = await Promise.all([
    prisma.user.count({ where: { role: 'SANTRI' } }),
    prisma.user.count({ where: { role: 'USTADZ' } }),
    redis.keys('session:*.darussalam'), // Ambil semua key session di Redis
  ]);

  const activeSessions = sessionKeys.length;

  return (
    <div className="p-6 bg-slate-50 min-h-screen text-black">
      <header className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">Admin Panel</h1>
          <p className="text-slate-500">Manajemen Data Pondok Darussalam</p>
        </div>
        <form action={logoutAction}>
          <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-100 transition">
            Keluar Sistem
          </button>
        </form>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Santri" value={totalSantri} color="bg-blue-600" icon="👥" />
        <StatCard title="Total Pengajar" value={totalUstadz} color="bg-emerald-600" icon="🎓" />
        <StatCard title="Santri Online" value={activeSessions} color="bg-amber-500" icon="⚡" isLive />
      </div>

      {/* Main Content: Tabel Santri */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white">
          <h2 className="font-bold text-slate-700">Daftar Santri Terdaftar</h2>
          
          {/* MODAL TAMBAH SANTRI (Client Component) */}
          <AddSantriModal />
        </div>
        
        <div className="p-4">
          <SantriTable />
        </div>
      </div>
    </div>
  );
}

// Sub-component StatCard dengan sedikit "Polish"
function StatCard({ title, value, color, icon, isLive }: { title: string; value: number | string; color: string; icon: string; isLive?: boolean }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center text-xl text-white shadow-inner`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-slate-500 font-medium">{title}</p>
          <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
        </div>
      </div>
      {isLive && (
        <div className="flex items-center space-x-1">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
          </span>
          <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Live</span>
        </div>
      )}
    </div>
  );
}