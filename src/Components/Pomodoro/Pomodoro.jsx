import React, {useState} from "react";
import s from './Pomodoro.module.css';
import {Helmet} from "react-helmet";
import favicon from './../../icons/favicon.ico';
import faviconGreen from './../../icons/favicon-green.ico';
import faviconBlue from './../../icons/favicon-blue.ico';
import faviconGray from './../../icons/favicon-gray.ico';
import Timer from "../Timer/Timer";
import ModalWindow from "../Modal/Modal";
import classNames from "classnames";
function Pomodoro() {
    const [focus, setFocus] = useState(1500);
    const [shortBrake, setShortBrake] = useState(300);
    const [longBrake, setLongBrake] = useState(900);
    const [timer, setTimer] = useState(focus);
    const [pauseTimer, setPauseTimer] = useState(false);
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
                <Helmet>
                    {currentInterval === 'focus' && pauseTimer === false ?
                        <link rel="icon" href={favicon} type="image/x-icon"/> : ''}
                    {currentInterval === 'relax' && pauseTimer === false ?
                        <link rel="icon" href={faviconGreen} type="image/x-icon"/> : ''}
                    {currentInterval === 'longRelax' && pauseTimer === false ?
                        <link rel="icon" href={faviconBlue} type="image/x-icon"/> : ''}
                    {pauseTimer === true && <link rel="icon" href={faviconGray} type="image/x-icon"/>}
                </Helmet>
                <ModalWindow currentInterval={currentInterval} setTimer={setTimer}
                             setFocus={setFocus} setShortBrake={setShortBrake} setLongBrake={setLongBrake}/>

                <Timer setPauseTimer={setPauseTimer} timer={timer} setTimer={setTimer}
                       shortBrake={shortBrake} focus={focus} longBrake={longBrake}
                       setCurrentInterval={setCurrentInterval} currentInterval={currentInterval}/>
            </div>
        </div>
    )

}


export default Pomodoro;