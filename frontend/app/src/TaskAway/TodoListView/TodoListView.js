// Module Imports
import React, { useContext } from 'react';

// Relative Imports
import TodoItem from '../TodoItem/TodoItem';
import { Context } from '../TodoMain';

// Style Imports
import '../../App.css';


const TodoListView = () => {
	const [state, ] = useContext(Context);
    
    let tasks = <p>Loading...</p>;

    if (state.error) {
        tasks = <p>Something went wrong: <span>{ state.error }</span></p>;
    };

    if (!state.error && state.todoList) {
        tasks = state.todoList.map(task => {
            return <TodoItem todo={task} />;
        });
    };
    
    return (
        <div className="App">
		    <h1>TaskAway</h1>
            <ul>
                { tasks }
            </ul>
        </div>
    );
};

export default TodoListView;