import { useEffect } from "react";  
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getTodosAsync } from "../../redux/todoSlice";
import TodoListItem from "../TodoListItem/index";
import "./styles.css";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(getTodosAsync())
  }, [dispatch]);

  return (
    <div className="todo-list">
      <span className="todo-list-title">Things to do:</span>
      <div className="todo-list-content">
      {(todos.length === 0) ? 
      <div className="no-todos">
        Looks like you&apos;re absolutely free today!
      </div> 
       :
      todos.map((todo) => (
				<TodoListItem key={todo.label} id={todo.id} label={todo.label} checked={todo.checked}/>
			))}
      </div>
     
    </div>
  );
};

export default TodoList;
