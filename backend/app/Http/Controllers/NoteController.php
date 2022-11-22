<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreNoteRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'lessonId' => 'required',
            'body' => '',
        ]);

        if ($validator->fails()) {
            return response()->json(["errors" => $validator->getMessageBag()])->setStatusCode(400);
        }

        $note = Note::where([
            'lesson_id' => $id,
            'employee_id' => $request->user->external_id
        ])->first();

        if (!$note) {
            $note = new Note([
                'lesson_id' => $id,
                'employee_id' => $request->user->external_id
            ]);
        }
        $note->body = $request->get('body') ?: '';
        $note->save();

        sleep(1); // Demo purposes

        return ['note' => $note];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Note  $note
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, string $id)
    {
        $note = Note::where([
            'lesson_id' => $id,
            'employee_id' => $request->user->external_id
        ])->first();

        if (!$note) {
            $note = new Note([
                'lesson_id' => $id,
                'employee_id' => $request->user->external_id
            ]);
        }

        return ['note' => $note];
    }
}
