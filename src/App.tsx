import React, { useEffect, useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import './App.css';


let myuuid = uuidv4();



type Todo = {
    id: string;
    text: string;
    completed: boolean;
};

const App: React.FC = () => {

    useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        console.log(storedTodos);
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])


    const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

    const addTodo = () => {
        if (newTodo.trim() === '') return;


        const todo: Todo = {
            id: uuidv4(),
            text: newTodo,
            completed: false,
        };

        setTodos([...todos, todo]);
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
                        completed: !todo.completed
                    }
                }
                return todo
            })
        )
    }

    return (
        <div className="App">
            <h1>Todo App</h1>
            <div className="todo-container">
                <input
                    type="text"
                    placeholder="Add a new todo"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button onClick={addTodo}>Add</button>
            </div>
            <ul className="todo-list">
                {todos.map((todo) => (
                    <li key={todo.id}>
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