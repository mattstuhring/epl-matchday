import { browserHistory, withRouter } from 'react-router';
import React from 'react';
import AppBar from 'material-ui/AppBar';
import axios from 'axios';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';

const App = React.createClass({
  getInitialState() {
    return {
      toast: {
        open: false,
        message: ''
      }
    };
  },

  setToast(state, message) {
    const newToast = Object.assign(
      {},
      this.state.toast,
      { open: state, message });

    this.setState({ toast: newToast });
  },

  handleLogOut() {
    axios.delete('api/token')
    .then(() => {
      browserHistory.push('/');
      this.setToast(true, 'Logged out!');
    })
    .catch((err) => {
      this.props.setToast(
        true,
        `Whoops! ${err}.`
      );
    });
  },

  render() {
    const styles = {
      title: {
        cursor: 'pointer',
        width: '58px',
        borderRadius: '50%',
        border: '2px solid #fe005a',
        marginTop: '3px'
      },
      background: {
        backgroundColor: '#38003d',
      },
      text: {
        // color: '#00ffa1'
        color: '#fe005a'
      },
      logo: {
        height: '40px',
        marginBottom: '10px',
        marginLeft: '10px'
      }
    };

    let appBarLogin = <div>
      <FlatButton
        style={styles.text}
        label="Login"
        onClick={() => browserHistory.push('/login')}
      />
      </div>;

    if (document.cookie) {
      appBarLogin = <div>
        <FlatButton
          style={styles.text}
          label="Profile"
          onClick={() => browserHistory.push('/profile')}
        />
        <FlatButton
          style={styles.text}
          label="Logout"
          onClick={this.handleLogOut}
        />
      </div>;
    }

    return <div>
      <AppBar
        style={styles.background}
        title={
          <a href="/">
            <img style={styles.title} src="./images/logo.png" />
            <img style={styles.logo} src="./images/matchday.png" />
          </a>
        }
        showMenuIconButton={false}
      >
        <div style={{marginTop: '12px'}}>
          {appBarLogin}
        </div>
      </AppBar>

      {React.cloneElement(this.props.children, {
        setToast: this.setToast
      })}

      <Snackbar
        autoHideDuration={2500}
        message={this.state.toast.message}
        onRequestClose={() => this.setToast(false, '')}
        onClick={() => this.setToast(false, '')}
        open={this.state.toast.open}
      />
    </div>;
  }
});

export default withRouter(App);
