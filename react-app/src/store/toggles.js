//action types
const TOGGLECREATE = "set/TOGGLECREATE";
const TOGGLEEDIT = "set/TOGGLEEDIT";
const TOGGLELOGIN = "set/TOGGLELOGIN";
const TOGGLESIGNUP = "signup/TOGGLESIGNUP"

export const toggleEditPage = () => {
  return {
    type: TOGGLEEDIT,
  };
};

export const toggleCreatePage = () => {
  return {
    type: TOGGLECREATE,
  };
};

export const toggleLogin = () => {
  return {
    type: TOGGLELOGIN,
  };
};

export const toggleSignup = () => {
    return {
        type:TOGGLESIGNUP
    }
}

export function createPageShow(state = false, action) {
  switch (action.type) {
    case TOGGLECREATE:
      return !state;
    default:
      return state;
  }
}

export function editPageShow(state = false, action) {
  switch (action.type) {
    case TOGGLEEDIT:
      return !state;
    default:
      return state;
  }
}

export function loginShow(state = false, action) {
  switch (action.type) {
    case TOGGLELOGIN:
      return !state;
    default:
      return state;
  }
}

export function signupShow(state=false,action){
    switch(action.type){
        case TOGGLESIGNUP:
            return !state
        default:
            return state;
    }
}
