import { useEffect, useState } from "react";
import axios from "axios";
import ChallengeCard from "./../components/ChallengeCard";
import UsersTable from "../components/UsersTable";
import LeaderboardChart from "../components/LeaderboardChart";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

type CategoryType = "web" | "crypto" | "pwn" | "reverse" | "misc";

interface Challenge {
  id: number;
  title: string;
  category: CategoryType;
  points: number;
  solves: number;
  isSolved: boolean;
}

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState("Overview");
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchChallenges = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/challenges",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setChallenges(res.data);
      } catch (err) {
        console.error("API lỗi:", err);
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallenges();
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <h2>Đang kết nối đến hệ thống CTF...</h2>
      </div>
    );
  }

  return (
    <div className="dashboard-root">
      {/* ===== SIDEBAR ===== */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon"></div>
          <h2>AdminPanel</h2>
        </div>

        <nav className="sidebar-nav">
          {["Overview", "Users", "Challenges"].map((item) => (
            <button
              key={item}
              className={`nav-btn ${activeMenu === item ? "active" : ""}`}
              onClick={() => setActiveMenu(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </aside>

      {/* ===== MAIN ===== */}
      <main className="main-content">
        <header className="topbar">
          <div className="topbar-search">
            <input type="text" placeholder="Search..." />
          </div>
          <div className="topbar-profile">
            <div className="avatar"></div>
            <span>Admin</span>
          </div>
        </header>

        <div className="dashboard-content">
          
          {/* ===== OVERVIEW ===== */}
          {activeMenu === "Overview" && (
            <>
              <div className="welcome-section">
                <h1>Welcome back</h1>
                <p>System overview</p>
              </div>

              <div className="activity-section glass-card">
                <h3>Leaderboard</h3>
                <LeaderboardChart />
              </div>
            </>
          )}

          {/* ===== CHALLENGES ===== */}
          {activeMenu === "Challenges" && (
            <div className="challenges-grid">
              {challenges.length > 0 ? (
                challenges.map((chall) => (
                  <ChallengeCard
                    key={chall.id}
                    {...chall}
                    onClick={() => console.log(chall.id)}
                  />
                ))
              ) : (
                <p style={{ color: "white" }}>
                  Không có challenge nào
                </p>
              )}
            </div>
          )}

          {/* ===== USERS ===== */}
          {activeMenu === "Users" && <UsersTable />}
        </div>
      </main>
    </div>
  );
}