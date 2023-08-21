import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { GridRowModes, DataGrid, GridToolbarContainer, GridActionsCellItem, GridRowEditStopReasons } from '@mui/x-data-grid';
import { randomTraderName, randomId, randomArrayItem } from '@mui/x-data-grid-generator';
import { Card, CardHeader } from '@mui/material';

const initialRows = [
  {
    id: randomId(),
    transer: 'Select...'
  }
];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' }
    }));
  };

  return (
    <GridToolbarContainer>
      <Button variant="outlined" color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add Timesheet Row
      </Button>
    </GridToolbarContainer>
  );
}
export default function TimesheetTable() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  const columns = [
    {
      field: 'name',
      headerName: 'Clerk',
      editable: true,
      sortable: false,
      type: 'singleSelect',
      valueOptions: ['John', 'Andre', 'Tom']
    },
    ...Array.from({ length: daysInMonth }, (_, index) => ({
      field: `d${index + 1}`,
      headerName: (index + 1).toString(),
      type: 'string',
      width: 10,
      editable: true,
      sortable: false
    })),
    {
      field: 'total',
      headerName: 'TOTAL',
      type: 'number',
      editable: false,
      renderCell: (params) => {
        const rowValues = Object.keys(params.row)
          .filter((key) => key.startsWith('d'))
          .map((key) => parseFloat(params.row[key]) || 0);
        const total = rowValues.reduce((sum, value) => sum + value, 0);
        return <div>{total}</div>;
      }
    },
    {
      field: 'activity',
      headerName: 'Activity',
      width: 220,
      editable: true,
      type: 'singleSelect',
      valueOptions: [
        'Select...',
        'In-house SW design',
        'FAT SW at customer',
        'FAT for MEAS',
        'Commissioning',
        'Internal training',
        'Secretariat'
      ]
    },
    {
      field: 'transfer',
      headerName: 'Transfer',
      width: 220,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Abroad', 'Italy', 'FAT', 'NO']
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main'
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />
          ];
        }

        return [
          <GridActionsCellItem icon={<EditIcon />} label="Edit" className="textPrimary" onClick={handleEditClick(id)} color="inherit" />,
          <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={handleDeleteClick(id)} color="inherit" />
        ];
      }
    }
  ];

  const columnTotals = columns.map((col) => {
    if (col.field !== 'total') {
      const total = rows.reduce((sum, row) => sum + (parseFloat(row[col.field]) || 0), 0);
      return total;
    }
    return null;
  });

  const totalRow = {
    id: 'totalRow',
    name: 'Total', // Name for the total row
    ...columnTotals.reduce((acc, total, index) => {
      const field = `d${index + 1}`;
      acc[field] = total;
      return acc;
    }, {}),
    total: columnTotals.reduce((sum, total) => sum + (total || 0), 0) // Total of the totals
  };

  const rowsWithTotal = [...rows, totalRow];

  return (
    <>
      <Card sx={{ width: '100%' }}>
        <CardHeader
          title="Timesheets"
          sx={{
            backgroundColor: "#87CEFA",
            fontSize: "24px"
          }}
          avatar={<EditNoteIcon />}
        />
        <Box
          sx={{
            height: 500,
            width: '100%',
            '& .actions': {
              color: 'text.secondary'
            },
            '& .textPrimary': {
              color: 'text.primary'
            }
          }}
        >
          <DataGrid
            rows={rowsWithTotal}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            slots={{
              toolbar: EditToolbar
            }}
            slotProps={{
              toolbar: { setRows, setRowModesModel }
            }}
            disableColumnMenu
            isCellEditable={(params) => params.row.name !== 'Total'}
          />
        </Box>
      </Card>
    </>
  );
}