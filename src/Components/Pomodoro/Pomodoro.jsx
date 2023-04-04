import React, {useEffect, useState} from "react";
import s from './Pomodoro.module.css';
import {SettingOutlined} from "@ant-design/icons";
import timerSound from './../../audio/timergo.mp3';
import click from './../../audio/click.mp3';
import {Helmet} from "react-helmet";
import favicon from './../../icons/favicon.ico';
import faviconGreen from './../../icons/favicon-green.ico';
import faviconBlue from './../../icons/favicon-blue.ico';
import faviconGray from './../../icons/favicon-gray.ico';
import Timer from "./Timer/Timer";
import ModalWindow from "./Modal/Modal";
import classNames from "classnames";
const Pomodoro = () => {

    const [running, setRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [focus, setFocus] = useState(1500);
    const [shortBrake, setShortBrake] = useState(300);
    const [longBrake, setLongBrake] = useState(900);
    const [timer, setTimer] = useState(focus);
    const [currentInterval, setCurrentInterval] = useState('focus');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [breakCount, setBreakCount] = useState(0);
    const [pauseTimer, setPauseTimer] = useState(false);
    const classes = classNames([
        s.wrapper,
        { [s.focus]: currentInterval === 'focus' },
        { [s.relax]: currentInterval === 'relax' },
        { [s.longRelax]: currentInterval === 'longRelax' },
    ]);
    useEffect(() => {
        document.title = `${formatTime(timer)} - Time for a focus!`;
        if (timer === 0) {
            new Audio(timerSound).play()
            stopTimer()
            setPauseTimer(false);
            if (currentInterval === 'focus') {
                setCurrentInterval('relax');
                setTimer(shortBrake);
                setBreakCount(count => count + 1);
            } else {
                setCurrentInterval('focus');
                setTimer(focus);
            }
        }
        if(currentInterval === 'relax' || currentInterval === 'longRelax') {
            document.title = `${formatTime(timer)} - Time for a break!`;
        }
    }, [timer, currentInterval]);


    useEffect(() => {
        if (breakCount === 4) {
            setCurrentInterval('longRelax');
            setTimer(longBrake);
            setBreakCount(0);
        }
    }, [breakCount]);

    return (
        <div className={classes}>
            <div className={s.timerWrap}>
                <Helmet>
                    {currentInterval === 'focus' && pauseTimer === false ?  <link rel="icon" href={favicon} type="image/x-icon" /> : ''}
                    {currentInterval === 'relax' && pauseTimer === false ?  <link rel="icon" href={faviconGreen} type="image/x-icon" /> : ''}
                    {currentInterval === 'longRelax' && pauseTimer === false ?  <link rel="icon" href={faviconBlue} type="image/x-icon" /> : ''}
                    {pauseTimer === true && <link rel="icon" href={faviconGray} type="image/x-icon" />}
                </Helmet>
                <button onClick={showModal} className={s.timerSetting}><SettingOutlined /> Setting Timer</button>
                <ModalWindow onSubmit={onSubmit} isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel}/>
                <Timer formatTime={formatTime} timer={timer} running={running}
                       startTimer={startTimer} stopTimer={stopTimer} nextTimer={nextTimer}
                       clearTimer={clearTimer} onClickTimer={onClickTimer} currentInterval={currentInterval}/>
            </div>
        </div>
    )

    function showModal() {
        setIsModalOpen(true);
    };

    function handleOk() {
        setIsModalOpen(false);
    };

    function handleCancel() {
        setIsModalOpen(false);
    };

    function startTimer() {
        setPauseTimer(false)
        new Audio(click).play()
        setIntervalId(setInterval(() => {
            setTimer(time => time - 1)
        }, 10));
        setRunning(true);
    };

    function nextTimer() {
        stopTimer()
        setPauseTimer(false);
        if (currentInterval === "focus") {
            setCurrentInterval('relax');
            setTimer(shortBrake);
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
        setTimer(focus)
        setCurrentInterval('focus');
    };

    function onSubmit(e) {
        e.preventDefault()
            if (currentInterval === 'focus') {
                setTimer(e.target.focusTime.value * 60);
            }
            if (currentInterval === 'relax') {
                setTimer(e.target.relaxTime.value * 60);
            }
            if (currentInterval === 'longRelax') {
                setTimer(e.target.longBrake.value * 60);
            }
        if (e.target.focusTime.value !== '') {
            setFocus(e.target.focusTime.value * 60);
        }

        if (e.target.relaxTime.value !== '') {
            setShortBrake(e.target.relaxTime.value * 60);
        }

        if (e.target.longBrake.value !== '') {
            setLongBrake(e.target.longBrake.value * 60);
        }
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



export default Pomodoro;