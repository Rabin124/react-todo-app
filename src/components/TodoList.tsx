import React, { useState } from 'react'
import type { TodoTypes } from '../todo'
import TodoService from '../TodoService'
import { FaEdit, FaCheck } from 'react-icons/fa'
import { GiCancel } from 'react-icons/gi'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import TodoForm from './TodoForm'
import "../css/TodoList.css"
const TodoList = () => {

  const [todos, setTodos] = useState<TodoTypes[]>(TodoService.getTodos());
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editedTodoText, setEditedTodoText] = useState<string>("")

  // function for handling edit Actions
  const handleEditStart = (id: number, text: string) => {
    setEditingTodoId(id);
    setEditedTodoText(text);
  }
  const handleEditCancel = () => {
    setEditingTodoId(null);
    setEditedTodoText("");
  }

  const handleEditSave = (id: number) => {
    if (editedTodoText.trim() !== '') {
      const updatedTodo = TodoService.updatedTodo({
        id,
        text: editedTodoText,
        completed: false
      });
      setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo)));

      setEditingTodoId(null)
      setEditedTodoText("");
    }
  };

  // function to delete todo
  const handleDeleteTodo = (id: number) => {
    TodoService.deleteTodo(id);
    setTodos((prevTodo) => prevTodo.filter((todo) => todo.id !== id))
  }
  return (
    <div className='todoContainer'>
      <div className="
      ">
        <TodoForm setTodos = {setTodos}/>
      </div>
      <div className='todos'> 
        {/* Todo input from component goes here */}
        {todos.map((todo) => (
          <div className="items" key={todo.id}>
            {editingTodoId == todo.id ? (
              <div className='editedText'>
                <input type='text' value={editedTodoText} onChange={(e) => setEditedTodoText(e.target.value)} autoFocus={true} />
                <button onClick={() => handleEditSave(todo.id)}>

                  <FaCheck />
                </button>
                <button className='cancelBtn' onClick={() => handleEditCancel()}>
                  <GiCancel />
                </button>
              </div>
            ) : (
              <div className="editBtn">
                <span>{todo.text}</span>
                <button onClick={() => handleEditStart(todo.id, todo.text)}>
                  <FaEdit />

                </button>
              </div>

            )}
            <button onClick={()=>handleDeleteTodo(todo.id)}>

              <RiDeleteBin5Fill />
            </button>
          </div>
        ))}
      </div>

    </div>
  )
}

export default TodoList