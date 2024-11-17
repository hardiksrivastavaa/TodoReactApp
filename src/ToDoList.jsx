import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

import "./TodoList.css";

export default function TodoList() {
  let [todos, setTodos] = useState([
    { task: "sample task", id: uuidv4(), isDone: false, isEditing: false },
  ]);
  let [newTodo, setNewTodo] = useState("");

  let addNewTask = () => {
    if (newTodo == "") {
      alert("Enter task first!!");
    } else {
      setTodos([
        ...todos,
        { task: newTodo, id: uuidv4(), isDone: false, isEditing: false },
      ]);
      setNewTodo(""); // Clear input after adding a task
    }
  };

  let updateTodoValue = (event) => {
    setNewTodo(event.target.value);
  };

  let deleteTodoValue = (id) => {
    setTodos((prevTodos) =>
      prevTodos.filter((prevTodos) => prevTodos.id != id)
    );
  };

  let upparCaseAll = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        return {
          ...todo,
          task:
            todo.task === todo.task.toUpperCase()
              ? todo.task.toLowerCase()
              : todo.task.toUpperCase(),
        };
      })
    );
  };

  let upparCaseOne = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id == id) {
          return {
            ...todo,
            // Toggle the case: if the task is in uppercase, revert it; else, make it uppercase
            task:
              todo.task === todo.task.toUpperCase()
                ? todo.task.toLowerCase()
                : todo.task.toUpperCase(),
          };
        } else {
          return todo;
        }
      })
    );
  };

  let markAsDone = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id == id) {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        } else {
          return todo;
        }
      })
    );
  };

  let markAllAsDone = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      })
    );
  };

  // Edit task function
  let editTask = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isEditing: !todo.isEditing }; // Toggle editing mode
        } else {
          return todo;
        }
      })
    );
  };

  // Save edited task
  let saveEdit = (id, newTask) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, task: newTask, isEditing: false }; // Save new task and disable editing mode
        } else {
          return todo;
        }
      })
    );
  };

  // Update task while editing
  let handleEditChange = (id, event) => {
    const newTask = event.target.value;
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, task: newTask }; // Temporarily update the task value while editing
        } else {
          return todo;
        }
      })
    );
  };

  return (
    <div className="TodoList">
      <h1
        style={{
          textAlign: "center",
          color: "white",
          textShadow: "3px 3px 6px black",
        }}
      >
        ToDo App : React
      </h1>

      <div className="addTask">
        <input
          id="taskInput"
          type="text"
          placeholder="Enter Task Name"
          value={newTodo}
          onChange={updateTodoValue}
        />

        <button onClick={addNewTask}>Add Task</button>
      </div>

      <ol className="olList">
        {todos.map((todo) => (
          <li key={todo.id} className="listItem">
            {todo.isEditing ? (
              <input
                type="text"
                className="isEditing"
                value={todo.task}
                onChange={(event) => handleEditChange(todo.id, event)} // Handle task change while editing
                onBlur={() => saveEdit(todo.id, todo.task)} // Save the task when focus is lost
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    saveEdit(todo.id, todo.task); // Save the task on "Enter"
                  }
                }}
                autoFocus
              />
            ) : (
              <span className={todo.isDone ? "completed" : ""}>
                {todo.task}
              </span>
            )}

            <div className="btns">
              <button className="btn" onClick={() => upparCaseOne(todo.id)}>
                <i className="fa-solid fa-font"></i>
              </button>

              <button className="btn" onClick={() => deleteTodoValue(todo.id)}>
                <i className="fa-solid fa-trash"></i>
              </button>

              <button className="btn" onClick={() => editTask(todo.id)}>
                <i className="fa-solid fa-edit"></i>
              </button>

              <button className="check-btn" onClick={() => markAsDone(todo.id)}>
                <i
                  className={
                    todo.isDone
                      ? "fa-solid fa-square-check"
                      : "fa-regular fa-square"
                  }
                  style={todo.isDone ? { color: "green" } : {}}
                ></i>
              </button>
            </div>
          </li>
        ))}
      </ol>

      <div style={{ display: "flex", gap: 10 }}>
        <button className="all" onClick={upparCaseAll}>
          Upparcase All
        </button>
        <button className="all" onClick={markAllAsDone}>
          Mark All as Done
        </button>
      </div>
    </div>
  );
}
