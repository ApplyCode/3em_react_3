import FormCommittentiCreate from "./form/form-committenti-create";

import { Grid } from '@mui/material';

const CommittentiCreate = () => {
    return (
        <>
            <Grid container spacing={2.5}>
                <Grid item xs={12}>
                    <FormCommittentiCreate/>
                </Grid>
            </Grid>
        </>
    )
}

export default CommittentiCreate;