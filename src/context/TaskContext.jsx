import React, { createContext, useState } from "react";

const baseURL = "http://localhost:6001"

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  return (
    <TaskContext.Provider value={{tasks, setTasks}}>
    {children}
    </TaskContext.Provider>
  );
}

export async function toggleComplete (id, completed) {
  if (id) {
    const url = `${baseURL}/tasks/${id}`
    const r = await fetch(url, {
      method: "PATCH",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({completed: completed}),
    });
    if (r.ok) {
      const data = await r.json();
      return data;
    }
    console.log(`PATCH request failed at ${ url }. Response: ${ r.status } `);
    return null;
  }
}

export async function addTask (newTask){
  if (newTask) {
    const url = `${baseURL}/tasks`;
    const r = await fetch(url, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newTask),
    });
    if (r.ok) {
      const data = await r.json();
      return data;
    }
    console.log(`POST request failed at ${ url }. Response: ${ r.status }`)
    return null;
  }
}