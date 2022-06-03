// Module Imports
import React, { useContext } from 'react';
import Alert from '@mui/material/Alert';

// Relative Imports
import { Context } from '../GlobalContext/TaskContextMain';
import TaskAwayAPI from '../api/api';
import TaskFormDialog from '../utils/dialogs/TaskFormDialog';

// Style Imports
import '../../App.css';


export default function AddTasks({ isDialogOpen, handleCloseDialog }) {
	const [state, dispatch] = useContext(Context);

    const handleIsTaskComplete = () => {
		dispatch({ type: 'SET_IS_TASK_COMPLETE', payload: !state.isTaskComplete })
	};

	const handleAddTask = () => {
		TaskAwayAPI.createTask(state.title, state.desc, state.isTaskComplete);

        dispatch({ type: 'SET_TITLE', payload: '', });
        dispatch({ type: 'SET_DESCRIPTION', payload: '', });
        dispatch({ type: 'SET_IS_TASK_COMPLETE', payload: false, });

		handleCloseDialog();

		return (
			<Alert onClose={() => {}}>Task Created!</Alert>
		);
	};
    
    return (
        <div className="AddTask">
            <TaskFormDialog
                dialogTitle="Add Task"

                taskTitleDefaultValue={state.title}
                handleTaskTitle={(event) => dispatch({ type: 'SET_TITLE', payload: event.target.value })}

                taskDescDefaultValue={state.desc}
                handleTaskDesc={event => dispatch({ type: 'SET_DESCRIPTION', payload: event.target.value })}

                isTaskComplete={state.isTaskComplete}
                handleIsTaskComplete={handleIsTaskComplete}

                isOpen={isDialogOpen}
                handleClose={handleCloseDialog}
                handleSubmit={() => handleAddTask()}
            />
        </div>
    );
}