export const clientTableData = {
    keys: [
        "code",
        "name",
        "consultancy",
        "address",
        "email",
        "contact_number",
        "is_active",
        "lock_total_devices",
        "modify_next_due_date",
        "request_email_recipt",
        "enable_notification",
        "cmms_url",
        "comments",
        "created_at",
        "updated_at"
    ],
    config: {
        code: {
            isVisible: true,
            label: "Client Code",
            class: "",
            searchKey: "clients.code",
            type: "string",
            hasWildCardSearch: true,
            hasSort: true,
            hasCommonSearch: false,
            getListTable: "clients",
            commonSearchKey: "clients",
            commonSearchObjectKey: "code"
        },
        name: {
            isVisible: true,
            label: "Client Name",
            class: "",
            searchKey: "clients.name",
            type: "string",
            hasWildCardSearch: true,
            hasSort: true,
            hasCommonSearch: false,
            getListTable: "clients",
            commonSearchKey: "clients",
            commonSearchObjectKey: "code"
        },
        consultancy: {
            isVisible: true,
            label: "Consultancy",
            class: "",
            searchKey: "consultancies.name",
            type: "object",
            hasWildCardSearch: true,
            hasSort: true,
            hasCommonSearch: true,
            getListTable: "consultancies",
            commonSearchKey: "consultancies",
            commonSearchObjectKey: "name"
        },
        display_blinking_red_plus: {
            isVisible: true,
            label: "Display Blinking Red Plus",
            class: "",
            searchKey: "clients.display_blinking_red_plus",
            type: "string",
            hasWildCardSearch: true,
            hasSort: true,
            hasCommonSearch: true,
            getListTable: "clients",
            commonSearchKey: "clients",
            commonSearchObjectKey: "display_blinking_red_plus"
        },
        ep_name: {
            isVisible: true,
            label: "Ep Name",
            class: "",
            searchKey: "clients.ep_name",
            type: "string",
            hasWildCardSearch: true,
            hasSort: true,
            hasCommonSearch: false,
            getListTable: "clients",
            commonSearchKey: "clients",
            commonSearchObjectKey: "ep_name"
        },
        lock_total_devices: {
            isVisible: true,
            label: "Lock Total Devices",
            class: "",
            searchKey: "clients.lock_total_devices",
            type: "string",
            hasWildCardSearch: true,
            hasSort: true,
            hasCommonSearch: true,
            getListTable: "clients",
            commonSearchKey: "clients",
            commonSearchObjectKey: "lock_total_devices"
        },
        modify_next_due_date: {
            isVisible: true,
            label: "Modify Next Due Date",
            class: "",
            searchKey: "clients.modify_next_due_date",
            type: "string",
            hasWildCardSearch: true,
            hasSort: true,
            hasCommonSearch: true,
            getListTable: "clients",
            commonSearchKey: "clients",
            commonSearchObjectKey: "modify_next_due_date"
        },
        request_email_recipt: {
            isVisible: true,
            label: "Request Email Receipt",
            class: "",
            searchKey: "clients.request_email_recipt",
            type: "string",
            hasWildCardSearch: true,
            hasSort: true,
            hasCommonSearch: true,
            getListTable: "clients",
            commonSearchKey: "clients",
            commonSearchObjectKey: "request_email_recipt"
        },
        enable_notification: {
            isVisible: true,
            label: "Enable Notification",
            class: "",
            searchKey: "clients.enable_notification",
            type: "string",
            hasWildCardSearch: true,
            hasSort: true,
            hasCommonSearch: true,
            getListTable: "clients",
            commonSearchKey: "clients",
            commonSearchObjectKey: "enable_notification"
        },
        trailing_view_current_month: {
            isVisible: true,
            label: "Trailing View Current Month",
            class: "",
            searchKey: "clients.trailing_view_current_month",
            type: "string",
            hasWildCardSearch: true,
            hasSort: true,
            hasCommonSearch: true,
            getListTable: "clients",
            commonSearchKey: "clients",
            commonSearchObjectKey: "trailing_view_current_month"
        },
        use_threshold_for_quarterly: {
            isVisible: true,
            label: "Use Threshold For Quarterly",
            class: "",
            searchKey: "clients.use_threshold_for_quarterly",
            type: "string",
            hasWildCardSearch: true,
            hasSort: true,
            hasCommonSearch: true,
            getListTable: "clients",
            commonSearchKey: "clients",
            commonSearchObjectKey: "use_threshold_for_quarterly"
        },
        cmms_url: {
            isVisible: true,
            label: "Cmms Url",
            class: "",
            searchKey: "clients.cmms_url",
            type: "string",
            hasWildCardSearch: true,
            hasSort: true,
            hasCommonSearch: false,
            getListTable: "clients",
            commonSearchKey: "clients",
            commonSearchObjectKey: "cmms_url"
        },
        comments: {
            isVisible: true,
            label: "Comments",
            class: "",
            searchKey: "clients.comments",
            type: "string",
            hasWildCardSearch: true,
            hasSort: true,
            hasCommonSearch: false,
            getListTable: "clients",
            commonSearchKey: "clients",
            commonSearchObjectKey: "comments"
        },
        address: {
            isVisible: true,
            label: "Address",
            class: "",
            searchKey: "clients.address",
            type: "string",
            hasWildCardSearch: true,
            hasSort: true,
            hasCommonSearch: false,
            getListTable: "clients",
            commonSearchKey: "clients",
            commonSearchObjectKey: "address"
        },
        email: {
            isVisible: true,
            label: "Email",
            class: "",
            searchKey: "clients.email",
            type: "string",
            hasWildCardSearch: true,
            hasSort: true,
            hasCommonSearch: false,
            getListTable: "clients",
            commonSearchKey: "clients",
            commonSearchObjectKey: "email"
        },
        contact_number: {
            isVisible: true,
            label: "Contact Number",
            class: "",
            searchKey: "clients.contact_number",
            type: "string",
            hasWildCardSearch: true,
            hasSort: true,
            hasCommonSearch: false,
            getListTable: "clients",
            commonSearchKey: "clients",
            commonSearchObjectKey: "contact_number"
        },
        is_active: {
            isVisible: true,
            label: "is Active?",
            class: "",
            searchKey: "clients.is_active",
            type: "string",
            hasWildCardSearch: true,
            hasSort: true,
            hasCommonSearch: true,
            getListTable: "clients",
            commonSearchKey: "clients",
            commonSearchObjectKey: "is_active"
        },
        created_at: {
            isVisible: true,
            label: "Created At",
            class: "",
            searchKey: "clients.created_at",
            type: "date",
            hasWildCardSearch: true,
            hasSort: true,
            hasCommonSearch: false,
            getListTable: "clients",
            commonSearchKey: "clients",
            commonSearchObjectKey: "created_at"
        },
        updated_at: {
            isVisible: true,
            label: "Updated At",
            class: "",
            searchKey: "clients.updated_at",
            type: "date",
            hasWildCardSearch: true,
            hasSort: true,
            hasCommonSearch: false,
            getListTable: "clients",
            commonSearchKey: "clients",
            commonSearchObjectKey: "updated_at"
        }
    },
    data: []
};
