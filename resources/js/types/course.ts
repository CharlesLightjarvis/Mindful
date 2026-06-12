import type { Category } from './category';
import type { Trainer } from './trainer';
import type { Module } from './module';

export type StudentCourse = {
    id: number;
    title: string;
    image: string | null;
    trainer: string;
    modules: Module[];
};

export type Course = {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    price: number;
    duration: number;
    image: string | null;
    featured: boolean;
    status: 'draft' | 'published';
    status_label: string;
    published_at: string | null;
    category: Category | null;
    trainer: Trainer | null;
    module_count: number;
    modules?: Module[];
    benefits: string[] | null;
    objectives: { title: string; description: string }[] | null;
    prerequisites: string[] | null;
    created_at: string;
    updated_at: string;
};
