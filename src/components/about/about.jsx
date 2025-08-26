import { useRef } from "react"
import styles from "./about.module.css"
import closeIcon from "/img/close.svg"
import useClickAway from "/src/hooks/useClickAway.jsx"

export default function About({ toggleAbout }) {
    const ref = useRef(null)
    useClickAway(ref, toggleAbout)
    return (
        <>
            <div className={styles.overlay}></div>
            <div className={styles.aboutcontainer} ref={ref}>
                <div className={styles.titlecontainer}>
                    <div className={styles.title}>about</div>
                    <button className={styles.closebutton} onClick={() => toggleAbout(false)}>
                        <img src={closeIcon} alt="close" />
                    </button>
                </div>
                <p>
                    The Pomodoro Technique is an easy way to manage your time and energy. 
                    It breaks work into short sessions: 25 minutes of focus followed by a 5-minute break. 
                    One focus session plus one break is called a pomodoro. 
                    After completing four pomodoros, you take a longer break of 15 to 30 minutes to fully recharge.
                    <br />
                    <br />
                    The technique is flexible, you can adjust the focus time, the short breaks, or the long breaks to suit your own workflow. 
                    I personally like using 35-minute focus sessions, as it helps me dive deeper into tasks without feeling rushed. 
                    <br />
                    <br />
                    A typical cycle looks like this:
                </p>
                <ol>
                    <li>Choose one task to work on.</li>
                    <li>Set the pomodoro timer (typically 25 minutes) and stay focused.</li>
                    <li>Work on the task.</li>
                    <li>When the timer goes off, step away for 5-10 minutes.</li>
                    <li>Go back to Step 2 and repeat until you complete four pomodori.</li>
                    <li>After four pomodori are done, take a long break (typically 20 to 30 minutes). Once the long break is finished, return to step 2.</li>
                </ol>
                <p>
                    The main goal of the Pomodoro Technique is to help you maintain deep focus and flow while minimizing interruptions. 
                    By working in fixed, timed sessions, it trains your mind to stay concentrated on a single task, manage distractions effectively, and work more efficiently.
                </p>
            </div>
        </>
    )
}