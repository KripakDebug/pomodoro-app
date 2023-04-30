import classNames from "classnames";
import style from "./Button.module.css";


export default function Button(props) {
    const { children, type, isActive, ...restProps } = props;
    const classes = classNames([
        {[style.primary]: type === 'primary'},
        {[style.secondary]: type === 'secondary'},
        {[style.ghost]: type === 'ghost'},
        {[style.active]: isActive && type === 'ghost'},

    ]);
    return (
        <button className={classes} { ...restProps }>{ children }</button>
    )
}