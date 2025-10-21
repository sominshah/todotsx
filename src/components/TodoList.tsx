import {useState} from 'react'
import type { TodoTypes } from '../todo'
import TodoService from '../TodoService'
import { FaCheck, FaEdit } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import TodoForm from './TodoForm';
import '../css/TodoList.css'
function TodoList() 
{
    const [todos,setTodos] = useState<TodoTypes []>(TodoService.getTodos());
    const [editingToDoId,setEditingToId] = useState<number | null> (null);
    const [editingToDoText,setEditingToText] = useState <string>("");

    // function for handling edit actions
    const handleEditStart = (id:number,text:string)=>{
        setEditingToId(id)
        setEditingToText(text);

    }
    const handleEditCancel = ()=>
    {
        setEditingToId(null);
        setEditingToText("")
    }
    const handleEditSave = (id:number)=>{
        if(editingToDoText.trim()!=='')
        {
            const updateTodo = TodoService.updateTodo({
                id,
                text:editingToDoText,
                completed:false
            });
            setTodos((preTodos)=> preTodos.map((todo)=> todo.id ===id ? updateTodo:todo))
            setEditingToId(null)
            setEditingToText("")
        }

    }

    const handleDeleteTodo = (id:number) => {
        TodoService.deleteTodo(id);
        setTodos((prevTodo)=>prevTodo.filter((todo)=>todo.id!==id))
    }


      return <div className="todoContainer">
        <div>

    <TodoForm setTodos = {setTodos}></TodoForm>

        </div>
        {
            todos.map((todo)=>(

                <div className="items" key={todo.id}>

                {editingToDoId == todo.id ? (
                    <div className='editText'>
    <input type="text" value={editingToDoText} onChange={(e)=>setEditingToText(e.target.value)} autoFocus={true}>
    </input>
    <button onClick={()=>handleEditSave(todo.id)}> <FaCheck></FaCheck> </button>
    <button className="cancelBtn" onClick={()=>handleEditCancel}> <GiCancel></GiCancel> </button>

                    </div>
                ): (
                    <div className="editBtn">
                            <span>{todo.text}</span>
                            <button  onClick={()=>handleEditStart(todo.id,todo.text)}><FaEdit></FaEdit></button>

                    </div>
                
                )}

                <button onClick={()=>handleDeleteTodo(todo.id)}>
                    <RiDeleteBin5Fill></RiDeleteBin5Fill>

                </button>
                </div>
            ))}
                
        </div>
  
};


export default TodoList