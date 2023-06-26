import React, { useEffect, useState } from "react";
import _ from "lodash";
import Highlighter from "react-highlight-words";

import BuildModalHeader from "../../../common/components/BuildModalHeader";
import ConfirmationModal from "../../../common/components/ConfirmationModal";
import ToastMsg from "../../../common/ToastMessage";
import Portal from "../../../common/components/Portal";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../common/actions";

const UpdateBuildingLogbookAssignmentModal = props => {
  const dispatch = useDispatch();
  const { onCancel, user_id } = props;

  const { getAssignBuildingLogbookToUserPopupDetailsResponse, assignBuildingLogbookToUserResponse } = useSelector(
    ({ commonReducer }) => commonReducer
  );

  const { available_building_logbooks, assigned_building_logbooks } = getAssignBuildingLogbookToUserPopupDetailsResponse;

  const [state, setState] = useState({
    activeTab: 1,
    showCurrentAssignmentModal: false,
    user: null,
    available_building_logbooks: [],
    initial_assigned_building_logbooks: [],
    user_ids: [],
    showConfirmation: false,
    availableSearchKey: "",
    assignedSearchKey: "",
    showCancelConfirmModal: false,
    assigned_building_logbooks: []
  });

  const {
    user,
    activeTab,
    user_ids,
    showConfirmation,
    availableSearchKey,
    assignedSearchKey,
    showCancelConfirmModal,
    initial_assigned_building_logbooks
  } = state;

  useEffect(() => {
    getAssignBuildingLogbookForUserPopupDetails();
  }, [getAssignBuildingLogbookToUserPopupDetailsResponse]);

  useEffect(() => {
    dispatch(actions.getAssignBuildingLogbookToUserPopupDetails(user_id));
  }, []);

  const getAssignBuildingLogbookForUserPopupDetails = () => {
    const { success } = getAssignBuildingLogbookToUserPopupDetailsResponse;
    if (success) {
      setState({
        ...state,
        user,
        assigned_building_logbooks,
        available_building_logbooks,
        initial_assigned_building_logbooks: assigned_building_logbooks?.map(item => item.id),
        user_ids: assigned_building_logbooks?.map(item => item.id)
      });
    }
    return true;
  };

  const updateAssignedList = async (type, id) => {
    const { assigned_building_logbooks, available_building_logbooks } = state;
    let itemObj = {};
    let tempAssignedBuildingLogbooks = assigned_building_logbooks;
    let tempAvailableBuildingLogbooks = available_building_logbooks;
    let tempLogbookIds = [];

    if (id === "all") {
      if (type === "add") {
        tempAvailableBuildingLogbooks.map(item => tempAssignedBuildingLogbooks.push(item));
        tempAvailableBuildingLogbooks = [];
      } else {
        tempAssignedBuildingLogbooks.map(item => tempAvailableBuildingLogbooks.push(item));
        tempAssignedBuildingLogbooks = [];
      }
    } else {
      if (type === "add") {
        itemObj = available_building_logbooks.find(item => item.id === id);
        tempAssignedBuildingLogbooks.push(itemObj);
        tempAvailableBuildingLogbooks = tempAvailableBuildingLogbooks.filter(item => item.id !== id);
      } else {
        itemObj = assigned_building_logbooks.find(item => item.id === id);
        tempAvailableBuildingLogbooks.push(itemObj);
        tempAssignedBuildingLogbooks = tempAssignedBuildingLogbooks.filter(item => item.id !== id);
      }
    }
    tempAssignedBuildingLogbooks = _.uniqBy(tempAssignedBuildingLogbooks, "id");
    tempAvailableBuildingLogbooks = _.uniqBy(tempAvailableBuildingLogbooks, "id");
    tempLogbookIds = tempAssignedBuildingLogbooks.map(item => item.id);

    setState({
      ...state,
      assigned_building_logbooks: tempAssignedBuildingLogbooks,
      available_building_logbooks: tempAvailableBuildingLogbooks,
      user_ids: tempLogbookIds
    });
  };

  const searchInAvailable = availableSearchKey => {
    const { assigned_building_logbooks } = state;
    const assignedBuildingLogbookIds = assigned_building_logbooks?.map(item => item.id);
    let result = available_building_logbooks.filter(item => !assignedBuildingLogbookIds.includes(item.id));

    const searchKey = availableSearchKey
      .trim()
      .toLowerCase()
      .replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    if (searchKey.length) {
      result = result.filter(({ building, campus, client, deeming_agency, name, sector }) =>
        [building, campus, client, deeming_agency, name, sector].some(value => value && value.toLowerCase().includes(searchKey))
      );
    }

    setState({ ...state, availableSearchKey, available_building_logbooks: result });
  };

  const searchInAssigned = async assignedSearchKey => {
    const { available_building_logbooks } = state;
    let availableBuildingIds = available_building_logbooks?.map(item => item.id);
    let result = assigned_building_logbooks.filter(item => !availableBuildingIds.includes(item.id));
    const searchKey = assignedSearchKey
      .trim()
      .toLowerCase()
      .replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    if (searchKey.length) {
      result = result.filter(({ building, client, deeming_agency, sector, campus, name }) =>
        [building, client, deeming_agency, sector, campus, name].some(value => value && value.toLowerCase().includes(searchKey))
      );
    }
    setState({ ...state, assignedSearchKey, assigned_building_logbooks: result });
  };

  const togglShowConfirmation = () => {
    setState({ ...state, showConfirmation: !showConfirmation });
  };

  const updateAsignedLogbooksForuser = async () => {
    if (_.isEqual(initial_assigned_building_logbooks.sort(), user_ids.sort())) {
      onCancel();
      ToastMsg("Building Logbooks Assigned Successfully", "info");
    } else {
      togglShowConfirmation();
    }
  };

  const onUpdateUsersConfirm = () => {
    if (!_.isEqual(initial_assigned_building_logbooks.sort(), user_ids.sort())) {
      dispatch(actions.assignBuildingLogbookToUser(user_id, user_ids));

      const { success, message } = assignBuildingLogbookToUserResponse;
      if (success) {
        getAssignBuildingLogbookForUserPopupDetails();
        dispatch(actions.updateAssignPopUpApiTrigger({ isTrigger: true }));
        togglShowConfirmation();
        onCancel();
      }
      ToastMsg(message, "info");
    }
    return true;
  };

  const cancelModal = () => {
    if (showCancelConfirmModal) {
      setState({ ...state, showCancelConfirmModal: false });
      onCancel();
    } else if (initial_assigned_building_logbooks?.sort().join(",") !== user_ids?.sort().join(",")) {
      setState({ ...state, showCancelConfirmModal: true });
    } else {
      onCancel();
    }
  };

  return (
    <React.Fragment>
      <div className="modal assigned-build-modal three-col-modal" role="dialog" style={{ display: "block" }} id="modalId">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <BuildModalHeader title="Assign Building Logbooks For User" onCancel={cancelModal} modalClass="assigned-build-modal" />
            <h5 className="ml-4">{user && user.name}</h5>
            <div className="modal-body">
              <div className="outer-act-build list-sec">
                <div className="build-tem2 addWidthHalf">
                  <h4>Available Building Logbooks</h4>
                  <div className="outer-avl-bind">
                    <div className="sr-sec search-section">
                      <div className="sr-out">
                        <input
                          type="text"
                          className="form-control"
                          onChange={e => searchInAvailable(e.target.value)}
                          placeholder="Search"
                          value={availableSearchKey}
                        />
                        <span className="clear-btn" onClick={() => (availableSearchKey.trim().length ? searchInAvailable("") : null)}>
                          Clear
                        </span>
                      </div>
                    </div>
                    <div className="table-section">
                      <table className="table table-bordered file-system-table">
                        <thead>
                          <tr>
                            <th className="img-sq-box">
                              <span className="material-icons icon-arw" onClick={() => updateAssignedList("add", "all")}>
                                height
                              </span>
                            </th>
                            <th>Building Logbook</th>
                            <th>Client</th>
                            <th>Deeming Agency</th>
                            <th>Sector</th>
                            <th>Campus</th>
                            <th>Building</th>
                          </tr>
                        </thead>
                        <tbody>
                          {state.available_building_logbooks && state.available_building_logbooks.length ? (
                            state.available_building_logbooks?.map((item, i) => (
                              <tr key={i}>
                                <td className="img-sq-box">
                                  <span
                                    className="material-icons icon-arw"
                                    onClick={() => updateAssignedList("add", item.id, "available_building_logbooks")}
                                  >
                                    height
                                  </span>
                                </td>
                                <td>
                                  <Highlighter searchWords={[`${availableSearchKey}`]} textToHighlight={item.name || ""} className="highlighter" />
                                </td>
                                <td>
                                  <Highlighter searchWords={[`${availableSearchKey}`]} textToHighlight={item.client || ""} className="highlighter" />
                                </td>
                                <td>
                                  <Highlighter
                                    searchWords={[`${availableSearchKey}`]}
                                    textToHighlight={item.deeming_agency || ""}
                                    className="highlighter"
                                  />
                                </td>
                                <td>
                                  <Highlighter searchWords={[`${availableSearchKey}`]} textToHighlight={item.sector || ""} className="highlighter" />
                                </td>
                                <td>
                                  <Highlighter searchWords={[`${availableSearchKey}`]} textToHighlight={item.campus || ""} className="highlighter" />
                                </td>
                                <td>
                                  <Highlighter
                                    searchWords={[`${availableSearchKey}`]}
                                    textToHighlight={item.building || ""}
                                    className="highlighter"
                                  />
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="7" className="text-center">
                                No Records Found !!
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="popup-counter">Count : {available_building_logbooks ? available_building_logbooks.length : 0}</div>
                </div>
                <div className="build-tem3 addWidthHalf">
                  <h4>Assigned Building Logbooks</h4>
                  <div className="outer-avl-bind">
                    <div className="sr-sec search-section">
                      <div className="sr-out">
                        <input
                          type="text"
                          onChange={e => searchInAssigned(e.target.value)}
                          className="form-control"
                          placeholder="Search"
                          value={assignedSearchKey}
                        />
                        <span className="clear-btn" onClick={() => (assignedSearchKey.trim().length ? searchInAssigned("") : null)}>
                          Clear
                        </span>
                      </div>
                    </div>
                    <div className="table-section">
                      <table className="table table-bordered file-system-table">
                        <thead>
                          <tr>
                            <th className="img-sq-box">
                              <span className="material-icons icon-arw" onClick={() => updateAssignedList("remove", "all")}>
                                height
                              </span>
                            </th>
                            <th>Building Logbook</th>
                            <th className="sel-all">Client</th>
                            <th>Deeming Agency</th>
                            <th>Sector</th>
                            <th>Campus</th>
                            <th>Building</th>
                          </tr>
                        </thead>
                        <tbody>
                          {state.assigned_building_logbooks && state.assigned_building_logbooks.length ? (
                            state.assigned_building_logbooks.map((item, i) => (
                              <tr key={i}>
                                <td className="img-sq-box">
                                  <span className="material-icons icon-arw" onClick={() => updateAssignedList("remove", item.id)}>
                                    height
                                  </span>
                                </td>
                                <td>
                                  <Highlighter searchWords={[`${assignedSearchKey}`]} textToHighlight={item.name || ""} className="highlighter" />
                                </td>
                                <td>
                                  <Highlighter searchWords={[`${assignedSearchKey}`]} textToHighlight={item.client || ""} className="highlighter" />
                                </td>
                                <td>
                                  <Highlighter
                                    searchWords={[`${assignedSearchKey}`]}
                                    textToHighlight={item.deeming_agency || ""}
                                    className="highlighter"
                                  />
                                </td>
                                <td>
                                  <Highlighter searchWords={[`${assignedSearchKey}`]} textToHighlight={item.sector || ""} className="highlighter" />
                                </td>
                                <td>
                                  <Highlighter searchWords={[`${assignedSearchKey}`]} textToHighlight={item.campus || ""} className="highlighter" />
                                </td>
                                <td>
                                  <Highlighter searchWords={[`${assignedSearchKey}`]} textToHighlight={item.building || ""} className="highlighter" />
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="7" className="text-center">
                                No Records Found !!
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="popup-counter">Count : {assigned_building_logbooks ? assigned_building_logbooks.length : 0}</div>
                </div>
              </div>

              <div className={`btn-sec ${activeTab === 2 ? "btn-survey-sec" : ""}`}>
                <div className="btn-out-1">
                  <button className="btn btn-create mr-2" onClick={updateAsignedLogbooksForuser}>
                    <i className="material-icons tic"> check</i> Update
                  </button>
                  <button className="btn btn-cncl-back" onClick={cancelModal}>
                    <i className="material-icons tic"> close</i>Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showConfirmation ? (
          <Portal
            body={<ConfirmationModal onCancel={togglShowConfirmation} onOk={onUpdateUsersConfirm} heading={"Update Assignment?"} />}
            onCancel={togglShowConfirmation}
          />
        ) : null}

        {showCancelConfirmModal ? (
          <Portal
            body={
              <ConfirmationModal
                heading={"Do you want to clear and lose all changes?"}
                paragraph={"This action cannot be reverted, are you sure that you need to cancel?"}
                onCancel={() => setState({ ...state, showCancelConfirmModal: false })}
                onOk={cancelModal}
              />
            }
            onCancel={() => setState({ ...state, showCancelConfirmModal: false })}
          />
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default UpdateBuildingLogbookAssignmentModal;
