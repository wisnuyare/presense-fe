import { Employee } from "../types/employeeTypes";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const editEmployee = async (body: Omit<Employee, "id">) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/employees`, {
      method: "PUT",
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
