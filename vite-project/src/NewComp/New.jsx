import { useState, useEffect } from "react";



function New() {
    const [item, steItem] = useState(0);
    const [cnt, steCnt] = useState(0);   
    
     useEffect(() => {
        console.log("in use effect");
      },[cnt , item]);

  return (
    <>
    <h1> item : {item}</h1>
    <h1> cnt : {cnt}</h1>
    <button onClick={()=>steItem(item+1)}>Update item</button>
      <button onClick={()=>steCnt(cnt+1)}>Update count</button>
    </>
  );
}

export default New
