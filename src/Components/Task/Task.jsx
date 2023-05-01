import React, {useEffect, useState} from "react";
import s from './Task.module.css';
import TaskModal from "../TaskModal/TaskModal";
import TaskNumber from "../TaskNumber/TaskNumber";
import TaskList from "../TaskList/TaskList";
import Button from "../../UI/Button";

function Task({ setTitleItem, currentInterval, focusCount}) {
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [stateTask, setStateTask] = useState([]);

    useEffect(() => {
        setStateTask(prevState => prevState.map(item => {
            if (item.active && !item.isCompleted) {
                return {
                    ...item,
                    cycle: currentInterval === 'relax' ? item.cycle + 1 : !focusCount && 0
                }
            }
            return item;
        }));

    }, [focusCount])

    return (
       <div className={s.taskWrapper}>
           <TaskNumber stateTask={stateTask} currentInterval={currentInterval}
                       setTitleItem={setTitleItem} focusCount={focusCount}/>
           <TaskList setStateTask={setStateTask} setIsModalOpened={setIsModalOpened} stateTask={stateTask}
                     onStateChangeCompleted={onStateChangeCompleted} />
           {!isModalOpened && <Button className={s.taskAdd} onClick={() => {
               setIsModalOpened(true)
           }}>
               <div className={s.text}><span className={s.icon}>+</span>Add Task</div>
           </Button>
           }
           {isModalOpened && <TaskModal setStateTask={setStateTask} setIsModalOpened={setIsModalOpened} />}
       </div>
    )


    function onStateChangeCompleted() {
        setStateTask(prevState =>
            prevState.filter(item => !item.isCompleted)
        );
    }

}

export default Task;