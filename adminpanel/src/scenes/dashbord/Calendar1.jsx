import React, { useContext, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventPopup from '../global/EventPopup';
import { ThemeFunc } from '../assets/CreateApi';

const localizer = momentLocalizer(moment);

const initialEvents = [
  
];

const Calendar1 = () => {
  const { Toggle} = useContext(ThemeFunc);

  const [events, setEvents] = useState(initialEvents);
  const [isOpen, setIsOpen] = useState(false);
  const [popupEvent, setPopupEvent] = useState(null);
  const [popupDate, setPopupDate] = useState(null);

  const handleSave = data => {
    if (data.id) {
      setEvents(prev => prev.map(ev => ev.id === data.id ? data : ev));
    } else {
      data.id = events.length + 1;
      setEvents(prev => [...prev, data]);
    }
    setIsOpen(false);
  };
  const handleSlot = slot => {
    setPopupDate(slot.start);
    setPopupEvent(null);
    setIsOpen(true);
  };
  const handleEventClick = ev => {
    setPopupEvent(ev);
    setPopupDate(null);
    setIsOpen(true);
  };

  return (
    <div className="lg:px-8 lg:py-6">
      <Calendar
        selectable
        localizer={localizer}
        events={events}
        onSelectSlot={handleSlot}
        onSelectEvent={handleEventClick}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        className={`${Toggle === "light" ? "bg-white border-r border-gray-200" : "bg-gray-900 border-r border-gray-700 text-white"}`}
      />
      {isOpen && (
        <EventPopup
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSave={handleSave}
          date={popupDate}
          event={popupEvent}
        />
      )}
    </div>
  );
};

export default Calendar1;
