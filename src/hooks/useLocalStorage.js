import React, { useState, useEffect } from 'react';
import window from 'global'

function useLocalStorage(key, initialValue = {}, listen = false) {
    const [storedValue, setStoredValue] = useState(get);
    const isBrowser = typeof window != 'undefined';

    useEffect(() => {
        if (isBrowser && listen) {
            window.addEventListener('storage', function () {
                setStoredValue(get);
            });
        }

        return function cleanup() {
            if (isBrowser && listen) {
                window.removeEventListener('storage', function () {
                    console.log("stop listening LS");
                });
            }
        }
    }, []);

    function get() {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (err) {
            return initialValue;
        }
    }

    const set = value => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (err) {
            throw err;
        }
    };

    const clear = () =>{
        window.localStorage.removeItem(key);
    };

    return [storedValue, set, clear];
}

export default useLocalStorage;
