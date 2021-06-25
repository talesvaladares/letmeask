import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {AuthProvider} from './contexts/authContext';

import {Home} from './pages/home';
import {NewRoom} from './pages/newRoom';
import {Room} from './pages/Room';
import {AdminRoom} from './pages/AdminRoom';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/rooms/new"  component={NewRoom}/>
          <Route path="/room/:id"  component={Room}/>
          <Route path="/admin/room/:id"  component={AdminRoom}/>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );

  
}

export default App;
