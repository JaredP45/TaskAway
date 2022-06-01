// Module Imports
import React from 'react';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

// Relative imports
import TaskMenuOptions from "../TaskMenuOptions/TaskMenuOptions";


export default function TaskItem({ isComplete, task, index }) {

    const handleIsCompleteCircleIcon = () => {
        return (
            isComplete ? (
                <CheckCircleIcon fontSize="small" />
            ) : (
                <RemoveCircleIcon fontSize="small" />
            )
        );
    };

    const handleIsCompleteCircleColor = () => {
        if (isComplete) {
            return "success";
        } else {
            return "primary";
        }
    };

    const handleIsCompleteLineThrough = () => {
        if (isComplete) {
            return { textDecoration: 'line-through' };
        } else {
            return null;
        }
    };

    return (
        <div className="TaskItem">
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot color={handleIsCompleteCircleColor()}>
                        {handleIsCompleteCircleIcon()}    
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent style={handleIsCompleteLineThrough()}>{task.title} <small>{task.description}</small></TimelineContent>
                <TaskMenuOptions task={task} key={index} />
            </TimelineItem>
        </div>
    );
}