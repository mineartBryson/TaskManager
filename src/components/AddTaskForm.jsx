// AddTaskForm.jsx
// This view is rendered when the suer selects "Add New Task", it allows for them to create a new task to be tracked

import React, { useState } from "react";
import "../styles/AddTaskForm.css";

const AddTaskForm = ({ setShowForm, setTasks }) => {
    // Collecting the name, dscription, and due date
    const [taskName, setTaskName] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");

    // Called when the user selects submit
    const handleSubmit = (e) => {
        e.preventDefault();

        const newTask = { id: Date.now(), name: taskName, dueDate, description };
        setTasks((prevTasks) => [...prevTasks, newTask]);

        setShowForm(false);
    };

    return (
        <form className="add-task" onSubmit={handleSubmit}>
            <h1 className="add-task__title">Add Task</h1>

            <div className="add-task__group">
                <input 
                    type="text" 
                    className="add-task__input" 
                    placeholder="Task Name" 
                    value={taskName} 
                    onChange={(e) => setTaskName(e.target.value)} 
                />
            </div>

            <div className="add-task__group">
                <input 
                    type="text" 
                    className="add-task__input"
                    placeholder="Task Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                />
            </div>

            <div className="add-task__group">
                <input 
                    type="date" 
                    className="add-task__input add-task__input--date" 
                    value={dueDate} 
                    onChange={(e) => setDueDate(e.target.value)} 
                />
            </div>

            <div className="add-task__actions">
                <button type="submit" className="add-task__button add-task__button--save">Save Task</button>
                <button type="button" className="add-task__button add-task__button--cancel" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
        </form>
    );
};

export default AddTaskForm;
