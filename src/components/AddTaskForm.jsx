import React, { useState } from "react";
import "../styles/AddTaskForm.css";

const AddTaskForm = ({  setShowForm, setTasks }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    const newTask = { id: Date.now(), name: taskName, dueDate, description };
    setTasks((prevTasks) => [...prevTasks, newTask]); // Add new task

    setShowForm(false); // Hide form after submission
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <h1 className="add-title">Add Task</h1>
      <div className="form-group">
        <input 
          type="text" 
          className="task-input" 
          placeholder="Task Name" 
          value={taskName} 
          onChange={(e) => setTaskName(e.target.value)} 
        />
      </div>

      <div className="form-group">
        <input 
          type="text" 
          className="task-input"
          placeholder="Task Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          />
      </div>

      <div className="form-group">
        <input 
          type="date" 
          className="date-input" 
          value={dueDate} 
          onChange={(e) => setDueDate(e.target.value)} 
        />
      </div>

      <div className="button-group">
        <button type="submit" className="save-task-btn">Save Task</button>
        <button type="button" className="cancel-task-btn" onClick={() => setShowForm(false)}>Cancel</button>
      </div>
    </form>
  );
};

export default AddTaskForm;