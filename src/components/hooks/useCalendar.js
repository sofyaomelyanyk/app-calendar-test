import { useSelector } from "react-redux";
import { selectEvents } from "../../store/selectors/eventSelectors";
import { useCallback } from "react";
import moment from "moment";

const useCalendar = () => {
  const events = useSelector(selectEvents);

  const handleDateClick = useCallback((setIsOpenModal, setIsCreateEvent) => {
    setIsOpenModal(true);
    setIsCreateEvent(true);
  }, []);

  const handleEventClick = useCallback(
    (info, setIsOpenModal, setIsCreateEvent, setEventData) => {
      setIsOpenModal(true);
      setIsCreateEvent(false);
      const {
        title,
        extendedProps: { notes, time },
      } = info.event;

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
    },
    [events]
  );

  return { events, handleDateClick, handleEventClick };
};

export default useCalendar;
