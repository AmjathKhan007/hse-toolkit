import { describe, it, expect } from 'vitest'
import { trir, manDaysWorked, frequencyRate, severityRate } from './calculations'

describe('calculations', ()=>{
  it('calculates trir correctly', ()=>{
    const v = trir(5, 200000, 200000)
    expect(v).toBeCloseTo(5)
  })
  it('man days works', ()=>{
    expect(manDaysWorked(10,20,5,30)).toBe((10+20+5)*30)
  })
  it('frequency rate', ()=>{
    expect(frequencyRate(2, 1000000, 1000000)).toBeCloseTo(2)
  })
  it('severity rate', ()=>{
    expect(severityRate(10, 1000000, 1000000)).toBeCloseTo(10)
  })
})
