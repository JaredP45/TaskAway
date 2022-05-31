// Module Imports
import React, { useContext } from 'react';

// Relative imports
import {Context} from '../TaskContextMain';
import EditTask from '../TaskMethods/EditTask';
import DeleteTask from '../TaskMethods/DeleteTask';

export default function TaskItem(props) {
	const [state, dispatch] = useContext(Context);

    const handleIsEditable = () => {
        dispatch({ type: 'SET_TASKLIST', payload: !state.TaskList.isTaskEditable })
    };

    return (
        <div className="TaskItem">
            {/* { (!state.TaskList.isTaskEditable)
                ? */}
                    <div>
                        <span style={{ fontWeight: 'bold' }}>
                            { props.task.title }
                        </span>
                        { props.task.description }
                        { props.task.completed ? "completed" : "not completed" }
                    </div>
                {/* :

                    <EditTask task={props} key={props.task._id} />
                // End-of-Ternary
            } */}
            <button 
                onClick={handleIsEditable}
                style={{ color: 'green'}}
            >
                Edit
            </button>

            <DeleteTask taskID={props.task._id} />
        </div>
    );
}