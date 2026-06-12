<?php

declare(strict_types=1);

namespace App\Http\Resources\Public;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class CourseResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'price' => number_format((float) $this->price, 0, ',', ' ').' €',
            'duration' => $this->duration,
            'image' => $this->image,
            'featured' => $this->featured,
            'category' => $this->whenLoaded('category', fn () => $this->category->name),
            'moduleCount' => $this->modules_count ?? $this->whenLoaded('modules', fn () => $this->modules->count(), 0),
            'lessonCount' => $this->whenLoaded('modules', fn () => $this->modules->sum(fn ($m) => $m->relationLoaded('lessons') ? $m->lessons->count() : 0), 0),
            'studentCount' => 0,
            'rating' => 0,
            'benefits' => $this->benefits,
            'objectives' => $this->when(
                $this->objectives !== null,
                fn () => collect($this->objectives)->map(fn (array $o) => [
                    'title' => $o['title'],
                    'description' => $o['description'],
                ])->values(),
            ),
            'prerequisites' => $this->prerequisites,
            'trainer' => $this->whenLoaded('trainer', fn () => [
                'name' => $this->trainer->name,
                'initials' => $this->trainerInitials(),
                'role' => $this->trainer->trainer_title,
                'bio' => $this->trainer->trainer_bio,
            ]),
            'modules' => $this->whenLoaded('modules', fn () => ModuleResource::collection($this->modules)->resolve()),
            'is_enrolled' => Auth::check()
                ? $this->enrollments()->where('user_id', Auth::id())->exists()
                : false,
        ];
    }

    private function trainerInitials(): string
    {
        return collect(explode(' ', $this->trainer->name))
            ->map(fn (string $word) => mb_strtoupper(mb_substr($word, 0, 1)))
            ->take(2)
            ->implode('');
    }
}
