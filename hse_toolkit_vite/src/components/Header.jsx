import React from 'react'
import { Link } from 'react-router-dom'

export default function Header(){
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto p-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">HSE Toolkit</h1>
          <p className="text-sm text-gray-500">Practical, audit-ready tools — no sign-in</p>
        </div>
        <nav className="space-x-3 text-sm">
          <Link to="/" className="text-indigo-600">Home</Link>
          <Link to="/safe-man-hours" className="hover:underline">Safe hours</Link>
          <Link to="/trir" className="hover:underline">TRIR</Link>
          <Link to="/man-days" className="hover:underline">Man-days</Link>
          <Link to="/ltis" className="hover:underline">LTI Tracker</Link>
        </nav>
      </div>
    </header>
  )
}
