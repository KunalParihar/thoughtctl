import React, { useState } from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import CreateUser from './User/CreateUser';
import ChatRoom from './Chat/ChatRoom';

import style from './App.module.css'
import Home from './Home/Home';
function App() {
  return (
    <Router>
      <div className={style['login-background']}>
      <div className={style['container-box']}>
          <Routes>
                <Route path="/" Component={Home} />
                <Route path="/create-user" Component={CreateUser} />
                <Route path="/chat-room" Component={ChatRoom} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;