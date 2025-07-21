import React, { useEffect, useState } from 'react';
import './home.css';
import EventCard from './EventCard';
import '../i18n';
import Favicon from '../assets/favicon.png';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';

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
  const handleEventAdd = () => {
    navigator('/eventAdd');
  };

  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
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
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        navigator('/homePage', { replace: true });
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setFilteredEvents(events); // Etkinlikler değişirse filtreyi sıfırla
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

  if (user === undefined) return null;
  if (!user) return null;

  return (
    <>
      <div className="navbar">
        <img className='logo' src={Favicon} alt="resim bulunamadı" />
        <h1 onClick={handleRefresh}>Evently</h1>
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
        <div className='dropdown'>
          <ul>
            <li><a onClick={handleProfile}>{t("Profile")}</a></li>
            <li><a onClick={handleEventAdd}>{t("Create Event")}</a></li>
            <li><a onClick={handleLogOut}>{t("Log Out")}</a></li>
          </ul>
        </div>
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
              user={user}
            />
        ))}
      </div>
    </>
  )
}

export default home