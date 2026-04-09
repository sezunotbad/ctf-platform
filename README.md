# 🚀 CTF Platform

Một nền tảng CTF (Capture The Flag) đơn giản, được xây dựng với mục tiêu học tập và triển khai thực tế. Hệ thống hỗ trợ quản lý người dùng, thử thách (challenge), và chấm điểm tự động.

---

## 🧩 Kiến trúc hệ thống

Project được chia thành 2 phần chính:

* **Backend**: Rust (Axum + SQLite + JWT)
* **Frontend**: React (Vite)

```
.
├── backend/        # API server (Rust)
├── frontend/       # Giao diện người dùng (React)
└── docker-compose.yml
```

---

## ⚙️ Công nghệ sử dụng

### Backend

* Rust (Axum)
* Tokio (async runtime)
* SQLx (SQLite)
* JWT (jsonwebtoken)
* Bcrypt (hash password)

### Frontend

* React
* Vite
* Axios

### DevOps

* Docker
* Docker Compose

---

## 🐳 Chạy bằng Docker

### 1. Yêu cầu

* Docker
* Docker Compose

---

### 2. Build & Run

```bash
docker compose up --build
```

Chạy nền:

```bash
docker compose up -d
```

---

### 3. Truy cập

* 🌐 Frontend: http://localhost:5173
* 🔗 Backend API: http://localhost:5000

---

## 🛠️ Cấu hình Backend

Backend sử dụng Rust với Axum:

* Port mặc định: `5000`
* Bind address: `0.0.0.0`
* Database: SQLite (`ctf_database.db`)

---

## 🔐 Tính năng chính

* ✅ Đăng ký / Đăng nhập (JWT)
* ✅ Hash mật khẩu (bcrypt)
* ✅ REST API với Axum
* 🔄 Quản lý challenge (đang phát triển)
* 🔄 Leaderboard (đang phát triển)

---

## 🧪 Chạy thủ công (không Docker)

### Backend

```bash
cd backend
cargo run
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## ⚠️ Lưu ý

* Backend sử dụng Rust nightly (do dependency yêu cầu edition 2024)
* Không mount volume cho backend khi chạy Docker (tránh mất binary)
* Nếu gặp lỗi build:

  * thử `docker builder prune -a`
  * rebuild lại với `--no-cache`

---

## 📌 TODO

* [ ] Hệ thống challenge hoàn chỉnh
* [ ] Upload file / dynamic flag
* [ ] Leaderboard realtime
* [ ] Admin dashboard
* [ ] Deployment (Nginx + domain)

---

## 👨‍💻 Author

Đỗ Đăng Duy - 24100187
Bùi Duy Anh - 24100238


---

## 📄 License

MIT License
