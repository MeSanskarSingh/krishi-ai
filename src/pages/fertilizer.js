import { useState } from "react";
import Image from "next/image";

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
  const [showManual, setShowManual] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FERTILIZER_API}/predict`,
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

      if (!response.ok) throw new Error("API Error");

      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      console.error(err);
      setPrediction(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EDE3D6] pt-24 px-6 flex justify-center">

    <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 items-end gap-32">

      {/* LEFT FARMER */}
      <div className="hidden lg:flex justify-end items-end mb-52">
        <Image
          src="/images/farmer-fertilizer.png"
          width={400}
          height={650}
          alt="farmer"
          className="object-contain"
          priority
        />
      </div>

      {/* FORM CARD */}
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-xl mx-auto">

        <h1 className="text-3xl font-bold mb-6 text-center text-[#5A3C34]">
          Fertilizer Recommendation
        </h1>

         {/* Reference Manual Link */}
        <p
          onClick={() => setShowManual(true)}
          className="text-center text-base text-[#3F9148] mt-5 mb-5 cursor-pointer hover:underline"
        >
          📘 View Reference Manual
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="number"
            placeholder="Soil Type (0–4)"
            value={soilType}
            onChange={(e) => setSoilType(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-5 py-3 text-base focus:ring-2 focus:ring-green-500 outline-none transition"
            required
          />

          <input
            type="number"
            placeholder="Crop Type (0–6)"
            value={cropType}
            onChange={(e) => setCropType(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-5 py-3 text-base focus:ring-2 focus:ring-green-500 outline-none transition"
            required
          />

          <input
            type="number"
            placeholder="Season (0–2)"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-5 py-3 text-base focus:ring-2 focus:ring-green-500 outline-none transition"
            required
          />

          <input
            type="number"
            step="any"
            placeholder="Soil pH"
            value={soilPH}
            onChange={(e) => setSoilPH(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-5 py-3 text-base focus:ring-2 focus:ring-green-500 outline-none transition"
            required
          />

          <input
            type="number"
            step="any"
            placeholder="Nitrogen (N)"
            value={nitrogen}
            onChange={(e) => setNitrogen(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-5 py-3 text-base focus:ring-2 focus:ring-green-500 outline-none transition"
            required
          />

          <input
            type="number"
            step="any"
            placeholder="Phosphorus (P)"
            value={phosphorus}
            onChange={(e) => setPhosphorus(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-5 py-3 text-base focus:ring-2 focus:ring-green-500 outline-none transition"
            required
          />

          <input
            type="number"
            step="any"
            placeholder="Potassium (K)"
            value={potassium}
            onChange={(e) => setPotassium(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-5 py-3 text-base focus:ring-2 focus:ring-green-500 outline-none transition"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-xl text-lg font-medium hover:bg-green-700 transition disabled:bg-gray-400"
          >
            {loading ? "Predicting..." : "Get Recommendation"}
          </button>

        </form>

        {/* Prediction */}
        {prediction && (
          <div className="mt-6 p-5 rounded-xl bg-green-50 border border-green-200">
            <p className="text-lg font-semibold text-green-800">
              Recommended Fertilizer
            </p>
            <p className="mt-2 text-gray-700 text-base">
              {prediction.fertilizer_name} — {prediction.fertilizer_amount_kg_acre} kg/acre
            </p>
          </div>
        )}

      </div>
    </div>

    {/* MODAL */}
    {showManual && (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-[#FEF7EB] w-[90%] max-w-2xl rounded-3xl p-8 shadow-2xl relative">

          <button
            onClick={() => setShowManual(false)}
            className="absolute top-4 right-6 text-xl font-bold text-gray-600 hover:text-black"
          >
            ✕
          </button>

          <h2 className="text-2xl font-bold mb-6 text-center text-[#5A3C34]">
            Reference Manual
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-base">

            <div>
              <h3 className="font-semibold mb-3">Soil Type (0–4)</h3>
              <ul className="space-y-2">
                <li>0 → Laterite Soil</li>
                <li>1 → Coastal Alluvium</li>
                <li>2 → Sandy Loam</li>
                <li>3 → Forest Loam</li>
                <li>4 → Red Soil</li>
              </ul>

              <h3 className="font-semibold mt-6 mb-3">Season (0–2)</h3>
              <ul className="space-y-2">
                <li>0 → Virippu (Kharif)</li>
                <li>1 → Mundakan (Rabi)</li>
                <li>2 → Puncha (Summer)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Crop Type (0–6)</h3>
              <ul className="space-y-2">
                <li>0 → Rice (Paddy)</li>
                <li>1 → Coconut</li>
                <li>2 → Rubber</li>
                <li>3 → Pepper</li>
                <li>4 → Cardamom</li>
                <li>5 → Cashew</li>
                <li>6 → Banana</li>
              </ul>

              <h3 className="font-semibold mt-6 mb-3">Example Values</h3>
              <ul className="space-y-2">
                <li>Soil pH: 5.5</li>
                <li>N: 40</li>
                <li>P: 30</li>
                <li>K: 20</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    )}
  </div>
  );
};

export default Fertilizer;