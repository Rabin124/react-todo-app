import type { TodoTypes } from "./todo";

const LOCAL_STORAGE_KEY = "todos";

const TodoService = {
  // Get Todos
  getTodos: (): TodoTypes[] => {
    const todoStr = localStorage.getItem(LOCAL_STORAGE_KEY);
    return todoStr ? JSON.parse(todoStr) : [];
  },

    // Adding Todos
    addTodo: (text: string): TodoTypes => {
      const todos = TodoService.getTodos();
      const newTodo: TodoTypes = {
        id: todos.length + 1,
        text,
        completed: false
      };

      const updatedTodos = [...todos, newTodo];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
      return newTodo;
    },
    
    // UPDATING THE TODO
    updatedTodo:(todo:TodoTypes):TodoTypes =>{
      const todos = TodoService.getTodos();
      
      const updatedTodos= todos.map((t)=>(t.id === todo.id ? todo : t));
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
      return todo;
    },
    //!Deleting the todo
    deleteTodo:(id:number):void =>{
      const todos = TodoService.getTodos();
      const updatedTodos = todos.filter((todo)=> todo.id !==id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos))
    }
  }
export default TodoService;