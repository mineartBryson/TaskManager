import React, { useState, useEffect } from "react";
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
    const [tasks, setTasks] = useState([
        { id: 1, name: "Finish project", dueDate: "2025-05-15", description: "Complete the final report and submit it." },
        { id: 2, name: "Grocery shopping", dueDate: "2025-05-16", description: "Buy essentials including vegetables and snacks." },
        { id: 3, name: "Workout session", dueDate: "2025-05-17", description: "Hit the gym for a strength training workout." },
        { id: 4, name: "Read a book", dueDate: "2025-05-18", description: "Finish reading 'Atomic Habits'." },
        { id: 5, name: "Call Mom", dueDate: "2025-05-19", description: "Catch up on family news and weekend plans." },
        { id: 6, name: "Pay bills", dueDate: "2025-05-20", description: "Complete monthly utility and credit card payments." },
        { id: 7, name: "Plan weekend trip", dueDate: "2025-05-21", description: "Book accommodations and finalize itinerary." },
        { id: 8, name: "Work on side project", dueDate: "2025-05-22", description: "Develop new features for the app idea." },
        { id: 9, name: "Attend team meeting", dueDate: "2025-05-23", description: "Discuss updates and goals for the upcoming sprint." },
        { id: 10, name: "Cook a new recipe", dueDate: "2025-05-24", description: "Try making homemade pasta from scratch." }
    ]);

    const [selectedTask, setSelectedTask] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showView, setShowView] = useState(false);
    const [sortOrder, setSortOrder] = useState("none");
    const [viewMode, setViewMode] = useState("list"); // Toggle state for list or calendar view

    const options = [
        { value: "asc", label: "Ascending" },
        { value: "desc", label: "Descending" },
        { value: "none", label: "No Sorting"}
    ];

    // Function for removing a task
    const deleteTask = (taskId) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    };

    // Function for sorting the tasks
    const getSortedTasks = () => {
        if (sortOrder === "none") return tasks;

        return [...tasks]
            .filter(task => task.dueDate)
            .sort((a, b) => {
                const dateA = new Date(a.dueDate);
                const dateB = new Date(b.dueDate);

                if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) return 0;

                return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
            });
    };

    return (
        <div className="task_container">
            {/* Controls Section - Toggle Button, Add Task, Sort Selector */}
            {(!showAddForm && !showEditForm) && (
                <div className="task_list_options">
                    <button className="task_button" onClick={() => setShowAddForm(!showAddForm)}>
                        <AddIcon /> Add New Task
                    </button>

                    <button className="toggle_button" onClick={() => setViewMode(viewMode === "list" ? "calendar" : "list")}>
                        {viewMode === "list" ? "Switch to Calendar View" : "Switch to List View"}
                    </button>

                    <Select 
                        placeholder="Sort"
                        className="task_selector"
                        options={options}
                        onChange={(selected) => setSortOrder(selected.value)}
                    />
                </div>
            )}

            {/* Conditional Rendering for List View & Calendar */}
            {viewMode === "list" ? (
                <>
                    {(!showAddForm && !showEditForm) && (
                        <ul className="task_list">
                            {getSortedTasks().map((task) => (
                            <li key={task.id} className="task_item">
                                <div className="task_content">
                                    <span className="task_title">{task.name}</span>
                                    <div className="task_due_container">
                                        <span className="task_due_label">Due:&nbsp;</span>
                                        <span className="task_due">
                                            {new Date(task.dueDate + "T00:00:00").toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric"
                                            })}
                                        </span>
                                    </div>
                                </div>

                                <div className="task_actions">
                                    <button className="task_button" onClick={() => { setSelectedTask(task); setShowView(!showView)}}><EditIcon /> View</button> 
                                    <button className="task_button" onClick={() => { setSelectedTask(task); setShowEditForm(!showEditForm);}}><EditIcon /> Edit</button>
                                    <button className="task_button" onClick={() => deleteTask(task.id)}><DeleteIcon /> Delete</button>
                                </div>
                            </li>
                            ))}
                        </ul>
                    )}

                    {showAddForm && (
                        <TaskForm setShowForm={setShowAddForm} setTasks={setTasks}/>
                    )}
                    {showEditForm && (
                        <EditTaskForm selectedTask={selectedTask} setShowEditForm={setShowEditForm} setTasks={setTasks}/>
                    )}
                    {showView && (
                        <TaskModal selectedTask={selectedTask} setShowView={setShowView} />
                    )}
                </>
            ) : (
                <Calendar 
                    value={new Date()}
                    tileContent={({ date }) => {
                        const taskForDate = tasks.find(task => new Date(task.dueDate).toDateString() === date.toDateString());
                        return taskForDate ? <p className="calendar_task">{taskForDate.name}</p> : null;
                    }}
                />
            )}
        </div>
    );
};

export default TaskList;
