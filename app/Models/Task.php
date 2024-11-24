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
        'description',
        'short_description',
    ];
}
