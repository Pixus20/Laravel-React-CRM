<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'author_id' => 'required|exists:users,id',
            'task_id' => 'required|exists:tasks,id',
            'comment' => 'required|string|max:1000',
        ]);
    
        $comment = Comment::create($validatedData);
    
        return response()->json(['message' => 'Comment added successfully', 'comment' => $comment], 201);
    }
}
