<?php

declare(strict_types=1);

namespace App\Http\Responses;

use App\Models\User;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
use Symfony\Component\HttpFoundation\Response;

class LoginResponse implements LoginResponseContract
{
    public function toResponse($request): Response
    {
        /** @var User $user */
        $user = $request->user();

        $default = match (true) {
            $user->isAdmin() => route('admin.dashboard'),
            $user->isTrainer() => route('trainer.dashboard'),
            $user->isStudent() => route('student.dashboard'),
            default => route('home'),
        };

        return redirect()->intended($default);
    }
}
