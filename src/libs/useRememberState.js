import { useEffect, useRef, useState } from "react";

function getLocalStorage(name, defaultV) {
    try {
        if (typeof window !== "undefined") {
            const v = localStorage.getItem(name);
            if (v) return JSON.parse(v);
        }
    } catch {}
    return defaultV;
}

function setLocalStorage(v,name) {
    try {
        localStorage.setItem(name, JSON.stringify(v));
    } catch {}
}

function useRememberState(consistentName){
    const [state, setState] = useState(() =>
            getLocalStorage(consistentName)
    );

    useEffect(() => {
        setState(getLocalStorage(consistentName));
    }, []);

    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            setLocalStorage(state, consistentName);
        }
    }, [state]);

    return [state, setState];
}

export default useRememberState;
