import style from "./Header.module.css"
import profile from "../../image/user-avatar.svg"
import arrowDown from "../../image/Vector (6).svg"
import arrowUp from "../../image/Vector (7).svg"
import { useState } from "react"

function  Header () {
    const [arrow, setArrow] = useState (false); //состояние для стрелки 

    return (
        <div className={style.header}>
            <h1 className={style.headline}>Awesome Kanban Board</h1>
            <div className={style.container} onClick={() => {
                setArrow(!arrow) //выключатель 
            }}>

                <img className={style.profile} src={profile}/>
              {!arrow  && <img src={arrowDown}/>}  {/*изначально arrow = false, !arrow = true. && возвращает первый false или последний true (этот случай)*/}
              {arrow && <img src={arrowUp}/>}
              
              {arrow && <div className={style.menu}>
                <div>Profile</div>
                <div>Log Out</div>
              </div>}
            </div>
        </div>
    )
}

export default Header