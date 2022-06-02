// Module Imports
import { useEffect, useContext } from 'react';

// Relative Imports
import { Context } from '../GlobalContext/TaskContextMain';
import TaskAwayAPI from '../api/api';

// Style Imports
import '../../App.css';

const GetTasks = () =>{
	const [state, dispatch] = useContext(Context);

	useEffect(() => {
		const fetchAllTasks = () => {
			TaskAwayAPI.retrieveTask().then(response => {
                dispatch({ type: 'SET_IS_TASK_LOADING', payload: false });
				dispatch({ type: 'SET_TASKLIST', payload: response.data });
			});
		}	

		const interval = setInterval(fetchAllTasks, 1000)

		return () => {
			clearInterval(interval)
		}

	}, [dispatch, state.taskList]);
}

export default GetTasks;