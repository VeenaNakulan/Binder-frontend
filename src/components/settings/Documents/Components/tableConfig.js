export const documentTableData = {
    keys: [
        "name",
        "id",
        "doc_type",
        "logbook",
        "consultancy",
        "client",
        "sector",
        "deeming_agency",
        "campus",
        "building",
        "date_signed",
        "signed_by",
        "uploaded_by",
        "date_uploaded",
        
    ],
    config: {
        name: {
            isVisible: true,
            label: "File Name",
            class: "reg-name",
            searchKey: "logbook_documents.name",
            type: "string",
            hasWildCardSearch: true,
            hasSort: true,
            hasCommonSearch: false,
            getListTable: "logbook_documents",
            commonSearchKey: "logbook_documents",
            commonSearchObjectKey: "name"
        },
        doc_type: {
            isVisible: true,
            label: "Document Type",
            class: "reg-name",
            searchKey: "logbook_documents.doc_type",
            type: "string",
            hasWildCardSearch: true,
            hasSort: true,
            hasCommonSearch: true,
            getListTable: "logbook_documents",
            commonSearchKey: "logbook_documents",
            commonSearchObjectKey: "name"
        },
        campus: {
            isVisible: true,
            label: "Campus",
            class: "reg-name",
            searchKey: "campus.name",
            type: "object",
            hasWildCardSearch: true,
            hasSort: true,
            hasCommonSearch: true,
            getListTable: "campus",
            commonSearchKey: "logbook_documents",
            commonSearchObjectKey: "name"
        },
        client: {
            isVisible: true,
            label: "Client",
            class: "reg-name",
            searchKey: "clients.name",
            type: "object",
            hasWildCardSearch: true,
            hasSort: true,
            hasCommonSearch: true,
            getListTable: "client",
            commonSearchKey: "logbook_documents",
            commonSearchObjectKey: "name"
        },
        consultancy: {
            isVisible: true,
            label: "Consultancy",
            class: "reg-name",
            searchKey: "consultancies.name",
            type: "object",
            hasWildCardSearch: true,
            hasSort: true,
            hasCommonSearch: true,
            getListTable: "consultancy",
            commonSearchKey: "logbook_documents",
            commonSearchObjectKey: "name"
        },
        sector: {
            isVisible: true,
            label: "Sector",
            class: "reg-name",
            searchKey: "sectors.name",
            type: "object",
            hasWildCardSearch: true,
            hasSort: true,
            hasCommonSearch: true,
            getListTable: "sector",
            commonSearchKey: "logbook_documents",
            commonSearchObjectKey: "name"
        },
        deeming_agency: {
            isVisible: true,
            label: "Deeming Agency",
            class: "reg-name",
            searchKey: "deeming_agencies.name",
            type: "object",
            hasWildCardSearch: true,
            hasSort: true,
            hasCommonSearch: true,
            getListTable: "deeming_agency",
            commonSearchKey: "logbook_documents",
            commonSearchObjectKey: "name"
        },
        signed_by: {
            isVisible: true,
            label: "Signed By",
            class: "reg-name",
            searchKey: "logbook_documents.signed_by",
            type: "string",
            hasWildCardSearch: true,
            hasSort: true,
            hasCommonSearch: false,
            getListTable: "logbook_documents",
            commonSearchKey: "logbook_documents",
            commonSearchObjectKey: "name"
        },
        date_signed: {
            isVisible: true,
            label: "Date Signed",
            class: "reg-name",
            searchKey: "logbook_documents.name",
            type: "string",
            hasWildCardSearch: true,
            hasSort: true,
            hasCommonSearch: false,
            getListTable: "logbook_documents",
            commonSearchKey: "logbook_documents",
            commonSearchObjectKey: "name"
        },
        uploaded_by: {
            isVisible: true,
            label: "Uploaded By",
            class: "reg-name",
            searchKey: "logbook_documents.uploaded_by",
            type: "string",
            hasWildCardSearch: true,
            hasSort: true,
            hasCommonSearch: false,
            getListTable: "logbook_documents",
            commonSearchKey: "logbook_documents",
            commonSearchObjectKey: "name"
        },
        date_uploaded: {
            isVisible: true,
            label: "Date Uploaded",
            class: "reg-name",
            searchKey: "logbook_documents.date_uploaded",
            type: "string",
            hasWildCardSearch: true,
            hasSort: true,
            hasCommonSearch: false,
            getListTable: "logbook_documents",
            commonSearchKey: "logbook_documents",
            commonSearchObjectKey: "name"
        },
        logbook: {
            isVisible: true,
            label: "Logbook",
            class: "reg-name",
            searchKey: "logbooks.name",
            type: "object",
            hasWildCardSearch: true,
            hasSort: true,
            hasCommonSearch: true,
            getListTable: "logbooks",
            commonSearchKey: "logbooks",
            commonSearchObjectKey: "name"
        },
        building: {
            isVisible: true,
            label: "Building",
            class: "reg-name",
            searchKey: "buildings.name",
            type: "object",
            hasWildCardSearch: true,
            hasSort: true,
            hasCommonSearch: true,
            getListTable: "buildings",
            commonSearchKey: "buildings",
            commonSearchObjectKey: "name"
        },
        id: {
            isVisible: true,
            label: "ID",
            class: "reg-name",
            searchKey: "logbook_documents.id",
            type: "string",
            hasWildCardSearch: true,
            hasSort: true,
            hasCommonSearch: false,
            getListTable: "logbook_documents",
            commonSearchKey: "logbook_documents",
            commonSearchObjectKey: "name"
        },
       
    },
    data: []
};
