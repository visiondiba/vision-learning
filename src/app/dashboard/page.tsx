import { withAuth } from "@/lib/auth";

export default async function SantriDashboard() {
  const user = await withAuth();
  if (!user) return null;
  const progress = (user.xp / 1000) * 100;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-[0.2em] mb-1">Overview</h2>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">
            Ahlan, <span className="text-indigo-600">{user.name.split(' ')[0]}</span>!
          </h1>
        </div>
        <div className="px-4 py-2 bg-white rounded-2xl border border-slate-200 shadow-sm inline-flex items-center gap-3">
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Stambuk</p>
            <p className="text-sm font-mono font-bold text-slate-700">{user.stambuk}</p>
          </div>
          <div className="h-8 w-px bg-slate-100"></div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Kelas</p>
            <p className="text-sm font-bold text-slate-700">{user.kelas}</p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="md:col-span-2 bg-indigo-600 rounded-[2rem] p-8 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden group">
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">
                Current Rank: {user.rank}
              </span>
              <h3 className="text-6xl font-black mt-4">Level {user.level}</h3>
            </div>
            
            <div className="mt-12">
              <div className="flex justify-between items-end mb-3">
                <span className="text-sm font-bold text-indigo-100">XP Progress</span>
                <span className="text-sm font-mono">{user.xp} / 1000</span>
              </div>
              <div className="h-4 w-full bg-white/10 rounded-full border border-white/5 overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 text-[12rem] font-black italic opacity-5 select-none pointer-events-none">
            {user.level}
          </div>
        </div>

        <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Divisi Aktif</p>
            <h4 className="text-2xl font-bold text-slate-800">{user.divisi || "Umum"}</h4>
          </div>
          <div className="mt-auto pt-6 border-t border-slate-50">
            <button className="w-full py-4 bg-slate-50 text-slate-600 rounded-2xl text-xs font-bold hover:bg-slate-100 transition-all uppercase tracking-widest">
              Detail Progress →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}