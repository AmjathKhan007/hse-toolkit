import React, { useState, useEffect } from 'react'
import { Chart } from 'chart.js/auto'
import ReportPdfDownload from '../components/ReportPdf'

export default function SafeManHours(){
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [hours, setHours] = useState('')
  const [ltis, setLtis] = useState('0')
  const [result, setResult] = useState(null)
  const [chartDataUrl, setChartDataUrl] = useState(null)

  useEffect(()=>{ // restore last values from localStorage
    const saved = JSON.parse(localStorage.getItem('smh')||'null')
    if(saved){ setStart(saved.start||''); setEnd(saved.end||''); setHours(saved.hours||''); setLtis(saved.ltis||'0') }
  },[])

  function calculate(){
    if(!start || !end){ alert('Choose start and end'); return }
    const period = Math.round((new Date(end)-new Date(start))/(1000*60*60*24))+1
    const safe = Math.max(0, Number(hours)||0) // simplified
    const prev = JSON.parse(localStorage.getItem('smh_history')||'[]')
    prev.push({ start, end, hours:Number(hours||0), ltis:Number(ltis||0), safe, created: new Date().toISOString() })
    localStorage.setItem('smh_history', JSON.stringify(prev))
    setResult({ period, safe, cumulative: prev.reduce((s,i)=>s+i.safe,0) })
    setTimeout(()=> renderChart(prev.slice(-12).map(p=>p.safe)), 100)
  }

  function renderChart(data){
    const ctx = document.getElementById('smhChart')?.getContext('2d')
    if(!ctx) return
    if(window._smhChart) window._smhChart.destroy()
    window._smhChart = new Chart(ctx, { type:'line', data:{ labels: data.map((_,i)=>i+1), datasets:[{ label:'Safe hours', data }] }, options:{ plugins:{ legend:{ display:false }}} })
    setTimeout(()=>{
      try{
        const canvas = document.getElementById('smhChart')
        if(canvas) setChartDataUrl(canvas.toDataURL('image/png'))
      }catch(e){ console.warn('chart capture failed', e) }
    }, 250)
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold">Safe Man-Hours</h2>
      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
        <div><label className="text-xs">Start</label><input value={start} onChange={e=>setStart(e.target.value)} type="date" className="mt-1 w-full rounded border px-2 py-1"/></div>
        <div><label className="text-xs">End</label><input value={end} onChange={e=>setEnd(e.target.value)} type="date" className="mt-1 w-full rounded border px-2 py-1"/></div>
        <div><label className="text-xs">Total man-hours</label><input value={hours} onChange={e=>setHours(e.target.value)} type="number" className="mt-1 w-full rounded border px-2 py-1"/></div>
        <div><label className="text-xs">LTIs</label><input value={ltis} onChange={e=>setLtis(e.target.value)} type="number" className="mt-1 w-full rounded border px-2 py-1"/></div>
      </div>
      <div className="mt-3"><button onClick={calculate} className="bg-blue-600 text-white px-3 py-1 rounded">Calculate</button></div>

      {result && (
        <div className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="p-3 rounded border bg-slate-50"><div className="text-xs">Period safe hours</div><div className="text-xl font-semibold">{result.safe.toLocaleString()}</div></div>
            <div className="p-3 rounded border bg-slate-50"><div className="text-xs">Period days</div><div className="text-xl font-semibold">{result.period}</div></div>
            <div className="p-3 rounded border bg-slate-50"><div className="text-xs">Cumulative safe hours</div><div className="text-xl font-semibold">{result.cumulative.toLocaleString()}</div></div>
          </div>
          <canvas id="smhChart" height="80" className="mt-3"></canvas>

          <div className="mt-3">
            <ReportPdfDownload meta={{ projectName: localStorage.getItem('project_name') || 'Project', period: start + ' - ' + end }} metrics={{ 'Period safe hours': result?.safe, 'Period days': result?.period, 'Cumulative safe hours': result?.cumulative }} chartDataUrl={chartDataUrl} />
          </div>

        </div>
      )}
    </div>
  )
}
