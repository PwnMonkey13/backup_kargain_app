import React from 'react';
import dynamic from 'next/dynamic'
import PropTypes from 'prop-types';
import SaveIcon from '@material-ui/icons/Save';
import CheckIcon from '@material-ui/icons/Check';
import SearchIcon from '@material-ui/icons/Search';
import SaveAlt from '@material-ui/icons/SaveAlt';
import ClearIcon from '@material-ui/icons/Clear';
import LastPage from '@material-ui/icons/LastPage';
import FirstPage from '@material-ui/icons/FirstPage';
import ViewColumn from '@material-ui/icons/ViewColumn';
import FilterList from '@material-ui/icons/FilterList';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ImportExportIcon from '@material-ui/icons/ImportExport';

const TableMUI = ({ columns, data, title, ...props }) => {
    const MaterialTable = dynamic(() => import("material-table"), { ssr: false });

    return (
        <MaterialTable
            style={{
                margin: '5px',
                marginBottom: '10rem'
            }}
            localization={{
                pagination: {
                    labelRowsSelect: 'lignes',
                    labelDisplayedRows: '{from}-{to} de {count}'
                },
                toolbar: {
                    searchPlaceholder: 'Rechercher',
                    nRowsSelected: '{0} ligne(s) selectionnée(s)'
                },
                header: {
                    actions: 'Actions'
                },
                body: {
                    emptyDataSourceMessage: 'Aucune donnée à afficher',
                    filterRow: {
                        filterTooltip: 'Filtres'
                    }
                }
            }}
            icons={{
                Filter: React.forwardRef((props, ref) => <FilterList ref={ref}/>),
                Search: React.forwardRef((props, ref) => <SearchIcon ref={ref}/>),
                ResetSearch: () => <ClearIcon/>,
                Save: () => <SaveIcon/>,
                Check: () => <CheckIcon/>,
                Export: () => <SaveAlt/>,
                SortArrow: () => <ImportExportIcon/>,
                FirstPage: () => <FirstPage/>,
                LastPage: () => <LastPage/>,
                NextPage: () => <ChevronRight/>,
                PreviousPage: () => <ChevronLeft/>,
                ViewColumn: () => <ViewColumn/>,
                DetailPanel: () => <ChevronRight/>
            }}
            isLoading={props.loading}
            title={title}
            columns={columns}
            data={data}
            options={{
                search: props.search,
                // selection: props.selection,
                filtering: props.filtering,
                grouping: props.grouping,
                pageSize: props.tableLength,
                pageSizeOptions: [10, 20, 50, 100],
                exportButton: props.exportButton,
                exportFileName: props.exportFileName
                // actionsColumnIndex: -1
            }}
            actions={props.actions}
        />
    );
};

TableMUI.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    title: PropTypes.string,
    search: PropTypes.bool,
    filtering: PropTypes.bool,
    grouping: PropTypes.bool,
    exportButton: PropTypes.bool,
    tableLength: PropTypes.number
};

TableMUI.defaultProps = {
    search: true,
    selection: true,
    filtering: true,
    grouping: true,
    exportButton: true,
    tableLength: 15,
    exportFileName: 'export_data_sci'
};

export default TableMUI;
