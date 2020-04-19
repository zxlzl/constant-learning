import React, { useEffect, useState,useMemo } from 'react'

export default function UseMemoPage() {
  const [count, setCount] = useState(0);

  const expensive = useMemo(() => {
    console.log("compute")
    let sum = 0;
    for (let i = 0; i < count; i++) {
      sum += i;
    }
    return sum;
    //只有count变化，这⾥里里才重新执⾏行行
  },[count])

  const [value, setValue] = useState("");

  return (
    <div>
      <h3>UseMemoPage</h3>
      <p>{count}</p>

      {/* <p>expensive:{expensive()}</p> */}
      <p>expensive:{expensive}</p>
      <button onClick={() => setCount(count + 1)}>add</button>
      <input value={value} onChange={event => setValue(event.target.value)}></input>
    </div>
  )
}
