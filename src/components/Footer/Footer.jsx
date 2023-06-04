import style from "./Footer.module.css"

function Footer (props) {
    return (
        <div className={style.footer}>
            <div className={style.text}>
                <span className={style.task}>Active tasks: {props.taskBacklog}</span>
                <span>Finished tasks: {props.taskFinished}</span>
            </div>
            <div className={style.text}>Kanban board by {"Nastya"} {"2023"}</div>
        </div>
    )
}

export default Footer; 