import { useTodo, useOneTodo } from "./useTodo.jsx"
import styles from "./todo.module.css"
import optionsIcon from "/img/options.svg";
import checkmark from "/img/checkmark.svg";

export default function Todo() {
    const {inputValue, setInputValue, todos, handleAdd, handleDelete, handleEnter, handleDone} = useTodo();

    return(
        <div className={styles.maincontainer}>
            <div className={styles.titlecontainer}>
                <input className={styles.input} type="text" placeholder="add todo" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleEnter} ></input>
                <span><button className={styles.addbutton} type="button" onClick={handleAdd}><img src="/img/plus.svg" alt="add" /></button></span>
            </div>
            <AllTodo todolist={todos} handleDelete={handleDelete} handleDone={handleDone}/>
        </div>
    )
}

function OneTodo({text , id, handleDelete, handleDone, done}) {
    const {showMenu, ref, handleMenu} = useOneTodo();

    return(
        <div className={`${styles.onetodocontainer} ${done ? styles.done : ""}`} ref={ref}>
            <div className={`${styles.todo}`}>{text}</div>
            {done ? (<img className={styles.checkmark} src={checkmark} alt="completed" />) : null}
            <div className={styles.optionsbutton} onClick={handleMenu}>
                <img src={optionsIcon} alt="options"/>
                {showMenu && (
                <div className={styles.optionsMenu}>
                    <div className={`${styles.option} ${styles.a}`} onClick={() => handleDone(id)}>{done ? "ongoing" : "finished"}</div>
                    <div className={`${styles.option} ${styles.b}`} onClick={() => handleDelete(id)}>delete</div>
                </div>
                )}
            </div>
        </div>
    )
}

function AllTodo({ todolist, handleDelete, handleDone }) {
    
    return(
        <div className={styles.alltodocontainer}>
            {todolist.map((todo) => (
                <OneTodo key={todo.id} text={todo.text} id={todo.id} handleDelete={handleDelete} handleDone={handleDone} done={todo.isDone} />
            ))}
        </div>
    )
}