import React, { useEffect, useState } from 'react';
import { FiXCircle, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

type Todo = {
    id: string;
    text: string;
    completed: boolean;
    priority: boolean;
};

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState('');
    const [editedTodo, setEditedTodo] = useState<Todo | null>(null);

    useEffect(() => {
        const storedTodos = localStorage.getItem('todo-list');
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
    }, []);

    useEffect(() => {
        if (todos.length > 0) {
            localStorage.setItem('todo-list', JSON.stringify(todos));
        }
    }, [todos]);

    const addTodo = () => {
        if (newTodo.trim() === '') return;

        const todo: Todo = {
            id: uuidv4(),
            text: newTodo,
            completed: false,
            priority: false,
        };

        setTodos((prevTodos) => [...prevTodos, todo]);
        setNewTodo('');
    };

    const deleteTodo = (id: string) => {
        setTodos(todos.filter((todo) => todo.id !== id));

        if (todos.length === 1) {

            localStorage.removeItem('todo-list');
        }

    };

    const toggleTodoCompletion = (id: string) => {
        setTodos(
            todos.map((todo) => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        completed: !todo.completed,
                    };
                }
                return todo;
            })
        );
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addTodo();
    };

    const handleTodoEdit = (id: string, text: string) => {
        setEditedTodo({
            id: id,
            text: text,
            completed: false,
            priority: false,
        });
    };

    const handleTodoUpdate = (id: string, newText: string) => {
        setTodos(
            todos.map((todo) => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        text: newText,
                    };
                }
                return todo;
            })
        );
        setEditedTodo(null);
    };

    const handleDragStart = (e: React.DragEvent<HTMLLIElement>, id: string) => {
        e.dataTransfer.setData('text/plain', id);
    };

    const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLLIElement>, targetId: string) => {
        e.preventDefault();

        const draggedId = e.dataTransfer.getData('text/plain');
        const draggedIndex = todos.findIndex((todo) => todo.id === draggedId);
        const targetIndex = todos.findIndex((todo) => todo.id === targetId);

        const updatedTodos = [...todos];
        [updatedTodos[draggedIndex], updatedTodos[targetIndex]] = [
            updatedTodos[targetIndex],
            updatedTodos[draggedIndex],
        ];

        setTodos(updatedTodos);
    };

    const handlePriorityToggle = (id: string) => {
        setTodos(
            todos.map((todo) => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        priority: !todo.priority,
                    };
                }
                return todo;
            })
        );
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>My Tasks</h1>
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
            <main className="App-main">
                <ul className="todo-list">
                    {todos.map((todo, index) => (
                        <li
                            key={todo.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, todo.id)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, todo.id)}
                            className={`${todo.priority ? 'todo-high-priority' : 'todo-low-priority' }`}
                        >
                            {editedTodo && editedTodo.id === todo.id ? (
                                <input
                                    type="text"
                                    value={editedTodo.text}
                                    onChange={(e) =>
                                        setEditedTodo({
                                            ...editedTodo,
                                            text: e.target.value,
                                        })
                                    }
                                    onBlur={() => handleTodoUpdate(editedTodo.id, editedTodo.text)}
                                />
                            ) : (
                                <>
                                    <span
                                            className={`todo-text ${todo.priority ? 'white' : ''} ${todo.completed ? 'completed' : ''}`}
                                        onClick={() => toggleTodoCompletion(todo.id)}
                                        onDoubleClick={() => handleTodoEdit(todo.id, todo.text)}
                                    >
                                       {todo.text}
                                    </span>
                                        <FiXCircle
                                            className={`delete-icon ${todo.priority ? 'white' : ''}`}
                                        onClick={() => deleteTodo(todo.id)}
                                        />
                                        <FiAlertCircle
                                            className={`priority-icon ${todo.priority ? 'white' : ''}`}
                                            onClick={() => handlePriorityToggle(todo.id)}
                                        />
                                        <FiCheckCircle
                                            className={`completed-icon ${todo.completed ? 'green' : ''}`}
                                            onClick={() => toggleTodoCompletion(todo.id)}
                                        />
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
};

export default App;
