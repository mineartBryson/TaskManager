// TaskList.jsx
// This is the primary tas view that the user will see as they add, modify, or delete tasks from their list.

import React, { useState } from "react";
import TaskForm from "./AddTaskForm";
import EditTaskForm from "./EditTaskForm";
import "../styles/TaskList.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import TaskModal from "./TaskModal";
import Select from "react-select";
import Calendar from "react-calendar";

const TaskList = () => {
    // Pre-populated a few tasks
    const [tasks, setTasks] = useState([
        { id: 1, name: "Finish project", dueDate: "2025-05-15", description: "Complete the final report and submit it." },
        { id: 2, name: "Grocery shopping", dueDate: "2025-05-16", description: "Buy essentials including vegetables and snacks." },
        { id: 3, name: "Workout session", dueDate: "2025-05-17", description: "Hit the gym for a strength training workout." },
    ]);

    const [selectedTask, setSelectedTask] = useState(null); // Allows us to track which tasks the user is individually looking at
    const [showAddForm, setShowAddForm] = useState(false); // Lets us conditionally render the add task form
    const [showEditForm, setShowEditForm] = useState(false); // Used for conditional rendering
    const [showView, setShowView] = useState(false); // Primary view
    const [sortOrder, setSortOrder] = useState("none"); // Allows for sorting via task due dates
    const [viewMode, setViewMode] = useState("list"); // Change the view mode between a list and a calendar

    // List for tracking the different sorting options that a user may have. Used in the Selector below
    const options = [
        { value: "asc", label: "Ascending" },
        { value: "desc", label: "Descending" },
        { value: "none", label: "No Sorting"}
    ];

    // When a user wants to delete a specific task
    const deleteTask = (taskId) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    };

    // This sorts the tasks. We maintain the original list while creating a new sorted list
    const getSortedTasks = () => {
        if (sortOrder === "none") return tasks;

        return [...tasks]
            .filter(task => task.dueDate)
            .sort((a, b) => {
                const dateA = new Date(a.dueDate);
                const dateB = new Date(b.dueDate);
                return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
            });
    };

    return (
        // These are the button options that the user has - Add, change view mode, and sort. 
        <div className="task-list">
            {!showAddForm && !showEditForm && (
                <div className="task-list__options">
                    <button className="task-list__button" onClick={() => setShowAddForm(!showAddForm)}>
                        <AddIcon /> Add New Task
                    </button>

                    <button className="task-list__toggle" onClick={() => setViewMode(viewMode === "list" ? "calendar" : "list")}>
                        {viewMode === "list" ? "Switch to Calendar View" : "Switch to List View"}
                    </button>

                    <Select 
                        placeholder="Sort"
                        className="task-list__selector"
                        options={options}
                        onChange={(selected) => setSortOrder(selected.value)}
                    />
                </div>
            )}
            {/* If the view mode is list then we show a list */}
            {viewMode === "list" ? (
                <>
                    {!showAddForm && !showEditForm && (
                        <ul className="task-list__items">
                            {getSortedTasks().map((task) => (
                                <li key={task.id} className="task-list__item">
                                    <div className="task-list__content">
                                        <span className="task-list__title">{task.name}</span>
                                        <div className="task-list__due">
                                            <span className="task-list__due-label">Due:&nbsp;</span>
                                            <span className="task-list__due-date">
                                                {new Date(task.dueDate + "T00:00:00").toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric"
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                    {/* Individual task options - View, Edit, and Delete */}
                                    <div className="task-list__actions">
                                        <button className="task-list__button" onClick={() => { setSelectedTask(task); setShowView(!showView)}}>
                                            <EditIcon /> View
                                        </button> 
                                        <button className="task-list__button" onClick={() => { setSelectedTask(task); setShowEditForm(!showEditForm);}}>
                                            <EditIcon /> Edit
                                        </button>
                                        <button className="task-list__button task-list__button--delete" onClick={() => deleteTask(task.id)}>
                                            <DeleteIcon /> Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                    {/* Conditional rendering based on buttons clicked */}
                    {showAddForm && <TaskForm setShowForm={setShowAddForm} setTasks={setTasks} />}
                    {showEditForm && <EditTaskForm selectedTask={selectedTask} setShowEditForm={setShowEditForm} setTasks={setTasks} />}
                    {showView && <TaskModal selectedTask={selectedTask} setShowView={setShowView} />}
                </>
            ) : (
                <Calendar 
                    value={new Date()}
                    tileContent={({ date }) => {
                        const taskForDate = tasks.find(task => new Date(task.dueDate).toDateString() === date.toDateString());
                        return taskForDate ? <p className="task-list__calendar-task">{taskForDate.name}</p> : null;
                    }}
                />
            )}
        </div>
    );
};

export default TaskList;

