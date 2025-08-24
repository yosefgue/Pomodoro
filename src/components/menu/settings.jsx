import { useRef, useEffect, useState } from "react"
import styles from "./settings.module.css"
import closeIcon from "/img/close.svg"

export function Settings({ toggle, focusTimer, breakTimer, longBreakTimer, setFocusTimer, setBreakTimer, setLongBreakTimer, isBackgroundOn, setIsBackgroundOn }) {
    const maxInputLength = 4;
    const ref = useRef(null)
    const [temporaryFocusTimer, setTemporaryFocusTimer] = useState(focusTimer);
    const [temporaryBreakTimer, setTemporaryBreakTimer] = useState(breakTimer);
    const [temporaryLongBreakTimer, setTemporaryLongBreakTimer] = useState(longBreakTimer);
    const [temporaryIsBackgroundOn, setTemporaryIsBackgroundOn] = useState(isBackgroundOn)
    
    const onlyNums = (e, setValue) => {
        const value = e.target.value ;
        if (/^\d*$/.test(value) && value.length <= maxInputLength ) {
            setValue(value === "" ? "" : Number(value))
        }
    }

    useEffect (() => {
        const clickAway = (e) => {
            if (ref.current && !ref.current.contains(e.target)) toggle(false);
        }
            document.addEventListener("mousedown", clickAway)
            return () => document.removeEventListener("mousedown", clickAway)
    }, [toggle])

    const savechanges = () => {
        setFocusTimer(temporaryFocusTimer)
        setBreakTimer(temporaryBreakTimer)
        setLongBreakTimer(temporaryLongBreakTimer)
        setIsBackgroundOn(temporaryIsBackgroundOn)
        toggle(false)
    }

    const toggleBackground = () => {
        setTemporaryIsBackgroundOn(() => !temporaryIsBackgroundOn)
    }

    return(
        <>
            <div className={styles.overlay}></div>
            <div className={styles.settingsmenu} ref={ref}>
                <div className={styles.titlecontainer}>
                    <div>timer settings</div>
                    <button className={styles.close} onClick={() => toggle(false)}>
                        <img src={closeIcon} alt="close" />
                    </button>
                </div>
                <div className={styles.inputcontainer}>
                    <div className={styles.option}>
                        <label htmlFor="focus">focus session</label>
                        <input id="focus" type="text" inputMode="numeric" value={temporaryFocusTimer} onChange={(e) => onlyNums(e, setTemporaryFocusTimer)}/>
                        <div className={styles.minutes}>mins</div>
                    </div>
                    <div className={styles.option}>
                        <label htmlFor="break">short break</label>
                        <input id="break" type="text" inputMode="numeric" value={temporaryBreakTimer} onChange={(e) => onlyNums(e, setTemporaryBreakTimer)}/>
                        <div className={styles.minutes}>mins</div>
                    </div>
                    <div className={styles.option}>
                        <label htmlFor="longbreak">long break</label>
                        <input id="longbreak" type="text" inputMode="numeric" value={temporaryLongBreakTimer} onChange={(e) => onlyNums(e, setTemporaryLongBreakTimer)}/>
                        <div className={styles.minutes}>mins</div>
                    </div>
                </div>
                <div className={styles.slidercontainer}>
                    <label htmlFor="toggle">background</label>
                    <span className={styles.toggle_switch}>
                        <input className={styles.toggle_input} id="toggle" type="checkbox" onChange={toggleBackground} checked={temporaryIsBackgroundOn}/>
                        <label className={styles.toggle_label} htmlFor="toggle"></label>
                    </span>
                </div>
                <button className={styles.savebutton} type="submit" onClick={() => savechanges()}>save changes</button>
            </div>
        </>
    )
    }