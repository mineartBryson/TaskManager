import './App.css'
import TaskList from './components/TaskList'

function App() {
  return (
    <div>
    <div className="home_container">
      <header className="header-bar">
        <div className="header-content">
          <h1 className="title">Task Manager:</h1>
          <p className="subtitle">Stay organized and track your tasks easily.</p>
        </div>
      </header>

      {/* Wrapper to control spacing & height */}
      <div className="content-wrapper">
        <main>
          <TaskList />
        </main>
      </div>
    </div>
    <footer>
        <p>Made by Bryson Mineart</p>
    </footer>
    </div>
  );
}

export default App
