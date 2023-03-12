import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getTodosAsync = createAsyncThunk(
  "todos/getTodoAsync",
  async () => {
    const resp = await fetch(
      "https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos"
    );
    if (resp.ok) {
      const todos = await resp.json();
      return { todos };
    }

    if (!resp.ok) {
      toast.error("Error getting the data");
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async (payload) => {
    const resp = await fetch(
      "https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: nanoid(),
          label: payload.label,
          checked: payload.checked,
        }),
      }
    );

    if (resp.ok) {
      const todo = await resp.json();
      return { todo };
    } else {
      toast.error("It was a error adding task to list");
    }
  }
);

export const toggleCompleteAsync = createAsyncThunk(
  "todos/completeToAsync",
  async (payload) => {
    const resp = await fetch(
      `https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos/${payload.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ checked: payload.checked }),
      }
    );

    if (resp.ok) {
      const todo = await resp.json();
      return { todo };
    } else {
      toast.error("It was an error updating the tasks list");
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodoAsync",
  async (payload) => {
    const resp = await fetch(
      `https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos/${payload.id}`,
      {
        method: "DELETE",
      }
    );

    if (resp.ok) {
      return { id: payload.id };
    } else {
      toast.error("Error deleting task, please check the id of the task");
    }
  }
);

export const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        label: action.payload.label,
        checked: false,
      };
      state.push(todo);
    },
    toggleComplete: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getTodosAsync.fulfilled, (state, action) => {
        return action.payload.todos;
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.push(action.payload.todo);
      })
      .addCase(toggleCompleteAsync.fulfilled, (state, action) => {
        const index = state.findIndex(
          (todo) => todo.id === action.payload.todo.id
        );
        state[index].checked = action.payload.todo.checked;
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        return state.filter((todo) => todo.id !== action.payload.id);
      });
  },
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
