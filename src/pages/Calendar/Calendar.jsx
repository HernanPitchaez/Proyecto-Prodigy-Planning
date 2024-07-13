import React, { useState, useEffect } from 'react';
import { Box, Text, Image } from '@chakra-ui/react';
import { fetchEventsByPeriod, getEventBanner } from '/src/apiConection.js';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Charlas from '../../Image/CategoryImage/Charlas.jpg';
import Entretenimiento from '../../Image/CategoryImage/Entretenimiento.jpg';
import Gastronomia from '../../Image/CategoryImage/Gastronomia.png';
import Musica from '../../Image/CategoryImage/Musica.png';
import './CalendarStyle.css';

const CalendarEvents = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const month = (currentDate.getMonth() + 2).toString().padStart(2, '0');
      const year = currentDate.getFullYear(); 
      const period = `${month}${year}`;

      try {
        //console.log("Formato pasado: " + period);
        const fetchedEvents = await fetchEventsByPeriod(period);
        //console.log(fetchedEvents.result);
        const transformedEvents = fetchedEvents.result.map(async event => {

          const [day, month, year] = event.date.split('/');
          const eventDate = new Date(`${year}-${month}-${day}`);

          if (isNaN(eventDate.getTime())) {
            console.error('Fecha del evento inválida:', event.date);
            return null; 
          }

          const startTimeParts = event.time.split(':');
          const startHour = parseInt(startTimeParts[0], 10);
          const startMinute = parseInt(startTimeParts[1], 10);

          const endHour = startHour + event.duration;
          const endMinute = startMinute;
          const toHours = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')} hs`;

          
          let imageurl = await getEventBanner(event.id);
         
          console.log(event.categories);
          if (imageurl === "El evento que envio no tiene un banner cargado") {
            let category = event.categories[0];
            switch (category) { 
              case "Charlas":
                imageurl = Charlas;
                break;
              case "Entretenimiento":
                imageurl = Entretenimiento;
                break;
              case "Gastronomía":
                imageurl = Gastronomia;
                break;
              case "Música":
                imageurl = Musica;
                break;
              
              default:
                imageurl = "Sin Imagen"; 
                break;
            }
          }
          return {
            title: event.name,
            date: eventDate.toISOString().slice(0, 10), 
            category: event.categories, 
            fromHours: event.time + " hs",
            toHours: toHours,
            image:imageurl,
          };
        });

        const transformedEventsPromises = (await Promise.all(transformedEvents)).filter(event => event !== null);

        setEvents(transformedEventsPromises); 

      } catch (error) {
        console.error('Error al obtener los eventos por el periodo:', error);
      }
    };

    fetchEvents();
  }, [currentDate]); 

  const handleDateChange = (arg) => {
    setCurrentDate(new Date(arg.startStr)); 
  };

  const dayCellDidMount = (arg) => {
    
    const date = arg.date;
    const today = new Date();
    const isToday = date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();

    if (isToday) {
      const dayNumberEl = arg.el.querySelector('.fc-daygrid-day-number');
      if (dayNumberEl) {
        dayNumberEl.classList.add('dia-actual'); 
      }
      arg.el.style.backgroundColor = 'transparent';
    }

    if (arg.date.getDay() === 6 || arg.date.getDay() === 0) {
      arg.el.style.backgroundColor = '#F5F5DC'; 
    }
  };

  const dayHeaderContent = (args) => {
    return args.text[0].toUpperCase() + args.text.substring(1).toLowerCase();
  };

  const eventContent = (eventInfo) => {
    const allEvents = eventInfo.view.calendar.getEvents();
    const eventsOnSameDay = allEvents.filter(e =>
      e.start.toISOString().slice(0, 10) === eventInfo.event.start.toISOString().slice(0, 10)
    );

    if (eventsOnSameDay.length >= 2) {
      let eventClass = ""; 
      const category = eventInfo.event.extendedProps.category[0]; 
      //console.log(category);
      switch (category) {
        case "Música":
          eventClass = "music-event";
          break;
        case "Deportes":
          eventClass = "sport-event";
          break;
        case "Charlas":
          eventClass = "conference-event";
          break;
        case "Tecnología":
          eventClass = "tecno-event";
          break;
        case "Gastronomía":
          eventClass = "gastronomy-event";
          break;
        case "Entretenimiento":
          eventClass = "entertainment-event";
          break;
        default:
          eventClass = "others-event";
          break;
      }
      return (
        <div style={{ margin: '1px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', }}>
          <div className={`${eventClass}`} >
            <Text fontSize="sm" fontWeight="bold" color="white" style={{ marginBottom: 1 }}>
              {eventInfo.event.title}
            </Text>
          </div>
        </div>
      );
    } else {
      const hasImage = eventInfo.event.extendedProps.image;
      return (
        <div className="fc-daygrid-event">
          <div>
            {hasImage ? (
              <Image
                src={eventInfo.event.extendedProps.image}
                alt={eventInfo.event.title}
                width="100%"
                height="auto"
                className="image-container"
              />
            ) : (
              <div className='image-container'
              >
                <Text fontSize="sm" fontWeight="bold" color="black" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Sin Imagen
                </Text>
              </div>
            )}
            <Text fontSize="sm" fontWeight="bold" color="black" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {eventInfo.event.title}
            </Text>
            <Text fontSize="sm" color="black">
              {eventInfo.event.extendedProps.fromHours} a {eventInfo.event.extendedProps.toHours}
            </Text>
          </div>
        </div>
      );
    }
  };

  return (
    <Box
      w="98vw" 
      h="160vh" 
      p={7} 
      overflow="hidden" 
    >
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        dayHeaderContent={dayHeaderContent}
        events={events}
        locale="Es"
        buttonText={{
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
          day: 'Día',
          list: 'Lista',
        }}
        headerToolbar={{
          start: 'prev',
          center: 'title',
          end: 'next,today'
        }}
        dayCellDidMount={dayCellDidMount}
        eventContent={eventContent}
        datesSet={handleDateChange} 
      />
    </Box>
  );
};

export default CalendarEvents;