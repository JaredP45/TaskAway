// Module Imports
import React, { useState, useContext } from 'react';

// Relative imports
import { Context } from '../TodoMain';
import TaskAwayAPI from '../api/api';

export default function Todo(props) {
	const [state, dispatch] = useContext(Context);
    const [isEditable, setIsEditable] = useState(false);

    const handleDeleteTodo = () => {
        TaskAwayAPI.deleteTask(props.todo.title);
    };

    const handleIsEditable = () => {
        setIsEditable(!isEditable);
    };

    const handleUpdateTodo = () => {
        TaskAwayAPI.updateTask(state.title, state.desc);
        handleIsEditable();

        dispatch({ 
            type: 'SET_TITLE', 
            payload: '',        
        });
        dispatch({ 
            type: 'SET_DESCRIPTION', 
            payload: '',        
        });
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center'}}>
            <div style={{ width: '500px' }}>
                <p>
                    { (!isEditable)
                        ?
                            <div>
                                <span style={{ fontWeight: 'bold' }}>
                                    { props.todo.title }
                                </span>
                                { props.todo.description }
                            </div>
                        :
                            <div>
                                <input 
                                    onChange={(event) => dispatch({ type: 'SET_TITLE', payload: event.target.value })}
                                    value={state.title}
                                    placeholder={props.todo.title}
                                />
                                <input 
                                    onChange={event => dispatch({ type: 'SET_DESCRIPTION', payload: event.target.value })}
                                    value={state.desc}
                                    placeholder={props.todo.description}
                                />
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

                    <button 
                        onClick={() => handleDeleteTodo()}
                        style={{ color: 'red'}}
                    >
                        Delete
                    </button>
                </p>
            </div>
        </div>
    );
}