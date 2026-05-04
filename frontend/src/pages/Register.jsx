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
        <div className="register-container">
            <div className="register-card">

                <h2 className="register-title">Create your account</h2>

                <input
                    className="register-input"
                    placeholder="Name"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <input
                    className="register-input"
                    placeholder="Email"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <input
                    className="register-input"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                <button className="register-btn" onClick={handleSubmit}>
                    Register
                </button>

                <p className="register-text">
                    Already have account?{" "}
                    <span
                        className="register-link"
                        onClick={() => navigate("/")}
                    >
                        Login
                    </span>
                </p>

            </div>
        </div>
    );
}