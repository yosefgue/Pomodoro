import { useEffect } from "react"

export default function useClickAway(ref, toggle) {
    useEffect(() => {
        const clickAway = (e) => {
            if (ref.current && !ref.current.contains(e.target)) toggle(false)
        }
        document.addEventListener("mousedown", clickAway)
        document.addEventListener("touchstart", clickAway)
        return () => {
            document.removeEventListener("mousedown", clickAway)
            document.removeEventListener("touchstart", clickAway)
        }
    }, [toggle, ref])
}