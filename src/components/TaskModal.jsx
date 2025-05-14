import React, { useState, useEffect } from "react";
import "../styles/TaskModal.css";

const TaskModal = ({ selectedTask, setShowView }) => {

    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.key === "Escape") {
                setShowView(false); // Close modal on Esc key
            }
        };

        document.addEventListener("keydown", handleEscapeKey);
        return () => document.removeEventListener("keydown", handleEscapeKey);
    }, [setShowView]);

    if (!selectedTask) return null;

    return (
        <div className="modal-overlay" onClick={() => setShowView(false)}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <h1 className="modal-title">Task Details</h1>

                <div>
                    <p className="task-name">Title:&nbsp;{selectedTask.name}</p>
                </div>

                <div>
                    <p className="task-description">Description:&nbsp;{selectedTask.description}</p>
                </div>

                <div>
                    <p className="due-date">Due Date:&nbsp;{selectedTask.dueDate}</p>
                </div>

                <div className="button-group">
                    <button type="button" className="close-btn" onClick={() => setShowView(false)}>Close</button>
                </div>
            </div>
        </div>
    );

}

export default TaskModal;