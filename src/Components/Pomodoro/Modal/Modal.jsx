import React from "react";
import s from "../Pomodoro.module.css";
import {InputNumber, Modal} from "antd";

const ModalWindow = (props) => {
    return (
        <Modal title="Setting Timer" open={props.isModalOpen} footer={null} onOk={props.handleOk} onCancel={props.handleCancel}>
            <form className={s.form} onSubmit={props.onSubmit}>
                <div>
                    <label htmlFor="focusTime">Focus</label>
                    <InputNumber id={'focusTime'} type="number"/>
                </div>
                <div>
                    <label htmlFor="relaxTime">Short Brake</label>
                    <InputNumber id={'relaxTime'} type="number"/>
                </div>
                <div>
                    <label htmlFor="longBrake">Long Brake</label>
                    <InputNumber id={'longBrake'} type="number"/>
                </div>
                <button onClick={props.handleOk}>Submit</button>
            </form>
        </Modal>
    )
}

export default ModalWindow;