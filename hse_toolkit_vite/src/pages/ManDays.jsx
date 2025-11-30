import React, { useState } from 'react'
import { manDaysWorked } from '../lib/calculations'

export default function ManDays(){
  const [skilled,setSkilled] = useState(10)
  const [unskilled,setUnskilled] = useState(20)
  const [contract,setContract] = useState(5)
  const [days,setDays] = useState(30)
  const [result,setResult] = useState(null)

  function calculate(){ setResult(manDaysWorked(skilled,unskilled,contract,days)) }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold">Man-Days Worked</h2>
      <div className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-2">
        <div><label className="text-xs">Skilled</label><input value={skilled} onChange={e=>setSkilled(e.target.value)} type="number" className="mt-1 w-full rounded border px-2 py-1"/></div>
        <div><label className="text-xs">Unskilled</label><input value={unskilled} onChange={e=>setUnskilled(e.target.value)} type="number" className="mt-1 w-full rounded border px-2 py-1"/></div>
        <div><label className="text-xs">Contract</label><input value={contract} onChange={e=>setContract(e.target.value)} type="number" className="mt-1 w-full rounded border px-2 py-1"/></div>
        <div><label className="text-xs">Period days</label><input value={days} onChange={e=>setDays(e.target.value)} type="number" className="mt-1 w-full rounded border px-2 py-1"/></div>
      </div>
      <div className="mt-3"><button onClick={calculate} className="bg-blue-600 text-white px-3 py-1 rounded">Calculate</button></div>
      {result!==null && (<div className="mt-3 p-3 rounded border bg-slate-50"><div className="text-xs">Total man-days</div><div className="text-2xl font-semibold">{result}</div></div>)}
    </div>
  )
}
