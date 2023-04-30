import React, {useState} from "react";
import s from "../Pomodoro/Pomodoro.module.css";
import {InputNumber, Modal} from "antd";
import {SettingOutlined} from "@ant-design/icons";

function ModalWindow(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div>
            <button onClick={toggleModal} className={s.timerSetting}><SettingOutlined/> Setting Timer</button>
        <Modal title="Setting Timer" open={isModalOpen} footer={null} onOk={toggleModal}
               onCancel={toggleModal}>
            <form className={s.form} onSubmit={onSubmit}>
                <div>
                    <label htmlFor="focusTime">Focus</label>
                    <InputNumber min={1} max={99} id={'focusTime'} type="number"/>
                </div>
                <div>
                    <label htmlFor="relaxTime">Short Brake</label>
                    <InputNumber min={1} max={99} id={'relaxTime'} type="number"/>
                </div>
                <div>
                    <label htmlFor="longBrake">Long Brake</label>
                    <InputNumber min={1} max={99} id={'longBrake'} type="number"/>
                </div>
                <button onClick={toggleModal}>Submit</button>
            </form>
        </Modal>
        </div>
    )

   function toggleModal() {
        setIsModalOpen(prevState => !prevState);
   }

    function onSubmit(e) {
        e.preventDefault()
        if (props.currentInterval === 'focus') {
            props.setTimer(e.target.focusTime.value * 60);
        }
        if (props.currentInterval === 'relax') {
            props.setTimer(e.target.relaxTime.value * 60);
        }
        if (props.currentInterval === 'longRelax') {
            props.setTimer(e.target.longBrake.value * 60);
        }
        if (e.target.focusTime.value !== '') {
            props.setFocus(e.target.focusTime.value * 60);
        }

        if (e.target.relaxTime.value !== '') {
            props.setShortBrake(e.target.relaxTime.value * 60);
        }

        if (e.target.longBrake.value !== '') {
            props.setLongBrake(e.target.longBrake.value * 60);
        }
    };

}

export default ModalWindow;