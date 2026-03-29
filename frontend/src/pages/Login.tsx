import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; 
import axios, { AxiosError } from "axios";
import "./Login.css";

/* ===== Particle Logic (Giữ nguyên của Duy) ===== */
class Particle {
  x: number; y: number; vx: number; vy: number; radius: number;
  constructor(w: number, h: number) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * 1.2;
    this.vy = (Math.random() - 0.5) * 1.2;
    this.radius = Math.random() * 2 + 1;
  }
  update(w: number, h: number, mx: number, my: number) {
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > w) this.vx *= -1;
    if (this.y < 0 || this.y > h) this.vy *= -1;
    const dx = this.x - mx; const dy = this.y - my;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 120) { this.x += dx * 0.02; this.y += dy * 0.02; }
  }
  draw(ctx: CanvasRenderingContext2D, hue: number) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${hue}, 80%, 60%)`;
    ctx.shadowBlur = 15;
    ctx.shadowColor = `hsl(${hue}, 80%, 60%)`;
    ctx.fill();
  }
}

export default function Login() {
  // --- KHỞI TẠO NAVIGATE ---
  const navigate = useNavigate(); 
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /* ===== Hiệu ứng Canvas (Particle) ===== */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const particles: Particle[] = [];
    let hue = 260;
    const mouse = { x: 0, y: 0 };
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    const init = () => {
      for (let i = 0; i < 100; i++) particles.push(new Particle(canvas.width, canvas.height));
    };
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hue += 0.5;
      particles.forEach((p) => {
        p.update(canvas.width, canvas.height, mouse.x, mouse.y);
        p.draw(ctx, hue);
      });
      requestAnimationFrame(animate);
    };
    init();
    animate();
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* ===== XỬ LÝ ĐĂNG NHẬP / ĐĂNG KÝ ===== */
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setIsLoading(true); // Nút bắt đầu hiện "Executing..."

  try {
    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
    const response = await axios.post(`http://localhost:5000${endpoint}`, {
      username: identifier,
      password: password
    });

    if (mode === "login") {
      sessionStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } else {
      alert("Đăng ký thành công!");
      setMode("login");
      // Khi đăng ký xong, cũng nên tắt loading để user bấm tiếp login
      setIsLoading(false); 
    }
  } catch (err) {
    const axiosError = err as AxiosError<{ message: string }>;
    setError(axiosError.response?.data?.message || "Lỗi server!");
    
    // QUAN TRỌNG: Phải tắt loading ở đây để nút hiện lại ban đầu khi có lỗi
    setIsLoading(false); 
  } 
  // Hoặc dùng finally để luôn luôn tắt loading dù thành công hay thất bại:
  // finally { setIsLoading(false); }
};

  return (
    <div className="root" onClick={() => !showLogin && setShowLogin(true)}>
      <canvas ref={canvasRef} className="canvas" />

      {showLogin && (
        <div className="overlay" onClick={() => setShowLogin(false)}>
          <form className="login-card" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
            <div className="tabs">
              <button type="button" className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>Sign In</button>
              <button type="button" className={mode === "register" ? "active" : ""} onClick={() => setMode("register")}>Sign Up</button>
            </div>

            <h2>{mode === "login" ? "Login" : "Create Account"}</h2>

            <input 
                type="text" placeholder="Username" required 
                value={identifier} onChange={(e) => setIdentifier(e.target.value)} 
            />
            <input 
                type="password" placeholder="Password" required 
                value={password} onChange={(e) => setPassword(e.target.value)} 
            />

            {mode === "register" && (
              <input 
                type="password" placeholder="Confirm Password" required 
                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} 
              />
            )}

            {error && <p className="error-msg">{error}</p>}

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Executing..." : (mode === "login" ? "Access Granted" : "Join Fleet")}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}