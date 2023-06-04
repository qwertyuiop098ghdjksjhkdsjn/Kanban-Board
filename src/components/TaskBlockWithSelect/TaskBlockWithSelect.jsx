import { useState } from "react";
import Task from "../Task/Task";
import style from "./TaskBlockWithSelect.module.css";

function TaskBlockWithSelect (props) {
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
            {addTask && <select value={valueOfInput} onChange={(event) => {
                props.onSelect (event.target.value) //все эти штуки target.value позволяют читать данные из event - что произошло, 
                                                    //target - то, с чем произошел event (input/select/button,...) 
                                                    //value - текущее значение элемента (у кнопки нет) напр, у инпута - это то, что ввели(строка)
            }}
            >
                <option hidden>Choose</option>
            {props.list.map ((task) => {  //перебор массива с задачами
                return (
                    <option value={task.id}>{task.name}</option> //props nameOfTask (1 задача), name - это строка с названием задачи
                )
            })}  

            

            </select>}

            <button className={style.buttonAdd} disabled={(props.list.length == 0)} onClick={()=> {    //disabled={(props.list.length == 0)} disabled возвращает 
                                                                                                //либо true, либо false  взависимости от того, что написано в скобках. 
                setAddTask (true)
            }}>+ Add card</button>
        </div>
    ) 
}

export default TaskBlockWithSelect