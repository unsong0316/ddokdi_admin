import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Fab, Typography } from '@material-ui/core';
import Paper  from '@material-ui/core/Paper';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import Box from '@material-ui/core/Box';


const useStyles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    height:'584px',
    marginTop: theme.spacing(0),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(0),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  paper: {  //전체 크기 변환 height 변경
    padding: theme.spacing(0),
    textAlign: 'center',
    height:'584px',       
    color: theme.palette.text.secondary,
  }
});

class ControlBoard extends Component {
  handleHomeSubmit = event => {
    event.preventDefault();
    this.props.history.push("/Dashboard");
  } 
  handleMediSubmit = event => {
    event.preventDefault();
    console.log(event);
    
    this.props.history.push("/Medicine");
  } 
  handleEventSubmit = event => {
    event.preventDefault();
    console.log(event);
    
    this.props.history.push("/EventAdder");
  } 

  render(){
    const { classes } = this.props;
    return (
      <div className={classes.root}>
            <Paper  className={classes.paper} >
              <br/>
              <Grid container spacing={4} >
                <Grid item xs={12}/>

                <Grid item xs={12}>
                <form noValidate onSubmit={this.handleHomeSubmit} >
                    <Fab type = "submit" color="inherit" size='large'><HomeRoundedIcon style={{fontSize: 50}} /></Fab>
                  <Typography>
                    <Box fontSize={20} textAlign="center" fontWeight="fontWeightBold"><br/>처음으로 </Box>
                  </Typography>
                  </form>
                  </Grid>
                  
                  <Grid item xs={12}> 
                  <form noValidate onSubmit={this.handleMediSubmit} >
                    <Fab type = "submit" color="inherit" size='large'><LocalHospitalIcon style={{fontSize: 45}} /></Fab>
                    <Typography>
                    <Box fontSize={20} textAlign="center" fontWeight="fontWeightBold"><br/>약 설정 </Box>
                    </Typography>
                  </form>
                  </Grid>

                  <Grid item xs={12}> 
                  <form noValidate onSubmit={this.handleEventSubmit} >
                    <Fab type = "submit" color="inherit" size='large'><EventAvailableIcon style={{fontSize: 45}} /></Fab>
                    <Typography>
                    <Box fontSize={20} textAlign="center" fontWeight="fontWeightBold"><br/>행사 보기 </Box>
                    </Typography>
                  </form>
                  </Grid>

              </Grid>
              </Paper>
      </div>
    );
  }
}

export default  withStyles( useStyles )(ControlBoard);






 