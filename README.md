# 🚩 Duy CTF Platform

> Một nền tảng luyện tập Capture The Flag (CTF) hiện đại, được thiết kế với giao diện đậm chất hacker và hệ thống quản lý thử thách linh hoạt.

---

## 📌 Giới thiệu

**Duy CTF Platform** là một hệ thống hỗ trợ người dùng luyện tập kỹ năng an toàn thông tin thông qua các bài thử thách CTF thuộc nhiều lĩnh vực như:

- 🌐 **Web Exploitation**
- 🧠 **Reverse Engineering**
- 🔐 **Cryptography**
- 💣 **Binary Exploitation (Pwn)**

Nền tảng tập trung vào trải nghiệm người dùng mượt mà, realtime và dễ mở rộng.

---

## 🚀 Tính năng nổi bật

### 🎨 Giao diện & Trải nghiệm
- Hiệu ứng **Particle** tương tác tại trang Login (Canvas API)
- UI mang phong cách **Hacker Terminal**
- Thiết kế **responsive**, tối ưu cho nhiều màn hình

### 🔐 Hệ thống xác thực
- Đăng ký / đăng nhập an toàn
- Mã hóa mật khẩu bằng **bcrypt**
- Xác thực phiên với **JWT** (JSON Web Token)

### 📊 Dashboard thông minh
- Phân loại challenge theo category:
  - Web · Crypto · Pwn · Reverse
- Hiển thị tổng số challenge và số lượng người đã solve

### ⚡ Real-time Stats
- Cập nhật số lượng solves theo thời gian thực
- Theo dõi tiến độ người chơi

### 🗄️ Database nhẹ
- Sử dụng **SQLite3** — không cần setup server DB phức tạp
- Phù hợp cho môi trường dev và demo

---

## 🛠️ Công nghệ sử dụng

### Frontend
| Công nghệ | Mục đích |
|---|---|
| React (TypeScript) | Xây dựng UI mạnh mẽ, type-safe |
| React Router DOM | Điều hướng SPA |
| Axios | Giao tiếp API |
| Canvas API | Hiệu ứng Particle |

### Backend
| Công nghệ | Mục đích |
|---|---|
| Node.js + Express | RESTful API server |
| SQLite3 | Lưu trữ dữ liệu |
| JWT | Authentication |
| bcrypt | Hash mật khẩu |
| CORS | Kết nối frontend-backend an toàn |

---

## 📁 Cấu trúc dự án

```
ctf-platform/
├── frontend/                 # Client (React + Vite)
│   ├── src/
│   │   ├── pages/            # Login, Dashboard, Challenges...
│   │   ├── components/       # UI Components tái sử dụng
│   │   └── services/         # API calls (axios)
│   └── Dockerfile
│
├── backend/                  # Server (Node.js + Express)
│   ├── routes/               # Auth, Challenge APIs
│   ├── middleware/           # JWT Auth Guard
│   ├── db.js                 # SQLite connection
│   ├── server.js             # Entry point
│   └── Dockerfile
│
├── docker-compose.yml        # Orchestration toàn bộ services
├── .env                      # Biến môi trường (không commit)
└── README.md
```

---

## ⚙️ Cài đặt & Chạy thử

### Yêu cầu
- [Docker](https://www.docker.com/) >= 20.x
- [Docker Compose](https://docs.docker.com/compose/) >= 2.x

### 🐳 Chạy với Docker Compose

```bash
# Clone repo
git clone https://github.com/your-username/ctf-platform.git
cd ctf-platform

# Build và khởi động toàn bộ hệ thống
docker compose up --build
```

| Service | URL |
|---|---|
| Frontend | `http://localhost:5173` |
| Backend | `http://localhost:5000` |

### Dừng hệ thống

```bash
docker compose down
```

### Chạy nền (detached mode)

```bash
docker compose up --build -d
```

---

## 🔑 API Overview

### Auth

| Method | Endpoint | Mô tả |
|---|---|---|
| `POST` | `/register` | Đăng ký tài khoản |
| `POST` | `/login` | Đăng nhập |

### Challenges

| Method | Endpoint | Mô tả |
|---|---|---|
| `GET` | `/challenges` | Lấy danh sách bài |
| `POST` | `/submit` | Nộp flag |

---

## 🔧 Biến môi trường

Tạo file `.env` ở thư mục gốc:

```env
# Backend
JWT_SECRET=your_super_secret_key
PORT=5000

# Frontend
VITE_API_URL=http://localhost:5000
```

> ⚠️ Không commit file `.env` lên Git. Thêm vào `.gitignore`.

- [x] Authentication (JWT + bcrypt)
- [x] Dashboard hiển thị challenges
- [ ] 🏆 Leaderboard (bảng xếp hạng realtime)
- [ ] 🛠️ Admin Panel (CRUD challenge)
- [ ] 🔔 Notification khi có người solve
- [ ] 🧩 Hint system cho challenge
- [x] 🐳 Docker Compose setup
- [ ] 🌍 Deploy production (VPS)

---

## 🔒 Security Notes

- ✅ Password được hash bằng **bcrypt** (salted)
- ✅ JWT nên được lưu ở **HTTP-only cookie** (khuyến nghị)
- ✅ Validate input để tránh:
  - SQL Injection
  - XSS
  - CSRF

---

## 🤝 Đóng góp

Mọi đóng góp đều được hoan nghênh!

```bash
# Fork repo
# Tạo branch mới
git checkout -b feature/your-feature

# Commit
git commit -m "Add new feature"

# Push
git push origin feature/your-feature
```

Sau đó tạo một **Pull Request** và mô tả thay đổi của bạn.

---

## 📄 License

[MIT License](LICENSE) — tự do sử dụng cho mục đích học tập và phát triển.

---

## 👨‍💻 Tác giả

**Đỗ Đăng Duy**

---

> Chúc bạn có những trải nghiệm "hacking" thú vị 🚀
