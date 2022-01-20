const TOGGLE = "set/TOGGLE"

export const toggleCreatePage = () => {
    return {
        type:TOGGLE
    }
}
function createPageShow(state = false,action){
    switch(action.type){
        case TOGGLE:
            return !state;
        default:
            return state
    }
}

export default createPageShow;