import React, { Component } from 'react';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button } from '@material-ui/core';
import Paper  from '@material-ui/core/Paper';
import IconTextList from './servepart/IconTextList';
import ControlBoard from './servepart/ControlBoard';
import Box from '@material-ui/core/Box';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import EditRoundedIcon from '@material-ui/icons/EditRounded';

// import MsgProcessor from "./servepart/MsgProcessor"

const useStyles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(0),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  paper_1: {  //전체 크기 변환 height 변경
    padding: theme.spacing(0),
    textAlign: 'center',
    height:'584x',       
    color: theme.palette.text.secondary,
  },
});

class Medicine extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     drugList:[],
  //     list_length:0
  //   }
  // }
  // componentDidMount(){
  //   let userId = localStorage.getItem("USN");
  //   let msgProc = new MsgProcessor();
  //   msgProc.attempMedicine(userId, (result)=> { 
  //     if (result[0] == 0) {
  //       console.log(result[1]);
  //       this.setState({
  //         drugList:result[1],
  //         list_length:result[1].length
  //       })  
  //     }
  //   });
  // }

  // componentDidMount(){
  //   const tempRsp2 = {
  //     "payload":{
  //       "code":200,
  //       "l_drug": [
  //         {
  //           "drug_name": "1",
  //           "time": "2"
  //         },
  //         {
  //           "drug_name": "2",
  //           "time": "1"
  //         }
  //       ],
  //     }
  //   }
  //   this.setState({
  //     tempRsp : tempRsp2
  //   })
  // }
  // handleSubmit = event => {
  //   event.preventDefault();
  //   console.log(event);

  //   const tempRsp = {
  //     "payload":{
  //       "code":200,
  //       "l_drug": [
  //         {
  //           "drug_name": "1",
  //           "time": "2"
  //         },
  //         {
  //           "drug_name": "2",
  //           "time": "1"
  //         }
  //       ],
  //     }
  //   }
  // } 
  render(){
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing = {0} container alignContent="center">

        {/* paper_1 첫번째 칸 */}
          <Grid item xs={2}>
          <ControlBoard history = {this.props.history}/>
          </Grid>

        {/* paper_2 두번째 칸 */}
          <Grid alignItems="center" xs={10}>
          
          <Paper className={classes.paper_1}>
            <IconTextList />
            
            <Grid alignItems="center" xs={12}>
              <Grid container xs={12}>
              <Grid  xs={3}/>
                <Grid  xs={3}>
              <Button><EditRoundedIcon/><Typography variant="h5" Align="center">수정하기</Typography></Button>
              </Grid>
              <Grid  xs={3}>
              <Button><DeleteForeverSharpIcon/><Typography variant="h5" Align="center">삭제하기</Typography></Button>
              </Grid>
              <Grid  xs={3}/>
              </Grid>
            </Grid>
            </Paper>
            </Grid>
            </Grid>

        </div>
    );
  }
}

export default  withStyles( useStyles )(Medicine);






 