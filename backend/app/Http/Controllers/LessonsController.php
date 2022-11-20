<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Domain\Repo;

class LessonsController extends Controller
{
    function getLessons(Request $request, Repo $repo)
    {
        $start = Carbon::now()->startOfWeek(Carbon::MONDAY);
        $end = $start->copy()->endOfWeek(Carbon::SUNDAY);
        $after = $request->input('after', $start->format('Y-m-d'));
        $before = $request->input('before', $end->format('Y-m-d'));
        $lessons = $repo->findLessons($request->user->external_id, $after, $before);

        return ['status' => 'OK', 'lessons' => $lessons];
    }
}
