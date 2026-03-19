import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TaskContext = createContext();

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);

    // LOAD
    useEffect(() => {
        const loadTasks = async () => {
            const data = await AsyncStorage.getItem("tasks");
            if (data) setTasks(JSON.parse(data));
        };
        loadTasks();
    }, []);

    // SAVE
    useEffect(() => {
        AsyncStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (text) => {
        setTasks([...tasks, { id: Date.now(), text, done: false }]);
    };

    const updateTask = (id, newText) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, text: newText } : t));
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask, updateTask }}>
            {children}
        </TaskContext.Provider>
    );
}

export function useTasks() {
    return useContext(TaskContext);
}
