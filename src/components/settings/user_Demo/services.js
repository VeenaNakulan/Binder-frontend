import { logbookGateWay } from "../../../services/authorizationService";
import * as serviceEndPoints from "../../../config/serviceEndPoints";

export const getUsers = params => logbookGateWay.get(serviceEndPoints.userEndPoints.getUsers, { params });
export const addUsers = params => logbookGateWay.post(serviceEndPoints.userEndPoints.getUsers, params);

export const getUserPermissionDropdown = params =>
    logbookGateWay.get(`${serviceEndPoints.userPermissionEndPoints.getUserPermissions}/templates_dropdown`, { params });
