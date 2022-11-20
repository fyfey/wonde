<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;
use Illuminate\Validation\UnauthorizedException;

class JwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $jwt = $this->getJwtFromRequest($request);
        try {
            $decoded = JWT::decode($jwt, new Key(env('APP_KEY'), 'HS256'));

            $user = User::findOrFail($decoded->uid);
            $request->user = $user;

            return $next($request);
        } catch (Exception $e) {
            throw new UnauthorizedException();
        }
    }

    private function getJwtFromRequest(Request $request): string
    {
        $authHeader = $request->header('Authorization');
        if ($authHeader) {
            $parts = explode(" ", $authHeader);
            if (!count($parts) || !$authHeader) {
                throw new UnauthorizedException();
            }
            return $parts[1];
        }
        $tokenCookie = $request->cookie('X-Security-Token');
        if (!$tokenCookie) {
            throw new UnauthorizedException();
        }
        return $tokenCookie;
    }
}
