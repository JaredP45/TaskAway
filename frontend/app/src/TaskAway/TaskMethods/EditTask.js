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
        TaskAwayAPI.updateTask(props._id, state.title, state.desc, state.isComplete);
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
        <div className="EditTask" style={{ display: 'flex', justifyContent: 'center'}}>
            <div style={{ width: '500px' }}>
                <p>
                    { (!isEditable)
                        ?
                            <div>
                                <span style={{ fontWeight: 'bold' }}>
                                    { props.task.title }
                                </span>
                                { props.task.description }
                                { props.task.completed ? "completed" : "not completed" }
                            </div>
                        :
                            <div>
                                <input 
                                    onChange={(event) => dispatch({ type: 'SET_TITLE', payload: event.target.value })}
                                    value={state.title}
                                    placeholder={props.task.title}
                                />
                                <input 
                                    onChange={event => dispatch({ type: 'SET_DESCRIPTION', payload: event.target.value })}
                                    value={state.desc}
                                    placeholder={props.task.description}
                                />
                                <label>
                                    Completed
                                    <input 
                                        onClick={handleIsComplete}
                                        value={props.task.completed}
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

                    <DeleteTask taskID={props.task.id} />
                </p>
            </div>
        </div>
    );
}