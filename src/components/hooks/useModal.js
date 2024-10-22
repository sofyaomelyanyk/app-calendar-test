import { useDispatch } from "react-redux";
import {
  addEvent,
  updateEvent,
  deleteEvent,
} from "../../store/slices/eventsSlice";
import { useCallback } from "react";


const useModal = () => {
  const dispatch = useDispatch();

  const handleCreateEvent = useCallback(
    (id, title, serializableDate, serializableTime, notes, color) => {

      dispatch(
        addEvent({
          id,
          title,
          date: serializableDate,
          time: serializableTime,
          notes,
          color
        })
      );
    },
    []
  );

  const handleUpdateEvent = useCallback(
    (id, title, serializableDate, serializableTime, notes, color) => {
      dispatch(
        updateEvent({
          id,
          title,
          date: serializableDate,
          time: serializableTime,
          notes,
          color
        })
      );
    },
    []
  );

  const handleDeleteEvent = useCallback((id) => {
    dispatch(deleteEvent({ id }));
  }, []);

  return { handleCreateEvent, handleUpdateEvent, handleDeleteEvent };
};

export default useModal;
