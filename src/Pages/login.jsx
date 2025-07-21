import React, { useState } from 'react'
import './login.css'
import { useTranslation } from "react-i18next";
import "../i18n";
import { HiUserCircle } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import Favicon from '../assets/favicon.png';
import { auth, provider, signInWithPopup } from '../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";


function login() {
   const { t, i18n } = useTranslation();

  // State for form inputs and error
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

const changeLang = (lang) => {
  i18n.changeLanguage(lang);
  console.log("Dil değiştirildi:", lang);
};
const navigator = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  setError("");
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigator('/home');
  } catch (err) {
    setError(t("Invalid email or password"));
  }
}
const handleForgotPassword = () =>{
    navigator('/forgotPassword');
}
const handleCreateAccount = () =>{
    navigator('/createAccount');
}
const handleGoogleLogin = async (e) => {
  e.preventDefault();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Giriş başarılı:", user);
    navigator('/home');
  } catch (error) {
    console.error("Google ile giriş başarısız:", error);
  }
};



  return (
    <div className='page'>
        <div className='header'> 
            <div className='info'>
                 <img style={{width:'450px',height:'450px',display:'inline-block',marginLeft:'4%',marginBottom:'-80px'}} src={Favicon} alt="resim bulunamadı" />

                <p className='descriptionHeader'>{t("Discover Events, Connect with People!")}</p>
                <p className='description'>{t("Evently brings you together with events that match your interests. Meet new people and create unforgettable memories!")}</p>
                <p className='descriptionHeader'>{t("What Can You Do?")}</p>
                <ul>
                  <li><p className='descriptionP'>{t("Discover events near you")}</p></li>
                  <li><p className='descriptionP'>{t("Create and share your own events")}</p></li>
                  <li><p className='descriptionP'>{t("Join events with your friends")}</p></li>
                  <li><p className='descriptionP'>{t("Get recommendations based on your interests")}</p></li>
                </ul>

            </div>
            <div className='login'>
                <form>
           <HiUserCircle style={{width:'150px',height:'150px',position:'absolute',marginTop:'100px',marginLeft:'80px'}}/>
                 
                    <input className='username' type="text" placeholder={t("Username or Email")}
                      value={email} onChange={e => setEmail(e.target.value)} />
                    <input className='password' type="password" placeholder={t("Password")}
                      value={password} onChange={e => setPassword(e.target.value)} />
                    <button onClick={handleLogin} className='loginButton' type='submit'>{t("login")}</button>
                    {error && <div style={{color: 'red', marginTop: '10px'}}>{error}</div>}
                    <a onClick={handleForgotPassword} className='forgotPassword' type='submit'>{t("Forgot Password?")}</a>

                    <a className='createAccount' onClick={handleCreateAccount} type='submit'>{t("Create Account?")}</a>
                    <button className='loginGoogleButton' 
                    onClick={handleGoogleLogin}
                    type='submit'>{t("Sign in With Google")}</button>
    
                    
                </form>
            </div>
        </div>
        
    </div>
  )
}

export default login