import { useState } from "react";

const Fertilizer = () => {
  const [soilType, setSoilType] = useState("");
  const [cropType, setCropType] = useState("");
  const [season, setSeason] = useState("");
  const [soilPH, setSoilPH] = useState("");
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/predict`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            soil_type: parseInt(soilType),
            crop_type: parseInt(cropType),
            season: parseInt(season),
            soil_ph: parseFloat(soilPH),
            nitrogen: parseFloat(nitrogen),
            phosphorus: parseFloat(phosphorus),
            potassium: parseFloat(potassium),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recommendation");
      }

      const data = await response.json();
      setPrediction(data);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      setPrediction(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-lg bg-white shadow-md rounded-xl p-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-green-700">
          Fertilizer Recommendation
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            placeholder="Soil Type (0-4)"
            value={soilType}
            onChange={(e) => setSoilType(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
          <input
            type="number"
            placeholder="Crop Type (0-6)"
            value={cropType}
            onChange={(e) => setCropType(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
          <input
            type="number"
            placeholder="Season (0-2)"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
          <input
            type="number"
            step="any"
            placeholder="Soil pH"
            value={soilPH}
            onChange={(e) => setSoilPH(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
          <input
            type="number"
            step="any"
            placeholder="Nitrogen (N)"
            value={nitrogen}
            onChange={(e) => setNitrogen(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
          <input
            type="number"
            step="any"
            placeholder="Phosphorus (P)"
            value={phosphorus}
            onChange={(e) => setPhosphorus(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
          <input
            type="number"
            step="any"
            placeholder="Potassium (K)"
            value={potassium}
            onChange={(e) => setPotassium(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
          >
            {loading ? "Predicting..." : "Get Recommendation"}
          </button>
        </form>

        {prediction && (
          <div className="mt-6 p-4 border rounded-lg bg-green-50">
            <h2 className="text-lg font-semibold text-green-800">
              Recommended Fertilizer:
            </h2>
            <p className="mt-2 text-gray-700">
              {prediction.fertilizer_name} — {prediction.fertilizer_amount_kg_acre} kg/acre
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Fertilizer;
