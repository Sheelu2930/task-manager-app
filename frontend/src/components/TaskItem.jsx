export default function TaskItem({ task, toggle, remove }) {
    return (
        <div className="flex justify-between bg-white p-3 rounded shadow mb-2">
            <span
                onClick={() => toggle(task)}
                className={`cursor-pointer ${task.completed ? "line-through text-gray-400" : ""}`}
            >
                {task.title}
            </span>

            <button onClick={() => remove(task.id)} className="text-red-500">
                Delete
            </button>
        </div>
    );
}