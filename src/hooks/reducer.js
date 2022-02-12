export const initialState = {
    authUser: null,
    authUserFireStoreId:null,
    publicUsers:null,
    friend:null,
    roomEntry:null,
    onlyFriend:null,
    roomid:null,
    sidebarFriends:null,
    unknownpersonId:null

}
export const actionTypes = {
    SET__USER:"SET__USER",
    SET__USER__ID:"SET__USER__ID",
    SET__PUBLIC:"SET__PUBLIC",
    SET__FRIEND:"SET__FRIEND",
    SET__ROOMENTRY:"SET__ROOMENTRY",
    SET__ONLYFRIEND:"SET__ONLYFRIEND",
    SET__ROOMID:"SET__ROOMID",
    SET__SIDEBARFRIENDS:'SET__SIDEBARFRIENDS',
    SET__UNKNOWNPERSON:'SET__UNKNOWNPERSON',
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
        case actionTypes.SET__ROOMENTRY:
            return {
                ...state,
                roomEntry:action.roomEntry,
            }  
        case actionTypes.SET__ONLYFRIEND:
            return {
                ...state,
                onlyFriend:action.onlyFriend,
            }
        case actionTypes.SET__ROOMID:
            return {
                ...state,
                roomid:action.roomid,
            }
        case actionTypes.SET__SIDEBARFRIENDS:
        return {
            ...state,
            sidebarFriends:action.sidebarFriends,
        }
        case actionTypes.SET__UNKNOWNPERSON:
            return {
                ...state,
                unknownpersonId:action.unknownpersonId,
            }                          
        default:
            return state;
    }

};
export default reducer;