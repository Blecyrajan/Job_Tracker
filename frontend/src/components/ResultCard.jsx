export default function ResultCard({ result }) {
  return (
    <div className="bg-slate-50 border rounded-xl p-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
        Match Results
      </h3>

      <div className="mb-6">
        <p className="text-lg text-gray-700">
          Resume Match Score
        </p>
        <p className="text-4xl font-bold text-green-600">
          {result.match}%
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">
            Missing Skills
          </h4>
          <ul className="list-disc ml-5 text-gray-600">
            {result.missingSkills.length > 0 ? (
              result.missingSkills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))
            ) : (
              <li>No major skill gaps found</li>
            )}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-700 mb-2">
            Improvement Suggestions
          </h4>
          <ul className="list-disc ml-5 text-gray-600">
            {result.suggestions.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
