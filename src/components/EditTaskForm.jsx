import React, { useState, useEffect } from "react";
import "../styles/EditTaskForm.css";

const EditTaskForm = ({ selectedTask, setShowEditForm, setTasks }) => {
    const [taskName, setTaskName] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");

    useEffect(() => {
        if (selectedTask) {
            setTaskName(selectedTask.name);
            setDescription(selectedTask.description);

            if (selectedTask.dueDate) {
                const formattedDate = new Date(selectedTask.dueDate).toISOString().split("T")[0]; 
                setDueDate(formattedDate);
            } else {
                setDueDate(""); 
            }
        }
    }, [selectedTask]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setTasks((prevTasks) =>
            prevTasks.map((t) =>
                t.id === selectedTask.id ? { ...t, name: taskName, dueDate, description } : t
            )
        );
        setShowEditForm(false);
    };

    return (
        <form className="edit-task" onSubmit={handleSubmit}>
            <h1 className="edit-task__title">Edit Task</h1>

            <div className="edit-task__group">
                <input 
                    type="text" 
                    className="edit-task__input" 
                    value={taskName} 
                    onChange={(e) => setTaskName(e.target.value)} 
                />
            </div>

            <div className="edit-task__group">
                <input 
                    type="text" 
                    className="edit-task__input"
                    placeholder="Task Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                />
            </div>

            <div className="edit-task__group">
                <input 
                    type="date" 
                    className="edit-task__input edit-task__input--date" 
                    value={dueDate} 
                    onChange={(e) => setDueDate(e.target.value)} 
                />
            </div>

            <div className="edit-task__actions">
                <button type="submit" className="edit-task__button edit-task__button--save">Save Task</button>
                <button type="button" className="edit-task__button edit-task__button--cancel" onClick={() => setShowEditForm(false)}>Cancel</button>
            </div>
        </form>
    );
};

export default EditTaskForm;
