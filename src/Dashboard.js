import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Paper  from '@material-ui/core/Paper';
import ControlBoard from './servepart/ControlBoard';
import IconButton from '@material-ui/core/IconButton';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Brightness6Icon from '@material-ui/icons/Brightness6';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Divider from '@material-ui/core/Divider';
import { FixedSizeList } from 'react-window';
import Box from '@material-ui/core/Box';

import MsgProcessor from "./servepart/MsgProcessor"


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
  paper_1: {  //전체 크기 변환 height 변경
    padding: theme.spacing(0),
    textAlign: 'center',
    height:'584px',       
    color: theme.palette.text.secondary,
    
  },
  paper_2_1: {  //전체 크기 변환 height 변경
    padding: theme.spacing(0),
    textAlign: 'center',
    height:'292px',       
    color: theme.palette.text.secondary,
    
  },
});

class Dashboard extends Component {

  today = new Date();

  todayname = this.today.getDay();

  week = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일');
  todayStr = this.today.getFullYear() + "년 " +(this.today.getMonth()+1) +"월 "+ this.today.getDate() + "일 ";
  todayname_week = (this.week[this.todayname]);

  userName = localStorage.getItem("USNAME");

  constructor(props){
    super(props);
    this.state = {
      count:0,
      l_j_event:[],
      l_j_count:0,
      l_drug:[],
      druglength:0
    }
  }

  componentDidMount(){
    let userId = localStorage.getItem("USN");
    let msgProc = new MsgProcessor();
    msgProc.attemptDashboard(userId, (result)=> { 
      if (result[0] == 0) {
        this.setState({
          count:result[1][0],
          l_j_event:result[2],
          l_j_count:result[2].length,
          l_drug:result[3],
          druglength:result[3].length
        })
      }
      else {
        alert(result[1]);
      }
    });
  } 

  handleSubmit = event => {
    event.preventDefault();
    console.log(event);
    
  } 
  handleMedSubmit = event => {
    event.preventDefault();
    this.props.history.push("/Medicine");
    
  } 
  handleEventSubmit = event => {
    event.preventDefault();
    this.props.history.push("/EventAdder");
    
  } 

  
  
  renderMedRow(mState, props) {
    

    const { index, style } = props;
    // console.log(mState.l_drug);
    const med_name = ['혈압약', '감기약', '소화제', '비타민','관절약'];
    
    
    let _drugName=[];
    mState.l_drug.forEach(element => {
      _drugName.push(element.drug_name);
    });
    return (
      ///List 변수 값 넣어보기
      <ListItem button style={style} key={index} >
        <Grid container  alignContent="center"  xs={12}>
          <Grid item xs={8}>
            <ListItemText primary={<Typography variant="h4" Align="center">{med_name[_drugName[index]]}</Typography>}/>
          </Grid>
          <Grid alignItems="center"item xs={4}>
            <ListItemIcon >
            <Brightness6Icon style={{ fontSize: 40 }}/>
            <Brightness5Icon style={{ fontSize: 40 }}/>
            <Brightness4Icon style={{ fontSize: 40 }}/>
          </ListItemIcon>
          </Grid>
        </Grid>
      </ListItem>
    );
  }
  rendereventRow(mState, props) {
    const { index, style } = props;

    // console.log(this.state.l_j_event);
    let join_event=[];
    mState.l_j_event.forEach(element => {
      join_event.push(element.event_name);
    });
    return (
      ///List 변수 값 넣어보기
      <ListItem button style={style} key={index} >
        <Grid container  alignContent="center"  xs={12}>
          <Grid item xs={12}>
            <ListItemText primary={<Typography variant="h4" Align="center">{join_event[index]}</Typography>}/>
          </Grid>
        </Grid>
      </ListItem>
    );
  }
  render(){
    const { classes } = this.props;
    var count_num = this.state.count;
    for( var event_count in count_num ) {
      console.log( count_num[event_count] );
    }
   
    return (
      <div className={classes.root}>
        <Grid container alignContent="center" spacing = {0} >
{/* 첫번쨰 구역 */}
          <Grid item xs={2}>
           <ControlBoard history = {this.props.history}/>
          </Grid>
{/* 두번쨰 구역 */}
          <Grid item xs={5}>
              <Grid alignItems="center" container spacing = {0}>
              <Grid item xs={12}>
                <Paper className={classes.paper_2_1}>
                <Box color="text.secondary" fontSize={35} textAlign="center" fontWeight="fontWeightBold">
                  <br/>안녕하세요 {this.userName} 님!
              </Box>

              <Box color="text.secondary" fontSize={45} textAlign="center" fontWeight="fontWeightBold">
                 {this.todayStr}<br/>{this.todayname_week} 
              </Box>
              
                </Paper>
              </Grid>

              <Grid item xs={12}>
              <Paper className={classes.paper_2_1}>
              <Box color="text.secondary" fontSize={30} textAlign="center" fontWeight="fontWeightBold">
              약 목록
              </Box>
              <Divider/> 
              <FixedSizeList height={200} width='100%' itemSize={60} itemCount={this.state.druglength}>
              {this.renderMedRow.bind(this, this.state)}
              </FixedSizeList>
              <Divider/>
                <form noValidate onSubmit={this.handleMedSubmit}>
                      <IconButton type = "submit" color="primary"  size='small'aria-label="delete">
                        <EditRoundedIcon style={{fontSize: 40 }}/> 수정하기
                      </IconButton>
                    </form>
                </Paper>
              </Grid>
             </Grid>
          </Grid>
{/* 세번째구역 */}
          <Grid item xs={5}>
          <Paper className={classes.paper_1}>

          <Box color="text.secondary" fontSize={40} textAlign="center" fontWeight="fontWeightBold">
              참석 목록
              </Box>
              <Divider/> 
              <FixedSizeList height={450} width='100%' itemSize={80} itemCount={this.state.l_j_count}>
              {this.rendereventRow.bind(this, this.state)}
              </FixedSizeList>
              <Divider/>

            <form noValidate onSubmit={this.handleEventSubmit}>
              <br/>
              
              <IconButton type = "submit" color="primary" size='small'aria-label="delete">
                {/*왜 this.state.c_n_event가 안들어가지 */}
                <Badge color="secondary" badgeContent={this.state.count[event_count]} >
                <MenuRoundedIcon style={{fontSize: 50 }}/>
                </Badge>
              </IconButton>
            </form>
            
            </Paper>
          </Grid>
          
          </Grid>
      </div>
    );
  }
}

export default  withStyles( useStyles )(Dashboard);






 