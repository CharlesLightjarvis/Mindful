<?php

declare(strict_types=1);

namespace App\Actions\Admin\Courses;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UploadLessonMediaAction
{
    public function handleAudio(UploadedFile $file, ?string $existingUrl = null): string
    {
        return $this->upload($file, 'Mindfulness/Audio/Lessons', $existingUrl);
    }

    public function handlePdf(UploadedFile $file, ?string $existingUrl = null): string
    {
        return $this->upload($file, 'Mindfulness/Pdf/Lessons', $existingUrl);
    }

    private function upload(UploadedFile $file, string $folder, ?string $existingUrl): string
    {
        if ($existingUrl) {
            $endpointUrl = rtrim(config('filesystems.disks.imagekit.endpoint_url'), '/');
            $oldPath = ltrim(str_replace($endpointUrl.'/', '', $existingUrl), '/');

            try {
                Storage::disk('imagekit')->delete($oldPath);
            } catch (\Throwable) {
                // Fichier introuvable sur ImageKit, on continue.
            }
        }

        $path = $folder.'/'.Str::uuid().'.'.$file->getClientOriginalExtension();

        Storage::disk('imagekit')->put($path, $file->get());

        return rtrim(config('filesystems.disks.imagekit.endpoint_url'), '/').'/'.$path;
    }
}
