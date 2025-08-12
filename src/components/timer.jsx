import styles from "./timer.module.css";
import { useState, useEffect } from "react";

export function Timer() {
    let startseconds = 120;
    let [timerOn, setTimerOn] = useState(false);
    let [seconds, setSeconds] = useState(startseconds);

    useEffect(() => {
        if (!timerOn) return;
        let startTime = Date.now();
        const intervalid = setInterval(() => {
            const now = Date.now();
            const elapsed = Math.floor((now - startTime) / 1000);
            const newseconds = startseconds - elapsed;
            setSeconds(newseconds)
        }, 250)
        return () => clearInterval(intervalid)
    }, [timerOn])

    const handleclick = () => {
        if (timerOn) return;
        setTimerOn(true)
    }
    
    return (
        <div class={styles.timer_container}>
            <svg>
                <circle></circle>
            </svg>
            <div class={styles.timer}>{seconds}</div>
            <button onClick={handleclick}>Start</button>
        </div>
    )
}

