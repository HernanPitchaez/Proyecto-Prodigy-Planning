import { createContext, useState, useContext } from 'react';

const EventContext = createContext();

export function EventProvider({ children }) {
  const [filteredEvents, setFilteredEvents] = useState([]);

  return (
    <EventContext.Provider value={{ filteredEvents, setFilteredEvents }}>
      {children}
    </EventContext.Provider>
  );
};

export function useEvents() {
  return useContext(EventContext);
}