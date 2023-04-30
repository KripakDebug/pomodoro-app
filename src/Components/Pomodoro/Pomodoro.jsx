import React, {useState} from "react";
import s from './Pomodoro.module.css';
import Timer from "../Timer/Timer";
import ModalWindow from "../Modal/Modal";
import classNames from "classnames";
function Pomodoro() {
    const [focus, setFocus] = useState(1500);
    const [shortBrake, setShortBrake] = useState(300);
    const [longBrake, setLongBrake] = useState(900);
    const [timer, setTimer] = useState(focus);
    const [currentInterval, setCurrentInterval] = useState('focus');

    const classes = classNames([
        s.wrapper,
        {[s.focus]: currentInterval === 'focus'},
        {[s.relax]: currentInterval === 'relax'},
        {[s.longRelax]: currentInterval === 'longRelax'},
    ]);

    return (
        <div className={classes}>
            <div className={s.timerWrap}>
                <ModalWindow
                    currentInterval={currentInterval}
                    setTimer={setTimer}
                    setFocus={setFocus}
                    setShortBrake={setShortBrake}
                    setLongBrake={setLongBrake}
                />

                <Timer
                    timer={timer}
                    setTimer={setTimer}
                    shortBrake={shortBrake}
                    focus={focus}
                    longBrake={longBrake}
                    setCurrentInterval={setCurrentInterval}
                    currentInterval={currentInterval}
                />
            </div>
        </div>
    )

}


export default Pomodoro;