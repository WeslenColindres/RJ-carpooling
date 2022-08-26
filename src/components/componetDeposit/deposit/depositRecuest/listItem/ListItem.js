import * as React from 'react';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import { ListItem, ListItemButton } from '@mui/material';
import { dateCreation, timeAgo } from '../../componetDeposit';



const RListItem = ({ todo, datos, handleOpen }) => {
    const { user_id, creation_date } = todo;

    const data = () => {
        datos(todo._id)
        handleOpen();
    }

    // 

    return (
        <>
            <ListItem >
                <ListItemButton onClick={data}>
                    <ListItemAvatar>
                        <Avatar alt={user_id.full_name} src={user_id.profile_picture} >
                            <ImageIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={user_id.full_name} secondary={`${dateCreation(creation_date)} ${timeAgo(dateCreation(creation_date))} `} />
                </ListItemButton>
            </ListItem> 
        </>
    )
}

export default RListItem