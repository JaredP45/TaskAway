// Module Imports

// Relative imports
import TaskAwayAPI from '../api/api';

const DeleteTask = ({ taskID }) => {

    const handleDeleteTodo = () => {
        TaskAwayAPI.deleteTask(taskID);
    };

    return (
        <div className="DeleteTask">
            <button 
                onClick={() => handleDeleteTodo()}
                style={{ color: 'red'}}
            >
                Delete
            </button>
        </div>
    );
}

export default DeleteTask;