import Timer from "./components/timer/timer.jsx"
import Todo from "./components/todo/todo.jsx"
import { useState } from "react"
import { Settings } from "./components/menu/settings.jsx"

export default function App() {
  const [isSettingsOn, setIsSettingsOn] = useState(false)
  return (
    <>
      <MenuOptions toggle={setIsSettingsOn}/>
      {isSettingsOn && <Settings toggle={setIsSettingsOn}/>}
      <Timer />
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