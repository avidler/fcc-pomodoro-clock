import React, {useState, useEffect} from 'react';
import './App.css';


const Timer = () => {
  const [isActive, setIsActive] = useState(false)
  const [isSession, setIsSession] = useState(true)
  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {

    function toggleSession() {
      let audioEl = document.getElementsByClassName("audio-element")[0]
      audioEl.play()
   
      setIsSession(!isSession)

      isSession ? setMinutes(breakLength) : setMinutes(sessionLength)
   }

     let interval = null;
     if (isActive) {
       interval = setInterval(() => {
         if (seconds === 0){ 
          setSeconds(59)
          setMinutes(minutes => minutes-1) 

         } 
         else{
           setSeconds(seconds => seconds - 1);
         }


       }, 1000);
       if (minutes === 0 && seconds === 0){toggleSession()}
     } else if (!isActive && seconds !== 0) {
       clearInterval(interval);
     }
     return () => clearInterval(interval);




   }, [sessionLength, isActive, seconds, minutes, breakLength, isSession]);

   

  function toggle() {
    setIsActive(!isActive);
  }



  const reset = () => {
    setIsActive(false)
    setIsSession(true)
    setBreakLength(5)
    setSessionLength(25)
    setMinutes(25)
    setSeconds(0)
    let audioEl = document.getElementsByClassName("audio-element")[0]
    audioEl.pause()
    audioEl.currentTime = 0
    
  }

  function handleClick(e) {
    const id = e.target.getAttribute("id")
    switch(id) {
      case 'reset':
        reset()
        break
      case 'start_stop':
        toggle()
        break
      case 'break-increment':
        if (!isActive){setBreakLength(breakLength < 60 ? breakLength => breakLength + 1: breakLength)}
        break
      case 'break-decrement':
          if (!isActive){setBreakLength(breakLength > 1 ? breakLength => breakLength - 1: breakLength)}
        break
      case 'session-increment':
          if (!isActive){setSessionLength(sessionLength < 60 ? sessionLength => sessionLength + 1: sessionLength)
        setMinutes(sessionLength < 60 ? minutes => sessionLength+1: sessionLength)}
        break
      case 'session-decrement':
          if (!isActive){setSessionLength(sessionLength > 1 ? sessionLength => sessionLength - 1: sessionLength)
        setMinutes(sessionLength > 1 ? minutes => sessionLength-1: sessionLength)}
        break
      default:
        return 'error'
    }
  }
  const minuteDisplay = (0+minutes.toString()).slice(-2)
  const secondDisplay = (0+seconds.toString()).slice(-2)
  return (
    
    <div className="App">

      <div id="timer-container">
        <div id="break-container">
          <div id="break-label" >Break Length</div>
          <span id="break-decrement" onClick={(e) => handleClick(e)}>-</span>
          <div id="break-length" >{breakLength}</div>
          <span id="break-increment" onClick={(e) => handleClick(e)}>+</span>
        </div>
        <div id="session-container">
          <div id="session-label" >Session Length</div>
          <span id="session-decrement" onClick={(e) => handleClick(e)}>-</span>
          <div id="session-length" >{sessionLength}</div>
          <span id="session-increment" onClick={(e) => handleClick(e)}>+</span>
        </div>
        <div id="timer-display">
          <div id="timer-label" >{isSession ? 'Session' : 'Break'}</div>
          <div id="time-left" >{minuteDisplay}:{secondDisplay}</div>
          <span id="start_stop" onClick={(e) => handleClick(e)}>Start/Pause</span>
          <span id="reset" onClick={(e) => handleClick(e)}>Reset</span>
        </div>
        <div id="header">Pomodoro Clock<br /><p>Using React Hooks</p></div>
      </div>

      <div>
        <audio id="beep" className="audio-element" src="https://api.coderrocketfuel.com/assets/pomodoro-times-up.mp3"  />

      </div>
    </div>

  )
  
  
}

export default Timer;
