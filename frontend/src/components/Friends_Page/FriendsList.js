/* import React from 'react'
import {useState} from 'react'

export const GroupList = ({addtoList} ) =>{
 
  const [value, setValue] = useState("")
 
  const handleSubmit = e => {
          e.preventDefault();
          addtoList(value);
          setValue("")
  }
  return (
    <div className='ListGroups'>
    <form className='JoinGroup' onSubmit={handleSubmit}>
      <input type='text' className="GroupID"placeholder='Enter Group ID'
      value = {value} onChange={(e)=> setValue(e.target.variable)}></input>
      <button type='submit' className='GroupIDbutton'>Join Group</button>
    


    </form>
    </div>
  )
}
 */

import React from 'react'
import Delete from"./Friends_Page_Images/trash-2-svgrepo-com.svg"
import Edit from "./Friends_Page_Images/edit-3-svgrepo-com.svg"

export const FriendsList = ({task, deleteTodo, editTodo, toggleComplete}) => {
  return (
    <div className="Todo">
        <p className={`${task.completed ? "completed" : "incompleted"}`} onClick={() => toggleComplete(task.id)}>{task.task}</p>
        <div>
        <img src = {Edit} className="edit-icon" icon={Edit} onClick={() => editTodo(task.id)} />
        <img src = {Delete} className="delete-icon" icon={Delete} onClick={() => deleteTodo(task.id)} />
        </div>
    </div>
  )
}