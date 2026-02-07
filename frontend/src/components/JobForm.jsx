import { useState } from "react";
import axios from "axios";
import { API_BASE } from "../api";

export default function JobForm({ refresh }) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [loading, setLoading] = useState(false);

  const submitJob = async (e) => {
    e.preventDefault(); // prevent page reload

    if (!company || !role) {
      alert("Please enter both company and role");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add jobs");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${API_BASE}/jobs`,
        {
          company,
          role,
          status
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Reset form
      setCompany("");
      setRole("");
      setStatus("Applied");

      // Refresh job list
      refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to add job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submitJob} className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Company"
          className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          type="text"
          placeholder="Role"
          className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <select
          className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Rejected</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-4 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Job"}
      </button>
    </form>
  );
}
