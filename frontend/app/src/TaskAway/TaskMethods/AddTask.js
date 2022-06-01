// Module Imports
import React, { useContext } from 'react';

// Relative Imports
import { Context } from '../TaskContextMain';
import TaskAwayAPI from '../api/api';
import { Button, Checkbox, Input, message } from 'antd';

// Style Imports
import '../../App.css';

const TodoAdd = () => {
	const [state, dispatch] = useContext(Context);

	const { TextArea } = Input;

	const handleAddTodo = () => {
		TaskAwayAPI.createTask(state.title, state.desc, state.isTaskComplete);

        dispatch({ type: 'SET_TITLE', payload: '', });
        dispatch({ type: 'SET_DESCRIPTION', payload: '', });
        dispatch({ type: 'SET_IS_TASK_COMPLETE', payload: false, });

		message.success('Task created!');
	};

	const handleIsTaskComplete = () => {
		dispatch({ type: 'SET_IS_TASK_COMPLETE', payload: !state.isTaskComplete })
	};

	return (
		<div className="AddTask">
			<div>
				<h3>Add Todo</h3>
				<Input 
					onChange={(event) => dispatch({ type: 'SET_TITLE', payload: event.target.value })}
					value={state.title}
					placeholder='Title'
				/>
				<TextArea
					rows={3} 
					onChange={(event) => dispatch({ type: 'SET_DESCRIPTION', payload: event.target.value })}
					value={state.desc}
					placeholder='Description'
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