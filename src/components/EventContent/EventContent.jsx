import { memo } from "react";
import s from "./styles.module.scss";
const EventContent = memo(({ eventInfo, time }) => {
  return (
    <div className={s.contentWrap}>
      <div
        className={s.round}
        style={{
          backgroundColor: `${eventInfo.backgroundColor}`,
        }}
      />
      <span className={s.textWrap}>
        {time} - <strong>{eventInfo.event.title}</strong>
      </span>
    </div>
  );
});

export default EventContent;
