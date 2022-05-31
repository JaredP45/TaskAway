// Module Imports
import React, { useContext } from 'react';

// Relative Imports
import TaskItem from '../Task/TaskItem';
import AddTask from '../TaskMethods/AddTask';
import GetTasks from '../TaskMethods/GetTasks';
import { Context } from '../TodoContextMain';

// Style Imports
import '../../App.css';


const TodoListView = () => {
	const [state, ] = useContext(Context);

    GetTasks();
    
    let tasks = <p>Loading...</p>;

    if (state.error) {
        tasks = <p>Something went wrong: <span>{ state.error }</span></p>;
    };

    if (!state.error && state.todoList) {
        tasks = state.todoList.map(task => {
            return <TaskItem task={task} />;
        });
    };
    
    return (
        <div style={{ display: 'flex', justifyContent: 'center'}}>
            <div className="TaskListView" style={{ width: '500px' }}>
                <h1>TaskAway</h1>
                <ul>
                    { tasks }
                </ul>
                <AddTask />
            </div>
        </div>
    );
};

export default TodoListView;