const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_TODOLIST':
            return {
                ...state,
                todoList: action.payload
            };
        case 'SET_TITLE':
            return {
                ...state,
                title: action.payload
            };
        case 'SET_DESCRIPTION':
            return {
                ...state,
                desc: action.payload
            };
        case 'SET_IS_COMPLETE':
            return {
                ...state,
                isComplete: action.payload
            };
        case 'GET_ERROR':
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default Reducer;