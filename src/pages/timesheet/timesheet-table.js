import PropTypes from 'prop-types';
import { useEffect, useMemo, useState, useCallback } from 'react';

// material-ui
import { Table, TableBody, TableCell, TableHead, TableRow, TextField, Autocomplete } from '@mui/material';
import Button from '@mui/material/Button';

// third-party
import { useTable, useFilters } from 'react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import {getDipendenti} from "api/anagrafica";

// redux
import { useDispatch } from 'react-redux';
import { addOperatore } from "../../store/reducers/ordiniCreate";

function createData(
    numero_ordine=0,
    d1=0,
    d2=0,
    d3=0,
    d4=0,
    d5=0,
    d6=0,
    d7=0,
    d8=0,
    d9=0,
    d10=0,
    d11=0,
    d12=0,
    d13=0,
    d14=0,
    d15=0,
    d16=0,
    d17=0,
    d18=0,
    d19=0,
    d20=0,
    d21=0,
    d22=0,
    d23=0,
    d24=0,
    d25=0,
    d26=0,
    d27=0,
    d28=0,
    d29=0,
    d30=0,
    d31=0,
    attivita=0,
    trasferta=0
    ) {
    return {
        numero_ordine,
        d1,
        d2,
        d3,
        d4,
        d5,
        d6,
        d7,
        d8,
        d9,
        d10,
        d11,
        d12,
        d13,
        d14,
        d15,
        d16,
        d17,
        d18,
        d19,
        d20,
        d21,
        d22,
        d23,
        d24,
        d25,
        d26,
        d27,
        d28,
        d29,
        d30,
        d31,
        attivita,
        trasferta
    };
}

// ==============================|| REACT TABLE - EDITABLE CELL ||============================== //

