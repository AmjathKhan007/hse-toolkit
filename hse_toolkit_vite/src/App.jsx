import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SafeManHours from './pages/SafeManHours'
import TRIR from './pages/TRIR'
import ManDays from './pages/ManDays'
import LTITracker from './pages/LTITracker'
import Header from './components/Header'
import Footer from './components/Footer'

export default function App(){
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto p-4">
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/safe-man-hours' element={<SafeManHours/>} />
          <Route path='/trir' element={<TRIR/>} />
          <Route path='/man-days' element={<ManDays/>} />
          <Route path='/ltis' element={<LTITracker/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
