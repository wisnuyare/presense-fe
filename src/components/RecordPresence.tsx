import { useState } from "react";
import { recordPresence } from "../utils/recordPresence";

const RecordPresence = () => {
  const [image, setImage] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      alert("Please upload a photo!");
      return;
    }

    const formData = new FormData();
    formData.append("photo", image); // Ensure backend accepts 'photo' field

    try {
      const response = await recordPresence(formData);
      console.log("Presence recorded successfully:", response);
    } catch (error) {
      alert("Failed to record presence." + error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
};

export default RecordPresence;