const EditableCell = ({ value: initialValue, row: { index }, column: { id }, updateMyData }) => {
    const [value, setValue] = useState(initialValue);

    const onChange = (e) => {
        setValue(e.target?.value);
        updateMyData(index, id, value)
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

const Timesheet_Table = () => {
    const [data, setData] = useState([]);
    const [skipPageReset, setSkipPageReset] = useState(false);
    const [dipendenti, setDipendenti] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const columns = useMemo(
        () => [
            {
                Header: 'Numero Ordine',
                accessor: 'numero_ordine',
            },
            {
                Header: '1',
                accessor: 'd1'
            },
            {
                Header: '2',
                accessor: 'd2'
            },
            {
                Header: '3',
                accessor: 'd3'
            },
            {
                Header: '4',
                accessor: 'd4'
            },
            {
                Header: '5',
                accessor: 'd5'
            },
            {
                Header: '6',
                accessor: 'd6'
            },
            {
                Header: '7',
                accessor: 'd7'
            },
            {
                Header: '8',
                accessor: 'd8'
            },
            {
                Header: '9',
                accessor: 'd9'
            },
            {
                Header: '10',
                accessor: 'd10'
            },
            {
                Header: '11',
                accessor: 'd11'
            },
            {
                Header: '12',
                accessor: 'd12'
            },
            {
                Header: '13',
                accessor: 'd13'
            },
            {
                Header: '14',
                accessor: 'd14'
            },
            {
                Header: '15',
                accessor: 'd15'
            },
            {
                Header: '16',
                accessor: 'd16'
            },
            {
                Header: '17',
                accessor: 'd17'
            },
            {
                Header: '18',
                accessor: 'd18'
            },
            {
                Header: '19',
                accessor: 'd19'
            },
            {
                Header: '20',
                accessor: 'd20'
            },
            {
                Header: '21',
                accessor: 'd21'
            },
            {
                Header: '22',
                accessor: 'd22'
            },
            {
                Header: '23',
                accessor: 'd23'
            },
            {
                Header: '24',
                accessor: 'd24'
            },
            {
                Header: '25',
                accessor: 'd25'
            },
            {
                Header: '26',
                accessor: 'd26'
            },
            {
                Header: '27',
                accessor: 'd27'
            },
            {
                Header: '28',
                accessor: 'd28'
            },
            {
                Header: '29',
                accessor: 'd29'
            },
            {
                Header: '30',
                accessor: 'd30'
            },
            {
                Header: '31',
                accessor: 'd31'
            },
            {
                Header: 'Attivita',
                accessor: 'attivita'
            },
            {
                Header: 'Trasferta',
                accessor: 'trasferta'
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

    const fetchOperators = useCallback(async ({ filters }) => {
        //const startRow = pageSize * pageIndex
        //const endRow = startRow + pageSize
        return await getDipendenti(0, 0, filters, false)
    }, [])

    /*    function operatorsReducer(state=data, action) {
            if (action.type === 'operator/add') {
                return {
                    ...state,

                }
            }
        }*/
    const dispatch = useDispatch();

    const handleAddOperator = () => {
        const new_row = createData();
        setData(current => [...current, new_row]);
    };

    const handleDeleteRow = (value) => {
        // ES6 Syntax use the rvalue if your data is an array.
        // It should not matter what you name tableProps. It made the most sense to me.
        value.data.splice(value.row.index, 1);
        setData([...value.data]);
    }

    const handleInputOperator = (event, value) => {
        console.log("value = "+value)
        setInputValue(value)
    }

    const handleSelectOperator = (tableData) => {
        const newData = tableData.map((item) => (item.values))
        console.log(newData)
        //const current_data = [...data]
        //current_data[row.index][column.id] = value
        setData([...newData])
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
        dispatch(addOperatore(data))
        console.log(data)
    };

    useEffect(() => {
        setSkipPageReset(true);

        if (inputValue === '') {
            setOptions(dipendenti ? [dipendenti] : []);
            return undefined;
        }

        let filters = [{id: "nome", value: inputValue}]
        fetchOperators({ filters })
            .then(res => {
                console.log(res)
                let newOptions = []
                res.RETURNVALUES[0].forEach((item) => {
                    newOptions.push({id: item.id, nome: item.nome, cognome: item.cognome})
                })
                setOptions(newOptions)
            })
    }, [dipendenti, inputValue, fetchOperators])

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

    function addAfter(array, index, newItem) {
        return [
            ...array.slice(0, index),
            newItem,
            ...array.slice(index)
        ];
    }

    return (
        <MainCard content={false}>
            <Button
                onClick={handleAddOperator}
                sx={{margin:"1%"}}
                variant="contained"
            >
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
                                    {row.cells.map((cell, index) => {
                                        //console.log(rows)
                                        if (cell.column.id === 'dipendente') {
                                            return <TableCell key={index}>
                                                <Autocomplete
                                                    freeSolo
                                                    // disablePortal
                                                    // value={dipendenti[row.index] || null}
                                                    // disableClearable
                                                    noOptionsText=""
                                                    filterOptions={(x) => x}
                                                    autoComplete
                                                    includeInputInList
                                                    filterSelectedOptions
                                                    // isOptionEqualToValue={(option, value) => option.id === value.id}
                                                    id={"select-dipendente-"+row.index}
                                                    options={ options }
                                                    getOptionLabel={ (operator) => (operator.nome || '') + ' ' + (operator.cognome || '') }
                                                    sx={{ width: 300 }}
                                                    onChange={(e, v) => {
                                                        //handleSelectOperator(e, v, rows, row, cell.column);
                                                        console.log(cell)
                                                        console.log(row)
                                                        row.values.dipendente = v?.id || 0
                                                        handleSelectOperator(rows)
                                                        setDipendenti(addAfter(dipendenti, row.index, v))
                                                        console.log(v)
                                                    }}
                                                    // catturo nello state il valore di ciò che sto inserendo nel textfield
                                                    onInputChange={(event, value) => {
                                                        handleInputOperator(event, value)
                                                    }}
                                                    renderInput={(params) => <TextField
                                                        id={"input-select-dipendente-"+row.index}
                                                        {...params}
                                                        // label="Dipendente"
                                                    />}
                                                />
                                            </TableCell>
                                        } else {
                                            return <TableCell
                                                key={index}
                                                {...cell.getCellProps()}
                                            >
                                                {cell.render('Cell')}
                                            </TableCell>
                                        }
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </ScrollX>
        </MainCard>
    );
};

export default Timesheet_Table;
