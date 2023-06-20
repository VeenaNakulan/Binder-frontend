import React, { useEffect, useState } from "react";

import history from "../../../config/history";
import CommonView from "../../common/components/CommonView";
import CommonViewTabs from "../../common/components/CommonViewTabs";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Buildings from "../userBuilding/index";
import BuildingLogbook from "../userBuildingLogbook/index";

const ViewUser = props => {
  const params = useParams();
  const { tab, id } = params;
  const { infoTabsData, keys, config, getDataById, deleteItem, logData, getLogData, hasBuildingAssign, hasLogbookAssign } = props;

  const [state, setState] = useState({ basicDetails: {}, isLogView: false, selectedLog: "", logChanges: "", showConfirmModalLog: false });

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getDataById(id);
      if (userData) {
        setState({ ...state, basicDetails: userData.user });
      }
    };
    fetchData();
  }, [id]);

  const goBack = () => {
    history.push("/usersdemo");
  };
  const toggleViewPage = () => {
    setState({ ...state, isLogView: !state.isLogView });
  };
  const handleRestoreLog = (id, changes) => {
    setState({ ...state, showConfirmModalLog: true, selectedLog: id, logChanges: changes });
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
          />
        ) : tab === "assignedbuilding" ? (
          <div className="infoPageContent">
            <div className="frm-ara cmon-ara">
              <div className="head">
                <h3>&nbsp;</h3>
                {hasBuildingAssign ? (
                  <div className="btn-sec">
                    <button className="btn">
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
      </div>
    </React.Fragment>
  );
};

export default ViewUser;
