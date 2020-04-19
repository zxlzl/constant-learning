import React, { useState, useEffect } from 'react'

export default function HookPage() {
  const [count, setCount] = useState(0)
  // componentDidMount 、componentDidUpdate
  useEffect(()=>{
    console.log('effect');
    document.title = `点击了${count}次`
  })
  return (
    <div>
      <h3>HookPage</h3>
      <p>{count}</p>
      <button onClick={()=>setCount(count+1)}>add</button>
    </div>
  )
}
