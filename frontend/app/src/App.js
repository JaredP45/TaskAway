// Module Imports
import React from 'react';

// Relative Imports
import TodoContextMain from './TaskAway/TodoContextMain';
import TaskListView from './TaskAway/TaskListView/TaskListView';


// Style Imports

const App = () => {
	return (
		<TodoContextMain>
			<TaskListView />
		</TodoContextMain>
	);
}

export default App;
