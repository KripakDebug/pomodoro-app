import React from "react";
import classNames from "classnames";
import s from "../Task/Task.module.css";
import {CheckCircleOutlined} from "@ant-design/icons";

export default function TaskItem({ taskInformation, setIsModalOpened, onSelectTodo, setStateTask }) {
    const { id, active, isCompleted, name, cycle, est } = taskInformation;

    return (
        <li key={id} onClick={() =>
                onSelectTodo(id)} className={classNames(s.task, {[s.active]: active})}>
                <div className={s.taskName}>
          <span className={s.icon}>
             <CheckCircleOutlined onClick={onToggleCompleteTaskHandler} />
          </span>
                    {isCompleted ? <strike>{name}</strike> : name}
                </div>
                <span className={s.taskOrder}>
          {cycle}
                    <h1>/{est}</h1>
          <div onClick={() => {
              setIsModalOpened(true)
          }} className={s.taskBurger}>:
          </div>
       </span>
        </li>
    )

    function onToggleCompleteTaskHandler() {
        setStateTask(prevState => prevState.map(task => {
            if (task.id === id) return {...task, isCompleted: !isCompleted}
            return task;
        }))
    }
}