<?php

namespace App\Http\Controllers;

use App\Domain\Repo;
use Illuminate\Support\Carbon;

class PeriodsController extends Controller
{
    public function periodSchedule(Repo $repo)
    {
        $periods = $repo->findPeriodsLocally();

        $days = [];
        $day = 0;
        foreach ($periods as $period) {
            $day = $period['day'] - 1;
            if (!array_key_exists($day, $days)) {
                $days[$day] = ['periods' => []];
                // finalise pervious day
                if ($day > 0) {
                    $days[$day - 1]['start'] = $days[$day - 1]['periods'][0]['start_time'];
                    $days[$day - 1]['end'] = $days[$day - 1]['periods'][count($days[$day - 1]['periods']) - 1]['end_time'];
                    $start = Carbon::createFromFormat("H:i:s", $days[$day - 1]['start']);
                    $end = Carbon::createFromFormat("H:i:s", $days[$day - 1]['end']);
                    $diffInMins = $start->diffInMinutes($end);
                    $diffInHours = floor($diffInMins / 60);
                    $days[$day - 1]['diff'] = [
                        'hours' => $diffInHours,
                        'minutus' => $diffInMins % 60,
                        'blocks' => $diffInMins / 5,
                    ];
                }
            }
            $days[$day]['periods'][] = $period;
        }
        $days[$day]['start'] = $days[$day]['periods'][0]['start_time'];
        $days[$day]['end'] = $days[$day]['periods'][count($days[$day]['periods']) - 1]['end_time'];
        $start = Carbon::createFromFormat("H:i:s", $days[$day]['start']);
        $end = Carbon::createFromFormat("H:i:s", $days[$day]['end']);
        $diffInMins = $start->diffInMinutes($end);
        $diffInHours = floor($diffInMins / 60);
        $days[$day]['diff'] = [
            'hours' => $diffInHours,
            'minutus' => $diffInMins % 60,
            'blocks' => $diffInMins / 5,
        ];

        return ['days' => $days];
    }
}
