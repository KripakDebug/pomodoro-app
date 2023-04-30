import React from "react";
import s from "../../Pomodoro/Pomodoro.module.css";
import {StepForwardOutlined, UndoOutlined} from "@ant-design/icons";



export default function ListBtnTimer({running, nextTimer, startTimer, stopTimer, clearTimer}) {
    return (
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
    )
}