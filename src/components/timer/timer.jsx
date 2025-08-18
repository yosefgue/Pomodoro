import { useState } from "react";
import styles from "./timer.module.css";
import useTimer from "./useTimer.jsx"

export default function Timer() {
    const {handleReset, handleStartStop, seconds, isTimerOn, focusCount, focusTimer} = useTimer();
    const minsUI = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secsUI = String(seconds % 60).padStart(2, "0");
    const [isRotated, setIsRotated] = useState(false);
    
    return (
    <div className={styles.allcontainer}>
        <div className={styles.timer_container}>
            <div className={styles.timer}>{minsUI}:{secsUI}</div>
        </div>
        <div className={styles.circle_container}>
            <div className={`${styles.circle} ${focusCount >= 1 ? styles.done : ""}`}></div>
            <div className={`${styles.circle} ${focusCount >= 2 ? styles.done : ""}`}></div>
            <div className={`${styles.circle} ${focusCount >= 3 ? styles.done : ""}`}></div>
            <div className={`${styles.circle} ${focusCount >= 4 ? styles.done : ""}`}></div>
        </div>
    
        <div className={styles.buttonscontainer}>
            <button className={isTimerOn ? styles.stopbutton : styles.startbutton} onClick={handleStartStop}> 
                {isTimerOn ? "pause" : "start"}
            </button>
            <button className={`${styles.resetbutton} ${isRotated ? styles.rotate : ""}`} onClick={() => {
                handleReset(focusTimer, {stopTimer: true, resetMode: true, mode: "focus", resetFocusCount: true})
                setIsRotated(!isRotated)
                }}>
                <img src="/img/reset.svg" alt="reset"/>
            </button>
        </div>
    </div>
    )
}