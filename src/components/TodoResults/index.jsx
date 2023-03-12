import { useSelector } from "react-redux";
import "./styles.css";

const TodoResults = () => {
  const todos = useSelector(state => 
    state.todos.filter(todo => todo.checked === true)
  );

  return (
    <div className="todo-results">Done: {todos.length}</div>
  );
};

export default TodoResults;
