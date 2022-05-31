// Module Imports

// Relative imports
import TaskAwayAPI from '../api/api';

const DeleteTask = ({ taskToDelete }) => {

    const handleDeleteTask = () => {
        TaskAwayAPI.deleteTask(taskToDelete);
    };

    return (
        <div className="DeleteTask">
            <button 
                onClick={() => handleDeleteTask()}
                style={{ color: 'red'}}
            >
                Delete
            </button>
        </div>
    );
}

export default DeleteTask;