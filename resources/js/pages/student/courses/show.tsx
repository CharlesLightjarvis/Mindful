import { Head, Link, usePage } from '@inertiajs/react';
import student from '@/routes/student';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronUp, PlayCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { Lesson, LessonType, Module, StudentCourse } from '@/types';
import { getLessonTypeLabel, LessonMedia } from './partials/lesson-media';

const COURSE_SIDEBAR_WIDTH = 320;

function useDynamicPageLeft() {
    const pageRef = useRef<HTMLDivElement | null>(null);
    const [left, setLeft] = useState(0);

    useEffect(() => {
        const measure = () => {
            if (!pageRef.current) return;

            const nextLeft = pageRef.current.getBoundingClientRect().left;

            setLeft((currentLeft) =>
                Math.abs(currentLeft - nextLeft) > 0.5 ? nextLeft : currentLeft,
            );
        };

        const measureDuringTransition = () => {
            const start = performance.now();
            let frame = 0;

            const tick = () => {
                measure();

                if (performance.now() - start < 400) {
                    frame = requestAnimationFrame(tick);
                }
            };

            tick();

            return () => cancelAnimationFrame(frame);
        };

        let stopTransitionMeasure = measureDuringTransition();

        const restartMeasure = () => {
            stopTransitionMeasure();
            stopTransitionMeasure = measureDuringTransition();
        };

        window.addEventListener('resize', restartMeasure);

        let resizeObserver: ResizeObserver | null = null;

        if (typeof ResizeObserver !== 'undefined') {
            resizeObserver = new ResizeObserver(restartMeasure);

            if (pageRef.current) {
                resizeObserver.observe(pageRef.current);
            }

            resizeObserver.observe(document.body);
            resizeObserver.observe(document.documentElement);
        }

        let mutationObserver: MutationObserver | null = null;

        if (typeof MutationObserver !== 'undefined') {
            mutationObserver = new MutationObserver(restartMeasure);

            mutationObserver.observe(document.body, {
                attributes: true,
                subtree: true,
                attributeFilter: [
                    'class',
                    'style',
                    'data-state',
                    'data-collapsible',
                ],
            });
        }

        return () => {
            stopTransitionMeasure();
            window.removeEventListener('resize', restartMeasure);
            resizeObserver?.disconnect();
            mutationObserver?.disconnect();
        };
    }, []);

    return { pageRef, left };
}

function formatDuration(duration?: string | number | null) {
    if (!duration) return '';

    const value = String(duration);

    if (value.toLowerCase().includes('min')) {
        return value;
    }

    return `${value} min`;
}

function TypeBadge({ type }: { type?: LessonType }) {
    const styles: Record<string, string> = {
        video: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
        video_url:
            'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
        audio: 'bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300',
        pdf: 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300',
    };

    return (
        <Badge
            variant="secondary"
            className={`px-1.5 py-0 text-[10px] font-medium ${
                styles[type ?? 'video_url'] ?? ''
            }`}
        >
            {getLessonTypeLabel(type)}
        </Badge>
    );
}

function LessonRow({
    lesson,
    index,
    isActive,
    onClick,
}: {
    lesson: Lesson;
    index: number;
    isActive: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50 ${
                isActive ? 'bg-muted text-foreground' : 'text-foreground/80'
            }`}
        >
            <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                    isActive
                        ? 'bg-foreground text-background'
                        : 'bg-muted text-muted-foreground'
                }`}
            >
                {index + 1}
            </span>

            <div className="flex-1">
                <p className="text-[13px] leading-snug font-medium break-words">
                    {lesson.title}
                </p>

                <div className="mt-1.5 flex items-center justify-between gap-2">
                    {lesson.duration ? (
                        <span className="text-xs text-muted-foreground">
                            {formatDuration(lesson.duration)}
                        </span>
                    ) : (
                        <span />
                    )}

                    <TypeBadge type={lesson.type} />
                </div>
            </div>
        </button>
    );
}

