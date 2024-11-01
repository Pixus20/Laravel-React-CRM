<?php

// app/Models/Task.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'short_description', 'author_id', 'doer_id'];

    // Зв'язок із моделлю User як автор
    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    // Зв'язок із моделлю User як виконавець
    public function doer()
    {
        return $this->belongsTo(User::class, 'doer_id');
    }
}
