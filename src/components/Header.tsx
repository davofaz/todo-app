import React from 'react';
import TaskList from './TaskList';
import DateDisplay from './DateDisplay'; 

interface Todo {
    id: string;
    text: string;
    completed: boolean;
    priority: boolean;

}

type HeaderProps = {
    todos: Todo[];
    handleFormSubmit: (e: React.FormEvent) => void;
    newTodo: string;
    setNewTodo: React.Dispatch<React.SetStateAction<string>>;
}

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
            <TaskList todos={todos} />
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