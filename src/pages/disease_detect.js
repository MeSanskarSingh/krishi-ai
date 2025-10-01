import { useState } from "react";
import Image from "next/image";

export default function DiseaseDetect() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState("");

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) {
      alert("Please upload only image files.");
      return;
    }

    setSelectedImage(URL.createObjectURL(file));
    handlePrediction(file);
  };

  const handlePrediction = async (file) => {
    setResult("Processing...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Call FastAPI backend directly
      const res = await fetch("http://localhost:7000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setResult(
        data.prediction
          ? `${data.prediction} (${data.confidence}%)`
          : data.error || "No result."
      );
    } catch (err) {
      setResult("Error: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FEF7EB] p-6">
      <h1 className="text-3xl font-bold mb-6 font-mochiy text-[#462f27] tracking-wider mt-14">🌱 Disease Detection</h1>

      <div className="w-[400px] h-[450px] rounded-3xl bg-black bg-opacity-80 flex flex-col gap-5 px-6 py-6 justify-center items-center ">
        {/* Dropzone */}
      <label
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="w-80 h-48 border-2 border-dashed border-gray-400 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-green-400 transition"
      >
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Preview"
            className="w-full h-full object-cover rounded-2xl"
          />
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-gray-100">Drag & Drop your image here</p>
            <p className="text-sm text-gray-100">or click to upload</p>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />
      </label>

      {/* Result Box */}
      <textarea
        value={result}
        readOnly
        placeholder="Prediction result will appear here..."
        className="text-[#462f27] placeholder-[#462f27] text-center mt-6 w-80 h-32 p-3 bg-gray-200 border border-gray-100 rounded-xl resize-none focus:outline-none text-md font-mochiy"
      />
      </div>
      <div className="fixed right-10 bottom-5">
            <Image 
                src="/images/farmer-disease.png"
                height={612}
                width={408}
                alt="farmer-fertilizer"
            />
        </div>
    </div>
  );
}
