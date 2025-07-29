import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './homePage.css'
import EventCard from './EventCard';
import { useTranslation } from "react-i18next";
import '../i18n';
import Favicon from '../assets/favicon.png';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';

function homePage() {
  const { t, i18n } = useTranslation();

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    console.log("Dil değiştirildi:", lang);
  };

  const navigator = useNavigate();

  const handleLogin = () => {
    navigator('/login');
  };

  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(events);

  useEffect(() => {
    const fetchEvents = async () => {
      const querySnapshot = await getDocs(collection(db, "events"));
      const eventsArray = [];
      querySnapshot.forEach((doc) => {
        eventsArray.push({ id: doc.id, ...doc.data() });
      });
      setEvents(eventsArray);
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    setFilteredEvents(events);
  }, [events]);

  const handleSearch = (e) => {
    e.preventDefault();
    const term = searchTerm.trim().toLocaleLowerCase('tr');
    if (!term) {
      setFilteredEvents(events);
      return;
    }
    setFilteredEvents(
      events.filter(event =>
        (event.title && event.title.toLocaleLowerCase('tr').includes(term)) ||
        (event.location && event.location.toLocaleLowerCase('tr').includes(term))
      )
    );
  };

  return (
    <>
      <div className="navbar">
        <img className='logo' src={Favicon} alt="resim bulunamadı" />
        <h1>Evently</h1>
        <form onSubmit={handleSearch} style={{ display: 'inline' }}>
          <input
            className="search"
            placeholder={t("Search by location or event name")}
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button className='searchButton' type="submit">{t("Search")}</button>
        </form>
        <button onClick={handleLogin} style={{width:'120px',height:'40px',marginLeft:'15%'}}>{t("Sign in")}</button>
        <button className='transTrButton' type='button' onClick={() => changeLang("tr")}>Türkçe</button>
        <button className='transEnButton' type='button' onClick={() => changeLang("en")}>English</button>
      </div>

      <div className="eventsContainer">
        {filteredEvents
          .slice() // orijinal diziyi bozmamak için kopya al
          .sort((a, b) => (Array.isArray(b.likes) ? b.likes.length : 0) - (Array.isArray(a.likes) ? a.likes.length : 0))
          .map(event => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              location={event.location}
              date={event.date}
              description={event.description}
              likes={Array.isArray(event.likes) ? event.likes : []}
               attend={Array.isArray(event.attend) ? event.attend : []}
            />
        ))}
      </div>
    </>
  )
}

export default homePage