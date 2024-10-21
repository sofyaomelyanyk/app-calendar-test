import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // Для возможности клика по ячейкам
import s from "./styles.module.scss";

const Calendar = () => {
  const [events, setEvents] = useState([
    { title: "Event 1", date: "2023-10-01" },
    { title: "Event 2", date: "2023-10-10" },
  ]);
  const [eventTitle, setEventTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr); // Устанавливаем выбранную дату
    const title = prompt("Введите название события (макс. 30 символов):");
    if (title && title.length > 0 && title.length <= 30) {
      setEvents([...events, { title, date: arg.dateStr }]);
    } else {
      alert("Название события должно быть от 1 до 30 символов.");
    }
  };

  return (
    <div className={s.calendarContainer}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        dateClick={handleDateClick} // Обработчик клика по ячейке
        editable={true} // Включаем возможность редактирования событий
      />
    </div>
  );
};

export default Calendar;
