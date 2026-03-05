import { withAuth } from "@/lib/auth";
import EditProfileForm from "@/components/EditProfileForm";

export default async function ProfilePage() {
  const user = await withAuth();
  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Header Profile Ringkas */}
      <div className="flex items-center gap-6 p-4">
        <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-indigo-100">
          {user.name[0]}
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">{user.name}</h1>
          <p className="text-slate-400 font-medium">Update informasi profil kamu di bawah ini</p>
        </div>
      </div>

      {/* Grid Form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-1">
          <h3 className="font-bold text-slate-800">Detail Personal</h3>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Gunakan nama asli agar memudahkan pengajar mengenali kamu di laporan nilai. 
            Data Stambuk dan Kelas tidak dapat diubah secara mandiri.
          </p>
        </div>

        <div className="md:col-span-2">
          {/* Kirim data user ke Client Component Form */}
          <EditProfileForm user={user} />
        </div>
      </div>
    </div>
  );
}