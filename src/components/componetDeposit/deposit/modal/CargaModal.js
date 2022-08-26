import * as React from 'react';
import { Grid, Modal, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { styleCarga } from '../componetDeposit';




export default function CargaModal({ handleClose, open }) {

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={styleCarga}>
        <Grid container
          justify="center"
          alignItems="center"
          spacing={2}>
          <CircularProgress />
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
