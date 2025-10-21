import React,{ type Dispatch, type SetStateAction,useState} from 'react'
import TodoService from '../TodoService'
import {type TodoTypes } from '../todo'
import '../css/TodoForm.css'
interface TodoFormProps
{
    setTodos : Dispatch<SetStateAction<TodoTypes[]>>
}
const TodoForm: React.FC<TodoFormProps> = ({setTodos }) => {
      const [newTodoText,setNewTodoText] = useState<string>("");
        const handleAddTodo = () =>{
        if(newTodoText.trim()!== "")
        {
            const newTodo = TodoService.addTodos(newTodoText);
            setTodos((preTodo)=>[...preTodo,newTodo])
            setNewTodoText("");
        }

    }
  
    return (<div className="inputForm">
        <input type="text" value={newTodoText} onChange={(e)=>setNewTodoText(e.target.value)}
        autoFocus={true}
        placeholder='add to do here'
        ></input>
        <button onClick={handleAddTodo}>Add Todo</button>

    </div>)
}
export default TodoForm
