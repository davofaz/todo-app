import React from 'react';

interface Todo {
    id: string;
    text: string;
    completed: boolean;
    priority: boolean;
}
interface TaskListProps {
    todos: Todo[];
}

const TaskList: React.FC<TaskListProps> = ({ todos }) => {
    return (
        <div className="task-counter">
            <ul>
                <li>{`Tasks: ${todos.length}`}</li>
                <li>Completed:</li>
            </ul>
        </div>
    );
};

export default TaskList;
