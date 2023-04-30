import React, {useState} from "react";
import s from "../../Task/Task.module.css";
import {CaretDownOutlined, CaretUpOutlined} from "@ant-design/icons";


export default function SetTimer({taskInformation, setShallowTaskInformation, shallowTaskInformation }) {
    const [count, setCount] = useState(1);
    return (
        <div className={s.setTimer}>
            <p>Est Pomodoros</p>
            <input id='taskEst' type="number" min={1} value={taskInformation ? shallowTaskInformation.est : count} />
            <span className={s.taskSetting}
                  onClick={() => changePomodoroCyclesCount(1)}><CaretUpOutlined/></span>
            <span className={s.taskSetting}
                  onClick={() => taskInformation ?  changePomodoroCyclesCount(-1) : !!count && changePomodoroCyclesCount(-1)}><CaretDownOutlined/></span>
        </div>
    )

    function changePomodoroCyclesCount(x) {
        if (taskInformation) {
            setShallowTaskInformation(prevState => ({
                ...prevState,
                est: Math.max(0, prevState.est + x)
            }));
        } else {
            setCount(prevState => Math.max(0, prevState + x));
        }
    }
}