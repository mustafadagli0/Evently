import React, { useEffect, useState } from 'react';
import './eventAdd.css';
import { useNavigate } from 'react-router-dom';
import Favicon from '../assets/favicon.png';
import '../i18n';
import { useTranslation } from "react-i18next";
import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore";
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';


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
     const Favorites = () =>{
      navigator('/favorites');
     };
            
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [description, setDescription] = useState("");
    const [success, setSuccess] = useState("");

    const submitTheEvent = async (event) => {
      event.preventDefault();
      console.log("Form gönderildi!");
      try {
        await addDoc(collection(db, "events"), {
          title,
          location,
          date,
          time,
          description,
          likes: []
        });
        setSuccess(t("Event added successfully!"));
        setTitle(""); setLocation(""); setDate(""); setTime(""); setDescription("");
        console.log("Etkinlik Firestore'a eklendi!");
      } catch (err) {
        setSuccess(t("Failed to add event: ") + err.message);
        console.error("Firestore'a eklenemedi:", err);
      }
    };

    const [user, setUser] = useState(undefined); // undefined: kontrol bitmedi, null: yok

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        navigator('/homePage', { replace: true });
      }
    });
    return () => unsubscribe();
  }, [navigator]);

  if (user === undefined) return null;
  if (!user) return null;

      return (
        <>
        <div className="navbar">
                <img className='logo' src={Favicon} alt="resim bulunamadı" />
                <h1 onClick={handleRefresh}>Evently</h1>
                <input className="search"  placeholder={t("Search by location or event name")} type="text" />
                <button className='searchButton'>{t("Search")}</button>
                  <ul>
            <li style={{marginLeft:'33%'}}><a onClick={handleProfile}>{t("Profile")}</a></li>
            <li><a onClick={Favorites}>{t("Favorites")}</a></li>
            <li><a onClick={handleEventAdd}>{t("Create Event")}</a></li>
            <li><a onClick={handleLogOut}>{t("Log Out")}</a></li>
            
          </ul>
        </div>
        <div className="eventAddContainer">
          <form className="eventForm" onSubmit={submitTheEvent}>
            <label>{t("Event Title")}:</label>
            <input type="text" placeholder={t("Enter event title")} value={title} onChange={e => setTitle(e.target.value)} />

            <label>{t("Location")}:</label>
            <input type="text" placeholder={t("Enter location")} value={location} onChange={e => setLocation(e.target.value)} />

            <label>{t("Date")}:</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} />

            <label>{t("Time")}:</label>
            <input type="time" value={time} onChange={e => setTime(e.target.value)} />

            <label>{t("Description")}:</label>
            <textarea placeholder={t("Enter event description")} value={description} onChange={e => setDescription(e.target.value)}></textarea>

            <button type="submit">{t("Add Event")}</button>
            
          </form>
          {success && <div style={{color: 'green', marginTop: '10px'}}>{success}</div>}
        </div>
    </>
  )
}

export default eventAdd