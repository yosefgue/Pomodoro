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

    const textOptions = {
    focus: "Deep work time.",
    break: "Take a breath.",
    longbreak: "Relax, you've earned it."
    };
    const [text, setText] = useState("");

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
        }, 200)

        if (mode == "focus") {
                setText(textOptions.focus);
            } else if (mode == "break") {
                setText(textOptions.break);
            } else {
                setText(textOptions.longbreak);
            }
            
        return () => {
            clearInterval(intervalID)
        }
    }, [isTimerOn, mode, focusCount])

    const handleStartStop = () => {
        setIsTimerOn((previousTimerState) => !previousTimerState)
        if (!isTimerOn) initialTimerValue.current = remainingSeconds.current; //save timer progress, resume where left off
    }

    const handleReset = (timerValue, options = {stopTimer: false, resetMode: false, mode: "focus", resetFocusCount: false, resetText: false}) => {
        if (options.stopTimer) setIsTimerOn(false);
        if (options.resetMode) setMode(options.mode);
        if (options.resetFocusCount) setFocusCount(0);
        if (options.resetText) setText("");
        initialTimerValue.current = timerValue;
        remainingSeconds.current = timerValue;
        setSeconds(timerValue);
    }
   return {handleReset, handleStartStop, seconds, isTimerOn, focusCount, focusTimer, text}
}