import React, { useState } from 'react';
import logo from './logo.svg';
import migrationImage from './migrateb.svg';
import { AppBar, Toolbar, Typography, Divider } from '@mui/material';
import MigrationForm from './containers/tools/bitbucket';
import { Grid, Paper } from '@mui/material';
function App() {
  

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" >
            Migration Accelerator
          </Typography>
        </Toolbar>
      </AppBar>

      <Grid container spacing={2}>
      {/* Left section with the form */}
        <Grid item xs={12} sm={6}>
          <MigrationForm/>
        </Grid>
        <Divider orientation="horizontal" />
      {/* Right section with waves */}
        <Grid item xs={6} sm={6} style={{ position: 'fixed', top: '64px', right: 0, bottom: 0, zIndex: 0 }}>
            <img src={migrationImage} style={{maxWidth: '70%', maxHeight: '80%', padding: "150px", paddingTop: "100px" }} />
        </Grid>
    </Grid>
    </div>
  );
}

export default App;
