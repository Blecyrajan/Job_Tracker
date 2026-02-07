import { useState } from "react";
import axios from "axios";
import { API_BASE } from "../api";
import { useNavigate } from "react-router-dom";


export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
  try {
    await axios.post(`${API_BASE}/register`, {
      email,
      password
    });

    alert("Registered successfully. Please login.");
    navigate("/login"); 
  } catch (err) {
    alert("Registration failed");
  }
};


  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mb-3"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={register}
          className="bg-green-600 text-white w-full py-2 rounded"
        >
          Register
        </button>
      </div>
    </div>
  );
}
