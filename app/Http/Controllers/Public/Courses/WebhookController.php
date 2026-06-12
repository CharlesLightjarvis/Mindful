<?php

declare(strict_types=1);

namespace App\Http\Controllers\Public\Courses;

use App\Enums\RoleEnum;
use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use App\Models\User;
use Symfony\Component\HttpFoundation\Response;

class WebhookController extends Controller
{
    public function handleCheckoutSessionCompleted(array $payload): Response
    {
        $session = $payload['data']['object'];
        $metadata = $session['metadata'] ?? [];

        $studentId = $metadata['student_id'] ?? null;
        $courseId = $metadata['course_id'] ?? null;

        if ($studentId && $courseId) {
            Enrollment::firstOrCreate(
                ['user_id' => $studentId, 'course_id' => $courseId],
                [
                    'stripe_payment_intent_id' => $session['payment_intent'] ?? null,
                    'enrolled_at' => now(),
                ],
            );

            $student = User::find($studentId);
            $student?->assignRole(RoleEnum::Student->value);
        }

        return response('', 200);
    }
}
