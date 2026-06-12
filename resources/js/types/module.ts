import type { Lesson } from './lesson';

export type Module = {
    id?: number;
    title: string;
    duration: number;
    order?: number;
    lessons: Lesson[];
};
