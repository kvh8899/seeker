
const TOGGLE = "setlogin/TOGGLE"

export const toggle = () => {
    return{
        type:TOGGLE,
    }
}

function loginShow(state = false, action) {
  switch (action.type) {
    case TOGGLE:
        return !state;
    default:
      return state;
  }
}


export default loginShow