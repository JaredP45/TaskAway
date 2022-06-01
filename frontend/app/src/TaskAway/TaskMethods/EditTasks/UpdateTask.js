// Module Imports
import { Button } from 'antd';
import React, { useContext } from 'react';

// Relative imports
import TaskAwayAPI from '../../api/api';
import {Context} from '../../TaskContextMain';

const UpdateTask = ({ taskID }) => {
	const [state, dispatch] = useContext(Context);

    const handleUpdateTask = () => {
        TaskAwayAPI.updateTask(taskID, state.title, state.desc, state.isTaskComplete);

        dispatch({ type: 'SET_TITLE', payload: '', });
        dispatch({ type: 'SET_DESCRIPTION', payload: '', });
        dispatch({ type: 'SET_IS_TASK_COMPLETE', payload: false, });
    };

    return (
        <div className="UpdateTask">
            <Button 
                onClick={() => handleUpdateTask()}
                style={{ color: 'blue'}}
            >
                Update
            </Button>
        </div>
    );
}

export default UpdateTask;