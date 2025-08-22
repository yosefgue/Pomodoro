import { useState, useRef, useEffect } from "react"
import styles from "./todo.module.css"

export default function Todo() {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);

    const handleClick = () => {
        if (inputValue == "") return;
        setTodos([...todos, {id: Date.now(), text: inputValue}])
        setInputValue("")
    }

    const handleDelete = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    return(
        <div className={styles.maincontainer}>
            <div className={styles.titlecontainer}>
                <input className={styles.input} type="text" placeholder="add todo" value={inputValue} onChange={(e) => setInputValue(e.target.value)} ></input>
                <span><button className={styles.addbutton} type="button" onClick={handleClick}><img src="/img/plus.svg" alt="add" /></button></span>
            </div>
            <AllTodo todolist={todos} handleDelete={handleDelete}/>
        </div>
    )
}

function OneTodo({text , id, handleDelete}) {
    const [showMenu, setShowMenu] = useState(false);
    const handleClick = () => {
        setShowMenu(!showMenu)
    }
    const ref = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) setShowMenu(false);
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])
    
    return(
        <div className={styles.onetodocontainer} ref={ref}>
            <div className={styles.todo}>{text}</div>
            <div className={styles.optionsbutton} onClick={handleClick}>
                <img src="/img/options.svg" alt="options"/>
                {showMenu && (
                <div className={styles.optionsMenu}>
                    <div className={`${styles.option} ${styles.a}`}>done</div>
                    <div className={`${styles.option} ${styles.b}`} onClick={() => handleDelete(id)}>delete</div>
                </div>
                )}
            </div>
        </div>
    )
}

function AllTodo({ todolist, handleDelete }) {

    return(
        <div className={styles.alltodocontainer}>
            {todolist.map((todo) => (
                <OneTodo key={todo.id} text={todo.text} id={todo.id} handleDelete={handleDelete}/>
            ))}
        </div>
    )
}