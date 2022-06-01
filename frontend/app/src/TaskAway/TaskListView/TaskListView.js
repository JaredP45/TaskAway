// Module Imports
import React, { useContext, useEffect, useState } from 'react';
import { Col, Row, Timeline, Spin, message } from "antd";
import { CheckCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";

// Relative Imports
import TaskItem from '../TaskItem/TaskItem';
import AddTask from '../TaskMethods/AddTask';
import TaskMenuOptions from '../TaskMenuOptions/TaskMenuOptions';
import GetTasks from '../TaskMethods/GetTasks';
import { Context } from '../TaskContextMain';

// Style Imports
import '../../App.css';


const TodoListView = () => {
	const [state, ] = useContext(Context);
    const [timeline, setTimeline] = useState();

    GetTasks();

    useEffect(() => { 
        const timelineItems =  state.taskList.reverse().map((task, index ) => {
            if (state.isTaskLoading) {
                return (
                    <Spin />
                );
            };

            if (state.error) {
                message.error('Something went wrong: ' + state.error);
            }

            if (state.taskList && !state.isTaskLoading && !state.error) {
                return task.completed ? (
                    <div style={{ display: 'flex' }}>
                        <Timeline.Item
                            dot={<CheckCircleOutlined />}
                            color="green"
                            style={{ textDecoration: "line-through", color: "green" }}
                        >
                            {task.title} <small>{task.description}</small>
                        </Timeline.Item>
                        <TaskMenuOptions task={task} key={index} />
                    </div>
                ) : (
                    <div style={{ display: 'flex' }}>
                        <Timeline.Item
                            dot={<MinusCircleOutlined />}
                            color="blue"
                            style={{ textDecoration: "initial" }}
                        >
                            {task.title} <small>{task.description}</small>
                        </Timeline.Item>
                        <TaskMenuOptions task={task} key={index} />
                    </div>
                )
            }
        })
        setTimeline(timelineItems);
        
    }, [state.taskList, state.isTaskLoading, state.error])

    return (
        <>
            <Row style={{ marginTop: 50 }}>
                <Col span={7} offset={5}>
                    <h1>TaskAway</h1>
                    <Timeline mode="left">{timeline}</Timeline>
                </Col>
                <AddTask />
            </Row>
        </>
    );
};

export default TodoListView;