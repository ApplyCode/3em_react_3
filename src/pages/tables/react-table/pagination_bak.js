import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';

// material-ui
import { Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

// third-party
import { useTable, useFilters, usePagination } from 'react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { TablePagination } from 'components/third-party/ReactTable';
// import makeData from 'data/react-table';
import { getCommittenti } from '../../../api/anagrafica/committenti';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, top, pageCount: controlledPageCount}) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    pageCount,
    // @ts-ignore
    page,
    prepareRow,
    // @ts-ignore
    gotoPage,
    // @ts-ignore
    setPageSize,
    // @ts-ignore
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      manualPagination: true,
      pageCount: controlledPageCount,
      // @ts-ignore
      initialState: { pageIndex: 0, pageSize: 10 }
    },
    useFilters,
    usePagination
  );

  const fetchData = useCallback(async ({ pageSize, pageIndex }) => {
    setLoading(true)
    const startRow = pageSize * pageIndex
    const endRow = startRow + pageSize
    return await getCommittenti(startRow, endRow)
  }, [])

  // Listen for changes in pagination and use the state to fetch our new data
  useEffect(() => {
    fetchData({ pageIndex, pageSize })
      .then(res => {
        console.log(res)
        setData(res['RETURNVALUES'][0])
        setLoading(false)
      })
  }, [fetchData, pageIndex, pageSize])

  console.log(data)

  return (
    <Stack>
      <Table {...getTableProps()}>
        <TableHead sx={{ borderTopWidth: top ? 2 : 1 }}>
          {headerGroups.map((headerGroup, index) => (
            <TableRow key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, i) => (
                <TableCell key={i} {...column.getHeaderProps([{ className: column.className }])}>
                  {column.render('Header')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.map((row, i) => {
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
                <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageSize={pageSize} pageIndex={pageIndex} pageCount={pageCount} />
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

// ==============================|| REACT TABLE - PAGINATION ||============================== //

const PaginationTable = () => {
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

  console.log('t1')
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainCard title="Pagination at Bottom" content={false}>
          <ScrollX>
            <ReactTable columns={columns} data={[]} fetchData loading pageCount />
          </ScrollX>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default PaginationTable;
