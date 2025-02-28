const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const deleteEmployee = async (body: { user_id: string }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/employees`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("POST Error:", error);
    throw error;
  }
};
