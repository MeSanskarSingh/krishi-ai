import formidable from "formidable";
import fs from "fs";
import FormData from "form-data";
import axios from "axios";

export const config = {
  api: {
    bodyParser: false, // Important
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: err.message });

    const file = files.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    try {
      const formData = new FormData();
      formData.append("file", fs.createReadStream(file.filepath), file.originalFilename);

      const response = await axios.post("http://localhost:8000/predict", formData, {
        headers: formData.getHeaders(),
      });

      return res.status(200).json(response.data);
    } catch (error) {
      console.error("Forwarding error:", error.response?.data || error.message);
      return res.status(500).json({ error: "FastAPI request failed" });
    }
  });
}
