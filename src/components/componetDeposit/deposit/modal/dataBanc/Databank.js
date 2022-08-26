import * as React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { StyledPaper } from '../../componetDeposit';



const Databank = ({ bank }) => {

  const { bank_account_No, bank_account_type, bank_company_name } = bank;

  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
      <StyledPaper
        sx={{
          my: 1,
          mx: 'auto',
          
        }}
      >
        <Grid container
          justify="center"
          alignItems="center"
          direction="column"
          style={{ minHeight: "5vh" }}
          spacing={0}>
          <Grid item sx={{ mt: -1 }}>
            <Typography id="modal-modal-description" variant="h10" sx={{ mt: 3 }}>
              {bank_account_type}
            </Typography>
          </Grid>
          <Grid item >
            <Typography id="modal-modal-description" variant="h10" sx={{ mt: 2 }}>
              {bank_account_No}
            </Typography>
          </Grid>
          <Grid item >
            <Typography id="modal-modal-description" variant="h10" sx={{ mt: 2 }}>
              {bank_company_name}
            </Typography>
          </Grid>
        </Grid>
      </StyledPaper>
    </Box>
  )
}

export default Databank