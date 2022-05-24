// Module Imports
import React from 'react';

// Relative Imports
import TodoMain from './TodoMain/TodoMain';
import TodoListView from './TodoListView/TodoListView';
import TodoAdd from './TodoAdd/TodoAdd';


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
