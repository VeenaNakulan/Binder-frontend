import * as actionTypes from "./constants";

const initialState = {
    usersData: [],
    addUsersData: {},
    getUsersById: {},
    editUsersById: {},
    deleteUsersById: {},
    getListForCommonFilterResponse: {},
    getUsersByIdResponse: {},
    getAllUsersLogResponse: {},
    restoreUsersLogResponse: {},
    deleteUsersLogResponse: {},
    existingEmailResponse: {}
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_USERS_REQUEST:
            return {
                ...state
            };
        case actionTypes.GET_USERS_SUCCESS:
            return {
                ...state,
                usersData: { success: true, ...action.response }
            };
        case actionTypes.GET_USERS_FAILURE:
            return {
                ...state,
                usersData: { success: false, ...action.error }
            };

        case actionTypes.ADD_USERS_REQUEST:
            return {
                ...state
            };
        case actionTypes.ADD_USERS_SUCCESS:
            return {
                ...state,
                addUsersData: { success: true, ...action.response }
            };
        case actionTypes.ADD_USERS_FAILURE:
            return {
                ...state,
                addUsersData: { success: false, ...action.error }
            };
        default:
            return state;
    }
};
