import React, { useState, useEffect } from 'react'

export default function HookPage() {
  const [count, setCount] = useState(0)
  const [date, setDate] = useState(new Date())
  // componentDidMount 、componentDidUpdate
  useEffect(() => {
    console.log('effect count');
    // 只需要在count发生改变执行
    document.title = `点击了${count}次`


  }, [count])

  useEffect(() => {
    console.log('effect date');
    
    //只需要componentDidMount执行
    const timer = setInterval(() => {
      setDate(new Date())
    }, 1000);

    // componentWillUnmount
    return ()=>clearInterval(timer)
  },[])
  return (
    <div>
      <h3>HookPage</h3>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>add</button>
      <p>{date.toLocaleTimeString()}</p>
    </div>
  )
}
