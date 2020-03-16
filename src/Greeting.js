import React, { Component } from 'react';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import Grid  from '@material-ui/core/Grid';
import Paper  from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied'; 
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied'; 
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt'; 
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied'; 
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied'; 
import MoodBadOutlinedIcon from '@material-ui/icons/MoodBadOutlined'; 
import SentimentVeryDissatisfiedOutlinedIcon from '@material-ui/icons/SentimentVeryDissatisfiedOutlined'; 
import SentimentVerySatisfiedOutlinedIcon from '@material-ui/icons/SentimentVerySatisfiedOutlined'; 

import MsgProcessor from "./servepart/MsgProcessor"




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
    width: '1008px',
    padding: theme.spacing(0),
    textAlign: 'center',
    height:'584px',     
    color: theme.palette.text.secondary,
  },
  icon: {
    '& > *': {
      margin: theme.spacing(1),
  },
 }
});

class Greeting extends Component {
  
  today = new Date();
  todayStr = this.today.getFullYear() + "년 " +(this.today.getMonth()+1) +"월 "+ this.today.getDate() + "일";
  

  handleOnClick = (index,event) => {
    event.preventDefault();
    console.log(index);
    let userId = localStorage.getItem("USN");
    let msgProc = new MsgProcessor();
    msgProc.attemptGreeting(userId, index, 0, (result)=> { 
      if (result[0] == 0) {
        console.log(result[1]);
        this.props.history.push("/Dashboard");
      }
      else {
        alert(result[1]);
       
      }
    });
  }

  render(){
    // var date = new Date();
    const { classes } = this.props;
  
    return (
      <div className={classes.root}>
        <Grid container alignItems="center" spacing = {0}>
            <Paper 
              className={classes.paper_1}
              elevation={2} >
                  <Grid item xs={12} >
                    <Typography 
                    gutterBottom 
                    variant="h3">
                      <br/>오늘은 {this.todayStr} 입니다.
                      <br/>지금의 기분을 표현해 주세요!
                      </Typography>
                  <Grid xs={12}>
                    <Divider/>
                    <br/>
                    <Grid xs={12}>
                      <IconButton onClick = {this.handleOnClick.bind(this, 1)}>
                        <SentimentVerySatisfiedOutlinedIcon style={{fontSize: 100 }}/>
                      </IconButton>
                      <IconButton onClick = {this.handleOnClick.bind(this, 2)}>
                        <SentimentVerySatisfiedIcon  style={{fontSize: 100 }}/>
                      </IconButton>
                      <IconButton onClick = {this.handleOnClick.bind(this, 3)}>
                        <SentimentSatisfiedAltIcon style={{fontSize: 100 }}/>
                      </IconButton>
                      <IconButton onClick = {this.handleOnClick.bind(this, 4)}>
                        <SentimentSatisfiedIcon  style={{fontSize: 100 }}/>
                      </IconButton>
                    </Grid>
                    <Grid xs={12}>
                      <IconButton onClick = {this.handleOnClick.bind(this, 5)}>
                        <SentimentDissatisfiedIcon style={{fontSize: 100 }}/>
                      </IconButton>
                      <IconButton onClick = {this.handleOnClick.bind(this, 6)}>
                        <SentimentVeryDissatisfiedIcon style={{fontSize: 100 }}/>
                      </IconButton>
                      <IconButton onClick = {this.handleOnClick.bind(this, 7)}>
                        <MoodBadOutlinedIcon style={{fontSize: 100 }} />
                      </IconButton>
                      <IconButton onClick = {this.handleOnClick.bind(this, 8)}>
                        <SentimentVeryDissatisfiedOutlinedIcon style={{fontSize: 100 }}/>
                    </IconButton>
                    </Grid>
                    <br/>
                    <Divider/>
                    </Grid>
                    
                  <Grid item xs={12}/>
                  <Grid item xs={12}/>
                </Grid>
            </Paper>
        </Grid>
      </div>
    );
  }
}

export default  withStyles( useStyles )(Greeting);