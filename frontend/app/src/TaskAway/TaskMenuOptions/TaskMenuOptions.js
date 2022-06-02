// Module Imports
import React, { useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

// Relative imports
import EditTask from '../TaskMethods/EditTask';
import TaskTooltip from '../utils/popups/TaskTooltip';


export default function TaskMenuOptions(props) {
    const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
    
    const handleIsTaskDialogOpen = () => {
        setIsTaskDialogOpen(!isTaskDialogOpen);
    };

    const handleCloseTaskDialog = () => {
        setIsTaskDialogOpen(false);
    };
    
    return (
        <div className="TaskMenuOptions">
            <div 
                onClick={handleIsTaskDialogOpen}
            >
                <TaskTooltip
                    component={<MoreHorizIcon />}
                    label="Edit this Task"
                />
            </div>
            { (!isTaskDialogOpen)
                ?
                    null
                :
                    <EditTask
                        task={props}
                        isDialogOpen={isTaskDialogOpen}
                        handleCloseDialog={() => handleCloseTaskDialog()}
                    />
                // End-of-Ternary
            }
        </div>
    );
}