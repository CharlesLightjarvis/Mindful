<?php

declare(strict_types=1);

namespace App\Http\Controllers\Public\Courses;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Stripe\Checkout\Session;
use Stripe\Stripe;
use Symfony\Component\HttpFoundation\Response;

class CheckoutController extends Controller
{
    public function show(Request $request, int $courseId): Response
    {
        $course = Course::with('trainer')->published()->findOrFail($courseId);

        return $this->createSession($request, $course);
    }

    public function store(Request $request): Response
    {
        $request->validate([
            'course_id' => ['required', 'integer', 'exists:courses,id'],
        ]);

        $course = Course::with('trainer')->published()->findOrFail($request->course_id);

        return $this->createSession($request, $course);
    }

    private function createSession(Request $request, Course $course): Response
    {
        Stripe::setApiKey(config('cashier.secret'));

        $session = Session::create([
            'mode' => 'payment',
            'customer_email' => $request->user()->email,
            'line_items' => [[
                'price' => $course->stripe_price_id,
                'quantity' => 1,
            ]],
            'payment_intent_data' => [
                'transfer_data' => [
                    'destination' => $course->trainer->stripe_account_id,
                ],
            ],
            'metadata' => [
                'type' => 'course_purchase',
                'course_id' => $course->id,
                'student_id' => $request->user()->id,
            ],
            'success_url' => route('courses.purchase.success'),
            'cancel_url' => route('courses.show', $course->id),
        ]);

        return Inertia::location($session->url);
    }
}
