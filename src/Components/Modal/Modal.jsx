import React, {useState} from "react";
import s from "../Pomodoro/Pomodoro.module.css";
import {InputNumber, Modal} from "antd";
import {SettingOutlined} from "@ant-design/icons";

function ModalWindow({currentInterval, setFocus, setTimer, setLongBrake, setShortBrake}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div>
            <button onClick={toggleModal} className={s.timerSetting}><SettingOutlined/> Setting Timer</button>
        <Modal title="Setting Timer" open={isModalOpen} footer={null} onOk={toggleModal} onCancel={toggleModal}>
            <form className={s.form} onSubmit={onSubmit}>
                <div>
                    <label htmlFor="focus">Focus</label>
                    <InputNumber min={1} max={99} id='focus' type="number"/>
                </div>
                <div>
                    <label htmlFor="relax">Short Brake</label>
                    <InputNumber min={1} max={99} id='relax' type="number"/>
                </div>
                <div>
                    <label htmlFor="longRelax">Long Brake</label>
                    <InputNumber min={1} max={99} id='longRelax' type="number"/>
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
        const { target, target: { focus, relax, longRelax } } = e;
        e.preventDefault();

        setTimer(target[currentInterval].value * 60);

        focus.value && setFocus(focus.value * 60);
        relax.value && setShortBrake(relax.value * 60);
        longRelax.value && setLongBrake(longRelax.value * 60);
    }
}

export default ModalWindow;