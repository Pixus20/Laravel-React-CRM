<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        return Task::select('id', 'title', 'short_description')->get();
    }
    public function show($id)
{
    $task = Task::with(['author', 'doer'])->findOrFail($id);
    return response()->json($task);
}
}