import { useState } from "react"
import { register } from "../api/auth"
import { useNavigate } from "react-router-dom"
import { AxiosError } from "axios";

type FormData = {
  username: string
  password: string
  confirmPassword: string
}

export default function Register() {
  const [form, setForm] = useState<FormData>({
    username: "",
    password: "",
    confirmPassword: ""
  })

  const [error, setError] = useState("")
  const nav = useNavigate()

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    try {
      await register({
        username: form.username,
        password: form.password
      })

      nav("/") // về login
    } catch (err: unknown) {
  const error = err as AxiosError<{ message: string }>;
  setError(error.response?.data?.message || "Register failed");
}
  }

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

        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}