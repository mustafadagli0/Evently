import React from 'react'
import './forgotPassword.css'
import { useTranslation } from "react-i18next";
import "../i18n";
import { HiUserCircle } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import Favicon from '../assets/favicon.png';


function forgotPassword() {
   const { t, i18n } = useTranslation();

const changeLang = (lang) => {
  i18n.changeLanguage(lang);
  console.log("Dil değiştirildi:", lang);
};
const navigator = useNavigate();

const handleLogin = () =>{
  // Burada giriş işlemlerini yapabilirsiniz
  // Örneğin, kullanıcı adı ve şifre kontrolü yapabilirsiniz
  // Eğer giriş başarılıysa, ana sayfaya yönlendirebilirsiniz
    navigator('/home');
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
                <input className='forgotİnput' type="text" placeholder={t("Enter your email")} />
                <button className='submit'>{t("Send Code")}</button>
            </div>
        </div>
        
    </div>
  )
}

export default forgotPassword