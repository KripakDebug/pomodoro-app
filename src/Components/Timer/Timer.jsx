import React, {useEffect, useState} from "react";
import s from "../Pomodoro/Pomodoro.module.css";
import click from "../../audio/click.mp3";
import timerSound from "../../audio/timergo.mp3";
import Task from "../Task/Task";
import Title from "./Title/Title";
import TimerUpdate from "./TimerUpdate/TimerUpdate";
import ListBtnTimer from "./ListBtnTimer/ListBtnTimer";
import {usePomodoro} from "../Pomodoro/PomodoroContext";

function Timer() {
    const {currentInterval, timer, focus, shortBrake, longBrake, setCurrentInterval, setTimer} = usePomodoro();

    const [running, setRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [pauseTimer, setPauseTimer] = useState(false);
    const [breakCount, setBreakCount] = useState(0);
    const [focusCount, setFocusCount] = useState(0);
    const [timerTitle, setTitleItem] = useState(null);
    useEffect(() => {
        document.title = `${formatTime(timer)} - Time for a ${timerTitle === null ? 'focus' : timerTitle}`;
        if (timer === 0) {
            new Audio(timerSound).play()
            stopTimer()
            setPauseTimer(false);
            if (currentInterval === 'focus') {
                setCurrentInterval('relax');
                setTimer(shortBrake);
                setFocusCount(count => count + 1);
                setBreakCount(count => count + 1);
            } else {
                setCurrentInterval('focus');
                setTimer(focus);
            }
        }
        if (currentInterval === 'relax' || currentInterval === 'longRelax') {
            document.title = `${formatTime(timer)} - Time for a break!`;
        }
    }, [timer, currentInterval, setPauseTimer, setCurrentInterval, setTimer, shortBrake, focus, stopTimer, timerTitle]);


    useEffect(() => {
        if (breakCount === 4) {
            setCurrentInterval('longRelax');
            setTimer(longBrake);
            setBreakCount(0);
        }
    }, [breakCount, longBrake, setCurrentInterval, setTimer]);

    return (
       <div className={s.timerContainer}>
           <div className={s.timer}>
               <Title currentInterval={currentInterval} pauseTimer={pauseTimer}/>
                <TimerUpdate currentInterval={currentInterval} onClickTimer={onClickTimer}/>
               <h1>{formatTime(timer)}</h1>
              <ListBtnTimer clearTimer={clearTimer} nextTimer={nextTimer}
                            stopTimer={stopTimer} startTimer={startTimer} running={running}/>

           </div>
           <Task setTitleItem={setTitleItem} currentInterval={currentInterval} focusCount={focusCount} />

       </div>
    )


    function startTimer() {
        setPauseTimer(false)
        new Audio(click).play()
        setIntervalId(setInterval(() => {
            setTimer(time => time - 1)
        }, 1000));
        setRunning(true);
    };

    function nextTimer() {
        stopTimer()
        setPauseTimer(false);
        if (currentInterval === "focus") {
            setCurrentInterval('relax');
            setTimer(shortBrake);
            setFocusCount(count => count + 1);
            setBreakCount(count => count + 1);
            if (breakCount === 4) {
                setCurrentInterval('longRelax');
                setTimer(longBrake);
            }
        } else {
            setCurrentInterval('focus');
            setTimer(focus);
        }
    };

    function stopTimer() {
        new Audio(click).play()
        clearInterval(intervalId);
        setPauseTimer(true);
        setIntervalId(null);
        setRunning(false)

    };

    function clearTimer() {
        stopTimer()
        setPauseTimer(false);
        setBreakCount(0);
        setFocusCount(0);
        setTimer(focus)
        setCurrentInterval('focus');
    };

    function formatTime(timeInSeconds) {
        const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
        const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };
    function onClickTimer(interval) {
        stopTimer()
        setPauseTimer(false);
        setCurrentInterval(interval);

        switch (interval) {
            case 'focus':
                setTimer(focus);
                break;
            case 'relax':
                setTimer(shortBrake);
                break;
            case 'longRelax':
                setTimer(longBrake);
                break;
            default:
                break;
        }
    };
}


export default Timer;