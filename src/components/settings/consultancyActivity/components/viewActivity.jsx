import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import history from "../../../../config/history";
import CommonView from "../../../common/components/CommonView";
import Portal from "../../../common/components/Portal";
import ConfirmationModal from "../../../common/components/ConfirmationModal";
import CommonViewTabs from "../../../common/components/CommonViewTabs";
import ComingSoon from "../../../common/components/ComingSoon";

class viewActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            basicDetails: {
                code: "",
                activity_type: "",
                activity: "",
                client: "",
                consultancy: "",
                display_order: "",
                standard: "",
                activity_description: "",
                activity_text: "",
                activity_tooltip: "",
                interval_type: "",
                frequency: "",
                test_frequency: "",
                completion_threshold: "",
                email_threshold: "",
                code_reference: "",
                code_reference_tooltip: "",
                quarterly_view: "",
                edit_form: "",
                default_total_devices: "",
                start_date: "",
                end_date: "",
                created_at: "",
                updated_at: "",
                logbook: "",
                parent: "",
                deeming_agency: "",
                standard_tooltip: "",
                deeming_agency_frequency:""
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
        let activityData = await this.props.getDataById(this.props.match.params.id);
        if (activityData && activityData.success) {
            this.setState({
                basicDetails: {
                    code: activityData.consultancy_activity.code,
                    default_total_devices: activityData.consultancy_activity.default_total_devices,
                    activity_type: activityData.consultancy_activity.activity_type,
                    created_at: activityData.consultancy_activity.created_at,
                    updated_at: activityData.consultancy_activity.updated_at,
                    activity: activityData.consultancy_activity.activity,
                    display_order: activityData.consultancy_activity.display_order,
                    standard: activityData.consultancy_activity.standard,
                    schedule_threshold: activityData.consultancy_activity.schedule_threshold,
                    activity_description: activityData.consultancy_activity.activity_description,
                    client: activityData.consultancy_activity.client,
                    consultancy: activityData.consultancy_activity.consultancy,
                    activity_text: activityData.consultancy_activity.activity_text,
                    activity_tooltip: activityData.consultancy_activity.activity_tooltip,
                    interval_type: activityData.consultancy_activity.interval_type,
                    frequency: activityData.consultancy_activity.frequency,
                    test_frequency: activityData.consultancy_activity.test_frequency,
                    completion_threshold: activityData.consultancy_activity.completion_threshold,
                    email_threshold: activityData.consultancy_activity.email_threshold,
                    code_reference: activityData.consultancy_activity.code_reference,
                    code_reference_tooltip: activityData.consultancy_activity.code_reference_tooltip,
                    quarterly_view: activityData.consultancy_activity.quarterly_view,
                    edit_form: activityData.consultancy_activity.edit_form,
                    start_date: activityData.consultancy_activity.start_date,
                    end_date: activityData.consultancy_activity.end_date,
                    logbook: activityData.consultancy_activity.logbook,
                    parent: activityData.consultancy_activity.parent,
                    deeming_agency: activityData.consultancy_activity.deeming_agency,
                    standard_tooltip: activityData.consultancy_activity.standard_tooltip,
                    shift_start:activityData.consultancy_activity.shift_start,
                    shift_end:activityData.consultancy_activity.shift_end,
                    deeming_agency_frequency:activityData.consultancy_activity.deeming_agency_frequency
                }
            });
        }
        return true;
    };

    goBack = () => {
        // history.go(-2);
        history.push(
            `/consultancy/consultancyinfo/${this.state.basicDetails.consultancy ? this.state.basicDetails.consultancy.id : ""}/assignedactivities`
        );
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
            updateScheduling,
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
                                updateScheduling={updateScheduling}
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

export default withRouter(viewActivity);
