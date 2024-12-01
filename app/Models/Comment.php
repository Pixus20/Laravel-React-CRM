<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = ['author_id', 'task_id', 'comment'];

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function task()
    {
        return $this->belongsTo(Task::class, 'task_id');
    }
}
