// Module Imports
import React, { useContext } from 'react';
import { Checkbox, Input } from 'antd';

// Relative imports
import {Context} from '../../TaskContextMain';
import DeleteTask from './DeleteTask';
import UpdateTask from './UpdateTask';

export default function EditTasks({ task }) {
	const [state, dispatch] = useContext(Context);

    const { TextArea } = Input;

    const handleIsTaskComplete = () => {
		dispatch({ type: 'SET_IS_TASK_COMPLETE', payload: !state.isTaskComplete })
	};

    const handleTaskFieldChange = (taskValue, stateValue) => {
        console.log("taskVal: " + taskValue);
        console.log("stateVal: " + stateValue);
        if (stateValue !== '') {
            return stateValue;
        } else {
            return taskValue;
        }        
    };

    // FIXME isTaskComplete is not tracking same boolean state as task.task.completed
    // FIXME handle default values for fields
    
    return (
        <div className="EditTask">
            <div>
                <label>
                    <small>Completed</small>
                    <Checkbox 
                        onChange={handleIsTaskComplete}
                        defaultChecked={task.task.completed ? !state.isTaskComplete : state.isTaskComplete}
                    />
                </label>
                
                <div>
                    <Input 
                        onChange={(event) => dispatch({ type: 'SET_TITLE', payload: event.target.value })}
                        value={handleTaskFieldChange(task.task.title, state.title)}
                    />
                    <TextArea
                        rows={3} 
                        onChange={event => dispatch({ type: 'SET_DESCRIPTION', payload: event.target.value })}
                        value={handleTaskFieldChange(task.task.description, state.desc)}
                    />
                    <UpdateTask taskID={task.task._id} />
                    <DeleteTask taskID={task.task._id} />
                </div>
            </div>
        </div>
    );
}