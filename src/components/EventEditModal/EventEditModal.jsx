import {
  Modal,
  Input,
  DatePicker,
  TimePicker,
  Button,
  message,
  ColorPicker,
} from "antd";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import useModal from "../hooks/useModal";
import s from "./styles.module.scss";
import { DEFAULT_BG_COLOR } from "../constants/constants";
import colorObjectToRGBString from "../helpers/colorObjectToRGBString ";

const MAX_EVENT_CHAR_LENGTH = 30;

const EventEditModal = ({
  isOpenModal,
  setIsOpenModal,
  eventData,
  setEventData,
  isCreateEvent,
}) => {
  const dispatch = useDispatch();
  const { handleCreateEvent, handleUpdateEvent, handleDeleteEvent } =
    useModal();
  const { id, title, date, time, notes, color } = eventData;

  const resetData = () => {
    setEventData({
      id: "",
      title: "",
      date: null,
      time: null,
      notes: "",
      color: DEFAULT_BG_COLOR,
    });
  };

  const handleOk = useCallback(() => {
    if (!title || title.length === 0) {
      message.error("Event name is required.");
      return;
    }
    if (title.length > MAX_EVENT_CHAR_LENGTH) {
      message.error(
        `Event name must be at most ${MAX_EVENT_CHAR_LENGTH} characters.`
      );
      return;
    }
    if (!date) {
      message.error("Date is required.");
      return;
    }
    if (!time) {
      message.error("Time is required.");
      return;
    }
    if (!notes || notes.length === 0) {
      message.error("Notes are required.");
      return;
    }
    if (notes.length > MAX_EVENT_CHAR_LENGTH) {
      message.error(
        `Notes must be at most ${MAX_EVENT_CHAR_LENGTH} characters.`
      );
      return;
    }

    const serializableDate = date.format("YYYY-MM-DD");
    const serializableTime = time.format("HH:mm:ss");
    const colorBG = colorObjectToRGBString(color);

    if (isCreateEvent) {
      handleCreateEvent(
        id,
        title,
        serializableDate,
        serializableTime,
        notes,
        colorBG
      );
      message.success("Event successfully saved");
    } else {
      handleUpdateEvent(
        id,
        title,
        serializableDate,
        serializableTime,
        notes,
        colorBG
      );

      message.success("Event successfully updated");
    }

    setIsOpenModal(false);
    resetData();
  }, [eventData, dispatch, setIsOpenModal, isCreateEvent]);

  const handleClose = useCallback(() => {
    setIsOpenModal(false);
    resetData();
  }, [setIsOpenModal]);

  const handleDelete = useCallback(() => {
    setIsOpenModal(false);
    handleDeleteEvent(id);
    resetData();
  }, [setIsOpenModal, dispatch, id]);

  return (
    <Modal
      open={isOpenModal}
      title="My event"
      onOk={handleOk}
      onCancel={handleClose}
      style={{ zIndex: 1000 }}
      footer={[
        <Button key="back" onClick={isCreateEvent ? handleClose : handleDelete}>
          {isCreateEvent ? "Cancel" : "Discard"}
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          {isCreateEvent ? "Save" : "Edit"}
        </Button>,
      ]}
    >
      <Input
        placeholder="event name"
        value={title}
        maxLength={MAX_EVENT_CHAR_LENGTH}
        onChange={(e) =>
          setEventData((prev) => ({ ...prev, title: e.target.value }))
        }
      />
      <DatePicker
        placeholder="event date"
        value={date}
        onChange={(date) => setEventData((prev) => ({ ...prev, date }))}
        style={{ marginTop: "10px", width: "100%" }}
      />
      <TimePicker
        placeholder="event time"
        value={time}
        onChange={(time) => setEventData((prev) => ({ ...prev, time }))}
        style={{ marginTop: "10px", width: "100%" }}
      />
      <Input
        placeholder="notes"
        value={notes}
        maxLength={MAX_EVENT_CHAR_LENGTH}
        onChange={(e) =>
          setEventData((prev) => ({ ...prev, notes: e.target.value }))
        }
        style={{ marginTop: "10px" }}
      />
      <div className={s.colorPicker}>
        <p className={s.text}>Color of your event</p>
        <ColorPicker
          value={color}
          onChange={(color) =>
            setEventData((prev) => ({
              ...prev,
              color,
            }))
          }
        />
      </div>
    </Modal>
  );
};

export default EventEditModal;
