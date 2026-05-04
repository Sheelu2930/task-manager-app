import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            console.log("API URL:", API.defaults.baseURL);

            const res = await API.post("/login", {
                email,
                password,
            });

            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (err) {
            console.log(err.response);
            alert("Login failed");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Login to your account</h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="login-input"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="login-input"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={handleLogin} className="login-btn">
                    Login
                </button>

                <p className="login-text">
                    Don’t have an account?{" "}
                    <span onClick={() => navigate("/register")} className="login-link">
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
}