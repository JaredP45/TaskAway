// Module Imports
import axios from 'axios';
import React, { useState } from 'react';

export default function Todo(props) {
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');
    const [isEditable, setIsEditable] = useState(false);

    const handleDeleteTodo = (title) => {
        axios.delete(`http://localhost:8000/api/todo/${title}`)
            .then(res => console.log(res))
    };

    const handleEditTodo = () => {
        setIsEditable(!isEditable);
    };

    const handleUpdateTodo = () => {
        axios.put(`http://localhost:8000/api/todo/${title}`, {'title': title, 'description': desc})
            .then(res => console.log(res))
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
                                    onChange={(event) => setTitle(event.target.value)}
                                    placeholder='Title'
                                />
                                <input 
                                    onChange={event => setDesc(event.target.value)} 
                                    placeholder='Description'
                                />
                                <button 
                                    onClick={() => handleUpdateTodo(props.todo.title)}
                                    style={{ color: 'blue'}}
                                >
                                    Edit
                                </button>
                            </div>
                    }

                    <button 
                        onClick={handleEditTodo}
                        style={{ color: 'green'}}
                    >
                        Edit
                    </button>

                    <button 
                        onClick={() => handleDeleteTodo(props.todo.title)}
                        style={{ color: 'red'}}
                    >
                        Delete
                    </button>
                </p>
            </div>
        </div>
    );
}