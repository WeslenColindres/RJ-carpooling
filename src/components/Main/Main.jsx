import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Navbar } from '../Navbar/Navbar'
import { Login } from '../Login/Login'
import AppRunDeposit from '../componetDeposit/AppRunDeposit';
import { VerificacionUser } from '../ComponentsVerification/VerificacionUser';
import MainVerificacion from '../ComponentsVerification/main';
import axios from "axios"
import { VerificacionDetail } from '../ComponentsVerification/VerificacionDetail';



export const Main = () => {
    const [token, setToken] = useState();
    const [admin, setAdmin] = useState();
    const [Solicitudes, setSolicitudes] = useState([])
    const [getID, setGetID] = useState()
    const [getUser, setGetUser] = useState(
        {
            _id: "",
            user_id: {
                _id: 0,
                full_name: "",
                email: "",
                phone: 0,
                birth_date: "",
                DPI: "",
                profile_picture: "",
                verification_status: true,
                __v: 0
            },
            car_profile_photo: [
                {
                    _id: "",
                    car_profile_photo1: "",
                    car_profile_photo2: ""
                }
            ],
            profile_selfie_photo: [
                {
                    _id: "",
                    profile_selfie_photo1: "",
                    profile_selfie_photo2: ""
                }
            ],
            car_ownership_document: "",
            comment: "",
            request_status: "pendiente",
            verification_date: "",
            __v: 0
        }
    )

    useEffect(() => {
        axios.get(`https://api-usuarios-levelup.herokuapp.com/verification`)
        .then(res => {
          const data = res.data;
          setSolicitudes(data);
          
        })
        
    }, [getUser])
    

    useEffect(() => {
        axios.put(`https://api-usuarios-levelup.herokuapp.com/verification/${getUser._id}`, getUser)
        

    }, [getUser])

    useEffect(() => {
        axios.put(`https://api-usuarios-levelup.herokuapp.com/user/${getUser.user_id._id}`, getUser.user_id)
        

    }, [getUser.user_id.verification_status])

    

    

    useEffect(() => {
        axios.get(`https://api-usuarios-levelup.herokuapp.com/verification/${getID}`)
        .then(res => {
          const data = res.data;
          setGetUser(data);
          
        })
       
    }, [getID])

    const HandleId = (id) =>{
        setGetID(id)
    }

    useEffect(() => {
        setToken(JSON.parse(localStorage.getItem('token')));
        setAdmin(JSON.parse(localStorage.getItem('admin')));
    }, [])

    return (
        <>
            <div style={{ height: '100vh', background: '#00b2bb' }}>
                <Routes >
                    <Route path='/login&register' element={
                        !token ?
                            <Navbar token={token} setToken={setToken} admin={admin} setAdmin={setAdmin}>
                                <Login setToken={setToken} setAdmin={setAdmin} />
                            </Navbar>
                            :
                            <Navigate to="/solicitudesDeposito" />
                    } />
                    <Route path='/solicitudesDeposito' element={
                        token ?
                            <Navbar token={token} setToken={setToken} admin={admin} setAdmin={setAdmin}>
                                {/* Component Child */}
                                <AppRunDeposit />
                            </Navbar>
                            :
                            <Navigate to="/login&register" />
                    } />
                    <Route path='/solicitudesVerificacion' element={
                        token ?
                            <Navbar token={token} setToken={setToken} admin={admin} setAdmin={setAdmin}>
                                {/* Component Child */}
                                <VerificacionUser Solicitudes = {Solicitudes} handleID = {HandleId} />

                            </Navbar>
                            :
                            <Navigate to="/login&register" />
                    } />
                    <Route path='*' element={
                        !token ?
                            <Navigate to='/login&register' />
                            :
                            <Navigate to="/solicitudesDeposito" />
                    } />
                    <Route  path='/VerificationDetail' element= {<VerificacionDetail getUser = {getUser} setGetUser = {setGetUser} />} />
                </Routes>
            </div>
        </>
    )
}
