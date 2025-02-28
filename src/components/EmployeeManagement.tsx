import { useState } from "react";
import EmployeeTable from "./EmployeeTable";
import EmployeeForm from "./EmployeeForm";

const EmployeeManagement = () => {
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);

  const handleAddEmployeeClick = () => {
    setIsAddingEmployee(true);
  };

  const handleFormClose = () => {
    setIsAddingEmployee(false);
  };

  return (
    <div className="p-6">
      {!isAddingEmployee ? (
        <>
          <button
            onClick={handleAddEmployeeClick}
            className="bg-blue-500 text-white px-4 py-2 cursor-pointer rounded mb-4"
          >
            Add Employee
          </button>
          <EmployeeTable />
        </>
      ) : (
        <EmployeeForm onClose={handleFormClose} />
      )}
    </div>
  );
};

export default EmployeeManagement;
