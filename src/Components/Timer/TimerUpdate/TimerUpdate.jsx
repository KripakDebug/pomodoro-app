import React from "react";
import s from "../../Pomodoro/Pomodoro.module.css";



export default function TimerUpdate({onClickTimer, currentInterval}) {
    return (
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
    )
}