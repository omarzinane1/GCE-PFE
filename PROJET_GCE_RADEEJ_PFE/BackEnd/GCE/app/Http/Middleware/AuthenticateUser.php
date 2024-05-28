<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthenticateUser
{
    public function handle(Request $request, Closure $next)
    {
        if (JWTAuth::check()) {
            return $next($request);
        }
        return response()->json(['message' => JWTAuth::check()], 401);

    }
}
