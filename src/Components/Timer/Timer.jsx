import React, {useEffect, useState} from "react";
import s from "../Pomodoro/Pomodoro.module.css";
import {StepForwardOutlined, UndoOutlined} from "@ant-design/icons";
import click from "../../audio/click.mp3";
import timerSound from "../../audio/timergo.mp3";
import favicon from "../../icons/favicon.ico";
import faviconGreen from "../../icons/favicon-green.ico";
import faviconBlue from "../../icons/favicon-blue.ico";
import faviconGray from "../../icons/favicon-gray.ico";
import {Helmet} from "react-helmet";
import Task from "../Task/Task";

function Timer({currentInterval, timer, focus, shortBrake, longBrake, setCurrentInterval, setTimer}) {
    const [running, setRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [pauseTimer, setPauseTimer] = useState(false);
    const [breakCount, setBreakCount] = useState(0);
    const [focusCount, setFocusCount] = useState(0);

    useEffect(() => {
        document.title = `${formatTime(timer)} - Time for a focus!`;
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
    }, [timer, currentInterval, setPauseTimer, setCurrentInterval, setTimer, shortBrake, focus, stopTimer]);


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
               <Helmet>
                   {currentInterval === 'focus' && pauseTimer === false ?
                       <link rel="icon" href={favicon} type="image/x-icon"/> : ''}
                   {currentInterval === 'relax' && pauseTimer === false ?
                       <link rel="icon" href={faviconGreen} type="image/x-icon"/> : ''}
                   {currentInterval === 'longRelax' && pauseTimer === false ?
                       <link rel="icon" href={faviconBlue} type="image/x-icon"/> : ''}
                   {pauseTimer === true && <link rel="icon" href={faviconGray} type="image/x-icon"/>}
               </Helmet>
               <div className={s.timerUpdate}>
                   <button onClick={() => onClickTimer('focus')}
                           className={currentInterval === 'focus' && s.active}>Focus
                   </button>
                   <button onClick={() => onClickTimer('relax')} className={currentInterval === 'relax' && s.active}>Short
                       Brake
                   </button>
                   <button onClick={() => onClickTimer('longRelax')}
                           className={currentInterval === 'longRelax' && s.active}>Long Brake
                   </button>
               </div>
               <h1>{formatTime(timer)}</h1>
               <ul className={s.listBtn}>
                   <li>
                       <button className={s.buttonTimerActive} onClick={running === false ? startTimer : stopTimer}>
                           {running === false ? 'Start' : 'Pause'}
                       </button>
                   </li>
                   <li className={running === true ? s.nextTimerOpacity : s.nextTimer}>
                       {running === true && <StepForwardOutlined onClick={nextTimer}/>}
                   </li>
                   <li className={s.refreshTimer}>
                       <UndoOutlined onClick={clearTimer}/>
                   </li>
               </ul>

           </div>
           <Task currentInterval={currentInterval} focusCount={focusCount}  />

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