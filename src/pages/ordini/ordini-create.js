import OrdiniCreate_TableOperatori from "./create/table-operatori";
import FormOrdiniCreate from "./form/form-ordini-create";

import { Grid } from '@mui/material';

const OrdiniCreate = () => {
    return (
        <>
            <OrdiniCreate_TableOperatori/>
            <br/>
            <Grid container spacing={2.5}>
                <Grid item xs={12}>
                    <FormOrdiniCreate/>
                </Grid>
            </Grid>
        </>
    )
}

export default OrdiniCreate;