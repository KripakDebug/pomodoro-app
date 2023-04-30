import React, {useEffect, useState} from "react";
import s from './Task.module.css';
import {DeleteOutlined, MoreOutlined} from "@ant-design/icons";
import TaskModal from "../TaskModal/TaskModal";
import TaskItem from "../TaskItem/TaskItem";
import TaskNumber from "../TaskNumber/TaskNumber";

function Task({ setTitleItem, currentInterval, focusCount}) {
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [stateTask, setStateTask] = useState([]);
    const [isDropMenuOpened, setIsDropMenuOpened] = useState(false);

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
           <ul className={s.taskList}>
               <li className={s.title}> Tasks
                   <button
                       onBlur={() => setIsDropMenuOpened(false)}
                       onClick={() => setIsDropMenuOpened(!isDropMenuOpened)}
                       className={s.burger}
                   >
                        <MoreOutlined />
                        {isDropMenuOpened && (
                            <ul className={s.dropMenu}>
                                <li onClick={onStateChangeCompleted}><DeleteOutlined /> Clear finished tasks</li>
                                <li onClick={() => setStateTask([])}><DeleteOutlined /> Clear all tasks</li>
                            </ul>
                        )}
                   </button>
               </li>
               {stateTask?.map(currentTaskInformation => <TaskItem
                   taskInformation={currentTaskInformation}
                   setIsModalOpened={setIsModalOpened}
                   onSelectTodo={onSelectTodo}
                   setStateTask={setStateTask}
               />
               )}
           </ul>
           {!isModalOpened && <button  className={s.taskAdd} onClick={() => {
               setIsModalOpened(true)
           }}>
               <div className={s.text}><span className={s.icon}>+</span>Add Task</div>
           </button>
           }
           {isModalOpened && <TaskModal setStateTask={setStateTask} setIsModalOpened={setIsModalOpened} />}
       </div>
    )

    function onSelectTodo(todoId) {
        setStateTask(prevState => prevState.map(item => ({
            ...item,
            active: item.id === todoId
        })));
    }

    function onStateChangeCompleted() {
        setStateTask(prevState =>
            prevState.filter(item => !item.isCompleted)
        );
    }

}

export default Task;