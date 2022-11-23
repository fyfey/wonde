<?php

namespace App\Console\Commands;

use App\Domain\Repo;
use App\Models\Period;
use Illuminate\Console\Command;

class UpdatePeriods extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'class-planner:update-periods';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update local DB with school periods';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(Repo $repo)
    {
        foreach ($repo->findPeriods() as $period) {
            echo $period->id . PHP_EOL;
            $existing = Period::where('external_id', $period->id)->first();
            if ($existing) {
                continue;
            }
            Period::create([
                'external_id' => $period->id,
                'mis_id' => $period->mis_id,
                'name' => $period->name,
                'day' => dayNumFromStr($period->day),
                'start_time' => $period->start_time,
                'end_time' => $period->end_time,
            ]);
        }

        return Command::SUCCESS;
    }
}
