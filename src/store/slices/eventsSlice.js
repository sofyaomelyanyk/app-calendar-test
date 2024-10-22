import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    updateEvent: (state, action) => {
      const { id, title, date, time, notes, color } = action.payload;
      const index = state.events.findIndex((event) => event.id === id);
      if (index !== -1) {
        state.events[index] = {
          ...state.events[index],
          title,
          date,
          time,
          notes,
          color,
        };
      }
    },
    deleteEvent: (state, action) => {
      const { id } = action.payload;
      state.events = state.events.filter((event) => event.id !== id);
    },
  },
});

export const { addEvent, updateEvent, deleteEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
