import React from 'react';
import TaskList from './TaskList';
import DateDisplay from './DateDisplay';
import { HeaderProps } from './todo'
import WeatherWidget from './WeatherWidget';


const Header: React.FC<HeaderProps> = ({
    todos,
    handleFormSubmit,
    newTodo,
    setNewTodo

}) => {

    return (
        <>
            <header className="App-header">
                <div className="header-left-column">
                    <h1 className="header-title">MY TASKS</h1>
                    <TaskList todos={todos} />
                </div>
                <div className="header-right-column">
                    <WeatherWidget />
                    <DateDisplay />
                </div>
            
            </header>
            <div className="add-entry">
                <form onSubmit={handleFormSubmit}>
                    <div className="todo-container">
                        <input
                            type="text"
                            placeholder="Add a new todo"
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                            maxLength={112}
                        />
                        <button type="submit">Add</button>
                    </div>
                    </form>
                </div>
        </>
    )
}

export default Header;