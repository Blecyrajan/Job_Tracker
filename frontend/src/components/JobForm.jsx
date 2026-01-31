import { useState } from "react";
import axios from "axios";

export default function JobForm({ refresh }) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");

  const submitJob = async () => {
    await axios.post("https://job-tracker-oncc.onrender.com/jobs", {
      company,
      role,
      status
    });
    setCompany("");
    setRole("");
    refresh();
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="font-semibold mb-2">Add Job</h2>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-2"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <select
        className="border p-2 w-full mb-2"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>Applied</option>
        <option>Interview</option>
        <option>Rejected</option>
      </select>

      <button
        onClick={submitJob}
        className="bg-green-600 text-white px-3 py-1 rounded"
      >
        Add Job
      </button>
    </div>
  );
}
