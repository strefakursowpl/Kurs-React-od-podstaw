import { useState } from "react"

const useLocalStorage = <T>(key: string, initialValue: T) => {

    const [storedValue, setStoredValue] = useState<T>(() => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    });

    const setValue = (value: T) => {
        setStoredValue(value);
        localStorage.setItem(key, JSON.stringify(value));
    }

    return [storedValue, setValue] as const;
}

export default useLocalStorage;
