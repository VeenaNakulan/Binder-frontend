import * as actionTypes from "./constants";

const initialState = {
  usersData: [],
  addUsersData: [],
  getUsersByid: [],
  userPermissionDropdownResponse: { permissions: [] },
  existingEmailResponse: {},
  editUsersByIdReducer: [],
  deleteUser: [],
  getAllUsersLogResponse: []
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

    case actionTypes.GET_USERS_BYID_REQUEST:
      return {
        ...state
      };
    case actionTypes.GET_USERS_BYID_SUCCESS:
      return {
        ...state,
        getUsersByid: { success: true, ...action.response }
      };
    case actionTypes.GET_USERS_BYID_FAILURE:
      return {
        ...state,
        getUsersByid: { success: false, ...action.error }
      };
    case actionTypes.GET_USER_PERMISSION_DROPDOWN_DATA_REQUEST:
      return {
        ...state
      };
    case actionTypes.GET_USER_PERMISSION_DROPDOWN_DATA_SUCCESS:
      return {
        ...state,
        userPermissionDropdownResponse: { permissions: [...action.response] }
      };
    case actionTypes.GET_USER_PERMISSION_DROPDOWN_DATA_FAILURE:
      return {
        ...state,
        userPermissionDropdownResponse: { userPermissionDropdownResponse: { permissions: [] } }
      };
    case actionTypes.GET_EXISTING_USERS_REQUEST:
      return {
        ...state
      };
    case actionTypes.GET_EXISTING_USERS_SUCCESS:
      return {
        ...state,
        existingEmailResponse: { success: true, ...action.response }
      };
    case actionTypes.GET_EXISTING_USERS_FAILURE:
      return {
        ...state,
        existingEmailResponse: { success: false, ...action.error }
      };

    case actionTypes.EDIT_USERS_BYID_REQUEST:
      return {
        ...state
      };
    case actionTypes.EDIT_USERS_BYID_SUCCESS:
      return {
        ...state,
        editUsersByIdReducer: { success: true, ...action.response }
      };
    case actionTypes.EDIT_USERS_BYID_FAILURE:
      return {
        ...state,
        editUsersByIdReducer: { success: false, ...action.error }
      };
    case "CLEAR_DATA":
      return {
        editUsersByIdReducer: {},
        addUsersData: {}
      };
    case actionTypes.DELETE_USERS_BYID_REQUEST:
      return {
        ...state
      };
    case actionTypes.DELETE_USERS_BYID_SUCCESS:
      return {
        ...state,
        deleteUser: { success: true, ...action.response }
      };
    case actionTypes.DELETE_USERS_BYID_FAILURE:
      return {
        ...state,
        deleteUser: { success: false, ...action.error }
      };
    case actionTypes.GET_ALL_USERS_LOG_REQUEST:
      return {
        ...state
      };
    case actionTypes.GET_ALL_USERS_LOG_SUCCESS:
      return {
        ...state,
        getAllUsersLogResponse: { success: true, ...action.response }
      };
    case actionTypes.GET_ALL_USERS_LOG_FAILURE:
      return {
        ...state,
        getAllUsersLogResponse: { success: false, ...action.error }
      };

    default:
      return state;
  }
};
