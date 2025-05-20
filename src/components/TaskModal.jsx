// TaskModal.jsx
// This is the modal view that ppears whenever a user clicks "view" on a selected task. Shows all of the information for that task.
import React, { useEffect } from "react";
import "../styles/TaskModal.css";

const TaskModal = ({ selectedTask, setShowView }) => {
    
    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.key === "Escape") {
                setShowView(false);
            }
        };

        document.addEventListener("keydown", handleEscapeKey);
        return () => document.removeEventListener("keydown", handleEscapeKey);
    }, [setShowView]);

    if (!selectedTask) return null;

    return (
        <div className="task-modal__overlay" onClick={() => setShowView(false)}>
            <div className="task-modal__container" onClick={(e) => e.stopPropagation()}>
                <h1 className="task-modal__title">Task Details</h1>

                <div className="task-modal__content">
                    <p className="task-modal__name">Title: {selectedTask.name}</p>
                    <p className="task-modal__description">Description: {selectedTask.description}</p>
                    <p className="task-modal__due-date">Due Date: {selectedTask.dueDate}</p>
                </div>

                <div className="task-modal__actions">
                    <button 
                        type="button" 
                        className="task-modal__button task-modal__button--close" 
                        onClick={() => setShowView(false)}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TaskModal;


