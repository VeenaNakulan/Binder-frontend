import React, { useEffect, useState } from "react";
import _ from "lodash";
import Highlighter from "react-highlight-words";

import BuildModalHeader from "../../../common/components/BuildModalHeader";
import ConfirmationModal from "../../../common/components/ConfirmationModal";
import ToastMsg from "../../../common/ToastMessage";
import Portal from "../../../common/components/Portal";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../common/actions";

const UpdateBuildingAssignmentModal = props => {
  const dispatch = useDispatch();
  const { user_id, onCancel } = props;
  const { getAssignBuildingToUserPopupDetailsResponse, assignBuildingToUserResponse } = useSelector(({ commonReducer }) => commonReducer);

  const { available_buildings, assigned_buildings } = getAssignBuildingToUserPopupDetailsResponse;
  const [state, setState] = useState({
    activeTab: 1,
    showCurrentAssignmentModal: false,
    user: null,
    initial_assigned_buildings: [],
    consultancy_users: [],
    currentAssignments: [],
    user_ids: [],
    showConfirmation: false,
    availableSearchKey: "",
    assignedSearchKey: "",
    showCancelConfirmModal: false
  });
  const { activeTab, user, availableSearchKey, assignedSearchKey, initial_assigned_buildings, user_ids, showCancelConfirmModal, showConfirmation } =
    state;

  useEffect(() => {
    getAssignBuildingLogbookForUserPopupDetails();
  }, []);

  const getAssignBuildingLogbookForUserPopupDetails = async () => {
    dispatch(actions.getAssignBuildingToUserPopupDetails(user_id));
    const { user, success } = getAssignBuildingToUserPopupDetailsResponse;
    if (success) {
      setState({
        ...state,
        user,
        initial_assigned_buildings: assigned_buildings.map(item => item.id),
        user_ids: assigned_buildings.map(item => item.id)
      });
    }
    return true;
  };

  const searchInAvailable = availableSearchKey => {
    let assignedBuildingIds = assigned_buildings?.map(item => item.id);
    let result = available_buildings?.filter(item => !assignedBuildingIds?.includes(item.id));
    if (availableSearchKey.trim().length) {
      result = result.filter(
        ({ consultancy, client, deeming_agency, sector, campus, name }) =>
          (consultancy && consultancy.toLowerCase().includes(availableSearchKey.toLowerCase())) ||
          (client && client.toLowerCase().includes(availableSearchKey.toLowerCase())) ||
          (deeming_agency && deeming_agency.toLowerCase().includes(availableSearchKey.toLowerCase())) ||
          (sector && sector.toLowerCase().includes(availableSearchKey.toLowerCase())) ||
          (campus && campus.toLowerCase().includes(availableSearchKey.toLowerCase())) ||
          (name && name.toLowerCase().includes(availableSearchKey.toLowerCase()))
      );
    }
    setState({ ...state, availableSearchKey, available_buildings: result });
  };

  const cancelModal = () => {
    if (showCancelConfirmModal) {
      setState({ ...state, showCancelConfirmModal: false });
      onCancel();
    } else if (!_.isEqual(initial_assigned_buildings?.sort(), user_ids?.sort())) {
      setState({ ...state, showCancelConfirmModal: true });
    } else {
      onCancel();
    }
  };

  const searchInAssigned = async assignedSearchKey => {
    let availableBuildingIds = available_buildings.map(item => item.id);
    let result = assigned_buildings.filter(item => !availableBuildingIds.includes(item.id));
    if (assignedSearchKey.trim().length) {
      result = result.filter(
        ({ consultancy, client, deeming_agency, sector, campus, name }) =>
          (consultancy && consultancy.toLowerCase().includes(assignedSearchKey.toLowerCase())) ||
          (client && client.toLowerCase().includes(assignedSearchKey.toLowerCase())) ||
          (deeming_agency && deeming_agency.toLowerCase().includes(assignedSearchKey.toLowerCase())) ||
          (sector && sector.toLowerCase().includes(assignedSearchKey.toLowerCase())) ||
          (campus && campus.toLowerCase().includes(assignedSearchKey.toLowerCase())) ||
          (name && name.toLowerCase().includes(assignedSearchKey.toLowerCase()))
      );
    }
    setState({ ...state, assignedSearchKey, assigned_buildings: result });
  };

  const updateAsignedLogbooksForuser = () => {
    const sortedInitialAssignedBuildings = initial_assigned_buildings?.sort();
    const sortedUserIds = user_ids?.sort();
    const arraysAreEqual = sortedInitialAssignedBuildings.every((value, index) => value === sortedUserIds[index]);
    if (arraysAreEqual) {
      onCancel();
      ToastMsg("Building Logbooks Assigned Successfully", "info");
    } else {
      togglShowConfirmation();
    }
  };

  const onUpdateUsersConfirm = () => {
    const sortedInitialAssignedBuildings = initial_assigned_buildings?.sort();
    const sortedUserIds = user_ids?.sort();
    const arraysAreEqual = sortedInitialAssignedBuildings?.every((value, index) => value === sortedUserIds[index]);
    if (!arraysAreEqual) {
      dispatch(actions.assignBuildingToUser(user_id, user_ids));
      const { success, message } = assignBuildingToUserResponse;
      if (success) {
        dispatch(actions.getAssignBuildingToUserPopupDetails());
        dispatch(actions.updateAssignPopUpApiTrigger({ isTrigger: true }));
        togglShowConfirmation();
        onCancel();
      }
      ToastMsg(message, "info");
    }
    return true;
  };

  const togglShowConfirmation = () => {
    setState({ ...state, showConfirmation: !showConfirmation });
  };

  const updateAssignedList = (type, id) => {
    let itemObj = {};
    let tempAssignedBuildings = available_buildings;
    let tempAvailableBuildings = assigned_buildings;
    let tempBuildingIds = [];

    if (id === "all") {
      if (type === "add") {
        tempAvailableBuildings.map(item => tempAssignedBuildings.push(item));
        tempAvailableBuildings = [];
      } else {
        tempAssignedBuildings.map(item => tempAvailableBuildings.push(item));
        tempAssignedBuildings = [];
      }
    } else {
      if (type === "add") {
        itemObj = available_buildings.find(item => item.id === id);
        tempAssignedBuildings.push(itemObj);
        tempAvailableBuildings = tempAvailableBuildings.filter(item => item.id !== id);
      } else {
        itemObj = assigned_buildings.find(item => item.id === id);
        tempAvailableBuildings.push(itemObj);
        tempAssignedBuildings = tempAssignedBuildings.filter(item => item.id !== id);
      }
    }
    tempAssignedBuildings = _.uniqBy(tempAssignedBuildings, "id");
    tempAvailableBuildings = _.uniqBy(tempAvailableBuildings, "id");
    tempBuildingIds = tempAssignedBuildings.map(item => item.id);

    setState({ ...state, assigned_buildings: tempAssignedBuildings, available_buildings: tempAvailableBuildings, user_ids: tempBuildingIds });
  };
  return (
    <React.Fragment>
      <div className="modal assigned-build-modal three-col-modal" role="dialog" style={{ display: "block" }} id="modalId">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <BuildModalHeader title="Assign Buildings For User" onCancel={cancelModal} modalClass="assigned-build-modal" />
            <h5 className="ml-4">{user && user.name}</h5>
            <div className="modal-body">
              <div className="outer-act-build list-sec">
                <div className="build-tem2 addWidthHalf">
                  <h4>Available Buildings</h4>
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
                            <th>Consultancy</th>
                            <th>Client</th>
                            <th>DA</th>
                            <th>Sector</th>
                            <th>Campus</th>
                            <th>Building</th>
                          </tr>
                        </thead>
                        <tbody>
                          {available_buildings && available_buildings.length ? (
                            available_buildings.map((item, i) => (
                              <tr key={i}>
                                <td className="img-sq-box">
                                  <span className="material-icons icon-arw" onClick={() => updateAssignedList("add", item.id, "available_buildings")}>
                                    height
                                  </span>
                                </td>
                                <td>
                                  <Highlighter
                                    searchWords={[`${availableSearchKey}`]}
                                    textToHighlight={item.consultancy || ""}
                                    className="highlighter"
                                  />
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
                                  <Highlighter searchWords={[`${availableSearchKey}`]} textToHighlight={item.name || ""} className="highlighter" />
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
                  <div className="popup-counter">Count : {available_buildings ? available_buildings.length : 0}</div>
                </div>
                <div className="build-tem3 addWidthHalf">
                  <h4>Assigned Buildings</h4>
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
                            <th>Consultancy</th>
                            <th>Client</th>
                            <th>DA</th>
                            <th>Sector</th>
                            <th>Campus</th>
                            <th>Building</th>
                          </tr>
                        </thead>
                        <tbody>
                          {assigned_buildings && assigned_buildings.length ? (
                            assigned_buildings.map((item, i) => (
                              <tr key={i}>
                                <td className="img-sq-box">
                                  <span className="material-icons icon-arw" onClick={() => updateAssignedList("remove", item.id)}>
                                    height
                                  </span>
                                </td>
                                <td>
                                  <Highlighter
                                    searchWords={[`${assignedSearchKey}`]}
                                    textToHighlight={item.consultancy || ""}
                                    className="highlighter"
                                  />
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
                                  <Highlighter searchWords={[`${assignedSearchKey}`]} textToHighlight={item.name || ""} className="highlighter" />
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
                  <div className="popup-counter">Count : {assigned_buildings ? assigned_buildings.length : 0}</div>
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

export default UpdateBuildingAssignmentModal;
