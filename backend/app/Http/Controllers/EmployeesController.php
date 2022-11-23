<?php

namespace App\Http\Controllers;

use App\Models\User;

class EmployeesController extends Controller
{
    function getAllUsernames()
    {
        return ['usernames' => User::orderBy('name')->get()->map(function ($user) {
            return $user->name;
        })];
    }
}
