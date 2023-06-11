import React from 'react';
import { Todo, TaskListProps } from './todo';

const TaskList: React.FC<TaskListProps> = ({ todos }) => {

    const todoCompletedCount = todos.filter((todo) =>  todo.completed === true ).length;

    return (
        <div className="task-counter">
            <ul>
                <li>{`Tasks: ${todos.length}`}</li>
                <li>{`Completed: ${todoCompletedCount}`}</li>
            </ul>
        </div>
    );
};

export default TaskList;
