import type { TodoTypes } from './todo';
const LOCAL_STORAGE_KEY = 'todos';

const TodoService = {

    //GET TODO list from the local storage
    getTodos:():TodoTypes[]=>{
        const localstr = localStorage.getItem(LOCAL_STORAGE_KEY)
        return localstr ? JSON.parse(localstr):[];
    },
    //This function add todo item in the local storage
    addTodos:(item:string):TodoTypes =>{
        const todos = TodoService.getTodos();
        const newTodo = { id:todos.length +1, text:item,completed:false}
        const updatedTodos=[...todos,newTodo];
        localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(updatedTodos))
        return newTodo
    },

    //updating the todos
    updateTodo:(todo:TodoTypes):TodoTypes =>{
        const todos = TodoService.getTodos();
        const updatedTodos = todos.map((t)=> (t.id === todo.id ? todo : t)) 
        localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(updatedTodos));
        return todo;
    },
    //!Deleting  the To do
    deleteTodo:(id:number):void =>{
    const todos = TodoService.getTodos();
    const filtered = todos.filter(t => t.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(filtered));
    }



}
export default TodoService