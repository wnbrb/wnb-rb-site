import React, { useRef, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { getPastMeetups } from '../../datasources';
import 'stylesheets/events-calendar';
import Button from '../../components/Button';
import 'stylesheets/button';

const EventsCalendar = () => {
    const [meetups, setMeetups] = useState([]);
    const [loading, setLoading] = useState(true);
    const calendarRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getPastMeetups();
            const flattenedMeetups = Object.entries(data).flatMap(([, meetupsByMonth]) => {
                return Object.values(meetupsByMonth).flat();
            });
            setMeetups(flattenedMeetups);
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleNext = () => {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.next();
    };

    const handlePrev = () => {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.prev();
    };

    const handleEventClick = (info) => {
        const eventId = info.event.id;
        const eventElement = document.getElementById(eventId);
        if (eventElement) {
            eventElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            eventElement.classList.add('highlight');
            setTimeout(() => eventElement.classList.remove('highlight'), 2000);
        }
    };

    const goToEventDate = (date) => {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.gotoDate(date);
    };

    const events = meetups.map(({ id, title, date, speakers, talks, description }) => ({
        id,
        title,
        start: date,
        talks: talks && talks[0] ? talks[0].talk_title : null,
        speakers: speakers && speakers[0] ? speakers[0].name : null,
        description,
    }));

    return (
        <div className="events-calendar-container">
            <div className="page-title-calendar">
                <h1 className="font-besley text-2xl font-bold mb-2">Upcoming Events</h1>
                <p>
                    <a href="/join-us">Register </a>to stay updated with upcoming events
                </p>
            </div>

            <div className="calendar-section">
                <div className="fc-direction-ltr">
                    <FullCalendar
                        ref={calendarRef}
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        events={events}
                        eventClick={handleEventClick}
                        editable={false}
                        selectable={true}
                        dayCellDidMount={(args) => {
                            const eventForDay = events.find(
                                (event) =>
                                    new Date(event.start).toDateString() ===
                                    args.date.toDateString(),
                            );

                            if (eventForDay) {
                                const dayNumberElement =
                                    args.el.querySelector('.fc-daygrid-day-number');
                                if (dayNumberElement) {
                                    dayNumberElement.classList.add('clickable-day');
                                    dayNumberElement.addEventListener('click', () => {
                                        handleEventClick({ event: { id: eventForDay.id } });
                                    });
                                }
                            }
                        }}
                    />
                </div>

                <div className="events-cards">
                    {loading ? (
                        <p>Loading events...</p>
                    ) : meetups.length === 0 ? (
                        <p>No events available</p>
                    ) : (
                        meetups.map((event, index) => (
                            <div
                                id={event.id}
                                key={event.id}
                                className={`event-card ${index % 2 === 0 ? 'yellow' : 'green'}`}
                                onClick={() => goToEventDate(event.date)}
                                role="button"
                                tabIndex="0"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        goToEventDate(event.date);
                                    }
                                }}
                            >
                                <p>{new Date(event.date).toLocaleDateString()}</p>
                                <h3>{event.title}</h3>
                                {event.talks && event.talks.length > 0 && (
                                    <div>
                                        {event.talks.map((talk, talkIndex) => (
                                            <div key={talkIndex}>
                                                <p>{talk.talk_title}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {event.description ? <p>{event.description}</p> : null}

                                {event.speakers && event.speakers.length > 0 && (
                                    <div>
                                        {event.speakers.map((speaker, speakerIndex) => (
                                            <div
                                                className="flex content-center mb-8 text-lg"
                                                key={speakerIndex}
                                            >
                                                <img
                                                    className="object-cover w-14 h-14 mr-4 rounded-full"
                                                    src={speaker.image_url}
                                                    alt="speaker"
                                                />
                                                <div>
                                                    <p className="font-bold text-gray md:text-lg">
                                                        {speaker.name}
                                                    </p>
                                                    <p className="text-sm text-gray md:text-lg">
                                                        {speaker.tagline}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="btn-navigation">
                <Button
                    type="secondary"
                    className="btn"
                    aria-label="Go to previous"
                    onClick={handlePrev}
                >
                    {'< Previous'}
                </Button>
                <Button
                    type="secondary"
                    className="btn"
                    aria-label="Go to next"
                    onClick={handleNext}
                >
                    {'Next >'}
                </Button>
            </div>
        </div>
    );
};

export default EventsCalendar;
