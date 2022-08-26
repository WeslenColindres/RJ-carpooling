import * as React from 'react';
import { Grid, Box, List, Typography, Divider } from '@mui/material';
import { styleCarga, StyledPaper } from '../componetDeposit';
import RListItem from './listItem/ListItem';
import CircularProgress from '@mui/material/CircularProgress';


export default function DepositRecuest({ todos, setrecoleccion, handleOpen }) {

  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
      <StyledPaper
        sx={{
          my: 1,
          mx: 'auto',
          p: 2,
        }}
      >
        <Grid container
          justify="center"
          alignItems="center"
          direction="column"
          style={{ minHeight: "50ch" }}
          spacing={2}>
          <Grid item>
            <List sx={{ width: '100%', maxWidth: '100%', bgcolor: '#d7ecf1' }}>
              <Typography variant="h6" component="h2" sx={{ justify: "center" }}>
                Solicitudes de Deposito
              </Typography>
              {todos.length === 0 ?
                <Box sx={styleCarga}>
                <Grid container
                  justify="center"
                  alignItems="center"
                  spacing={2}>
                  <CircularProgress  sx={{mt: 40 }}/>
                </Grid>
              </Box>
              :
              todos.map((todo, index) => (
                <React.Fragment key={todo._id}>
                  <Divider />
                  <RListItem todo={todo} datos={setrecoleccion} handleOpen={handleOpen} />
                  </React.Fragment>
              ))
              }
            </List>
          </Grid>
        </Grid>
      </StyledPaper>
    </Box>
  )
}

