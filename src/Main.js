import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import LoginLayout from './LoginLayout';
// import EventAdder from './EventAdder';
import Medicine from './Medicine';
import Dashboard from './Dashboard';
import EventAdder from './EventAdder';
// import UserGreeting from './tempfiles/UserGreeting';
import Greeting from './Greeting';
import admin_client_manager from './admin_client_manager';


const useStyles = theme => ({
      root: {
        flexGrow: 1,
        width: '100%'
      },
});
class Login extends Component {
    render(){
        // const { classes } = this.props; 
        return (
            <div>
                <Switch>
                    <Route exact path ="/" component = {LoginLayout}/>
                    <Route path ="/Dashboard" component = {Dashboard}/>
                    <Route path ="/Medicine" component = {Medicine}/>
                    <Route path ="/EventAdder" component = {EventAdder}/>
                    <Route path ="/Greeting" component = {Greeting}/>
                    <Route path ="/admin_client_manager" component = {admin_client_manager}/>


                </Switch>
            </div>
        );
    }
}

export default withStyles( useStyles )(Login);