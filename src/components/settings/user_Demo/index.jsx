import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingOverlay from "react-loading-overlay";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import history from "../../../config/history";
import { deleteUsers, getUsers, getUsersById, getAllUsersLogs } from "./actions";
import ToastMsg from "../../common/ToastMessage";
import ConfirmationModal from "../../../components/common/components/ConfirmationModal";
import Portal from "../../common/components/Portal";
import TopSlider from "../../../components/common/components/TopSlider";
import Loader from "../../common/components/Loader";
import CommonTable from "../../../components/common/components/CommonTable";
import TableTopHeader from "../../../components/common/components/TableTopHeader";
import { userTableData } from "./components/tableConfig";
import Pagination from "../../../components/common/components/Pagination";
import ViewUser from "./viewUser";
import { checkPermission } from "../../../config/utils";

const Index = props => {
  const dispatch = useDispatch();
  const { isLoading, setIsLoading } = props;
  const Params = useParams();
  const { section } = Params;
  const [state, setState] = useState({
    showViewModal: false,
    selectedUser: "",
    params: { limit: 20, page: 1, filters: null, search: "", offset: 0, list: null, order: null },
    paginationParams: { perPage: 20, currentPage: 0, totalCount: 0, totalPages: 0 },
    showWildCardFilter: false,
    infoTabsData: [],
    showConfirmation: false,
    logData: { count: "", data: [] },
    selectedItem: null
  });
  const { params, paginationParams, showWildCardFilter, infoTabsData, showConfirmation, logData } = state;

  const { usersData, deleteUser, getAllUsersLogResponse } = useSelector(({ userdemoReducer }) => userdemoReducer);

  userTableData.data = usersData?.users;

  useEffect(() => {
    dispatch(getUsers());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const getUser = () => {
      setIsLoading(true);
      let master_filters = JSON.parse(localStorage.getItem("master_filters"));
      dispatch(getUsers({ ...params, ...master_filters }));
    };
    getUser();
  }, [params]);

  const getLogData = id => {
    dispatch(getAllUsersLogs(params, id));
  };

  useEffect(() => {
    const { logs, count } = getAllUsersLogResponse;
    setState({
      ...state,
      logData: { ...logData, data: logs }
    });
  }, [getAllUsersLogResponse]);

  useEffect(() => {
    if (usersData?.success) {
      setIsLoading(false);
      setState(prevState => ({
        ...prevState,
        paginationParams: {
          ...prevState.paginationParams,
          totalCount: usersData?.count,
          totalPages: Math.ceil(usersData?.count / prevState.paginationParams?.perPage)
        }
      }));
    }
  }, [usersData]);

  useEffect(() => {
    if (deleteUser?.success) {
      ToastMsg(deleteUser?.message, "info");
      if (section === "userinfo") history.push("/usersdemo");
      dispatch(getUsers());
    }
  }, [deleteUser]);

  const showAddForm = () => {
    setState({ ...state, selectedUser: null });
    history.push("/usersdemo/add");
  };

  const handlePerPageChange = e => {
    setState({
      ...state,
      paginationParams: { ...paginationParams, perPage: e.target.value, currentPage: 0 },
      params: { ...state.params, page: 1, limit: e.target.value }
    });
  };

  const handlePageClick = page => {
    setState({ ...state, paginationParams: { ...paginationParams, currentPage: page.selected }, params: { ...params, page: page.selected + 1 } });
  };

  const updateWildCardFilter = newFilter => setState({ ...state, params: { ...params, offset: 0, filters: newFilter } });

  const resetWildCardFilter = () => {
    setState({ ...state, params: { ...params, filters: null, list: null, search: "" }, showWildCardFilter: false });
  };

  const resetAllFilters = () => {
    setState({
      ...state,
      params: { ...params, limit: 40, page: 1, search: "", filters: null, list: null },
      paginationParams: { totalPages: 0, perPage: 40, currentPage: 0, totalCount: 0 },
      showWildCardFilter: false
    });
  };

  const handleGlobalSearch = search => setState({ ...state, params: { ...params, page: 1, search } });

  const updateTableSortFilters = async searchKey => {
    if (params.order) {
      setState({
        ...state,
        params: { ...params, order: { ...params.order, [searchKey]: params.order[searchKey] === "desc" ? "asc" : "desc" } }
      });
    } else {
      setState({ ...state, params: { ...params, order: { [searchKey]: "asc" } } });
    }
  };

  const resetSort = () => setState({ ...state, params: { ...params, order: null } });

  const showInfoPage = id => {
    setState({
      ...state,
      selectedUser: id,
      infoTabsData: [
        { label: "Basic Details", path: `/usersdemo/userinfo/${id}/basicdetails`, key: "basicdetails" },
        { label: "Assigned Buildings", path: `/usersdemo/userinfo/${id}/assignedbuilding`, key: "assignedbuilding" },
        { label: "Assigned Building Logbooks", path: `/usersdemo/userinfo/${id}/assignedbuildinglogbook`, key: "assignedbuildinglogbook" }
      ]
    });
    history.push(`/usersdemo/userinfo/${id}/${Params && Params.tab ? Params.tab : "basicdetails"}`);
  };

  const getData = async id => {
    const { user } = await dispatch(getUsersById(id));
    return { user };
  };

  const showEditPage = id => {
    setState({ ...state, selectedUser: id });
    history.push(`/usersdemo/edit/${id}`);
  };

  const togglShowConfirmation = () => {
    setState({ ...state, showConfirmation: !showConfirmation });
  };

  const deleteItemConfirm = id => {
    setState({ ...state, selectedUser: id, showConfirmation: !showConfirmation });
  };

  const deleteItem = () => {
    togglShowConfirmation();
    dispatch(deleteUsers(state.selectedUser));
  };

  return (
    <React.Fragment>
      {showConfirmation ? (
        <Portal
          body={
            <ConfirmationModal
              onCancel={togglShowConfirmation}
              onOk={deleteItem}
              heading={"Do you want to delete ?"}
              paragraph={"This action cannot be reverted, are you sure that you need to delete this item ?"}
            />
          }
        />
      ) : null}

      <section className="cont-ara">
        <LoadingOverlay active={isLoading} spinner={<Loader />}>
          {section === "userinfo" ? (
            <ViewUser
              keys={userTableData.keys}
              config={userTableData.config}
              infoTabsData={infoTabsData}
              showInfoPage={showInfoPage}
              getDataById={getData}
              deleteItem={deleteItemConfirm}
              getLogData={getLogData}
              logData={logData}
              hasBuildingAssign={checkPermission("assign", "users", "buildings")}
              hasLogbookAssign={checkPermission("assign", "users", "logbooks")}
            />
          ) : (
            <div className="list-area">
              <TopSlider />
              <div className="lst-bt-nav">
                <div className="table table-ara">
                  <TableTopHeader
                    entity={"User"}
                    tableParams={params}
                    addItem={showAddForm}
                    toggleFilter={() => setState({ ...state, showWildCardFilter: !showWildCardFilter })}
                    resetAllFilters={resetAllFilters}
                    showWildCardFilter={showWildCardFilter}
                    resetWildCardFilter={resetWildCardFilter}
                    handleGlobalSearch={handleGlobalSearch}
                    globalSearchKey={params?.search}
                    resetSort={resetSort}
                  />
                  <div className="list-sec">
                    <div className="table-section">
                      <CommonTable
                        tableData={userTableData}
                        showWildCardFilter={showWildCardFilter}
                        tableParams={params}
                        updateWildCardFilter={updateWildCardFilter}
                        showInfoPage={showInfoPage}
                        hasSort={true}
                        updateTableSortFilters={updateTableSortFilters}
                        editItem={showEditPage}
                        deleteItem={deleteItemConfirm}
                      />
                    </div>
                  </div>
                </div>
                <Pagination
                  paginationParams={paginationParams}
                  handlePageClick={handlePageClick}
                  handlePerPageChange={handlePerPageChange}
                  isRecordPerPage={true}
                />
              </div>
            </div>
          )}
        </LoadingOverlay>
      </section>
    </React.Fragment>
  );
};

export default Index;
