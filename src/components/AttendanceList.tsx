import { useEffect, useState } from "react";
import Search from "./Search";
import { fetchAttendance } from "../utils/fetchAttendance";
import { Attendance } from "../types/attendanceTypes";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AttendanceList = () => {
  const [attendances, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      const data = await fetchAttendance(query);
      setAttendance(data);
    } catch (error) {
      setError("Failed to fetch attendance" + error);
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
      <h2 className="text-2xl font-bold mb-4">Attendance List</h2>
      <Search onSearch={setSearchQuery} />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Attendance Time</th>
            <th className="border p-2">Photo</th>
          </tr>
        </thead>
        <tbody>
          {attendances.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center p-4">
                No attendance found.
              </td>
            </tr>
          ) : (
            attendances.map((attendance) => (
              <tr key={attendance.id} className="hover:bg-gray-50">
                <td className="border p-2">{attendance.name}</td>
                <td className="border p-2">
                  {new Date(attendance.timestamp).toLocaleDateString()}
                </td>
                <td className="border p-2">
                  {attendance.photo ? (
                    <img
                      src={API_BASE_URL + attendance.photo}
                      alt="Attendance Photo"
                      className="w-xs h-auto"
                    />
                  ) : (
                    "No photo available"
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceList;
