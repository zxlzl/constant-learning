import React, { useState, useEffect } from 'react'

export default function ClockFun() {
  const [date, setDate] = useState(new Date())
  useEffect(() => {
    console.log('edd');
    
    const timer = setInterval(() => {
      setDate(new Date()) 
    }, 1000);
    return ()=>clearInterval(timer)
  },[])

  return (

    <div>
      <h3>func clock</h3>
      <p>{date.toLocaleTimeString()}</p>
    </div>
  )
}
