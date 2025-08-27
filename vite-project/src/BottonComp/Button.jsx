import React, { useEffect, useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  const [item, setItem] = useState(10);


  const increment = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    console.log("in use effect");
  },[count , item]);

  return (
    <div>
      <h2>Counter: {count}</h2>
      <h2>Item: {item}</h2>
      <button onClick={increment}>Update Count</button>
      <button onClick={()=>setItem(item+1)}>Update Item</button>
    </div>
  );
}