const initialState = {
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
            let status = !state.isStopwatchActive

            if (typeof action.payload === 'boolean'){
                status = action.payload
            }

            return {
                ...state,
                isStopwatchActive: status,
            }

        }
        default:
            return state;
    }
}

export default reducer;
