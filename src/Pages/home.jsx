import React from 'react';
import './home.css';
import EventCard from './eventCard';
import '../i18n';
import Favicon from '../assets/favicon.png';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';


function home() {
     const { t, i18n } = useTranslation();
  
  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    console.log("Dil değiştirildi:", lang);
  };

  const navigator = useNavigate();

  const handleLogOut = () => {
    navigator('/');
  };
  const handleProfile = () => {
    navigator('/profile');
  };
  const handleRefresh = () => {
    navigator('/home');
  };
   const handleEventAdd= () => {
    navigator('/eventAdd');
  };

  
  return (
    <>
      <div className="navbar">
        <img className='logo' src={Favicon} alt="resim bulunamadı" />
        <h1 onClick={handleRefresh}>Evently</h1>
        <input className="search"  placeholder={t("Search by location or event name")} type="text" />
        <button className='searchButton'>{t("Search")}</button>
          <div className='dropdown'>
            <ul>
              <li><a onClick={handleProfile}>{t("Profile")}</a></li>  
              <li><a onClick={handleEventAdd}>{t("Create Event")}</a></li>
              <li><a onClick={handleLogOut}>{t("Log Out")}</a></li>
            </ul>
          </div>
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

export default home