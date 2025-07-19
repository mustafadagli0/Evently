import React from "react";

const EventCard = ({ title, location, date, description }) => {
  return (
    <div style={{ border: "5px solid black", padding: "1rem", marginBottom: "1rem", borderRadius: "20px", width:'85%' }}>
      <h2>{title}</h2>
      <p>📍 {location}</p>
      <p>📅 {date}</p>
      <p>{description}</p>
    </div>
  );
};

export default EventCard;
