// src/pages/Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("http://localhost:5000/usuarios/login", {
                email,
                senha,
            });

            // Armazena o token no localStorage
            localStorage.setItem("token", response.data.token);

            // Redireciona para a página principal
            navigate("/dashboard");
        } catch (error) {
            setError(error.response?.data?.message || "Erro ao realizar login.");
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f8f9fa" }}>
            <form onSubmit={handleSubmit} style={{ background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
                <h2 style={{ marginBottom: "20px", textAlign: "center" }}>Login</h2>
                {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ced4da" }}
                    />
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>Senha:</label>
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                        style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ced4da" }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "10px",
                        background: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Entrar
                </button>
            </form>
        </div>
    );
};

export default Login;
