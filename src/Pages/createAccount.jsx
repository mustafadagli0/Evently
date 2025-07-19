import React from 'react'
import './createAccount.css'
import { useTranslation } from "react-i18next";
import "../i18n";
import { HiUserCircle } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import Favicon from '../assets/favicon.png';


function createAccount() {
   const { t, i18n } = useTranslation();

const changeLang = (lang) => {
  i18n.changeLanguage(lang);
  console.log("Dil değiştirildi:", lang);
};
const navigator = useNavigate();

const handleLogin = () =>{
    // Burada kontrol işlemlerini yapabilirsiniz  
    navigator('/login');
}




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
               <form action="">
                <input className='createİnputOne' type="email" placeholder={t("Enter your username")} />
                 <input className='createİnputTwo' type="email" placeholder={t("Enter your email")} />
                <input className='createPassword' type="password" placeholder={t("Enter your password")}/>
                <input className='createPassword' type="password" placeholder={t("Enter your password (Again)")}/>

                <label className='labelRadio'><input type="radio" name='gender' value="male"/>{t("Male")}</label>
                 <label className='labelRadio' ><input type="radio" name='gender' value="female"/>{t("Female")}</label>
                 <label className='labelRadio'><input type="radio" name='gender' value="other"/>{t("Other")}</label>
                <button onClick={handleLogin} className='buttonSignUp' type='submit'>{t("Sign up")}</button>
               </form>
            </div>
        </div>
        
    </div>
  )
}

export default createAccount
// File: src/Pages/createAccount.jsx