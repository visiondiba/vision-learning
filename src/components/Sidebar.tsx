"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  Trophy, 
  User, 
  Settings,
  LogOut 
} from "lucide-react";

const MENU_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Kursus & Materi", href: "/dashboard/courses", icon: BookOpen },
  { name: "Papan Skor", href: "/dashboard/leaderboard", icon: Trophy },
  { name: "Profil Saya", href: "/dashboard/profile", icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0">

      <div className="p-6 border-b border-slate-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-100">
            D
          </div>
          <div>
            <h1 className="font-bold text-slate-800 leading-none">Learning</h1>
            <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">System v1.0</span>
          </div>
        </div>
      </div>

   
      <nav className="flex-1 p-4 space-y-2">
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                isActive 
                ? "bg-indigo-50 text-indigo-600 shadow-sm" 
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>


      <div className="p-4 border-t border-slate-50 space-y-1">
        <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-800 transition-colors">
          <Settings size={20} />
          <span className="text-sm">Pengaturan</span>
        </Link>
      </div>
    </aside>
  );
}