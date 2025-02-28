const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const uploadImage = async (formData: FormData): Promise<string> => {
  const res = await fetch(`${API_BASE_URL}/api/upload`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to upload image");
  }

  const uploadData = await res.json();
  return uploadData.url;
};
