import { useState } from "react";
import "./UsersTable.css";

// Định nghĩa kiểu dữ liệu cho User
interface User {
  id: number;
  username: string;
  email: string;
  score: number;
  role: "admin" | "user";
  status: "active" | "banned";
}

// Dữ liệu giả lập (Mock data) - Khoảng 12 người để test phân trang
const mockUsers: User[] = [
  { id: 1, username: "hacker_pro", email: "hacker@gmail.com", score: 1250, role: "admin", status: "active" },
  { id: 2, username: "noob_master", email: "noob@yahoo.com", score: 450, role: "user", status: "active" },
  { id: 3, username: "shadow_ninja", email: "shadow@proton.me", score: 890, role: "user", status: "active" },
  { id: 4, username: "script_kiddie", email: "skiddie@gmail.com", score: 10, role: "user", status: "banned" },
  { id: 5, username: "pwn_god", email: "pwn@gmail.com", score: 2100, role: "user", status: "active" },
  { id: 6, username: "crypto_fan", email: "cryp@hotmail.com", score: 760, role: "user", status: "active" },
  { id: 7, username: "web_exploiter", email: "webx@gmail.com", score: 1120, role: "user", status: "active" },
  { id: 8, username: "sql_injector", email: "drop_table@gmail.com", score: 950, role: "user", status: "active" },
  { id: 9, username: "reverser_x", email: "revx@gmail.com", score: 1400, role: "user", status: "active" },
  { id: 10, username: "spammer_99", email: "spam@spam.com", score: 0, role: "user", status: "banned" },
  { id: 11, username: "linux_guru", email: "tux@linux.org", score: 1800, role: "user", status: "active" },
  { id: 12, username: "bug_hunter", email: "hunter@bounty.com", score: 1650, role: "user", status: "active" },
];

export default function UsersTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Số user hiển thị trên 1 trang

  // Tính toán tổng số trang
  const totalPages = Math.ceil(mockUsers.length / itemsPerPage);

  // Cắt mảng dữ liệu để lấy danh sách user cho trang hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = mockUsers.slice(startIndex, startIndex + itemsPerPage);

  // Hàm chuyển trang
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="glass-card users-table-container">
      <div className="table-header">
        <h2>User Management</h2>
        <p>Tổng số: {mockUsers.length} người dùng</p>
      </div>

      <div className="table-responsive">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Score</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td>#{user.id}</td>
                <td className="font-medium text-white">{user.username}</td>
                <td className="text-gray">{user.email}</td>
                <td className="font-bold text-purple">{user.score} pts</td>
                <td>
                  <span className={`role-badge ${user.role}`}>{user.role}</span>
                </td>
                <td>
                  <span className={`status-badge ${user.status}`}>{user.status}</span>
                </td>
                <td>
                  <button className="action-btn edit">Edit</button>
                  <button className="action-btn delete">Ban</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang (Pagination) */}
      <div className="pagination">
        <button 
          className="page-btn" 
          onClick={handlePrev} 
          disabled={currentPage === 1}
        >
          Previous
        </button>
        
        <span className="page-info">
          Page <span className="current-page">{currentPage}</span> of {totalPages}
        </span>
        
        <button 
          className="page-btn" 
          onClick={handleNext} 
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}