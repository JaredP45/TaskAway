// Module Imports
import React, { useContext } from 'react';

// Relative imports
import {Context} from '../TaskContextMain';
import EditTask from '../TaskMethods/EditTask';
import DeleteTask from '../TaskMethods/DeleteTask';

export default function TaskItem(props) {
	const [state, dispatch] = useContext(Context);

    const handleIsEditable = () => {
        dispatch({ type: 'SET_IS_TASK_EDITABLE', payload: !state.isTaskEditable })
    };
    
    return (
        <div className="TaskItem">
            { (!state.isTaskEditable)
                ?
                    <div>
                        <span style={{ fontWeight: 'bold' }}>
                            { props.task.title }
                        </span>
                        { props.task.description }
                        { props.task.completed ? "completed" : "not completed" }
                    </div>
                :

                    <EditTask task={props} />
                // End-of-Ternary
            }
            <button 
                onClick={handleIsEditable}
                style={{ color: 'green'}}
            >
                Edit
            </button>

            <DeleteTask taskToDelete={props.task._id} />
        </div>
    );
}