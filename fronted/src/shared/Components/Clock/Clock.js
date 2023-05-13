import React, { useState, useEffect } from 'react';

import "./Clock.css"
import Greeting from './Greeting';


function Clock() {
  const [time, setTime] = useState(new Date());
  const hour = time.getHours();
  // console.log(time.getHours());
  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    // console.log(timerID)
    return () => clearInterval(timerID);
  });
  


  function tick() {
    setTime(new Date());
  }

  return (
    <div className='clock'>
      <Greeting hour={hour}/>
      <h2>{time.toLocaleTimeString()}</h2>
      <p>{time.toLocaleDateString()}</p>
    </div>
  );
}

export default Clock;
