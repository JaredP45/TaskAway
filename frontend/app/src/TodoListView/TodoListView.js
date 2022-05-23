// Module Imports
import React, { useEffect } from 'react';

// Relative Imports
import Todo from '../Todo/Todo';

export default function TodoListView(props) {
    return (
        <div>
            <ul>
                { props.todoList.map(todo => <Todo todo={todo} />)}
            </ul>
        </div>
    );
}