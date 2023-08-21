import {useDispatch, useSelector} from 'react-redux';
import { useState, useEffect, useCallback } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import {store} from "store";

// material-ui
import { Button, Grid, InputLabel, Stack, TextField, Select, MenuItem, Autocomplete, FormHelperText } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import { openSnackbar } from 'store/reducers/snackbar';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

// api
import {getClienti, getCommittenti, getResponsabiliAcquisti} from "api/anagrafica";

/**
 * 'Enter your email'
 * yup.string Expected 0 arguments, but got 1 */
const validationSchema = yup.object({
    data_emissione: yup.string().required('Inserire data emissione'),
    data_inizio: yup.string().required('Inserire data inizio'),
    committente: yup.string().required('Selezionare committente'),
    responsabile_acquisti: yup.string().required('Selezionare responsabile acquisti'),
    cliente_finale: yup.string().required('Selezionare cliente finale'),
    tipo: yup.string().required('Selezionare tipo ordine'),
    attivita: yup.string().required('Selezionare attività'),
    commessa: yup.string().required('Inserire numero commessa'),
    numero_ordine: yup.string().required('Inserire numero ordine'),
    stato: yup.string().required('Selezionare stato'),
    ore_reali: yup.string().required('Selezionare ore reali'),
    //data_inizio: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required')
});

// ==============================|| FORM VALIDATION - LOGIN FORMIK  ||============================== //

