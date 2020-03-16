import React, { Component } from 'react';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import Grid  from '@material-ui/core/Grid';
import Paper  from '@material-ui/core/Paper';
import GridTextField from './tempfiles/GridButton';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';

const useStyles = theme => ({
  root: {
    width: '100%'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  paper_1: {  //전체 크기 변환 height 변경
    padding: theme.spacing(0),
    textAlign: 'center',
    height:'584px',     
    color: theme.palette.text.secondary,
  },
 });

class AdminPage extends Component {

  handleSubmit = event => {
    event.preventDefault();
    console.log(event);
    
    this.props.history.push("/Dashboard");
  } 

  render(){
     
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing = {0}>
          
        </Grid>
      </div>
    );
  }
}

export default  withStyles( useStyles )(AdminPage);