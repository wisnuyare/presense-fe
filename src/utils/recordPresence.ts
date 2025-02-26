const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const recordPresence = async (formData: FormData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/record-presence`, {
      method: "POST",
      body: formData,
      credentials: "include", // If authentication is required
    });

    if (!res.ok) {
      throw new Error("Failed to record presence");
    }

    return await res.json();
  } catch (error) {
    console.error("Error recording presence:", error);
    throw error;
  }
};
