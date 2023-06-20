import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import NumberFormat from "react-number-format";
import ReactTooltip from "react-tooltip";
import { Multiselect } from "multiselect-react-dropdown";
import history from "../../../config/history";
import ToastMsg from "../../common/ToastMessage";

import TopSlider from "../../common/components/TopSlider";
import { useDispatch, useSelector } from "react-redux";
import { getUserPermissionDropdown, addUsers, getExistingUsers, editUsersById, getUsersById, resetValue, deleteUsers } from "./actions";
import action from "../actions";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { reportsList } from "../../../config/utils";
import _ from "lodash";

let emailExp = /^\w+([\.-]?\w+)*@\w+([\.-]?(\.\w{2,3})+)*(\.\w{2,3})+$/;
let passwordExp = /^(?=.{6,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/;

const UserForm = props => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { consultancyDropdownData, clientDropdownData, roleDropdownData } = useSelector(({ settingsCommonReducer }) => settingsCommonReducer);

  const { userPermissionDropdownResponse, addUsersData, existingEmailResponse, editUsersByIdReducer, getUsersByid } = useSelector(
    ({ userdemoReducer }) => userdemoReducer
  );

  const [state, setState] = useState({
    selectedUser: id,
    consultancyIdList: [],
    roleIdList: [],
    clientIdList: [],
    userPermissionList: [],
    role_name: "",
    selectedImage: "",
    formParams: {
      name: "",
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      printed_name: "",
      title: "",
      work_phone: "",
      cell_phone: "",
      room_number: "",
      room_name: "",
      emergency_contact_no: "",
      emergency_contact_name: "",
      notes: "",
      address: "",
      state: "",
      city: "",
      zip_code: "",
      department: "",
      credentials: "",
      location: "",
      role_id: "",
      building_name: "",
      cmms_username: "",
      consultancy_id: "",
      client_id: "",
      image: null,
      image_description: "",
      password_confirm: "",
      permission_id: "",
      view_only: "no",
      is_active: "yes",
      reports: [],
      escalation: []
    },
    errorParams: {
      name: false,
      role_id: false,
      consultancy_id: false,
      confirmPassword: false
    },
    showErrorBorder: false,
    showConfirmModal: false,
    confirmPasswordErrorMessage: "",
    escalationsList: []
  });

  let { formParams, errorParams, showErrorBorder, confirmPasswordErrorMessage, role_name, selectedUser, roleIdList, selectedImage, escalationsList } =
    state;
  let currentUser = id || "";
  let userId = localStorage.getItem("user_id");

  useEffect(() => {
    dispatch(getUserPermissionDropdown());
    dispatch(action.getRoleDropdown());
    dispatch(action.getClientDropdown());
    dispatch(action.getConsultancyDropdown());
    if (id) dispatch(getUsersById(id));
  }, []);

  useEffect(() => {
    if (getUsersByid) {
      setState({
        ...state,
        selectedImage: getUsersByid?.user?.image,
        formParams: {
          ...formParams,
          name: id ? getUsersByid?.user?.name : "",
          email: id ? getUsersByid?.user?.email : "",
          password: "",
          first_name: id ? getUsersByid?.user?.first_name : "",
          last_name: id ? getUsersByid?.user?.last_name : "",
          printed_name: id ? getUsersByid?.user?.printed_name : "",
          title: id ? getUsersByid?.user?.title : "",
          work_phone: id ? getUsersByid?.user?.work_phone : "",
          cell_phone: id ? getUsersByid?.user?.cell_phone : "",
          room_number: id ? getUsersByid?.user?.room_number : "",
          room_name: id ? getUsersByid?.user?.room_name : "",
          emergency_contact_no: id ? getUsersByid?.user?.emergency_contact_no : "",
          emergency_contact_name: id ? getUsersByid?.user?.emergency_contact_name : "",
          notes: id ? getUsersByid?.user?.notes : "",
          address: id ? getUsersByid?.user?.address : "",
          state: id ? getUsersByid?.user?.state : "",
          city: id ? getUsersByid?.user?.city : "",
          zip_code: id ? getUsersByid?.user?.zip_code : "",
          department: id ? getUsersByid?.user?.department : "",
          credentials: id ? getUsersByid?.user?.credentials : "",
          location: id ? getUsersByid?.user?.location : "",
          role_id: id ? getUsersByid?.user?.role?.id : "",
          building_name: id ? getUsersByid?.user?.building_name : "",
          cmms_username: id ? getUsersByid?.user?.cmms_username : "",
          consultancy_id: id ? getUsersByid?.user?.consultancy?.id : "",
          client_id: id ? getUsersByid?.user?.client?.id : "",
          image: null,
          image_description: id ? getUsersByid?.user?.image_description : "",
          password_confirm: "",
          permission_id: id ? getUsersByid?.user?.permission?.id : "",
          view_only: id ? getUsersByid?.user?.view_only : "no",
          is_active: id ? getUsersByid?.user?.is_active : "yes",
          reports: id ? getUsersByid?.user?.reports?.map(item => ({ id: item, name: item })) : [],
          escalation: id ? getUsersByid?.user?.escalation?.map(item => ({ id: item, name: item })) : []
        }
      });
    }
  }, [getUsersByid]);

  useEffect(() => {
    refreshUserData();
  }, [roleDropdownData.data]);

  const refreshUserData = () => {
    if (roleDropdownData) {
      setState({ ...state, roleIdList: roleDropdownData?.data || [] });
    }
  };

  const selectConsultancyId = value => {
    setState(prevState => ({
      ...prevState,
      formParams: { ...prevState.formParams, consultancy_id: value, permission_id: "" }
    }));
    dispatch(action.getClientDropdown({ consultancy_id: value }));
    dispatch(getUserPermissionDropdown({ consultancy_id: value }));
    setState(prevState => ({
      ...prevState,
      clientIdList: clientDropdownData?.data,
      userPermissionList: userPermissionDropdownResponse?.permissions
    }));
  };

  const handleSelectRoleName = roleId => {
    let temprole = "";
    roleIdList?.map(item => {
      if (item.id === roleId) {
        temprole = item.name;
      }
    });
    setState({ ...state, role_name: temprole, formParams: { ...formParams, role_id: roleId } });
  };

  const onReportSelect = selectedReports => {
    let rank = {
      "Threshold Start": 1,
      "Threshold Middle": 2,
      "Due Next Day": 3,
      "Due Today": 4,
      "Threshold 3 Day End": 5,
      "Threshold 1 Day End": 6
    };
    selectedReports = _.orderBy(selectedReports, item => rank[item.id]);
    setState({
      ...state,
      formParams: {
        ...formParams,
        reports: selectedReports
      },
      escalationsList: selectedReports
    });
  };

  const onReportRemove = selectedReports => {
    let tempEscalations = [];
    if (formParams.escalation.length) {
      let tempSelectedReports = selectedReports?.length ? selectedReports.map(item => item.id) : [];
      if (tempSelectedReports.length) {
        tempEscalations = formParams.escalation.filter(item => tempSelectedReports.includes(item.id));
      }
    }
    setState({
      ...state,
      formParams: { ...formParams, reports: selectedReports, escalation: tempEscalations },
      escalationsList: selectedReports
    });
  };

  const onEscalationSelect = selectedEscalations => {
    setState({ ...state, formParams: { ...formParams, escalation: selectedEscalations } });
  };

  const onEscalationRemove = selectedEscalations => {
    setState({ ...state, formParams: { ...formParams, escalation: selectedEscalations } });
  };

  const validate = () => {
    let errorParams = {
      name: false
    };
    let showErrorBorder = false;
    let confirmPasswordErrorMessage = "";
    if (!formParams?.name || !formParams?.name.trim().length) {
      errorParams.name = true;
      showErrorBorder = true;
    }
    if (!formParams?.email.trim().length) {
      errorParams.email = true;
      showErrorBorder = true;
    }
    if (!emailExp.test(formParams?.email.trim())) {
      errorParams.email = true;
      showErrorBorder = true;
    }
    if (!selectedUser && (!formParams?.password.trim().length || !passwordExp.test(formParams?.password))) {
      errorParams.password = true;
      showErrorBorder = true;
    }
    if (formParams?.password && formParams?.password.trim().length && !passwordExp.test(formParams?.password)) {
      errorParams.password = true;
      showErrorBorder = true;
    }
    if (role_name !== "super_admin" && (!formParams?.consultancy_id || !formParams?.consultancy_id.trim().length)) {
      errorParams.consultancy_id = true;
      showErrorBorder = true;
    }
    if (role_name !== "super_admin" && (!formParams?.role_id || !formParams?.role_id.trim().length)) {
      errorParams.role_id = true;
      showErrorBorder = true;
    }
    if (role_name === "client_user" && (!formParams?.client_id || !formParams?.role_id.trim().length)) {
      errorParams.clien_id = true;
      showErrorBorder = true;
    }
    if (formParams?.password && !formParams?.password_confirm) {
      showErrorBorder = true;
      errorParams.confirmPassword = true;
    }
    if (formParams?.password && formParams?.password_confirm && formParams?.password !== formParams?.password_confirm) {
      confirmPasswordErrorMessage = "confirm password not matching";
      showErrorBorder = true;
      errorParams.confirmPassword = false;
    }
    setState({
      showErrorBorder,
      errorParams,
      confirmPasswordErrorMessage
    });

    if (showErrorBorder) return false;
    return true;
  };

  const cancelForm = () => {
    if (id) history.push(`/usersdemo/userinfo/${id}/basicdetails`);
    history.push("/usersdemo");
  };

  const checkEmailExist = async () => {
    if (formParams.email.trim().length && emailExp.test(formParams?.email.trim())) {
      dispatch(getExistingUsers({ email: formParams?.email }));
      if (existingEmailResponse && existingEmailResponse?.result) {
        ToastMsg("User Already Exists!", "error");
      }
    }
  };

  const handleAddAttachment = e => setState({ ...state, formParams: { ...formParams, image: e.target.files[0] } });

  const handleSubmitUser = () => {
    if (id) {
      if (validate()) {
        let params = new FormData();
        params.append("user[name]", formParams.name);
        params.append("user[image_description]", formParams.image_description);
        params.append("user[email]", formParams.email);
        if (formParams.password && formParams.password.length) {
          params.append("user[password]", formParams.password);
        }
        if (formParams.password_confirm && formParams.password_confirm.length) {
          params.append("user[password_confirm]", formParams.password_confirm);
        }
        params.append("user[permission_id]", formParams.permission_id);
        params.append("user[first_name]", formParams.first_name);
        params.append("user[last_name]", formParams.last_name);
        params.append("user[printed_name]", formParams.printed_name);
        params.append("user[title]", formParams.title);
        params.append("user[work_phone]", formParams.work_phone);
        params.append("user[cell_phone]", formParams.cell_phone);
        params.append("user[room_number]", formParams.room_number);
        params.append("user[room_name]", formParams.room_name);
        params.append("user[emergency_contact_no]", formParams.emergency_contact_no);
        params.append("user[emergency_contact_name]", formParams.emergency_contact_name);
        params.append("user[notes]", formParams.notes);
        params.append("user[address]", formParams.address);
        params.append("user[state]", formParams.state);
        params.append("user[city]", formParams.city);
        params.append("user[zip_code]", formParams.zip_code);
        params.append("user[department]", formParams.department);
        params.append("user[credentials]", formParams.credentials);
        params.append("user[location]", formParams.location);
        params.append("user[role_id]", formParams.role_id);
        params.append("user[building_name]", formParams.building_name);
        params.append("user[cmms_username]", formParams.cmms_username);
        params.append("user[consultancy_id]", formParams.consultancy_id);
        params.append("user[role_id]", formParams.role_id);
        params.append("user[client_id]", formParams.client_id);
        params.append("user[view_only]", formParams.view_only);
        params.append("user[is_active]", formParams.is_active);
        params.append("user[reports]", formParams.reports ? JSON.stringify(formParams.reports.map(item => item.id)) : JSON.stringify([]));
        params.append("user[escalation]", formParams.escalation ? JSON.stringify(formParams.escalation.map(item => item.id)) : JSON.stringify([]));
        if (selectedImage && selectedImage?.name !== formParams?.image?.name) {
          params.append("user[image]", formParams?.image);
        } else if (!formParams?.image_id && formParams?.image) {
          params.append("user[image]", formParams?.image);
        }
        dispatch(editUsersById(params, id));
      }
    } else {
      if (validate()) {
        let params = new FormData();
        params.append("user[name]", formParams.name);
        params.append("user[image_description]", formParams.image_description);
        params.append("user[image]", formParams.image);
        params.append("user[email]", formParams.email);
        params.append("user[password]", formParams.password);
        params.append("user[password_confirm]", formParams.password_confirm);
        params.append("user[permission_id]", formParams.permission_id);
        params.append("user[first_name]", formParams.first_name);
        params.append("user[last_name]", formParams.last_name);
        params.append("user[printed_name]", formParams.printed_name);
        params.append("user[title]", formParams.title);
        params.append("user[work_phone]", formParams.work_phone);
        params.append("user[cell_phone]", formParams.cell_phone);
        params.append("user[room_number]", formParams.room_number);
        params.append("user[room_name]", formParams.room_name);
        params.append("user[emergency_contact_no]", formParams.emergency_contact_no);
        params.append("user[emergency_contact_name]", formParams.emergency_contact_name);
        params.append("user[notes]", formParams.notes);
        params.append("user[address]", formParams.address);
        params.append("user[state]", formParams.state);
        params.append("user[city]", formParams.city);
        params.append("user[zip_code]", formParams.zip_code);
        params.append("user[department]", formParams.department);
        params.append("user[credentials]", formParams.credentials);
        params.append("user[location]", formParams.location);
        params.append("user[role_id]", formParams.role_id);
        params.append("user[building_name]", formParams.building_name);
        params.append("user[cmms_username]", formParams.cmms_username);
        params.append("user[consultancy_id]", formParams.consultancy_id);
        params.append("user[role_id]", formParams.role_id);
        params.append("user[client_id]", formParams.client_id);
        params.append("user[view_only]", formParams.view_only);
        params.append("user[is_active]", formParams.is_active);
        params.append("user[reports]", formParams.reports ? JSON.stringify(formParams.reports.map(item => item.id)) : JSON.stringify([]));
        params.append("user[escalation]", formParams.escalation ? JSON.stringify(formParams.escalation.map(item => item.id)) : JSON.stringify([]));
        dispatch(addUsers(params));
      }
    }
  };

  if (addUsersData.success) {
    ToastMsg(addUsersData.message, "info");
    history.push("/usersdemo");
    dispatch(resetValue());
  } else {
    if (editUsersByIdReducer.success) {
      ToastMsg(editUsersByIdReducer.message, "info");
      history.push("/usersdemo");
      dispatch(resetValue());
    }
  }

  return (
    <section className="cont-ara act-main">
      <div className="list-area">
        <ToastContainer />
        <TopSlider />
        <ReactTooltip />
        <div className="lst-bt-nav create">
          <div className="table table-ara">
            <div className="list-sec">
              <div className="nav-ara">
                <div className="head">
                  <h4>{selectedUser ? "Edit" : "Add"} User </h4>
                </div>
              </div>
            </div>
            <form autoComplete="off">
              <div className="cr-frm">
                <div className="col-md-9">
                  <div className="form-area">
                    <div className="itm">
                      <div className="form-group">
                        <label className={showErrorBorder && errorParams.name ? "text-red" : ""}>User Name *</label>
                        <input
                          type="text"
                          id="text"
                          value={formParams?.name}
                          onChange={e => setState({ ...state, formParams: { ...formParams, name: e.target.value } })}
                          className="form-control"
                          placeholder="User Name"
                          autocomplete="off"
                        />
                      </div>
                    </div>
                    <div className="itm">
                      <div className="form-group">
                        <label className={`form-control-placeholder`}>First Name</label>
                        <input
                          type="text"
                          value={formParams?.first_name}
                          onChange={e => setState({ ...state, formParams: { ...formParams, first_name: e.target.value } })}
                          className="form-control"
                          placeholder="First Name"
                          autocomplete="off"
                        />
                      </div>
                    </div>
                    <div className="itm">
                      <div className="form-group">
                        <label className={`form-control-placeholder`}>Last Name</label>
                        <input
                          type="text"
                          value={formParams?.last_name}
                          onChange={e => setState({ ...state, formParams: { ...formParams, last_name: e.target.value } })}
                          className="form-control"
                          placeholder="Last Name"
                          autocomplete="off"
                        />
                      </div>
                    </div>
                    <div className="itm">
                      <div className="form-group">
                        <label className={`form-control-placeholder`}>Printed Name</label>
                        <input
                          type="text"
                          value={formParams?.printed_name}
                          onChange={e => setState({ ...state, formParams: { ...formParams, printed_name: e.target.value } })}
                          className="form-control"
                          placeholder="Printed Name"
                          autocomplete="off"
                        />
                      </div>
                    </div>
                    <div className="itm">
                      <div className="form-group">
                        <label className={showErrorBorder && errorParams.email ? "text-red" : ""}>Email *</label>
                        <input
                          type="text"
                          value={formParams?.email}
                          onChange={e => setState({ ...state, formParams: { ...formParams, email: e.target.value } })}
                          onBlur={() => checkEmailExist()}
                          autocomplete="off"
                          className="form-control"
                          placeholder="Email"
                        />
                      </div>
                    </div>
                    {currentUser !== userId ? (
                      <>
                        <div className="itm">
                          <div className="form-group">
                            <label className={showErrorBorder && errorParams.password ? "text-red" : ""}>
                              Password *
                              <span
                                class="material-icons"
                                data-multiline={true}
                                data-tip={
                                  "Password must contain minimum 6 characters , 1 Special character , 1 number & Combination of upper and lower case letters"
                                }
                              >
                                info
                              </span>
                            </label>
                            <input
                              type="password"
                              value={formParams?.password}
                              autocomplete="new-password"
                              onChange={e => setState({ ...state, formParams: { ...formParams, password: e.target.value } })}
                              className="form-control"
                              placeholder="Password"
                            />
                          </div>
                        </div>
                        <div className="itm">
                          <div className="form-group">
                            <label className={showErrorBorder && errorParams.confirmPassword ? "text-red" : ""}>Confirm Password *</label>
                            <input
                              type="password"
                              value={formParams?.password_confirm}
                              autocomplete="new-password"
                              onChange={e => setState({ ...state, formParams: { ...formParams, password_confirm: e.target.value } })}
                              className="form-control"
                              placeholder="Confirm Password"
                            />
                            {showErrorBorder && confirmPasswordErrorMessage ? <div className="text-red">{confirmPasswordErrorMessage}</div> : null}
                          </div>
                        </div>
                        <div className="itm">
                          <div className="form-group">
                            <label className={`${showErrorBorder && errorParams.consultancy_id ? "text-red " : ""}form-control-placeholder`}>
                              Consultancy *
                            </label>
                            <div className="custom-selecbox">
                              <select
                                className="custom-selecbox form-control"
                                value={formParams?.consultancy_id}
                                onChange={e => selectConsultancyId(e.target.value)}
                                autocomplete="off"
                              >
                                <option value="">Select</option>
                                {consultancyDropdownData.data?.length &&
                                  consultancyDropdownData.data?.map((item, idex) => {
                                    return (
                                      <option key={idex} value={item.id}>
                                        {item.name}
                                      </option>
                                    );
                                  })}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="itm">
                          <div className="form-group">
                            <label className={`${showErrorBorder && errorParams.role_id ? "text-red " : ""}form-control-placeholder`}>Role *</label>
                            <div className="custom-selecbox">
                              <select
                                className="custom-selecbox form-control"
                                value={formParams?.role_id}
                                autocomplete="off"
                                onChange={e => handleSelectRoleName(e.target.value)}
                              >
                                <option value="">Select</option>
                                {roleDropdownData?.data?.length &&
                                  roleDropdownData?.data?.map((item, idex) => {
                                    return (
                                      <option key={idex} value={item.id}>
                                        {item.name}
                                      </option>
                                    );
                                  })}
                              </select>
                            </div>
                          </div>
                        </div>
                        {role_name === "client_user" ? (
                          <div className="itm">
                            <div className="form-group">
                              <label className={`${showErrorBorder && errorParams.client_id ? "text-red " : ""}form-control-placeholder`}>
                                Client *
                              </label>
                              <div className="custom-selecbox">
                                <select
                                  className="form-control custom-selecbox"
                                  value={formParams?.client_id}
                                  onChange={e => setState({ ...state, formParams: { ...formParams, client_id: e.target.value } })}
                                  autocomplete="off"
                                >
                                  <option value="">Select</option>
                                  {clientDropdownData.data &&
                                    clientDropdownData.data.map((item, idex) => {
                                      return (
                                        <option key={idex} value={item.id}>
                                          {item.name}
                                        </option>
                                      );
                                    })}
                                </select>
                              </div>
                            </div>
                          </div>
                        ) : null}
                        <div className="itm">
                          <div className="form-group">
                            <label className={`form-control-placeholder`}>User Permission</label>
                            <div className="custom-selecbox">
                              <select
                                className="form-control custom-selecbox"
                                value={formParams?.permission_id}
                                onChange={e => setState({ ...state, formParams: { ...formParams, permission_id: e.target.value } })}
                                autocomplete="off"
                              >
                                <option value="">Select</option>
                                {userPermissionDropdownResponse?.permissions &&
                                  userPermissionDropdownResponse?.permissions.map((item, idex) => {
                                    return (
                                      <option key={idex} value={item.id}>
                                        {item.name}
                                      </option>
                                    );
                                  })}
                                <option value="view_only_surveyor">Surveyor (View Only)</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="itm">
                          <div className="form-group">
                            <label className={`form-control-placeholder`}>Reports</label>
                            <Multiselect
                              options={reportsList}
                              selectedValues={formParams?.reports}
                              onSelect={onReportSelect}
                              onRemove={onReportRemove}
                              placeholder={"Select Reports"}
                              displayValue="name"
                              showCheckbox={true}
                              showArrow={true}
                              closeOnSelect={false}
                            />
                          </div>
                        </div>
                        <div className="itm">
                          <div className="form-group">
                            <label className={`form-control-placeholder`}>Escalations</label>
                            <Multiselect
                              options={escalationsList}
                              selectedValues={formParams?.escalation}
                              onSelect={onEscalationSelect}
                              onRemove={onEscalationRemove}
                              placeholder={"Select Escalations"}
                              displayValue="name"
                              showCheckbox={true}
                              showArrow={true}
                              closeOnSelect={false}
                            />
                          </div>
                        </div>
                        <div className="itm">
                          <div className="form-group">
                            <label className={`form-control-placeholder`}>Title</label>
                            <input
                              type="text"
                              value={formParams?.title}
                              onChange={e => setState({ ...state, formParams: { ...formParams, title: e.target.value } })}
                              autocomplete="off"
                              className="form-control"
                              placeholder="Title"
                            />
                          </div>
                        </div>
                        <div className="itm">
                          <div className="form-group">
                            <label className={`form-control-placeholder`}>Department</label>
                            <input
                              type="text"
                              value={formParams?.department}
                              onChange={e => setState({ ...state, formParams: { ...formParams, department: e.target.value } })}
                              autocomplete="off"
                              className="form-control"
                              placeholder="Department"
                            />
                          </div>
                        </div>
                      </>
                    ) : null}
                    <div className="itm">
                      <div className="form-group">
                        <label className={`form-control-placeholder`}>Work Phone</label>
                        <NumberFormat
                          autoComplete="nope"
                          value={formParams?.work_phone}
                          decimalScale={0}
                          className="form-control"
                          placeholder="Work Phone"
                          format="(###) ###-####"
                          onValueChange={values => {
                            const { value } = values;
                            setState({ ...state, formParams: { ...formParams, work_phone: value } });
                          }}
                        />
                      </div>
                    </div>
                    <div className="itm">
                      <div className="form-group">
                        <label className={`form-control-placeholder`}>Cell Phone</label>
                        <NumberFormat
                          autoComplete="nope"
                          value={formParams?.cell_phone}
                          decimalScale={0}
                          className="form-control"
                          placeholder="Cell Phone"
                          format="(###) ###-####"
                          onValueChange={values => {
                            const { value } = values;
                            setState({ ...state, formParams: { ...formParams, cell_phone: value } });
                          }}
                        />
                      </div>
                    </div>
                    {currentUser !== userId ? (
                      <>
                        <div className="itm">
                          <div className="form-group">
                            <label className={`form-control-placeholder`}>Building Name</label>
                            <input
                              type="text"
                              autocomplete="off"
                              value={formParams?.building_name}
                              onChange={e => setState({ ...state, formParams: { ...formParams, building_name: e.target.value } })}
                              className="form-control"
                              placeholder="Building Name"
                            />
                          </div>
                        </div>
                        <div className="itm">
                          <div className="form-group">
                            <label className={`form-control-placeholder`}>Room Number</label>
                            <input
                              type="text"
                              value={formParams?.room_number}
                              onChange={e => setState({ ...state, formParams: { ...formParams, room_number: e.target.value } })}
                              className="form-control"
                              placeholder="Room Number"
                              autocomplete="off"
                            />
                          </div>
                        </div>
                        <div className="itm">
                          <div className="form-group">
                            <label className={`form-control-placeholder`}>Room Name</label>
                            <input
                              type="text"
                              value={formParams?.room_name}
                              onChange={e => setState({ ...state, formParams: { ...formParams, room_name: e.target.value } })}
                              className="form-control"
                              placeholder="Room Name"
                              autocomplete="off"
                            />
                          </div>
                        </div>
                        <div className="itm">
                          <div className="form-group">
                            <label className={`form-control-placeholder`}>City</label>
                            <input
                              type="text"
                              value={formParams?.city}
                              onChange={e => setState({ ...state, formParams: { ...formParams, city: e.target.value } })}
                              className="form-control"
                              placeholder="City"
                              autocomplete="off"
                            />
                          </div>
                        </div>
                        <div className="itm">
                          <div className="form-group">
                            <label className={`form-control-placeholder`}>Location</label>
                            <input
                              type="text"
                              value={formParams?.location}
                              onChange={e => setState({ ...state, formParams: { ...formParams, location: e.target.value } })}
                              className="form-control"
                              placeholder="Location"
                              autocomplete="off"
                            />
                          </div>
                        </div>
                        <div className="itm">
                          <div className="form-group">
                            <label className={`form-control-placeholder`}>State</label>
                            <input
                              type="text"
                              value={formParams?.state}
                              onChange={e => setState({ ...state, formParams: { ...formParams, state: e.target.value } })}
                              className="form-control"
                              placeholder="State"
                              autocomplete="off"
                            />
                          </div>
                        </div>
                        <div className="itm">
                          <div className="form-group">
                            <label className={`form-control-placeholder`}>Zip Code</label>
                            <NumberFormat
                              autoComplete="nope"
                              value={formParams?.zip_code}
                              decimalScale={0}
                              className="form-control"
                              placeholder="Zip Code"
                              onValueChange={values => {
                                const { value } = values;
                                setState({ ...state, formParams: { ...formParams, room_number: value } });
                              }}
                            />
                          </div>
                        </div>
                        <div className="itm">
                          <div className="form-group">
                            <label className={`form-control-placeholder`}>Address</label>
                            <input
                              type="text"
                              value={formParams?.address}
                              onChange={e => setState({ ...state, formParams: { ...formParams, address: e.target.value } })}
                              className="form-control"
                              placeholder="Address"
                              autocomplete="off"
                            />
                          </div>
                        </div>
                        <div className="itm">
                          <div className="form-group">
                            <label className={`form-control-placeholder`}>Emergency Contact Number</label>
                            <NumberFormat
                              autoComplete="nope"
                              value={formParams?.emergency_contact_no}
                              decimalScale={0}
                              className="form-control"
                              placeholder="Emergency Contact Number"
                              format="(###) ###-####"
                              onValueChange={values => {
                                const { value } = values;
                                setState({ ...state, formParams: { ...formParams, emergency_contact_no: value } });
                              }}
                            />
                          </div>
                        </div>
                        <div className="itm">
                          <div className="form-group">
                            <label className={`form-control-placeholder`}>Emergency Contact Name</label>
                            <input
                              type="text"
                              value={formParams?.emergency_contact_name}
                              onChange={e => setState({ ...state, formParams: { ...formParams, emergency_contact_name: e.target.value } })}
                              className="form-control"
                              placeholder="Emergency Contact Name"
                              autocomplete="off"
                            />
                          </div>
                        </div>
                        <div className="itm">
                          <label>View Only</label>
                          <div className="chek">
                            <div className="chekbox-sec">
                              <label className="container">
                                Yes
                                <input
                                  type="radio"
                                  name="view_only"
                                  value="yes"
                                  onChange={e => setState({ ...state, formParams: { ...formParams, view_only: e.target.value } })}
                                  checked={formParams?.view_only === "yes"}
                                />
                                <span className="checkmark"></span>
                              </label>
                              <label className="container">
                                No
                                <input
                                  type="radio"
                                  name="is_active"
                                  value="no"
                                  onChange={e => setState({ ...state, formParams: { ...formParams, view_only: e.target.value } })}
                                  checked={formParams?.view_only === "no"}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="itm">
                          <div className="form-group">
                            <label>Is Active?</label>
                            <div className="custom-selecbox">
                              <select
                                className="custom-selecbox form-control"
                                value={formParams?.is_active}
                                onChange={e => setState({ ...state, formParams: { ...formParams, is_active: e.target.value } })}
                              >
                                <option value="yes">YES</option>
                                <option value="no">NO</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : null}
                    <div className="itm">
                      <div className="form-group">
                        <label className={`form-control-placeholder`}>Notes</label>
                        <input
                          type="text"
                          value={formParams?.notes}
                          onChange={e => setState({ ...state, formParams: { ...formParams, notes: e.target.value } })}
                          className="form-control"
                          placeholder="Notes"
                          autocomplete="off"
                        />
                      </div>
                    </div>
                    <div className="itm">
                      <label>isActive ?</label>
                      <div className="chek">
                        <div className="chekbox-sec">
                          <label className="container">
                            Yes
                            <input
                              type="radio"
                              name="is_active"
                              value="yes"
                              onChange={e => setState({ ...state, formParams: { ...formParams, is_active: e.target.value } })}
                              checked={formParams?.is_active === "yes"}
                            />
                            <span className="checkmark"></span>
                          </label>
                          <label className="container">
                            No
                            <input
                              type="radio"
                              name="is_active"
                              value="no"
                              onChange={e => setState({ ...state, formParams: { ...formParams, is_active: e.target.value } })}
                              checked={formParams?.is_active === "no"}
                            />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 pl-0">
                  <div className="file-upload">
                    {formParams?.image && formParams?.image.url === null ? (
                      <img src="/images/add-img.svg" alt="" />
                    ) : formParams?.image ? (
                      <>
                        <img src={formParams?.image.url ? formParams?.image.url : URL.createObjectURL(formParams?.image)} alt="" />
                      </>
                    ) : (
                      <img src="/images/add-img.svg" alt="" />
                    )}
                    <div className="btn-upload">
                      <input type="file" id="attachmentFiles" name="profilePic" onChange={handleAddAttachment} />
                      <img src="/images/add-btn.svg" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="btn-sec">
                <button type="button" className="btn btn-cncl-back mr-2" onClick={() => cancelForm()}>
                  <i className="material-icons tic"> close</i>Cancel
                </button>
                <button type="button" className="btn btn-create" onClick={() => handleSubmitUser()}>
                  <i className="material-icons tic"> check</i>
                  {state.selectedUser ? "Update" : "Add"} User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserForm;
