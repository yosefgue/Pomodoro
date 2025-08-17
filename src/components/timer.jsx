import styles from "./timer.module.css";
import { useState, useEffect, useRef } from "react";

export function Timer() {
    const circumference = 1257; // calculated based on radius which is set to 200px in CSS (2 x pi x 200).
    const focusTimer = 20; // all timer logic is done in seconds, multiply by 60 to make it to minutes.
    const breakTimer = 10;
    const [mode, setMode] = useState("focus");
    const currentTimer = mode == "focus" ? focusTimer : breakTimer;

    const initialTimerValue = useRef(currentTimer);
    const remainingSeconds = useRef(initialTimerValue.current);
    const [isTimerOn, setIsTimerOn] = useState(false);
    const [seconds, setSeconds] = useState(initialTimerValue.current);

    const minsUI = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secsUI = String(seconds % 60).padStart(2, "0");
    const circleoffsetUI = ((currentTimer - Math.floor(remainingSeconds.current)) / currentTimer) * circumference;

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
                    handleReset(breakTimer, {resetMode: true, mode: "break"})
                }
                else {
                    handleReset(focusTimer, {resetMode: true, mode: "focus"})
                }
            };
        }, 250)
        return () => {
            clearInterval(intervalID)
        }
    }, [isTimerOn, mode])

    const handleStartStop = () => {
        setIsTimerOn((previousTimerState) => !previousTimerState)
        if (!isTimerOn) initialTimerValue.current = remainingSeconds.current; //save timer progress, resume where left off
    }

    const handleReset = (timerValue, options = {stopTimer: false, resetMode: false, mode: "focus"}) => {
        if (options.stopTimer) setIsTimerOn(false);
        if (options.resetMode) setMode(options.mode);
        initialTimerValue.current = timerValue;
        remainingSeconds.current = timerValue;
        setSeconds(timerValue);
    }
    
    return (
        <div className={styles.allcontainer}>
            <div className={styles.timer_container}>
                <svg>
                    <circle strokeDashoffset={circleoffsetUI}></circle> 
                </svg>
                <div className={styles.timer}>{minsUI}:{secsUI}</div>
            </div>
            <div className={styles.buttonscontainer}>
                <button className={styles.playstopbutton} onClick={handleStartStop}> 
                    <img src={isTimerOn ? "/img/pause.svg" : "/img/play.svg"} alt="play/pause"/>{isTimerOn ? "pause" : "start"}
                </button>
                <button className={styles.resetbutton} onClick={() => handleReset(focusTimer, {stopTimer: true, resetMode: true, mode: "focus"})}>
                    <img src="/img/reset.svg" alt="reset"/>reset
                </button>
            </div>
        </div>
    )
}