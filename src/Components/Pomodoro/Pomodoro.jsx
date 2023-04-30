import React from "react";
import s from './Pomodoro.module.css';
import Timer from "../Timer/Timer";
import ModalWindow from "../Modal/Modal";
import classNames from "classnames";
import {usePomodoro, withPomodoroContext} from "./PomodoroContext";

function Pomodoro() {
    const { currentInterval } = usePomodoro();
    const classes = classNames([
        s.wrapper,
        {[s.focus]: currentInterval === 'focus'},
        {[s.relax]: currentInterval === 'relax'},
        {[s.longRelax]: currentInterval === 'longRelax'},
    ]);

    return (
        <div className={classes}>
            <div className={s.timerWrap}>
                <ModalWindow />
                <Timer />
            </div>
        </div>
    )

}

export default withPomodoroContext(Pomodoro);