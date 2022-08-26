import React, { useEffect, useRef, useState } from 'react'
import { Button, TextField, Box, Typography, Container, GlobalStyles } from '@mui/material';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { LockOutlined, AppRegistration } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const Login = ({ setToken, setAdmin }) => {

    const auth = getAuth();
    const correo = useRef();
    const contrasena = useRef();
    const [account, setAccount] = useState();
    const navigate = useNavigate()

    useEffect(() => {
        let verify = JSON.parse(localStorage.getItem('account'));
        if (verify === null || verify === undefined) {
            verify = true
        }
        setAccount(verify)
    }, [])

    const handleLogin = (e) => {
        e.preventDefault();
        const email = correo.current.value;
        const password = contrasena.current.value;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                localStorage.setItem('identidad', JSON.stringify(user));
                localStorage.setItem('token', JSON.stringify(user.accessToken));
                localStorage.setItem('admin', true);
                Swal.fire({
                    title: 'Inicio de sesión satisfactorio',
                    icon: 'success',
                    position: 'center',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true
                });
                setToken(user.accessToken);
                setAdmin(true);
                navigate('/solicitudesDeposito',{replace: true})
            })
            .catch((error) => {
                switch (error.code) {
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                        Swal.fire({
                            title: 'Correo invalido o campo vacío',
                            icon: 'error',
                            position: 'center',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true
                        });
                        break;
                    case "auth/wrong-password":
                        Swal.fire({
                            title: 'Contraseña incorrecta',
                            icon: 'error',
                            position: 'center',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true
                        });
                        break;
                }
            });
    }

    const handleRegister = (e) => {
        e.preventDefault();
        const email = correo.current.value;
        const password = contrasena.current.value;
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                localStorage.setItem('identidad', JSON.stringify(user));
                localStorage.setItem('token', JSON.stringify(user.accessToken));
                localStorage.setItem('admin', true);
                setToken(user.accessToken);
                setAdmin(true);
                Swal.fire({
                    title: 'Cuenta creada satisfactoriamente',
                    icon: 'success',
                    position: 'center',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true
                });
                navigate('/solicitudesDeposito',{replace: true})
            })
            .catch((error) => {
                switch (error.code) {
                    case "auth/email-already-in-use":
                    case "auth/invalid-email":
                        Swal.fire({
                            title: 'Correo invalido o campo vacío',
                            icon: 'error',
                            position: 'center',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true
                        });
                        break;
                    case "auth/weak-password":
                        Swal.fire({
                            title: 'Contraseña invalida',
                            icon: 'error',
                            position: 'center',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true
                        });
                        break;
                }

            });
    }

    const handleAccount = (e) => {
        e.preventDefault();
        localStorage.setItem('account', !account)
        setAccount(!account);
        correo.current.value = '';
        contrasena.current.value = '';
    }

    return (
        <Container component="main" maxWidth="xs" sx={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center'
        }}>
            <GlobalStyles styles={{ input: { color: 'white!important' } }} />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {
                    account
                        ?
                        <>
                            <LockOutlined sx={{ m: 1, fontSize: 30, color: 'white' }} />
                            <Typography component="h1" variant="h5" sx={{ color: 'white', mb: 1 }}>
                                Iniciar Sesión
                            </Typography>
                        </>
                        :
                        <>
                            <AppRegistration sx={{ m: 1, fontSize: 30, color: 'white' }} />
                            <Typography component="h1" variant="h5" sx={{ color: 'white', mb: 1 }}>
                                Registrate
                            </Typography>
                        </>
                }

                <Box component="form" sx={{ mt: 1 }}>
                    <TextField
                        inputRef={correo}
                        label="Correo Electrónico"
                        type="email"
                        color='blanco'
                        required
                        fullWidth
                        focused
                    />
                    <TextField
                        inputRef={contrasena}
                        label="Contraseña"
                        type="password"
                        color='blanco'
                        required
                        fullWidth
                        focused
                        sx={{ mt: 3 }}
                    />
                    {
                        account ?
                            <>
                                <Button
                                    type="submit"
                                    fullWidth
                                    color="celeste"
                                    variant='contained'
                                    sx={{
                                        mt: 3,
                                        mb: 3
                                    }}
                                    onClick={handleLogin}
                                >
                                    Iniciar Sesión
                                </Button>
                                <div style={{ display: 'flex', justifyContent: 'center', color: 'white' }}>
                                    <span style={{ paddingRight: '5px' }}>No tienes una cuenta? </span>
                                    <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={handleAccount}>Registrate</span>
                                </div>
                            </>
                            :
                            <>
                                <Button
                                    type="submit"
                                    fullWidth
                                    color="celeste"
                                    variant='contained'
                                    sx={{
                                        mt: 3,
                                        mb: 3
                                    }}
                                    onClick={handleRegister}
                                >
                                    Registrarse
                                </Button>
                                <div style={{ display: 'flex', justifyContent: 'center', color: 'white' }}>
                                    <span style={{ paddingRight: '5px' }}> Ya tienes una cuenta?
                                    </span>
                                    <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={handleAccount}> Inicia sesión</span>
                                </div>
                            </>
                    }

                </Box>
            </Box>
        </Container>
    )
}
