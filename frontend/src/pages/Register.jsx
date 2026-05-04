import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", password: "" });

    const handleSubmit = async () => {
        try {
            await API.post("/register", form);
            alert("Registered successfully");
            navigate("/");
        } catch (err) {
            alert("Error");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
            <div className="bg-white p-6 rounded-xl shadow-lg w-80">
                <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

                <input className="input" placeholder="Name"
                    onChange={(e) => setForm({ ...form, name: e.target.value })} />

                <input className="input" placeholder="Email"
                    onChange={(e) => setForm({ ...form, email: e.target.value })} />

                <input className="input" type="password" placeholder="Password"
                    onChange={(e) => setForm({ ...form, password: e.target.value })} />

                <button className="btn" onClick={handleSubmit}>Register</button>

                <p className="text-sm mt-3 text-center">
                    Already have account? <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/")}>Login</span>
                </p>
            </div>
        </div>
    );
}