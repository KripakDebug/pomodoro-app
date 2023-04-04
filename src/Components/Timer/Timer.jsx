import React from "react";
import s from "../Pomodoro/Pomodoro.module.css";
import {StepForwardOutlined, UndoOutlined} from "@ant-design/icons";

const Timer = ({onClickTimer, currentInterval, timer, formatTime, running, startTimer, stopTimer, nextTimer, clearTimer}) => {

    return (
        <div className={s.timer}>
            <div className={s.timerUpdate}>
                <button onClick={() => onClickTimer('focus')} className={currentInterval === 'focus' && s.active}>Focus</button>
                <button onClick={() => onClickTimer('relax')} className={currentInterval === 'relax' && s.active}>Short Brake</button>
                <button onClick={() => onClickTimer('longRelax')} className={currentInterval === 'longRelax' && s.active}>Long Brake</button>
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
    )
}


export default Timer;