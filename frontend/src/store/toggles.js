//action types
const TOGGLECREATE = "set/TOGGLECREATE";
const TOGGLEEDIT = "set/TOGGLEEDIT";
const TOGGLELOGIN = "set/TOGGLELOGIN";
const TOGGLESIGNUP = "signup/TOGGLESIGNUP";
const TOGGLEPOST = "post/TOGGLEPOST";
const SETPOSTOFF = "post/TOGGLEOFF";
const TPSELECT = "page/TPSELECT";
const TPSELECTOFF = "page/TPSELECTOFF";
const TPSELECTON = "page/TPSELECTON";
export const togglePageSelect = () => {
  return {
    type: TPSELECT,
  };
};

export const togglePageOff = () => {
  return {
    type: TPSELECTOFF,
  };
};

export const togglePageOn = () => {
  return {
    type: TPSELECTON,
  };
};

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

export function pageSelect(state = false, action) {
  switch (action.type) {
    case TPSELECT:
      return !state;
    case TPSELECTOFF:
      return false;
    case TPSELECTON:
      return true;
    default:
      return state;
  }
}

export function postPageShow(state = false, action) {
  switch (action.type) {
    case TOGGLEPOST:
      return !state;
    case SETPOSTOFF:
      return false;
    case TPSELECTOFF:
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
