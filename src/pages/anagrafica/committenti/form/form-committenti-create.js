import { useDispatch } from 'store';
import { useState } from 'react';

// material-ui
import { Button, Grid, InputLabel, Stack, TextField, Select, MenuItem, FormHelperText } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import { openSnackbar } from 'store/reducers/snackbar';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

/**
 * 'Enter your email'
 * yup.string Expected 0 arguments, but got 1 */
const validationSchema = yup.object({
    nome: yup.string().required('Inserire nome'),
    partita_iva: yup.string().required('Inserire Partita IVA'),
    numero_convenzione: yup.string().required('Inserire Numero Convenzione')
});

// ==============================|| FORM VALIDATION - LOGIN FORMIK  ||============================== //

const FormCommittentiCreate = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        nome: '',
        partita_iva: '',
        numero_convenzione: '',
        includi_ein_number: 0,
    });

    const formik = useFormik({
        initialValues: {
            nome: formData.nome,
            partita_iva: formData.partita_iva,
            numero_convenzione: formData.numero_convenzione,
            includi_ein_number: formData.includi_ein_number,
        },
        validationSchema,
        onSubmit: (values) => {
            console.log('select form submit - ', values);
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Submit Success',
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: false
                })
            );
        }
    });

    return (
        <MainCard>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item md={3} xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="nome">Nome</InputLabel>
                            <TextField
                                fullWidth
                                id="nome"
                                name="nome"
                                placeholder="Nome"
                                value={formik.values.nome}
                                onChange={(e) => {
                                    formik.handleChange(e)
                                    formData.nome = e.target.value
                                    setFormData(formData)
                                }}
                                error={formik.touched.nome && Boolean(formik.errors.nome)}
                                helperText={formik.touched.nome && formik.errors.nome}
                            />
                        </Stack>
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="partita_iva">Partita IVA</InputLabel>
                            <TextField
                                fullWidth
                                id="partita_iva"
                                name="partita_iva"
                                placeholder="Partita IVA"
                                value={formik.values.partita_iva}
                                onChange={(e) => {
                                    formik.handleChange(e)
                                    formData.partita_iva = e.target.value
                                    setFormData(formData)
                                }}
                                error={formik.touched.partita_iva && Boolean(formik.errors.partita_iva)}
                                helperText={formik.touched.partita_iva && formik.errors.partita_iva}
                            />
                        </Stack>
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="numero_convenzione">Numero Convenzione</InputLabel>
                            <TextField
                                fullWidth
                                id="numero_convenzione"
                                name="numero_convenzione"
                                placeholder="Numero Convenzione"
                                value={formik.values.numero_convenzione}
                                onChange={(e) => {
                                    formik.handleChange(e)
                                    formData.numero_convenzione = e.target.value
                                    setFormData(formData)
                                }}
                                error={formik.touched.numero_convenzione && Boolean(formik.errors.numero_convenzione)}
                                helperText={formik.touched.numero_convenzione && formik.errors.numero_convenzione}
                            />
                        </Stack>
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="includi_ein_number">Includi EIN Number in Fattura</InputLabel>
                            <Select
                                id="includi_ein_number"
                                name="includi_ein_number"
                                value={formik.values.includi_ein_number}
                                onChange={(e,v) => {
                                    formik.handleChange(e,v)
                                    formData.includi_ein_number = v
                                    setFormData(formData)
                                }}
                            >
                                <MenuItem value={1}>Sì</MenuItem>
                                <MenuItem value={0}>No</MenuItem>
                            </Select>
                            {formik.errors.includi_ein_number && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {' '}
                                    {formik.errors.includi_ein_number}{' '}
                                </FormHelperText>
                            )}
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="flex-end">
                            <AnimateButton>
                                <Button variant="contained" type="submit">
                                    Verify & Submit
                                </Button>
                            </AnimateButton>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </MainCard>
    );
};

export default FormCommittentiCreate;
