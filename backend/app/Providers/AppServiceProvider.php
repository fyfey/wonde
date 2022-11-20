<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Wonde\Client;
use App\Domain\Repo;
use App\Domain\Repo\WondeApi\WondeRepo;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(Repo::class, function ($app) {
            $client = new Client(env('WONDE_API_KEY'));

            return new WondeRepo($client);
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot(Repo $repo)
    {
        $repo->init();
    }
}
