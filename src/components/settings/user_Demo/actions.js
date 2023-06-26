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

export const getExistingUsers = params => {
  return async dispatch => {
    try {
      dispatch({ type: actionTypes.GET_EXISTING_USERS_REQUEST });
      const res = await Service.getExistingUsers(params);
      if (res && res.status === 200) {
        const getUsersData = res.data;
        if (getUsersData) {
          dispatch({ type: actionTypes.GET_EXISTING_USERS_SUCCESS, response: getUsersData });
        } else {
          dispatch({ type: actionTypes.GET_EXISTING_USERS_FAILURE, error: getUsersData });
        }
      } else {
        dispatch({ type: actionTypes.GET_EXISTING_USERS_FAILURE, error: res.response && res.response.data });
      }
    } catch (e) {
      dispatch({ type: actionTypes.GET_EXISTING_USERS_FAILURE, error: e.response && e.response.data });
    }
  };
};

export const editUsersById = (params, id) => {
  return async dispatch => {
    try {
      dispatch({ type: actionTypes.EDIT_USERS_BYID_REQUEST });
      const res = await Service.editUsersById(params, id);
      if (res && res.status === 200) {
        if (res.data) {
          dispatch({ type: actionTypes.EDIT_USERS_BYID_SUCCESS, response: res.data });
        } else {
          dispatch({ type: actionTypes.EDIT_USERS_BYID_FAILURE, error: res.data });
        }
      } else {
        dispatch({ type: actionTypes.EDIT_USERS_BYID_FAILURE, error: res.data });
      }
    } catch (e) {
      dispatch({ type: actionTypes.EDIT_USERS_BYID_FAILURE, error: e.response && e.response.data });
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

export const resetValue = () => dispatch => {
  try {
    dispatch({
      type: actionTypes.CLEAR_DATA
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUsers = id => {
  return async dispatch => {
    try {
      dispatch({ type: actionTypes.DELETE_USERS_BYID_REQUEST });
      const res = await Service.deleteUsers(id);
      if (res && res.status === 200) {
        if (res.data) {
          dispatch({ type: actionTypes.DELETE_USERS_BYID_SUCCESS, response: res.data });
        } else {
          dispatch({ type: actionTypes.DELETE_USERS_BYID_FAILURE, error: res.data });
        }
      } else {
        dispatch({ type: actionTypes.DELETE_USERS_BYID_FAILURE, error: res.data });
      }
    } catch (e) {
      dispatch({ type: actionTypes.DELETE_USERS_BYID_FAILURE, error: e.response && e.response.data });
    }
  };
};

export const getAllUsersLogs = (params, id) => {
  return async dispatch => {
    try {
      dispatch({ type: actionTypes.GET_ALL_USERS_LOG_REQUEST });
      const res = await Service.getAllUsersLogs(params, id);
      if (res && res.status === 200) {
        if (res.data) {
          dispatch({ type: actionTypes.GET_ALL_USERS_LOG_SUCCESS, response: res.data });
        } else {
          dispatch({ type: actionTypes.GET_ALL_USERS_LOG_FAILURE, error: res.data });
        }
      } else {
        dispatch({ type: actionTypes.GET_ALL_USERS_LOG_FAILURE, error: res.data });
      }
    } catch (e) {
      dispatch({ type: actionTypes.GET_ALL_USERS_LOG_FAILURE, error: e.response && e.response.data });
    }
  };
};

export const exportUsers = params => {
  return async dispatch => {
    try {
      dispatch({ type: actionTypes.EXPORT_USERS_TABLE_REQUEST });
      const response = await Service.exportUsers(params);
      if (response && response.data) {
        const text = await new Response(response.data).text();
        if (text && text.split('"')[1] === "error") {
          dispatch({ type: actionTypes.EXPORT_USERS_TABLE_SUCCESS, response: { error: text.split('"')[3] } });
          return true;
        } else {
          dispatch({ type: actionTypes.EXPORT_USERS_TABLE_SUCCESS, response: {} });
        }
      }
      const { data } = response;
      const name = response.headers["content-disposition"].split("filename=");
      const fileName = name[1].split('"')[1];
      const downloadUrl = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", `${fileName}`); //any other extension
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (e) {
      dispatch({
        type: actionTypes.EXPORT_USERS_TABLE_FAILURE,
        error: e.response && e.response.data
      });
    }
  };
};

export const deleteUsersLog = id => {
  return async dispatch => {
    try {
      dispatch({ type: actionTypes.DELETE_USERS_LOG_REQUEST });
      const res = await Service.deleteUsersLog(id);
      if (res && res.status === 200) {
        if (res.data) {
          dispatch({ type: actionTypes.DELETE_USERS_LOG_SUCCESS, response: res.data });
        } else {
          dispatch({ type: actionTypes.DELETE_USERS_LOG_FAILURE, error: res.data });
        }
      } else {
        dispatch({ type: actionTypes.DELETE_USERS_LOG_FAILURE, error: res.data });
      }
    } catch (e) {
      dispatch({ type: actionTypes.DELETE_USERS_LOG_FAILURE, error: e.response && e.response.data });
    }
  };
};

export const restoreUsersLog = id => {
  return async dispatch => {
    try {
      dispatch({ type: actionTypes.RESTORE_USERS_LOG_REQUEST });
      const res = await Service.restoreUsersLog(id);
      if (res && res.status === 200) {
        if (res.data) {
          dispatch({ type: actionTypes.RESTORE_USERS_LOG_SUCCESS, response: res.data });
        } else {
          dispatch({ type: actionTypes.RESTORE_USERS_LOG_FAILURE, error: res.data });
        }
      } else {
        dispatch({ type: actionTypes.RESTORE_USERS_LOG_FAILURE, error: res.data });
      }
    } catch (e) {
      dispatch({ type: actionTypes.RESTORE_USERS_LOG_FAILURE, error: e.response && e.response.data });
    }
  };
};

export const getUserBuildingLogbook = (params, path) => {
  return async dispatch => {
    try {
      dispatch({ type: actionTypes.GET_USER_BUILDING_LOGBOOK_REQUEST });
      const res = await Service.getUserBuildingLogbook(params, path);
      if (res && res.status === 200) {
        if (res.data) {
          dispatch({ type: actionTypes.GET_USER_BUILDING_LOGBOOK_SUCCESS, response: res.data });
        } else {
          dispatch({ type: actionTypes.GET_USER_BUILDING_LOGBOOK_FAILURE, error: res.data });
        }
      } else {
        dispatch({ type: actionTypes.GET_USER_BUILDING_LOGBOOK_FAILURE, error: res.data });
      }
    } catch (e) {
      dispatch({ type: actionTypes.GET_USER_BUILDING_LOGBOOK_FAILURE, error: e.response && e.response.data });
    }
  };
};
