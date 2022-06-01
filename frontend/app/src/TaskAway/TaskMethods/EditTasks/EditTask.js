// Module Imports
import React, { useContext } from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

// Relative imports
import {Context} from '../../TaskContextMain';
import DeleteTask from './DeleteTask';
import UpdateTask from './UpdateTask';


export default function EditTasks({ task }) {
	const [state, dispatch] = useContext(Context);

    const handleIsTaskComplete = () => {
		dispatch({ type: 'SET_IS_TASK_COMPLETE', payload: !state.isTaskComplete })
	};

    const handleTaskFieldChange = (taskValue, stateValue) => {
        if (stateValue !== '') {
            return stateValue;
        } else {
            return taskValue;
        }        
    };

    // FIXME isTaskComplete is not tracking same boolean state as task.task.completed
    // FIXME handle default values for fields
    
    return (
        <div className="EditTask">
            <div>
                <label>
                    <small>Completed</small>
                    <Checkbox 
                        onChange={handleIsTaskComplete}
                        defaultChecked={task.task.completed ? !state.isTaskComplete : state.isTaskComplete}
                    />
                </label>
                
                <div>
                    <TextField 
                        variant="outlined"
                        onChange={(event) => dispatch({ type: 'SET_TITLE', payload: event.target.value })}
                        value={handleTaskFieldChange(task.task.title, state.title)}
                    />
                    <TextField
                        maxRow={3}
                        multiline
                        variant="outlined"
                        onChange={event => dispatch({ type: 'SET_DESCRIPTION', payload: event.target.value })}
                        value={handleTaskFieldChange(task.task.description, state.desc)}
                    />
                    <UpdateTask taskID={task.task._id} />
                    <DeleteTask taskID={task.task._id} />
                </div>
            </div>
        </div>
    );
}