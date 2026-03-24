🚩 Duy CTF Platform

Một nền tảng luyện tập Capture The Flag (CTF) hiện đại, được thiết kế với giao diện đậm chất hacker và hệ thống quản lý thử thách linh hoạt.

📌 Giới thiệu

Duy CTF Platform là một hệ thống hỗ trợ người dùng luyện tập kỹ năng an toàn thông tin thông qua các bài thử thách CTF thuộc nhiều lĩnh vực như:

🌐 Web Exploitation
🧠 Reverse Engineering
🔐 Cryptography
💣 Binary Exploitation (Pwn)

Nền tảng tập trung vào trải nghiệm người dùng mượt mà, realtime và dễ mở rộng.

🚀 Tính năng nổi bật
🎨 Giao diện & Trải nghiệm
Hiệu ứng Particle tương tác tại trang Login (Canvas API)
UI mang phong cách Hacker Terminal
Thiết kế responsive, tối ưu cho nhiều màn hình
🔐 Hệ thống xác thực
Đăng ký / đăng nhập an toàn
Mã hóa mật khẩu bằng bcrypt
Xác thực phiên với JWT (JSON Web Token)
📊 Dashboard thông minh
Phân loại challenge theo category:
Web
Crypto
Pwn
Reverse
Hiển thị:
Tổng số challenge
Số lượng người đã solve
⚡ Real-time Stats
Cập nhật số lượng solves theo thời gian thực
Theo dõi tiến độ người chơi
🗄️ Database nhẹ
Sử dụng SQLite3
Không cần setup server DB phức tạp
Phù hợp cho môi trường dev và demo
🛠️ Công nghệ sử dụng
Frontend
React (TypeScript) – Xây dựng UI mạnh mẽ, type-safe
React Router DOM – Điều hướng SPA
Axios – Giao tiếp API
Canvas API – Hiệu ứng Particle
Backend
Node.js + Express – RESTful API server
SQLite3 – Lưu trữ dữ liệu
JWT – Authentication
bcrypt – Hash mật khẩu
CORS – Kết nối frontend-backend an toàn
📁 Cấu trúc dự án
ctf-platform/
├── frontend/                 # Client (React + Vite)
│   ├── src/
│   │   ├── pages/            # Login, Dashboard, Challenges...
│   │   ├── components/       # UI Components tái sử dụng
│   │   └── services/         # API calls (axios)
│
├── backend/                  # Server (Node.js + Express)
│   ├── routes/               # Auth, Challenge APIs
│   ├── middleware/           # JWT Auth Guard
│   ├── db.js                 # SQLite connection
│   └── server.js             # Entry point
│
└── README.md
⚙️ Cài đặt & Chạy thử
1️⃣ Backend
cd backend
npm install
node server.js

📍 Server chạy tại: http://localhost:5000

2️⃣ Frontend
cd frontend
npm install
npm run dev

📍 Truy cập: http://localhost:5173

🔑 API Overview (Cơ bản)
Auth
Method	Endpoint	Mô tả
POST	/register	Đăng ký tài khoản
POST	/login	Đăng nhập
Challenges
Method	Endpoint	Mô tả
GET	/challenges	Lấy danh sách bài
POST	/submit	Nộp flag
📈 Roadmap
 Authentication (JWT + bcrypt)
 Dashboard hiển thị challenges
 🏆 Leaderboard (bảng xếp hạng realtime)
 🛠️ Admin Panel (CRUD challenge)
 🔔 Notification khi có người solve
 🧩 Hint system cho challenge
 🌍 Deploy production (Docker + VPS)
🔒 Security Notes
Password được hash bằng bcrypt (salted)
JWT cần được lưu ở HTTP-only cookie (khuyến nghị)
Validate input để tránh:
SQL Injection
XSS
CSRF
🤝 Đóng góp

Mọi đóng góp đều được hoan nghênh!

# Fork repo
# Tạo branch mới
git checkout -b feature/your-feature

# Commit
git commit -m "Add new feature"

# Push
git push origin feature/your-feature
📄 License

MIT License – tự do sử dụng cho mục đích học tập và phát triển.

👨‍💻 Tác giả

Đỗ Đăng Duy

Chúc bạn có những trải nghiệm "hacking" thú vị 🚀
