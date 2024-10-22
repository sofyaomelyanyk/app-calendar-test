import React, { memo, useCallback, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import s from "./styles.module.scss";
import moment from "moment";
import EventEditModal from "../EventEditModal/EventEditModal";
import { nanoid } from "nanoid";
import { DEFAULT_BG_COLOR } from "../constants/constants";
import useCalendar from "../hooks/useCalendar";
import EventContent from "../EventContent/EventContent";
import createCustomButtons from "../helpers/createCustomButtons";

const Calendar = memo(() => {
  const calendarRef = useRef(null);
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
  const { events, handleDateClick, handleEventClick } = useCalendar();

  const renderEventContent = useCallback((eventInfo) => {
    const time = moment(eventInfo.event.extendedProps.time, "HH:mm:ss").format(
      "HH:mm"
    );
    return <EventContent eventInfo={eventInfo} time={time} />;
  }, []);

  return (
    <>
      <div className={s.calendarContainer}>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "customToday,customBack,customNext",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          customButtons={createCustomButtons(calendarRef)}
          events={events.map((event) => ({
            ...event,
            start: moment(event.date + " " + event.time).toISOString(), // Установка start для каждого события
          }))}
          eventClick={(info) =>
            handleEventClick(
              info,
              setIsOpenModal,
              setIsCreateEvent,
              setEventData
            )
          }
          dateClick={() => handleDateClick(setIsOpenModal, setIsCreateEvent)}
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
});

export default Calendar;
