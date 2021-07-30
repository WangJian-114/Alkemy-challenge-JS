import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthState from './context/auth/authState';
import RecordState from './context/record/recordState';
import Login from './pages/auth/Login';
import NewAccount from './pages/auth/NewAccount';
import Home from './pages/Home';
import Records from './pages/Records';
import AddRecord from './pages/AddRecord';
import EditRecord from './pages/EditRecord';
import tokenAuth from './config/tokenAuth';

import PrivateRoute from './routes/PrivateRoute';
// Revisar si tenemos un token
const token = localStorage.getItem('token');
if(token){
  tokenAuth(token);
}

function App() {
  return (
    <AuthState>
      <RecordState>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/new-account" component={NewAccount} />
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute exact path="/records" component={Records} />
            <PrivateRoute exact path="/add-record" component={AddRecord} />
            <PrivateRoute
                exact 
                path="/record/:id" 
                component={(props) => {
                  const id = props.match.params.id;
                return <EditRecord id={id}/>}}/>
          </Switch>
        </Router>
      </RecordState>
    </AuthState>
  );
}

export default App;
