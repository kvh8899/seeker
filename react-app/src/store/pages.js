

const USERLIST = "set/USERLIST"

const getUserList = (list) => {
    return {
        type:USERLIST,
        list
    }
}

export const fetchUserList = (userId) => async(dispatch) => {
    const res = await fetch(`/api/users/${userId}/pages`)

    if(res.ok){
        let list = await res.json();
        dispatch(getUserList(list.userPages))
        return list;
    }else{
        return null;
    }

}
function pageList(state=[],action){
    switch(action.type){
        case USERLIST:
            return action.list
        default:
            return state
    }
}


export default pageList