import React, {createContext, useReducer} from "react";
import Reducer from '../Reducer/reducer';

const initialState = {
    todoList: [{}],
	title: '',
	desc: '',
    error: null,
};


const TodoMain = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={[ state, dispatch ]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default TodoMain;