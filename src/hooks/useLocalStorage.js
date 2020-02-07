import React, { useState } from 'react';
import window from 'global'

function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (err) {
            return initialValue;
        }
    });

    const setValue = value => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (err) {
            throw err;
        }
    };

    const clearValue = () =>{
        window.localStorage.removeItem(key);
    };

    return [storedValue, setValue, clearValue];
}

export default useLocalStorage;
