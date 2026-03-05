"use client";
import { updateProfile } from "@/lib/actions";
import { useFormStatus } from "react-dom";

export default function EditProfileForm({ user }: { user: any }) {
  return (
    <form action={updateProfile} className="space-y-6 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
      {/* Hidden ID agar Action tahu siapa yang di-update */}
      <input type="hidden" name="userId" value={user.id} />

      <div className="space-y-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Nama Lengkap</label>
          <input 
            name="name"
            type="text" 
            defaultValue={user.name}
            className="w-full px-5 py-3 bg-slate-50 border border-slate-100 text-black rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all font-medium"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Biografi Singkat</label>
          <textarea 
            name="bio"
            rows={4}
            placeholder="Tuliskan sedikit tentang dirimu..."
            className="w-full px-5 py-3 bg-slate-50 border text-black border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all font-medium"
          />
        </div>

        {/* Info Read-Only (Hanya Tampilan) */}
        <div className="grid grid-cols-2 gap-4 opacity-60">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 ml-1 tracking-widest">Stambuk</label>
            <div className="px-5 py-3 bg-slate-100 border border-slate-200 rounded-2xl text-black text-sm">{user.stambuk}</div>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 ml-1 tracking-widest">Kelas</label>
            <div className="px-5 py-3 bg-slate-100 border border-slate-200 rounded-2xl text-black text-sm ">{user.kelas}</div>
          </div>
        </div>
      </div>

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      disabled={pending}
      className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:bg-slate-300 disabled:shadow-none"
    >
      {pending ? "Menyimpan Perubahan..." : "Simpan Profil"}
    </button>
  );
}