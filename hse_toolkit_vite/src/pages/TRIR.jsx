import React, { useState } from 'react'
import { trir } from '../lib/calculations'

export default function TRIR(){
  const [cases, setCases] = useState(5)
  const [hours, setHours] = useState(200000)
  const [base, setBase] = useState(200000)
  const [value, setValue] = useState(null)

  function calculate(){
    const v = trir(Number(cases), Number(hours), Number(base))
    setValue(v)
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold">TRIR / AFR / FAR</h2>
      <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2">
        <div><label className="text-xs">Recordable cases</label><input value={cases} onChange={e=>setCases(e.target.value)} type="number" className="mt-1 w-full rounded border px-2 py-1"/></div>
        <div><label className="text-xs">Total man-hours</label><input value={hours} onChange={e=>setHours(e.target.value)} type="number" className="mt-1 w-full rounded border px-2 py-1"/></div>
        <div><label className="text-xs">Base</label><select value={base} onChange={e=>setBase(e.target.value)} className="mt-1 w-full rounded border px-2 py-1"><option value={200000}>200,000</option><option value={1000000}>1,000,000</option></select></div>
      </div>
      <div className="mt-3"><button onClick={calculate} className="bg-blue-600 text-white px-3 py-1 rounded">Calculate</button></div>

      {value!==null && (
        <div className="mt-4 p-3 rounded border bg-slate-50"><div className="text-xs">TRIR</div><div className="text-2xl font-semibold">{value.toFixed(2)}</div></div>
      )}
    </div>
  )
}
