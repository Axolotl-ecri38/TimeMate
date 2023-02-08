import React, { Component, useState, useEffect, Fragment } from 'react';
import LoginPage from './Components/LoginPage.jsx';
import RoleBased from './Components/RoleBased.jsx';
import EmployeePage from './Components/EmployeePage.jsx';
import './public/styles.css';
import ManagerPage from './Components/ManagerPage.jsx';

//refactored
const App = () => {
  const [authenticated, setAuthenticated] = useState(true);
  const [user, setUser] = useState({
    role: 'worker',
    id: '',
    first_name: '',
  });
  const [loginFailed, setLoginFailed] = useState(false);

  const handleLogout = () => {
    console.log('logged out');
    setAuthenticated(false);
  }

  const handleLogin = async ({ username, password }) => {
    try {
      const body = {
        username,
        password,
      };
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await response.json();
      if (response.ok) {
        setUser(json);
        setAuthenticated(true);
      } else {
        setLoginFailed(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return ( 
    <Fragment>
      {loginFailed && (
        // alert, alert-danger are flags for bootstrap to displays the div in an overlay and alert style 
        <div className='alert alert-danger'> 
          Login Failed!
        </div>
      )}
      {authenticated ? (<RoleBased user={user} logOut={handleLogout} />):(<LoginPage onLogin={handleLogin} />)}
    </Fragment>
  );
};

export default App;

//<LoginPAge onLogin={handleLogin}

// ---------------- ---------------- ------------------ ------------- ----------------- ----------------?*
/*
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      role: '',
      emp_id: '',
      first_name: '',
    };
    this.checkCredentials = this.checkCredentials.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  render() {
    if (this.state.isLoggedIn && this.state.role === 'worker') {
      return (
        <EmployeePage
          firstName={this.state.first_name}
          empId={this.state.emp_id}
          logOut={this.logOut}
          totalHours={this.state.totalHours}
        />
      );
    } else if (this.state.isLoggedIn && this.state.role === 'manager') {
      return <ManagerPage logOut={this.logOut} />;
    } else {
      return <LoginPage authorize={this.checkCredentials} />;
    }
  }

  checkCredentials() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.Success === 'Worker') {
          let emp_id = data.emp_id;
          let first_name = data.first_name;
          this.setState({
            isLoggedIn: true,
            role: 'worker',
            emp_id,
            first_name,
          });
        } else if (data.Success === 'Manager') {
          let emp_id = data.emp_id;
          let first_name = data.first_name;
          this.setState({
            isLoggedIn: true,
            role: 'manager',
            emp_id,
            first_name,
          });
        } else if (data.error) {
          alert('your username/password is incorrect');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logOut() {
    console.log('in log out');
    this.setState({ isLoggedIn: false });
  }
}

export default App;
*/