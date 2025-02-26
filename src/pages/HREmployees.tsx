import DashboardLayout from "../layout/DashboardLayout";
import EmployeeManagement from "../components/EmployeeManagement";

const HrEmployees = () => {
  return (
    <DashboardLayout role="hr">
      <h2 className="text-xl font-semibold m-4">Employee List</h2>
      <EmployeeManagement />
    </DashboardLayout>
  );
};

export default HrEmployees;
