import React, { useState} from "react";
import s from "../Task/Task.module.css";
import {CaretDownOutlined, CaretUpOutlined} from "@ant-design/icons";
import {v4 as uuidv4} from "uuid";

const createNewTaskFromTemplate = (name, est, active) => ({
    id: uuidv4(),
    isCompleted: false,
    cycle: 0,
    show: true,
    name,
    est,
    active,
});

export default function TaskModal({ setStateTask, setIsModalOpened, taskInformation }) {
    const [count, setCount] = useState(1);
    const [shallowTaskInformation, setShallowTaskInformation] = useState({...taskInformation});

    return (
        <div className={s.taskCreate}>
            <form onSubmit={onSubmit}>
                <input type="text" id='taskName' value={shallowTaskInformation.name} onChange={(e) => setShallowTaskInformation(e.target.value)} className={s.taskName} placeholder={'What are you working on?'}/>
                <div className={s.setTimer}>
                    <p>Est Pomodoros</p>
                    <input id='taskEst' type="number" min={1} value={count}/>
                    <span className={s.taskSetting}
                          onClick={() => changePomodoroCyclesCount(1)}><CaretUpOutlined/></span>
                    <span className={s.taskSetting}
                          onClick={() => !!count && changePomodoroCyclesCount(-1)}><CaretDownOutlined/></span>
                </div>
                <div className={s.wrapperButtonForm}>
                    <div onClick={() => setIsModalOpened(false)}>Cancel</div>
                    <button>Save</button>
                </div>
            </form>
        </div>
    )

    function changePomodoroCyclesCount(x) {
        setCount(prevState => prevState + x);
    }

    function onSubmit(e) {
        const {target: {taskName, taskEst}} = e;
        e.preventDefault();

        if (taskName.value === '') return;
        if (taskInformation) {
            setStateTask(prevState => prevState.map(task => {
                if (task.id === taskInformation.id) {
                    // TODO: Do with the rest of settings
                    return {...taskInformation, name: taskName.value}
                }
                return taskInformation;
            }))
            return;
        }

        setStateTask(prevState => [
            ...prevState,
            createNewTaskFromTemplate(taskName.value, taskEst.value, !prevState.length)
        ]);
        setIsModalOpened(false);
    }
}