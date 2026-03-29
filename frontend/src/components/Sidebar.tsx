import { Link } from "react-router-dom"

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>CTF</h2>
      <Link to="/dashboard">Dashboard</Link>
    </div>
  )
}