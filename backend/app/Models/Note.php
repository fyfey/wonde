<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    protected $fillable = ['body', 'lesson_id', 'employee_id'];

    use HasFactory;

    public static function findOrCreate($lessonId)
    {
        $obj = static::where('lesson_id', $lessonId)->first();
        if ($obj) {
            return $obj;
        }
        $note = new static;
        $note->lesson_id = $lessonId;
        return $note;
    }
}
