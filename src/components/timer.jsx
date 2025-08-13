import styles from "./timer.module.css";
import { useState, useEffect, useRef } from "react";

export function Timer() {
    const focustimer = 10;
    const breaktimer = 5;
    const [breakamount, setbreakamount] = useState(0);
    const [focusamount, setfocusamount] = useState(0);

    const mode = useRef("focus")
    const startFocusTimer = useRef(focustimer);
    const remainingseconds = useRef(startFocusTimer.current);
    const [timerOn, setTimerOn] = useState(false);
    const [minutes, setMinutes] = useState(startFocusTimer.current);

    useEffect(() => {
        if (!timerOn) return;

        let startTime = Date.now();
        const intervalid = setInterval(() => {
            const now = Date.now();
            const elapsed = Math.floor((now - startTime) / 1000);
            remainingseconds.current = startFocusTimer.current - elapsed;
            setMinutes(remainingseconds.current);
            if (remainingseconds.current < 0) {
                startTime = Date.now()
                if (mode.current == "focus") {
                    mode.current = "break";
                    reset(breaktimer);
                    setfocusamount((fs) => fs + 1);
                }
                else {
                    mode.current = "focus";
                    reset(focustimer);
                    setbreakamount((br) => br + 1);
                }
            };
        }, 100)
        return () => {
            clearInterval(intervalid)
        }
    }, [timerOn, mode])

    const reset = (timeunit) => {
        startFocusTimer.current = timeunit;
        remainingseconds.current = timeunit;
        setMinutes(timeunit);

    }

    const handlestart = () => {
        if (timerOn) return;
        setTimerOn(true)
    }

    const handlestop = () => {
        startFocusTimer.current = remainingseconds.current;
        setTimerOn(false)
    }

    const handlereset = () => {
        setTimerOn(false);
        startFocusTimer.current = focustimer;
        remainingseconds.current = startFocusTimer.current;
        setMinutes(startFocusTimer.current)
    }
    
    return (
        <div className={styles.timer_container}>
            <svg>
                <circle></circle>
            </svg>
            <div className={styles.timer}>{minutes}<span>mins</span></div>
            <div className={styles.buttonscontainer}>
                <button onClick={handlestart}>Start</button>
                <button onClick={handlestop}>Pause</button>
                <button onClick={handlereset}>Reset</button>
                <span>breaks amount: {breakamount}</span>
                <span>focus amount: {focusamount}</span>
            </div>
        </div>
    )
}