function ModuleSection({
    module,
    moduleIndex,
    activeLesson,
    onSelectLesson,
}: {
    module: Module;
    moduleIndex: number;
    activeLesson: Lesson | null;
    onSelectLesson: (lesson: Lesson) => void;
}) {
    const containsActiveLesson =
        module.lessons?.some((lesson) => lesson.id === activeLesson?.id) ??
        false;

    const [open, setOpen] = useState(moduleIndex === 0 || containsActiveLesson);

    useEffect(() => {
        if (containsActiveLesson) {
            setOpen(true);
        }
    }, [containsActiveLesson]);

    return (
        <div className="border-b border-border/40 last:border-0">
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                className="flex w-full items-start justify-between gap-2 px-4 py-3 text-left hover:bg-muted/30"
            >
                <div className="flex-1">
                    <p className="text-sm leading-snug font-semibold break-words text-foreground">
                        {moduleIndex + 1}. {module.title}
                    </p>

                    <p className="mt-0.5 text-xs text-muted-foreground">
                        {module.lessons?.length ?? 0} leçon
                        {(module.lessons?.length ?? 0) > 1 ? 's' : ''}
                    </p>
                </div>

                <span className="mt-0.5 shrink-0 text-muted-foreground">
                    {open ? (
                        <ChevronUp className="h-4 w-4" />
                    ) : (
                        <ChevronDown className="h-4 w-4" />
                    )}
                </span>
            </button>

            {open && (
                <div className="pb-1">
                    {module.lessons?.map((lesson, lessonIndex) => (
                        <LessonRow
                            key={lesson.id}
                            lesson={lesson}
                            index={lessonIndex}
                            isActive={activeLesson?.id === lesson.id}
                            onClick={() => onSelectLesson(lesson)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default function StudentCourseShow() {
    const { course } = usePage<{ course: StudentCourse }>().props;
    const { pageRef, left } = useDynamicPageLeft();

    const allLessons = course.modules?.flatMap((m) => m.lessons ?? []) ?? [];

    const [activeLesson, setActiveLesson] = useState<Lesson | null>(
        allLessons[0] ?? null,
    );

    useEffect(() => {
        if (!activeLesson && allLessons.length > 0) {
            setActiveLesson(allLessons[0]);
        }
    }, [activeLesson, allLessons]);

    const activeIndex = allLessons.findIndex(
        (lesson) => lesson.id === activeLesson?.id,
    );

    const prevLesson = activeIndex > 0 ? allLessons[activeIndex - 1] : null;

    const nextLesson =
        activeIndex >= 0 && activeIndex < allLessons.length - 1
            ? allLessons[activeIndex + 1]
            : null;

    return (
        <>
            <Head title={course.title} />

            <div
                ref={pageRef}
                className="relative min-h-[calc(100vh-4rem)] bg-background"
            >
                {/* Left sidebar */}
                <aside
                    className="fixed top-16 bottom-0 z-20 flex flex-col border-r border-border/40 bg-background"
                    style={{
                        left,
                        width: COURSE_SIDEBAR_WIDTH,
                    }}
                >
                    {/* Back button */}
                    <div className="border-b border-border/40 px-4 py-3">
                        <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="w-full justify-start gap-1.5"
                        >
                            <Link href="/student/courses">
                                <ChevronLeft className="h-4 w-4" />
                                Mes formations
                            </Link>
                        </Button>
                    </div>

                    {/* Course info */}
                    <div className="border-b border-border/40 px-4 py-4">
                        <h2 className="text-sm leading-snug font-semibold break-words">
                            {course.title}
                        </h2>

                        <p className="mt-1 text-xs text-muted-foreground">
                            par {course.trainer}
                        </p>
                    </div>

                    {/* Progress */}
                    <div className="space-y-2 border-b border-border/40 px-4 py-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium">
                                Progression
                            </span>

                            <span className="text-xs text-muted-foreground">
                                0% complété
                            </span>
                        </div>

                        <Progress value={0} className="h-1.5" />
                    </div>

                    {/* Modules list */}
                    <div className="flex-1 overflow-y-auto">
                        {course.modules?.map((module, moduleIndex) => (
                            <ModuleSection
                                key={module.id}
                                module={module}
                                moduleIndex={moduleIndex}
                                activeLesson={activeLesson}
                                onSelectLesson={setActiveLesson}
                            />
                        ))}
                    </div>
                </aside>

                {/* Main content */}
                <main
                    className="min-h-[calc(100vh-4rem)] bg-background/50"
                    style={{
                        marginLeft: COURSE_SIDEBAR_WIDTH,
                    }}
                >
                    {activeLesson ? (
                        <div className="w-full px-6 py-6">
                            <LessonMedia lesson={activeLesson} />

                            <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-4">
                                {prevLesson ? (
                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            setActiveLesson(prevLesson)
                                        }
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                        Précédent
                                    </Button>
                                ) : (
                                    <div />
                                )}

                                {nextLesson && (
                                    <Button
                                        onClick={() =>
                                            setActiveLesson(nextLesson)
                                        }
                                    >
                                        Suivant
                                        <ChevronLeft className="h-4 w-4 rotate-180" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4 text-muted-foreground">
                            <PlayCircle className="h-12 w-12 opacity-30" />

                            <p className="text-sm">
                                Sélectionnez une leçon pour commencer
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}

StudentCourseShow.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: student.dashboard() },
        { title: 'Mes formations', href: student.courses.index() },
    ],
};
