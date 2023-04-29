import React, {useEffect, useState} from "react";
import s from "../Task/Task.module.css";
import {CaretDownOutlined, CaretUpOutlined} from "@ant-design/icons";
import {v4 as uuidv4} from "uuid";

function TaskModal({stateTask, setStateTask, setIsModalOpened, elementCurrent}) {
    const [count, setCount] = useState(1);
    useEffect(() => {
        if(count === 0) {
            setCount(1)
        }
    }, [count])
    return (
        <div className={s.taskCreate}>
            <form  onSubmit={onSubmit}>
                <input type="text" id={'taskName'} className={s.taskName} onChange={getValueElement} placeholder={'What are you working on?'}/>
                <div className={s.setTimer}>
                    <p>Est Pomodoros</p>
                    <input id={'taskEst'} type="number" min={1} value={count}/>
                    <span className={s.taskSetting} onClick={() => setCount(count+1)}><CaretUpOutlined /></span>
                    <span className={s.taskSetting} onClick={() => setCount(count-1)}><CaretDownOutlined /></span>
                </div>
                <div className={s.wrapperButtonForm}>
                    <div onClick={() => setIsModalOpened(false)}>Cancel</div>
                    <button>Save</button>
                </div>
            </form>
        </div>
    )

    function onSubmit(e) {
        e.preventDefault()
        if(e.target.taskName.value !== ''){
            if(!stateTask.length) {
                setStateTask(prevState => ([
                        ...prevState,
                        {id: uuidv4(), name: e.target.taskName.value, est: e.target.taskEst.value, active: true, isCompleted: false,
                            cycle: 0, show: true}
                    ]
                ));
            }
            setIsModalOpened(false);
        }
        if(stateTask.length) {
            setStateTask(prevState => ([
                    ...prevState,
                    {id: uuidv4(), name: e.target.taskName.value, est: e.target.taskEst.value, active: false, isCompleted: false,
                        cycle: 0, show: true}
                ]
            ));
        }
    }
    function getValueElement() {
        if(elementCurrent.length === 2) {
            elementCurrent.map(e => {
                return e.name
            })
        }
    }
}

export default TaskModal;