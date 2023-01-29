import React from 'react';
import logo from './logo.svg';
import HorizontalLinearStepper from './create/ModelCreate';
import '@fontsource/roboto/300.css';
import './App.css';
import { Grid, Paper, Button, Divider, Typography } from '@mui/material';
import { Routes, Route, Link } from 'react-router-dom';
import ModelInfer from './infer/ModelInfer';

function App() {

  return (
    <div className="App">
      <Grid container spacing={2} sx={{mt: "25pt"}}>
        
        <Grid item xs={12}>
          <Typography variant="h1" sx={{ fontColor: "#B2BEB5" }}>
            Decision Trees!
          </Typography>
        </Grid>

        {/* BUTTONS */}
        <Grid item xs={12} sx={{p: "10pt", mt: "15pt"}}>
          <Button variant="outlined" sx={{mr:"12pt"}} component={Link} to="/">Infer on Model</Button>
          <Button variant="contained" component={Link} to="/create" >Create Model</Button>
          <Divider light sx={{mt:"10pt", width:700, mx: "auto"}} />
        </Grid>

        {/* STEPPER and INFER*/}
        <Grid item xs={12}>
          <Paper sx={{width: 600, mx: "auto", p: "10pt"}}>
            <Routes>
              <Route index element={<ModelInfer/>} />
              <Route path="create" element={<HorizontalLinearStepper/>} />
              <Route path="*" element={<ModelInfer />} />
            </Routes>
          </Paper>
        </Grid>
      </Grid>
      
      
    </div>
  );
}

export default App;
