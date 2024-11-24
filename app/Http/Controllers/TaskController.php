<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'author_id' => 'required|exists:users,id',
            'doer_id' => 'required|exists:users,id',
            'bill' => 'required|integer',
            'description' => 'required|string',
            'short_description' => 'nullable|string',
            'due_date'=>'nullable|date'
        ]);

        $task = Task::create($validatedData);

        return response()->json([
            'message' => 'Task created successfully',
            'task' => $task,
        ], 201);
    }
    public function index()
{
    return response()->json(Task::all(), 200);
}
}
