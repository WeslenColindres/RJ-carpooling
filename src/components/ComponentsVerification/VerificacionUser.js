import React from 'react'
import List from '@mui/material/List';
import { ListaItem } from './ListaItem';
import { Grid, Box, Typography, Divider } from '@mui/material';

export const VerificacionUser = ({Solicitudes,handleID}) => {
  return (
    <div className='contenedorLista'>
        <div>
             <List sx={{  maxWidth: 360, bgcolor: '#c8eef0;', border:"none", borderRadius:"8px" }}>
             <Typography variant="h6" component="h2" sx={{ justify: "center" }} fontSize="20px">
                Solicitudes de Verificacion
              </Typography>
              <Divider/>
            {
              
                Solicitudes.map((solicitud)=>{
                    return <ListaItem Solicitud={solicitud} handleID={handleID} key={solicitud._id} />
                    
                })
                
            }
      
        </List>
        </div>
       
    </div>
  )
}
