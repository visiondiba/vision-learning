import clientPromise from '@/lib/mongo';
import Link from 'next/link';
import { BookOpen, PlayCircle, Clock, ChevronRight } from "lucide-react";

async function getCourses() {
  const client = await clientPromise;
  const db = client.db("lms_db");
  // Ambil semua kursus, urutkan berdasarkan yang terbaru
  return await db.collection("courses").find({}).sort({ createdAt: -1 }).toArray();
}

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header Halaman */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-1">Learning Center</h2>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Katalog Materi</h1>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-500 shadow-sm">
          Total: <span className="text-indigo-600 font-bold">{courses.length} Kursus</span>
        </div>
      </header>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course: any) => (
          <div 
            key={course._id.toString()} 
            className="group bg-white rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
          >
            {/* Thumbnail Placeholder / Image */}
            <div className="h-40 bg-slate-100 relative overflow-hidden flex items-center justify-center">
              <BookOpen size={48} className="text-slate-300 group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-indigo-600 shadow-sm uppercase">
                {course.category || "General"}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
              <h2 className="text-xl font-bold text-slate-800 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                {course.title}
              </h2>
              <p className="text-sm text-slate-500 line-clamp-2 mb-6 leading-relaxed">
                {course.description}
              </p>
              
              <div className="mt-auto flex items-center justify-between border-t border-slate-50 pt-4">
                <div className="flex items-center gap-4 text-slate-400">
                  <div className="flex items-center gap-1 text-[11px] font-bold">
                    <PlayCircle size={14} className="text-indigo-400" />
                    {course.lessons?.length || 0} Materi
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-bold">
                    <Clock size={14} />
                    {course.duration || "2j"}
                  </div>
                </div>

                <Link 
                  href={`/dashboard/courses/${course._id}`}
                  className="p-2 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm"
                >
                  <ChevronRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {courses.length === 0 && (
        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] p-20 text-center">
          <p className="text-slate-400 font-medium italic">Belum ada materi kursus yang tersedia.</p>
        </div>
      )}
    </div>
  );
}