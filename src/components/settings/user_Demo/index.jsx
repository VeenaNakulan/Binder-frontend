import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingOverlay from "react-loading-overlay";

import history from "../../../config/history";
import { getUsers } from "./actions";

import TopSlider from "../../../components/common/components/TopSlider";
import Loader from "../../common/components/Loader";
import CommonTable from "../../../components/common/components/CommonTable";
import TableTopHeader from "../../../components/common/components/TableTopHeader";
import { userTableData } from "./components/tableConfig";
import Pagination from "../../../components/common/components/Pagination";

const Index = props => {
    const dispatch = useDispatch();
    const { usersData } = useSelector(({ userdemoReducer }) => userdemoReducer);
    const { isLoading, setIsLoading } = props;
    const [state, setState] = useState({
        showViewModal: false,
        selectedUser: props.match.params.id,
        params: {
            limit: 20,
            page: 1,
            filters: null,
            search: "",
            offset: 0,
            list: null
        },
        paginationParams: {
            perPage: 20,
            currentPage: 0,
            totalCount: 0,
            totalPages: 0
        },
        showWildCardFilter: false
    });
    const { params, paginationParams, showWildCardFilter } = state;
    userTableData.data = usersData.users;

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

    useEffect(() => {
        if (usersData.success) {
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

    const showAddForm = () => {
        const { history } = props;
        setState({
            ...state,
            selectedUser: null
        });
        history.push("/usersdemo/add");
    };

    const handlePerPageChange = e => {
        setState({
            ...state,
            paginationParams: {
                ...paginationParams,
                perPage: e.target.value,
                currentPage: 0
            },
            params: {
                ...state.params,
                page: 1,
                limit: e.target.value
            }
        });
    };

    const handlePageClick = page => {
        setState({
            ...state,
            paginationParams: {
                ...paginationParams,
                currentPage: page.selected
            },
            params: {
                ...params,
                page: page.selected + 1
            }
        });
    };

    const updateWildCardFilter = newFilter => {
        setState({
            ...state,
            params: {
                ...params,
                offset: 0,
                filters: newFilter
            }
        });
    };
    const resetWildCardFilter = () => {
        setState({
            ...state,
            params: {
                ...params,
                filters: null,
                list: null,
                search: ""
            },
            showWildCardFilter: false
        });
    };

    const resetAllFilters = () => {
        setState({
            ...state,
            params: {
                ...params,
                limit: 40,
                page: 1,
                search: "",
                filters: null,
                list: null
            }
        });
    };

    return (
        <React.Fragment>
            <section className="cont-ara">
                <LoadingOverlay active={isLoading} spinner={<Loader />}>
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
                                />
                                <div className="list-sec">
                                    <div className="table-section">
                                        <CommonTable
                                            tableData={userTableData}
                                            showWildCardFilter={showWildCardFilter}
                                            tableParams={params}
                                            updateWildCardFilter={updateWildCardFilter}
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
                </LoadingOverlay>
            </section>
        </React.Fragment>
    );
};

export default Index;
