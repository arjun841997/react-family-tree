var initialState ={
    data: {
        data: []
    }
}

export const treeReducer = (state = initialState, action)  => {
   
    if (action.type === 'SAVE_TREE') {
        // return action.payload;
    }
    if(action.type === 'GET_FAMILIES'){
      return action.payload
    }
    return state;
}