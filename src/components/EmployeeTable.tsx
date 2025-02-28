import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { fetchEmployee } from "../utils/fetchEmployee";
import { Employee } from "../types/employeeTypes";
import Search from "./Search";
import { editEmployee } from "../utils/editEmployee";
import { deleteEmployee } from "../utils/deleteEmployee";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [user_id, setUser_id] = useState("");
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [message, setMessage] = useState("");

  const handleClickEdit = (index: number) => {
    setUser_id(employees[index].user_id);
    setBirthdate(
      new Date(employees[index].birthdate).toISOString().split("T")[0]
    );
    setName(employees[index].name);
    setIsModalOpen(true);
  };

  const handleClickDelete = (index: number) => {
    setUser_id(employees[index].user_id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      await deleteEmployee({ user_id });
      alert("Employee deleted successfully!");
      setIsDeleteModalOpen(false);
      handleSearch(searchQuery);
    } catch (error) {
      alert("Failed to delete employee. Please try again." + error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    setLoading(true);
    setMessage("");

    const sanitizedName = DOMPurify.sanitize(name);
    const sanitizedBirthdate = DOMPurify.sanitize(birthdate);

    try {
      setLoading(true);
      await editEmployee({
        name: sanitizedName,
        birthdate: sanitizedBirthdate,
        user_id,
      });
      setTimeout(() => {
        setIsModalOpen(false);
      }, 1000);
      alert("Employee updated successfully!");
    } catch (error) {
      alert("Failed to update employee. Please try again." + error);
    } finally {
      setLoading(false);
      handleSearch(searchQuery);
    }
  };

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      const data = await fetchEmployee(query);
      setEmployees(data);
    } catch (error) {
      setError("Failed to fetch employees" + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="overflow-x-auto bg-white p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Employee List</h2>
      <Search onSearch={setSearchQuery} />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Birthdate</th>
            <th className="border p-2">Edit</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center p-4">
                No employees found.
              </td>
            </tr>
          ) : (
            employees.map((employee, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border p-2">{employee.name}</td>
                <td className="border p-2">
                  {new Date(employee.birthdate).toLocaleDateString()}
                </td>
                <td className="border p-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => {
                      handleClickEdit(index);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => {
                      handleClickDelete(index);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-2">Edit Employee</h2>
            <input
              type="text"
              className="border p-2 w-full mb-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            <input
              type="date"
              className="border p-2 w-full mb-2"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
            {message && <p className="text-green-600">{message}</p>}
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="bg-gray-500 text-white px-3 py-1 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={handleEdit}
                disabled={loading}
              >
                {loading ? "Saving..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-2">Confirm Delete</h2>
            <p>Are you sure you want to delete this employee?</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="bg-gray-500 text-white px-3 py-1 rounded"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={handleConfirmDelete}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
