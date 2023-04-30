import React from "react";
import s from "../Task/Task.module.css";

export default function TaskNumber({stateTask, currentInterval, setTitleItem, focusCount}) {
    return (
        <div className={s.taskNumber}>
            <div className={s.taskOrder}>#{focusCount}</div>
            {stateTask.length === 0 ? (
                currentInterval === 'focus' ? 'Time for a focus!' :
                    currentInterval === 'relax' ? 'Time for a break!' :
                        currentInterval === 'longRelax' ? 'Time for a break!' :
                            ''
            ) : (
                stateTask.map((e) => {
                    if (e.active) {
                        setTitleItem(e.name)
                        return (
                            <div key={e.id}>{e.name}</div>
                        )
                    }
                    return null;
                })
            )}
        </div>
    )
}