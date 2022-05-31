// Module Imports
import React from 'react';

// Relative imports
import EditTask from '../TaskMethods/EditTask';

export default function TaskItem(props) {
    return (
        <EditTask task={props} />
    );
}