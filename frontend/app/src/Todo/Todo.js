// Module Imports
import axios from 'axios';
import React, { useState, useContext } from 'react';

// Relative imports
import {Context} from '../TodoMain/TodoMain';

export default function Todo(props) {
	const [state, dispatch] = useContext(Context);
    const [isEditable, setIsEditable] = useState(false);

    const handleDeleteTodo = () => {
        axios.delete(`http://localhost:8000/api/todo/${props.todo.title}`)
            .then(response => console.log(response))
    };

    const handleIsEditable = () => {
        setIsEditable(!isEditable);
    };

    const handleUpdateTodo = () => {
        axios.put(`http://localhost:8000/api/todo/${props.todo.title}`, { 'title': state.title, 'description': state.desc })
            .then(res => {
                console.log(res.data);
            });
        setIsEditable(!isEditable);
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