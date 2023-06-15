import React from 'react';
import { Todo, TaskListProps } from './todo';

const TaskList: React.FC<TaskListProps> = ({ todos }) => {

    const todoCompletedCount = todos.filter((todo) =>  todo.completed === true ).length;

    return (
        <div className="task-counter">
            <ul>
                <li>{`To Do: ${todos.length}`}</li>
                <li>{`Done: ${todoCompletedCount}`}</li>
            </ul>
        </div>
    );
};

export default TaskList;
