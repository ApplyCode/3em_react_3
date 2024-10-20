import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { GridRowModes, DataGrid, GridToolbarContainer, GridActionsCellItem, GridRowEditStopReasons } from '@mui/x-data-grid';
import { randomTraderName, randomId, randomArrayItem } from '@mui/x-data-grid-generator';
import { Card, CardHeader, Checkbox, Paper } from '@mui/material';
import { MuiFileInput } from "mui-file-input";

function EditToolbar(props) {

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
        Add Expense Line
      </Button>
    </GridToolbarContainer>
  );
}
export default function ExpenseTable() {

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

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const { setRows, setRowModesModel } = props;
  const secondColumns = [
    {
      field: 'name',
      headerName: 'Clerk',
      editable: true,
      sortable: false,
      width: 150,
      type: 'singleSelect',
      valueOptions: ['John', 'Andre', 'Tom']
    },
    {
      field: 'description',
      headerName: 'Description',
      editable: true,
      sortable: false,
      width: 200,
      type: 'singleSelect',
      valueOptions: ['Taxi', 'Treno', 'Aereo', 'Noleggio Auto', 'Alloggio', 'Carburante', 'Pedaggio', 'Materiali', 'Sim Telefono', 'Altro']
    },
    { field: 'amount', headerName: 'Amount', width: 180, editable: true },
    {
      field: 'repaid',
      headerName: 'To Be Repaid',
      type: 'actions',
      renderCell: (params) => (
        <Checkbox checked={params.value} />
      ),
    },
    {
      field: 'file',
      headerName: 'Attached',
      type: 'actions',
      editable: false,
      renderCell: (params) => (
        <MuiFileInput
          label=""
          value={params.value} 
        />
      ),
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

  return (
    <>
      <Card sx={{ width: '100%' }}>
        <CardHeader
          title="Expenses"
          style={{
            backgroundColor: "#87CEFA",
            fontSize: "24px"
          }}
          avatar={<EditNoteIcon />}
        />
        <Box
          sx={{
            height: 300,
            '& .actions': {
              color: 'text.secondary'
            },
            '& .textPrimary': {
              color: 'text.primary'
            }
          }}
        >
          <DataGrid
            rows={rows}
            columns={secondColumns}
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
          />
        </Box>
      </Card>
    </>
  );
}
