export const initialState = {
    authUser: null,
    authUserFireStoreId:null,
    publicUsers:null,
    friend:null,
}
export const actionTypes = {
    SET__USER:"SET__USER",
    SET__USER__ID:"SET__USER__ID",
    SET__PUBLIC:"SET__PUBLIC",
    SET__FRIEND:"SET__FRIEND",
}
 const reducer=(state, action) => {
    
    switch(action.type){
        case actionTypes.SET__USER:
            return {
                ...state,
                authUser:action.authUser,
            }
        case actionTypes.SET__USER__ID:
            return {
                ...state,
                authUserFireStoreId:action.authUserFireStoreId,
            }
        case actionTypes.SET__PUBLIC:
            return {
                ...state,
                publicUsers:action.publicUsers,
            }
        case actionTypes.SET__FRIEND:
            return {
                ...state,
                friend:action.friend,
            }   
        default:
            return state;
    }

};
export default reducer;