import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';

// material-ui
import { Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

// third-party
import { useTable, useFilters, useGlobalFilter, usePagination } from 'react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { TablePagination } from 'components/third-party/ReactTable';
import { getCommittenti } from 'api/anagrafica';
import {
    DefaultColumnFilter,
    renderFilterTypes,
} from 'utils/react-table';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, top }) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [controlledPageCount, setControlledPageCount] = useState(0)
    const filterTypes = useMemo(() => renderFilterTypes, []);
    const defaultColumn = useMemo(() => ({ Filter: DefaultColumnFilter }), []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageCount,
        gotoPage,
        setPageSize,
        state: { pageIndex, pageSize, filters },

    } = useTable(
        {
            columns,
            data,
            // @ts-ignore
            defaultColumn,
            // @ts-ignore
            filterTypes,
            manualPagination: true,
            manualFilters: true,
            autoResetPage: false,
            autoResetFilters: false,
            pageCount: controlledPageCount,
            // @ts-ignore
            initialState: {
                pageIndex: 0,
                pageSize: 10,
                //filters: [{ id: 'status', value: '' }]
                filters: []
            }
        },
        useGlobalFilter,
        useFilters,
        usePagination
    );

    const fetchData = useCallback(async ({ pageIndex, pageSize, filters }) => {
        console.log("fetchData")
        console.log(filters)
        setLoading(true)
        //const startRow = pageSize * pageIndex
        //const endRow = startRow + pageSize
        return await getCommittenti(pageIndex, pageSize, filters)
    }, [])

    // Listen for changes in pagination and use the state to fetch our new data
    useEffect(() => {
        fetchData({ pageIndex, pageSize, filters })
            .then(res => {
                setData(res['RETURNVALUES'][0]['data'])
                const total_records = res['RETURNVALUES'][0]['total']
                setControlledPageCount(Math.floor(total_records / pageSize))
                setLoading(false)
            })
    }, [fetchData, pageIndex, pageSize, filters])

    const sortingRow = rows.slice(0, 10);

    return (
        <Stack spacing={2}>


            <Table {...getTableProps()}>
                <TableHead sx={{ borderTopWidth: 2 }}>
                    {headerGroups.map((headerGroup, i) => (
                        <TableRow key={i} {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column, index) => (
                                <TableCell key={index} {...column.getHeaderProps([{ className: column.className }])}>
                                    {column.render('Header')}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody {...getTableBodyProps()}>
                    {headerGroups.map((group, i) => (
                        <TableRow key={i} {...group.getHeaderGroupProps()}>
                            {group.headers.map((column, index) => (
                                <TableCell key={index} {...column.getHeaderProps([{ className: column.className }])}>
                                    {column.canFilter ? column.render('Filter') : null}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                    {sortingRow.map((row, i) => {
                        prepareRow(row);
                        return (
                            <TableRow key={i} {...row.getRowProps()}>
                                {row.cells.map((cell, index) => (
                                    <TableCell key={index} {...cell.getCellProps([{ className: cell.column.className }])}>
                                        {cell.render('Cell')}
                                    </TableCell>
                                ))}
                            </TableRow>
                        );
                    })}

                    {!top && (
                        <TableRow>
                            <TableCell sx={{ p: 2 }} colSpan={7}>
                                <TablePagination gotoPage={gotoPage} setPageSize={setPageSize} pageSize={pageSize} pageIndex={pageIndex} pageCount={pageCount} canNextPage={canNextPage} canPreviousPage={canPreviousPage} />
                            </TableCell>
                            {loading ? (
                                // Use our custom loading state to show a loading indicator
                                <td colSpan="10000">Loading...</td>
                            ) : (
                                <td colSpan="10000">
                                    Showing {page.length} of ~{controlledPageCount * pageSize}{' '}
                                    results
                                </td>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Stack>
    );
}

ReactTable.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array,
    top: PropTypes.bool
};

// ==============================|| REACT TABLE - FILTERING ||============================== //

const FilteringTable = () => {
    const columns = useMemo(
        () => [
            {
                Header: 'Nome',
                accessor: 'nome'
            },
            {
                Header: 'Partita IVA',
                accessor: 'partitaiva'
            },
            {
                Header: 'N. Convenzione',
                accessor: 'numconvenzione'
            }
        ],
        []
    );

    return (
        <MainCard content={false}>
            <ScrollX>
                <ReactTable columns={columns} data={[]} fetchData loading pageCount={0} filters />
            </ScrollX>
        </MainCard>
    );
};

export default FilteringTable;
