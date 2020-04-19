import React, { useState, useEffect } from 'react'

export default function CustomHookPage() {
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
    return () => clearInterval(timer)
  }, [])
  return (
    <div>
      <h3>HookPage</h3>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>add</button>
      <p>{useClock().toLocaleTimeString()}</p>
    </div>
  )
}

// 自定义hook，命名use开头
function useClock() {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    console.log("date effect"); //只需要在didMount时候执⾏行行就可以了了 
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000); //清除定时器器，类似willUnmount
    return () => clearInterval(timer);
  }, []);
  return date;
}
