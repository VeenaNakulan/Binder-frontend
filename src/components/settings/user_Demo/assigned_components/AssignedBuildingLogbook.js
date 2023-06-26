import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import { getUserBuildingLogbook } from "../actions.js";
import Pagination from "../../../common/components/Pagination";
import TopSlider from "../../../common/components/TopSlider.jsx";
import ViewFrequency from "../../userBuildingLogbook/viewFrequency.jsx";
import TableTopHeader from "../../../common/components/TableTopHeader.jsx";
import CommonTable from "../../../common/components/CommonTable.jsx";
import { userBuildingLogbookTableData } from "../../../../config/tableConfig.js";

const AssignedBuildingLogbook = () => {
  const dispatch = useDispatch();
  const { userBuildingLogbookData } = useSelector(({ userdemoReducer }) => userdemoReducer);
  const { id, section } = useParams();
  userBuildingLogbookTableData.data = userBuildingLogbookData?.building_logbook_users;
  const [state, setState] = useState({
    showConfirmation: false,
    selectedItem: null,
    params: { limit: 20, page: 1, filters: null, search: "", offset: 0, list: null, order: null },
    paginationParams: { perPage: 20, currentPage: 0, totalCount: 0, totalPages: 0 },
    showViewModal: false,
    selectedUserBuilding: id,
    showWildCardFilter: false,
    showViewModal: false,
    loading: true
  });

  useEffect(() => {
    dispatch(getUserBuildingLogbook({ user_id: id }));
  }, []);

  const getUserBuildingLogbookData = () => {
    const { params, paginationParams } = state;
    const {
      match: {
        params: { id = null }
      }
    } = this.props;
    let responseData = [];
    dispatch(getUserBuildingLogbook({ ...state.params, user_id: id }));
    responseData = this.props.userBuildingLogbookReducer.userBuildingLogbookData.building_logbook_users || [];
    const { tableData } = this.state;
    // if (this.props.userBuildingLogbookReducer.userBuildingLogbookData.success) {
    this.setState({
      tableData: {
        ...tableData,
        data: this.props.userBuildingLogbookReducer.userBuildingLogbookData.building_logbook_users
      },
      paginationParams: {
        ...paginationParams,
        totalCount: this.props.userBuildingLogbookReducer.userBuildingLogbookData.count,
        totalPages: Math.ceil(this.props.userBuildingLogbookReducer.userBuildingLogbookData.count / paginationParams.perPage)
      },
      showWildCardFilter: this.state.params.filters ? true : false
    });
    // }
  };

  return (
    <React.Fragment>
      {section === "userBuildingLogbookInfo" ? (
        <ViewFrequency keys={userBuildingLogbookTableData} config={userBuildingLogbookTableData.config} showTopButtons={true} />
      ) : (
        <section className="cont-ara">
          <div className="list-area">
            <TopSlider />
            <div className="lst-bt-nav">
              <div className="table table-ara">
                <TableTopHeader
                  entity={"User Building Logbook"}
                  // handleGlobalSearch={this.handleGlobalSearch}
                  globalSearchKey={state.params.search}
                  // resetSort={this.resetSort}
                  tableParams={state.params}
                  // showViewModal={this.showViewModal}
                  // exportTable={this.exportTable}
                  // toggleFilter={this.toggleFilter}
                  // showWildCardFilter={showWildCardFilter}
                  // resetAllFilters={this.resetAllFilters}
                  // resetWildCardFilter={this.resetWildCardFilter}
                />
                <div className="list-sec">
                  <div className="table-section">
                    <CommonTable tableData={userBuildingLogbookTableData} tableParams={state.params} />
                  </div>
                </div>
              </div>
              <Pagination
                paginationParams={state.paginationParams}
                // handlePageClick={this.handlePageClick}
                // handlePerPageChange={this.handlePerPageChange}
                isRecordPerPage={true}
              />
            </div>
          </div>
        </section>
      )}
    </React.Fragment>
  );
};

export default AssignedBuildingLogbook;
