import { useState } from "react";
import DOMPurify from "dompurify";
import { recordPresence } from "../utils/recordPresence";
import { uploadImage } from "../utils/uploadImage";

const RecordPresence = () => {
  const [image, setImage] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      file.name.replace(file.name, DOMPurify.sanitize(file.name));
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
          alert("File is too large!");
          e.target.value = "";
          return;
      }
      setImage(file);
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      alert("Please upload a photo!");
      return;
    }
    
    

    const formData = new FormData();
    formData.append("avatar", image);

    try {
      const imageUrl = await uploadImage(formData);
      const response = await recordPresence(imageUrl);
      alert(
        "Presence recorded successfully:" + JSON.stringify(response.message)
      );
      setImage(null);
    } catch (error) {
      alert("Failed to record presence." + error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-6">
      <label
        htmlFor="file-upload"
        className={`${
          image ? "bg-red-500" : "bg-blue-500"
        } text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-600 transition duration-200`}
      >
        {image ? image.name : "Select Image"}{" "}
        {/* Show file name or default text */}
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Submit
      </button>
    </div>
  );
};

export default RecordPresence;
