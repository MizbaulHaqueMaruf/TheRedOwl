import React from 'react';
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Profile from './Profile';
function App() {
  return (
    <div className="App">
      <Header/>
      <Profile/>
      <Footer/>
    </div>
  );
}

export default App;
