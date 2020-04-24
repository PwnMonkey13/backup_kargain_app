import React from 'react'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { useTable, usePagination, useSortBy, useFilters, useGlobalFilter } from 'react-table'
import NiceSelect from 'react-select'
import { Col, Row } from 'reactstrap'
import matchSorter from 'match-sorter'
import { SelectOptionsUtils } from '../../libs/formFieldsUtils'
import clsx from 'clsx'
import { Edit, Delete} from 'react-feather'
import Loader from '../Loader'

// Define a default UI for filtering
function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length

    return (
        <span> Search:{' '}
            <input
                value={globalFilter || ''}
                onChange={e => {
                    setGlobalFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
                }}
                placeholder={`${count} records...`}
                style={{
                    fontSize: '1.1rem',
                    border: '0',
                }}
            />
    </span>
    )
}

// This is a custom filter UI for selecting
// a unique option from a list

function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

const ReactTablePaginate = ({
    columns,
    data,
    fetchData,
    loading,
    pageCount: controlledPageCount,
    //custom
    paginationDefaultConfig,
    enableDebug,
    totalIndicator,
    handleItemClickEdit,
    handleItemClickDelete
}) => {

    const filterTypes = React.useMemo(
        () => ({
            fuzzyText: fuzzyTextFilterFn,
            // Or, override the default text filter to use
            // "startWith"
            text: (rows, id, filterValue) => {
                return rows.filter(row => {
                    const rowValue = row.values[id]
                    return rowValue !== undefined
                        ? String(rowValue)
                            .toLowerCase()
                            .startsWith(String(filterValue).toLowerCase())
                        : true
                })
            },
        }),
        []
    )

    const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page, canPreviousPage, canNextPage,
        pageOptions, pageCount, gotoPage, nextPage, previousPage, setPageSize, visibleColumns,
        preGlobalFilteredRows, setGlobalFilter, state, // Get the state from the instance
    } = useTable({
            columns,
            data,
            initialState: { pageIndex : 0, pageSize : 10, ...paginationDefaultConfig },
            manualPagination: true, // Tell the usePagination
            pageCount: controlledPageCount,
            filterTypes
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination,
    )

    const { pageIndex, pageSize } = state;
    React.useEffect(() => {
        fetchData({
            pageIndex,
            pageSize
        })
    }, [fetchData, pageIndex, pageSize])

    return (
        <>
            <Row>
                <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
            </Row>
            <Row>

                <MaUTable {...getTableProps()}>
                    <TableHead>
                        {headerGroups.map(headerGroup => (
                            <TableRow {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => {
                                    return(
                                        <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            {column.render('Header')}
                                            <span>
                                                {column.isSorted ? column.isSortedDesc ? ' 🔽' : ' 🔼' : ''}
                                            </span>
                                        </TableCell>
                                    )
                                })}
                                <TableCell>
                                    <span>Actions</span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            prepareRow(row)
                            return (
                                <TableRow {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                            <TableCell {...cell.getCellProps()}>
                                                {cell.render('Cell')}
                                            </TableCell>
                                        )
                                    })}
                                    <TableCell>
                                        <button className="mx-1" onClick={() => handleItemClickEdit(i)}>
                                            <Edit/>
                                        </button>
                                        <button className="mx-1" onClick={() => handleItemClickDelete(i)}>
                                            <Delete/>
                                        </button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </MaUTable>
            </Row>

            <style jsx>{`
                 .table_bottom {
                 
                    button, input {
                        padding : 3px 6px;
                        margin : 1px;
                        font-size:initial;
                        
                        &:disabled{
                            background-color : #a8a4a4
                        }
                    }
                    
                    & > div {
                        flex : 1
                     }    
                }
            `}
            </style>

            <div className={clsx("table_bottom", "d-flex" ,"justify-content-around")}>
                <div className="p-2">
                    {loading ?
                        <Loader/> :
                        <p>Showing {page.length} of {totalIndicator} results </p>
                    }
                </div>

                <div className="p-2" style={{flex : 2}}>
                    <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        {'<<'}
                    </button>
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                        {'<'}
                    </button>

                    <span>
                        <span className="mx-2">Go to page:</span>
                        <input
                            type="number"
                            value={pageIndex}
                            style={{ backgroundColor : "gainsboro", border : 'none', height : "30px", width: '50px' }}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(page)
                            }}
                        />
                        <span className="mx-2"> of <strong> {pageOptions.length} </strong> </span>

                    </span>

                    <button onClick={() => nextPage()} disabled={!canNextPage}>
                        {'>'}
                    </button>
                    <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        {'>>'}
                    </button>
                </div>

                <div className="p-2">
                    <NiceSelect
                        value={pageSize}
                        onChange={selected => { setPageSize(Number(selected.value))}}
                        options={SelectOptionsUtils([5, 10, 20, 30, 40, 50])}>
                    </NiceSelect>
                </div>
            </div>

            {enableDebug && (
                <pre>
                    <code>
                        {JSON.stringify({
                                pageIndex,
                                pageSize,
                                pageCount,
                                canNextPage,
                                canPreviousPage
                            },
                            null,
                            2
                        )}
                </code>
              </pre>
            )}

        </>
    )
}

export default ReactTablePaginate
