export default function ResumeUpload({ setResume }) {
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <label className="block font-semibold mb-2">
        Paste Resume Content
      </label>
      <textarea
        rows="4"
        className="border p-2 w-full"
        placeholder="Paste your resume text here..."
        onChange={(e) => setResume(e.target.value)}
      />
    </div>
  );
}
