import AttendanceList from "../components/AttendanceList";
import DashboardLayout from "../layout/DashboardLayout";

const HrDashboard = () => {
  console.log("asd");
  return (
    <DashboardLayout role="hr">
      <h2 className="text-xl font-semibold m-4">Employee Attendance</h2>
      <div className="p-6">
        <AttendanceList />{" "}
      </div>
    </DashboardLayout>
  );
};

export default HrDashboard;
