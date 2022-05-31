// Module Imports
import React, { useContext } from 'react';

// Relative imports
import {Context} from '../TaskContextMain';
import TaskAwayAPI from '../api/api';

export default function EditTasks(props) {
	const [state, dispatch] = useContext(Context);

    const handleIsComplete = () => {
		dispatch({ type: 'SET_IS_COMPLETE', payload: !state.isComplete })
	};

    const handleUpdateTodo = () => {
        TaskAwayAPI.updateTask(props.task.task._id, state.title, state.desc, state.isComplete);
            
        dispatch(
			{ 
				type: 'SET_TITLE', 
				payload: '',        
			}
        );
        dispatch (
			{ 
				type: 'SET_DESCRIPTION', 
				payload: '',        
			}
        );
        dispatch (
			{ 
				type: 'SET_IS_COMPLETE', 
				payload: false,        
			}
		);
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
                        onClick={handleIsComplete}
                        value={props.task.task.completed}
                        type={'checkbox'}
                    />
                </label>
                <button 
                    onClick={() => handleUpdateTodo()}
                    style={{ color: 'blue'}}
                >
                    Update
                </button>
            </div>
        </div>
    );
}