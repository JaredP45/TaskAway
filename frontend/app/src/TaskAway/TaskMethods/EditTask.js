// Module Imports
import React, { useContext } from 'react';

// Relative imports
import {Context} from '../TaskContextMain';
import TaskAwayAPI from '../api/api';

export default function EditTasks(props) {
	const [state, dispatch] = useContext(Context);

    const handleIsTaskComplete = () => {
		dispatch({ type: 'SET_IS_TASK_COMPLETE', payload: !state.isTaskComplete })
	};

    const handleUpdateTask = () => {
        TaskAwayAPI.updateTask(props.task.task._id, state.title, state.desc, state.isTaskComplete);
            
        dispatch({ type: 'SET_TITLE', payload: '', });
        dispatch({ type: 'SET_DESCRIPTION', payload: '', });
        dispatch({ type: 'SET_IS_TASK_COMPLETE', payload: false, });
        dispatch({ type: 'SET_IS_TASK_EDITABLE', payload: false, });
    };
    
    return (
        <div className="EditTask">
            <div>
                <input 
                    onChange={(event) => dispatch({ type: 'SET_TITLE', payload: event.target.value })}
                    value={state.title}
                    placeholder={props.task.task.title}
                />
                <input 
                    onChange={event => dispatch({ type: 'SET_DESCRIPTION', payload: event.target.value })}
                    value={state.desc}
                    placeholder={props.task.task.description}
                />
                <label>
                    Completed
                    <input 
                        onClick={handleIsTaskComplete}
                        value={props.task.task.completed}
                        type={'checkbox'}
                    />
                </label>
                <button 
                    onClick={() => handleUpdateTask()}
                    style={{ color: 'blue'}}
                >
                    Update
                </button>
            </div>
        </div>
    );
}