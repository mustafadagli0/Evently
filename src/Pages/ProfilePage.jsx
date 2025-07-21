import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css'
import Favicon from '../assets/favicon.png';
import { useTranslation } from "react-i18next";
import '../i18n';
import { HiUserCircle } from "react-icons/hi2";
import { auth } from '../firebase';
import { db } from '../firebase';
import { doc, getDoc } from "firebase/firestore";


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
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      }
    };
    fetchProfile();
  }, []);
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
          <p><strong>{t("Name")}:</strong> {profile ? profile.username : "..."}</p>
          <p><strong>{t("Email")}:</strong> {profile ? profile.email : "..."}</p>
          <p><strong>{t("Gender")}:</strong> {profile ? profile.gender : "..."}</p>
          <p><strong>{t("Member Since")}:</strong> {profile ? (profile.createdAt?.toDate ? profile.createdAt.toDate().toLocaleDateString() : profile.createdAt) : "..."}</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default ProfilePage