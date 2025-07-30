import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css'
import Favicon from '../assets/favicon.png';
import { useTranslation } from "react-i18next";
import '../i18n';
import { HiUserCircle } from "react-icons/hi2";
import { auth } from '../firebase';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from "firebase/firestore";


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
        const Favorites = ()=>{
          navigator('/favorites');
        };

  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editUsername, setEditUsername] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editGender, setEditGender] = useState("");

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

  const handleSaveProfile = async () => {
    // 1. Alanlar boş mu kontrol et
    if (!editUsername.trim() || !editEmail.trim() || !editGender.trim()) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("Kullanıcı oturumu bulunamadı!");
        setIsEditing(false);
        return;
      }
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        username: editUsername,
        email: editEmail,
        gender: editGender
      });
      // Profil state'ini güncelle
      setProfile(prev => ({
        ...prev,
        username: editUsername,
        email: editEmail,
        gender: editGender
      }));
      setIsEditing(false);
      alert("Profil başarıyla güncellendi!");
    } catch (error) {
      setIsEditing(false);
      alert("Profil güncellenirken hata oluştu: " + error.message);
    }
  };

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
  
    
    <div style={{display: isEditing ? "none" :"block"}} className='profileContainer'>
     
      <div className='profileCard'>
       <HiUserCircle className='profilePicture'/>
        <div className='profileDetails'>
          <p><strong>{t("Name")}:</strong> {profile ? profile.username : "..."}</p>
          <p><strong>{t("Email")}:</strong> {profile ? profile.email : "..."}</p>
          <p><strong>{t("Gender")}:</strong> {profile ? profile.gender : "..."}</p>
          <p><strong>{t("Member Since")}:</strong> {profile ? (profile.createdAt?.toDate ? profile.createdAt.toDate().toLocaleDateString() : profile.createdAt) : "..."}</p>
          <button
  onClick={() => {
    setEditUsername(profile?.username || "");
    setEditEmail(profile?.email || "");
    setEditGender(profile?.gender || "");
    setIsEditing(true);
  }}
  className='editProfileButton'
>
  {t("Edit Profile")}
</button>
          {isEditing && <div>Düzenleme modundasın!</div>}
        </div>
      </div>
    </div>

    <div style={{display: isEditing ? "block" : "none"}} className='profileContainer'> 
      <div className='profileCard'>
        <div className='profileDetails'>
                  <p><strong>{t("Name")}:</strong> </p>
                  <input
                placeholder={profile ? profile.username : "..."}
                type="text"
                value={editUsername}
                onChange={e => setEditUsername(e.target.value)}
              />
                  <p><strong>{t("Email")}:</strong> </p>
                  <input
                type="email"
                placeholder={profile ? profile.email : "..."}
                value={editEmail}
                onChange={e => setEditEmail? setEditEmail(e.target.value) : editEmail}
              />
              <p><strong>{t("Gender")}:</strong></p>
              
              <select value={editGender} onChange={e => setEditGender(e.target.value)}>
                <option value="male">{t("Male")}</option>
                <option value="female">{t("Female")}</option>
                <option value="other">{t("Other")}</option>
              </select>

              <button
                type="button"
                onClick={handleSaveProfile}
                className="editProfileButton">
                {t("Save")}
              </button>

          </div>
        </div>  
      </div>
    </>
  )
}

export default ProfilePage