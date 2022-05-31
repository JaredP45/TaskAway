// Module Imports
import React, { useEffect, useContext } from 'react';

// Relative Imports
import { Context } from '../TodoContextMain';
import TaskAwayAPI from '../api/api';

// Style Imports
import '../../App.css';

const GetTasks = () =>{
	const [state, dispatch] = useContext(Context);

	useEffect(() => {
		const fetchAllTasks = () => {
			TaskAwayAPI.retrieveTask().then(response => {
				dispatch({ type: 'SET_TODOLIST', payload: response.data });
			});
		}	

		const interval = setInterval(fetchAllTasks, 1000)

		return () => {
			clearInterval(interval)
		}

	}, [dispatch, state.todoList]);
}

export default GetTasks;