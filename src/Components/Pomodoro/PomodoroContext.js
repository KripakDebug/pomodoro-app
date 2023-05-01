import React, {createContext, useContext, useState} from "react";

const PomodoroContext = createContext(null);

export function PomodoroProvider({ children }) {
    const [focus, setFocus] = useState(1500);
    const [shortBrake, setShortBrake] = useState(300);
    const [longBrake, setLongBrake] = useState(900);
    const [timer, setTimer] = useState(focus);
    const [currentInterval, setCurrentInterval] = useState('focus');

    return (
        <PomodoroContext.Provider value={{
            focus,
            setFocus,
            shortBrake,
            setShortBrake,
            longBrake,
            setLongBrake,
            timer,
            setTimer,
            currentInterval,
            setCurrentInterval
        }}>
            { children }
        </PomodoroContext.Provider>
    )
}

export function usePomodoro() {
    const context = useContext(PomodoroContext);
    if (context === undefined) {
        throw new Error('usePomodoro must be used within a PomodoroContext.Provider');
    }
    return context;
}

export function withPomodoroContext(Component) {
    return function(props) {
        return (
            <PomodoroProvider>
                <Component {...props} />
            </PomodoroProvider>
        );
    };
}