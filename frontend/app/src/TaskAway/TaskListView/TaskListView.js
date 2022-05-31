// Module Imports
import React, { useContext } from 'react';

// Relative Imports
import TaskItem from '../TaskItem/TaskItem';
import AddTask from '../TaskMethods/AddTask';
import GetTasks from '../TaskMethods/GetTasks';
import { Context } from '../TaskContextMain';

// Style Imports
import '../../App.css';


const TodoListView = () => {
	const [state, ] = useContext(Context);

    GetTasks();
    let tasks = [{}];

    if (state.isLoading) {
        tasks = <p>Loading...</p>;
    };

    if (state.error) {
        tasks = <p>Something went wrong: <span>{ state.error }</span></p>;
    };

    if (!state.isLoading && !state.error && state.taskList) {
        tasks = state.taskList.map((task, index )=> {
            return <TaskItem task={task} key={index} />;
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