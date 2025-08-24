import Timer from "./components/timer/timer.jsx"
import Todo from "./components/todo/todo.jsx"
import { useState } from "react"
import { Settings } from "./components/menu/settings.jsx"

export default function App() {
  const [isSettingsOn, setIsSettingsOn] = useState(false)
  const [focusTimer, setFocusTimer] = useState(5);
  const [breakTimer, setBreakTimer] = useState(10);
  const [longBreakTimer, setLongBreakTimer] = useState(20);

  return (
    <>
      <MenuOptions toggle={setIsSettingsOn}/>
      {isSettingsOn && <Settings 
      toggle={setIsSettingsOn}
      focusTimer={focusTimer}
      breakTimer={breakTimer}
      longBreakTimer={longBreakTimer}
      setFocusTimer={setFocusTimer}
      setBreakTimer={setBreakTimer}
      setLongBreakTimer={setLongBreakTimer}
      />}
      <Timer 
      focusTimer={focusTimer}
      breakTimer={breakTimer}
      longBreakTimer={longBreakTimer}
      />
      <Todo />
    </>
  )
}

function MenuOptions({ toggle }) {
  return(
    <div className="menucontainer">
      <button><img src="/img/settings.svg" alt="settings" onClick={() => toggle(true)}/></button>
      <button><img src="/img/about.svg" alt="about" /></button>
    </div>
  )
}