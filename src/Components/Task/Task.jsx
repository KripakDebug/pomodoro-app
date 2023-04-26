import React, {useEffect, useState} from "react";
import s from './Task.module.css';
import { v4 as uuidv4 } from 'uuid';
import classNames from "classnames";
import {CaretDownOutlined, CaretUpOutlined, CheckCircleOutlined, DeleteOutlined, MoreOutlined} from "@ant-design/icons";
function Task(props) {
    const [count, setCount] = useState(1);
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [stateTask, setStateTask] = useState([])
    const [isDropMenuOpened, setIsDropMenuOpened] = useState(false);

    useEffect(() => {
            setStateTask(prevState => prevState.map(item => {
                    if (item.active && !item.isComplicated) {
                        return {
                            ...item,
                            cycle: props.currentInterval === 'relax' ? item.cycle + 1 : !props.focusCount && 0
                        }
                    }
                    return item;

            }));

        if(count === 0) {
            setCount(1)
        }
    }, [count, props.focusCount])


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
                   <li onClick={onStateChangeComplicated}><DeleteOutlined /> Clear finished tasks</li>
                   <li onClick={onStateDelete}><DeleteOutlined /> Clear all tasks</li>
               </ul>}</button></li>
               {stateTask.map((e) => {
                    if(e.show) {
                        return (

                            <li key={e.id} onClick={() => onSelectTodo(e.id)} className={classNames(s.task, {[s.active]: e.active})}> <div className={s.taskName}><span className={s.icon}><CheckCircleOutlined onClick={() => e.isComplicated = !e.isComplicated} /></span> {e.isComplicated ? <strike>{e.name}</strike> : e.name}</div> <span className={s.taskOrder}>{e.cycle} <h1>/{e.est}</h1> <div onClick={() => setIsModalOpened(true)} className={s.taskBurger}>:</div> </span></li>
                        )
                    }
               })}
           </ul>
           {!isModalOpened &&  <button  className={s.taskAdd} onClick={() => setIsModalOpened(true)}><div className={s.text}><span className={s.icon}>+</span>Add Task</div></button>}
           {isModalOpened &&    <div onBlur={() => setIsModalOpened(false)} className={s.taskCreate}>
               <form  onSubmit={onSubmit}>
                   <input type="text" id={'taskName'} className={s.taskName} placeholder={'What are you working on?'}/>
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
           </div>}
       </div>
    )

    function onSubmit(e) {
        e.preventDefault()
        if(e.target.taskName.value !== ''){
            if(!stateTask.length) {
                setStateTask(prevState => ([
                        ...prevState,
                        {id: uuidv4(), name: e.target.taskName.value, est: e.target.taskEst.value, active: true, isComplicated: false,
                            cycle: 0, show: true}
                    ]
                ));
            }
            setIsModalOpened(false);
        }
        if(stateTask.length) {
            setStateTask(prevState => ([
                    ...prevState,
                    {id: uuidv4(), name: e.target.taskName.value, est: e.target.taskEst.value, active: false, isComplicated: false,
                        cycle: 0, show: true}
                ]
            ));
        }
    }
    function onSelectTodo(todoId) {

        setStateTask(prevState => prevState.map(item => ({
            ...item,
            active: item.id === todoId
        })));

    }
    function onStateDelete() {
        setStateTask([]);
    }
    function onStateChangeComplicated() {
        setStateTask(prevState =>
            prevState.filter(item => !item.isComplicated)
        );
    }

}

export default Task;