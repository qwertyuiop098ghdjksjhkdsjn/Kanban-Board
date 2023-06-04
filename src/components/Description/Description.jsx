import { useParams } from "react-router-dom";
import { useState } from "react";
import style from "./Description.module.css"
import { useNavigate } from "react-router-dom";

function Description (props) {
    const [editTask, setEditTask] = useState (false); //для кнопки add
    const { id } = useParams();
    const [input , setInput] = useState ("") // значение инпута 
    const navigate = useNavigate(); //функция, кот позволяет перемещаться м/у страницами

    function onClick () {
        navigate(`/`);
    }
    const task = props.array.find((task) => {
        if(task.id == id){
            return true
        } else {
            return false
        }
    })
    return (
        <div className={style.block}>
           <h1>{task.name}</h1> 
          <button className={style.close} onClick={onClick}><svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="1.35355" y1="0.646447" x2="24.3536" y2="23.6464" stroke="black"/>
<line y1="-0.5" x2="32.5269" y2="-0.5" transform="matrix(-0.707107 0.707107 0.707107 0.707107 24 1)" stroke="black"/>
</svg></button> 
           {!editTask && <div><p>{task.description}</p><button className={style.button} onClick={() => {
                    setEditTask(!editTask)
                }}>edit</button></div>}
           {editTask && 
            <div>
                <input value={input} onChange={(e) => {
                    setInput(e.target.value);
                }}/> <button className={style.button} onClick={() => {
                    setEditTask(false); 
                    props.editDescription(task, task.status, input)
                }}>submit</button>
            </div>} 
                
        </div>
    )
}

export default Description