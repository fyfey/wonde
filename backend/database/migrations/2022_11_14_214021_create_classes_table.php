<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('classes', function (Blueprint $table) {
            $table->id();
            $table->string('external_id');
            $table->integer('mis_id');
            $table->string('name');
            $table->tinyInteger('day');
            $table->time('start_time');
            $table->time('end_time');
            $table->timestamps();
        });
        Schema::create('class_user', function (Blueprint $table) {
            $table->integer('class_id');
            $table->integer('user_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('class_user');
        Schema::dropIfExists('classes');
    }
};
