// Module Imports
import React from 'react';

// Relative imports
import EditTask from '../TaskMethods/EditTask';

export default function TaskItem(props) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center'}}>
            <EditTask task={props} />
        </div>
    );
}