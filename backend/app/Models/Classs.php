<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Classs extends Model
{
    protected $table_name = 'class';

    use HasFactory;

    public function teachers() {
        return $this->belongsToMany(User::class);
    }
}
