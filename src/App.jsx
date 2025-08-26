import Timer from "./components/timer/timer.jsx"
import Todo from "./components/todo/todo.jsx"
import { useState } from "react"
import { Settings } from "./components/menu/settings.jsx"
import About from "./components/about/about.jsx"

export default function App() {
  const [isSettingsOn, setIsSettingsOn] = useState(false);
  const [isAboutOn, setIsAboutOn] = useState(false);
  const [isBackgroundOn, setIsBackgroundOn] = useState(false);
  const [focusTimer, setFocusTimer] = useState(25 * 60);
  const [breakTimer, setBreakTimer] = useState(5 * 60);
  const [longBreakTimer, setLongBreakTimer] = useState(20 * 60);

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
      />}
      <Timer 
      focusTimer={focusTimer}
      breakTimer={breakTimer}
      longBreakTimer={longBreakTimer}
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