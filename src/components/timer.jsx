import styles from "./timer.module.css";
import { useState, useEffect, useRef } from "react";

export function Timer() {
    const startTimer = useRef(120);
    const secondsremaining = useRef(startTimer.current);
    const [timerOn, setTimerOn] = useState(false);
    const [seconds, setSeconds] = useState(startTimer.current);

    useEffect(() => {
        if (!timerOn) return;
        let startTime = Date.now();
        const intervalid = setInterval(() => {
            const now = Date.now();
            const elapsed = Math.floor((now - startTime) / 1000);
            const remaining = startTimer.current - elapsed;
            secondsremaining.current = remaining;
            setSeconds(secondsremaining.current)
        }, 100)
        startTimer.current = secondsremaining.current;
        return () => clearInterval(intervalid)
    }, [timerOn])

    const handlestart = () => {
        if (timerOn) return;
        setTimerOn(true)
    }

    const handlestop = () => {
        setTimerOn(false)
    }

    const handlereset = () => {
        setTimerOn(false);
        startTimer.current = 120;
        secondsremaining.current = startTimer.current;
        setSeconds(startTimer.current)
    }
    
    return (
        <div className={styles.timer_container}>
            <svg>
                <circle></circle>
            </svg>
            <div className={styles.timer}>{seconds}</div>
            <button onClick={handlestart}>Start</button>
            <button onClick={handlestop}>Stop</button>
            <button onClick={handlereset}>Reset</button>
        </div>
    )
}

