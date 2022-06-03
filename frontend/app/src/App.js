// Module Imports
import React from 'react';

// Relative Imports
import TaskContextMain from './TaskAway/GlobalContext/TaskContextMain';
import TaskListView from './TaskAway/TaskListView/TaskListView';


// Style Imports

const App = () => {
	return (
		<TaskContextMain>
			<TaskListView />
		</TaskContextMain>
	);
}

export default App;
