import React, {useEffect, useState} from "react";
import s from './Task.module.css';
import { v4 as uuidv4 } from 'uuid';
import classNames from "classnames";
function Task() {
    const [count, setCount] = useState(1);
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [stateTask, setStateTask] = useState([])

    useEffect(() => {
        if(count === 0) {
            setCount(1)
        }
    }, [count])

    return (
       <div className={s.taskWrapper}>
           <div className={s.taskName}>
               <div className={s.taskNumber}>#0</div>
               dada
           </div>
           <ul className={s.taskList}>
               <li className={s.title}>Tasks</li>
               {stateTask.map((e) => {
                   return (
                       <li key={e.id} onClick={() => onSelectTodo(e.id)} className={classNames(s.task, {[s.active]: e.active})}>{e.name} <span>0/{e.est}</span></li>
                   )
               })}
           </ul>
           {!isModalOpened &&  <button className={s.taskAdd} onClick={() => setIsModalOpened(true)}><div className={s.text}><span className={s.icon}>+</span>Add Task</div></button>}
           {isModalOpened &&    <div className={s.taskCreate}>
               <form onSubmit={onSubmit}>
                   <input type="text" id={'taskName'} placeholder={'What are you working on?'}/>
                   <div className={s.setTimer}>
                       <p>Est Pomodoros</p>
                       <input id={'taskEst'} type="number" min={1} value={count}/>
                       <span onClick={() => setCount(count+1)}>+</span>
                       <span onClick={() => setCount(count-1)}>-</span>
                   </div>
                   <button>save</button>
               </form>
           </div>}
       </div>
    )

    function onSubmit(e) {
        e.preventDefault()
        setStateTask(prevState => ([
            ...prevState,
                {id: uuidv4(), name: e.target.taskName.value, est: e.target.taskEst.value, active: false}
            ]
        ));
        setIsModalOpened(false);
    }
    function onSelectTodo(todoId) {
        setStateTask(prevState => prevState.map(item => ({
            ...item,
            active: item.id === todoId
        })));

    }
}

export default Task;