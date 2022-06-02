// Module Imports
import React, { useContext, useEffect, useState } from 'react';
import Timeline from '@mui/lab/Timeline';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, Grid, Box } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

// Relative Imports
import TaskItem from '../TaskItem/TaskItem';
import AddTask from '../TaskMethods/AddTask';
import GetTasks from '../TaskMethods/GetTasks';
import { Context } from '../TaskContextMain';

// Style Imports
import '../../App.css';


const TodoListView = () => {
	const [state, ] = useContext(Context);
    const [timeline, setTimeline] = useState();
    const [message, setMessage] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const handleMessageClick = () => {
        setMessage({ open: true });
    }

    GetTasks();

    useEffect(() => { 
        const timelineItems =  state.taskList.reverse().map((task, index ) => {
            if (state.isTaskLoading) {
                return (
                    <CircularProgress />
                );
            };

            if (state.error) {
                return (
                    <Button
                        onClick={handleMessageClick()}
                    >
                        Something went wrong: {state.error}
                    </Button>
                );
            }

            if (state.taskList && !state.isTaskLoading && !state.error) {
                return task.completed ? (
                    <TaskItem isComplete={task.completed} task={task} index={index} />
                ) : (
                    <TaskItem isComplete={task.completed} task={task} index={index} />
                )
            }
        })
        setTimeline(timelineItems);
        
    }, [state.taskList, state.isTaskLoading, state.error])

    return (
        <>
            <Box sx={{ marginTop: 10 }}>
                <Grid container>
                    <Grid item>
                        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                            <h1 style={{ padding: '5px'}}>TaskAway</h1>
                            <AddBoxOutlinedIcon />
                        </div>
                        <Timeline>{timeline}</Timeline>
                    </Grid>
                </Grid>
                <AddTask />
            </Box>
        </>
    );
};

export default TodoListView;