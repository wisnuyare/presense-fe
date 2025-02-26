import Navbar from "../components/Navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: "employee" | "hr";
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="w-full max-w-5xl mx-auto p-6 min-h-screen bg-gray-100">
      <Navbar />
      {children}
    </div>
  );
};

export default DashboardLayout;
