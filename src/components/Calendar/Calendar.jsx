import React, { useCallback, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import s from "./styles.module.scss";
import { selectEvents } from "../../store/selectors/eventSelectors";
import { useSelector } from "react-redux";
import moment from "moment";
import EventEditModal from "../EventEditModal/EventEditModal";
import { nanoid } from "nanoid";
import { DEFAULT_BG_COLOR } from "../constants/constants";

const Calendar = () => {
  const events = useSelector(selectEvents);
  const [isCreateEvent, setIsCreateEvent] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [eventData, setEventData] = useState({
    id: nanoid(),
    title: "",
    date: null,
    time: null,
    start: null,
    notes: "",
    color: DEFAULT_BG_COLOR,
  });

  const handleDateClick = useCallback((arg) => {
    setIsOpenModal(true);
    setIsCreateEvent(true);
    setEventData((prev) => ({
      ...prev,
      // start: arg.date, // Установка start на выбранную дату
    }));
  }, []);

  const handleEventClick = useCallback((info) => {
    setIsOpenModal(true);
    setIsCreateEvent(false);
    const {
      title,
      extendedProps: { notes, time },
    } = info.event;

    console.log("here", info.event);

    const eventDate = info.event.start ? moment(info.event.start) : null;
    const eventTime = time ? moment(time, "HH:mm:ss") : null;

    const findEvent = events.findIndex((event) => event.id === info.event.id);

    setEventData({
      id: info.event.id,
      title,
      date: eventDate,
      time: eventTime,
      notes,
      color: events[findEvent].color,
      start: info.event.start,
    });
  }, []);

  const renderEventContent = (eventInfo) => {
    const time = moment(eventInfo.event.extendedProps.time, "HH:mm:ss").format(
      "HH:mm"
    );
    return (
      <div
        style={{
          padding: "0 5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: `${eventInfo.backgroundColor}`,
            marginRight: "5px",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            marginRight: "auto",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {time} - <strong>{eventInfo.event.title}</strong>
        </span>
      </div>
    );
  };

  return (
    <>
      <div className={s.calendarContainer}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events.map((event) => ({
            ...event,
            start: moment(event.date + " " + event.time).toISOString(), // Установка start для каждого события
          }))}
          eventClick={handleEventClick}
          dateClick={handleDateClick}
          editable={true}
          eventContent={renderEventContent}
        />
      </div>
      {isOpenModal && (
        <EventEditModal
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          eventData={eventData}
          setEventData={setEventData}
          isCreateEvent={isCreateEvent}
        />
      )}
    </>
  );
};

export default Calendar;
