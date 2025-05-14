import React, { useState, useEffect } from "react";
import "../styles/EditTaskForm.css";

const EditTaskForm = ( { selectedTask, setShowEditForm, setTasks}) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Use useEffect to update state when task changes
    useEffect(() => {
        if (selectedTask) {
            setTaskName(selectedTask.name);
            setDescription(selectedTask.description);

            // Convert "Month Day" format into "YYYY-MM-DD"
            if (selectedTask.dueDate) {
                const formattedDate = new Date(selectedTask.dueDate).toISOString().split("T")[0]; 
                setDueDate(formattedDate);
            } else {
                setDueDate(""); // Ensure no default "00"
            }
        }
    }, [selectedTask]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    setTasks((prevTasks) =>
        prevTasks.map((t) =>
        t.id === selectedTask.id ? { ...t, name: taskName, dueDate, description } : t
        )
    )
    setShowEditForm(false); // Hide form after submission
  };

  return (
    <form className="edit-task-form" onSubmit={handleSubmit}>
      <h1 className="edit-title">Edit Task</h1>
      
      <div className="form-group">
        <input 
          type="text" 
          className="task-input" 
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
        <button type="button" className="cancel-task-btn" onClick={() => setShowEditForm(false)}>Cancel</button>
      </div>
    </form>
  );
};

export default EditTaskForm;