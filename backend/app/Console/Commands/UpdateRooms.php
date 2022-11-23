<?php

namespace App\Console\Commands;

use App\Domain\Repo;
use App\Models\Room;
use Illuminate\Support\Carbon;
use Illuminate\Console\Command;

class UpdateRooms extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'class-planner:update-rooms';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update local DB with rooms';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(Repo $repo)
    {
        foreach ($repo->findRooms() as $room) {
            $existing = Room::where('external_id', $room->id)->first();
            if ($existing) {
                continue;
            }
            Room::create([
                'external_id' => $room->id,
                'mis_id' => $room->mis_id,
                'name' => $room->name,
                'code' => $room->code,
            ]);
        }

        return Command::SUCCESS;
    }
}
