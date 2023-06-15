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

        <header className="App-header">
            <h1>My Tasks</h1>
            <DateDisplay />
            <div className="header-utils">
                <TaskList todos={todos} />
                <WeatherWidget />
            </div>
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
        </header>

    )
}

export default Header;