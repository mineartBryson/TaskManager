// App.jsx
// Primary container for the task manager application.

import './App.css';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="app">
      <div className="app__container">
        <header className="app__header">
          <div className="app__header-content">
            <h1 className="app__title">Task Manager:</h1>
            <p className="app__subtitle">Stay organized and track your tasks easily.</p>
          </div>
        </header>

        {/* Wrapper to control spacing & height */}
        <div className="app__content">
          <main>
            {/* Holds the list of tasks and items that the user has added to complete */}
            <TaskList />
          </main>
        </div>
      </div>
      <footer className="app__footer">
        <p className="app__footer-text">Made by Bryson Mineart</p>
      </footer>
    </div>
  );
}

export default App;
