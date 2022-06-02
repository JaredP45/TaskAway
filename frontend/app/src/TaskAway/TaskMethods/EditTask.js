// Module Imports
import React, { useContext } from 'react';

// Relative imports
import {Context} from '../GlobalContext/TaskContextMain';
import TaskAwayAPI from '../api/api';
import TaskFormDialog from '../dialog/TaskFormDialog';


export default function EditTasks({ task, isDialogOpen, handleCloseDialog }) {
	const [state, dispatch] = useContext(Context);

    const handleIsTaskComplete = () => {
		dispatch({ type: 'SET_IS_TASK_COMPLETE', payload: !state.isTaskComplete })
	};

    const handleUpdateTask = () => {
        TaskAwayAPI.updateTask(task.task._id, state.title, state.desc, state.isTaskComplete);

        dispatch({ type: 'SET_TITLE', payload: '', });
        dispatch({ type: 'SET_DESCRIPTION', payload: '', });
        dispatch({ type: 'SET_IS_TASK_COMPLETE', payload: false, });
        
        handleCloseDialog();
    };

    const handleDeleteTask = () => {
        TaskAwayAPI.deleteTask(task.task._id);

        handleCloseDialog();
    };
    
    return (
        <div className="EditTask">
            <TaskFormDialog
                dialogTitle="Edit Task"

                taskTitleDefaultValue={task.task.title}
                handleTaskTitle={(event) => dispatch({ type: 'SET_TITLE', payload: event.target.value })}

                taskDescDefaultValue={task.task.description}
                handleTaskDesc={event => dispatch({ type: 'SET_DESCRIPTION', payload: event.target.value })}

                isTaskComplete={task.task.completed ? !state.isTaskComplete : state.isTaskComplete}
                handleIsTaskComplete={handleIsTaskComplete}

                isOpen={isDialogOpen}
                handleClose={handleCloseDialog}

                handleSubmit={() => handleUpdateTask()}
                handleDelete={() => handleDeleteTask()}
            />
        </div>
    );
}