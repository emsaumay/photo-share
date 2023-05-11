import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import './App.css';
// import MainHeader from './shared/Components/MainHeader';
import NavMain from './shared/Components/NavElements/MainNavigation';
import Clock from './shared/Components/Clock/Clock';
import UserPlaces from './places/pages/UserPlaces';
import UserPlace from './places/pages/UserPlace';
import CityData from './places/pages/CityData';


function App() {
  return (
    <Router>
      <NavMain/>
      <Routes>
        <Route path="/" element={<Users/>} exact/>
        <Route path="/places/new" element={<NewPlace/>} exact/>
        <Route path="/:userId/places" element={<UserPlaces/>} exact/>
        <Route path="/u1/place" element={<UserPlace/>} exact/>
        <Route path="/city" element={<CityData/>} exact/>
        <Route path='/*' element={<Navigate to="/"/>}/>
      </Routes>
      <Clock/>
    </Router>
  );
}

export default App;
