const updateTimer = (time) => {
    return {
        type: 'UPDATE_TIME',
        payload: time
    }
}

const switchTimer = (status) => {
    return {
        type: 'SWITCH_TIME',
        payload: status
    }
}


const clearTimer = () => {
    return {
        type: 'CLEAR_TIME',
    }
}

export {
    updateTimer,
    switchTimer,
    clearTimer
}
