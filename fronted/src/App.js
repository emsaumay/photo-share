import React, {useCallback, useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import './App.css';
import { AuthContext } from './shared/context/auth-context';
// import MainHeader from './shared/Components/MainHeader';
import NavMain from './shared/Components/NavElements/MainNavigation';
import Clock from './shared/Components/Clock/Clock';
import UserPlaces from './places/pages/UserPlaces';
import UserPlace from './places/pages/UserPlace';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';

let expirationTimer

function App() {
  // Instead of check for isLoggedin we now check if the token exists
  const [token, setToken] = useState(false)
  const [userId, setUserId] = useState(null)
  const [tokenExpirationDate, setTokenExpirationDate] = useState() 

  const Login = useCallback((uid, token, expirationDate) => {
    // For token expiration, we maintain a token expiration date in our fronted
    // and check for the timer, the below expiration creates a new Date which is
    // 1 hr after the current time
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60)
    setTokenExpirationDate(tokenExpirationDate)
    setToken(token)
    setUserId(uid)
    // To local storage we can only write text or data that can be converted to text
    // Hence we use stringify
    localStorage.setItem('UserData', JSON.stringify({userId: uid, token, expiration: tokenExpirationDate.toISOString()}))
  }, [])
  
  const Logout = useCallback(() => {
    setToken(null)
    setTokenExpirationDate(null)
    setUserId(null)
    localStorage.removeItem('UserData')
  }, [])

  useEffect(() => {
    // Checking for Login case
    if (token) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime()
      expirationTimer = setTimeout(Logout, remainingTime)
    }else{
      clearTimeout(expirationTimer)
    }
  }, [token, Logout, tokenExpirationDate])

  // After storing the token in localStorage, we want to check if the
  // token exists in there or not when the component mounts [renders first time]
  useEffect(() => {
    // useEffect runs after the render cycle, when the components fully loads
    // We can add a state to confirm the useEffect has completed its work
    // and meanwhile we can show some other page
    const storedData = JSON.parse(localStorage.getItem("UserData"))
    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
      // We are also passing the expiraton date to our login function to check
      // wether there is already a expiration Date, so that we dont always increase
      // the expiration time by 1hr on each render cycle
      Login(storedData.userId, storedData.token, new Date(storedData.expiration))
    }
  }, [Login])

  let routes;

  if(token){
    routes= (
      <>
        <Route path="/" element={<Users/>} exact/>
        <Route path="/places/new" element={<NewPlace/>} exact/>
        <Route path="/:userId/place/edit/:placeId" element={<UpdatePlace/>} exact/>
        <Route path="/:userId/places" element={<UserPlaces/>} exact/>
        <Route path="/:userId/place" element={<UserPlace/>} exact/>
        <Route path='/*' element={<Navigate to="/"/>}/>
      </>
    );
  }
  else{
    routes = (
      <>
        <Route path="/" element={<Users/>} exact/>
        <Route path="/:userId/places" element={<UserPlaces/>} exact/>
        <Route path="/auth" element={<Auth/>} exact/>
        <Route path='/*' element={<Navigate to="/auth"/>}/>
      </>
    )
  }

  return (
    <AuthContext.Provider value={{isLoggedin: !!token, token: token, userId: userId, login: Login, logout: Logout}}>
      <Router>
        <NavMain/>
        <Routes>
          {routes}
        </Routes>
        <Clock/>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
