import { useState } from "react"
import styles from "./todo.module.css"

export default function Todo() {
    return(
        <div className={styles.maincontainer}>
            <div className={styles.titlecontainer}>
                <input className={styles.input} type="text" placeholder="add todo" ></input>
                <span><button className={styles.addbutton} type="button"><img src="/img/plus.svg" alt="add" /></button></span>
            </div>
            <div calssName={styles.todocontainer}>
                <div className={styles.todo}>eat fish</div>
            </div>
        </div>
    )
}