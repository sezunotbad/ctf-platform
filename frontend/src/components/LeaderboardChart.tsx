import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import "./LeaderboardChart.css";

// ==========================================
// 1. DỮ LIỆU ĐƯỜNG ĐUA TOP 10 (Xuất phát từ 0)
// ==========================================
const top10TimelineData = [
  { time: "Start", t1: 0, t2: 0, t3: 0, t4: 0, t5: 0, t6: 0, t7: 0, t8: 0, t9: 0, t10: 0 },
  { time: "1h", t1: 500, t2: 400, t3: 450, t4: 300, t5: 200, t6: 150, t7: 100, t8: 50, t9: 150, t10: 50 },
  { time: "2h", t1: 1200, t2: 950, t3: 1100, t4: 800, t5: 750, t6: 500, t7: 400, t8: 300, t9: 250, t10: 150 },
  { time: "3h", t1: 2500, t2: 2100, t3: 1800, t4: 1500, t5: 1400, t6: 1200, t7: 900, t8: 850, t9: 600, t10: 450 },
  { time: "4h", t1: 3600, t2: 3400, t3: 2900, t4: 2500, t5: 2100, t6: 1900, t7: 1600, t8: 1400, t9: 1200, t10: 900 },
  { time: "Now", t1: 4500, t2: 4200, t3: 3800, t4: 3500, t5: 3100, t6: 2900, t7: 2500, t8: 2200, t9: 1800, t10: 1500 },
];

const teams = [
  { key: "t1", name: "pwn_god", color: "#fbbf24" },     // Top 1: Vàng
  { key: "t2", name: "hacker_pro", color: "#94a3b8" },  // Top 2: Bạc
  { key: "t3", name: "linux_guru", color: "#b45309" },  // Top 3: Đồng
  { key: "t4", name: "bug_hunter", color: "#60a5fa" },  // Xanh dương
  { key: "t5", name: "reverser_x", color: "#f87171" },  // Đỏ
  { key: "t6", name: "web_exploiter", color: "#a78bfa" },// Tím
  { key: "t7", name: "sql_injector", color: "#34d399" },// Xanh ngọc
  { key: "t8", name: "shadow_ninja", color: "#f472b6" },// Hồng
  { key: "t9", name: "crypto_fan", color: "#fb923c" },  // Cam
  { key: "t10", name: "noob_master", color: "#2dd4bf" },// Teal
];

// ==========================================
// 2. DỮ LIỆU PHÂN BỔ LOẠI BÀI THI (Pie Chart)
// ==========================================
const distributionData = [
  { name: "Web Security", value: 35, color: "#60a5fa" },
  { name: "Pwnable", value: 20, color: "#f87171" },
  { name: "Cryptography", value: 15, color: "#a78bfa" },
  { name: "Reverse", value: 10, color: "#fbbf24" },
  { name: "Misc", value: 20, color: "#94a3b8" },
];

// ==========================================
// COMPONENT CHÍNH
// ==========================================
export default function LeaderboardChart() {
  return (
    <div className="charts-grid-container">
      
      {/* KHỐI 1: BIỂU ĐỒ ĐƯỜNG TOP 10 (Bên Trái/Trên) */}
      <div className="glass-card chart-section line-chart-section">
        <div className="chart-header">
          <h3>Top 10 Progression</h3>
          <span className="live-badge">Live</span>
        </div>
        
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={top10TimelineData} margin={{ top: 20, right: 20, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis 
                dataKey="time" 
                tick={{ fill: "#94a3b8", fontSize: 12 }} 
                axisLine={false} 
                tickLine={false} 
              />
              <YAxis 
                tick={{ fill: "#a78bfa", fontSize: 12 }} 
                axisLine={false} 
                tickLine={false} 
              />
              <Tooltip 
                contentStyle={{ background: "rgba(15, 23, 42, 0.9)", border: "1px solid rgba(139, 92, 246, 0.5)", borderRadius: "8px" }}
                itemStyle={{ fontSize: "13px" }}
                labelStyle={{ color: "#94a3b8", marginBottom: "8px", fontWeight: "bold" }}
              />
              <Legend 
                iconType="circle" 
                wrapperStyle={{ fontSize: "12px", color: "#cbd5e1", paddingTop: "20px" }} 
              />
              
              {/* Render 10 đường cho 10 đội */}
              {teams.map((team) => (
                <Line
                  key={team.key}
                  type="monotone"
                  dataKey={team.key}
                  name={team.name}
                  stroke={team.color}
                  strokeWidth={team.key === 't1' || team.key === 't2' || team.key === 't3' ? 3 : 1.5} // Top 3 nét đậm hơn
                  dot={{ r: 3, fill: team.color, strokeWidth: 0 }}
                  activeDot={{ r: 6, stroke: "#fff", strokeWidth: 2 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* KHỐI 2: BIỂU ĐỒ TRÒN PHÂN BỔ BÀI THI (Bên Phải/Dưới) */}
      <div className="glass-card chart-section pie-chart-section">
        <div className="chart-header">
          <h3>Challenge Distribution</h3>
        </div>
        
        <div className="chart-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={distributionData}
                cx="50%"
                cy="50%"
                innerRadius={70} // Tạo lỗ hổng ở giữa thành Donut chart
                outerRadius={110}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {distributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ background: "rgba(15, 23, 42, 0.9)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "8px", color: "#fff" }}
                itemStyle={{ color: "#fff" }}
                formatter={(value) => [`${value}%`, "Tỉ lệ"]}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle"
                wrapperStyle={{ fontSize: "13px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}