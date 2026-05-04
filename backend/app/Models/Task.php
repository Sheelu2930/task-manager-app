<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    // ✅ ye allow karta hai mass assignment (important)
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'status',
        'due_date',
    ];

    // ✅ relation: task belongs to user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}