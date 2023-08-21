import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';

// material-ui
import { Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// third-party
import { useFilters, usePagination, useTable } from 'react-table';
import { useNavigate } from 'react-router-dom';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { TablePagination } from 'components/third-party/ReactTable';
import { getTimesheet } from 'api/timesheet';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, top }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [controlledPageCount, setControlledPageCount] = useState(0);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      manualPagination: true,
      autoResetPage: false,
      columns,
      data,
      pageCount: controlledPageCount,
      // @ts-ignore
      initialState: {
        pageIndex: 0,
        pageSize: 10
      }
    },
    useFilters,
    usePagination
  );

  const fetchData = useCallback(async ({ pageIndex, pageSize }) => {
    setLoading(true);
    //const startRow = pageSize * pageIndex
    //const endRow = startRow + pageSize
    return await getTimesheet(pageIndex, pageSize);
  }, []);

  // Listen for changes in pagination and use the state to fetch our new data
  useEffect(() => {
    fetchData({ pageIndex, pageSize }).then((res) => {
      setData(res['RETURNVALUES'][0]['data']);
      const total_records = res['RETURNVALUES'][0]['total'];
      setControlledPageCount(Math.floor(total_records / pageSize));
      setLoading(false);
    });
  }, [fetchData, pageIndex, pageSize]);

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
                <TablePagination
                  gotoPage={gotoPage}
                  setPageSize={setPageSize}
                  pageSize={pageSize}
                  pageIndex={pageIndex}
                  pageCount={pageCount}
                  canNextPage={canNextPage}
                  canPreviousPage={canPreviousPage}
                />
              </TableCell>
              {loading ? (
                // Use our custom loading state to show a loading indicator
                <td colSpan="10000">Loading...</td>
              ) : (
                <td colSpan="10000">
                  Showing {page.length} of ~{controlledPageCount * pageSize} results
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
  const navigate = useNavigate();
  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id'
      },
      {
        Header: 'Nome',
        accessor: 'nome_dipendente'
      },
      {
        Header: 'Cognome',
        accessor: 'cognome_dipendente'
      },
      {
        Header: 'Tariffa',
        accessor: 'tariffa_dipendente'
      },
      {
        Header: 'Mese',
        accessor: 'mese'
      },
      {
        Header: 'Anno',
        accessor: 'anno'
      },
      {
        Header: 'Elaborato',
        accessor: 'elaborato'
      },
      {
        Header: 'Actions',
        accessor: 'actions', // You can use any unique string as the accessor
        Cell: (props) => (
          <Stack direction="row" spacing={1}>
            <IconButton
              onClick={(e) => {
                /* your delete logic */
              }}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              onClick={(e) => {
                navigate(`/edittimesheet`);
              }}
            >
              <EditIcon />
            </IconButton>
          </Stack>
        )
      }
    ],
    []
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainCard title="Clienti Finali" content={false}>
          <ScrollX>
            <ReactTable columns={columns} data={[]} fetchData loading pageCount={0} />
          </ScrollX>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default PaginationTable;
