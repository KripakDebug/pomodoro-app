import React, {useEffect, useState} from "react";
import s from './Pomodoro.module.css';
import {InputNumber, Modal} from 'antd';
import {SettingOutlined, StepForwardOutlined, UndoOutlined} from "@ant-design/icons";
import timerSound from './../../audio/timergo.mp3';
import click from './../../audio/click.mp3';
import {Helmet} from "react-helmet";
import favicon from './../../icons/favicon.ico';
import faviconGreen from './../../icons/favicon-green.ico';
import faviconBlue from './../../icons/favicon-blue.ico';
import faviconGray from './../../icons/favicon-gray.ico';
const Pomodoro = (props) => {

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
    const [focusCount, setFocusCount] = useState(0);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const startTimer = () => {
        setPauseTimer(false)
        new Audio(click).play()
        setIntervalId(setInterval(() => {
            setTimer(time => time - 1)
        }, 10));
        setRunning(true);

    };

    useEffect(() => {
        document.title = `${formatTime(timer)} - Time for a break!`;
        if (timer === 0) {
            new Audio(timerSound).play()
            stopTimer()
            setPauseTimer(false);
            if (currentInterval === 'focus') {
                setFocusCount(count => count + 1)
                setCurrentInterval('relax');
                setTimer(shortBrake);
                setBreakCount(count => count + 1);
            } else {
                setCurrentInterval('focus');
                setTimer(focus);
            }
        }
       else if (currentInterval === 'focus') {
            document.title = formatTime(timer) + ' - Time for a focus!';
            document.body.style.backgroundColor = 'rgb(186, 73, 73)';
        }
        else if(currentInterval === 'relax') {
            document.body.style.backgroundColor = 'rgb(56, 133, 138)';
        }
        else if(currentInterval === 'longRelax') {
            document.body.style.backgroundColor = 'rgb(57, 112, 151)';
        }

        if (breakCount === 4) {
            setCurrentInterval('longRelax');
            setTimer(longBrake);
            setBreakCount(0);
        }

    }, [focus, shortBrake, timer, currentInterval, breakCount]);

    const nextTimer = () => {
        stopTimer()
        setPauseTimer(false);
        if(currentInterval === "focus") {
            setFocusCount(count => count + 1)
            setCurrentInterval('relax');
            setTimer(shortBrake);
            setBreakCount(count => count + 1);
            if (breakCount === 4) {
                setCurrentInterval('longRelax');
                setTimer(longBrake);
            }
        }
        else {
            setCurrentInterval('focus');
            setTimer(focus);
        }
    }

    const stopTimer = () => {
        new Audio(click).play()
        clearInterval(intervalId);
        setPauseTimer(true);
        setIntervalId(null);
        setRunning(false)

    };
    const clearTimer = () => {
        stopTimer()
        setPauseTimer(false);
        setFocusCount(0)
        setBreakCount(0);
        setTimer(focus)
        setCurrentInterval('focus');
    }

    const onSubmit = (e) => {
        e.preventDefault()

       if(e.target.focusTime.value !== '' && e.target.relaxTime.value !== '' && e.target.longBrake.value !== '') {
           setFocus(e.target.focusTime.value * 60);
          if(currentInterval === 'focus') {
              setTimer(e.target.focusTime.value * 60);
          }
           if(currentInterval === 'relax') {
               setTimer(e.target.relaxTime.value * 60);
           }
           if(currentInterval === 'longRelax') {
               setTimer(e.target.longBrake.value * 60);
           }
           setShortBrake(e.target.relaxTime.value * 60);
           e.target.focusTime.value = '';
           e.target.relaxTime.value = '';
       }

       if(e.target.focusTime.value !== '') {
           setFocus(e.target.focusTime.value * 60);
           if(currentInterval === 'focus') {
               setTimer(e.target.focusTime.value * 60);
           }
           setTimer(e.target.focusTime.value * 60);
           e.target.focusTime.value = '';
       }

       if(e.target.relaxTime.value !== '') {
           if(currentInterval === 'relax') {
               setTimer(e.target.relaxTime.value * 60);
           }
           setShortBrake(e.target.relaxTime.value * 60);
           e.target.relaxTime.value = '';
       }

        if(e.target.longBrake.value !== '') {
            if(currentInterval === 'longRelax') {
                setTimer(e.target.longBrake.value * 60);
            }
            setLongBrake(e.target.longBrake.value * 60);
            e.target.longBrake.value = '';
        }
     }

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
        const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    const onClickFocus = () => {
        stopTimer()
        setPauseTimer(false);
        setCurrentInterval('focus');
            setTimer(focus)
    }
    const onClickShortBrake = () => {
        stopTimer()
        setPauseTimer(false);
        setCurrentInterval('relax');
        setTimer(shortBrake)
    }
    const onClickLongBrake = () => {
        stopTimer()
        setPauseTimer(false);
        setCurrentInterval('longRelax');
        setTimer(longBrake)
    }
    return (
        <div className={s.timerWrap}>
            <Helmet>
                {currentInterval === 'focus' && pauseTimer === false ?  <link rel="icon" href={favicon} type="image/x-icon" /> : ''}
                {currentInterval === 'relax' && pauseTimer === false ?  <link rel="icon" href={faviconGreen} type="image/x-icon" /> : ''}
                {currentInterval === 'longRelax' && pauseTimer === false ?  <link rel="icon" href={faviconBlue} type="image/x-icon" /> : ''}
                {pauseTimer === true && <link rel="icon" href={faviconGray} type="image/x-icon" />}
            </Helmet>
            <button onClick={showModal} className={s.timerSetting}><SettingOutlined /> Setting Timer</button>
            <Modal title="Setting Timer" open={isModalOpen} footer={null} onOk={handleOk} onCancel={handleCancel}>
                <form className={s.form} onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="focusTime">Focus</label>
                        <InputNumber id={'focusTime'} type="number"/>
                    </div>
                    <div>
                        <label htmlFor="relaxTime">Short Brake</label>
                        <InputNumber id={'relaxTime'} type="number"/>
                    </div>
                    <div>
                        <label htmlFor="longBrake">Long Brake</label>
                        <InputNumber id={'longBrake'} type="number"/>
                    </div>
                    <button onClick={handleOk}>Submit</button>
                </form>
            </Modal>
            <div className={s.timer}>
                <div className={s.timerUpdate}>
                    <button onClick={onClickFocus} id={currentInterval === 'focus' && s.active}>Focus</button>
                    <button onClick={onClickShortBrake} id={currentInterval === 'relax' && s.active}>Short Brake</button>
                    <button onClick={onClickLongBrake} id={currentInterval === 'longRelax' && s.active}>Long Brake</button>
                </div>
                <h1>{formatTime(timer)}</h1>
                <ul className={s.listBtn}>
                        <li>
                            <button className={s.buttonTimerActive} onClick={running === false ? startTimer : stopTimer}>
                                {running === false ?  'Start' : 'Pause'}
                            </button>
                        </li>
                    <li className={running === true  ? s.nextTimerOpacity : s.nextTimer}>
                        {running === true && <StepForwardOutlined onClick={nextTimer} />}
                    </li>
                        <li className={s.refreshTimer}>
                            <UndoOutlined onClick={clearTimer}  />
                        </li>
                </ul>
            </div>
        </div>
    )
}



export default Pomodoro;