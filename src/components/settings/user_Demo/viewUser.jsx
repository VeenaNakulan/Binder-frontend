import React, { useEffect, useState } from "react";

import history from "../../../config/history";
import CommonView from "../../common/components/CommonView";
import CommonViewTabs from "../../common/components/CommonViewTabs";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const ViewUser = props => {
  const params = useParams();
  const { tab, id } = params;
  const { infoTabsData, keys, config, showInfoPage, getDataById, deleteItem } = props;

  const [state, setState] = useState({ basicDetails: {} });

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

  return (
    <React.Fragment>
      <div className="fst">
        <CommonViewTabs tabData={infoTabsData} goBack={goBack} item={state.basicDetails} keys={keys} config={config} currentTab={tab} />
        {tab === "basicdetails" ? (
          <CommonView item={state.basicDetails} keys={keys} config={config} goBack={goBack} tabData={infoTabsData} deleteItem={deleteItem} />
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default ViewUser;
