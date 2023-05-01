import React from "react";
import Button from "../../../UI/Button";

export default function TimerUpdate({onClickTimer, currentInterval}) {
    return (
        <div>
            <Button
                type="ghost"
                onClick={() => onClickTimer('focus')}
                isActive={currentInterval === 'focus'}>
                Focus
            </Button>

            <Button
                type="ghost"
                onClick={() => onClickTimer('relax')}
                isActive={currentInterval === 'relax'}>
                Short Brake
            </Button>

            <Button
                type="ghost"
                onClick={() => onClickTimer('longRelax')}
                isActive={currentInterval === 'longRelax'}>
                Long Brake
            </Button>
        </div>
    )
}