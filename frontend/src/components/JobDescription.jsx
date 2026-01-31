import axios from "axios";

export default function JobDescription({
  resume,
  jobDescription,
  setJobDescription,
  setResult
}) {
  const analyze = async () => {
    if (!resume || !jobDescription) {
      alert("Please enter both resume and job description");
      return;
    }

    const res = await axios.post("https://job-tracker-oncc.onrender.com/analyze", {
      resume,
      jobDescription
    });

    setResult(res.data);
  };

  return (
    <div className="mb-4">
      <label className="block font-medium mb-1 text-gray-600">
        Job Description
      </label>
      <textarea
        rows="4"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste job description here..."
        className="w-full border rounded p-3 mb-3 focus:outline-none focus:ring focus:border-blue-300"
      />

      <button
        onClick={analyze}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Analyze Resume
      </button>
    </div>
  );
}
