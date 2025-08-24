import { useState, useEffect, useRef } from "react"

export function useTodo() {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);

    const handleAdd = () => {
        if (inputValue == "") return;
        setTodos([...todos, {id: Date.now(), text: inputValue, isDone: false}])
        setInputValue("")
    }

    const handleDelete = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    const handleEnter = (e) => {
        if (inputValue == "") return;
        if (e.key === "Enter") {
            setTodos([...todos, {id: Date.now(), text: inputValue, isDone: false}])
            setInputValue("")
        }
    }

    const handleDone = (id) => {
        setTodos(todos.map((todo) => todo.id === id ? {...todo, isDone: !todo.isDone} : todo
        ))
    }

    return {inputValue, setInputValue , todos, handleAdd, handleDelete, handleEnter, handleDone}
}

export function useOneTodo() {
    const [showMenu, setShowMenu] = useState(false);
    const handleMenu = () => {
        setShowMenu(!showMenu)
    }
    const ref = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) setShowMenu(false);
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])
    
    return {showMenu, ref, handleMenu}
}