/* import React, { useState } from 'react'
import {GroupList} from './GroupList'
import { GroupID } from './GroupID'
import {v4 as uuidv4 } from 'uuid' 
uuidv4()

export const GroupListWrapper = () => {
    const [GroupListItems, setGroupListItems] = useState([])

    const addtoList = GroupListItem => {

        setGroupListItems([...GroupListItems, {id: uuidv4(), task: GroupListItem,
        completed: false, isEditing: false}])
    }
  return (
    <div className='GroupListWrapper'>
        <h1>Friends List</h1>
        <GroupList addtoList={addtoList}></GroupList>
        {GroupListItems.map((GroupListItem, index)=>(
            <GroupListItem task={GroupListItem} key={index}/> 
            ))}
        <GroupID></GroupID>


    </div>
  )
}
 */
import React, { useState } from "react";
import { FriendsList } from "./FriendsList";
import { FriendsForm } from "./FriendsForm";
import { v4 as uuidv4 } from "uuid";
import { FriendsListEdit } from "./FriendsFormEdit";

export const FriendsListWrapper = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  }

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  }

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done !</h1>
      <FriendsForm addTodo={addTodo} />
      {/* display todos */}
      {todos.map((todo) =>
        todo.isEditing ? (
          <FriendsListEdit editTodo={editTask} task={todo} />
        ) : (
          <FriendsList
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};