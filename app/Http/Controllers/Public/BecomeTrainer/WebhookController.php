<?php

declare(strict_types=1);

namespace App\Http\Controllers\Public\BecomeTrainer;

use App\Enums\RoleEnum;
use App\Http\Controllers\Controller;
use App\Models\User;
use Symfony\Component\HttpFoundation\Response;

class WebhookController extends Controller
{
    public function handleCheckoutSessionCompleted(array $payload): Response
    {
        $customerId = $payload['data']['object']['customer'] ?? null;

        if ($customerId) {
            $user = User::where('stripe_id', $customerId)->first();
            $user?->assignRole(RoleEnum::Trainer->value);
        }

        return response('', 200);
    }
}
