
const TOGGLE = "signup/TOGGLE"

export const toggleSignup = () => {
    return {
        type:TOGGLE
    }
}
function signupShow(state=false,action){
    switch(action.type){
        case TOGGLE:
            return !state
        default:
            return state;
    }
}


export default signupShow;