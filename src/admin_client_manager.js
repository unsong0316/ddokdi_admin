import React, { Component } from 'react';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Paper  from '@material-ui/core/Paper';
import ControlBoard from './servepart/ControlBoard';
import { FixedSizeList } from 'react-window';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ListSubheader from '@material-ui/core/ListSubheader';



import MsgProcessor from "./servepart/MsgProcessor"



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
    padding: theme.spacing(1),
    textAlign: 'center',
    height:'584x',       
    color: theme.palette.text.secondary,
  },
  card_d: {
    Width: 400,
    height:568,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
});

class Client_Managment extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 3;//UI에 영향을 주지 않으므로 state X
    this.state = {
      Client_List: [{"Client_USERID":"", "name":"","age":""}],
      nlistLength: 0,
      ClientUSERID:0,
      Detail_client_list: []
      
      }
    }
  
    componentDidMount(){
      let userId = localStorage.getItem("USN");
      let msgProc = new MsgProcessor();
      msgProc.attemptadminclientManager(userId, (result)=> { 
        if (result[0] == 0) {
          console.log(result[1]);
          this.setState({
            Client_List:result[1],
            nlistLength:result[1].length
          })  
        }
      });
      }
  
    handleListItemClick = event => {
      event.preventDefault();
      console.log(event);
      let userId = localStorage.getItem("USN");
      let Client_userid = this.state.ClientUSERID
      let msgProc = new MsgProcessor();
        let selectedClient = event.target.innerText;
        let client_list = this.state.Client_List;
        client_list = client_list.concat(this.state.Client_List);
        let Client_userId = 0;
        client_list.forEach(element => {
          if(element.name === selectedClient){
            Client_userId = element.Client_USERID;
          }
        });
    
      this.setState({
        ClientUSERID:Client_userId
        
      }) 
      msgProc.attemptDetailEvent(Client_userId, (result)=> { 
        if (result[0] == 0) {
          console.log(result[1][0]);
          this.setState({
            Detail_client_list:result[1][0]
          })  
        }
      });
    }

    ///////////////////////////////////////////Join Submit동작X////////////////////////
      handleEmergencyServiceSubmit = event => {
        // event.preventDefault();
        console.log(event);
        let userId = localStorage.getItem("USN");
        let msgProc = new MsgProcessor();
        let Client_userId = this.state.ClientUSERID; 
          msgProc.attemptClientEmergencyServiceUpdate_1(Client_userId, userId, (result)=> { 
            if (result[0] == 0) {
              // alert("응급상황서비스 활성화.");
              console.log(result[1]);
            }
            else {
              alert(result[1]);
            }
          });
        } 
      

      renderNewRow(mState, handleListItemClick ,props) {
        const { index, style } = props;
        console.log(mState.Client_List);
        let client_list =[];
        mState.Client_List.forEach(element => {
          client_list.push(element.name);
        });

        console.log(handleListItemClick);
        // const mnRow = med_name.length;
        // // const med_time = [,];
        return (
          ///List 항목 누르면 handledetailSubmit이 동작하게
          <form onSubmit={this.handleListItemClick}>
            <ListItem button onClick={handleListItemClick} style={style} key={index} id={1}>
              <ListItemText primary= {<Typography variant="h5" Align="left">{client_list[index]} </Typography>}/>
            </ListItem>
            </form>
        );
      }
      renderJoinRow(mState, handleListItemClick ,props) {
        const { index, style } = props;
        console.log(mState.jEventList);
        const [checked, setChecked] = React.useState(false); 

        let event_list =[];
        mState.jEventList.forEach(element => {
          event_list.push(element.event_name);
        });

        console.log(handleListItemClick);
        // const mnRow = med_name.length;
        // // const med_time = [,];
        const handleChange = event => {
          setChecked(event.target.checked);
        };
        const handleOnClick = event =>{
          console.log(event.target.innerText);
        }
        return (
          ///List 항목 누르면 handledetailSubmit이 동작하게
          <form onSubmit={this.handleListItemClick}>
            <ListItem button onClick={handleListItemClick} style={style} key={index} id={1}>
              <ListItemText primary={<Typography variant="h5" Align="left">{event_list[index]} </Typography>}/>
            </ListItem>
            </form>
        );
      }
      
  
  // titleselect();
  // if()

  render(){
    const { classes } = this.props;
    return (
      <div >
        <Grid container className={classes.root} spacing = {0}>
        {/* paper_1 첫번째 칸 */}
          <Grid item xs={2}>
          <ControlBoard history = {this.props.history}/>
          </Grid>

        {/* paper_2 두번째 칸 */}
          <Grid item xs={5} >
          <Paper className={classes.paper_1}>
          {this.state.nlistLength !== 0 ? 
           <Box color="text.secondary" fontSize={20} textAlign="left" fontWeight="fontWeightBold">
              Client List
              </Box>
              :
              <Box color="text.secondary" fontSize={20} textAlign="left" fontWeight="fontWeightBold">
              Client List</Box>              
              }
              
              {this.state.nlistLength !== 0 ?
              <FixedSizeList height={542} width='90%' itemSize={60} itemCount={this.state.nlistLength}>
              {this.renderNewRow.bind(this, this.state, this.handleListItemClick)}
              </FixedSizeList>
              :
              <FixedSizeList height={542} width='90%' itemSize={60} itemCount={this.state.jlistLength}>
              {this.renderJoinRow.bind(this, this.state, this.handleListItemClick)}
              </FixedSizeList>
              }
              </Paper>
            </Grid>

            <Grid item xs={5} >
              <Paper className={classes.paper_1}>
                <Card className={classes.card_d}>
                  <CardHeader
                    title={this.state.Detail_client_list.name}
                    subheader={this.state.Detail_client_list.Client_USERID}
                    />
                  <CardContent>
                    {this.state.dEventNo !== 0 ?<Typography align="left" variant="h5" color="textSecondary" component="p" >
                    <Box color="text.secondary" fontSize={20} textAlign="left" fontWeight="fontWeightBold">
                      [생년월일] <br/>{this.state.Detail_client_list.age}<br/>
                      [ID] <br/>{this.state.Detail_client_list.id}<br/>
                      [비밀번호] <br/>{this.state.Detail_client_list.passwords}<br/>
                      [성별] <br/>{this.state.Detail_client_list.gender}<br/>
                      [연락처] <br/>{this.state.Detail_client_list.phone_no}<br/>
                      [비상연락망] <br/>{this.state.Detail_client_list.emergency_contact}<br/>
                      [비상연락인 관계] <br/>{this.state.Detail_client_list.relationship_emergency_res}<br/>
                      [위급알림서비스활성화] <br/>{this.state.Detail_client_list.emergency_service}<br/>
                    </Box>
                       
                         <Grid container xs={12}>
                           <Grid xs={4}/>
                           <Grid xs={4}>
                              <form noValidate onSubmit={this.handleJoinSubmit}>
                             <br/><Button 
                             type = "submit" size="small" color="primary">
                                <AddCircleIcon/><Typography variant="h4" Align="center">활성화하기</Typography>
                              </Button>
                            </form>
                           </Grid>
                            <Grid xs={4}/>
                         </Grid>                     
                    </Typography> : <Typography variant="body2" color="textSecondary" component="p"/>}
                  </CardContent>
                </Card>              
              </Paper>
            </Grid>
          </Grid>
      </div>
    );
  }
}
export default  withStyles( useStyles )(Client_Managment);
