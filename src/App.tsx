import React, { useEffect, useState } from 'react';
import { FiXCircle, FiCheckCircle } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import GroupSelector from './components/GroupSelector';
import Header from './components/Header';
import Instructions from './components/Instructions';
import { Todo } from './components/todo'


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
            selectedColor: '',
            backgroundColor: ''
        };

        setTodos((prevTodos) => [todo, ...prevTodos]);
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
            selectedColor: '',
            backgroundColor: '',
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

    const handleColorSelect = (id: string, color: string) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        selectedColor: color,
                        backgroundColor: color,
                    };
                }
                return todo;
            })
        );
    };

    const parseTodoText = (text: string, textColor: string) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const parts = text.split(urlRegex);

        //console.log('Todo Parts:', parts);

        return parts.map((part, index) => {
            if (part.match(urlRegex)) {
                //console.log('URL:', part);
                return (
                    <a className={`todo-link-button ${textColor}`}
                        key={index}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                    >{part}                        
                    </a>
                );
            } else {
                //console.log('Text:', part);
                return <span key={index}>{part}</span>;
            }
        });
    };

    return (
        <div className="App">
            <Header
                todos={todos}
                handleFormSubmit={handleFormSubmit}
                newTodo={newTodo}
                setNewTodo={setNewTodo}

            />
            <main className="App-main">
                {todos.length < 1 ? (
                    <Instructions />
                    ) :  (
                    <ul className="todo-list">
                            {todos.map((todo, index) => {
                                const isWhiteBackgroundColor = todo.backgroundColor === 'white' || todo.backgroundColor === '';
                                const textColor = isWhiteBackgroundColor ? 'black' : 'white';
                                
                                return (

                                    <li
                                        key={todo.id}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, todo.id)}
                                        onDragOver={handleDragOver}
                                        onDrop={(e) => handleDrop(e, todo.id)}
                                        style={{ backgroundColor: todo.backgroundColor }}
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
                                                <div
                                                    className={`todo-text ${todo.completed ? 'completed' : ''} ${textColor}`}
                                                    onClick={() => toggleTodoCompletion(todo.id)}
                                                    onDoubleClick={() => handleTodoEdit(todo.id, todo.text)}
                                                    >
                                                        {parseTodoText(todo.text, textColor)}
                                                </div>
                                                <div className="todo-icons">
                                                    <FiXCircle
                                                        className={`delete-icon ${textColor}`}
                                                        onClick={() => deleteTodo(todo.id)}
                                                    />
                                                    <FiCheckCircle
                                                        className={`completed-icon ${textColor} ${todo.completed ? 'green' : ''}`}
                                                        onClick={() => toggleTodoCompletion(todo.id)}
                                                    />
                                                    <GroupSelector
                                                        todoId={todo.id}
                                                        selectedColor={todo.selectedColor}
                                                        handleColorSelect={handleColorSelect}
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </li>
                                );
                            })}
                    </ul>
                  )}
            </main>
        </div>
    );
};

export default App;
