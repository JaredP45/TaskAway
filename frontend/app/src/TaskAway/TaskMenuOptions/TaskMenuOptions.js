// Module Imports
import React, { useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

// Relative imports
import EditTask from '../TaskMethods/EditTasks/EditTask';

export default function TaskMenuOptions(props) {
    const [isTaskEditable, setIsTaskEditable] = useState(false);
    
    const handleIsTaskEditable = () => {
        setIsTaskEditable(!isTaskEditable);
    }
    
    return (
        <div className="TaskMenuOptions">
            <div 
                onClick={handleIsTaskEditable}
            >
                <MoreHorizIcon />
            </div>
            { (!isTaskEditable)
                ?
                    null
                :
                    <EditTask task={props} />
                // End-of-Ternary
            }
        </div>
    );
}