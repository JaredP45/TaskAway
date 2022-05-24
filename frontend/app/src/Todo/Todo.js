// Module Imports
import axios from 'axios';
import React, { useState } from 'react';

export default function Todo(props) {
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');
    const [isEditable, setIsEditable] = useState(false);

    const handleDeleteTodo = () => {
        axios.delete(`http://localhost:8000/api/todo/${props.todo.title}`)
            .then(res => console.log(res))
    };

    const handleEditTodo = () => {
        setIsEditable(!isEditable);
    };

    const handleUpdateTodo = () => {
        axios.put(`http://localhost:8000/api/todo/${props.todo.title}`, { 'title': title, 'description': desc })
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
                                    onChange={(event) => setTitle(event.target.value)}
                                    value={title}
                                    placeholder={ props.todo.title }
                                />
                                <input 
                                    onChange={event => setDesc(event.target.value)}
                                    value={desc}
                                    placeholder={ props.todo.description }
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
                        onClick={handleEditTodo}
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