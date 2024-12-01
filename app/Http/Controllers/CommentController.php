<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
   public function store(Request $request)
   {
       // Валідація запиту
       $validated = $request->validate([
           'task_id' => 'required|exists:tasks,id',
           'comment' => 'required|string',
       ]);

       // Створення коментаря
       $comment = Comment::create([
           'author_id' => auth()->id(), 
           'task_id' => $validated['task_id'],
           'comment' => $validated['comment'],
       ]);

       // Повернення відповіді
       return response()->json($comment, 201);
   }
}
