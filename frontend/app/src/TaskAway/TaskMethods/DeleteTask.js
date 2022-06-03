// Module Imports

// Relative imports
import TaskAwayAPI from '../api/api';

const DeleteTask = ({ taskID }) => {

    const handleDeleteTask = () => {
        TaskAwayAPI.deleteTask(taskID);
    };

    return (
        <div className="DeleteTask">
            <span 
                onClick={() => handleDeleteTask()}
                style={{ color: 'red'}}
            >
                Delete this Task
            </span>
        </div>
    );
}

export default DeleteTask;