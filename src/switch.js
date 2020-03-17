import React, { Component } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MsgProcessor from "./servepart/MsgProcessor"
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Paper  from '@material-ui/core/Paper';
import { FixedSizeList } from 'react-window';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import ListSubheader from '@material-ui/core/ListSubheader';


export default function SwitchLabels() {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Switch checked={state.checkedA} onChange={handleChange('checkedA')} value="checkedA" />
          //< Switch value = " checkedA " inputProps = { { 'aria-label' : 'Switch A' } } /> 
        }
        
      />
      
    </FormGroup>
  );
}

class Client_Emergency_service extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 3;//UI에 영향을 주지 않으므로 state X
    this.state = {
      ClientUSERID:0,
      Activate_Emergency_Service_list:[],
      Activate_Emergency_Service_length:0

      
      }
    }
    handleEmergencyServiceSubmit_for_activate = event => {
      // event.preventDefault();
      console.log(event);
      let userId = localStorage.getItem("USN");
      let msgProc = new MsgProcessor();
      let Client_userId_for_detail = this.state.ClientUSERID; 
        msgProc.attemptClientEmergencyServiceUpdate_1(userId, Client_userId_for_detail, (result)=> { 
          if (result[0] == 0) {
            // alert("응급상황서비스 활성화.");
            console.log(result[1]);
          }
          else {
            alert(result[1]);
       }
    });
  }
    handleEmergencyServiceSubmit_for_deactivate = event => {
      // event.preventDefault();
      console.log(event);
      let userId = localStorage.getItem("USN");
      let msgProc = new MsgProcessor();
      let Client_userId_for_detail = this.state.ClientUSERID; 
        msgProc.attemptClientEmergencyServiceUpdate_0(userId, Client_userId_for_detail, (result)=> { 
          if (result[0] == 0) {
            // alert("응급상황서비스 비활성화.");
            console.log(result[1]);
          }
          else {
            alert(result[1]);
      }
    });
  }
  
 }