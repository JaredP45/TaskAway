// Module Imports
import Button from '@mui/material/Button';

// Relative imports
import TaskAwayAPI from '../../api/api';

const DeleteTask = ({ taskID }) => {

    const handleDeleteTask = () => {
        TaskAwayAPI.deleteTask(taskID);
    };

    return (
        <div className="DeleteTask">
            <Button 
                onClick={() => handleDeleteTask()}
                style={{ color: 'red'}}
            >
                Delete
            </Button>
        </div>
    );
}

export default DeleteTask;