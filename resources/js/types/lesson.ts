export type LessonType = 'video_url' | 'audio' | 'pdf';

export type Lesson = {
    id?: number;
    title: string;
    duration: number;
    order?: number;
    is_free: boolean;
    free?: boolean;
    type?: LessonType;
    video_url?: string | null;
    audio_url?: string | null;
    pdf_url?: string | null;
};
