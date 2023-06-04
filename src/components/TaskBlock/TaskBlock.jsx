import { useState } from "react";
import Task from "../Task/Task";
import style from "./TaskBlock.module.css";

function TaskBlock (props) {
    const [addTask, setAddTask] = useState (false); //для кнопки add
    const [valueOfInput, setValueOfInput] = useState (""); //useState для инпута 
    return (
        <div className={style.block}>
            <h3 className={style.headline}>{props.title}</h3>
            {props.data.map ((task) => {  //перебор массива с задачами
                return (
                    <Task nameOfTask={task.name} id={task.id}/> //props nameOfTask (1 задача), name - это строка с названием задачи
                )
            })}
            {addTask && <input className={style.input} value={valueOfInput} onChange={(event) => {
                setValueOfInput (event.target.value) //все эти штуки target.value позволяют читать данные из инпута 
            }}
            />}

            {!addTask ? <button className={style.buttonAdd} onClick={()=> { // ? :  это делаем условный рендеринг Если (?) addTask false (!) 
                                                                                // то показываем  кнопку добавить задачу 
                setAddTask (true)
            }}>+ Add card</button>
            :<button className={style.buttonAdd} onClick={()=> {
                if(valueOfInput !== ""){
                    props.addData(valueOfInput)
                    setValueOfInput("");
                }
                setAddTask (false)
            }}>Submit</button>}
        </div>
    ) 
}

export default TaskBlock 