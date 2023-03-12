import { toggleCompleteAsync, deleteTodoAsync } from "../../redux/todoSlice";
import { useDispatch } from "react-redux";
import "./styles.css";

const TodoListItem = ({ id, checked, label }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTodoAsync({ id }));
  };

  const toggleCheck = () => {
    dispatch(toggleCompleteAsync({ id, checked: !checked }));
  };
  
  return (
  <div className={"todo-list-item"}>
    <div
      tabIndex="0"
      role="checkbox"
      aria-checked
      className="todo-list-item-content"
    >
      <input
        tabIndex="-1"
        type="checkbox"
        checked={checked}
        onChange={toggleCheck}
      />
      <span className={checked ? "todo-list-item-checked" : ""}>{label}</span>
    </div>
    <button type="button" className="todo-list-item-delete" onClick={handleDelete}>
      x
    </button>
  </div>
)};

export default TodoListItem;
