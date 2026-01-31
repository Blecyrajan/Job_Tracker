import axios from "axios";

export default function JobList({ jobs, filter, refresh }) {
  const filteredJobs =
    filter === "All"
      ? jobs
      : jobs.filter((job) => job.status === filter);

  const updateStatus = async (id, status) => {
    await axios.put(`https://job-tracker-oncc.onrender.com/jobs/${id}`, { status });
    refresh();
  };

  if (filteredJobs.length === 0) {
    return <p className="text-gray-500">No jobs found.</p>;
  }

  return (
    <div className="space-y-3">
      {filteredJobs.map((job) => (
        <div
          key={job.id}
          className="border rounded p-3 flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{job.company}</p>
            <p className="text-sm text-gray-600">{job.role}</p>
          </div>

          <select
            value={job.status}
            onChange={(e) => updateStatus(job.id, e.target.value)}
            className="border p-1 rounded"
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Rejected</option>
          </select>
        </div>
      ))}
    </div>
  );
}
