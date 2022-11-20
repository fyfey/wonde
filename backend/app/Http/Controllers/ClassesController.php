<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Domain\Repo;

class ClassesController extends Controller
{
    function getClasses(Request $request, Repo $repo) {
        $classes = $repo->findClasses($request->user->external_id);
        
        return ['status' => 'OK', 'classes' => $classes];
    }
}
