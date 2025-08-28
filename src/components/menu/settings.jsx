import { useRef, useState } from "react"
import styles from "./settings.module.css"
import closeIcon from "/img/close.svg"
import useClickAway from "/src/hooks/useClickAway.jsx"

export function Settings({ toggleSettings, focusTimer, breakTimer, longBreakTimer, setFocusTimer, setBreakTimer, setLongBreakTimer, isBackgroundOn, setIsBackgroundOn, isSoundOn, setIsSoundOn }) {
    const maxInputLength = 4;
    const ref = useRef(null)
    const toSeconds = (minutes) => minutes * 60;
    const toMinutes = (seconds) => seconds / 60;
    const [temporaryFocusTimer, setTemporaryFocusTimer] = useState(toMinutes(focusTimer));
    const [temporaryBreakTimer, setTemporaryBreakTimer] = useState(toMinutes(breakTimer));
    const [temporaryLongBreakTimer, setTemporaryLongBreakTimer] = useState(toMinutes(longBreakTimer));
    const [temporaryIsBackgroundOn, setTemporaryIsBackgroundOn] = useState(isBackgroundOn);
    const [temporaryIsSoundOn, setTemporaryIsSoundOn] = useState(isSoundOn);
    
    const onlyNums = (e, setValue) => {
        const value = e.target.value ;
        if (/^\d*$/.test(value) && value.length <= maxInputLength ) {
            setValue(value === "" ? "" : Number(value))
        }
    }

    useClickAway(ref, toggleSettings)

    const savechanges = () => {
        setFocusTimer(toSeconds(temporaryFocusTimer))
        setBreakTimer(toSeconds(temporaryBreakTimer))
        setLongBreakTimer(toSeconds(temporaryLongBreakTimer))
        setIsBackgroundOn(temporaryIsBackgroundOn)
        toggleSettings(false)
        setIsSoundOn(temporaryIsSoundOn)
    }

    const toggleBackground = () => {
        setTemporaryIsBackgroundOn(() => !temporaryIsBackgroundOn)
    }

    const toggleSound= () => {
        setTemporaryIsSoundOn(() => !temporaryIsSoundOn)
    }

    return(
        <>
            <div className={styles.overlay}></div>
            <div className={styles.settingsmenu} ref={ref}>
                <div className={styles.titlecontainer}>
                    <div>timer settings</div>
                    <button className={styles.close} onClick={() => toggleSettings(false)}>
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
                    <label htmlFor="toggleBackground">background</label>
                    <span className={styles.toggle_switch}>
                        <input className={styles.toggle_input} id="toggleBackground" type="checkbox" onChange={toggleBackground} checked={temporaryIsBackgroundOn}/>
                        <label className={styles.toggle_label} htmlFor="toggleBackground"></label>
                    </span>
                </div>
                <div className={styles.slidercontainer}>
                    <label htmlFor="toggleSound">sound</label>
                    <span className={styles.toggle_switch}>
                        <input className={styles.toggle_input} id="toggleSound" type="checkbox" onChange={toggleSound} checked={temporaryIsSoundOn}/>
                        <label className={styles.toggle_label} htmlFor="toggleSound"></label>
                    </span>
                </div>
                <button className={styles.savebutton} type="submit" onClick={() => savechanges()}>save changes</button>
            </div>
        </>
    )
    }