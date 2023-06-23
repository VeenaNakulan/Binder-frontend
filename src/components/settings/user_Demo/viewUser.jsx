import React, { useEffect, useState } from "react";

import history from "../../../config/history";
import CommonView from "../../common/components/CommonView";
import CommonViewTabs from "../../common/components/CommonViewTabs";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Buildings from "../userBuilding/index";
import BuildingLogbook from "../userBuildingLogbook/index";
import ConfirmationModal from "../../../components/common/components/ConfirmationModal";
import Portal from "../../common/components/Portal";
import { useSelector } from "react-redux";

const ViewUser = props => {
  const params = useParams();
  const { restoreUsersLogResponse } = useSelector(({ userdemoReducer }) => userdemoReducer);

  const { tab, id } = params;
  const {
    infoTabsData,
    keys,
    config,
    getDataById,
    deleteItem,
    logData,
    getLogData,
    hasBuildingAssign,
    hasLogbookAssign,
    updateBuildingAssignment,
    updateBuildingLogbookAssignment,
    handleDeleteLog,
    updateLogSortFilters,
    historyPaginationParams,
    historyParams,
    handleGlobalSearchHistory,
    globalSearchKeyHistory,
    HandleRestoreLog
  } = props;

  const [state, setState] = useState({
    basicDetails: {},
    isLogView: false,
    selectedLog: "",
    logChanges: "",
    showConfirmModalLog: false
  });
  const fetchData = async () => {
    const userData = await getDataById(id);
    if (userData) {
      setState({ ...state, basicDetails: userData.user });
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    if (restoreUsersLogResponse.success) fetchData();
  }, [restoreUsersLogResponse]);

  const goBack = () => {
    history.push("/usersdemo");
  };
  const toggleViewPage = () => {
    setState({ ...state, isLogView: !state.isLogView });
  };
  const handleRestoreLog = (id, changes) => {
    setState({ ...state, showConfirmModalLog: true, selectedLog: id, logChanges: changes });
  };

  const refreshinfoDetails = async () => {
    const { user } = await getDataById(id);
    if (user && user?.success)
      setState({
        ...state,
        basicDetails: {
          ...state.basicDetails,
          role_id: user?.role?.id,
          consultancy_id: user?.consultancy?.id,
          client_id: user?.client?.id,
          permission_id: user?.permission?.id
        }
      });
    return true;
  };

  const restoreLogOnConfirm = () => {
    HandleRestoreLog(state.selectedLog);
    setState({ ...state, showConfirmModalLog: false, selectedLog: null, isLogView: false });
    refreshinfoDetails();
  };

  return (
    <React.Fragment>
      <div className="fst">
        <CommonViewTabs tabData={infoTabsData} goBack={goBack} item={state.basicDetails} keys={keys} config={config} currentTab={tab} />
        {tab === "basicdetails" ? (
          <CommonView
            item={state?.basicDetails}
            keys={keys}
            config={config}
            goBack={goBack}
            tabData={infoTabsData}
            deleteItem={deleteItem}
            logData={logData}
            isLogView={state?.isLogView}
            toggleViewPage={toggleViewPage}
            handleRestoreLog={handleRestoreLog}
            getLogData={getLogData}
            updateBuildingAssignment={updateBuildingAssignment}
            updateBuildingLogbookAssignment={updateBuildingLogbookAssignment}
            handleDeleteLog={handleDeleteLog}
            historyPaginationParams={historyPaginationParams}
            updateLogSortFilters={updateLogSortFilters}
            historyParams={historyParams}
            handleGlobalSearchHistory={handleGlobalSearchHistory}
            globalSearchKeyHistory={globalSearchKeyHistory}
          />
        ) : tab === "assignedbuilding" ? (
          <div className="infoPageContent">
            <div className="frm-ara cmon-ara">
              <div className="head">
                <h3>&nbsp;</h3>
                {hasBuildingAssign ? (
                  <div className="btn-sec">
                    <button className="btn" onClick={() => updateBuildingAssignment(id)}>
                      <img src="/images/assign.svg" alt="" />
                      Assign Buildings
                    </button>
                  </div>
                ) : null}
              </div>
              <Buildings />
            </div>
          </div>
        ) : tab === "assignedbuildinglogbook" ? (
          <div className="infoPageContent">
            <div className="frm-ara cmon-ara">
              <div className="head">
                <h3>&nbsp;</h3>
                {hasLogbookAssign ? (
                  <div className="btn-sec">
                    <button className="btn">
                      <img src="/images/assign.svg" alt="" />
                      Assign Building Logbooks
                    </button>
                  </div>
                ) : null}
              </div>
              <BuildingLogbook />
            </div>
          </div>
        ) : null}

        {state.showConfirmModalLog ? (
          <Portal
            body={
              <ConfirmationModal
                heading={"Do you want to restore this log?"}
                paragraph={state.logChanges}
                onCancel={() => setState({ ...state, showConfirmModalLog: false })}
                onOk={restoreLogOnConfirm}
                isRestore={true}
                type={"restore"}
                isLogRestore={true}
              />
            }
            onCancel={() => setState({ ...state, showConfirmModalLog: false })}
          />
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default ViewUser;
