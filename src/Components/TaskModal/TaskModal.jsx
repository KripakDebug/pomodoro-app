import React, { useState} from "react";
import s from "../Task/Task.module.css";
import {v4 as uuidv4} from "uuid";
import SetTimer from "./SetTimer/SetTimer";

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
    const [shallowTaskInformation, setShallowTaskInformation] = useState({...taskInformation});

    return (
        <div className={s.taskCreate}>
            <form onSubmit={onSubmit}>
                <input type="text" id='taskName' value={shallowTaskInformation.name}
                       onChange={(e) => changePomodoroNameTask(e)}
                       className={s.taskName} placeholder={'What are you working on?'}/>
              <SetTimer setShallowTaskInformation={setShallowTaskInformation} shallowTaskInformation={shallowTaskInformation} taskInformation={taskInformation}/>
                <div className={s.wrapperButtonForm}>
                    {taskInformation && <div onClick={(e) => deleteTask(e)} className={s.btnDelete}>Delete</div>}
                    <div onClick={() => setIsModalOpened(false)}>Cancel</div>
                    <button>Save</button>
                </div>
            </form>
        </div>
    )

    function deleteTask() {
        setStateTask(prevState => prevState.filter(task => {
            if (task.id === taskInformation.id) {
                    return task.id !== taskInformation.id
            }
            return task;
        }))
    }

    function changePomodoroNameTask(e) {
        setShallowTaskInformation((prevState) => ({
            ...prevState,
            name: e.target.value,
        }))
    }

    function onSubmit(e) {
        const {target: {taskName, taskEst}} = e;
        e.preventDefault();

        if (taskName.value === '') return;
        if (taskInformation) {
            setStateTask(prevState => prevState.map(task => {
                if (task.id === taskInformation.id) {
                    return {...taskInformation, name: taskName.value, est: +taskEst.value}
                }
                return task;
            }))
            setIsModalOpened(false)
            return;
        }

        setStateTask(prevState => [
            ...prevState,
            createNewTaskFromTemplate(taskName.value, +taskEst.value, !prevState.length)
        ]);
        setIsModalOpened(false);
    }
}