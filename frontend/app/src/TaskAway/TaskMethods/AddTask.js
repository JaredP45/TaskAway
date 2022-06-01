// Module Imports
import React, { useContext } from 'react';
import Alert from '@mui/material/Alert';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// Relative Imports
import { Context } from '../TaskContextMain';
import TaskAwayAPI from '../api/api';

// Style Imports
import '../../App.css';

const TodoAdd = () => {
	const [state, dispatch] = useContext(Context);

	const handleAddTodo = () => {
		TaskAwayAPI.createTask(state.title, state.desc, state.isTaskComplete);

        dispatch({ type: 'SET_TITLE', payload: '', });
        dispatch({ type: 'SET_DESCRIPTION', payload: '', });
        dispatch({ type: 'SET_IS_TASK_COMPLETE', payload: false, });

		return (
			<Alert onClose={() => {}}>Task Created!</Alert>
		);
	};

	const handleIsTaskComplete = () => {
		dispatch({ type: 'SET_IS_TASK_COMPLETE', payload: !state.isTaskComplete })
	};

	return (
		<div className="AddTask">
			<div>
				<h3>Add Todo</h3>
				<TextField 
					variant="outlined"
					onChange={(event) => dispatch({ type: 'SET_TITLE', payload: event.target.value })}
					value={state.title}
					placeholder="Title"
				/>
				<TextField
					maxRow={3}
					multiline
					variant="outlined"
					onChange={(event) => dispatch({ type: 'SET_DESCRIPTION', payload: event.target.value })}
					value={state.desc}
					placeholder="Description"
				/>
				<label>
					<small>Completed</small>
					<Checkbox 
						onChange={handleIsTaskComplete}
						defaultChecked={state.isTaskComplete}
					/>
				</label>
				<Button onClick={handleAddTodo}>
					Add
				</Button>
			</div>
		</div>
	);
}

export default TodoAdd;