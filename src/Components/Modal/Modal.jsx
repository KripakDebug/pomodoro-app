import React, {useState} from "react";
import s from "../Pomodoro/Pomodoro.module.css";
import {InputNumber, Modal} from "antd";
import {SettingOutlined} from "@ant-design/icons";
import {usePomodoro} from "../Pomodoro/PomodoroContext";
import Button from "../../Ui/Button";

function ModalWindow() {
    const {currentInterval, setFocus, setTimer, setLongBrake, setShortBrake} = usePomodoro();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <Button
                onClick={toggleModal}
                type="secondary"
            >
                <SettingOutlined/> Setting Timer
            </Button>
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
                    <Button
                        onClick={toggleModal}
                    >
                        Submit
                    </Button>
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