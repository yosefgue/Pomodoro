import Timer from "./components/timer/timer.jsx"
import Todo from "./components/todo/todo.jsx"
import { useState, useEffect } from "react"
import { Settings } from "./components/menu/settings.jsx"
import About from "./components/about/about.jsx"

const storedFocusTimer = () => Number(localStorage.getItem('focusTimer')) || 25 * 60 ;
const storedBreakTimer = () => Number(localStorage.getItem('breakTimer')) || 5 * 60 ;
const storedLongBreakTimer = () => Number(localStorage.getItem('longBreakTimer')) || 20 * 60 ;
const storedIsBackgroundOn = () => {
  const value = localStorage.getItem('isBackGroundOn');
  return value ? JSON.parse(value) : false
}

export default function App() {
  const [isSettingsOn, setIsSettingsOn] = useState(false);
  const [isAboutOn, setIsAboutOn] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isBackgroundOn, setIsBackgroundOn] = useState(() => storedIsBackgroundOn());
  const [focusTimer, setFocusTimer] = useState(10);
  const [breakTimer, setBreakTimer] = useState(5);
  const [longBreakTimer, setLongBreakTimer] = useState(() => storedLongBreakTimer());

  useEffect(() => {
    localStorage.setItem('focusTimer', JSON.stringify(focusTimer));
  }, [focusTimer])
  useEffect(() => {
    localStorage.setItem('breakTimer', JSON.stringify(breakTimer));
  }, [breakTimer])
  useEffect(() => {
    localStorage.setItem('longBreakTimer', JSON.stringify(longBreakTimer))
  }, [longBreakTimer])
  useEffect(() => {
    localStorage.setItem('isBackGroundOn', JSON.stringify(isBackgroundOn))
  }, [isBackgroundOn])

  return (
    <>
      {isBackgroundOn && <Background/>}
      <MenuOptions toggleSettings={setIsSettingsOn} toggleAbout={setIsAboutOn}/>
      {isSettingsOn && <Settings
      toggleSettings={setIsSettingsOn}
      focusTimer={focusTimer}
      breakTimer={breakTimer}
      longBreakTimer={longBreakTimer}
      setFocusTimer={setFocusTimer}
      setBreakTimer={setBreakTimer}
      setLongBreakTimer={setLongBreakTimer}
      setIsBackgroundOn={setIsBackgroundOn}
      isBackgroundOn={isBackgroundOn}
      isSoundOn = {isSoundOn}
      setIsSoundOn = {setIsSoundOn}
      />}
      <Timer 
      focusTimer={focusTimer}
      breakTimer={breakTimer}
      longBreakTimer={longBreakTimer}
      isSoundOn = {isSoundOn}
      />
      <Todo />
      {isAboutOn && <About toggleAbout={setIsAboutOn}/>}
    </>
  )
}

function MenuOptions({ toggleSettings, toggleAbout }) {
  return(
    <div className="menucontainer">
      <button><img src="/img/settings.svg" alt="settings" onClick={() => toggleSettings(true)}/></button>
      <button><img src="/img/about.svg" alt="about" onClick={() => toggleAbout(true)}/></button>
    </div>
  )
}

function Background() {
  return(
    <div className="background"></div>
  )
}