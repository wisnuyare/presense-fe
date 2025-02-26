const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const recordPresence = async (imageUrl: string) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/attendance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl }),
      credentials: "include",
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
