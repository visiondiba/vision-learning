export interface Pelajaran {
    id: string;
    title: string;
    type: 'video' | 'tugas' | 'text';
    content: {
        videoUrl?: string;
        duration?: number;
        body?: string;
        questions?: {question: string; options: string[]; answer: number;}[];
    };
}

export interface Kursus {
    _id?: string;
    title: string;
    description: string;
    teacherId: string;
    lessons: Pelajaran[];
}
