const initialState = {
    initialStopwatch: '00:00:00.00',
    stopwatchTime: '',
    isStopwatchActive: false,

}


const reducer = (state = initialState, action) => {

    switch (action.type) {
        case ('UPDATE_TIME') : {
            return {
                ...state,
                stopwatchTime: action.payload
            }
        }
        case ('SWITCH_TIME'): {
            return {
                ...state,
                isStopwatchActive: !state.isStopwatchActive,
            }

        }
        case ('CLEAR_TIME'): {
            return {
                ...state,
                stopwatchTime: state.initialStopwatch
            }

        }
        default:
            return state;
    }
}

export default reducer;
