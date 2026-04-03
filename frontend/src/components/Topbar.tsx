export default function Topbar() {
  const logout = () => {
    localStorage.removeItem("token")
    window.location.href = "/"
  }

  return (
    <div className="topbar">
      <span>Dashboard</span>
      <button onClick={logout}>Logout</button>
    </div>
  )
}