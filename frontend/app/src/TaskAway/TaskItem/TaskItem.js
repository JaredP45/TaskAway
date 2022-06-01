// Module Imports
import React, { useState } from 'react';

// Relative imports
import EditTask from '../TaskMethods/EditTasks/EditTask';
import DeleteTask from '../TaskMethods/EditTasks/DeleteTask';

export default function TaskItem(props) {
    const [isTaskEditable, setIsTaskEditable] = useState(false);
    
    const handleIsTaskEditable = () => {
        setIsTaskEditable(!isTaskEditable);
    }
    
    return (
        <div className="TaskItem">
            { (!isTaskEditable)
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
                onClick={handleIsTaskEditable}
                style={{ color: 'green'}}
            >
                Edit
            </button>

            <DeleteTask taskToDelete={props.task._id} />
        </div>
    );
}