import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OAuthRedirectHandler from "./handler/OAuthRedirectHandler";
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import Home from './components/Home';
import Main from './components/Main';


const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/main" element={<Main />} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/oauth2/redirect" element={<OAuthRedirectHandler />} />
        </Routes>
      </Router>
  );
};

export default App;
