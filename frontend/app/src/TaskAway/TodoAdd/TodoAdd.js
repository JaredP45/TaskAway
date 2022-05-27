// Module Imports
import React, { useEffect, useContext } from 'react';

// Relative Imports
import { Context } from '../TodoMain';
import TaskAwayAPI from '../api/api';

// Style Imports
import '../../App.css';

const TodoAdd = () => {
	const [state, dispatch] = useContext(Context);

	useEffect(() => {
		TaskAwayAPI.retrieveTask().then(response => {
			dispatch({ type: 'SET_TODOLIST', payload: response.data });
		});
	}, [dispatch, state.todoList]);

	const handleAddTodo = () => {
		TaskAwayAPI.createTask(state.title, state.desc);

        dispatch({ 
            type: 'SET_TITLE', 
            payload: '',        
        });
        dispatch({ 
            type: 'SET_DESCRIPTION', 
            payload: '',        
        });
	};

	return (
		<div className="App">
			<p>Add Todo</p>
			<input 
				onChange={(event) => dispatch({ type: 'SET_TITLE', payload: event.target.value })}
				value={state.title}
                placeholder='Title'
			/>
			<input 
				onChange={event => dispatch({ type: 'SET_DESCRIPTION', payload: event.target.value })}
                value={state.desc}
				placeholder='Description'
			/>
			<button onClick={handleAddTodo}>
				Add
			</button>
		</div>
	);
}

export default TodoAdd;