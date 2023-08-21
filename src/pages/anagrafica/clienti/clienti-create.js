import FormClientiCreate from "./form/form-clienti-create";

import { Grid } from '@mui/material';

const CommittentiCreate = () => {
    return (
        <>
            <Grid container spacing={2.5} xs={12} md={6.5}>
                <Grid item xs={12}>
                    <FormClientiCreate/>
                </Grid>
            </Grid>
        </>
    )
}

export default CommittentiCreate;