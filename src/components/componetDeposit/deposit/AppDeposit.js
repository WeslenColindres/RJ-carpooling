import * as React from 'react'
import DepositRecuest from './depositRecuest/DepositRecuest';
import Modaldata from './modal/modal';
import dataDepost from './modal/dataDepost/dataDepost';
import axios from "axios";
import CargaModal from './modal/CargaModal';

const AppDeposit = ({ todos }) => {
    const [pruevaverificacion, setpruevaverificacion] = React.useState(dataDepost);
    const [recoleccion, setrecoleccion] = React.useState();
    const [open, setOpen] = React.useState(false);


    const url = `https://api-usuarios-levelup.herokuapp.com/Deposit/${recoleccion}`;

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setpruevaverificacion(dataDepost)
        setrecoleccion()
    };


    const peticionGet = () => {
        axios.get(url).then(response => {
            setpruevaverificacion(response.data);

        }).catch(error => {
            console.log(error.message);
        })
    }
    
    const peticionPut = () => {
        axios.put(url, pruevaverificacion).then(response => {
            peticionGet();
        })
    }
   
    const setrecolecciondate = (id) => {
        setrecoleccion(id);
    }
    React.useEffect(() => {
        if (recoleccion) {
            peticionGet();
        }
    }, [recoleccion]);

    React.useEffect(() => {
        if (recoleccion) {
            peticionPut()
        }
    }, [pruevaverificacion.deposit_status]);
    return (
        <div style={{ height: '100vh', background: '#00b2bb' }}>
            <DepositRecuest todos={todos}  setrecoleccion={setrecolecciondate} handleOpen={handleOpen} />
            {!pruevaverificacion._id ?
                <CargaModal handleClose={handleClose} open={open} />
                :
                <Modaldata handleClose={handleClose} open={open} pruevaverificacion={pruevaverificacion} setpruevaverificacion={setpruevaverificacion} peticionPut={peticionPut} />
            }
        </div>
    )
}

export default AppDeposit