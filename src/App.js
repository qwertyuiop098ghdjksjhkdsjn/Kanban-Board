
import { useState } from 'react';
import './App.css';
import TaskBlock from "./components/TaskBlock/TaskBlock";
import TaskBlockWithSelect from './components/TaskBlockWithSelect/TaskBlockWithSelect';
import { Routes, Route } from 'react-router-dom';
import Description from './components/Description/Description';
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"

function setLocalStorage (taskArray, key) {
  localStorage.setItem(key, JSON.stringify(taskArray))  //JSON.stringify переводит массив в строку 
}

function getLocalStorage (key) {
  return JSON.parse(localStorage.getItem(key)
  || "[]");
}

function App() {
  const [backlog, setBacklog] = useState (getLocalStorage("backlog")) // здесь лежат все задачи 
  const [ready, setReady] = useState (getLocalStorage("ready")) //состояние для ready задач 
  const [inProgress, setInProgress] = useState (getLocalStorage("inProgress")) //состояние для inProgress задач
  const [finished, setFinished] = useState (getLocalStorage("finished")) //состояние для finished 


  //функция, которая позволяет редактировать задачу

  function editTaskDescription (list, newTask) {
    let newArray = list.filter((task) => {
      if(task.id !== newTask.id) {
        return true
      } else {
        return false 
      }
    })
    newArray.push(newTask);
    return newArray
  }

  function editTask (task, status, description) {
    let newTask = {...task, description: description} 
    if(status == "backlog") {
      let newBacklog = editTaskDescription(backlog, newTask);
      setBacklog(newBacklog);
      setLocalStorage(newBacklog, "backlog");
    } else if (status == "ready") {
      let newReady = editTaskDescription(ready, newTask);
      setReady(newReady);
      setLocalStorage(newReady, "ready");
    } else if (status == "inProgress") {
      let newInProgress = editTaskDescription(inProgress, newTask);
      setInProgress(newInProgress);
      setLocalStorage(newInProgress, "inProgress");
    } else if (status == "finished") {
      let newFinished = editTaskDescription(finished, newTask);
      setBacklog(newFinished);
      setLocalStorage(newFinished, "finished");
    }
  }


  function AddToReady (taskId) {               //функция, которая добавляет задачу в ready из backlog 
        let taskFound = backlog.find( (task) => {
        if(task.id == taskId) {
          return true 
        } else {
          return false 
        }
      })
      let newArray = AddTaskToList(ready, taskFound, "ready"); 
      setReady(newArray);
      let newBacklog = DeleteTaskFromList(backlog, taskId);
      setBacklog(newBacklog);
      setLocalStorage(newArray, "ready");
      setLocalStorage(newBacklog, "backlog");
  } 

  function addToProgress (taskId) {
    let taskFound = ready.find( (task) => {
      if(task.id == taskId) {
        return true
      } else {
        return false 
      }
    })
    let newArray = AddTaskToList(inProgress, taskFound, "inProgress");
    setInProgress(newArray);
    let newReady = DeleteTaskFromList(ready, taskId);
    setReady(newReady);
    setLocalStorage(newArray, "inProgress");
    setLocalStorage(newReady, "ready");
  } 

  function addToFinished (taskId) {
    let taskFound = inProgress.find( (task) => {
      if(task.id == taskId) {
        return true
      } else {
        return false 
      }
    })
    let newArray = AddTaskToList(finished, taskFound, "finished");
    setFinished(newArray);
    let newInProgress = DeleteTaskFromList(inProgress, taskId);
    setInProgress(newInProgress);
    setLocalStorage(newArray, "finished");
    setLocalStorage(newInProgress, "inProgress");
  } 


  function DeleteTaskFromList (list, ID) {    //функция, которая удаляет задачу (универсальная)
    let newArray =  list.filter( (task) => {
        if(task.id != ID) {
          return true
        } else {
          return false
        }
    })
    return newArray;
  }

  function AddTaskToList (list, newTask, status) {
    const newList = [...list, {...newTask, status: status}]
    return newList;
  }

  function addToBacklog (inputName) {   //в параметр передается valueOfInput (то, что находится в инпуте)
      const task = {id: Date.now(), description: "", name: inputName, status: "backlog"}
      let array = [...backlog, task]
      setBacklog([...backlog, task]) //возьмем прошлый backlog и новый baklog и задача task, которую создали на предыдущ строчки
      setLocalStorage(array, "backlog")
  }
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<div className='allTasks'>
          <TaskBlock data={backlog} addData={addToBacklog} title={"Backlog"}/>
          <TaskBlockWithSelect data={ready} list={backlog} title={"Ready"} onSelect={AddToReady}/>   {/* data - это готовые задачи, list - это все задачи */}
          <TaskBlockWithSelect data={inProgress} list={ready} title={"In Progress"} onSelect={addToProgress}/> 
          <TaskBlockWithSelect data={finished} list={inProgress} title={"Finished"} onSelect={addToFinished}/> 
          </div>}/>
        <Route path="taskPage/:id" element={<Description array={[...backlog,...ready,...inProgress,...finished]}  editDescription={editTask}/>}/>
      </Routes>
      <Footer taskBacklog={backlog.length} taskFinished={finished.length}/>
    </div>
   );
}

export default App;
