import { useState, useEffect, useRef } from "react";
import {focusTimer1, breakTimer1, longBreakTimer1} from "./timerConfig.js"
// All timer logic is done in seconds.
export default function useTimer() {
    const focusTimer = focusTimer1;
    const breakTimer = breakTimer1;
    const longBreakTimer = longBreakTimer1;

    const [mode, setMode] = useState("focus");
    const currentTimer = mode == "focus" ? focusTimer : breakTimer;

    const [focusCount, setFocusCount] = useState(0);
    const initialTimerValue = useRef(currentTimer);
    const remainingSeconds = useRef(initialTimerValue.current);
    const [isTimerOn, setIsTimerOn] = useState(false);
    const [seconds, setSeconds] = useState(initialTimerValue.current);

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
                    const updatedfocusCount = focusCount + 1; // react doesn't update state instantly only after the next render, so manual save
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
    }, [isTimerOn, mode, focusCount, breakTimer, focusTimer, longBreakTimer])

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
   return {handleReset, handleStartStop, seconds, isTimerOn, focusCount, focusTimer}
}