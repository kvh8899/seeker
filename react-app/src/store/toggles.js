//action types
const TOGGLECREATE = "set/TOGGLECREATE";
const TOGGLEEDIT = "set/TOGGLEEDIT";
const TOGGLELOGIN = "set/TOGGLELOGIN";
const TOGGLESIGNUP = "signup/TOGGLESIGNUP";
const TOGGLEPOST = "post/TOGGLEPOST";
const SETPOSTOFF = "post/TOGGLEOFF";

export const togglePostPage = () => {
  return {
    type: TOGGLEPOST,
  };
};

export const postPageOff = () => {
  return {
    type: SETPOSTOFF,
  };
};

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
    type: TOGGLESIGNUP,
  };
};

export function postPageShow(state = false, action) {
  switch (action.type) {
    case TOGGLEPOST:
      return !state;
    case SETPOSTOFF:
      return false;
    default:
      return state;
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

export function signupShow(state = false, action) {
  switch (action.type) {
    case TOGGLESIGNUP:
      return !state;
    default:
      return state;
  }
}
