import React, {useEffect, useState} from "react";
import s from './Task.module.css';
import classNames from "classnames";
import {CheckCircleOutlined, DeleteOutlined, MoreOutlined} from "@ant-design/icons";
import TaskModal from "../TaskModal/TaskModal";
function Task(props) {
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [stateTask, setStateTask] = useState([])
    const [isDropMenuOpened, setIsDropMenuOpened] = useState(false);
    const [elementCurrent, setElementCurrent] = useState([])
    useEffect(() => {
            setStateTask(prevState => prevState.map(item => {
                    if (item.active && !item.isCompleted) {
                        return {
                            ...item,
                            cycle: props.currentInterval === 'relax' ? item.cycle + 1 : !props.focusCount && 0
                        }
                    }
                    return item;
            }));

    }, [props.focusCount])


    return (
       <div className={s.taskWrapper}>
           <div className={s.taskNumber}>
               <div className={s.taskOrder}>#{props.focusCount}</div>
               {stateTask.length === 0 ? (
                   props.currentInterval === 'focus' ? 'Time for a focus!' :
                       props.currentInterval === 'relax' ? 'Time for a break!' :
                           props.currentInterval === 'longRelax' ? 'Time for a break!' :
                               ''
               ) : (
                   stateTask.map((e) => {
                       if (e.active) {
                           props.setTitleItem(e.name)
                           return (
                               <div key={e.id}>{e.name}</div>
                           )
                       }
                       return null;
                   })
               )}
           </div>
           <ul className={s.taskList}>
               <li className={s.title}>Tasks <button onBlur={() => setIsDropMenuOpened(false)} onClick={() => setIsDropMenuOpened(!isDropMenuOpened)} className={s.burger}><MoreOutlined /> {isDropMenuOpened && <ul className={s.dropMenu}>
                   <li onClick={onStateChangeCompleted}><DeleteOutlined /> Clear finished tasks</li>
                   <li onClick={onStateDelete}><DeleteOutlined /> Clear all tasks</li>
               </ul>}</button></li>
               {stateTask.map((e) => {
                    if(e.show) {
                        return (
                            <li key={e.id} onClick={() => onSelectTodo(e.id)} className={classNames(s.task, {[s.active]: e.active})}> <div className={s.taskName}><span className={s.icon}><CheckCircleOutlined onClick={() => e.isCompleted = !e.isCompleted} /></span> {e.isCompleted ? <strike>{e.name}</strike> : e.name}</div> <span className={s.taskOrder}>{e.cycle} <h1>/{e.est}</h1> <div onClick={(event) => {
                                setIsModalOpened(true)
                                setElementCurrent([e, event])
                            }} className={s.taskBurger}>:</div> </span></li>
                        )
                    }
               })}
           </ul>
           {!isModalOpened &&  <button  className={s.taskAdd} onClick={(event) => {
               setIsModalOpened(true)
               setElementCurrent([event])
           }}><div className={s.text}><span className={s.icon}>+</span>Add Task</div></button>}
           {isModalOpened &&  <TaskModal elementCurrent={elementCurrent}  setIsModalOpened={setIsModalOpened} stateTask={stateTask} setStateTask={setStateTask}/>}
       </div>
    )

    function onSelectTodo(todoId) {
        setStateTask(prevState => prevState.map(item => ({
            ...item,
            active: item.id === todoId
        })));

    }
    function onStateDelete() {
        setStateTask([]);
    }
    function onStateChangeCompleted() {
        setStateTask(prevState =>
            prevState.filter(item => !item.isCompleted)
        );
    }

}

export default Task;