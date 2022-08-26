import * as React from 'react';
import { Stack, Avatar, Modal, Typography, Box } from '@mui/material';
import { Divider, Button, TextField, Fade, Backdrop, Grid } from '@mui/material';
import Databank from './dataBanc/Databank';
import { dateCreation, StyledPaper, style2 } from '../componetDeposit';

export default function Modaldata({ handleClose, open, pruevaverificacion, setpruevaverificacion }) {
    const { user_id, creation_date, bank_data, amount_deposit, comment, deposit_status } = pruevaverificacion;
    const formtNumber = (number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "GTQ",
        }).format(number)
    }

    const handelChange = (event) => {
        const { name, value } = event.target;
        setpruevaverificacion({ ...pruevaverificacion, [name]: value })
    }

    const handleStatePetition = (peticio) => {
        setpruevaverificacion({ ...pruevaverificacion, deposit_status: peticio })
    }



    return (
        <div >
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style2}>
                        <StyledPaper
                            sx={{
                                my: 1,
                                mx: 'auto',
                                p: 2,
                            }}
                        >
                            <Grid container
                                justify="center"
                                alignItems="center"
                                direction="column"
                                style={{ minHeight: "50ch" }}
                                spacing={0}>

                                <Grid item>
                                    <Stack spacing={2}>
                                        <Avatar
                                            alt="Remy Sharp"
                                            src={user_id.profile_picture}
                                            sx={{ width: 100, height: 100 }}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item>
                                    <Typography id="modal-modal-title1" variant="h6" component="h2">
                                        {user_id.full_name}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography id="modal-modal-description" variant="h10" sx={{ mt: 10 }}>
                                        Teléfono: {user_id.phone}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography id="modal-modal-description" variant="h10" sx={{ mt: 2 }}>
                                        {dateCreation(creation_date)}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography id="modal-modal-description" variant="h10" component="h2" sx={{ mt: 2 }}>
                                        Data de banco
                                    </Typography>
                                    {bank_data.map((bank) => (<Databank bank={bank} key={bank._id} />))}
                                </Grid>
                                <Grid item>
                                    <Typography id="modal-modal-description" variant="h10" component="h2" sx={{ mt: 2 }}>
                                        Monto atransferir
                                    </Typography>
                                </Grid>
                                <Grid item style={{ minHeight: "10ch" }}>
                                    <Typography id="modal-modal-description" variant="h10" sx={{ mt: 2 }}>
                                        {formtNumber(amount_deposit)}
                                    </Typography>
                                </Grid>
                                <Grid item style={{ width: "40ch", mt: 2 }}>
                                    <Divider />
                                </Grid>
                                <Grid item sx={{ mt: 4 }}>
                                    <Box
                                        component="form"
                                        sx={{
                                            '& .MuiTextField-root': { m: 1, width: '40ch' },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        {deposit_status !== "pendiente" ?
                                            <div>
                                                <TextField
                                                    id="outlined-multiline-static"
                                                    name="comment"
                                                    label="Mensaje para el conductor"
                                                    value={comment}
                                                    rows={4}
                                                    variant="outlined"
                                                    multiline
                                                    disabled

                                                />
                                            </div>
                                            :
                                            <div>
                                                <TextField
                                                    id="outlined-multiline-static"
                                                    name="comment"
                                                    label="Deja un mensaje al conductor (Opcional)"
                                                    value={comment}
                                                    rows={4}
                                                    variant="outlined"
                                                    onChange={handelChange}
                                                    style={{ outline: 'none' }}
                                                    multiline


                                                />
                                            </div>
                                        }

                                    </Box>
                                </Grid>
                                <Grid item>
                                    {
                                        deposit_status === "pendiente" ?
                                            <Stack spacing={2} direction="row">
                                                <Button variant="outlined" color="error" onClick={() => handleStatePetition("rechazado")} >
                                                    Rechazado Deposito
                                                </Button>
                                                <Button variant="contained" color="success" onClick={() => handleStatePetition("enviado")} sx={{ mt: 2 }}>
                                                    Enviado Deposito
                                                </Button>
                                            </Stack >
                                            :
                                            deposit_status === "rechazado" ?
                                                <Button variant="outlined" color="error" disabled>
                                                    Deposito Fallido
                                                </Button>
                                                :
                                                <Button variant="contained" color="success" disabled>
                                                    Deposito Realizado
                                                </Button>
                                    }
                                </Grid>
                            </Grid>
                        </StyledPaper>
                    </Box>
                </Fade>
            </Modal>
        </div>

    );
}

