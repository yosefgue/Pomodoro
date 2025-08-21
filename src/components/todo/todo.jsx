import { useState } from "react"
import styles from "./todo.module.css"

export default function Todo() {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);

    const handleClick = () => {
        if (inputValue == "") return;
        setTodos([...todos, inputValue])
        setInputValue("")
    }

    return(
        <div className={styles.maincontainer}>
            <div className={styles.titlecontainer}>
                <input className={styles.input} type="text" placeholder="add todo" value={inputValue} onChange={(e) => setInputValue(e.target.value)} ></input>
                <span><button className={styles.addbutton} type="button" onClick={handleClick}><img src="/img/plus.svg" alt="add" /></button></span>
            </div>
            <AllTodo todolist={todos}/>
        </div>
    )
}

function OneTodo({text}) {
    return(
        <div className={styles.onetodocontainer}>
            <div className={styles.todo}>{text}</div>
            <button className={styles.options}><img src="/img/options.svg" alt="options"/></button>
        </div>
    )
}

function AllTodo({ todolist }) {
    return(
        <div className={styles.alltodocontainer}>
            {todolist.map((todo) => (
                <OneTodo text={todo}/>
            ))}
        </div>
    )
}