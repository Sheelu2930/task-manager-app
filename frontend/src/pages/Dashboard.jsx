import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [filter, setFilter] = useState("all");
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const total = tasks.length;
    const doneCount = tasks.filter(t => t.status === "completed").length;
    const pendingCount = tasks.filter(t => t.status === "pending").length;

    const fetchTasks = async () => {
        const res = await API.get(`/tasks?page=${page}`);
        setTasks(res.data.data);
        setLastPage(res.data.last_page);
    };

    const addTask = async () => {
        try {
            // validation
            if (!title.trim()) {
                alert("Title required");
                return;
            }

            await API.post("/tasks", {
                title: title,
                description: description,
                due_date: dueDate,
            });

            // reset fields
            setTitle("");
            setDescription("");
            setDueDate("");

            // refresh list
            fetchTasks();

        } catch (err) {
            console.log(err);
            alert("Something went wrong");
        }
    };

    const toggleTask = async (task) => {
        await API.put(`/tasks/${task.id}`, {
            status: task.status === "pending" ? "completed" : "pending"
        });

        fetchTasks();
    };

    const deleteTask = async (id) => {
        await API.delete(`/tasks/${id}`);
        fetchTasks();
    };

    useEffect(() => {
        fetchTasks();
    }, [page]);

    const filteredTasks = tasks.filter((task) => {
        if (filter === "completed") return task.status === "completed";
        if (filter === "pending") return task.status === "pending";
        return true;
    });

    return (
        <>
            <div className="header">
                <h1 className="title">Task Manager</h1>

                <button
                    className="btn btn-delete"
                    onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/";
                    }}
                >
                    Logout
                </button>
            </div>

            <div className="container">

                {/* Add */}
                <div style={{ marginBottom: "20px" }}>
                    <input
                        className="input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter task title..."
                    />

                    <input
                        className="input"
                        placeholder="Description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <input
                        className="input"
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />

                    <button
                        className="btn btn-add"
                        style={{ width: "100%", marginTop: "10px" }}
                        onClick={addTask}
                    >
                        + Add Task
                    </button>

                </div>

                {/* Filters */}
                <div className="filters">

                    <button
                        style={{
                            background: filter === "all" ? "#4f46e5" : "#e5e7eb",
                            color: filter === "all" ? "white" : "black"
                        }}
                        onClick={() => setFilter("all")}
                    >
                        All ({total})
                    </button>

                    <button
                        style={{
                            background: filter === "completed" ? "#22c55e" : "#e5e7eb",
                            color: filter === "completed" ? "white" : "black"
                        }}
                        onClick={() => setFilter("completed")}
                    >
                        Done ({doneCount})
                    </button>

                    <button
                        style={{
                            background: filter === "pending" ? "#f59e0b" : "#e5e7eb",
                            color: filter === "pending" ? "white" : "black"
                        }}
                        onClick={() => setFilter("pending")}
                    >
                        Pending ({pendingCount})
                    </button>

                </div>

                {/* Empty */}
                {filteredTasks.length === 0 && (
                    <p className="empty">No tasks yet </p>
                )}

                {/* Tasks */}
                {filteredTasks.map((task) => (
                    <div
                        key={task.id}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            background: "white",
                            padding: "15px",
                            borderRadius: "10px",
                            marginBottom: "10px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                        }}
                    >
                        <div>
                            <p
                                style={{
                                    textDecoration: task.status === "completed" ? "line-through" : "none",
                                    fontWeight: "500"
                                }}
                            >
                                {task.title}
                            </p>

                            {task.description && (
                                <small style={{ color: "gray" }}>
                                    {task.description}
                                </small>
                            )}

                            {task.due_date && (
                                <div style={{ fontSize: "12px", color: "#4f46e5" }}>
                                    📅 {task.due_date}
                                </div>
                            )}
                        </div>

                        <div>
                            <button
                                className="btn btn-done"
                                onClick={() => toggleTask(task)}
                            >
                                ✔
                            </button>

                            <button
                                className="btn btn-delete"
                                onClick={() => deleteTask(task.id)}
                                style={{ marginLeft: "5px" }}
                            >
                                ✖
                            </button>
                        </div>
                    </div>
                ))}

                {/* Pagination */}
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        Prev
                    </button>

                    <span style={{ margin: "0 10px" }}>{page}</span>

                    <button
                        disabled={page === lastPage}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </button>
                </div>

            </div >
        </>
    );
}