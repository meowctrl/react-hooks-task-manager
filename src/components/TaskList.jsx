import React, { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import { toggleComplete } from "../context/TaskContext";

function TaskList({query}) {
    const {tasks, setTasks} = useContext(TaskContext);
    const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(query.toLowerCase())
  );

function handleCompletedBtn(task) {
  if (!task || !task.id) return;
  const newCompleted = !task.completed;
  toggleComplete(task.id, newCompleted)
    .then((data) => {
      if (data) {
        setTasks((tasks) =>
          tasks.map((t) => (t.id === task.id ? data : t))
        );
      } else {
        console.log("PATCH failed or returned null for task id:", task.id);
      }
    })
    .catch((err) => console.error(err));
}

  return (
    <ul>
      {filteredTasks.map((task) => (
        <li key={task.id}>
          <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
            {task.title}
          </span>
          <button data-testid={task.id} onClick={() => handleCompletedBtn(task)}>
            {task.completed ? "Undo" : "Complete"}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;