import { useState } from "react";
import { register } from "../api/api";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

type FormData = {
  username: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const [form, setForm] = useState<FormData>({
    username: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // validate
    if (!form.username || !form.password) {
      setError("Missing fields");
      setIsLoading(false);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const res = await register({
        username: form.username,
        password: form.password
      });

      console.log("REGISTER RES:", res.data); // debug

      nav("/"); // về login

    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || "Register failed");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Register</h2>

        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) => handleChange("username", e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}