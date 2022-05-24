// Module Imports
import React, { useEffect, useContext } from 'react';

// Relative Imports
import Todo from '../Todo/Todo';
import {Context} from '../TodoMain/TodoMain';

// Style Imports
import '../App.css';


const TodoListView = () => {
	const [state, dispatch] = useContext(Context);
    
    let tasks = <p>Loading...</p>;

    if (state.error) {
        let tasks = <p>Something went wrong: <span>{ state.error }</span></p>;
    };

    if (!state.error && state.todoList) {
        tasks = state.todoList.map(task => {
            return <Todo todo={task} />;
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