import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { doc, updateDoc, arrayUnion, arrayRemove, collection, addDoc } from "firebase/firestore";
import { FaStar } from 'react-icons/fa'; // Yıldız ikonu için

const EventCard = ({ title, location, date, description, likes = [], id, user }) => {
  const [likesState, setLikesState] = useState(Array.isArray(likes) ? likes : []);
  // user artık prop olarak geliyor

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
        <FaStar color={likesState.includes(user?.uid) ? 'gold' : 'gray'} fontSize={40}/>
        <span>{likesState.length}</span>
      </button>
    </div>
  );
};

export default EventCard;
