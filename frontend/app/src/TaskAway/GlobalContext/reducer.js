const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_TASKLIST':
            return {
                ...state,
                taskList: action.payload
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
        case 'SET_IS_TASK_COMPLETE':
            return {
                ...state,
                isTaskComplete: action.payload
            };
        case 'SET_IS_TASK_LOADING':
            return {
                ...state,
                isTaskLoading: action.payload
            };
        case 'SET_IS_TASK_EDITABLE':
            return {
                ...state,
                isTaskEditable: action.payload
            };
        case 'SET_IS_TASK_DIALOG_OPEN':
            return {
                ...state,
                isTaskDialogOpen: action.payload
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