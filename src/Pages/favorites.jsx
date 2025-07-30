import React, { useEffect, useState } from 'react';
import './favorites.css';
import EventCard from './EventCard';
import '../i18n';
import Favicon from '../assets/favicon.png';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';

function favorites() {
  const { t, i18n } = useTranslation();

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    console.log("Dil değiştirildi:", lang);
  };
  const Favorites = () => {
    navigator('/favorites');
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
  const attendedEvents = events.filter(event =>
    Array.isArray(event.attend) && user && event.attend.includes(user.uid)
  );

  if (user === undefined) return null;
  if (!user) return null;

  return (
    <>
      <div className="navbar">
        <img className='logo' src={Favicon} alt="resim bulunamadı" />
        <h1 onClick={handleRefresh}>Evently</h1>
        <form onSubmit={handleSearch} style={{ display: 'inline',width: '40%' }}>
          <input
            className="search"
            placeholder={t("Search by location or event name")}
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button className='searchButton' type="submit">{t("Search")}</button>
        </form>
        
          <ul>
            <li style={{marginLeft:'33%'}}><a onClick={handleProfile}>{t("Profile")}</a></li>
            <li><a onClick={Favorites}>{t("Favorites")}</a></li>
            <li><a onClick={handleEventAdd}>{t("Create Event")}</a></li>
            <li><a onClick={handleLogOut}>{t("Log Out")}</a></li>
            
          </ul>
     
      </div>

      <div>
      <div className="eventsContainer">
        {attendedEvents.length === 0 ? (
          <p>{t("You have not joined any events yet.")}</p>
        ) : (
          attendedEvents.map(event => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              location={event.location}
              date={event.date}
              description={event.description}
              likes={Array.isArray(event.likes) ? event.likes : []}
              attend={Array.isArray(event.attend) ? event.attend : []}
              user={user}
            />
          ))
        )}
      </div>
    </div>
    </>
  )
}

export default favorites