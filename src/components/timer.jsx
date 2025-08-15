import styles from "./timer.module.css";
import { useState, useEffect, useRef } from "react";

export function Timer() {
    const focustimer = 2 * 60;
    const breaktimer = 1 * 60;
    const mode = useRef("focus");
    const currentTimer = mode.current == "focus" ? focustimer : breaktimer;

    const initialTimerValue = useRef(currentTimer);
    const remainingseconds = useRef(initialTimerValue.current);
    const [isTimerOn, setIsTimerOn] = useState(false);
    const [seconds, setSeconds] = useState(initialTimerValue.current);

    const minsUI = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secsUI = String(seconds % 60).padStart(2, "0");

    useEffect(() => {
        if (!isTimerOn) return;
        
        let timeBeforeInterval = Date.now();
        const intervalID = setInterval(() => {
            const timeAfterInterval = Date.now();
            const elapsed = (timeAfterInterval - timeBeforeInterval) / 1000;
            remainingseconds.current = initialTimerValue.current - elapsed;
            setSeconds(Math.floor(remainingseconds.current));
            if (remainingseconds.current < 0) {
                timeBeforeInterval = Date.now()
                if (mode.current == "focus") {
                    mode.current = "break";
                    reset(breaktimer);
                }
                else {
                    mode.current = "focus";
                    reset(focustimer);
                }
            };
        }, 250)
        return () => {
            clearInterval(intervalID)
        }
    }, [isTimerOn, breaktimer, focustimer])

    const reset = (timerMode) => {
        initialTimerValue.current = timerMode;
        remainingseconds.current = timerMode;
        setSeconds(timerMode);
    }

    const handlestart = () => {
        if (isTimerOn) return;
        setIsTimerOn(true)
    }

    const handlestop = () => {
        initialTimerValue.current = remainingseconds.current; //save timer progress, resume where left off
        console.log(initialTimerValue.current)
        setIsTimerOn(false)
    }

    const handlereset = () => {
        setIsTimerOn(false);
        initialTimerValue.current = focustimer;
        remainingseconds.current = initialTimerValue.current;
        setSeconds(initialTimerValue.current)
    }
    
    return (
        <div className={styles.timer_container}>
            <svg>
                <circle strokeDashoffset={((currentTimer - Math.floor(remainingseconds.current)) / currentTimer) * 1257}></circle> 
            </svg>
            <div className={styles.timer}>{minsUI}:{secsUI}</div>
            <div className={styles.buttonscontainer}>
                <button onClick={handlestart}>Start</button>
                <button onClick={handlestop}>Pause</button>
                <button onClick={handlereset}>Reset</button>
            </div>
        </div>
    )
}

