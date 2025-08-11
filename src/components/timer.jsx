import styles from "./timer.module.css"

export function Timer() {
    return (
        <div class={styles.timer_container}>
            <svg>
                <circle></circle>
            </svg>
            <div class={styles.timer}>9 : 00</div>
        </div>
    )
}