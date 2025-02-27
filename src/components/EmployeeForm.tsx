import { useState } from "react";
import { EmployeePost } from "../types/employeeTypes";
import { addNewEmployee } from "../utils/addNewEmployee";
import DOMPurify from "dompurify";

interface EmployeeFormProps {
  onClose: () => void;
}

const AddEmployeeForm = ({ onClose }: EmployeeFormProps) => {
  const [newEmployee, setNewEmployee] = useState<EmployeePost>({
    name: "",
    birthdate: "",
    password: "",
    username: "",
    role: "employee",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !newEmployee.name ||
      !newEmployee.birthdate ||
      !newEmployee.password ||
      !newEmployee.username
    ) {
      alert("All form are required!");
      return;
    }

    const newUser: EmployeePost = {
      username: DOMPurify.sanitize(newEmployee.username),
      password: DOMPurify.sanitize(newEmployee.password),
      role: newEmployee.role,
      name: DOMPurify.sanitize(newEmployee.name),
      birthdate: new Date(DOMPurify.sanitize(newEmployee.birthdate))
        .toISOString()
        .split("T")[0],
    };
    try {
      setLoading(true);
      await addNewEmployee(newUser);

      setNewEmployee({
        name: "",
        birthdate: "",
        password: "",
        username: "",
        role: "employee",
      });
    } catch (error) {
      alert("Failed to add employee. Please try again." + error);
    } finally {
      alert("Employee added successfully!");
      setLoading(false);
      onClose();
    }
  };

  return (
    <div className="p-4 border rounded bg-white">
      <h3 className="text-lg font-semibold">Add Employee</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newEmployee.name}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          type="date"
          name="birthdate"
          value={newEmployee.birthdate}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={newEmployee.username}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newEmployee.password}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`px-4 py-2 rounded ${loading ? "bg-gray-400" : "bg-blue-500 text-white"}`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Employee"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployeeForm;
