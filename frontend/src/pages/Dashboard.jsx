import { useEffect, useState } from "react";
import axios from "axios";

import ResumeUpload from "../components/ResumeUpload";
import JobDescription from "../components/JobDescription";
import ResultCard from "../components/ResultCard";
import JobForm from "../components/JobForm";
import JobList from "../components/JobList";

export default function Dashboard() {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("All");

  const fetchJobs = async () => {
    const res = await axios.get("https://job-tracker-oncc.onrender.com/jobs");
    setJobs(res.data);
  };

  const resetAnalyzer = () => {
    setResume("");
    setJobDescription("");
    setResult(null);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* HERO HEADER */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <h1 className="text-5xl font-extrabold text-gray-900">
            AI Resume Analyzer & Job Tracker
          </h1>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">

        {/* RESUME ANALYZER CARD */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Resume Match Analysis
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResumeUpload resume={resume} setResume={setResume} />

            <JobDescription
              resume={resume}
              jobDescription={jobDescription}
              setJobDescription={setJobDescription}
              setResult={setResult}
            />
          </div>

          {result && (
            <div className="mt-8">
              <ResultCard result={result} />
            </div>
          )}

          <button
            onClick={resetAnalyzer}
            className="mt-6 text-sm text-red-600 hover:underline"
          >
            Reset analysis
          </button>
        </section>

        {/* JOB TRACKER CARD */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              Tracked Job Applications
            </h2>

            <div className="mt-4 md:mt-0">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border rounded-lg px-4 py-2 text-sm"
              >
                <option>All</option>
                <option>Applied</option>
                <option>Interview</option>
                <option>Rejected</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <JobForm refresh={fetchJobs} />
          </div>

          <JobList jobs={jobs} filter={filter} refresh={fetchJobs} />
        </section>
      </div>
    </div>
  );
}
