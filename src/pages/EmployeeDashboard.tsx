import RecordPresence from "../components/RecordPresence";
import DashboardLayout from "../layout/DashboardLayout";

const EmployeeDashboard = () => {
  return (
    <DashboardLayout role="employee">
      <h2 className="text-xl font-semibold m-4">Record Presence</h2>
      <RecordPresence />
    </DashboardLayout>
  );
};

export default EmployeeDashboard;
