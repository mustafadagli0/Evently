
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/home';
import HomePage from './Pages/homePage';
import Login from './Pages/login';
import ProfilePage from './Pages/ProfilePage'; 
import EventAdd from './Pages/eventAdd';
import ForgotPassword from './Pages/forgotPassword';
import CreateAccount from './Pages/createAccount';

function App() {
  return (
    <>
       <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/home" element={<Home/>} /> 
          <Route path="/login" element={<Login/>} />  
          <Route path="/forgotPassword" element={<ForgotPassword/>} />
          <Route path="/createAccount" element={<CreateAccount/>} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/eventAdd" element={<EventAdd/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
