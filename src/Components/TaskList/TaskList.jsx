import React, {useState} from "react";
import s from "../Task/Task.module.css";
import {DeleteOutlined, MoreOutlined} from "@ant-design/icons";
import TaskItem from "../TaskItem/TaskItem";



export default function TaskList({onStateChangeCompleted, setStateTask, stateTask, setIsModalOpened}) {
    const [isDropMenuOpened, setIsDropMenuOpened] = useState(false);
    return (
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
    )

    function onSelectTodo(todoId) {
        setStateTask(prevState => prevState.map(item => ({
            ...item,
            active: item.id === todoId
        })));
    }
}