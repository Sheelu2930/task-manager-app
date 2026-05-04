<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    // GET TASKS
    public function index(Request $request)
    {
        return $request->user()->tasks()->latest()->paginate(5);
    }

    // CREATE TASK
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required'
        ]);

        return $request->user()->tasks()->create([
            'title' => $request->title,
            'description' => $request->description,
            'due_date' => $request->due_date,
            'status' => 'pending' // default
        ]);
    }

    // UPDATE (DONE / PENDING)
    public function update(Request $request, $id)
    {
        $task = $request->user()->tasks()->findOrFail($id);

        $task->update([
            'status' => $request->status
        ]);

        return $task;
    }

    // DELETE
    public function destroy(Request $request, $id)
    {
        $task = $request->user()->tasks()->findOrFail($id);
        $task->delete();

        return response()->json(['message' => 'Deleted']);
    }
}