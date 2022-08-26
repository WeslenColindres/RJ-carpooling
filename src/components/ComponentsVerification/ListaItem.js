import React from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import { ListItemButton } from '@mui/material';
import {useNavigate} from 'react-router-dom';


export const ListaItem = ({Solicitud,handleID}) => {
    
    const navigate = useNavigate();
    const HandleClick = () =>{

        handleID(Solicitud._id)
        
        navigate('/VerificationDetail')
        
    } 
  return (
    
    <div>
        
        <ListItem style={{maxWidth: "600px", display:"flex", flexDirection:"row"}}>
            <ListItemButton onClick={HandleClick}>
                <ListItemAvatar>
            <Avatar alt='' src={Solicitud.user_id.profile_picture} style={{width:"50px",
                          height: "50px"}} >
                <ImageIcon />
            </Avatar>
        </ListItemAvatar>
        <ListItemText primary={Solicitud.user_id.full_name} secondary={Solicitud.verification_date} style={{marginLeft:"10px", fontFamily:"sans-serif"}} />
            </ListItemButton>
            
      </ListItem>
    </div>
  )
}
