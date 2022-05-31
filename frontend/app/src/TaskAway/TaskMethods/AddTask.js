// Module Imports
import React, { useContext } from 'react';

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
	};

	const handleIsTaskComplete = () => {
		dispatch({ type: 'SET_IS_TASK_COMPLETE', payload: !state.isTaskComplete })
	};

	return (
		<div className="AddTask">
			<p>Add Todo</p>
			<input 
				onChange={(event) => dispatch({ type: 'SET_TITLE', payload: event.target.value })}
				value={state.title}
                placeholder='Title'
			/>
			<input 
				onChange={(event) => dispatch({ type: 'SET_DESCRIPTION', payload: event.target.value })}
                value={state.desc}
				placeholder='Description'
			/>
			<label>
				Completed
				<input
					onClick={handleIsTaskComplete}
					value={state.isTaskComplete}
					type={'checkbox'}
				/>
			</label>
			<button onClick={handleAddTodo}>
				Add
			</button>
		</div>
	);
}

export default TodoAdd;