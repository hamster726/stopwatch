const updateTimer = (time) => {
    return {
        type: 'UPDATE_TIME',
        payload: time
    }
}

const switchTimer = () => {
    return {
        type: 'SWITCH_TIME',
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
