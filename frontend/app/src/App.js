// Module Imports
import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

// Relative Imports
import TodoListView from './TodoListView/TodoListView';

// Style Imports
import './App.css';

function App() {
	const [todoList, setTodoList] = useState([{}]);
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');

	useEffect(() => {
		axios.get('http://localhost:8000/api/todo/')
			.then(res => {
				setTodoList(res.data)
			})
	});

	const handleAddTodo = () => {
		axios.post('http://localhost:8000/api/todo/', { 'title': title, 'description': desc })
			.then(res => console.log(res))
	};

	return (
		<div className="App">
			<h1>TaskAway</h1>
			<TodoListView todoList={todoList} />

			<p>Add Todo</p>
			<input 
				onChange={(event) => setTitle(event.target.value)}
				placeholder='Title'
			/>
			<input 
				onChange={event => setDesc(event.target.value)} 
				placeholder='Description'
			/>
			<button onClick={handleAddTodo}>
				Add
			</button>
		</div>
	);
}

export default App;
