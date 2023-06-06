import React, { useEffect, useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import './App.css';


//let myuuid = uuidv4();



type Todo = {
    id: string;
    text: string;
    completed: boolean;
    priority: number;
};

const App: React.FC = () => {


    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        const storedTodos = localStorage.getItem('todo-list');
        //console.log(localStorage);
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos))
        }
    }, [])

    useEffect(() => {
        if (todos.length > 0) {
        localStorage.setItem('todo-list', JSON.stringify(todos))}
        //console.log(localStorage);
    }, [todos]);


    const addTodo = (priority: number) => {
        if (newTodo.trim() === '') return;

        const maxPriority = todos.length > 0 ? Math.max(...todos.map(todo => todo.priority)) : -1;
        const nextPriority = maxPriority + 1;


        const todo: Todo = {
            id: uuidv4(),
            text: newTodo,
            completed: false,
            priority: nextPriority,
        };

        setTodos((prevTodos) => [...prevTodos, todo]);
        setNewTodo('');
    }

    const deleteTodo = (id: string) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    const toggleTodoCompletion = (id: string) => {
        setTodos(
            todos.map((todo) => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        completed: !todo.completed,
                    }
                }
                return todo
            })
        )
    }

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevents the default form submission behaviour
        addTodo(1); // Call the addTodo function to add the new todo
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

        // Find the index of the dragged todo
        const draggedIndex = todos.findIndex((todo) => todo.id === draggedId);

        // Find the index of the target todo
        const targetIndex = todos.findIndex((todo) => todo.id === targetId);

        // Swap the todos in the array
        const updatedTodos = [...todos];
        [updatedTodos[draggedIndex], updatedTodos[targetIndex]] = [updatedTodos[targetIndex], updatedTodos[draggedIndex],
        ];

        setTodos(updatedTodos);

    }

    return (
        <div className="App">
            <h1>Todo App</h1>
            <form onSubmit={handleFormSubmit}>
                <div className="todo-container">
                    <input
                        type="text"
                        placeholder="Add a new todo"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                    />
                    <button type="submit">Add</button>
                </div>
            </form>
            <ul className="todo-list">
                {todos.map((todo, index) => (
                    <li key={todo.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, todo.id)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, todo.id)}
                    >
                        <span
                            className={`todo-text ${todo.completed ? 'completed' : ''}`}
                            onClick={() => toggleTodoCompletion(todo.id)}   

                        >
                            {todo.text}
                        </span>
                        <FiTrash className="delete-icon" onClick={() => deleteTodo(todo.id)} />
                    </li>       
                ))}
            </ul>
        </div>
    )
}

export default App;