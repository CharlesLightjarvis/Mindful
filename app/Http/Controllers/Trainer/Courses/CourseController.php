<?php

namespace App\Http\Controllers\Trainer\Courses;

use App\Actions\Trainer\Courses\CreateCourseAction;
use App\Actions\Trainer\Courses\DeleteCourseAction;
use App\Actions\Trainer\Courses\UpdateCourseAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Courses\StoreCourseRequest;
use App\Http\Requests\Admin\Courses\UpdateCourseRequest;
use App\Http\Resources\Admin\CourseResource;
use App\Models\Category;
use App\Models\Course;
use App\Models\User;
use App\Repositories\Trainer\Courses\CourseRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Attributes\Controllers\Authorize;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
    public function __construct(
        private readonly CourseRepository   $repository,
        private readonly CreateCourseAction $createAction,
        private readonly UpdateCourseAction $updateAction,
        private readonly DeleteCourseAction $deleteAction,
    ) {}

    public function index(): Response
    {
        /** @var User $user */
        $user = Auth::user();

        return Inertia::render('trainer/courses/index', [
            'courses' => $this->repository->paginate($user, 10)->through(
                fn (Course $course) => CourseResource::make($course)->resolve(),
            ),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('trainer/courses/create', [
            'categories' => Category::query()->orderBy('order')->get(['id', 'name']),
        ]);
    }

    #[Authorize('create', Course::class)]
    public function store(StoreCourseRequest $request): RedirectResponse
    {
        /** @var User $user */
        $user = Auth::user();

        $this->createAction->handle($user, $request->validated());

        return redirect()
            ->route('trainer.courses.index')
            ->with('success', 'Formation créée avec succès.');
    }

    #[Authorize('update', 'course')]
    public function edit(Course $course): Response
    {
        /** @var User $user */
        $user = Auth::user();

        return Inertia::render('trainer/courses/edit', [
            'course'     => (new CourseResource($this->repository->find($user, $course->id)))->resolve(),
            'categories' => Category::query()->orderBy('order')->get(['id', 'name']),
        ]);
    }

    #[Authorize('update', 'course')]
    public function update(UpdateCourseRequest $request, Course $course): RedirectResponse
    {
        $this->updateAction->handle($course, $request->validated());

        return redirect()
            ->route('trainer.courses.index')
            ->with('success', 'Formation mise à jour avec succès.');
    }

    #[Authorize('delete', 'course')]
    public function destroy(Course $course): RedirectResponse
    {
        $this->deleteAction->handle($course);

        return redirect()
            ->route('trainer.courses.index')
            ->with('success', 'Formation supprimée avec succès.');
    }
}