const FormOrdiniCreate = () => {
    const dispatch = useDispatch();
    const operatori = useSelector((state) => state.ordini);
    const [formData, setFormData] = useState({
        data_emissione: new Date(),
        data_inizio: new Date(),
        data_fine: '',
        committente: '',
        responsabile_acquisti: '',
        cliente_finale: '',
        tipo: '',
        attivita: '',
        commessa: '',
        numero_ordine: '',
        limite_importo: '',
        stato: 1,
        ore_reali: 0,
        descrizione: ''
    });
    const [inputCommittente, setinputCommittente] = useState('');
    const [selectCommittenti, setSelectCommittenti] = useState([]);
    const [inputResponsabileAcquisti, setinputResponsabileAcquisti] = useState('');
    const [selectResponsabileAcquisti, setSelectResponsabileAcquisti] = useState([]);
    const [inputClienteFinale, setinputClienteFinale] = useState('');
    const [selectClienteFinale, setSelectClienteFinale] = useState([]);
    const [dataEmissione, setDataEmissione] = useState(new Date());
    const [dataInizio, setDataInizio] = useState(new Date());
    const [dataFine, setDataFine] = useState(null);

    const formik = useFormik({
        initialValues: {
            data_emissione: formData.data_emissione,
            data_inizio: formData.data_inizio,
            data_fine: formData.data_fine,
            committente: formData.committente,
            responsabile_acquisti: formData.responsabile_acquisti,
            cliente_finale: formData.cliente_finale,
            tipo: formData.tipo,
            attivita: formData.attivita,
            commessa: formData.commessa,
            numero_ordine: formData.ordine,
            limite_importo: formData.limite_importo,
            stato: formData.stato,
            ore_reali: formData.ore_reali,
            descrizione: formData.descrizione
        },
        validationSchema,
        onSubmit: (values) => {
            console.log('select form submit - ', values);
            console.log(operatori)
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

    const fetchCommittenti = useCallback(async ({ filters }) => {
        return await getCommittenti(0, 0, filters, false)
    }, [])

    const fetchResponsabiliAcquisti = useCallback(async ({ filters }) => {
        return await getResponsabiliAcquisti(0, 0, filters, false)
    }, [])

    const fetchClientiFinali = useCallback(async ({ filters }) => {
        return await getClienti(0, 0, filters, false)
    }, [])

    const handleSelectCommittente = (committente) => {
        formData.committente = committente
        setFormData(formData)
    }

    const handleInputCommittente = (v) => {
        setinputCommittente(v)
    }

    const handleSelectResponsabileAcquisti = (ra) => {
        formData.responsabile_acquisti = ra
        setFormData(formData)
    }

    const handleInputResponsabileAcquisti = (v) => {
        setinputResponsabileAcquisti(v)
    }

    const handleSelectClienteFinale = (cf) => {
        formData.cliente_finale = cf
        setFormData(formData)
    }

    const handleInputClienteFinale = (v) => {
        setinputClienteFinale(v)
    }

    useEffect(() => {
        console.log(formData)
        let filters = [{id: "nome", value: inputCommittente}]
        fetchCommittenti({ filters })
            .then(res => {
                console.log(res)
                let newCommittenti = []
                res.RETURNVALUES[0].forEach((item) => {
                    newCommittenti.push({id: item.id, nome: item.nome})
                })
                setSelectCommittenti(newCommittenti)
            })
    }, [inputCommittente]);

    useEffect(() => {
        console.log(formData)
        let filters = [{id: "nome", value: inputClienteFinale}]
        fetchClientiFinali({ filters })
            .then(res => {
                console.log(res)
                let newCF = []
                res.RETURNVALUES[0].forEach((item) => {
                    newCF.push({id: item.id, nome: item.nome})
                })
                setSelectClienteFinale(newCF)
            })
    }, [inputClienteFinale]);

    useEffect(() => {
        console.log(formData)
        let filters = [{id: "nome", value: inputResponsabileAcquisti}]
        if (typeof formData.committente !== 'undefined') {
            filters.push({id: "id_committente", value: formData.committente})
        }
        fetchResponsabiliAcquisti({ filters })
            .then(res => {
                console.log(res)
                let newResponsabiliAcquisti = []
                res.RETURNVALUES[0].forEach((item) => {
                    newResponsabiliAcquisti.push({id: item.id, nome: item.nome})
                })
                setSelectResponsabileAcquisti(newResponsabiliAcquisti)
            })
    }, [inputResponsabileAcquisti, inputCommittente]);

    const test = () => {
        console.log(operatori)
    }

    return (
        <MainCard>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item md={4} xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="data_emissione">Data Emissione</InputLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    id = "data_emissione"
                                    name = "data_emissione"
                                    // label={props.label}
                                    value={dataEmissione}
                                    // inputFormat="E MMM dd yyyy HH:MM:SS O"
                                    onChange={(e) => {
                                        console.log(e);
                                        setDataEmissione(e);
                                        formik.handleChange
                                    }}
                                    onBlur={formik.handleBlur}
                                    renderInput={(params) => <TextField {...params} fullWidth />}
                                />
                                {formik.touched.data_emissione && formik.errors.data_emissione ? (
                                    <div>{formik.errors.data_emissione}</div>
                                ) : null}
                            </LocalizationProvider>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="data_inizio">Data Inizio</InputLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    id = "data_inizio"
                                    name = "data_inizio"
                                    // label={props.label}
                                    value={dataInizio}
                                    // inputFormat="E MMM dd yyyy HH:MM:SS O"
                                    onChange={(e) => {
                                        console.log(e);
                                        setDataInizio(e);
                                        formik.handleChange
                                    }}
                                    onBlur={formik.handleBlur}
                                    renderInput={(params) => <TextField {...params} fullWidth />}
                                />
                            </LocalizationProvider>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="data_fine">Data Fine</InputLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    id = "data_fine"
                                    name = "data_fine"
                                    // label={props.label}
                                    value={dataFine}
                                    // inputFormat="E MMM dd yyyy HH:MM:SS O"
                                    onChange={(e) => {
                                        console.log(e);
                                        setDataFine(e);
                                        formik.handleChange
                                    }}
                                    onBlur={formik.handleBlur}
                                    renderInput={(params) => <TextField {...params} fullWidth />}
                                />
                            </LocalizationProvider>
                        </Stack>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="committente">Committente</InputLabel>
                            <Autocomplete
                                freeSolo
                                // disablePortal
                                // value={dipendenti[row.index] || null}
                                noOptionsText=""
                                filterOptions={(x) => x}
                                autoComplete
                                includeInputInList
                                filterSelectedOptions

                                options={selectCommittenti}
                                getOptionLabel={ (option) => (option.nome || '') }
                                // sx={{ width: 300 }}
                                onChange={(e, v) => {
                                    handleSelectCommittente(v?.id)
                                    console.log(v)
                                    console.log(store.getState())
                                    formik.setFieldValue("committente", v?.id || {})
                                }}
                                // catturo nello state il valore di ciò che sto inserendo nel textfield
                                onInputChange={(event, value) => {
                                    handleInputCommittente(value)
                                    console.log(value)
                                }}
                                onBlur={formik.handleBlur}
                                renderInput={(params) => <TextField
                                    id="committente"
                                    name="committente"
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.committente && formik.errors.committente}
                                    helperText={formik.touched.committente && formik.errors.committente}
                                    value={formik.values.committente}
                                    {...params}
                                    // label="Dipendente"
                                />}
                            />
                        </Stack>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="responsabile_acquisti">Responsabile Acquisti</InputLabel>
                            <Autocomplete
                                freeSolo
                                // disablePortal
                                // value={dipendenti[row.index] || null}
                                noOptionsText=""
                                filterOptions={(x) => x}
                                autoComplete
                                includeInputInList
                                filterSelectedOptions
                                options={selectResponsabileAcquisti}
                                getOptionLabel={ (option) => (option.nome || '') }
                                // sx={{ width: 300 }}
                                onChange={(e, v) => {
                                    handleSelectResponsabileAcquisti(v?.id)
                                    console.log(v)
                                    formik.setFieldValue("responsabile_acquisti", v?.id || {})
                                }}
                                // catturo nello state il valore di ciò che sto inserendo nel textfield
                                onInputChange={(event, value) => {
                                    handleInputResponsabileAcquisti(value)
                                    console.log(value)
                                }}
                                onBlur={formik.handleBlur}
                                renderInput={(params) => <TextField
                                    id = "responsabile_acquisti"
                                    name = "responsabile_acquisti"
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.responsabile_acquisti && formik.errors.responsabile_acquisti}
                                    helperText={formik.touched.responsabile_acquisti && formik.errors.responsabile_acquisti}
                                    value={formik.values.responsabile_acquisti}
                                    {...params}
                                    // label="Dipendente"
                                />}
                            />
                        </Stack>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="cliente_finale">Cliente Finale</InputLabel>
                            <Autocomplete
                                freeSolo
                                // disablePortal
                                noOptionsText=""
                                filterOptions={(x) => x}
                                autoComplete
                                includeInputInList
                                filterSelectedOptions
                                options={selectClienteFinale}
                                getOptionLabel={ (option) => (option.nome || '') }
                                // sx={{ width: 300 }}
                                onChange={(e, v) => {
                                    handleSelectClienteFinale(v?.id)
                                    console.log(v)
                                    formik.setFieldValue("cliente_finale", v?.id || {})
                                }}
                                // catturo nello state il valore di ciò che sto inserendo nel textfield
                                onInputChange={(event, value) => {
                                    handleInputClienteFinale(value)
                                    console.log(value)
                                }}

                                onBlur={formik.handleBlur}

                                renderInput={(params) => <TextField
                                    id = "cliente_finale"
                                    name = "cliente_finale"
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.cliente_finale && formik.errors.cliente_finale}
                                    helperText={formik.touched.cliente_finale && formik.errors.cliente_finale}
                                    value={formik.values.cliente_finale}
                                    {...params}
                                    // label="Dipendente"
                                />}
                            />
                        </Stack>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="tipo">Tipo</InputLabel>
                            <Select
                                id="tipo"
                                name="tipo"
                                value={formik.values.tipo}
                                onChange={(e,v) => {
                                    formik.handleChange(e,v)
                                    formData.tipo = v.props.value
                                    setFormData(formData)
                                }}
                                error={formik.touched.tipo && Boolean(formik.errors.tipo)}
                            >
                                <MenuItem value={"a_pacchetto"}>A Pacchetto</MenuItem>
                                <MenuItem value={"daily_hourly_rate"}>Daily/Hourly Rate</MenuItem>
                            </Select>
                            {formik.errors.tipo && formik.touched.tipo && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {' '}
                                    {formik.errors.tipo}{' '}
                                </FormHelperText>
                            )}
                        </Stack>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="attivita">Attività</InputLabel>
                            <Select
                                id="attivita"
                                name="attivita"
                                value={formik.values.attivita}
                                onChange={(e,v) => {
                                    formik.handleChange(e,v)
                                    formData.attivita = v.props.value
                                    setFormData(formData)
                                }}
                                error={formik.touched.attivita && Boolean(formik.errors.attivita)}
                            >
                                <MenuItem value={"hw"}>HW</MenuItem>
                                <MenuItem value={"l1"}>L1</MenuItem>
                                <MenuItem value={"l2"}>L2</MenuItem>
                                <MenuItem value={"training"}>Training</MenuItem>
                                <MenuItem value={"interna"}>Interna</MenuItem>
                                <MenuItem value={"trasferta"}>Trasferta</MenuItem>
                            </Select>
                            {formik.errors.attivita && formik.touched.attivita && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {' '}
                                    {formik.errors.attivita}{' '}
                                </FormHelperText>
                            )}
                        </Stack>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="commessa">Commessa</InputLabel>
                            <TextField
                                fullWidth
                                id="commessa"
                                name="commessa"
                                placeholder="Commessa"
                                value={formik.values.commessa}
                                onChange={(e) => {
                                    formik.handleChange(e)
                                    formData.commessa = e.target.value
                                    setFormData(formData)
                                }}
                                error={formik.touched.commessa && Boolean(formik.errors.commessa)}
                                helperText={formik.touched.commessa && formik.errors.commessa}
                            />
                        </Stack>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="numero_ordine">Ordine</InputLabel>
                            <TextField
                                fullWidth
                                id="numero_ordine"
                                name="numero_ordine"
                                placeholder="Ordine"
                                value={formik.values.numero_ordine}
                                onChange={(e) => {
                                    formik.handleChange(e)
                                    formData.numero_ordine = e.target.value
                                    setFormData(formData)
                                }}
                                error={formik.touched.numero_ordine && Boolean(formik.errors.numero_ordine)}
                                helperText={formik.touched.numero_ordine && formik.errors.numero_ordine}
                            />
                        </Stack>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="limite_importo">Limite Importo</InputLabel>
                            <TextField
                                fullWidth
                                id="limite_importo"
                                name="limite_importo"
                                placeholder="Limite Importo"
                                value={formik.values.limite_importo}
                                onChange={(e) => {
                                    formik.handleChange(e)
                                    formData.limite_importo = e.target.value
                                    setFormData(formData)
                                }}
                                error={formik.touched.limite_importo && Boolean(formik.errors.limite_importo)}
                                helperText={formik.touched.limite_importo && formik.errors.limite_importo}
                            />
                        </Stack>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="stato">Stato</InputLabel>
                            <Select
                                id="stato"
                                name="stato"
                                value={formik.values.stato}
                                onChange={(e,v) => {
                                    formik.handleChange(e,v)
                                    formData.stato = v
                                    setFormData(formData)
                                }}
                            >
                                <MenuItem value={1}>Aperto</MenuItem>
                                <MenuItem value={0}>Chiuso</MenuItem>
                            </Select>
                            {formik.errors.stato && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {' '}
                                    {formik.errors.stato}{' '}
                                </FormHelperText>
                            )}
                        </Stack>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="ore_reali">Ore Reali</InputLabel>
                            <Select
                                id="ore_reali"
                                name="ore_reali"
                                value={formik.values.ore_reali}
                                onChange={(e,v) => {
                                    formik.handleChange(e,v)
                                    formData.ore_reali = v
                                    setFormData(formData)
                                }}
                            >
                                <MenuItem value={1}>Sì</MenuItem>
                                <MenuItem value={0}>No</MenuItem>
                            </Select>
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="descrizione"
                            label="Descrizione"
                            multiline
                            rows={4}
                            //defaultValue=""
                            value={formik.values.descrizione}
                            onChange={(e) => {
                                formik.handleChange(e)
                                formData.descrizione = e.target.value
                                setFormData(formData)
                            }}
                            error={formik.touched.descrizione && Boolean(formik.errors.descrizione)}
                            helperText={formik.touched.descrizione && formik.errors.descrizione}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="flex-end">
                            <AnimateButton>
                                <Button variant="contained" type="submit">
                                    Verify & Submit
                                </Button>
                                <Button variant="contained" onClick={test}>
                                    Test
                                </Button>
                            </AnimateButton>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </MainCard>
    );
};

export default FormOrdiniCreate;
