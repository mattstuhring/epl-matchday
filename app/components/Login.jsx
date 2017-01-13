import { browserHistory, withRouter } from 'react-router';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import axios from 'axios';
import React from 'react';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Done from 'material-ui/svg-icons/action/done';
import TextField from 'material-ui/TextField';
import Cancel from 'material-ui/svg-icons/navigation/cancel';
import Check from 'material-ui/svg-icons/action/check-circle';

const Login = React.createClass({
  getInitialState() {
    return {
      login: {
        email: '',
        password: ''
      },
      errors: {}
    };
  },

  handleTextChange(event) {
    const nextLogin = Object.assign({}, this.state.login, {
      [event.target.name]: event.target.value
    });

    this.setState({ login: nextLogin });
  },

  handleLogin() {
    const login = this.state.login;

    axios.post('/api/token', login)
    .then(() => {
      browserHistory.push('/profile');
      this.props.setToast(true, 'Login successful!');
    })
    .catch((err) => {
      this.props.setToast(
        true,
        `Whoops! ${err.response.data}`
      );
    });
  },

  render() {
    return <div>
      <div className="row">
        <div className="col s12 center" style={{marginTop: '30px', marginBottom: '10px', padding: '20px 0px', backgroundColor: '#00ffa1'}}>
          <img style={{width: '40%'}} src="./images/account.png" />
        </div>
      </div>

      <div className="row container">
        <div className="col s12 l6">
          <Paper zDepth={3}>
            <h4 className="cardTitle" style={{marginTop: '0px', padding: '16px', marginBottom: '0px'}}>Login</h4>
            <div className="row">
              <div className="col s10 offset-s1 center">
                <div>
                  <TextField
                    className="textField"
                    style={{marginTop: '20px'}}
                    hintText="Email"
                    floatingLabelText="Email"
                    name="email"
                    onChange={this.handleTextChange}
                  />
                </div>
                <div>
                  <TextField
                    hintText="Password Field"
                    floatingLabelText="Password"
                    type="password"
                    name="password"
                    onChange={this.handleTextChange}
                  />
                </div>
                <div style={{height: '74px'}}>
                  <RaisedButton
                    className="regBtn"
                    style={{marginRight: '20px'}}
                    label="Submit"
                    labelPosition="before"
                    backgroundColor={"#00ffa1"}
                    labelColor={"#38003d"}
                    icon={<Check />}
                    onClick={this.handleLogin}
                  />
                  <RaisedButton
                    className="regBtn"
                    label="Cancel"
                    labelPosition="before"
                    backgroundColor={"#00ffa1"}
                    labelColor={"#38003d"}
                    icon={<Cancel />}
                    onClick={() => browserHistory.push('/')}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col s12 center">
                <img src="./images/ball.png" style={{marginTop: '30px'}}/>
              </div>
            </div>
          </Paper>
        </div>


        <div className="col s12 l6">
          <Paper zDepth={3}>
            <h4 className="cardTitle" style={{marginTop: '0px', padding: '16px'}}>Register</h4>
            <div className="row">
              <div className="col s10 offset-s1">
                <Paper zDepth={2} style={{marginBottom: '50px'}}>
                  <h5 className="center" style={{backgroundColor: '#38003d', color: 'white', padding: '15px'}}>Don't have a Matchday account?</h5>
                  <p className="center" style={{textDecoration: 'underline'}}>Here's what you are missing:</p>
                  <div style={{marginLeft: '50px'}}>
                    <Done style={{display: 'inline-block', color: '#fe005a'}} />
                    <h5 style={{display: 'inline-block', marginLeft: '15px'}}>SMS match reminders</h5>
                  </div>
                  <div style={{marginLeft: '50px'}}>
                    <Done style={{display: 'inline-block', color: '#fe005a'}} />
                    <h5 style={{display: 'inline-block', marginLeft: '15px'}}>Weekly Match schedule</h5>
                  </div>
                  <div style={{marginLeft: '50px'}}>
                    <Done style={{display: 'inline-block', color: '#fe005a'}} />
                    <h5 style={{display: 'inline-block', marginLeft: '15px'}}>Favorite club news</h5>
                  </div>
                  <div style={{marginLeft: '50px'}}>
                    <Done style={{display: 'inline-block', color: '#fe005a'}} />
                    <h5 style={{display: 'inline-block', marginBottom: '53px', marginLeft: '15px'}}>Epl standings</h5>
                  </div>
                  <RaisedButton
                    label="Click to go register"
                    fullWidth={true}
                    backgroundColor={"#00ffa1"}
                    labelColor={"#38003d"}
                    onClick={() => browserHistory.push('/register')}
                  />
                </Paper>
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </div>;
  }
});

export default withRouter(Login);
