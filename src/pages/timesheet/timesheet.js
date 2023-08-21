import * as React from "react"
import {ReactGrid} from "@silevis/reactgrid"
import "@silevis/reactgrid/styles.css"
import Button from '@mui/material/Button';
import MainCard from 'components/MainCard';
//import "./styles.css"

const getPeople = () => [
    {name: "Thomas", surname: "Goldman"},
    {name: "Susie", surname: "Quattro"},
    {name: "", surname: ""}
]

const getColumns = () => [
    {columnId: "name", width: 150},
    {columnId: "surname", width: 150}
]

const headerRow = {
    rowId: "header",
    cells: [
        {type: "header", text: "Name"},
        {type: "header", text: "Surname"}
    ]
}

const getRows = people => [
    headerRow,
    ...people.map((person, idx) => ({
        rowId: idx,
        cells: [
            {type: "text", text: person.name},
            {type: "text", text: person.surname}
        ]
    }))
]

const TSSS = () => {
    const [people] = React.useState(getPeople())

    const rows = getRows(people)
    const columns = getColumns()

    const handleAddTSRow = () => {
        const new_row = createData();
        setData(current => [...current, new_row]);
    };

    return (
        <MainCard content={false}>
            <Button
                onClick={handleAddTSRow}
                sx={{margin: "1%"}}
                variant="contained"
            >
                Aggiungi Riga
            </Button>
            <ReactGrid rows={rows} columns={columns}/>
        </MainCard>
    );
}

export default TSSS
