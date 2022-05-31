// Module Imports
import React, { useContext } from 'react';

// Relative Imports
import { Context } from '../TodoContextMain';
import TaskAwayAPI from '../api/api';

// Style Imports
import '../../App.css';

const TodoAdd = () => {
	const [state, dispatch] = useContext(Context);

	const handleAddTodo = () => {
		TaskAwayAPI.createTask(state.title, state.desc, state.isComplete);

        dispatch(
			{ 
				type: 'SET_TITLE', 
				payload: '',
			},
			{ 
				type: 'SET_DESCRIPTION', 
				payload: '',
			},
			{ 
				type: 'SET_IS_COMPLETE', 
				payload: false,
			}
		);
	};

	const handleIsComplete = () => {
		dispatch({ type: 'SET_IS_COMPLETE', payload: !state.isComplete })
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
				onChange={event => dispatch({ type: 'SET_DESCRIPTION', payload: event.target.value })}
                value={state.desc}
				placeholder='Description'
			/>
			<label>
				Completed
				<input
					onClick={handleIsComplete}
					value={state.isComplete}
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