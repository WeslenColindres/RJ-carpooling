import moment from 'moment';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


export const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#d7ecf1',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 400,
    color: theme.palette.text.primary,
}));




export const dateCreation = (date) => {
    const today = new Date(moment().format(date));
    const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const fecha = `${today.getDate()}-${month[today.getMonth()]}-${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    return fecha;

}

export const timeAgo = (fecha) => {
    const data2 = moment(fecha, "DD-MM-YYYY hh:mm:ss").startOf('hour').fromNow();

    return data2;
}


export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#d7ecf1',
    border: '2px solid #d7ecf1',
    boxShadow: 24,
    p: 4,
};

export const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#00b2bb',
    border: '2px solid #00b2bb',
    boxShadow: 24,
    p: 4,
};

export const styleCarga = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  
    p: 4,
  };