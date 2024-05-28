<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        // Vérifier si l'utilisateur est connecté
        if (!$request->user()) {
            return response()->json(['error' => 'Unauthenticated.'], 401);
        }

        // Vérifier si l'utilisateur a l'un des rôles spécifiés
        foreach ($roles as $role) {
            if ($request->user()->hasRole($role)) {
                return $next($request);
            }
        }

        // Si l'utilisateur n'a pas le rôle requis, retourner une réponse non autorisée
        return response()->json(['error' => 'Unauthorized.'], 403);
    }
}
