import React, { useState, useEffect } from 'react'
import { Chart } from 'chart.js/auto'

export default function LTITracker(){
  const [date, setDate] = useState('')
  const [category, setCategory] = useState('minor')
  const [days, setDays] = useState(1)
  const [list, setList] = useState([])

  useEffect(()=>{ const arr = JSON.parse(localStorage.getItem('ltis')||'[]'); setList(arr); renderChart(arr) },[])

  function add(){
    if(!date){ alert('Choose date'); return }
    const arr = [...list, { d: date, cat: category, days: Number(days) }]
    localStorage.setItem('ltis', JSON.stringify(arr))
    setList(arr); renderChart(arr); setDate(''); setDays(1)
  }
  function clearAll(){ if(confirm('Clear all?')){ localStorage.removeItem('ltis'); setList([]); renderChart([]) } }

  function renderChart(arr){
    const counts = arr.reduce((s,i)=>{ s[i.cat]=(s[i.cat]||0)+1; return s }, {})
    const labels = Object.keys(counts)
    const data = Object.values(counts)
    const ctx = document.getElementById('ltiChart')?.getContext('2d')
    if(!ctx) return
    if(window._ltiChart) window._ltiChart.destroy()
    window._ltiChart = new Chart(ctx, { type:'bar', data:{ labels, datasets:[{ label:'LTIs', data }] }, options:{ plugins:{ legend:{ display:false }}} })
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold">LTI Tracker</h2>
      <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2">
        <div><label className="text-xs">Date</label><input value={date} onChange={e=>setDate(e.target.value)} type="date" className="mt-1 w-full rounded border px-2 py-1"/></div>
        <div><label className="text-xs">Category</label><select value={category} onChange={e=>setCategory(e.target.value)} className="mt-1 w-full rounded border px-2 py-1"><option value="minor">Minor</option><option value="major">Major</option><option value="fatal">Fatal</option></select></div>
        <div><label className="text-xs">Days lost</label><input value={days} onChange={e=>setDays(e.target.value)} type="number" className="mt-1 w-full rounded border px-2 py-1"/></div>
      </div>
      <div className="mt-3 flex gap-2"><button onClick={add} className="bg-blue-600 text-white px-3 py-1 rounded">Add LTI</button><button onClick={clearAll} className="bg-gray-200 px-3 py-1 rounded">Clear</button></div>

      <div className="mt-4">
        {list.length===0 ? <div className="text-sm text-gray-500">No LTIs recorded</div> : (
          <table className="w-full text-sm"><thead><tr className="text-left"><th>Date</th><th>Category</th><th>Days</th></tr></thead><tbody>{list.map((l,i)=>(<tr key={i}><td>{l.d}</td><td>{l.cat}</td><td>{l.days}</td></tr>))}</tbody></table>
        )}
        <canvas id="ltiChart" height="120" className="mt-3"></canvas>
      </div>
    </div>
  )
}
