// Module Imports
import React, { useState } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";

// Relative imports
import EditTask from '../TaskMethods/EditTasks/EditTask';

export default function TaskMenuOptions(props) {
    const [isTaskEditable, setIsTaskEditable] = useState(false);
    
    const handleIsTaskEditable = () => {
        setIsTaskEditable(!isTaskEditable);
    }
    
    return (
        <div className="TaskMenuOptions" style={{ display: 'flex' }}>
            <div 
                onClick={handleIsTaskEditable}
            >
                <EllipsisOutlined />
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