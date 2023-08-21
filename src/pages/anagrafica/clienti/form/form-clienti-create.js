import { useDispatch } from 'store';
import { useState } from 'react';

// material-ui
import { Button, Grid, InputLabel, Stack, TextField } from '@mui/material';

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

const FormClientiCreate = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        nome: '',
        stato: '',
        provincia: '',
    });

    const formik = useFormik({
        initialValues: {
            nome: formData.nome,
            stato: formData.stato,
            provincia: formData.provincia,
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
                    <Grid item xs={12}>
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
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="stato">Stato</InputLabel>
                            <TextField
                                fullWidth
                                id="stato"
                                name="stato"
                                placeholder="Stato"
                                value={formik.values.stato}
                                onChange={(e) => {
                                    formik.handleChange(e)
                                    formData.stato = e.target.value
                                    setFormData(formData)
                                }}
                                error={formik.touched.stato && Boolean(formik.errors.stato)}
                                helperText={formik.touched.stato && formik.errors.stato}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="provincia">Provincia</InputLabel>
                            <TextField
                                fullWidth
                                id="provincia"
                                name="provincia"
                                placeholder="Provincia"
                                value={formik.values.provincia}
                                onChange={(e) => {
                                    formik.handleChange(e)
                                    formData.provincia = e.target.value
                                    setFormData(formData)
                                }}
                                error={formik.touched.provincia && Boolean(formik.errors.provincia)}
                                helperText={formik.touched.provincia && formik.errors.provincia}
                            />
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

export default FormClientiCreate;
