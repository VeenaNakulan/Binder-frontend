import { logbookGateWay } from "../../../services/authorizationService";
import * as serviceEndPoints from "../../../config/serviceEndPoints";

export const getUsers = params => logbookGateWay.get(serviceEndPoints.userEndPoints.getUsers, { params });
export const addUsers = params => logbookGateWay.post(serviceEndPoints.userEndPoints.getUsers, params);
export const getUsersById = id => logbookGateWay.get(`${serviceEndPoints.userEndPoints.getUsers}/${id}`);
export const editUsersById = (params, id) => logbookGateWay.patch(`${serviceEndPoints.userEndPoints.getUsers}/${id}`, params);
export const deleteUsers = id => logbookGateWay.delete(`${serviceEndPoints.userEndPoints.getUsers}/${id}`);
export const getUserPermissionDropdown = params =>
  logbookGateWay.get(`${serviceEndPoints.userPermissionEndPoints.getUserPermissions}/templates_dropdown`, { params });
export const getExistingUsers = params => logbookGateWay.get(`${serviceEndPoints.userEndPoints.getUsers}/existing_email`, { params });
