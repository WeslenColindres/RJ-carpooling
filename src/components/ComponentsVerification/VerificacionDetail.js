import React from 'react'
import "./verificacion.css"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import {Carousel} from "react-responsive-carousel"
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios"
import {useNavigate} from 'react-router-dom';
import { Grid, Box, Typography, Divider } from '@mui/material';


export const VerificacionDetail = ({getUser,setGetUser}) => {

    
   
    

    const dataAceptado = () => {
        
        setGetUser(
            {
            ...getUser,
            request_status: "aceptado",
            user_id:{
                ...getUser.user_id,  verification_status : true
            }
            
        }
        )  
          
        }
        const dataRechazado = () => {
        
            setGetUser(
                {
                ...getUser,
                request_status: "denegado",
                user_id:{
                    ...getUser.user_id,  verification_status : false
                }
            }
            )  
              
            }

           
        
      
      const SendAprobado = async () =>{
    
       await axios.put(`https://api-usuarios-levelup.herokuapp.com/verification/${getUser._id}`, getUser)
              

              await axios.put(`https://api-usuarios-levelup.herokuapp.com/user/${getUser._id}`, getUser)
               
               
      }
      const SendDenegado = async () =>{
    
        await axios.put(`https://api-usuarios-levelup.herokuapp.com/verification/${getUser._id}`, getUser)
               

               await axios.put(`https://api-usuarios-levelup.herokuapp.com/user/${getUser.user_id._id}`, getUser)
               
       }




    const handleText = (event) =>{
  
        setGetUser({...getUser,
        [event.target.name]:event.target.value})
        
      }

      
      const navigate = useNavigate();

      const submitAprobado = (event) => {
        event.preventDefault()
        SendAprobado()
        dataAceptado()
        navigate('/solicitudesVerificacion')
      }

      const submitRechazado = (event) => {
        event.preventDefault()
        SendDenegado()
        dataRechazado()
        navigate('/solicitudesVerificacion')
      }
      const submitBack = (event) => {
        event.preventDefault()
        navigate('/solicitudesVerificacion')
      }

      

  return (
    <div className='container'>
      
      <Button variant="contained"  onClick={submitBack}>
        <ArrowBackIcon/>REGRESAR
      </ Button>
           
 
    <div className='container-carousel' key={getUser._id}>
    <Typography variant="h6" component="h2" sx={{ justify: "center" }} fontSize="30px">
                Detalles de Verificacion
              </Typography>
              <Divider/>
                  <img style={{
                           width:"100px",
                          height: "100px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: "4px solid white"
                          }}
                          src={getUser.user_id.profile_picture}
                          alt=''/>

          <h2> {getUser.user_id.full_name}</h2> 
          <p>DPI: {getUser.user_id.DPI} </p>
          <Divider/>
        <Carousel>
            <div className='image'>
                <img src="https://drive.google.com/uc?export=view&id=1pFMtu5IXCq47zPFY0Vm9-8oDD31PJscA" alt='' ></img>
                <p>Pose 1</p>
            </div>
            <div className='image'>
                <img src="https://drive.google.com/uc?export=view&id=1V2NWN-R7LkwRCloyijjbUnS50O2HyIn3" alt='' ></img>
                <p>Selfie 1</p>
            </div>
            <div className='image'>
                <img src="https://drive.google.com/uc?export=view&id=1MElZwUmSfTr_enwnZAnlsDgMIQj6L_b3" alt='' ></img>
                <p>Pose 2</p>
            </div>
            <div className='imagePadd'>
                <img src="https://drive.google.com/uc?export=view&id=1Zk6y56FDQRibih_09hCwicBPNPpZIvJo" alt='' ></img>
                <p>Selfie 2</p>
            </div>

        </Carousel>
    </div>
      &nbsp;
      
      <TextareaAutosize
      name='comment'
      value={getUser.comment}
      onChange={handleText}
        minRows={10}
        aria-label="empty textarea"
        placeholder="Deja Un Mensaje Al Conductor (Opcional)"
        style={{ width: 450, height:100 }}
      />
      &nbsp;

      <div className='botones'>
        
        <Button variant="contained" color="success" onClick={submitAprobado}>
        Aceptar Solicitud<CheckCircleIcon/>
      </ Button>

      &nbsp;

      <Button variant="contained" color="error" onClick={submitRechazado} >
        Denegar Solicitud<HighlightOffIcon/>
      </Button>
      </div>

      &nbsp;
      &nbsp;
      
    </div>
  )
}
