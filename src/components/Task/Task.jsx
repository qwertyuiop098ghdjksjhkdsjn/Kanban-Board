import { useNavigate } from "react-router-dom";
import style from "./Task.module.css";

function Task (props) {
    const navigate = useNavigate(); //функция, кот позволяет перемещаться м/у страницами

    function onClick () {
        navigate(`/taskPage/${props.id}`);
    }

    return (
        <p className={style.Paragraph} onClick={onClick}>{props.nameOfTask}</p>
    )
}

export default Task 