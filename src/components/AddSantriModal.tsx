'use client'

import { useState, useActionState, useEffect } from 'react'
import { registerSantri } from '@/lib/actions'

export default function AddSantriModal() {
  const [isOpen, setIsOpen] = useState(false)
  // State untuk menampung hasil dari server action
  const [state, formAction, isPending] = useActionState(registerSantri, null)

  // Auto-close modal jika pendaftaran sukses
  useEffect(() => {
    if (state?.success) {
      const timer = setTimeout(() => {
        setIsOpen(false)
      }, 2000) // Beri waktu user baca pesan sukses selama 2 detik
      return () => clearTimeout(timer)
    }
  }, [state])

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-all active:scale-95 shadow-md"
      >
        + Tambah Santri
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h3 className="font-bold text-slate-800 text-lg">Registrasi Santri</h3>
                <p className="text-xs text-slate-500">Sinkronisasi dengan Database Excel</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-slate-400 hover:text-red-500 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form action={formAction} className="p-6 space-y-5">
              {/* Input Stambuk */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nomor Stambuk</label>
                <input 
                  name="stambuk"
                  type="text" 
                  required
                  placeholder="Contoh: 1.46.12345"
                  className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-black transition-all"
                />
              </div>

              {/* Input Password */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Set Password Awal</label>
                <input 
                  name="password"
                  type="text" 
                  placeholder="Default: santri123"
                  className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-black transition-all"
                />
                <p className="text-[10px] text-slate-400 mt-1 italic">
                  *Bisa dikosongkan untuk menggunakan password default.
                </p>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Pilih Divisi (Opsional)</label>
                <select 
                    name="divisi" 
                    className="w-full p-3 border border-slate-300 rounded-xl bg-white text-black outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value=""> Pilih Divisi </option>
                    <option value="CODING">Programming</option>
                    <option value="DESIGN">Desain Grafis</option>
                    <option value="VIDEO">Video Editing</option>
                    <option value="3D">3D Animation & Modeling </option>
                </select>
                </div>

              {/* Status Messages */}
              {state?.error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg font-medium flex items-center gap-2 animate-shake">
                   ⚠️ {state.error}
                </div>
              )}
              {state?.success && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs rounded-lg font-medium flex items-center gap-2">
                   ✅ {state.success}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-100 rounded-xl transition"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  disabled={isPending}
                  className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg disabled:bg-slate-300 disabled:cursor-not-allowed transition-all active:scale-95"
                >
                  {isPending ? "Mencari Data..." : "Daftarkan Sekarang"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}