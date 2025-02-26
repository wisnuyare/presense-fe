const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchEmployee = async (search?: string) => {
  const url = search
    ? `${API_BASE_URL}/api/employees?search=${search}`
    : `${API_BASE_URL}/api/employees`;

  try {
    const response = await fetch(url, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
};
