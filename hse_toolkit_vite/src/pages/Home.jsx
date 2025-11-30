import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <aside className="md:col-span-1 bg-white p-4 rounded shadow"> 
        <h2 className="font-semibold">How it works</h2>
        <ol className="mt-2 text-sm text-gray-600 list-decimal list-inside">
          <li>Enter your data — only what’s needed</li>
          <li>Generate results — KPIs & summaries instantly</li>
          <li>Export A4 PDFs for audits — no login</li>
        </ol>
        <div className="mt-4 text-xs text-gray-500">References: OSHA 1904 · ISO 45001 · ILO OSH</div>
      </aside>

      <section className="md:col-span-2 space-y-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Quick tools</h3>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Link to="/safe-man-hours" className="p-3 bg-slate-50 rounded shadow-sm">Safe Man-Hours</Link>
            <Link to="/trir" className="p-3 bg-slate-50 rounded shadow-sm">TRIR / AFR / FAR</Link>
            <Link to="/man-days" className="p-3 bg-slate-50 rounded shadow-sm">Man-Days Calculator</Link>
            <Link to="/ltis" className="p-3 bg-slate-50 rounded shadow-sm">LTI Tracker</Link>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Methodology</h3>
          <p className="mt-2 text-sm text-gray-600">Calculations follow commonly used HSE practices. Always confirm with your organisation definitions and local regulations.</p>
          <p className="mt-2 text-xs text-gray-500">Created by Amjathkhan — Fire & Life Safety professional, 12+ years.</p>
        </div>
      </section>
    </div>
  )
}
