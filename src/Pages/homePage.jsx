import React from 'react'
import { useNavigate } from 'react-router-dom';
import './homePage.css'
import EventCard from './eventCard';
import { useTranslation } from "react-i18next";
import '../i18n';
import Favicon from '../assets/favicon.png';

function homePage() {

    const { t, i18n } = useTranslation();
    
    const changeLang = (lang) => {
      i18n.changeLanguage(lang);
      console.log("Dil değiştirildi:", lang);
    };

    const navigator = useNavigate();

    const handleLogin = () =>{
        navigator('/login');
    };

  return (
    
    <>
    <div className="navbar">
        <img className='logo' src={Favicon} alt="resim bulunamadı" />
        <h1>Evently</h1>
        <input className="search" placeholder={t("Search by location or event name")} type="text" />
        <button className='searchButton'>{t("Search")}</button>
        <button onClick={handleLogin} style={{width:'120px',height:'40px',marginLeft:'15%'}}>{t("Sign in")}</button>
        <button className='transTrButton' type='button' onClick={() => changeLang("tr")}>Türkçe</button>
        <button className='transEnButton' type='button' onClick={() => changeLang("en")}>English</button>
      </div>
 
      <div style={{ padding: '20px', width:'1300px'}}>
        <EventCard className
          title="React Meetup"
          location="Istanbul, Turkey"
          date="2023-10-15"
          description="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
        <EventCard
          title="JavaScript Conference"
          location="San Francisco, USA"
          date="2023-11-20"
          description="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        /> 
      </div>
    </>
  )
}

export default homePage