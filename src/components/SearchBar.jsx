import React, { useRef, useState, useContext, useEffect } from "react";
import TaskList from "./TaskList";
import { TaskContext } from "../context/TaskContext";

function SearchBar() {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  function handleSearch(e) {
    setQuery(e.target.value);
  }

  useEffect(() => {
    inputRef.current.focus();
  })

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search tasks..."
        value={query}
        onChange={handleSearch}
      />
      <TaskList query={query}/>
    </div>
  );
}

export default SearchBar;