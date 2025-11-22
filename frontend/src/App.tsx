import React, { useState } from "react";
import { ScoreResponse } from "./types";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [scenario, setScenario] = useState("");
  const [pitch, setPitch] = useState("");
  const [result, setResult] = useState<ScoreResponse | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    setResult(null);
    if (!scenario || !pitch) {
      setError("Please enter both scenario and pitch.");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/evaluate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenario, pitch }),
      });
      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }
      const data: ScoreResponse = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch evaluation.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6 font-sans">
      <div className="bg-white w-full max-w-xl p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          PitchSense Roleplay Scoring
        </h1>

        {/* Scenario */}
        <div className="mb-6">
          <label className="block font-medium mb-2">Scenario</label>
          <input
            type="text"
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            placeholder="Describe the business scenario..."
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Pitch */}
        <div className="mb-6">
          <label className="block font-medium mb-2">Pitch</label>
          <textarea
            value={pitch}
            onChange={(e) => setPitch(e.target.value)}
            rows={5}
            placeholder="Write your sales pitch here..."
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white py-3 rounded-xl text-lg font-semibold hover:bg-gray-800 transition"
        >
          Evaluate Pitch
        </button>

        {/* Error */}
        {error && (
          <p className="text-red-600 mt-4 text-center font-medium">{error}</p>
        )}

        {/* Results */}
        {result && (
          <div className="mt-8 bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Evaluation Results
            </h2>

            <ul className="space-y-1 text-gray-700">
              <li>
                <strong>Overall Score:</strong> {result.overallScore}
              </li>
              <li>
                <strong>Clarity:</strong> {result.clarity}
              </li>
              <li>
                <strong>Relevance:</strong> {result.relevance}
              </li>
              <li>
                <strong>Persuasiveness:</strong> {result.persuasiveness}
              </li>
              <li>
                <strong>Confidence:</strong> {result.confidence}
              </li>
            </ul>

            <h3 className="font-semibold text-lg mt-4 mb-2">Insights</h3>
            <p className="text-gray-700">{result.insights}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
