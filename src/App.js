import React from 'react';
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      {/* switch returns the first route matching with the url */}
      <Switch>
        
        
        {/* only navigate to home page if it is exact url(i.e. only slash)not 
      show login also because it also contains slash  */}
      
      <Route path = "/" exact={true}> <Dashboard></Dashboard></Route>
     <Route path = "/login"><Login /></Route>
     {/*  "*" always matches but switch prevents it from coming always   */}
      <Route path = "*"><Error/></Route>


    </Switch>
    </Router>
      
  );
}

export default App;
