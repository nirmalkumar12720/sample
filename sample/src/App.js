import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import './App.css';
import Form from './Component/FormComponent'
 
function App() {
  return (
    <Router>
 
    <Switch>
 
    <Route path="/" component={Form}/>
    
    </Switch>
 
    </Router>
  );
}

export default App;