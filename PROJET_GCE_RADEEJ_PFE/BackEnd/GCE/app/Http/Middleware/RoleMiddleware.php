<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'Unauthenticated. Please log in.'], 401); // HTTP 401 Unauthorized
        }

        $user = Auth::user();

        if (!in_array($user->role, $roles)) {
            return response()->json(['error' => 'Access denied. You do not have the required role.'], 403); // HTTP 403 Forbidden
        }

        return $next($request);
    }
}
