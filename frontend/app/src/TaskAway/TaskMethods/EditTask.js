// Module Imports
import React, { useState, useContext } from 'react';

// Relative imports
import {Context} from '../TodoContextMain';
import TaskAwayAPI from '../api/api';
import DeleteTask from './DeleteTask';

export default function EditTasks(props) {
	const [state, dispatch] = useContext(Context);
    const [isEditable, setIsEditable] = useState(false);

    const handleIsEditable = () => {
        setIsEditable(!isEditable);
    };

    const handleIsComplete = () => {
		dispatch({ type: 'SET_IS_COMPLETE', payload: !state.isComplete })
	};

    const handleUpdateTodo = () => {
        TaskAwayAPI.updateTask(props.task.task._id, state.title, state.desc, state.isComplete);
        handleIsEditable();

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

    return (
        <p>
            { (!isEditable)
                ?
                    <div>
                        <span style={{ fontWeight: 'bold' }}>
                            { props.task.task.title }
                        </span>
                        { props.task.task.description }
                        { props.task.task.completed ? "completed" : "not completed" }
                    </div>
                :
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
                // End-of-Ternary
            }

            <button 
                onClick={handleIsEditable}
                style={{ color: 'green'}}
            >
                Edit
            </button>

            <DeleteTask taskID={props.task.task._id} />
        </p>
    );
}