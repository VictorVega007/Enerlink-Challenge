import TodoList from "./components/TodoList";
import TodoResults from "./components/TodoResults";
import "./App.css";
import { TodoForm } from "components/TodoForm";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <div className="root">
      <TodoList />
      <TodoResults />
      <TodoForm/>
      <ToastContainer />
    </div>
    
  );
};

export default App;
