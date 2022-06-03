// Module Imports
import React, { useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

// Relative imports
import EditTask from '../TaskMethods/EditTask';
import DeleteTask from '../TaskMethods/DeleteTask';
import TaskTooltip from '../utils/popups/TaskTooltip';


export default function TaskMenuOptions(props) {
    const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    
    const isMenuOpen = Boolean(anchorEl);

    const handleIsTaskDialogOpen = () => {
        setIsTaskDialogOpen(!isTaskDialogOpen);
    };

    const handleCloseTaskDialog = () => {
        setIsTaskDialogOpen(false);
    };

    const handleIsMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    
    return (
        <div className="TaskMenuOptions">
            <div 
                onClick={handleIsMenuOpen}
                aria-controls={isMenuOpen ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={isMenuOpen ? 'true' : undefined}
            >
                <TaskTooltip
                    component={<MoreHorizIcon />}
                    label="Task Options"
                />
            </div>
            <Menu 
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem
                    onClick={handleIsTaskDialogOpen}
                >
                    Edit this Task
                    <EditTask
                        task={props}
                        isDialogOpen={isTaskDialogOpen}
                        handleCloseDialog={() => handleCloseTaskDialog}
                    />
                </MenuItem>
                <MenuItem
                    onClick={handleMenuClose}
                >
                    <DeleteTask taskID={props.task._id} />
                </MenuItem>
            </Menu>
        </div>
    );
}