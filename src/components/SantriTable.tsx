import { prisma } from "@/lib/prisma";
import { deleteSantri } from "@/lib/actions"; // Kita akan buat action ini

export default async function SantriTable() {
  // Ambil semua data santri dari Database
  const santriList = await prisma.user.findMany({
    where: { role: "SANTRI" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-widest">
          <tr>
            <th className="px-6 py-4 border-b">Santri</th>
            <th className="px-6 py-4 border-b">Stambuk</th>
            <th className="px-6 py-4 border-b">Kelas & Divisi</th>
            <th className="px-6 py-4 border-b">Level</th>
            <th className="px-6 py-4 border-b text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {santriList.map((s) => (
            <tr key={s.id} className="hover:bg-slate-50 transition-colors group">
              <td className="px-6 py-4">
                <div className="font-bold text-slate-800">{s.name}</div>
                <div className="text-[10px] text-slate-400">ID: {s.id.substring(0, 8)}...</div>
              </td>
              <td className="px-6 py-4 text-sm font-mono text-indigo-600">{s.stambuk}</td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px] font-bold border border-blue-100">
                    {s.kelas || "N/A"}
                  </span>
                  <span className="bg-purple-50 text-purple-600 px-2 py-0.5 rounded text-[10px] font-bold border border-purple-100">
                    {s.divisi || "Umum"}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold">
                    {s.level}
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">{s.rank}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <form action={deleteSantri}>
                  <input type="hidden" name="id" value={s.id} />
                  <button 
                    type="submit"
                    className="text-slate-300 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50"
                    title="Hapus Santri"
                  >
                    🗑️
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {santriList.length === 0 && (
        <div className="p-10 text-center text-slate-400 italic text-sm">
          Belum ada santri yang terdaftar.
        </div>
      )}
    </div>
  );
}