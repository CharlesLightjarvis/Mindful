<?php

declare(strict_types=1);

namespace App\Http\Responses;

use Laravel\Fortify\Contracts\RegisterResponse as RegisterResponseContract;

class RegisterResponse implements RegisterResponseContract
{
    public function toResponse($request)
    {
        if ($request->filled('checkout_plan')) {
            return redirect()->route('become-trainer.checkout.show', [
                'plan' => $request->input('checkout_plan'),
            ]);
        }

        if ($request->filled('checkout_course')) {
            return redirect()->route('courses.checkout.show', [
                'id' => $request->input('checkout_course'),
            ]);
        }

        return redirect()->intended(config('fortify.home'));
    }
}
