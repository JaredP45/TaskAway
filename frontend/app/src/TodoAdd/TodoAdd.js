// Module Imports
import axios from 'axios';
import React, {useEffect, useContext} from 'react';

// Relative Imports
import {Context} from '../TodoMain/TodoMain';

// Style Imports
import '../App.css';

const TodoAdd = () => {
	const [state, dispatch] = useContext(Context);

	useEffect(() => {
		axios.get('http://localhost:8000/api/todo/')
			.then(response => {
                dispatch({ type: 'SET_TODOLIST', payload: response.data });
			})
	});

	const handleAddTodo = () => {
		axios.post('http://localhost:8000/api/todo/', { 'title': state.title, 'description': state.desc })
			.then(response => console.log(response))
	};

	return (
		<div className="App">
			<p>Add Todo</p>
			<input 
				onChange={(event) => dispatch({ type: 'SET_TITLE', payload: event.target.value })}
				placeholder='Title'
			/>
			<input 
				onChange={event => dispatch({ type: 'SET_DESCRIPTION', payload: event.target.value })} 
				placeholder='Description'
			/>
			<button onClick={handleAddTodo}>
				Add
			</button>
		</div>
	);
}


export default TodoAdd;