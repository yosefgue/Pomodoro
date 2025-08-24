import { useState, useRef, useEffect } from "react"
import styles from "./settings.module.css"
import {focusTimer1, breakTimer1, longBreakTimer1} from "/src/components/timer/timerConfig.js"

export function Settings({ toggle }) {
  const [inputFocus, setInputFocus] = useState(focusTimer1);
  const [inputBreak, setInputBreak] = useState(breakTimer1);
  const [inputLongBreak, setInputLongBreak] = useState(longBreakTimer1);
  const maxInputLength = 4;
  const ref = useRef(null)

  const onlyNums = (e, setValue) => {
    const value = e.target.value ;
    if (/^\d*$/.test(value) && value.length <= maxInputLength ) {
      setValue(value)
    }
  }

  useEffect (() => {
    const clickAway = (e) => {
        if (ref.current && !ref.current.contains(e.target)) toggle(false);
    }
        document.addEventListener("mousedown", clickAway)
        return () => document.removeEventListener("mousedown", clickAway)
  }, [toggle])

  return(
    <>
        <div className={styles.overlay}></div>
        <div className={styles.settingsmenu} ref={ref}>
            <div className={styles.titlecontainer}>
                <div>timer settings</div>
                <button className={styles.close} onClick={() => toggle(false)}>
                    <img src="/img/close.svg" alt="close" />
                </button>
            </div>
            <div className={styles.inputcontainer}>
                <div className={styles.option}>
                    <label htmlFor="focus">focus session</label>
                    <input id="focus" type="text" inputMode="numeric" value={inputFocus} onChange={(e) => onlyNums(e, setInputFocus)}/>
                    <div className={styles.minutes}>mins</div>
                </div>
                <div className={styles.option}>
                    <label htmlFor="break">short break</label>
                    <input id="break" type="text" inputMode="numeric" value={inputBreak} onChange={(e) => onlyNums(e, setInputBreak)}/>
                    <div className={styles.minutes}>mins</div>
                </div>
                <div className={styles.option}>
                    <label htmlFor="longbreak">long break</label>
                    <input id="longbreak" type="text" inputMode="numeric" value={inputLongBreak} onChange={(e) => onlyNums(e, setInputLongBreak)}/>
                    <div className={styles.minutes}>mins</div>
                </div>
            </div>
            <button className={styles.savebutton} type="button">save changes</button>
        </div>
    </>
  )
}