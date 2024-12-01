<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'author_id',
        'doer_id',
        'bill',
        'due_date',
        'status',
        'description',
        'short_description',
    ];
    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function doer()
    {
        return $this->belongsTo(User::class, 'doer_id');
    }
    public function comments()
    {
        return $this->hasMany(Comment::class, 'task_id');
    }
}
