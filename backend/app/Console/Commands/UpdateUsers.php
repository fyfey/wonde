<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Domain\Repo;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class UpdateUsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'wonde:update-users';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update local DB with users (staff) from the School';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(Repo $repo)
    {
        foreach ($repo->findTeachers() as $employee) {
            $name = strtolower("{$employee->forename}.{$employee->surname}");
            echo $employee->id . PHP_EOL;
            $user = User::where('external_id', $employee->id)->first();
            if ($user) {
                continue;
            }
            User::create([
                'name' => $name,
                'email' => "{$name}@example.com",
                'external_id' => $employee->id,
                'password' => Hash::make('password1')
            ]);
        }

        return Command::SUCCESS;
    }
}
