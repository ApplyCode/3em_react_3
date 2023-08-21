import { Grid } from '@mui/material';
import Timesheet_Table from "./timesheet-table";

const Timesheet = () => {
    return (
        <>
            <Timesheet_Table/>
            <br/>
            <Grid container spacing={2.5}>
                <Grid item xs={12}>

                </Grid>
            </Grid>
        </>
    )
}

export default Timesheet;