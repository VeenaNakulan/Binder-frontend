import * as actionTypes from "./constants";
import * as Service from "./services";

export const getUsers = params => {
    return async dispatch => {
        try {
            dispatch({ type: actionTypes.GET_USERS_REQUEST });
            const res = await Service.getUsers(params);
            if (res && res.status === 200) {
                const getUsersData = res.data;
                if (getUsersData) {
                    dispatch({ type: actionTypes.GET_USERS_SUCCESS, response: getUsersData });
                } else {
                    dispatch({ type: actionTypes.GET_USERS_FAILURE, error: getUsersData });
                }
            } else {
                dispatch({ type: actionTypes.GET_USERS_FAILURE, error: res.response && res.response.data });
            }
        } catch (e) {
            dispatch({ type: actionTypes.GET_USERS_FAILURE, error: e.response && e.response.data });
        }
    };
};

export const addUsers = params => {
    return async dispatch => {
        try {
            dispatch({ type: actionTypes.ADD_USERS_REQUEST });
            const res = await Service.addUsers(params);
            if (res && res.status === 200) {
                if (res.data) {
                    dispatch({ type: actionTypes.ADD_USERS_SUCCESS, response: res.data });
                } else {
                    dispatch({ type: actionTypes.ADD_USERS_FAILURE, error: res.data });
                }
            } else {
                dispatch({ type: actionTypes.ADD_USERS_FAILURE, error: res.data });
            }
        } catch (e) {
            dispatch({ type: actionTypes.ADD_USERS_FAILURE, error: e.response && e.response.data });
        }
    };
};

export const getUsersById = id => {
    return async dispatch => {
        try {
            dispatch({ type: actionTypes.GET_USERS_BYID_REQUEST });
            const res = await Service.getUsersById(id);
            if (res && res.status === 200) {
                if (res.data) {
                    dispatch({ type: actionTypes.GET_USERS_BYID_SUCCESS, response: res.data });
                    return res.data;
                } else {
                    dispatch({ type: actionTypes.GET_USERS_BYID_FAILURE, error: res.data });
                }
            } else {
                dispatch({ type: actionTypes.GET_USERS_BYID_FAILURE, error: res.data });
            }
        } catch (e) {
            dispatch({ type: actionTypes.GET_USERS_BYID_FAILURE, error: e.response && e.response.data });
        }
    };
};

export const getUserPermissionDropdown = params => {
    return async dispatch => {
        try {
            dispatch({ type: actionTypes.GET_USER_PERMISSION_DROPDOWN_DATA_REQUEST });
            const res = await Service.getUserPermissionDropdown(params);
            if (res && res.status === 200) {
                const getUsersData = res.data;
                if (getUsersData) {
                    dispatch({ type: actionTypes.GET_USER_PERMISSION_DROPDOWN_DATA_SUCCESS, response: getUsersData });
                } else {
                    dispatch({ type: actionTypes.GET_USER_PERMISSION_DROPDOWN_DATA_FAILURE, error: getUsersData });
                }
            } else {
                dispatch({ type: actionTypes.GET_USER_PERMISSION_DROPDOWN_DATA_FAILURE, error: res.response && res.response.data });
            }
        } catch (e) {
            dispatch({ type: actionTypes.GET_USER_PERMISSION_DROPDOWN_DATA_FAILURE, error: e.response && e.response.data });
        }
    };
};
