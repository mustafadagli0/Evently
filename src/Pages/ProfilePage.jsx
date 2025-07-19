import React from 'react'
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css'
import Favicon from '../assets/favicon.png';
import { useTranslation } from "react-i18next";
import '../i18n';
import { HiUserCircle } from "react-icons/hi2";


function ProfilePage() {
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
        const handleEventAdd = () => {
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
  
    
    <div className='profileContainer'>
     
      <div className='profileCard'>
       <HiUserCircle className='profilePicture'/>
        <div className='profileDetails'>
          <p><strong>{t("Name")}:</strong> John Doe</p>
          <p><strong>{t("Email")}:</strong> johndoe@example.com</p>
          <p><strong>{t("Location")}:</strong> Istanbul, Turkey</p>
          <p><strong>{t("Member Since")}:</strong> January 2023</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default ProfilePage