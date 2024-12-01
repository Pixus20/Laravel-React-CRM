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
            'due_date'=>'nullable|date',
            'status'=>'nullable|string'
        ]);

        $task = Task::create($validatedData);

        return response()->json([
            'message' => 'Task created successfully',
            'task' => $task,
        ], 201);
    }

    public function index()
    {
        $tasks = Task::with('author', 'doer')->get();
        return response()->json($tasks, 200);
    }

    public function totalBill(Request $request)
    {
        $month = $request->query('month');
        $year = $request->query('year');
        $query = Task::query();
        if ($month && $year) {
            $query->whereMonth('created_at', $month)->whereYear('created_at', $year);
        }
        $totalBill = $query->sum('bill');
        return response()->json(['total_bill' => $totalBill], 200);
    }
    public function show($id)
    {
        $task = Task::with('author')->find($id);
    
        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }
    
        return response()->json($task, 200);
    }
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string|in:assigned,in_progress,on_hold,done',
        ]);

        $task = Task::find($id);

        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        $task->update(['status' => $request->status]);

        return response()->json(['message' => 'Task status updated successfully', 'task' => $task]);
    }
}
