import React, { useState, useId, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { addTask } from "../context/TaskContext";

function TaskForm() {
  const {tasks, setTasks} = useContext(TaskContext);
  const [taskName, setTaskName] = useState("");
  const [taskCompletion, setTaskCompletion] = useState(false);
  const inputId = useId();

  function handleSubmit(e) {
    e.preventDefault();
    if (taskName.trim() === "") return;
    let newTask = {
      title: taskName,
      completed: taskCompletion
    }
    addTask(newTask);
    setTasks(prevTasks => [...prevTasks, newTask]);
    setTaskName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>New Task:</label>
      <input
        id={inputId}
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Add a new task..."
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;