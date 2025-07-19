import React from 'react';
import './eventAdd.css';
import { useNavigate } from 'react-router-dom';
import Favicon from '../assets/favicon.png';
import '../i18n';
import { useTranslation } from "react-i18next";


function eventAdd() {
   

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
            
    const submitTheEvent = (event) => {
      event.preventDefault();
      const eventPage = document.querySelector('.eventAddContainer');
      eventPage.innerHTML = " " + t("Event added successfully!") + " ";
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
                      <li><a onClick={handleEventAdd} href="">{t("Create Event")}</a></li>
                      <li><a onClick={handleLogOut}>{t("Log Out")}</a></li>
                    </ul>
                </div>
        </div>
        <div className="eventAddContainer">
          <form className="eventForm" onSubmit={submitTheEvent}>
            <label>{t("Event Title")}:</label>
            <input type="text" placeholder={t("Enter event title")} />

            <label>{t("Location")}:</label>
            <input type="text" placeholder={t("Enter location")} />

            <label>{t("Date")}:</label>
            <input type="date" />

            <label>{t("Time")}:</label>
            <input type="time" />

            <label>{t("Description")}:</label>
            <textarea placeholder={t("Enter event description")}></textarea>

            <button type="submit">{t("Add Event")}</button>
            
          </form>
        </div>
    </>
  )
}

export default eventAdd