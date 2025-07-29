import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { doc, updateDoc, arrayUnion, arrayRemove, collection, addDoc } from "firebase/firestore";
import { FaStar } from 'react-icons/fa'; // Yıldız ikonu için
import { useTranslation } from 'react-i18next';




const EventCard = ({ title, location, date, description, likes ,attend = [], id, user }) => {
  const [likesState, setLikesState] = useState(Array.isArray(likes) ? likes : []);
  const [attendState, setAttendState] = useState(Array.isArray(attend) ? attend : []);
  // user artık prop olarak geliyor
  const handleAttend = async () => {
    if (!user) {
      alert("Lütfen giriş yapınız.");
      return;
    }
    const attendAdd =Array.isArray(attendState) ? attendState : [];
    const attendRef = doc(db, "events", id);
    let newAttend;
    if (attendAdd.includes(user.uid)) {
      await updateDoc(attendRef, { attend: arrayRemove(user.uid) });
      setAttendState(attendAdd.filter(uid => uid !== user.uid));
    } else {
      await updateDoc(attendRef, { attend: arrayUnion(user.uid) });
      newAttend = [...attendAdd, user.uid];
      setAttendState([...attendAdd, user.uid]);
    }
  };
  const handleLike = async () => {
    if (!user) {
      alert("Lütfen giriş yapınız.");
      return;
    }
    // likesState her zaman dizi olmalı, ama yine de kontrol ekle
    const safeLikes = Array.isArray(likesState) ? likesState : [];
    const eventRef = doc(db, "events", id);
    let newLikes;
    if (safeLikes.includes(user.uid)) {
      await updateDoc(eventRef, { likes: arrayRemove(user.uid) });
      newLikes = safeLikes.filter(uid => uid !== user.uid);
    } else {
      await updateDoc(eventRef, { likes: arrayUnion(user.uid) });
      newLikes = [...safeLikes, user.uid];
    }
    setLikesState(newLikes);
  };
  const { t, i18n } = useTranslation();

  return (
    <div style={{
      border: "5px solid black",
      padding: "0.5rem",
      borderRadius: "20px",
      width: '90%',
      boxSizing: 'border-box'
    }}>
      <h2>{title}</h2>
      <p>📍 {location}</p>
      <p>📅 {date}</p>
      <p>{description}</p>
      <button
        onClick={handleLike}
        style={{ background: 'none', border: 'none', cursor: user ? 'pointer' : 'not-allowed' }}
        disabled={!user}
      >
        <FaStar color={likesState.includes(user?.uid) ? 'blueviolet' : 'gray'} fontSize={40}/>
        <span>{likesState.length}</span>
      </button>
      <button onClick={handleAttend} style={{border:'1px solid black',borderRadius:'10px',padding:'0.5rem',cursor:'pointer',marginLeft:'60%',width:'20%',backgroundColor:attendState.includes(user?.uid) ? 'rgb(136, 73, 196)' : 'whiteSmoke'}}>{t("I'm In")}  <span style={{marginLeft:'3rem'}}>{attendState.length}</span></button>
     
    </div>
  );
};

export default EventCard;
