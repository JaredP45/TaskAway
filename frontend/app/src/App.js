// Module Imports
import React from 'react';

// Relative Imports
import TodoMain from './TaskAway/TodoMain';
import TodoListView from './TaskAway/TodoListView/TodoListView';
import TodoAdd from './TaskAway/TodoAdd/TodoAdd';


// Style Imports

const App = () => {
	return (
		<TodoMain>
			<TodoListView />
			<TodoAdd />
		</TodoMain>
	);
}

export default App;
