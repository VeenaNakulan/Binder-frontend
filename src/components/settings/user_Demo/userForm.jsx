import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import NumberFormat from "react-number-format";
import ReactTooltip from "react-tooltip";
import { Multiselect } from "multiselect-react-dropdown";

import TopSlider from "../../common/components/TopSlider";
import { useDispatch, useSelector } from "react-redux";
import { reportsList } from "../../../config/utils";

const UserForm = props => {
    const dispatch = useDispatch();
    const { consultancyDropdownData, clientDropdownData, userPermissionDropdownResponse, roleDropdownData } = useSelector(
        ({ settingsCommonReducer }) => settingsCommonReducer
    );

    const [state, setState] = useState({
        selectedUser: props.match.params.id,
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
            is_active: "yes"
        },
        errorParams: {
            name: false,
            role_id: false,
            consultancy_id: false,
            confirmPassword: false
        },
        showErrorBorder: false,
        confirmPasswordErrorMessage: "",
        role_name: ""
    });

    let { formParams, errorParams, showErrorBorder, confirmPasswordErrorMessage, role_name } = state;
    let currentUser = props.match.params.id || "";
    let userId = localStorage.getItem("user_id");

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
                                    <h4>{state.selectedUser ? "Edit" : "Add"} User </h4>
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
                                                    onChange={e => {
                                                        this.setState({
                                                            formParams: {
                                                                ...formParams,
                                                                name: e.target.value
                                                            }
                                                        });
                                                    }}
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
                                                    value={formParams.first_name}
                                                    onChange={e => {
                                                        this.setState({
                                                            formParams: {
                                                                ...formParams,
                                                                first_name: e.target.value
                                                            }
                                                        });
                                                    }}
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
                                                    value={formParams.last_name}
                                                    onChange={e => {
                                                        this.setState({
                                                            formParams: {
                                                                ...formParams,
                                                                last_name: e.target.value
                                                            }
                                                        });
                                                    }}
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
                                                    value={formParams.printed_name}
                                                    onChange={e => {
                                                        this.setState({
                                                            formParams: {
                                                                ...formParams,
                                                                printed_name: e.target.value
                                                            }
                                                        });
                                                    }}
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
                                                    value={formParams.email}
                                                    onChange={async e => {
                                                        await this.setState({
                                                            formParams: {
                                                                ...formParams,
                                                                email: e.target.value
                                                            }
                                                        });
                                                    }}
                                                    onBlur={() => this.checkEmailExist()}
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
                                                            value={formParams.password}
                                                            autocomplete="new-password"
                                                            onChange={e => {
                                                                this.setState({
                                                                    formParams: {
                                                                        ...formParams,
                                                                        password: e.target.value
                                                                    }
                                                                });
                                                            }}
                                                            className="form-control"
                                                            placeholder="Password"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="itm">
                                                    <div className="form-group">
                                                        <label className={showErrorBorder && errorParams.confirmPassword ? "text-red" : ""}>
                                                            Confirm Password *
                                                        </label>
                                                        <input
                                                            type="password"
                                                            value={formParams.password_confirm}
                                                            autocomplete="new-password"
                                                            onChange={e => {
                                                                this.setState({
                                                                    formParams: {
                                                                        ...formParams,
                                                                        password_confirm: e.target.value
                                                                    }
                                                                });
                                                            }}
                                                            className="form-control"
                                                            placeholder="Confirm Password"
                                                        />
                                                        {showErrorBorder && confirmPasswordErrorMessage ? (
                                                            <div className="text-red">{confirmPasswordErrorMessage}</div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                                <div className="itm">
                                                    <div className="form-group">
                                                        <label
                                                            className={`${
                                                                showErrorBorder && errorParams.consultancy_id ? "text-red " : ""
                                                            }form-control-placeholder`}
                                                        >
                                                            Consultancy *
                                                        </label>
                                                        <div className="custom-selecbox">
                                                            <select
                                                                className="custom-selecbox form-control"
                                                                value={formParams.consultancy_id}
                                                                onChange={e => this.selectConsultancyId(e.target.value)}
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
                                                        <label
                                                            className={`${
                                                                showErrorBorder && errorParams.role_id ? "text-red " : ""
                                                            }form-control-placeholder`}
                                                        >
                                                            Role *
                                                        </label>
                                                        <div className="custom-selecbox">
                                                            <select
                                                                className="custom-selecbox form-control"
                                                                value={formParams.role_id}
                                                                autocomplete="off"
                                                                onChange={async e => {
                                                                    await this.setState({
                                                                        formParams: {
                                                                            ...formParams,
                                                                            role_id: e.target.value
                                                                        }
                                                                    });
                                                                    await this.handleSelectRoleName(this.formParams.role_id);
                                                                }}
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
                                                            <label
                                                                className={`${
                                                                    showErrorBorder && errorParams.client_id ? "text-red " : ""
                                                                }form-control-placeholder`}
                                                            >
                                                                Client *
                                                            </label>
                                                            <div className="custom-selecbox">
                                                                <select
                                                                    className="form-control custom-selecbox"
                                                                    value={formParams.client_id}
                                                                    onChange={e => {
                                                                        this.setState({
                                                                            formParams: {
                                                                                ...formParams,
                                                                                client_id: e.target.value
                                                                            }
                                                                        });
                                                                    }}
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
                                                                value={formParams.permission_id}
                                                                onChange={e => {
                                                                    this.setState({
                                                                        formParams: {
                                                                            ...formParams,
                                                                            permission_id: e.target.value
                                                                        }
                                                                    });
                                                                }}
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
                                                            // options={reportsList}
                                                            // selectedValues={formParams.reports}
                                                            // onSelect={this.onReportSelect}
                                                            // onRemove={this.onReportRemove}
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
                                                            // options={escalationsList}
                                                            // selectedValues={formParams.escalation}
                                                            // onSelect={this.onEscalationSelect}
                                                            // onRemove={this.onEscalationRemove}
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
                                                            value={formParams.title}
                                                            onChange={e => {
                                                                this.setState({
                                                                    formParams: {
                                                                        ...formParams,
                                                                        title: e.target.value
                                                                    }
                                                                });
                                                            }}
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
                                                            value={formParams.department}
                                                            onChange={e => {
                                                                this.setState({
                                                                    formParams: {
                                                                        ...formParams,
                                                                        department: e.target.value
                                                                    }
                                                                });
                                                            }}
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
                                                    value={formParams.work_phone}
                                                    // thousandSeparator={true}
                                                    decimalScale={0}
                                                    className="form-control"
                                                    placeholder="Work Phone"
                                                    format="(###) ###-####"
                                                    onValueChange={values => {
                                                        const { value } = values;
                                                        this.setState({
                                                            formParams: {
                                                                ...formParams,
                                                                work_phone: value
                                                            }
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="itm">
                                            <div className="form-group">
                                                <label className={`form-control-placeholder`}>Cell Phone</label>
                                                <NumberFormat
                                                    autoComplete="nope"
                                                    value={formParams.cell_phone}
                                                    decimalScale={0}
                                                    className="form-control"
                                                    placeholder="Cell Phone"
                                                    format="(###) ###-####"
                                                    onValueChange={values => {
                                                        const { value } = values;
                                                        this.setState({
                                                            formParams: {
                                                                ...formParams,
                                                                cell_phone: value
                                                            }
                                                        });
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
                                                            value={formParams.building_name}
                                                            onChange={e => {
                                                                this.setState({
                                                                    formParams: {
                                                                        ...formParams,
                                                                        building_name: e.target.value
                                                                    }
                                                                });
                                                            }}
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
                                                            value={formParams.room_number}
                                                            onChange={e => {
                                                                this.setState({
                                                                    formParams: {
                                                                        ...formParams,
                                                                        room_number: e.target.value
                                                                    }
                                                                });
                                                            }}
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
                                                            value={formParams.room_name}
                                                            onChange={e => {
                                                                this.setState({
                                                                    formParams: {
                                                                        ...formParams,
                                                                        room_name: e.target.value
                                                                    }
                                                                });
                                                            }}
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
                                                            value={formParams.city}
                                                            onChange={e => {
                                                                this.setState({
                                                                    formParams: {
                                                                        ...formParams,
                                                                        city: e.target.value
                                                                    }
                                                                });
                                                            }}
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
                                                            value={formParams.location}
                                                            onChange={e => {
                                                                this.setState({
                                                                    formParams: {
                                                                        ...formParams,
                                                                        location: e.target.value
                                                                    }
                                                                });
                                                            }}
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
                                                            value={formParams.state}
                                                            onChange={e => {
                                                                this.setState({
                                                                    formParams: {
                                                                        ...formParams,
                                                                        state: e.target.value
                                                                    }
                                                                });
                                                            }}
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
                                                            value={formParams.zip_code}
                                                            decimalScale={0}
                                                            className="form-control"
                                                            placeholder="Zip Code"
                                                            onValueChange={values => {
                                                                const { value } = values;
                                                                this.setState({
                                                                    formParams: {
                                                                        ...formParams,
                                                                        zip_code: value
                                                                    }
                                                                });
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="itm">
                                                    <div className="form-group">
                                                        <label className={`form-control-placeholder`}>Address</label>
                                                        <input
                                                            type="text"
                                                            value={formParams.address}
                                                            onChange={e => {
                                                                this.setState({
                                                                    formParams: {
                                                                        ...formParams,
                                                                        address: e.target.value
                                                                    }
                                                                });
                                                            }}
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
                                                            value={formParams.emergency_contact_no}
                                                            decimalScale={0}
                                                            className="form-control"
                                                            placeholder="Emergency Contact Number"
                                                            format="(###) ###-####"
                                                            onValueChange={values => {
                                                                const { value } = values;
                                                                this.setState({
                                                                    formParams: {
                                                                        ...formParams,
                                                                        emergency_contact_no: value
                                                                    }
                                                                });
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="itm">
                                                    <div className="form-group">
                                                        <label className={`form-control-placeholder`}>Emergency Contact Name</label>
                                                        <input
                                                            type="text"
                                                            value={formParams.emergency_contact_name}
                                                            onChange={e => {
                                                                this.setState({
                                                                    formParams: {
                                                                        ...formParams,
                                                                        emergency_contact_name: e.target.value
                                                                    }
                                                                });
                                                            }}
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
                                                                    onChange={async e => {
                                                                        await this.setState({
                                                                            formParams: {
                                                                                ...formParams,
                                                                                view_only: e.target.value
                                                                            }
                                                                        });
                                                                    }}
                                                                    checked={formParams.view_only === "yes"}
                                                                />
                                                                <span className="checkmark"></span>
                                                            </label>
                                                            <label className="container">
                                                                No
                                                                <input
                                                                    type="radio"
                                                                    name="is_active"
                                                                    value="no"
                                                                    onChange={async e => {
                                                                        await this.setState({
                                                                            formParams: {
                                                                                ...formParams,
                                                                                view_only: e.target.value
                                                                            }
                                                                        });
                                                                    }}
                                                                    checked={formParams.view_only === "no"}
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
                                                                value={formParams.is_active}
                                                                onChange={e =>
                                                                    this.setState({
                                                                        formParams: {
                                                                            ...formParams,
                                                                            is_active: e.target.value
                                                                        }
                                                                    })
                                                                }
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
                                                    value={formParams.notes}
                                                    onChange={e => {
                                                        this.setState({
                                                            formParams: {
                                                                ...formParams,
                                                                notes: e.target.value
                                                            }
                                                        });
                                                    }}
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
                                                            onChange={async e => {
                                                                await this.setState({
                                                                    formParams: {
                                                                        ...formParams,
                                                                        is_active: e.target.value
                                                                    }
                                                                });
                                                            }}
                                                            checked={formParams.is_active === "yes"}
                                                        />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                    <label className="container">
                                                        No
                                                        <input
                                                            type="radio"
                                                            name="is_active"
                                                            value="no"
                                                            onChange={async e => {
                                                                await this.setState({
                                                                    formParams: {
                                                                        ...formParams,
                                                                        is_active: e.target.value
                                                                    }
                                                                });
                                                            }}
                                                            checked={formParams.is_active === "no"}
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
                                        {formParams.image && formParams.image.url === null ? (
                                            <img src="/images/add-img.svg" alt="" />
                                        ) : formParams.image ? (
                                            <>
                                                <img
                                                    src={formParams.image.url ? formParams.image.url : URL.createObjectURL(formParams.image)}
                                                    alt=""
                                                />
                                            </>
                                        ) : (
                                            <img src="/images/add-img.svg" alt="" />
                                        )}

                                        <div className="btn-upload">
                                            <input
                                                type="file"
                                                id="attachmentFiles"
                                                name="profilePic"
                                                // onChange={this.handleAddAttachment}
                                            />
                                            <img src="/images/add-btn.svg" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="btn-sec">
                                <button type="button" className="btn btn-cncl-back mr-2" onClick={() => this.cancelForm()}>
                                    <i className="material-icons tic"> close</i>Cancel
                                </button>
                                {state.selectedUser ? (
                                    <button type="button" className="btn btn-create" onClick={() => this.updateUser()}>
                                        <i className="material-icons tic"> check</i> Update User
                                    </button>
                                ) : (
                                    <button type="button" className="btn btn-create" onClick={() => this.addUser()}>
                                        <i className="material-icons tic"> check</i> Add User
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* {this.renderConfirmationModal()} */}
        </section>
    );
};

export default UserForm;
