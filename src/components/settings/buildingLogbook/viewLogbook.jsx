import React, { Component } from "react";
import history from "../../../config/history";
import CommonView from "../../common/components/CommonView";
import { withRouter } from "react-router-dom";
import Portal from "../../common/components/Portal";
import ConfirmationModal from "../../common/components/ConfirmationModal";
import CommonViewTabs from "../../common/components/CommonViewTabs";
import ComingSoon from "../../common/components/ComingSoon";

class viewLogbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            basicDetails: {
                code: "",
                name: "",
                display_name: "",
                consultancy: "",
                client: "",
                sector: "",
                color: "",
                text_color: "",
                line: "",
                order: "",
                created_at: "",
                updated_at: "",
                client_logbook: "",
                is_active: ""
            },
            showConfirmModalLog: false,
            selectedLog: "",
            logChanges: "",
            isLogView: false
        };
    }

    componentDidMount = async () => {
        this.props.showInfoPage(this.props.match.params.id);
        await this.refreshinfoDetails();
    };

    componentDidUpdate = async (prevProps, prevState) => {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.props.showInfoPage(this.props.match.params.id);
            await this.refreshinfoDetails();
        }
    };

    refreshinfoDetails = async () => {
        let logbookData = await this.props.getDataById(this.props.match.params.id);
        if (logbookData && logbookData.success) {
            this.setState({
                basicDetails: {
                    code: logbookData.building_logbook.code,
                    name: logbookData.building_logbook.name,
                    display_name: logbookData.building_logbook.display_name,
                    created_at: logbookData.building_logbook.created_at,
                    updated_at: logbookData.building_logbook.updated_at,
                    order: logbookData.building_logbook.order,
                    line: logbookData.building_logbook.line,
                    color: logbookData.building_logbook.color,
                    text_color: logbookData.building_logbook.text_color,
                    client: logbookData.building_logbook.client,
                    consultancy: logbookData.building_logbook.consultancy,
                    sector: logbookData.building_logbook.sector,
                    client_logbook: logbookData.building_logbook.client_logbook,
                    campus: logbookData.building_logbook.campus,
                    is_active: logbookData.building_logbook.is_active
                }
            });
        }
        return true;
    };

    goBack = () => {
        history.go(-2);
    };

    handleRestoreLog = async (id, changes) => {
        await this.setState({
            showConfirmModalLog: true,
            selectedLog: id,
            logChanges: changes
        });
    };

    renderConfirmationModalLog = () => {
        const { showConfirmModalLog, logChanges } = this.state;
        if (!showConfirmModalLog) return null;
        return (
            <Portal
                body={
                    <ConfirmationModal
                        heading={"Do you want to restore this log?"}
                        paragraph={logChanges}
                        onCancel={() => this.setState({ showConfirmModalLog: false })}
                        onOk={this.restoreLogOnConfirm}
                        isRestore={true}
                        type={"restore"}
                        isLogRestore={true}
                    />
                }
                onCancel={() => this.setState({ showConfirmModalLog: false })}
            />
        );
    };

    restoreLogOnConfirm = async () => {
        const { selectedLog } = this.state;
        await this.props.HandleRestoreLog(selectedLog);
        this.setState({
            showConfirmModalLog: false,
            selectedLog: null,
            isLogView: false
        });
        await this.refreshinfoDetails();
    };

    toggleViewPage = async () => {
        await this.setState({ isLogView: !this.state.isLogView });
    };

    render() {
        const {
            keys,
            config,
            infoTabsData,
            deleteItem,
            showEditPage,
            getLogData,
            logData,
            handleDeleteLog,
            handlePageClickHistory,
            handleGlobalSearchHistory,
            globalSearchKeyHistory,
            historyPaginationParams,
            updateLogSortFilters,
            historyParams,
            match: {
                params: { tab }
            },
            showTopButtons,
            hasDelete = true
        } = this.props;

        const { basicDetails } = this.state;
        return (
            <React.Fragment>
                <section className="cont-ara">
                    <div className="fst">
                        <CommonViewTabs
                            tabData={infoTabsData}
                            goBack={this.goBack}
                            item={basicDetails}
                            keys={keys}
                            config={config}
                            currentTab={tab}
                        />
                        {tab === "basicdetails" ? (
                            <CommonView
                                item={basicDetails}
                                keys={keys}
                                config={config}
                                goBack={this.goBack}
                                tabData={infoTabsData}
                                editItem={showEditPage}
                                deleteItem={deleteItem}
                                getLogData={getLogData}
                                logData={logData}
                                handleDeleteLog={handleDeleteLog}
                                isLogView={this.state.isLogView}
                                toggleViewPage={this.toggleViewPage}
                                handleRestoreLog={this.handleRestoreLog}
                                handlePageClickHistory={handlePageClickHistory}
                                handleGlobalSearchHistory={handleGlobalSearchHistory}
                                globalSearchKeyHistory={globalSearchKeyHistory}
                                historyPaginationParams={historyPaginationParams}
                                updateLogSortFilters={updateLogSortFilters}
                                historyParams={historyParams}
                                showTopButtons={showTopButtons}
                                hasLogView={false}
                                hasEdit={false}
                                hasDelete={hasDelete}
                            />
                        ) : (
                            <div className="infoPageContent">
                                <ComingSoon />
                            </div>
                        )}
                    </div>
                </section>
                {this.renderConfirmationModalLog()}
            </React.Fragment>
        );
    }
}

export default withRouter(viewLogbook);
