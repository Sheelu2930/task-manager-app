import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    // const handleLogin = async () => {
    //     try {
    //         const res = await API.post("/login", {
    //             email: email,
    //             password: password,
    //         });

    //         // token save
    //         localStorage.setItem("token", res.data.token);

    //         // redirect
    //         navigate("/dashboard");
    //     } catch (err) {
    //         alert("Login failed");
    //         console.log(err);
    //     }
    // };


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
        <div className="h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow w-80">
                <h2 className="text-lg font-bold mb-4">Login</h2>

                {/* Email */}
                <input
                    type="email"
                    placeholder="Email"
                    className="border w-full p-2 mb-3"
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* Password */}
                <input
                    type="password"
                    placeholder="Password"
                    className="border w-full p-2 mb-3"
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* Button */}
                <button
                    onClick={handleLogin}
                    className="bg-blue-500 text-white w-full p-2 rounded"
                >
                    Login
                </button>
            </div>
        </div>
    );
}