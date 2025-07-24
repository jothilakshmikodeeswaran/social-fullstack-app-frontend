import { useState } from "react";
import { backendClient } from "../clients/backendClient";

function ImageUsers() {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("image", formData.image);

      await backendClient.post("/imageuser/upload", payload);

      const imgRes = await backendClient.get(
        `/imageuser/image/${formData.name}`,
        {
          responseType: "blob",
        }
      );

      const imageUrl = URL.createObjectURL(imgRes.data);
      setPreview(imageUrl);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Upload Image
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="submit"
            value="Upload"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 cursor-pointer transition"
          />
        </form>

        {preview && (
          <div className="mt-6 text-center">
            <h2 className="text-lg font-semibold mb-2">Uploaded Image:</h2>
            <img src={preview} alt="Uploaded" className="max-w-full rounded" />
          </div>
        )}
      </div>
    </main>
  );
}

export default ImageUsers;
