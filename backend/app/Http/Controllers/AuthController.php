<?php

namespace App\Http\Controllers;

use App\Models\User;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function auth(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(["errors" => $validator->getMessageBag()])->setStatusCode(400);
        }

        $user = User::where('name', $request->get('username'))->first();
        if (!$user) {
            return response()->json(["error" => 'unauthorized'])->setStatusCode(401);
        }

        if (!Hash::check($request->get('password'), $user->password)) {
            return response()->json(["error" => 'unauthorized'])->setStatusCode(401);
        }

        $now = Carbon::now();
        $payload = [
            'iss' => 'http://example.org',
            'aud' => 'http://example.com',
            'iat' => $now->timestamp,
            'exp' => $now->addHours(24)->timestamp,
            'uid' => $user->id,
            // 'name' => $user->name,
        ];
        $jwt = JWT::encode($payload, env('APP_KEY'), 'HS256');

        /**
         * Store signed cookie
         */
        Cookie::queue('X-Security-Token', $jwt, 60 * 24);

        return ['user' => [
            'id' => $user->id,
            'name' => $user->name,
            'external_id' => $user->exteral_id,
        ]];
    }

    public function deauth()
    {
        Cookie::expire('X-Security-Token');
    }

    public function me(Request $request)
    {
        return [
            'id' => $request->user->id,
            'external_id' => $request->user->external_id,
            'name' => $request->user->name,
        ];
    }
}
