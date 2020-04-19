import React, { useState, useEffect } from 'react'

export default function HookPage() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <h3>HookPage</h3>
      <p>{count}</p>
      {/* <button onClick={()=>}></button> */}
    </div>
  )
}
