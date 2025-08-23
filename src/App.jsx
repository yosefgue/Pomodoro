import Timer from "./components/timer/timer.jsx"
import Todo from "./components/todo/todo.jsx"

function App() {
  return (
    <>
      <Menu />
      <Timer />
      <Todo />
    </>
  )
}

function Menu() {
  return(
    <div className="menucontainer">
      <button><img src="/img/settings.svg" alt="settings" /></button>
      <button><img src="/img/about.svg" alt="about" /></button>
    </div>
  )
}

export default App
