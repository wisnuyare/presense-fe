export interface EmployeePost {
  username: string;
  password: string;
  role: "employee" | "hr";
  name: string;
  birthdate: string;
}

export interface Employee {
  id: number;
  name: string;
  birthdate: string;
  user_id: string;
}
