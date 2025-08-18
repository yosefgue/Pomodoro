import styles from "./timer.module.css";
import { useState, useEffect, useRef } from "react";

export function Timer() {
    // all timer logic is done in seconds, multiply by 60 to make it to minutes.
    const focusTimer = 3;
    const breakTimer = 1;
    const longBreakTimer = 5;
    const [focusCount, setFocusCount] = useState(0);
    const [mode, setMode] = useState("focus");
    const currentTimer = mode == "focus" ? focusTimer : breakTimer;

    const initialTimerValue = useRef(currentTimer);
    const remainingSeconds = useRef(initialTimerValue.current);
    const [isTimerOn, setIsTimerOn] = useState(false);
    const [seconds, setSeconds] = useState(initialTimerValue.current);

    //UI
    const minsUI = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secsUI = String(seconds % 60).padStart(2, "0");
    const [isRotated, setIsRotated] = useState(false);

    useEffect(() => {
        if (!isTimerOn) return;
        
        let timeBeforeInterval = Date.now();
        const intervalID = setInterval(() => {
            const timeAfterInterval = Date.now();
            const elapsed = Math.floor((timeAfterInterval - timeBeforeInterval) / 1000);
            remainingSeconds.current = initialTimerValue.current - elapsed;
            setSeconds(remainingSeconds.current);
            if (remainingSeconds.current < 0) {
                timeBeforeInterval = Date.now()
                if (mode == "focus") {
                    setFocusCount((count) =>count + 1)
                    const updatedfocusCount = focusCount + 1; // react doesn't update state instantly only after the next render
                    if (updatedfocusCount % 4 == 0) {
                        handleReset(longBreakTimer, {resetMode: true, mode: "longbreak"})
                    }
                    else {
                        handleReset(breakTimer, {resetMode: true, mode: "break"});
                    }
                }
                else {
                    if (mode == "longbreak") setFocusCount(0);
                    handleReset(focusTimer, {resetMode: true, mode: "focus"})
                }
            };
        }, 250)
        return () => {
            clearInterval(intervalID)
        }
    }, [isTimerOn, mode, focusCount])

    const handleStartStop = () => {
        setIsTimerOn((previousTimerState) => !previousTimerState)
        if (!isTimerOn) initialTimerValue.current = remainingSeconds.current; //save timer progress, resume where left off
    }

    const handleReset = (timerValue, options = {stopTimer: false, resetMode: false, mode: "focus", resetFocusCount: false}) => {
        if (options.stopTimer) setIsTimerOn(false);
        if (options.resetMode) setMode(options.mode);
        if (options.resetFocusCount) setFocusCount(0);
        initialTimerValue.current = timerValue;
        remainingSeconds.current = timerValue;
        setSeconds(timerValue);
    }
    
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