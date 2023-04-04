import React from "react";
import s from "../Pomodoro.module.css";
import {StepForwardOutlined, UndoOutlined} from "@ant-design/icons";

const Timer = (props) => {
    return (
        <div className={s.timer}>
            <div className={s.timerUpdate}>
                <button onClick={() => props.onClickTimer('focus')} id={props.currentInterval === 'focus' && s.active}>Focus</button>
                <button onClick={() => props.onClickTimer('relax')} id={props.currentInterval === 'relax' && s.active}>Short Brake</button>
                <button onClick={() => props.onClickTimer('longRelax')} id={props.currentInterval === 'longRelax' && s.active}>Long Brake</button>
            </div>
            <h1>{props.formatTime(props.timer)}</h1>
            <ul className={s.listBtn}>
                <li>
                    <button className={s.buttonTimerActive} onClick={props.running === false ? props.startTimer : props.stopTimer}>
                        {props.running === false ?  'Start' : 'Pause'}
                    </button>
                </li>
                <li className={props.running === true  ? s.nextTimerOpacity : s.nextTimer}>
                    {props.running === true && <StepForwardOutlined onClick={props.nextTimer} />}
                </li>
                <li className={s.refreshTimer}>
                    <UndoOutlined onClick={props.clearTimer}  />
                </li>
            </ul>
        </div>
    )
}


export default Timer;