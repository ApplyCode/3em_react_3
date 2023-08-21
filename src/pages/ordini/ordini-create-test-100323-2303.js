import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';

// material-ui
import { Table, TableBody, TableCell, TableHead, TableRow, TextField, Autocomplete } from '@mui/material';
import Button from '@mui/material/Button';

// third-party
import { useTable, useFilters } from 'react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';

function createData(dipendente="", tariffa=0, importo=0, pm_cantiere=0, pm_viaggio=0, pm_fat=0, pm_cantiere_rp=0, pm_viaggio_rp=0, pm_fat_rp=0) {
    return {
        dipendente,
        tariffa,
        importo,
        pm_cantiere,
        pm_viaggio,
        pm_fat,
        pm_cantiere_rp,
        pm_viaggio_rp,
        pm_fat_rp
    };
}

// ==============================|| REACT TABLE - EDITABLE CELL ||============================== //

const EditableCell = ({ value: initialValue, row: { index }, column: { id }, updateMyData }) => {
    const [value, setValue] = useState(initialValue);

    const onChange = (e) => {
        setValue(e.target?.value);
    };

    const onBlur = () => {
        updateMyData(index, id, value);
    };

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return (
        <TextField
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            sx={{ '& .MuiOutlinedInput-input': { py: 0.75, px: 1 }, '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
        />
    );
};

EditableCell.propTypes = {
    value: PropTypes.any,
    row: PropTypes.object,
    column: PropTypes.object,
    updateMyData: PropTypes.func
};

const defaultColumn = {
    Cell: EditableCell
};

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, updateMyData, skipPageReset }) {
    const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } = useTable(
        {
            columns,
            data,
            defaultColumn,
            // @ts-ignore
            autoResetPage: !skipPageReset,
            updateMyData
        },
        useFilters
    );

    return (
        <Table {...getTableProps()}>
            <TableHead>
                {headerGroups.map((headerGroup, i) => (
                    <TableRow key={i} {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column, index) => (
                            <TableCell key={index} {...column.getHeaderProps()}>
                                {column.render('Header')}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <TableRow key={i} {...row.getRowProps()}>
                            {row.cells.map((cell, index) => (
                                <TableCell key={index} {...cell.getCellProps()}>
                                    {cell.render('Cell')}
                                </TableCell>
                            ))}
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}

ReactTable.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array,
    updateMyData: PropTypes.func,
    skipPageReset: PropTypes.bool
};

// ==============================|| REACT TABLE - EDITABLE ||============================== //

const Editable = () => {
    const [data, setData] = useState([]);
    const [skipPageReset, setSkipPageReset] = useState(false);
    const columns = useMemo(
        () => [
            {
                Header: 'Dipendente',
                accessor: 'dipendente',
                Cell: (tabData) =>
                    <Autocomplete
                        disablePortal
                        value={tabData.value}
                        id="combo-box-demo"
                        options={["a","b"]}
                        sx={{ width: 300 }}
                        onChange={(e,v) => {
                            handleSelectOperator(e,v,tabData)
                        }}
                        renderInput={(params) => <TextField {...params} label="Dipendente" />}
                    />

            },
            {
                Header: 'Tariffa',
                accessor: 'tariffa'
            },
            {
                Header: 'Importo',
                accessor: 'importo'
            },
            {
                Header: 'PM Cantiere',
                accessor: 'pm_cantiere'
            },
            {
                Header: 'PM Viaggio',
                accessor: 'pm_viaggio'
            },
            {
                Header: 'PM FAT',
                accessor: 'pm_fat'
            },
            {
                Header: 'PM Cantiere (Report)',
                accessor: 'pm_cantiere_rp'
            },
            {
                Header: 'PM Viaggio (Report)',
                accessor: 'pm_viaggio_rp'
            },
            {
                Header: 'PM FAT (Report)',
                accessor: 'pm_fat_rp'
            },
            {
                Header: '',
                accessor: 'delete',
                // eslint-disable-next-line
                Cell: (value) =>
                    <button onClick={() => handleDeleteRow(value)}>
                        Rimuovi
                    </button>
            }
        ],
        [data]
    );

    /*    const handleChange = () => {
            //console.log(cell)
    /!*        const newState = data.map(obj => {
                // 👇️ if id equals 2, update country property
                if (obj.index === index) {
                    return {...obj, country: 'Denmark'};
                }

                // 👇️ otherwise return the object as is
                return obj;
            });

            setData(newState);*!/
        }*/
    const handleAddOperator = () => {
        const new_row = createData("a");
        setData(current => [...current, new_row]);
    };

    const handleDeleteRow = (value) => {
        // ES6 Syntax use the rvalue if your data is an array.
        // It should not matter what you name tableProps. It made the most sense to me.
        value.data.splice(value.row.index, 1);
        setData([...value.data]);
    }

    const handleSelectOperator = (event, value, tableData) => {
        console.log(event)
        console.log(value)
        console.log(tableData)
        const current_data = [...tableData.data]
        current_data[tableData.row.index][tableData.column.id] = value
        setData([...current_data])
    }

    // const handleTest = () => {
    //     console.log('handleTest')
    // }

    const updateMyData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true);
        setData((old) =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        // @ts-ignore
                        ...old[rowIndex],
                        [columnId]: value
                    };
                }
                return row;
            })
        );
    };

    useEffect(() => {
        setSkipPageReset(true);
        console.log(data)
    }, [data]);

    const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } = useTable(
        {
            columns,
            data,
            defaultColumn,
            // @ts-ignore
            autoResetPage: !skipPageReset,
            updateMyData
        },
        useFilters
    );

    return (
        <MainCard content={false}>
            <Button
                onClick={handleAddOperator}
                variant="contained">
                Aggiungi Operatore
            </Button>
            <ScrollX>
                <Table {...getTableProps()}>
                    <TableHead>
                        {headerGroups.map((headerGroup, i) => (
                            <TableRow key={i} {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column, index) => (
                                    <TableCell key={index} {...column.getHeaderProps()}>
                                        {column.render('Header')}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                        {rows.map((row, i) => {
                            prepareRow(row);
                            return (
                                <TableRow key={i} {...row.getRowProps()}>
                                    {row.cells.map((cell, index) => (
                                        <TableCell
                                            key={index}
                                            {...cell.getCellProps()}
                                        >
                                            {cell.render('Cell')}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </ScrollX>
        </MainCard>
    );
};

export default Editable;
